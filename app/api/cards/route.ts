// app/api/cards/route.ts
// GET (cards by list) + POST (create card)

import { NextResponse } from 'next/server';
import { kanbansDB } from '@/lib/couchdb';
import type { Card } from '@/types/card';
import type { DocumentListResponse } from 'nano';
import { randomUUID } from 'crypto';
import { createCardSchema } from '@/validations/card';

// ---------- GET /api/cards ----------
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const listId = searchParams.get('listId');

    if (!listId) {
      return NextResponse.json({ error: 'listId is required' }, { status: 400 });
    }

    const raw = await kanbansDB.list({ include_docs: true });
    const data = raw as DocumentListResponse<Card>;

    const cards = data.rows.flatMap((row) =>
      row.doc?.type === 'card' && row.doc.listId === listId ? [row.doc] : [],
    );

    return NextResponse.json({ cards });
  } catch (err) {
    console.error('GET Cards Error:', err);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

// ---------- POST /api/cards ----------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createCardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const card: Card = {
      _id: `card:${randomUUID()}`,
      type: 'card',

      boardId: parsed.data.boardId,
      listId: parsed.data.listId,

      title: parsed.data.title,
      position: parsed.data.position ?? 0,

      description: parsed.data.description,
      priority: parsed.data.priority,
      tags: parsed.data.tags,
      progress: parsed.data.progress,
      assignee: parsed.data.assignee,

      createdAt: new Date().toISOString(),
    };

    const result = await kanbansDB.insert(card);

    return NextResponse.json({ message: 'Card created', id: result.id }, { status: 201 });
  } catch (err) {
    console.error('POST Card Error:', err);
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
  }
}
