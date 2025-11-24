'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Board {
  _id: string;
  type: string;
  title: string;
  description?: string;
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const res = await fetch('/api/boards'); // Next.js API route
        const data = await res.json();
        console.log('Boards fetched:', data.boards);
        setBoards(data.boards);
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBoards();
  }, []);
  if (loading) return <p>Loading boards...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Boards</h1>

      <div className="flex gap-2 items-center">
        <Input placeholder="New board title" />
        <Button>Create Board</Button>
      </div>

      {/* Board List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <Card key={board._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {board.title}
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{board.description || 'No description'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
