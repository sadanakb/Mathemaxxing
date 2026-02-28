# Checkpoint — 2026-02-28 18:37

## Ziel
Alle K1–K4 Exercise-Generatoren auf 3–4 verschiedene Exercise-Type-Varianten erweitern
(ursprünglich viele Generatoren mit nur 1 Exercise-Type)

## Erledigt
- [x] K1 Generatoren erweitert:
  - k1-subtraktion-bis-20.ts: 4 Varianten (number-input, MC, drag-onto-numberline, true-false)
  - k1-addition-bis-20-ohne-uebergang.ts: 4 Varianten (number-input, MC, true-false, calculation-pyramid)
  - k1-addition-bis-20-mit-uebergang.ts: 4 Varianten (number-input, MC, true-false, drag-onto-numberline)
  - k1-tausch-umkehraufgaben.ts: 4 Varianten (number-input, true-false, MC, drag-sort)
  - k1-rechengeschichten.ts: 4 Varianten (number-input, MC, true-false, classify)
  - k1-lagebeziehungen.ts: 4 Varianten (MC, true-false, classify, drag-sort)
  - k1-zahlen-bis-20.ts: bereits 4 Typen ✓ (nicht geändert)
  - k1-muster-und-strukturen.ts: bereits gut ✓ (nicht geändert)

- [x] K2 Generatoren erweitert:
  - k2-addition-mit-uebergang.ts: 4 Varianten (number-input, true-false, equation-balance, drag-onto-numberline)
  - k2-subtraktion-bis-100.ts: 4 Varianten (number-input, true-false, equation-balance, drag-onto-numberline)
  - k2-addition-subtraktion-bis-100.ts: 4 Varianten (number-input, MC, true-false, drag-onto-numberline)
  - k2-sachaufgaben.ts: 4 Varianten (number-input, MC, true-false, classify)
  - k2-zahlenstrahl-bis-100.ts: 4 Varianten (drag-onto-numberline, number-input, true-false, MC)
  - k2-gerade-ungerade.ts: bereits 3 Typen ✓
  - k2-einmaleins-3-4.ts: bereits 3 Typen ✓
  - k2-geometrie-ebene-figuren.ts: bereits viele Typen ✓
  - k2-zahlen-bis-100.ts: bereits viele Typen ✓
  - k2-zahlenfolgen.ts: OK ✓

- [x] K3 Generatoren erweitert:
  - k3-gewichte.ts: 4 Varianten (number-input, classify, true-false, fill-table)
  - k3-zahlenstrahl-bis-1000.ts: 4 Varianten (drag-onto-numberline, true-false, estimation, MC)
  - k3-einmaleins-vertiefen.ts: 4 Varianten (number-input, speed-quiz, memory-pairs, fill-table)
  - k3-zahlen-bis-1000.ts: bereits 6 Varianten ✓
  - k3-liter-milliliter.ts: bereits 3 Typen ✓
  - k3-sachaufgaben-alle-ops.ts: mehrere Typen ✓
  - k3-spiegeln-verschieben.ts: true-false + mirror-draw ✓
  - k3-zeitspannen.ts: clock-drag + number-input ✓
  - k3-halbschriftliche-division.ts: 3 Typen ✓

- [x] K4 Generatoren erweitert:
  - k4-flaeche-und-umfang.ts: 4 Varianten (number-input, MC, true-false, fill-table)
  - k4-sachaufgaben-komplex.ts: 4 Varianten (number-input, MC, true-false, drag-sort)
  - k4-koordinaten-gitternetz.ts: 4 Varianten (number-input, drag-onto-grid, true-false, MC)
  - k4-symmetrie.ts: bereits true-false, MC, mirror-draw ✓
  - k4-rechengesetze.ts: bereits true-false, drag-match, MC ✓
  - k4-dezimalzahlen-einfuehrung.ts: bereits 4+ Typen ✓
  - k4-vierecke-dreiecke.ts: bereits classify, MC, true-false ✓
  - k4-gewichte-tonnen.ts: bereits number-input, drag-sort, true-false ✓
  - k4-wahrscheinlichkeit-einfuehrung.ts: bereits classify, true-false, MC ✓
  - k4-geld-rechnen.ts: bereits number-input + MC ✓

## Build/Test-Status
- Build: OK (tsc --noEmit: keine Fehler)
- Tests: 93/93 bestanden
- Letzter Commit: 80717b9 (noch nicht committed)

## Entscheidungen
- Dateien mit bereits ≥3 Exercise-Types wurden NICHT geändert (kein over-engineering)
- Variant-Pattern: `const variant = randInt(0, 3)` → 4 Exercise-Types pro Generator
- Difficulty-Scaling bleibt erhalten: schwerere Zahlen bei höherem difficulty, nicht schwerere Konzepte

## Offen
- [ ] Commit der 17 geänderten Generator-Dateien
