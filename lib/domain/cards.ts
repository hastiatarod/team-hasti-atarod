// lib/domain/cards.ts

import { kanbansDB } from '@/lib/couchdb';
import type { Card } from '@/types/card';
import { randomUUID } from 'crypto';

export async function createCard(
  data: {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    position?: number;
  },
  boardId: string,
  listId: string,
) {
  const card: Card = {
    _id: `card:${randomUUID()}`,
    type: 'card',
    boardId,
    listId,
    title: data.title,
    description: data.description,
    priority: data.priority,
    position: data.position ?? 0,
    createdAt: new Date().toISOString(),
  };

  return kanbansDB.insert(card);
}

export async function updateCard(cardId: string, data: Partial<Card>) {
  const existing = await kanbansDB.get(cardId);
  const updated = { ...existing, ...data };
  return kanbansDB.insert(updated);
}

export async function deleteCard(cardId: string) {
  const card = await kanbansDB.get(cardId);
  return kanbansDB.destroy(card._id, card._rev);
}
