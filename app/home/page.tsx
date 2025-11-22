import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="w-full p-6 space-y-6">
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to KanbanBoard</h1>
        <p className="text-muted-foreground">
          Organize your tasks, track progress, and collaborate easily.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Your Boards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4 text-muted-foreground">
              View and manage all your project boards.
            </p>
            <Button className="w-full">Go to Boards</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Workspaces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4 text-muted-foreground">
              Create or join a workspace to collaborate.
            </p>
            <Button className="w-full">View Workspaces</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4 text-muted-foreground">
              Learn more about how this KanbanBoard works.
            </p>
            <Button className="w-full">Read More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
