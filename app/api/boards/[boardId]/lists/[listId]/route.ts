// app/api/boards/[boardId]/lists/[listId]/route.ts
// GET / PUT / DELETE a single list in a board

import { NextResponse } from 'next/server';
import { updateListSchema } from '@/validations/list';
import { updateList, deleteList } from '@/lib/domain/lists';
import { findListsByBoard } from '@/lib/repos/lists.repo';

// ---------- Types ----------
interface Params {
  params: {
    boardId: string;
    listId: string;
  };
}

// ---------- GET ----------
export async function GET(_: Request, { params }: Params) {
  try {
    const lists = await findListsByBoard(params.boardId);
    const list = lists.find((l) => l._id === params.listId);

    if (!list) {
      return NextResponse.json({ error: 'List not found in this board' }, { status: 404 });
    }
    return NextResponse.json({ list });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch list' }, { status: 500 });
  }
}

// ---------- PUT ----------
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = updateListSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    await updateList(params.listId, parsed.data);

    return NextResponse.json({ message: 'List updated' });
  } catch {
    return NextResponse.json({ error: 'Failed to update list' }, { status: 500 });
  }
}
// ---------- DELETE ----------
export async function DELETE(_: Request, { params }: Params) {
  try {
    await deleteList(params.listId);

    return NextResponse.json({ message: 'List deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete list' }, { status: 500 });
  }
}
