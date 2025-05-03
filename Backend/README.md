# Backend – Semesterarbeit

Dieses Readme bezieht sich auf das Backend der Semesterarbeit Sidelink. Es basiert auf Django/DRF/JWT und stellt die REST-API für das Frontend bereit.

### 1. Voraussetzungen

Für die Entwicklung wurde folgende Versionen verwendet:

- [Python] : 3.13.2

## Setup & Inbetriebnahme

### 1. Repository klonen

```bash
git clone https://git.ffhs.ch/web-technologien/fsdev/fs25/w4b-c-fs001.fsdev.zh-sa-1/main-projects/semesterarbeit_kay_hertenstein.git
cd Backend
```

### 2. Virtuelle Umgebung erstellen und aktivieren

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 3. Abhängigkeiten installieren

Stelle sicher, dass du dich im Projektverzeichnis befindest und installiere alle benötigten Pakete:

```bash
pip install -r requirements.txt
```
### 4. Migrationen anwenden

```bash
cd side_link
python manage.py migrate
```

### 5. Entwicklungsserver starten

Starte die Anwendung im Entwicklungsmodus:

```bash
python manage.py runserver
```

Standardmäßig ist das Backend dann unter [http://127.0.0.1:8000](http://127.0.0.1:8000) erreichbar.
