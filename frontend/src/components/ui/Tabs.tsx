import React from 'react';
import { cn } from '@/lib/utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [selectedTab, setSelectedTab] = React.useState(value || defaultValue);
    
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedTab(value);
      }
    }, [value]);
    
    const handleTabChange = (tabValue: string) => {
      if (value === undefined) {
        setSelectedTab(tabValue);
      }
      onValueChange?.(tabValue);
    };
    
    // Clone children and pass selected state
    const enhancedChildren = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selectedTab,
          onSelect: handleTabChange,
        });
      }
      return child;
    });
    
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  selectedTab?: string;
  onSelect?: (value: string) => void;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, selectedTab, onSelect, ...props }, ref) => {
    // Clone children and pass selected state
    const enhancedChildren = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selected: selectedTab === child.props.value,
          onSelect,
        });
      }
      return child;
    });
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex space-x-1 rounded-md bg-muted p-1",
          className
        )}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, selected, onSelect, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          selected 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
          className
        )}
        onClick={() => onSelect?.(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  selectedTab?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, selectedTab, children, ...props }, ref) => {
    if (value !== selectedTab) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border p-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
