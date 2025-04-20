import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar, SidebarItem, SidebarSection } from '@/components/layout/Sidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { LearningPathCard } from '@/components/features/LearningPathCard';
import { ModuleCard } from '@/components/features/ModuleCard';

export default function Dashboard() {
  return (
    <DashboardLayout
      header={
        <Navbar>
          <div className="flex items-center gap-4">
            <Avatar 
              src="/images/avatar.png" 
              alt="Profilbild" 
              fallback="MS"
            />
            <div>
              <span className="font-medium">Max Schüler</span>
              <span className="text-sm text-muted-foreground block">max.schueler@yiagency.ch</span>
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
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Meine Lernpfade</SidebarItem>
            <SidebarItem>Module entdecken</SidebarItem>
            <SidebarItem>Projekte</SidebarItem>
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
          <h1 className="text-3xl font-bold">Willkommen bei intrinsic.ai learning</h1>
          <Button>Neuen Lernpfad starten</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Lernfortschritt</CardTitle>
              <CardDescription>Dein aktueller Fortschritt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Gesamtfortschritt</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <Progress value={68} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Business & Entrepreneurship</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Digitale Identität</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aktivitäten</CardTitle>
              <CardDescription>Deine letzten Aktivitäten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Modul abgeschlossen</p>
                    <p className="text-xs text-muted-foreground">Digitale Präsenz-Audit</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">Heute</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Projekt eingereicht</p>
                    <p className="text-xs text-muted-foreground">Nachhaltigkeits-Challenge</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">Gestern</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Feedback erhalten</p>
                    <p className="text-xs text-muted-foreground">Geschäftsmodell-Analyse</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">Vor 2 Tagen</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nächste Schritte</CardTitle>
              <CardDescription>Empfohlene Aktionen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Coaching-Termin</p>
                    <p className="text-xs text-muted-foreground">Morgen, 14:00 Uhr</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">Bestätigen</Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Modul fortsetzen</p>
                    <p className="text-xs text-muted-foreground">Mikro-Business Launch</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">Fortfahren</Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Projekt fällig</p>
                    <p className="text-xs text-muted-foreground">In 3 Tagen</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">Bearbeiten</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Meine Lernpfade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LearningPathCard 
              title="Business & Entrepreneurship" 
              description="Lerne, wie du ein eigenes Unternehmen gründest und führst."
              progress={85}
              modules={8}
              completedModules={6}
              image="/images/business.jpg"
              tags={["Business", "Entrepreneurship", "Finanzen"]}
            />
            <LearningPathCard 
              title="Digitale Identität & Privatsphäre" 
              description="Verstehe und schütze deine digitale Identität in der vernetzten Welt."
              progress={42}
              modules={6}
              completedModules={2}
              image="/images/digital-identity.jpg"
              tags={["Digital", "Privatsphäre", "Sicherheit"]}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Aktuelle Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModuleCard 
              title="Mikro-Business Launch" 
              description="Entwickle und starte ein kleines Unternehmen für einen Monat."
              progress={65}
              category="Business"
              difficulty="Mittel"
              estimatedTime="10 Stunden"
            />
            <ModuleCard 
              title="Digitale Präsenz-Audit" 
              description="Analysiere deinen digitalen Fußabdruck und identifiziere Datenschutz-Schwachstellen."
              progress={100}
              category="Digital"
              difficulty="Leicht"
              estimatedTime="4 Stunden"
              completed
            />
            <ModuleCard 
              title="Nachhaltigkeits-Challenge" 
              description="Reduziere deinen ökologischen Fußabdruck für zwei Wochen und dokumentiere deine Erfahrungen."
              progress={90}
              category="Umwelt"
              difficulty="Mittel"
              estimatedTime="14 Tage"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Empfohlene Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Finanzplan erstellen</CardTitle>
                    <CardDescription className="mt-1">Erstelle einen persönlichen Finanzplan für die nächsten 6 Monate.</CardDescription>
                  </div>
                  <Badge>Finanzen</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Schwierigkeit:</span>
                    <span>Mittel</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Geschätzte Zeit:</span>
                    <span>5 Stunden</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fähigkeiten:</span>
                    <span>Planung, Finanzen</span>
                  </div>
                  <Button className="w-full mt-2">Modul starten</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Digitaler Detox</CardTitle>
                    <CardDescription className="mt-1">Führe einen 48-stündigen digitalen Detox durch und dokumentiere deine Erfahrungen.</CardDescription>
                  </div>
                  <Badge>Digital</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Schwierigkeit:</span>
                    <span>Leicht</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Geschätzte Zeit:</span>
                    <span>3 Stunden</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fähigkeiten:</span>
                    <span>Selbstreflexion, Disziplin</span>
                  </div>
                  <Button className="w-full mt-2">Modul starten</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Nachhaltigkeits-Audit</CardTitle>
                    <CardDescription className="mt-1">Führe ein Nachhaltigkeits-Audit für dein Zuhause oder deine Schule durch.</CardDescription>
                  </div>
                  <Badge>Umwelt</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Schwierigkeit:</span>
                    <span>Fortgeschritten</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Geschätzte Zeit:</span>
                    <span>8 Stunden</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fähigkeiten:</span>
                    <span>Analyse, Umweltwissen</span>
                  </div>
                  <Button className="w-full mt-2">Modul starten</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
