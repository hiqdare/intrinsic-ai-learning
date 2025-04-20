import React from 'react';
import { cn } from '@/lib/utils';

export interface StudentListProps extends React.HTMLAttributes<HTMLDivElement> {
  students: Array<{
    id: string;
    name: string;
    avatar?: string;
    grade?: string;
    activeLearningPaths?: number;
    lastActivity?: string;
    progress?: number;
    status?: 'active' | 'inactive' | 'needs_attention';
  }>;
  onStudentSelect?: (studentId: string) => void;
}

const StudentList = React.forwardRef<HTMLDivElement, StudentListProps>(
  ({ className, students, onStudentSelect, ...props }, ref) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      needs_attention: 'bg-yellow-100 text-yellow-800',
    };
    
    const statusLabels = {
      active: 'Aktiv',
      inactive: 'Inaktiv',
      needs_attention: 'Benötigt Aufmerksamkeit',
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Klasse</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lernpfade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Letzte Aktivität</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Fortschritt</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student.id} 
                  className="border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => onStudentSelect?.(student.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-muted mr-3">
                        {student.avatar ? (
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{student.grade || '-'}</td>
                  <td className="px-4 py-3 text-sm">{student.activeLearningPaths || 0}</td>
                  <td className="px-4 py-3 text-sm">{student.lastActivity || 'Nie'}</td>
                  <td className="px-4 py-3">
                    {student.progress !== undefined && (
                      <div className="flex items-center">
                        <span className="text-sm mr-2">{student.progress}%</span>
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {student.status && (
                      <span 
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          statusColors[student.status]
                        )}
                      >
                        {statusLabels[student.status]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    Keine Schüler gefunden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);
StudentList.displayName = "StudentList";

export { StudentList };
