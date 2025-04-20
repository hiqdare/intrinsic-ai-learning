# intrinsic.ai learning

Eine innovative Lernplattform, die Lehrer als Coaches positioniert und Schüler auf Basis ihrer individuellen Fähigkeiten durch den Lernprozess führt.

## Über das Projekt

intrinsic.ai learning ist eine zukunftsorientierte Bildungsplattform, die sich auf praxisorientiertes Lernen konzentriert. Die Plattform unterstützt Schüler im Alter von 15-20 Jahren (mit späterer Erweiterung auf 7-20 Jahre) und fördert das intrinsische Lernen durch reale Projekte und Aufgaben.

## Hauptmerkmale

- **Praxisorientierte Lernmodule** statt traditioneller Fächer
- **Lehrer als Coaches**, die motivierende Lernumgebungen schaffen
- **Personalisierte Lernpfade** basierend auf den Stärken der Schüler
- **KI-Integration** für individualisiertes Lernen
- **Google-Anmeldung** mit Domainbeschränkung auf yiagency.ch

## Technologie-Stack

- **Frontend**: Next.js mit TypeScript und Tailwind CSS
- **Backend**: Node.js mit Express und MongoDB
- **Authentifizierung**: Google OAuth mit Domainbeschränkung
- **Deployment**: Docker, Nginx, Let's Encrypt

## Projektstruktur

```
/
├── frontend/               # Next.js Frontend-Anwendung
│   ├── src/                # Quellcode
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # UI-Komponenten
│   │   └── styles/         # CSS-Stile
│   └── public/             # Statische Dateien
│
├── backend/                # Express.js Backend-API
│   ├── src/                # Quellcode
│   │   ├── config/         # Konfigurationsdateien
│   │   ├── models/         # Datenmodelle
│   │   ├── routes/         # API-Routen
│   │   └── server.js       # Hauptserver-Datei
│   └── tests/              # Testdateien
│
└── deployment/             # Deployment-Konfiguration
    ├── infrastructure/     # Infrastruktur-Konfiguration
    │   ├── nginx/          # Nginx-Konfiguration
    │   └── certbot/        # SSL-Zertifikate
    ├── docker-compose.yml  # Docker Compose-Konfiguration
    ├── .env                # Umgebungsvariablen
    └── deploy.sh           # Deployment-Skript
```

## Installation und Deployment

### Voraussetzungen

- Docker und Docker Compose
- Node.js 20.x oder höher
- MongoDB (für lokale Entwicklung)

### Lokale Entwicklung

1. Repository klonen
2. Frontend starten:
   ```
   cd frontend
   npm install
   npm run dev
   ```
3. Backend starten:
   ```
   cd backend
   npm install
   npm run dev
   ```

### Produktionsdeployment

1. Umgebungsvariablen in `.env` konfigurieren
2. Deployment-Skript ausführen:
   ```
   cd deployment
   ./deploy.sh
   ```
3. SSL-Zertifikate generieren:
   ```
   docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d intrinsic.yiagency.ch -d api.intrinsic.yiagency.ch
   ```
4. Nginx neu starten:
   ```
   docker-compose restart nginx
   ```

## Lizenz

Dieses Projekt ist privat und urheberrechtlich geschützt. Alle Rechte vorbehalten.
