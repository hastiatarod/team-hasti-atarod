//app/boards/[boardTitle]/actions.ts
'use server';

import { boardsDB } from '@/lib/couchdb';
import { revalidatePath } from 'next/cache';
import type { Board, Task } from '@/types/board';

export async function addTaskAction(boardTitle: string, listId: string, task: Task) {
  try {
    // load board
    const board = (await boardsDB.get(boardTitle)) as Board;

    // update board.list
    const updated: Board = {
      ...board,
      list: board.list.map((lst) =>
        lst.id === listId ? { ...lst, tasks: [task, ...lst.tasks] } : lst,
      ),
    };

    // Save updated board (requires _rev)
    await boardsDB.insert(updated);

    // revalidate board page
    revalidatePath(`/boards/${boardTitle}`);
  } catch (err) {
    console.error('ADD TASK FAILED:', err);
    throw err;
  }
}
