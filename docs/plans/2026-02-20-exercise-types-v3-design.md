# MatheMeister v3 — Aufgabentypen Design

## Entscheidungen

- **Drag & Drop:** Native HTML5 Drag API + `mobile-drag-drop` Polyfill
- **Rendering:** SVG + React für alle interaktiven/geometrischen Aufgaben
- **Priorität:** 23 fehlende Aufgabentypen vor Generatoren und Gamification

## Architektur

Jeder Aufgabentyp = eigenständige React-Komponente unter `src/components/exercises/`.

```typescript
interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: any) => void;
  onHint: () => void;
  disabled: boolean;
}
```

**ExerciseRouter** mappt `exercise.type` → Komponente.
**ExerciseWrapper** orchestriert: Fortschrittsbalken, Aufgabe, Feedback, XP.

## 23 Typen in 5 Gruppen

### Gruppe 1 — Drag & Drop (6)
1. `DragSort` — Reihenfolge
2. `DragMatch` — Paare zuordnen
3. `DragIntoGaps` — Lückentext
4. `DragOntoNumberline` — Zahlenstrahl (SVG)
5. `DragOntoGrid` — Koordinatensystem (SVG)
6. `Classify` — Kategorien sortieren

### Gruppe 2 — Interaktive Mathematik (6)
7. `FractionVisual` — Bruchteile markieren (SVG Kreis/Rechteck)
8. `PlaceValueTable` — Stellenwerttafel H/Z/E
9. `CalculationPyramid` — Zahlenmauer
10. `NumberMachine` — Input→Operation→Output
11. `EquationBalance` — Waage-Modell (SVG)
12. `ClockDrag` — Uhrzeiger ziehen (SVG)

### Gruppe 3 — Visuell/Geometrie (4)
13. `MirrorDraw` — Spiegelfigur (SVG-Gitter)
14. `AreaCount` — Kästchen klicken (SVG)
15. `AngleMeasure` — Winkel einstellen (SVG)
16. `GraphDraw` — Funktionspunkte setzen (SVG)

### Gruppe 4 — Quiz-Varianten (4)
17. `MultipleSelect` — Mehrere richtige (Checkboxen)
18. `TrueFalse` — Große Wahr/Falsch Buttons
19. `SpeedQuiz` — Timer-basiert
20. `Estimation` — Schieberegler mit Toleranz

### Gruppe 5 — Tabellen & Spiel (3)
21. `FillTable` — Editierbare Tabellen-Zellen
22. `MemoryPairs` — Memory Aufgabe↔Lösung
23. `BarChartRead` — SVG-Diagramm ablesen

## Shared SVG-Primitives

`src/components/exercises/svg/`:
- `Grid` — Kästchengitter
- `NumberlineBase` — Skalierbarer Zahlenstrahl
- `ClockFace` — Zifferblatt

## Touch-Support

`mobile-drag-drop` Polyfill global in `layout.tsx`.
