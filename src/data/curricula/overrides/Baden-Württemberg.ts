import type { CurriculumDelta } from '@/lib/curriculum/types';

// BW: Werkrealschule follows Hauptschule tracks
// BW: Gemeinschaftsschule has G/E/H Niveaustufen (simplified to G/E Kurs)
// Quelle: Bildungsplan 2016 Baden-Württemberg, Grundschule Mathematik
// Gültig: 2016–2026 (keine Revision seither)
// https://www.bildungsplaene-bw.de/,Lde/LS/BP2016BW/ALLG/GS/M
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Baden-Württemberg',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-bw-daten-sammeln',
      title: 'Daten sammeln und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler sammeln Daten aus ihrer Lebenswelt (z. B. Lieblingsobst, Haustiere), ' +
        'ordnen diese und stellen sie in einfachen Strichlisten und Bilddiagrammen dar. ' +
        'Laut Bildungsplan 2016 BW ist "Daten und Zufall" bereits ab Klasse 1 verbindlicher Lernbereich.',
    },
  },

  // --- K2-Overrides (Bildungsplan 2016) ---
  {
    bundesland: 'Baden-Württemberg',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-bw-gewichte',
      title: 'Gewichte: Gramm und Kilogramm',
      lernbereich: 'Sachrechnen',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-sachaufgaben', 'k2-laengen'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler erkunden Gewichte von Alltagsgegenständen durch Schätzen und Wiegen. ' +
        'Sie lernen die Einheiten Gramm (g) und Kilogramm (kg) kennen und stellen einfache ' +
        'Umrechnungen an. Sachaufgaben mit Gewichtsangaben werden gelöst und Ergebnisse ' +
        'auf Plausibilität überprüft. ' +
        'Laut Bildungsplan 2016 Baden-Württemberg wird der Bereich "Größen und Messen" in ' +
        'Klasse 2 um Gewichte (Gramm, Kilogramm) als zusätzlichen Sachrechneninhalt erweitert.',
    },
  },

  // --- K3-Overrides (Bildungsplan 2016, 2026-Konkretisierung) ---
  {
    bundesland: 'Baden-Württemberg',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-bw-kombinatorik',
      title: 'Kombinatorik: systematisches Auflisten aller Möglichkeiten',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler erkunden kombinatorische Fragestellungen aus dem Alltag ' +
        '(z. B. "Wie viele verschiedene Dreier-Mannschaften lassen sich aus 5 Kindern bilden?"). ' +
        'Sie entwickeln und nutzen systematische Auflistungsstrategien (Tabellen, Baumdiagramme, ' +
        'geordnete Listen) und überprüfen die Vollständigkeit ihrer Lösungen. ' +
        'Der Bildungsplan 2016 Baden-Württemberg verankert kombinatorisches Denken als Teil ' +
        'des Lernbereichs „Daten und Zufall" ab Klasse 3 verbindlich.',
    },
  },
  {
    bundesland: 'Baden-Württemberg',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-bw-koordinaten',
      title: 'Koordinaten im Gitternetz: Punkte beschreiben und einzeichnen',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k3-zahlenstrahl-bis-1000'],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lesen Punkte in einem einfachen Koordinatengitter ab ' +
        'und beschreiben deren Lage mithilfe von Zahlenpaaren. ' +
        'Sie tragen vorgegebene Punkte in ein Koordinatengitter ein und zeichnen einfache ' +
        'Figuren anhand von Koordinatenangaben. Alltagsbezüge (z. B. Stadtplan, Schachbrett) ' +
        'werden zur Veranschaulichung genutzt. ' +
        'Der Bildungsplan 2016 Baden-Württemberg erweitert den Bereich „Raum und Form" in ' +
        'Klasse 3 um das Beschreiben von Lagen im Koordinatengitter.',
    },
  },

  // --- K4-Overrides (Bildungsplan 2016, 2026-Konkretisierung) ---
  {
    bundesland: 'Baden-Württemberg',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-bw-rauminhalt',
      title: 'Rauminhalt: Einführung in das Messen von Volumina',
      lernbereich: 'Geometrie',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k4-flaeche-und-umfang'],
      estimatedMinutes: 90,
      description:
        'Schülerinnen und Schüler erkunden den Rauminhalt von Körpern durch handelndes Befüllen ' +
        'und Vergleichen. Sie lernen die Einheit Liter (l) und Milliliter (ml) als Hohlmaß kennen ' +
        'und schätzen sowie messen Rauminhalte von Alltagsbehältern. ' +
        'Einfache Quader werden durch Auszählen von Einheitswürfeln in ihrem Volumen bestimmt. ' +
        'Der Bildungsplan 2016 Baden-Württemberg verankert in Klasse 4 eine erste Einführung ' +
        'in den Rauminhalt als Erweiterung des Bereichs „Größen und Messen" über Fläche hinaus.',
    },
  },
  {
    bundesland: 'Baden-Württemberg',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-bw-diagramme-vertiefen',
      title: 'Diagramme erstellen und auswerten',
      lernbereich: 'Statistik',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k4-tabellen-diagramme'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler planen eigene Datenerhebungen, wählen geeignete ' +
        'Diagrammtypen (Balkendiagramm, Säulendiagramm, einfaches Kreisdiagramm) und ' +
        'erstellen diese sorgfältig mit Beschriftung, Maßstab und Legende. ' +
        'Sie werten Diagramme aus anderen Quellen kritisch aus und erkennen mögliche ' +
        'Verzerrungen. ' +
        'Der Bildungsplan 2016 Baden-Württemberg sieht in Klasse 4 eine vertiefte ' +
        'Arbeit mit verschiedenen Diagrammtypen im Bereich „Daten und Zufall" vor.',
    },
  },
];
