// app/api/lists/[listId]/route.ts
// GET / PUT / DELETE for a single list

import { NextResponse } from 'next/server';
import { kanbansDB } from '@/lib/couchdb';
import type { List } from '@/types/list';
import { updateListSchema } from '@/validations/list';

// ---------- Types ----------
interface Params {
  params: { listId: string };
}

interface NanoError {
  statusCode?: number;
  error?: string;
  message?: string;
  reason?: string;
}

// ---------- Type Guards ----------
function isNanoError(err: unknown): err is NanoError {
  return (
    typeof err === 'object' &&
    err !== null &&
    ('statusCode' in err || 'error' in err || 'reason' in err || 'message' in err)
  );
}

function getStatus(err: unknown): number {
  if (isNanoError(err) && typeof err.statusCode === 'number') {
    return err.statusCode;
  }
  return 500;
}

function getMessage(err: unknown): string {
  if (isNanoError(err)) {
    if (typeof err.reason === 'string') return err.reason;
    if (typeof err.message === 'string') return err.message;
    if (typeof err.error === 'string') return err.error;
  }
  return 'Unknown error';
}

// ---------- GET /api/lists/[listId] ----------
export async function GET(_: Request, { params }: Params) {
  try {
    const list = (await kanbansDB.get(params.listId)) as List;
    return NextResponse.json({ list });
  } catch (error: unknown) {
    return NextResponse.json({ error: getMessage(error) }, { status: getStatus(error) });
  }
}

// ---------- PUT /api/lists/[listId] ----------
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = updateListSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const existing = (await kanbansDB.get(params.listId)) as List;

    const updated: List = {
      ...existing,
      ...parsed.data,
    };

    const result = await kanbansDB.insert(updated);

    return NextResponse.json({
      message: 'List updated',
      id: result.id,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getMessage(error) }, { status: getStatus(error) });
  }
}

// ---------- DELETE /api/lists/[listId] ----------
export async function DELETE(_: Request, { params }: Params) {
  try {
    const existing = (await kanbansDB.get(params.listId)) as List;

    const result = await kanbansDB.destroy(existing._id, existing._rev!);

    return NextResponse.json({
      message: 'List deleted',
      id: result.id,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getMessage(error) }, { status: getStatus(error) });
  }
}
