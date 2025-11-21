import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WorkspacesPage() {
  const workspaces = [
    { id: 1, title: 'Team Alpha', members: 5 },
    { id: 2, title: 'Design Squad', members: 3 },
    { id: 3, title: 'Startup Crew', members: 8 },
  ];

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Workspace
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">
        Workspaces help you collaborate with teams and organize multiple boards in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((ws) => (
          <Card key={ws.id} className="shadow-md hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>{ws.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Members: {ws.members}</p>
              <Button variant="outline" className="w-full">
                Open Workspace
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
