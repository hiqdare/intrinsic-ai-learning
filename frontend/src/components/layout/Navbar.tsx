import React from 'react';
import { cn } from '@/lib/utils';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  children?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex h-16 items-center px-4 lg:px-6 border-b bg-background",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {logo && <div className="mr-4">{logo}</div>}
            <h1 className="text-xl font-bold">Schule der Zukunft</h1>
          </div>
          <div className="flex items-center space-x-4">
            {children}
          </div>
        </div>
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

export { Navbar };
