import type { CurriculumDelta } from '@/lib/curriculum/types';

// Sachsen: Lehrplan Grundschule Mathematik (2019, gültig 2026)
// Quelle: Sächsisches Staatsministerium für Kultus, Lehrplan Grundschule Mathematik,
//         Dresden 2019 — gültig ab Schuljahr 2019/20
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Sachsen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-sn-daten-wahrscheinlichkeit',
      title: 'Daten sammeln und Strichlisten führen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 80,
      description:
        'Einfache Befragungen und Zählungen im Klassenumfeld durchführen und Ergebnisse ' +
        'in Strichlisten festhalten. Daten ablesen, vergleichen und beschreiben. ' +
        'Der Sächsische Lehrplan 2019 weist den Lernbereich „Daten und Wahrscheinlichkeit" ' +
        'als eigenen Bereich aus, der ab Klasse 1 mit ersten Strichlisten grundgelegt wird.',
    },
  },
  {
    bundesland: 'Sachsen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-sn-koerper',
      title: 'Körperformen benennen und unterscheiden',
      lernbereich: 'Geometrie',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-geometrische-formen', 'k1-lagebeziehungen'],
      estimatedMinutes: 90,
      description:
        'Grundlegende geometrische Körper (Würfel, Quader, Kugel, Zylinder, Kegel) aus ' +
        'der Alltagswelt der Kinder erkennen, benennen und nach Eigenschaften ' +
        'unterscheiden. Körper betasten, bauen und skizzieren. Der Sächsische Lehrplan ' +
        '2019 verankert die Arbeit mit Körpern im Lernbereich „Raum und Form" bereits ' +
        'im ersten Schuljahr.',
    },
  },

  // --- K2-Overrides (Lehrplan 2019) ---
  {
    bundesland: 'Sachsen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-sn-gewichte-liter',
      title: 'Gewichte und Fassungsvermögen: Gramm, Kilogramm, Liter',
      lernbereich: 'Sachrechnen',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-sachaufgaben', 'k2-laengen'],
      estimatedMinutes: 90,
      description:
        'Schülerinnen und Schüler erkunden Gewichte von Gegenständen durch Schätzen und Wiegen ' +
        'und lernen die Einheiten Gramm (g) und Kilogramm (kg) kennen. ' +
        'Sie messen Fassungsvermögen von Behältern und arbeiten mit der Einheit Liter (l). ' +
        'Alltagssituationen (z. B. Einkaufen, Kochen) werden als Sachaufgaben modelliert und gelöst. ' +
        'Der Sächsische Lehrplan 2019 erweitert in Klassenstufe 2 den Lernbereich ' +
        '„Größen" um Gewichte (Gramm, Kilogramm) und Fassungsvermögen (Liter) ' +
        'als zusätzliche Messgröße.',
    },
  },

  // --- K3-Overrides (Lehrplan 2019) ---
  {
    bundesland: 'Sachsen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-sn-rechter-winkel',
      title: 'Rechter Winkel: erkennen, benennen und anwenden',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als geometrischen Grundbegriff kennen ' +
        'und identifizieren ihn in geometrischen Figuren sowie in ihrer Umgebung. ' +
        'Sie prüfen Winkel mithilfe von Winkelkarte oder Geodreieck und nutzen rechte Winkel ' +
        'beim Zeichnen von Rechtecken und Quadraten. ' +
        'Der Sächsische Lehrplan 2019 verankert die Arbeit mit dem rechten Winkel im Lernbereich ' +
        '„Raum und Form" als verbindlichen Inhalt in Klassenstufe 3.',
    },
  },
  {
    bundesland: 'Sachsen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-sn-wahrscheinlichkeit',
      title: 'Wahrscheinlichkeit: unmöglich, möglich, sicher — erweitert',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler vertiefen die Grundbegriffe "unmöglich", "möglich" und "sicher" ' +
        'durch vielfältige Zufallsexperimente und qualitative Vergleiche von Eintrittswahrscheinlichkeiten. ' +
        'Sie beschreiben, welche Ergebnisse bei Würfelversuchen oder Ziehungen wahrscheinlicher ' +
        'oder unwahrscheinlicher sind, und begründen ihre Einschätzungen. ' +
        'Der Sächsische Lehrplan 2019 erweitert in Klassenstufe 3 den Lernbereich ' +
        '„Daten und Wahrscheinlichkeit" um eine differenziertere Einschätzung und ' +
        'Begründung von Wahrscheinlichkeiten.',
    },
  },

  // --- K4-Overrides (Lehrplan 2019, 2026-Konkretisierung) ---
  {
    bundesland: 'Sachsen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-sn-massstab',
      title: 'Maßstab: Karten und Pläne lesen und anwenden',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler verstehen den Maßstab als Verhältnis zwischen Bild- und ' +
        'Wirklichkeitsgröße und wenden ihn beim Lesen von einfachen Karten und Grundrissen an. ' +
        'Sie rechnen Kartenmaße mithilfe des Maßstabs in reale Längen um und umgekehrt. ' +
        'Alltagsbeispiele (Stadtplan, Schulgebäudeplan) verdeutlichen die praktische Relevanz. ' +
        'Der Sächsische Lehrplan 2019 ergänzt in Klassenstufe 4 den Bereich „Größen" ' +
        'um Maßstab als Sachrechenanwendung mit Verhältnisbezug.',
    },
  },
  {
    bundesland: 'Sachsen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-sn-baumdiagramme',
      title: 'Kombinatorik mit Baumdiagrammen: Zufallsversuche strukturieren',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k3-sn-wahrscheinlichkeit'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler verwenden Baumdiagramme zur systematischen Darstellung ' +
        'zweistufiger Zufallsversuche (z. B. zweimaliges Münzwerfen, Ziehen mit Zurücklegen). ' +
        'Sie bestimmen alle möglichen Ausgänge, zählen günstige Ergebnisse aus und beschreiben ' +
        'Wahrscheinlichkeiten als einfache Brüche. ' +
        'Der Sächsische Lehrplan 2019 führt in Klassenstufe 4 Baumdiagramme als ' +
        'Darstellungsmittel im Lernbereich „Daten und Wahrscheinlichkeit" ein.',
    },
  },
];
