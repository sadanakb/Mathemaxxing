import type { CurriculumDelta } from '@/lib/curriculum/types';

// Thüringen: Lehrplan Mathematik Grundschule (2010, Anpassung 2023, gültig 2026)
// Quelle: Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien (ThILLM),
//         Lehrplan für die Grundschule Thüringens — Mathematik, Erfurt 2010,
//         mit Anpassungen 2023 — gültig ab Schuljahr 2023/24
// Thüringen: Regelschule = combined Haupt+Real up to class 9/10
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Thüringen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-th-daten-zufall',
      title: 'Daten erheben und in Listen darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 80,
      description:
        'Einfache Datenerhebungen im schulischen Alltag planen und durchführen. ' +
        'Ergebnisse in Strichlisten und einfachen Listen festhalten, ablesen und ' +
        'vergleichen. In vollständigen Sätzen über die Ergebnisse berichten. ' +
        'Der Thüringer Lehrplan (2010/2023) sieht den Lernbereich „Daten und Zufall" ' +
        'als eigenen Kompetenzbereich vor, der ab Klasse 1 grundgelegt wird.',
    },
  },
  {
    bundesland: 'Thüringen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-th-koerper',
      title: 'Geometrische Körper: Würfel und Kugel erkennen',
      lernbereich: 'Geometrie',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-geometrische-formen', 'k1-lagebeziehungen'],
      estimatedMinutes: 90,
      description:
        'Grundlegende geometrische Körper (insbesondere Würfel, Quader, Kugel und ' +
        'Zylinder) in der Umwelt der Kinder entdecken, benennen und beschreiben. ' +
        'Körper nach Eigenschaften sortieren und vergleichen. Einfache Bauwerke aus ' +
        'Körpern konstruieren. Der Thüringer Lehrplan (2010/2023) verankert die ' +
        'Arbeit mit geometrischen Körpern im Kompetenzbereich „Raum und Form" ' +
        'bereits in Klassenstufe 1.',
    },
  },

  // --- K2-Overrides (LP 2010+2023) ---
  {
    bundesland: 'Thüringen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-th-zufallsversuche',
      title: 'Zufallsversuche: einfache Experimente und Begriffe',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler führen einfache Zufallsversuche durch ' +
        '(z. B. Würfeln, Münzwurf, Ziehen farbiger Kugeln aus einem Beutel) ' +
        'und beschreiben Ergebnisse qualitativ. Sie ordnen Ereignisse den Begriffen ' +
        '"sicher", "möglich" und "unmöglich" zu und vergleichen verschiedene ' +
        'Zufallsversuche hinsichtlich ihrer Ausgänge. ' +
        'Der Thüringer Lehrplan (2010, Anpassung 2023) sieht in Klassenstufe 2 ' +
        'die Einführung einfacher Zufallsexperimente im Lernbereich „Daten und Zufall" vor.',
    },
  },

  // --- K3-Overrides (LP 2010+2023) ---
  {
    bundesland: 'Thüringen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-th-rechter-winkel',
      title: 'Rechter Winkel: erkennen und beim Zeichnen anwenden',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als geometrischen Grundbegriff kennen ' +
        'und erkennen ihn an Figuren und in ihrer Umgebung. ' +
        'Sie überprüfen Winkel mithilfe einer Winkelkarte und des Geodreiecks und nutzen ' +
        'rechte Winkel beim Zeichnen von Rechtecken, Quadraten und einfachen Figuren. ' +
        'Der Thüringer Lehrplan (2010, Anpassung 2023) verankert die Arbeit mit dem rechten Winkel ' +
        'im Kompetenzbereich „Raum und Form" als verbindlichen Lerninhalt in Klassenstufe 3.',
    },
  },
  {
    bundesland: 'Thüringen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-th-kombinatorik',
      title: 'Kombinatorik: systematisches Zählen und Anordnen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler untersuchen, auf wie viele Arten Objekte ausgewählt oder ' +
        'angeordnet werden können (z. B. "Wie viele verschiedene Essensvarianten gibt es?"). ' +
        'Sie entwickeln systematische Zählstrategien und halten alle Möglichkeiten geordnet fest. ' +
        'Der Thüringer Lehrplan (2010, Anpassung 2023) verankert erste kombinatorische Überlegungen ' +
        'im Lernbereich „Daten und Zufall" in Klassenstufe 3.',
    },
  },

  // --- K4-Overrides (LP 2010+2023, 2026-Konkretisierung) ---
  {
    bundesland: 'Thüringen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-th-massstab',
      title: 'Maßstab: Karten und Grundrisse lesen und berechnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler verstehen den Maßstab als Verhältnis zwischen Bild- und ' +
        'Wirklichkeitsgröße. Sie lesen einfache Karten und Grundrisse mit angegebenem Maßstab ' +
        'aus und berechnen Wirklichkeitsmaße aus Kartenmaßen. ' +
        'Alltagsbeispiele (z. B. Schulgebäudeplan, Wanderkarte) veranschaulichen den Nutzen. ' +
        'Der Thüringer Lehrplan (2010, Anpassung 2023) ergänzt in Klassenstufe 4 ' +
        'den Lernbereich „Größen und Messen" um Maßstab als sachrechenorientierte ' +
        'Anwendung von Verhältnisdenken.',
    },
  },
];
