import { kanbansDB } from '@/lib/couchdb';
import type { List } from '@/types/list';
import { randomUUID } from 'crypto';

export async function createList(
  data: {
    title: string;
    position?: number;
    color?: string;
  },
  boardId: string,
) {
  const list: List = {
    _id: `list:${randomUUID()}`,
    type: 'list',
    boardId,
    title: data.title,
    position: data.position ?? 0,
    color: data.color,
  };

  return kanbansDB.insert(list);
}

export async function deleteList(listId: string) {
  const list = await kanbansDB.get(listId);
  return kanbansDB.destroy(list._id, list._rev);
}
