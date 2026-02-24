# Mathemaxxing

Adaptive Mathe-Lernapp fuer Klassen 1-7 -- angepasst an alle 16 deutschen Bundeslaender und Schulformen, mit Gamification und intelligentem Schwierigkeitsgrad.

## Warum Mathemaxxing?

Ich gebe seit 2019 Nachhilfe in Mathe -- erst ehrenamtlich bei der Stadt Dreieich, dann professionell. Dabei habe ich gemerkt: Die meisten Lern-Apps sind entweder zu simpel, nicht an deutsche Lehrplaene angepasst, oder machen keinen Spass. Mathemaxxing soll das aendern.

## Features

- 27+ Themen mit dynamischen Aufgaben-Generatoren
- Adaptiver Schwierigkeitsgrad basierend auf Leitner-System
- Gamification mit XP, Streaks und Raengen
- Alle 16 Bundeslaender + Schulformen
- KI-Tutor fuer individuelle Erklaerungen (optional, Ollama)
- PWA-faehig (offline nutzbar)
- Deutsches Komma-Format (3,14 statt 3.14)

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first, kein `tailwind.config.ts`)
- **Dexie.js** (IndexedDB -- primaerer Fortschritts-Speicher)
- **Zustand** (State Management, 3 separate Stores)
- **KaTeX** (Mathe-Rendering via CDN)
- **Framer Motion** (Micro-Animationen, LazyMotion)
- **Zod** (Schema-Validierung beim Import)
- **Vitest + Testing Library** (Unit Tests)
- **Playwright** (E2E Tests)

## Setup

```bash
npm install
npm run dev        # Entwicklungsserver (Turbopack)
npm run build      # Production Build
npm test           # Unit Tests (Vitest)
npm run test:e2e   # E2E Tests (Playwright)
npm run type-check # TypeScript pruefen
```

## Wichtige Designentscheidungen

### Tailwind CSS v4 (CSS-first)
Kein `tailwind.config.ts`! Stattdessen CSS-Variables in `globals.css`:
```css
@import "tailwindcss";
@theme {
  --color-primary-gs: #FF6B35;
  /* ... */
}
```

### Storage-Architektur
```
Dexie.js (IndexedDB)  <- Fortschritt, Leitner-Karten, Versuche
localStorage           <- nur: bundesland, klasse, schulform, theme
In-Memory (Zustand)    <- Session-State (nicht persistiert)
```

### KI-Tutor (sicher)
Der Anthropic API-Key bleibt **server-seitig** in `/api/tutor/route.ts`.
Niemals `NEXT_PUBLIC_ANTHROPIC_API_KEY` verwenden!

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

Ohne API-Key laeuft der Tutor im regelbasierten Offline-Modus.

### Deutsches Kommazeichen
`evaluator.ts` normalisiert `3,14` zu `3.14` vor jedem Vergleich:
```typescript
normaliseGermanNumber('3,14')    // -> '3.14'
normaliseGermanNumber('1.000,50') // -> '1000.50'
```

### Schema-Versionierung
Alle Stores haben `version: 1` mit `migrate()`-Funktion -- niemals weglassen!

## Bundesland-Besonderheiten

- **Berlin & Brandenburg**: Grundschule geht bis Klasse 6 (nicht 4)
- **Bayern**: Mittelschule statt Hauptschule
- **Gesamtschule/Gemeinschaftsschule**: Kurstyp-Auswahl (G/E) noetig

## 27 Demo-Themen (vollstaendig implementiert)

Klassen 1-7, alle Schulformen, generatorbasiert (mindestens 15 dynamische Aufgaben pro Thema).

## Leitner-System

5-Box Spaced Repetition:
- Box 1: 1 Tag
- Box 2: 3 Tage
- Box 3: 7 Tage
- Box 4: 14 Tage
- Box 5: 30 Tage

Falsche Antwort bringt die Karte zurueck zu Box 1. Richtige Antwort schiebt sie in die naechste Box.

## Autor

**Sadan Akbari** -- Wirtschaftsinformatik-Student an der Frankfurt University of Applied Sciences
Nachhilfelehrer seit 2019

[Portfolio](https://sadanakb.github.io) | [LinkedIn](https://www.linkedin.com/in/sadan-akbari) | [GitHub](https://github.com/sadanakb)

## Lizenz

MIT
