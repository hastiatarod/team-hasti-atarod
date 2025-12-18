// lib/domain/boards.ts

import { kanbansDB } from '@/lib/couchdb';
import type { Board } from '@/types/board';

export async function updateBoard(
  boardId: string,
  data: Partial<Pick<Board, 'title' | 'description'>>,
) {
  const existing = (await kanbansDB.get(boardId)) as Board;

  const updated: Board = {
    ...existing,
    ...data,
  };

  return kanbansDB.insert(updated);
}
