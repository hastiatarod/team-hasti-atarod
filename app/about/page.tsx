export default function AboutPage() {
  return (
    <div className="w-full p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">About KanbanBoard</h1>

      <p className="text-muted-foreground text-center">
        A simple and modern Kanban board built with Next.js, TypeScript, Tailwind CSS, and
        shadcn/ui.
      </p>

      <section className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">What is KanbanBoard?</h2>
        <p className="text-muted-foreground">
          KanbanBoard helps you manage tasks visually. Create boards, organize workspaces, and keep
          track of progress in an intuitive drag-and-drop interface. This app is designed to be
          clean, minimal, and easy to use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Create and manage boards</li>
          <li>Organize teams using workspaces</li>
          <li>Track tasks across different stages</li>
          <li>Modern UI built with shadcn/ui</li>
          <li>Fully responsive and fast</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Technology Stack</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Next.js 16 (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>shadcn/ui components</li>
        </ul>
      </section>

      <section className="space-y-4 pb-10">
        <h2 className="text-xl font-semibold">Future Plans</h2>
        <p className="text-muted-foreground">
          The project will grow with features like drag-and-drop tasks, authentication, real-time
          collaboration, and integrations.
        </p>
      </section>
    </div>
  );
}
