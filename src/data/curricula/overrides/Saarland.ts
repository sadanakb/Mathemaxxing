import type { CurriculumDelta } from '@/lib/curriculum/types';

// Saarland: Kernlehrplan Mathematik Grundschule (2023, gültig 2026)
// Quelle: Ministerium für Bildung und Kultur Saarland, Kernlehrplan Grundschule
//         Mathematik, Saarbrücken 2023 — gültig ab Schuljahr 2023/24
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Saarland',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-sl-daten-zufall',
      title: 'Daten sammeln und in Tabellen darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 80,
      description:
        'Alltagsnahe Daten erheben, in Strichlisten und einfachen Tabellen festhalten ' +
        'und interpretieren. Ergebnisse vergleichen und kommunizieren. Der Saarländische ' +
        'Kernlehrplan 2023 orientiert sich strukturell eng am NRW-Lehrplan 2021 und ' +
        'verankert den Kompetenzbereich „Daten und Zufall" verbindlich ab Klasse 1.',
    },
  },

  // --- K2-Overrides (Kernlehrplan 2023, in Anlehnung an NRW) ---
  {
    bundesland: 'Saarland',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-sl-kombinatorik',
      title: 'Kombinatorik: einfaches systematisches Zählen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erkunden auf systematische Weise, wie viele Möglichkeiten ' +
        'es gibt, Objekte aus einem Vorrat auszuwählen oder anzuordnen ' +
        '(z. B. "Wie viele Sandwichvarianten gibt es mit 3 Belägen?"). ' +
        'Sie nutzen Listen und einfache Baumdiagramme zur vollständigen Erfassung. ' +
        'Der Saarländische Kernlehrplan 2023 orientiert sich am NRW-Lehrplan 2021 und ' +
        'verankert Kombinatorik als Teil des Kompetenzbereichs „Daten und Zufall" in Klasse 2.',
    },
  },

  // --- K3-Overrides (Kernlehrplan 2023) ---
  {
    bundesland: 'Saarland',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-sl-rechter-winkel',
      title: 'Rechter Winkel: erkennen, prüfen und anwenden',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als geometrisches Merkmal kennen ' +
        'und erkennen ihn in Alltagsobjekten, an Figuren und in geometrischen Konstruktionen. ' +
        'Sie prüfen Winkel mithilfe von Winkelkarte und Geodreieck auf Rechtwinkligkeit ' +
        'und nutzen rechte Winkel beim Zeichnen von Rechtecken und Quadraten. ' +
        'Der Saarländische Kernlehrplan 2023 verankert (analog zum NRW-Lehrplan 2021) ' +
        'die Arbeit mit dem rechten Winkel im Bereich „Raum und Form" in Klasse 3.',
    },
  },

  // --- K4-Overrides (Kernlehrplan 2023, analog NRW) ---
  {
    bundesland: 'Saarland',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-sl-massstab',
      title: 'Maßstab: Karten und Pläne lesen und berechnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen Karten- und ' +
        'Wirklichkeitsmaß kennen. Sie lesen Entfernungen aus einfachen Karten und Grundrissen ' +
        'ab und rechnen diese mithilfe des angegebenen Maßstabs in reale Längen um. ' +
        'Einfache Planzeichnungen werden maßstabsgerecht angefertigt. ' +
        'Der Saarländische Kernlehrplan 2023 (analog NRW-Lehrplan 2021) verankert Maßstab ' +
        'als Sachrechnenanwendung mit Verhältnisbezug im Bereich „Größen und Messen" in Klasse 4.',
    },
  },
];
