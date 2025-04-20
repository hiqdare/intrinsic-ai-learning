# intrinsic.ai learning - Produktionsbereitstellungsplan

## Übersicht
Dieser Dokument beschreibt den Plan für die Bereitstellung der intrinsic.ai learning Plattform in einer Produktionsumgebung. Die Plattform nutzt Google Cloud Platform (GCP) oder Microsoft Azure als Hosting-Lösung und implementiert Google OAuth mit Domainbeschränkung auf yiagency.ch.

## 1. Infrastruktur-Setup

### Google Cloud Platform (Option 1)
- **App Engine**: Für das Hosting der Frontend-Anwendung (Next.js)
- **Cloud Run**: Für das Hosting der Backend-API (Node.js/Express)
- **Cloud SQL**: Für die MongoDB-Datenbank
- **Cloud Storage**: Für statische Assets und Benutzeruploads
- **Cloud IAM**: Für die Zugriffssteuerung und Sicherheit
- **Cloud CDN**: Für die Bereitstellung von statischen Inhalten

### Microsoft Azure (Option 2)
- **Azure App Service**: Für das Hosting der Frontend- und Backend-Anwendungen
- **Azure Cosmos DB**: Für die MongoDB-kompatible Datenbank
- **Azure Blob Storage**: Für statische Assets und Benutzeruploads
- **Azure Active Directory**: Für die Zugriffssteuerung und Sicherheit
- **Azure CDN**: Für die Bereitstellung von statischen Inhalten

## 2. Domain-Setup
- Registrierung der Domain **intrinsic-learning.ai** (verfügbar für $79.98/Jahr)
- Konfiguration der DNS-Einträge:
  - A-Record für die Hauptdomain
  - CNAME für www-Subdomain
  - MX-Records für E-Mail-Dienste
  - TXT-Records für SPF und DKIM zur E-Mail-Validierung

## 3. SSL-Zertifikate
- Einrichtung von Let's Encrypt SSL-Zertifikaten für:
  - intrinsic-learning.ai
  - www.intrinsic-learning.ai
  - api.intrinsic-learning.ai
- Automatische Erneuerung der Zertifikate konfigurieren

## 4. Umgebungsvariablen
```
# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.intrinsic-learning.ai
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>

# Backend (.env.production)
PORT=8080
NODE_ENV=production
MONGODB_URI=<MONGODB_CONNECTION_STRING>
JWT_SECRET=<SECURE_RANDOM_STRING>
SESSION_SECRET=<SECURE_RANDOM_STRING>
GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
FRONTEND_URL=https://intrinsic-learning.ai
```

## 5. Google OAuth-Konfiguration
1. Google Cloud Console öffnen
2. Neues Projekt erstellen: "intrinsic-learning-ai"
3. OAuth 2.0-Client-ID erstellen
4. Autorisierte Umleitungs-URIs konfigurieren:
   - https://intrinsic-learning.ai/api/auth/google/callback
   - http://localhost:5000/api/auth/google/callback (für Entwicklung)
5. Domainbeschränkung auf yiagency.ch konfigurieren

## 6. CI/CD-Pipeline
### GitHub Actions Workflow
```yaml
name: Deploy intrinsic.ai learning

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    # Frontend Build
    - name: Install Frontend Dependencies
      working-directory: ./implementation/frontend
      run: npm ci
      
    - name: Build Frontend
      working-directory: ./implementation/frontend
      run: npm run build
      
    # Backend Build
    - name: Install Backend Dependencies
      working-directory: ./implementation/backend
      run: npm ci
      
    # Deploy to Cloud (GCP or Azure)
    - name: Deploy to Cloud
      uses: google-github-actions/deploy-appengine@v1
      # Oder Azure-Deployment-Action
      with:
        credentials: ${{ secrets.GCP_SA_KEY }}
        project_id: ${{ secrets.GCP_PROJECT_ID }}
```

## 7. Datenbank-Setup
1. MongoDB-Cluster erstellen (Cloud SQL oder Cosmos DB)
2. Datenbanksicherheit konfigurieren:
   - Starke Passwörter
   - IP-Beschränkungen
   - Verschlüsselung im Ruhezustand und während der Übertragung
3. Initiale Datenbankmigration durchführen
4. Backup-Strategie implementieren

## 8. Monitoring und Logging
1. Application Insights (Azure) oder Cloud Monitoring (GCP) einrichten
2. Benutzerdefinierte Dashboards für:
   - API-Leistung
   - Fehlerraten
   - Benutzeraktivität
   - Serverauslastung
3. Alarme für kritische Ereignisse konfigurieren

## 9. Sicherheitsmaßnahmen
1. Web Application Firewall (WAF) konfigurieren
2. DDoS-Schutz aktivieren
3. Regelmäßige Sicherheitsaudits planen
4. CORS-Richtlinien konfigurieren
5. Rate-Limiting implementieren

## 10. Skalierungsstrategie
1. Auto-Scaling für Backend-Dienste konfigurieren
2. Lastausgleich für mehrere Instanzen einrichten
3. Caching-Strategie für statische Inhalte implementieren
4. CDN für globale Bereitstellung konfigurieren

## 11. Backup und Disaster Recovery
1. Tägliche Datenbank-Backups konfigurieren
2. Backup-Aufbewahrungsrichtlinie definieren
3. Disaster-Recovery-Plan dokumentieren
4. Wiederherstellungsverfahren testen

## 12. Launch-Checkliste
- [ ] Finale Sicherheitsüberprüfung
- [ ] Leistungstests unter Last
- [ ] Benutzerakzeptanztests
- [ ] DNS-Propagation überprüfen
- [ ] SSL-Zertifikate validieren
- [ ] Monitoring-Dashboards überprüfen
- [ ] Backup-Systeme testen
- [ ] Dokumentation finalisieren

## 13. Post-Launch-Aktivitäten
1. Leistungsüberwachung in den ersten 48 Stunden
2. Feedback von ersten Benutzern sammeln
3. Schnelle Fehlerbehebung bei auftretenden Problemen
4. Erste Optimierungen basierend auf realen Nutzungsdaten
