// app/api/boards/[boardId]/route.ts
// GET / PUT / DELETE for a single board

import { NextResponse } from 'next/server';
import { updateBoardSchema } from '@/validations/board';
import { updateBoard } from '@/lib/domain/boards';
import { findBoardById, deleteBoardDoc } from '@/lib/repos/boards.repo';

// ---------- Types ----------
interface Params {
  params: { boardId: string };
}

// ---------- GET /api/boards/[boardId] ----------
export async function GET(_: Request, { params }: Params) {
  try {
    const board = await findBoardById(params.boardId);
    return NextResponse.json({ board });
  } catch {
    return NextResponse.json({ error: 'Board not found' }, { status: 404 });
  }
}

// ---------- PUT /api/boards/[boardId] ----------
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = updateBoardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const result = await updateBoard(params.boardId, parsed.data);

    return NextResponse.json({
      message: 'Board updated',
      id: result.id,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update board' }, { status: 500 });
  }
}

// ---------- DELETE /api/boards/[boardId] ----------
export async function DELETE(_: Request, { params }: Params) {
  try {
    const result = await deleteBoardDoc(params.boardId);

    return NextResponse.json({
      message: 'Board deleted',
      id: result.id,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to delete board' }, { status: 500 });
  }
}
