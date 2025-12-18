// app/api/boards/[boardId]/list/[listId]/cards/[cardId]/route.ts
// GET / PUT / DELETE for a single card

import { NextResponse } from 'next/server';
import { updateCardSchema } from '@/validations/card';
import { updateCard, deleteCard } from '@/lib/domain/cards';
import { findCardById } from '@/lib/repos/cards.repo';

// ---------- Types ----------
interface Params {
  params: {
    boardId: string;
    listId: string;
    cardId: string;
  };
}

// ---------- GET ----------
export async function GET(_: Request, { params }: Params) {
  try {
    const card = await findCardById(params.cardId);

    if (!card || card.boardId !== params.boardId || card.listId !== params.listId) {
      return NextResponse.json({ error: 'Card not found in this list or board' }, { status: 404 });
    }

    return NextResponse.json({ card });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

// ---------- PUT ----------
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = updateCardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }
    await updateCard(params.cardId, parsed.data);

    return NextResponse.json({ message: 'Card updated' });
  } catch {
    return NextResponse.json({ error: 'Failed to update card' }, { status: 500 });
  }
}

// ---------- DELETE ----------
export async function DELETE(_: Request, { params }: Params) {
  try {
    await deleteCard(params.cardId);
    return NextResponse.json({ message: 'Card deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}
