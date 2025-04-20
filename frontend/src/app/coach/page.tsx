import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar, SidebarItem, SidebarSection } from '@/components/layout/Sidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StudentList } from '@/components/features/StudentList';
import { CoachDashboardCard } from '@/components/features/CoachDashboardCard';

export default function CoachDashboard() {
  return (
    <DashboardLayout
      header={
        <Navbar>
          <div className="flex items-center gap-4">
            <Avatar 
              src="/images/coach-avatar.png" 
              alt="Profilbild" 
              fallback="LC"
            />
            <div>
              <span className="font-medium">Lisa Coach</span>
              <span className="text-sm text-muted-foreground block">lisa.coach@yiagency.ch</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Profil</Button>
            <Button variant="outline" size="sm">Benachrichtigungen</Button>
          </div>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <div className="p-4">
            <h2 className="text-xl font-bold">intrinsic.ai learning</h2>
          </div>
          <SidebarSection>
            <SidebarItem active>Coach Dashboard</SidebarItem>
            <SidebarItem>Meine Schüler</SidebarItem>
            <SidebarItem>Lernpfade verwalten</SidebarItem>
            <SidebarItem>Module erstellen</SidebarItem>
            <SidebarItem>Projekte bewerten</SidebarItem>
          </SidebarSection>
          <SidebarSection title="Kategorien">
            <SidebarItem>Business & Entrepreneurship</SidebarItem>
            <SidebarItem>Digitale Identität</SidebarItem>
            <SidebarItem>Umwelt & Nachhaltigkeit</SidebarItem>
            <SidebarItem>Gesellschaft & Ethik</SidebarItem>
            <SidebarItem>Finanzielle Bildung</SidebarItem>
          </SidebarSection>
        </Sidebar>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Coach Dashboard</h1>
          <Button>Neuen Schüler hinzufügen</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CoachDashboardCard 
            title="Aktive Schüler" 
            value="24" 
            change="+2"
            description="Seit letztem Monat"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />
          
          <CoachDashboardCard 
            title="Offene Projekte" 
            value="18" 
            change="-3"
            description="Seit letzter Woche"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            }
          />
          
          <CoachDashboardCard 
            title="Durchschnittlicher Fortschritt" 
            value="72%" 
            change="+5%"
            description="Seit letztem Monat"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            }
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Meine Schüler</h2>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Schülerübersicht</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Filtern</Button>
                  <Button variant="outline" size="sm">Exportieren</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StudentList 
                students={[
                  {
                    id: '1',
                    name: 'Max Schüler',
                    email: 'max.schueler@yiagency.ch',
                    avatar: '/images/avatar.png',
                    progress: 68,
                    activeLearningPaths: 2,
                    lastActivity: '2025-04-20T10:23:00Z'
                  },
                  {
                    id: '2',
                    name: 'Anna Müller',
                    email: 'anna.mueller@yiagency.ch',
                    avatar: '/images/avatar-2.png',
                    progress: 92,
                    activeLearningPaths: 3,
                    lastActivity: '2025-04-19T15:45:00Z'
                  },
                  {
                    id: '3',
                    name: 'Tim Berger',
                    email: 'tim.berger@yiagency.ch',
                    avatar: '/images/avatar-3.png',
                    progress: 45,
                    activeLearningPaths: 1,
                    lastActivity: '2025-04-18T09:12:00Z'
                  },
                  {
                    id: '4',
                    name: 'Sarah Weber',
                    email: 'sarah.weber@yiagency.ch',
                    avatar: '/images/avatar-4.png',
                    progress: 78,
                    activeLearningPaths: 2,
                    lastActivity: '2025-04-20T08:30:00Z'
                  },
                  {
                    id: '5',
                    name: 'Jan Schmidt',
                    email: 'jan.schmidt@yiagency.ch',
                    avatar: '/images/avatar-5.png',
                    progress: 33,
                    activeLearningPaths: 2,
                    lastActivity: '2025-04-17T14:20:00Z'
                  }
                ]}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Zu bewertende Projekte</CardTitle>
              <CardDescription>Projekte, die auf deine Bewertung warten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src="/images/avatar.png" 
                      alt="Max Schüler" 
                      fallback="MS"
                    />
                    <div>
                      <p className="text-sm font-medium">Nachhaltigkeits-Challenge</p>
                      <p className="text-xs text-muted-foreground">Max Schüler • Eingereicht am 19.04.2025</p>
                    </div>
                  </div>
                  <Button size="sm">Bewerten</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src="/images/avatar-2.png" 
                      alt="Anna Müller" 
                      fallback="AM"
                    />
                    <div>
                      <p className="text-sm font-medium">Digitale Identität Reflexion</p>
                      <p className="text-xs text-muted-foreground">Anna Müller • Eingereicht am 18.04.2025</p>
                    </div>
                  </div>
                  <Button size="sm">Bewerten</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src="/images/avatar-4.png" 
                      alt="Sarah Weber" 
                      fallback="SW"
                    />
                    <div>
                      <p className="text-sm font-medium">Finanzplan erstellen</p>
                      <p className="text-xs text-muted-foreground">Sarah Weber • Eingereicht am 17.04.2025</p>
                    </div>
                  </div>
                  <Button size="sm">Bewerten</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Anstehende Coaching-Termine</CardTitle>
              <CardDescription>Deine nächsten Termine mit Schülern</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Max Schüler</p>
                      <p className="text-xs text-muted-foreground">Morgen, 14:00 - 14:30 Uhr</p>
                    </div>
                  </div>
                  <Badge>Bestätigt</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tim Berger</p>
                      <p className="text-xs text-muted-foreground">22.04.2025, 10:00 - 10:30 Uhr</p>
                    </div>
                  </div>
                  <Badge variant="outline">Ausstehend</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jan Schmidt</p>
                      <p className="text-xs text-muted-foreground">23.04.2025, 15:30 - 16:00 Uhr</p>
                    </div>
                  </div>
                  <Badge variant="outline">Ausstehend</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Anna Müller</p>
                      <p className="text-xs text-muted-foreground">24.04.2025, 11:00 - 11:30 Uhr</p>
                    </div>
                  </div>
                  <Badge variant="outline">Ausstehend</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
