
"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Moon, Sun } from 'lucide-react';
import { ClientOnly } from '@/components/client-only';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const newIsDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    setIsDark(newIsDark);
  };
  
  const sidebarPlaceholder = (
    <div
      className="group peer hidden md:block text-sidebar-foreground"
      style={{ width: 'var(--sidebar-width-icon)' }} // Approx collapsed width
      data-state="collapsed"
      data-collapsible="icon"
      data-variant="sidebar"
      data-side="left"
    >
      <div className="h-svh" /> {/* Placeholder to maintain layout space */}
    </div>
  );


  return (
    <SidebarProvider defaultOpen={true}> {/* Expanded by default for desktop */}
      <ClientOnly fallback={sidebarPlaceholder}>
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="p-4 items-center flex flex-row justify-between">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <HeartHandshake className="text-primary h-7 w-7" />
              <h1 className="text-xl font-semibold text-sidebar-foreground">GratitudeFlow</h1>
            </div>
            <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full hidden">
              <HeartHandshake className="text-primary h-7 w-7" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="ml-2 group-data-[collapsible=icon]:hidden">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
      </ClientOnly>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <ClientOnly>
            <SidebarTrigger className="md:hidden" />
          </ClientOnly>
          {/* Optional: Add breadcrumbs or page title here */}
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
