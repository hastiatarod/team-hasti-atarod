// app/boards/[id]/page.tsx
'use client';

import BoardClient from './BoardClient';

export default function BoardPage() {
  return (
    <main className="p-6">
      <BoardClient />
    </main>
  );
}
