import React from 'react';
import { cn } from '@/lib/utils';

export interface CoachDashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  footer?: React.ReactNode;
}

const CoachDashboardCard = React.forwardRef<HTMLDivElement, CoachDashboardCardProps>(
  ({ className, title, value, icon, trend, footer, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span 
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.positive ? "↑" : "↓"} {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">{trend.label}</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        
        {footer && (
          <div className="mt-4 pt-4 border-t">
            {footer}
          </div>
        )}
      </div>
    );
  }
);
CoachDashboardCard.displayName = "CoachDashboardCard";

export { CoachDashboardCard };
