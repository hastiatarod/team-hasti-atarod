// app/api/boards/[boardId]/lists/[listId]/cards/route.ts
// GET + POST cards for a list

import { NextResponse } from 'next/server';
import { createCardSchema } from '@/validations/card';
import { createCard } from '@/lib/domain/cards';
import { findCardsByList } from '@/lib/repos/cards.repo';

interface Params {
  params: {
    boardId: string;
    listId: string;
  };
}

// ---------- GET ----------
export async function GET(_: Request, { params }: Params) {
  try {
    const cards = await findCardsByList(params.boardId, params.listId);

    return NextResponse.json({ cards });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = createCardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    await createCard(
      {
        title: parsed.data.title,
        description: parsed.data.description,
        priority: parsed.data.priority,
        position: parsed.data.position,
      },
      params.boardId,
      params.listId,
    );

    return NextResponse.json({ message: 'Card created' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
  }
}
