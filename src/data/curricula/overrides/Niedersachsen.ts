import type { CurriculumDelta } from '@/lib/curriculum/types';

// Niedersachsen: Kerncurriculum Mathematik für die Grundschule (2017, gültig 2026)
// Quelle: Niedersächsisches Kultusministerium, Kerncurriculum für die Grundschule
//         Schuljahrgänge 1–4, Mathematik, Hannover 2017
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Niedersachsen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-ni-daten-zufall',
      title: 'Daten erfassen und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 90,
      description:
        'Daten aus der Lebenswelt der Schülerinnen und Schüler erheben und in einfachen ' +
        'Strichlisten sowie Tabellen festhalten. Ergebnisse ablesen und in einfachen ' +
        'Sätzen beschreiben. Laut Niedersächsischem Kerncurriculum 2017 ist der ' +
        'Kompetenzbereich „Daten und Zufall" bereits ab Schuljahrgang 1 verankert.',
    },
  },

  // --- K2-Overrides (KC 2017) ---
  {
    bundesland: 'Niedersachsen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-ni-kombinatorik',
      title: 'Kombinatorik: einfaches systematisches Zählen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lösen einfache Kombinationsaufgaben aus vertrauten ' +
        'Alltagskontexten (z. B. "Wie viele Möglichkeiten gibt es, zwei Farben zu wählen?"). ' +
        'Sie entwickeln systematische Zählstrategien und stellen alle Möglichkeiten in ' +
        'Listen oder Tabellen übersichtlich dar. ' +
        'Das Niedersächsische Kerncurriculum 2017 verankert Kombinatorik als Bestandteil des ' +
        'Kompetenzbereichs „Daten und Zufall" in Schuljahrgang 2.',
    },
  },

  // --- K3-Overrides (KC 2017) ---
  {
    bundesland: 'Niedersachsen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-ni-rechter-winkel',
      title: 'Rechter Winkel: erkennen und beim Zeichnen nutzen',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als geometrisches Merkmal kennen ' +
        'und identifizieren ihn an Alltagsgegenständen und ebenen Figuren. ' +
        'Sie überprüfen Winkel mit der Winkelkarte und nutzen das Geodreieck zum Zeichnen ' +
        'rechter Winkel. Rechtecke und Quadrate werden als Figuren mit ausschließlich ' +
        'rechten Winkeln erkannt und gezeichnet. ' +
        'Das Niedersächsische Kerncurriculum 2017 verankert die Arbeit mit dem rechten Winkel ' +
        'im Kompetenzbereich „Raum und Form" als verbindlichen Inhalt in Schuljahrgang 3.',
    },
  },

  // --- K4-Overrides (KC 2017) ---
  {
    bundesland: 'Niedersachsen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-ni-massstab',
      title: 'Maßstab und Planfiguren: maßstabsgerecht lesen und zeichnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen abgebildeter ' +
        'und wirklicher Größe kennen. Sie lesen einfache Karten und Grundrisse mit ' +
        'angegebenem Maßstab aus und berechnen reale Längen aus Kartenmaßen. ' +
        'Sie zeichnen einfache Planfiguren (z. B. Zimmereinrichtung, Schulhof) maßstabsgerecht. ' +
        'Das Niedersächsische Kerncurriculum 2017 verankert in Schuljahrgang 4 den Maßstab ' +
        'als Verbindung von Geometrie und Sachrechnen im Kompetenzbereich „Größen und Messen".',
    },
  },
];
