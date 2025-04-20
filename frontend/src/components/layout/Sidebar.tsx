import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col w-64 h-screen bg-background border-r",
          className
        )}
        {...props}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    );
  }
);
Sidebar.displayName = "Sidebar";

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center px-4 py-3 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
          active && "bg-accent text-accent-foreground font-medium",
          className
        )}
        {...props}
      >
        {icon && <div className="mr-3">{icon}</div>}
        {children}
      </div>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-2", className)}
        {...props}
      >
        {title && (
          <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
        )}
        <div className="space-y-1">
          {children}
        </div>
      </div>
    );
  }
);
SidebarSection.displayName = "SidebarSection";

export { Sidebar, SidebarItem, SidebarSection };
