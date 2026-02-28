import type { CurriculumDelta } from '@/lib/curriculum/types';

// Hamburg: Stadtteilschule has both G+E Kurs tracks (handled by kurstyp filter)
// Quelle: Bildungsplan Hamburg 2023, Grundschule Mathematik
// Gültig: 2023–2026 (keine Revision seither)
// Lernbereiche "Daten und Zufall" und "Größen und Messen" (inkl. Längen) ab Klasse 1
// https://www.hamburg.de/bsb/bildungsplaene/grundschule/
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Hamburg',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-hh-daten-zufall',
      title: 'Daten und Zufall: Strichlisten erstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler erheben einfache Daten durch Zählen und Beobachten, ' +
        'tragen Ergebnisse in Strichlisten ein und lesen diese ab. ' +
        'Sie beschreiben Häufigkeiten mit einfachen sprachlichen Mitteln (z. B. "am meisten", "am wenigsten"). ' +
        'Laut Bildungsplan Hamburg 2023 ist "Daten und Zufall" als Lernbereich ab Klasse 1 verbindlich.',
    },
  },
  {
    bundesland: 'Hamburg',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-hh-laengen-vergleichen',
      title: 'Längen vergleichen und ordnen',
      lernbereich: 'Sachrechnen',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10', 'k1-lagebeziehungen'],
      estimatedMinutes: 60,
      description:
        'Schülerinnen und Schüler vergleichen Längen von Gegenständen direkt (nebeneinanderlegen, ' +
        'übereinanderlegen) und indirekt (mithilfe eines Referenzobjekts). ' +
        'Sie ordnen Gegenstände nach ihrer Länge und verwenden Begriffe wie "länger", "kürzer", "gleich lang". ' +
        'Laut Bildungsplan Hamburg 2023 ist "Größen und Messen" mit dem Aspekt Längenvergleich ' +
        'explizit ab Klasse 1 im Bereich "Größen und Messen" verankert.',
    },
  },

  // --- K2-Overrides (Bildungsplan 2023) ---
  {
    bundesland: 'Hamburg',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-hh-kombinatorik',
      title: 'Kombinatorik: einfache Kombinationsaufgaben',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler lösen einfache Kombinationsaufgaben (z. B. "Wie viele ' +
        'verschiedene Eisbecher kann man aus 3 Sorten zusammenstellen?"). ' +
        'Sie entwickeln systematische Vorgehensweisen, nutzen Tabellen und einfache Listen ' +
        'zur vollständigen Erfassung aller Möglichkeiten und überprüfen ihre Ergebnisse. ' +
        'Laut Bildungsplan Hamburg 2023 wird in Klasse 2 der Lernbereich "Daten und Zufall" ' +
        'um einfache Kombinationsaufgaben als Grundlage kombinatorischen Denkens erweitert.',
    },
  },

  // --- K3-Overrides (Bildungsplan 2023) ---
  {
    bundesland: 'Hamburg',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-hh-koordinaten',
      title: 'Koordinaten im Gitternetz: Lage beschreiben und einzeichnen',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lesen Punkte und Figuren in einem einfachen Koordinatengitter ab ' +
        'und beschreiben deren Lage durch Zahlenpaare (Spalte, Zeile). ' +
        'Sie tragen Punkte anhand von Koordinatenangaben in Gitternetzpapier ein und zeichnen ' +
        'einfache Figuren durch Verbinden von Punkten. Alltagskontexte wie Stadtpläne oder ' +
        'Schatzsuche dienen als motivierender Einstieg. ' +
        'Laut Bildungsplan Hamburg 2023 werden Koordinaten im Gitternetz als geometrischer ' +
        'Lerninhalt des Bereichs „Raum und Form" in Klasse 3 eingeführt.',
    },
  },

  // --- K4-Overrides (Bildungsplan 2023) ---
  {
    bundesland: 'Hamburg',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-hh-massstab',
      title: 'Maßstab: Karten und Pläne lesen und berechnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen Kartenmaß ' +
        'und wirklicher Länge kennen und wenden ihn auf einfache Stadt- und Schulpläne an. ' +
        'Sie rechnen Kartenentfernungen in reale Längen um und bestimmen Kartenmaße ' +
        'für vorgegebene Realmaße. ' +
        'Laut Bildungsplan Hamburg 2023 wird in Klasse 4 der Lernbereich „Größen und Messen" ' +
        'um den Maßstab als Sachrechnenanwendung mit Verhältnischarakter erweitert.',
    },
  },
];
