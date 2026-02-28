import type { CurriculumDelta } from '@/lib/curriculum/types';

// Sachsen-Anhalt: Fachlehrplan Mathematik Grundschule (2019, gültig 2026)
// Quelle: Kultusministerium Sachsen-Anhalt, Fachlehrplan Grundschule Mathematik,
//         Magdeburg 2019 — gültig ab Schuljahr 2019/20
// SA: Sekundarschule combines Haupt+Real tracks
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Sachsen-Anhalt',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-st-daten-zufall',
      title: 'Daten erheben und in Strichlisten eintragen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 80,
      description:
        'Daten aus der kindlichen Lebenswelt sammeln, in Strichlisten systematisch ' +
        'erfassen und gemeinsam auswerten. Einfache Aussagen zu erhobenen Daten ' +
        'formulieren. Der Fachlehrplan Sachsen-Anhalt 2019 verankert den ' +
        'Kompetenzbereich „Daten und Zufall" als verbindlichen Lernbereich ' +
        'bereits ab Klassenstufe 1.',
    },
  },

  // --- K2-Overrides (Fachlehrplan 2019, in Anlehnung an Sachsen) ---
  {
    bundesland: 'Sachsen-Anhalt',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-st-wahrscheinlichkeit',
      title: 'Wahrscheinlichkeit: sicher, möglich, unmöglich',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler beurteilen Ereignisse aus Alltag und einfachen ' +
        'Zufallsexperimenten mit den Begriffen "sicher", "möglich" und "unmöglich". ' +
        'Sie führen einfache Zufallsversuche durch, halten Ergebnisse in Strichlisten fest ' +
        'und vergleichen, welche Ausgänge häufiger oder seltener auftreten. ' +
        'Der Fachlehrplan Sachsen-Anhalt 2019 verankert in Klassenstufe 2 ' +
        'Grundbegriffe der Wahrscheinlichkeit als Bestandteil des Lernbereichs ' +
        '„Daten und Zufall".',
    },
  },

  // --- K3-Overrides (Fachlehrplan 2019) ---
  {
    bundesland: 'Sachsen-Anhalt',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-st-kombinatorik',
      title: 'Kombinatorik: systematisches Zählen und Auflisten',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler untersuchen, auf wie viele Arten Objekte ausgewählt oder ' +
        'angeordnet werden können (z. B. "Wie viele verschiedene Farbkombinationen gibt es ' +
        'aus 4 Farben für Flaggen mit 2 Streifen?"). ' +
        'Sie entwickeln systematische Zählstrategien und stellen Ergebnisse übersichtlich ' +
        'in Listen und Tabellen dar. ' +
        'Der Fachlehrplan Sachsen-Anhalt 2019 verankert einfache Kombinatorik als ' +
        'Bestandteil des Lernbereichs „Daten und Zufall" in Klassenstufe 3.',
    },
  },

  // --- K4-Overrides (Fachlehrplan 2019, 2026-Konkretisierung) ---
  {
    bundesland: 'Sachsen-Anhalt',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-st-massstab',
      title: 'Maßstab: Karten und Pläne verstehen und anwenden',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen verkleinerter ' +
        'Darstellung und Wirklichkeit kennen. Sie lesen Entfernungen aus einfachen Karten ' +
        'und Grundrissen mit angegebenem Maßstab ab und rechnen diese in Wirklichkeitsmaße um. ' +
        'Alltagsbeispiele (Schulgebäudeplan, Stadtplan) stehen im Mittelpunkt. ' +
        'Der Fachlehrplan Sachsen-Anhalt 2019 ergänzt in Klassenstufe 4 den Lernbereich ' +
        '„Größen und Messen" um Maßstab als anwendungsbezogenen Sachrecheninhalt.',
    },
  },
];
