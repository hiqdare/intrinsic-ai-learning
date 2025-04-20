import React from 'react';
import { cn } from '@/lib/utils';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

export function DashboardLayout({
  children,
  sidebar,
  header
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {sidebar}
      <div className="flex flex-col flex-1 overflow-hidden">
        {header}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
