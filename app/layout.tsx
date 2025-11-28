import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Footer from '@/components/Layout-footer';
import Header from '@/components/Layout-header';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />

            {/* 💡 This container MUST enforce full width + no horizontal expansion */}
            <div className="flex flex-col w-full max-w-full overflow-x-hidden">
              <Header />

              {/* 💡 Only the children area may scroll */}
              <main className="flex-1 min-h-0">
                <div className="h-full w-full overflow-auto">{children}</div>
              </main>
            </div>
          </SidebarProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
