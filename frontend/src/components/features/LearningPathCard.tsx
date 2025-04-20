import React from 'react';
import { cn } from '@/lib/utils';

export interface LearningPathCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  progress?: number;
  modules?: number;
  completed?: number;
  image?: string;
  tags?: string[];
}

const LearningPathCard = React.forwardRef<HTMLDivElement, LearningPathCardProps>(
  ({ className, title, description, progress = 0, modules = 0, completed = 0, image, tags = [], ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow",
          className
        )}
        {...props}
      >
        {image && (
          <div className="h-32 w-full overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Fortschritt</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            <span>{completed} von {modules} Modulen abgeschlossen</span>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
LearningPathCard.displayName = "LearningPathCard";

export { LearningPathCard };
