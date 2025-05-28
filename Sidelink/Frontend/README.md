# Frontend – Semesterarbeit

Dieses Readme bezieht sich auf das Frontend der Semesterarbeit Sidelink. Es basiert auf Vite/React/MUI und ist über Redux mit einem zentralen Datenstore verbunden.

### 1. Voraussetzungen

Für die Entwicklung wurde folgende Versionen verwendet:

- [Node.js] : v22.9.0
- [npm] : 10.8.3

## Setup & Inbetriebnahme

### 1. Repository klonen

```bash
git clone https://git.ffhs.ch/web-technologien/fsdev/fs25/w4b-c-fs001.fsdev.zh-sa-1/main-projects/semesterarbeit_kay_hertenstein.git
cd Frontend/Sidelink
```

### 2. Umgebungsvariablen konfigurieren

Erstelle eine `.env` Datei auf Basis der bereitgestellten `.env.dist` Vorlage:

```bash
cp .env.dist .env
```

Passe anschließend die Werte nach Bedarf an. Zum Beispiel:

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

### 3. Abhängigkeiten installieren

Stelle sicher, dass du dich im Projektverzeichnis befindest und installiere alle benötigten Pakete:

```bash
npm install
```

### 4. Entwicklungsserver starten

Starte die Anwendung im Entwicklungsmodus:

```bash
npm run dev
```

Standardmäßig ist das Frontend dann unter [http://localhost:5173](http://localhost:5173) erreichbar.
