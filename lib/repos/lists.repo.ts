// lib/repos/lists.repo.ts

import { kanbansDB } from '@/lib/couchdb';
import type { List } from '@/types/list';

export async function findListsByBoard(boardId: string): Promise<List[]> {
  const result = await kanbansDB.find({
    selector: {
      type: 'list',
      boardId,
    },
  });

  return result.docs as List[];
}
