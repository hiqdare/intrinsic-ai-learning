import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface ModuleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  status?: 'not_started' | 'in_progress' | 'completed'; 
  progress?: number;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: 'Business' | 'Digital' | 'Umwelt';
  image?: string;
  tags?: string[];
}

const ModuleCard = React.forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ className, title, description, status = 'not_started', duration, difficulty, image, tags = [], ...props }, ref) => {
    const statusClasses = {
      not_started: 'bg-secondary text-secondary-foreground',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    
    const statusLabels = {
      not_started: 'Nicht begonnen',
      in_progress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
    };
    
    const difficultyLabels = {
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Experte',
    };
    
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
            <Image 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span 
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                statusClasses[status]
              )}
            >
              {statusLabels[status]}
            </span>
          </div>
          
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {duration && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{duration}</span>
              </div>
            )}
            
            {difficulty && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{difficultyLabels[difficulty]}</span>
              </div>
            )}
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
ModuleCard.displayName = "ModuleCard";

export { ModuleCard };
