import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function BoardsPage() {
  const boards = [
    { id: 1, title: 'Personal Tasks', description: 'Your daily and weekly todos.' },
    { id: 2, title: 'Work Project', description: 'Track tasks for the main project.' },
    { id: 3, title: 'Shopping List', description: 'Items to buy and plan.' },
  ];

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Boards</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Board
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <Card key={board.id} className="shadow-md hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>{board.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{board.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
