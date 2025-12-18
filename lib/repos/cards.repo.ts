// lib/repos/cards.repo.ts

import { kanbansDB } from '@/lib/couchdb';
import type { Card } from '@/types/card';

export async function findCardsByBoard(boardId: string): Promise<Card[]> {
  const result = await kanbansDB.find({
    selector: {
      type: 'card',
      boardId,
    },
  });

  return result.docs as Card[];
}

export async function findCardsByList(boardId: string, listId: string): Promise<Card[]> {
  const result = await kanbansDB.find({
    selector: {
      type: 'card',
      boardId,
      listId,
    },
  });

  return result.docs as Card[];
}

export async function findCardById(cardId: string): Promise<Card | null> {
  try {
    return (await kanbansDB.get(cardId)) as Card;
  } catch {
    return null;
  }
}
