// app/api/lists/route.ts
// GET (lists by board) + POST (create list)

import { NextResponse } from 'next/server';
import { kanbansDB } from '@/lib/couchdb';
import type { List } from '@/types/list';
import type { DocumentListResponse } from 'nano';
import { randomUUID } from 'crypto';
import { createListSchema } from '@/validations/list';

// ---------- GET /api/lists----------

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get('boardId');

    if (!boardId) {
      return NextResponse.json({ error: 'boardId is required' }, { status: 400 });
    }
    // nano returns unknown docs
    const raw = await kanbansDB.list({ include_docs: true });
    const data = raw as DocumentListResponse<List>;
    const lists = data.rows.flatMap((row) =>
      row.doc?.type === 'list' && row.doc.boardId === boardId ? [row.doc] : [],
    );
    return NextResponse.json({ lists });
  } catch (err) {
    console.error('GET Lists Error:', err);
    return NextResponse.json({ error: 'Failed to fetch lists' }, { status: 500 });
  }
}

// ---------- POST /api/lists ----------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createListSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const list: List = {
      _id: `list:${randomUUID()}`,
      type: 'list',
      title: parsed.data.title,
      boardId: parsed.data.boardId,
      position: parsed.data.position ?? 0,
      color: parsed.data.color,
    };
    const result = await kanbansDB.insert(list);

    return NextResponse.json({ message: 'List created', id: result.id }, { status: 201 });
  } catch (err) {
    console.error('POST List Error:', err);
    return NextResponse.json({ error: 'Failed to create list' }, { status: 500 });
  }
}
