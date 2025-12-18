// lib/repos/boards.repo.ts

import { kanbansDB } from '@/lib/couchdb';
import type { Board } from '@/types/board';
import { randomUUID } from 'crypto';

// ---------- Reads ----------
export async function findAllBoards(): Promise<Board[]> {
  const result = await kanbansDB.find({
    selector: { type: 'board' },
  });

  return result.docs as Board[];
}

export async function findBoardBySlug(slug: string): Promise<Board | null> {
  const result = await kanbansDB.find({
    selector: {
      type: 'board',
      slug,
    },
    limit: 1,
  });

  return (result.docs[0] as Board) ?? null;
}

export async function findBoardById(boardId: string): Promise<Board> {
  return (await kanbansDB.get(boardId)) as Board;
}

// ---------- Writes ----------

export async function createBoardDoc(data: { title: string; slug: string; description?: string }) {
  const board: Board = {
    _id: `board:${randomUUID()}`,
    type: 'board',
    title: data.title,
    slug: data.slug,
    description: data.description,
  };

  return kanbansDB.insert(board);
}

export async function deleteBoardDoc(boardId: string) {
  const doc = await kanbansDB.get(boardId);
  return kanbansDB.destroy(doc._id, doc._rev);
}
