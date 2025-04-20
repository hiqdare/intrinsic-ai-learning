import React from 'react';
import { cn } from '@/lib/utils';

export interface StudentProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  email?: string;
  grade?: string;
  interests?: string[];
  strengths?: string[];
  activeLearningPaths?: number;
  completedModules?: number;
}

const StudentProfileCard = React.forwardRef<HTMLDivElement, StudentProfileCardProps>(
  ({ 
    className, 
    name, 
    avatar, 
    email, 
    grade, 
    interests = [], 
    strengths = [], 
    activeLearningPaths = 0, 
    completedModules = 0, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-xl font-semibold">
                  {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{name}</h3>
              {email && <p className="text-sm text-muted-foreground">{email}</p>}
              {grade && <p className="text-sm mt-1">Klasse: {grade}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Interessen</h4>
              <div className="flex flex-wrap gap-1">
                {interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Keine Interessen angegeben</span>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Stärken</h4>
              <div className="flex flex-wrap gap-1">
                {strengths.length > 0 ? (
                  strengths.map((strength, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                    >
                      {strength}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Keine Stärken angegeben</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-muted rounded-md text-center">
              <span className="text-2xl font-bold">{activeLearningPaths}</span>
              <p className="text-sm text-muted-foreground">Aktive Lernpfade</p>
            </div>
            <div className="p-3 bg-muted rounded-md text-center">
              <span className="text-2xl font-bold">{completedModules}</span>
              <p className="text-sm text-muted-foreground">Abgeschlossene Module</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
StudentProfileCard.displayName = "StudentProfileCard";

export { StudentProfileCard };
