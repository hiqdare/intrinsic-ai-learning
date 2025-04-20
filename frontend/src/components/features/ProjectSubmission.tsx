import React from 'react';
import { cn } from '@/lib/utils';

export interface ProjectSubmissionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  dueDate?: string;
  status?: 'draft' | 'submitted' | 'reviewed';
  feedback?: {
    comment?: string;
    score?: number;
    maxScore?: number;
  };
}

const ProjectSubmission = React.forwardRef<HTMLDivElement, ProjectSubmissionProps>(
  ({ className, title, description, dueDate, status = 'draft', feedback, ...props }, ref) => {
    const statusClasses = {
      draft: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-green-100 text-green-800',
    };
    
    const statusLabels = {
      draft: 'Entwurf',
      submitted: 'Eingereicht',
      reviewed: 'Bewertet',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
          className
        )}
        {...props}
      >
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
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          
          {dueDate && (
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Fällig am: {dueDate}</span>
            </div>
          )}
          
          {status === 'reviewed' && feedback && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h4 className="font-medium text-sm">Feedback</h4>
              {feedback.comment && (
                <p className="text-sm mt-1">{feedback.comment}</p>
              )}
              {feedback.score !== undefined && feedback.maxScore !== undefined && (
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium">{feedback.score}/{feedback.maxScore} Punkte</span>
                  <div className="ml-2 flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(feedback.score / feedback.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ProjectSubmission.displayName = "ProjectSubmission";

export { ProjectSubmission };
