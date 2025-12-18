// app/boards/[boardSlug]/page.tsx
import { findBoardBySlug } from '@/lib/repos/boards.repo';
import { findListsByBoard } from '@/lib/repos/lists.repo';
import { findCardsByBoard } from '@/lib/repos/cards.repo';
import BoardClient from './BoardClient';

type PageProps = {
  params: Promise<{ boardSlug: string }>;
};

export default async function BoardPage({ params }: PageProps) {
  const { boardSlug } = await params;

  const board = await findBoardBySlug(boardSlug);

  if (!board) {
    return <div className="p-6">Board not found</div>;
  }

  try {
    const [lists, cards] = await Promise.all([
      findListsByBoard(board._id),
      findCardsByBoard(board._id),
    ]);

    return <BoardClient initialBoard={board} initialLists={lists} initialCards={cards} />;
  } catch (err) {
    console.error('Failed to load board data:', err);

    return <div className="p-6 text-red-500">Failed to load board data</div>;
  }
}
