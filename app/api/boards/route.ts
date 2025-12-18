// app/api/boards/route.ts
// GET (board list) + POST (create board)
import { NextResponse } from 'next/server';
import { createBoardSchema } from '@/validations/board';
import { generateSlug } from '@/lib/slug';
import { findAllBoards, createBoardDoc } from '@/lib/repos/boards.repo';

// ---------- GET ----------
export async function GET() {
  try {
    const boards = await findAllBoards();

    return NextResponse.json({ boards });
  } catch (err) {
    console.error('GET Boards Error:', err);
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createBoardSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const { title, description } = parsed.data;
    const slug = generateSlug(title);

    const result = await createBoardDoc({
      title,
      slug,
      description,
    });

    return NextResponse.json({ message: 'Board created', id: result.id }, { status: 201 });
  } catch (err) {
    console.error('POST Board Error:', err);
    return NextResponse.json({ error: 'Failed to create board' }, { status: 500 });
  }
}
