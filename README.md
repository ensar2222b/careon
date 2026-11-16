# Careon

Statische Website mit einem interaktiven Assistenten für die Jobsuche. Die Oberfläche ist auf Deutsch, der Assistent läuft vollständig im Browser – ohne Konto, ohne Backend und ohne API-Schlüssel.

## Nutzung

Die Seite kann direkt über `index.html` geöffnet werden (auch über `file://`). Für die installierbare App und den Offline-Modus einen lokalen Server verwenden, zum Beispiel:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Anschließend `http://127.0.0.1:8080/` im Browser öffnen.

Auf dem iPhone: in Safari das Teilen-Menü öffnen und **Zum Home-Bildschirm** wählen. Die Dateien nutzen relative Pfade und lassen sich unverändert auf GitHub Pages in einem Unterordner ablegen.

## Funktionen

Der Careon-Assistent führt ein kurzes Gespräch zu Berufsfeld, Kenntnissen, Erfahrung, Ort und Arbeitsmodell. Anschließend:

- passende Jobtitel mit einer groben Passung
- Hinweise zum Lebenslauf
- ein formeller Anschreiben-Entwurf zum Kopieren
- typische Interviewfragen mit kurzer Rückmeldung
- Suchlinks zu StepStone, Indeed, LinkedIn Jobs und der Jobbörse der Bundesagentur für Arbeit

Die Zuordnung basiert auf hinterlegten Regeln und Stichworten, nicht auf einem externen Sprachmodell. Vorschläge und Gehaltsspannen sind Orientierungswerte.

Weitere Komfortfunktionen: Autovervollständigung für Name, E-Mail, Stadt und Zielposition; Einfügen eines Lebenslaufs oder einer Stellenanzeige aus der Zwischenablage (mit Analyse und angepasstem Anschreiben); Kopieren und systemeigenes Teilen des Entwurfs; Speichern des Gesprächsstands in diesem Browser.

## Aufbau

```
index.html
css/           Gestaltungsregeln, aufgeteilt nach Aufgabe (inkl. glass.css)
js/            data.js, engine.js, chat.js, main.js
assets/        Careon-Logo und Markenzeichen (SVG)
icons/         Favicon, Apple-Touch-Icon, PWA-Icons
fonts/         Outfit (lokal, SIL Open Font License)
manifest.json
sw.js
```

## Hinweise

Eingaben bleiben in der aktuellen Sitzung auf dem Gerät. Der Service Worker wird nur über `http` oder `https` registriert, nicht unter `file://`.
