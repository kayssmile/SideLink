# SideLink – Lokale Entwicklung mit Docker

Read.me um die Semesterarbeit für CAS FS25 in Betrieb zu nehmen. 

##  Projektstruktur

_Documentation_ : enthält die Dokumentation der Semesterarbeit CAS FS25

_Sidelink_ : `src`-Verzeichnis des Projekts mit Docker-Setup

_README.md_ : Anleitung zur Inbetriebnahme

---

###  Voraussetzungen

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup & Inbetriebnahme
### 1. Repository klonen
```bash
git clone https://git.ffhs.ch/web-technologien/fsdev/fs25/w4b-c-fs001.fsdev.zh-sa-1/main-projects/semesterarbeit_kay_hertenstein.git
cd Frontend/Sidelink
```

### 2. `.env` Datei erstellen

Im Projektverzeichnis eine Datei `.env` erstellen, Als Vorlage dient: 
.env.dist

### 3. 🐳 Docker Umgebung aufbauen
Ins Projektverzeichnis wechseln und ein Terminal öffnen - docker compose ausführen

```bash
docker-compose up 
```

>Info : Beim ersten Ausführen werden alle benötigten Container, Abhängigkeiten und statischen Dateien aufgebaut und bereitgestellt. Dieser Vorgang dauert einige Minuten.
>Sobald der Prozess abgeschlossen ist, sollten im Terminal die Ausgaben des Vite-Entwicklungsservers (Frontend) sowie des Django-Testservers (Backend) sichtbar sein. 


### 4. Inbetriebnahme SideLink Projekt

Wenn im Terminal die Entwicklungsserver gestartet sind. Ist das Frontend erreichbar unter: </br>
http://localhost:5173 
</br>
Das Backend unter: </br>
http://localhost:8000/admin


### 4. Weiteres

Um Django oder npm direkt anzusprechen muss jeweils ein neues Terminal geöffnet werden und der Zugriff auf die Container Shell gemacht werden: 

```bash
 docker exec -it django bash
```
```bash
 docker exec -it react sh
```

#### 4.1 Quality & Perfomance checks

Backend: Testing
```bash
 python manage.py test
```
Test coverage analyisieren:
```bash
 coverage run manage.py test
 coverage report
```
Perfomance-Monitoring via Silk:
```bash
http://localhost:8000/silk/
```
Frontend: Testing
```bash
 npm run test
```


