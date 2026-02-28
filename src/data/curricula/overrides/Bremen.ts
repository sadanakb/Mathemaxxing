import type { CurriculumDelta } from '@/lib/curriculum/types';

// Quelle: Bildungsplan Bremen 2025, Grundschule Mathematik
// Neufassung 2025, gültig ab Schuljahr 2025/26 (= 2026)
// Orientiert sich eng an KMK-Standards und NRW-Curriculum
// Lernbereich "Daten und Zufall" ab Klasse 1 explizit ausgewiesen
// https://www.lis.bremen.de/bildungsplaene/grundschule
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Bremen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-hb-daten-zufall',
      title: 'Daten erheben und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erheben einfache Daten aus ihrer Lebenswelt durch Befragungen ' +
        'und Beobachtungen, ordnen diese systematisch und stellen sie in Strichlisten dar. ' +
        'Sie lesen und interpretieren einfache Darstellungen. ' +
        'Laut Bildungsplan Bremen 2025 ist "Daten und Zufall" als eigenständiger Lernbereich ' +
        'bereits ab Klasse 1 verbindlich vorgesehen.',
    },
  },

  // --- K2-Overrides (Bildungsplan 2025, in Anlehnung an NRW) ---
  {
    bundesland: 'Bremen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-hb-wahrscheinlichkeit',
      title: 'Wahrscheinlichkeit: sicher, möglich, unmöglich',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler beurteilen Alltagsereignisse und einfache Zufallsexperimente ' +
        'mit den Begriffen "sicher", "möglich" und "unmöglich". ' +
        'Sie führen kleine Zufallsversuche durch, notieren Ergebnisse in Strichlisten und ' +
        'beschreiben Beobachtungen mit einfachen Sätzen. ' +
        'Laut Bildungsplan Bremen 2025 (orientiert am NRW-Lehrplan 2021) wird der ' +
        'Lernbereich „Daten und Zufall" in Klasse 2 um Grundbegriffe der ' +
        'Wahrscheinlichkeit erweitert.',
    },
  },

  // --- K3-Overrides (Bildungsplan 2025) ---
  {
    bundesland: 'Bremen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-hb-kombinatorik',
      title: 'Kombinatorik: systematisches Zählen und Auflisten',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler untersuchen einfache Kombinationsaufgaben aus dem Alltag ' +
        '(z. B. "Wie viele verschiedene Kleidungskombinationen gibt es aus 3 Oberteilen und 2 Hosen?"). ' +
        'Sie entwickeln systematische Auflistungsstrategien und prüfen die Vollständigkeit ' +
        'ihrer Lösungen mithilfe von Listen und Tabellen. ' +
        'Laut Bildungsplan Bremen 2025 (orientiert am NRW-Lehrplan 2021) wird Kombinatorik ' +
        'als Teil des Lernbereichs „Daten und Zufall" in Klasse 3 verbindlich eingeführt.',
    },
  },

  // --- K4-Overrides (Bildungsplan 2025) ---
  {
    bundesland: 'Bremen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-hb-massstab',
      title: 'Maßstab: Karten und Pläne lesen und anwenden',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen abgebildetem ' +
        'und tatsächlichem Maß kennen. Sie lesen Entfernungen aus einfachen Karten und ' +
        'Plänen ab und rechnen diese mithilfe des Maßstabs in Wirklichkeitsmaße um. ' +
        'Einfache Planfiguren werden maßstabsgerecht gezeichnet. ' +
        'Laut Bildungsplan Bremen 2025 (orientiert am NRW-Lehrplan 2021) wird Maßstab ' +
        'als Sachrechnenanwendung im Lernbereich „Größen und Messen" in Klasse 4 eingeführt.',
    },
  },
];
