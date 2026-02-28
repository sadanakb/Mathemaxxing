import type { CurriculumDelta } from '@/lib/curriculum/types';

// Nordrhein-Westfalen: Lehrplan Mathematik Grundschule (2021, gültig 2026)
// Quelle: Ministerium für Schule und Bildung NRW, Lehrplan Grundschule Mathematik,
//         Düsseldorf 2021 — vollständig gültig ab Schuljahr 2021/22
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-nw-daten-haeufigkeiten',
      title: 'Daten sammeln, darstellen und auswerten',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 90,
      description:
        'Daten aus dem Umfeld der Kinder systematisch sammeln, in Strichlisten und ' +
        'einfachen Balkendiagrammen darstellen sowie Häufigkeiten ablesen und vergleichen. ' +
        'Der NRW-Lehrplan 2021 verankert den Inhaltsbereich „Daten, Häufigkeiten und ' +
        'Wahrscheinlichkeiten" als eigenständigen Kompetenzbereich bereits in Klasse 1.',
    },
  },
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-nw-koerperformen',
      title: 'Körper erkennen und benennen',
      lernbereich: 'Geometrie',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-geometrische-formen', 'k1-lagebeziehungen'],
      estimatedMinutes: 90,
      description:
        'Geometrische Körper (Würfel, Quader, Kugel, Zylinder) in der Umwelt entdecken, ' +
        'benennen und nach ihren Eigenschaften (Flächen, Kanten, Ecken) unterscheiden. ' +
        'Körper aus verschiedenen Blickwinkeln betrachten und skizzieren. Laut NRW-Lehrplan ' +
        '2021 gehört „Raum und Form" mit dreidimensionalen Körpern zum Inhaltsbereich ' +
        'Geometrie bereits ab Klasse 1.',
    },
  },

  // --- K2-Overrides (LP 2021) ---
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-nw-kombinatorik',
      title: 'Kombinatorik: systematisches Zählen und Anordnen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lösen einfache Kombinationsaufgaben aus dem Alltag ' +
        '(z. B. "Wie viele verschiedene Outfits kann man aus 3 Oberteilen und 2 Hosen zusammenstellen?"). ' +
        'Sie entwickeln systematische Vorgehensweisen (Tabellen, Baumdiagramme) und ' +
        'überprüfen die Vollständigkeit ihrer Lösungen. ' +
        'Der NRW-Lehrplan 2021 verankert Kombinatorik als Bestandteil des Inhaltsbereichs ' +
        '„Daten, Häufigkeiten und Wahrscheinlichkeiten" bereits in Klasse 2.',
    },
  },
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-nw-wahrscheinlichkeiten',
      title: 'Wahrscheinlichkeiten: sicher, möglich, unmöglich',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-nw-kombinatorik'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler bewerten Ereignisse im Alltag und bei einfachen Zufallsexperimenten ' +
        'mit den Begriffen "sicher", "möglich" und "unmöglich". ' +
        'Sie vergleichen Ereignisse hinsichtlich ihrer Wahrscheinlichkeit und begründen ihre Urteile. ' +
        'Der NRW-Lehrplan 2021 sieht Wahrscheinlichkeitsbegriffe als Bestandteil des ' +
        'Kompetenzbereichs „Daten, Häufigkeiten und Wahrscheinlichkeiten" in Klasse 2 vor.',
    },
  },

  // --- K3-Overrides (LP 2021) ---
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-nw-figuren-zeichnen',
      title: 'Ebene Figuren zeichnen: Lineal und Geodreieck einsetzen',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k3-flaeche-umfang-einfach'],
      estimatedMinutes: 90,
      description:
        'Schülerinnen und Schüler zeichnen ebene Figuren (Rechtecke, Quadrate, einfache Dreiecke) ' +
        'mithilfe von Lineal und Geodreieck präzise auf Papier. ' +
        'Sie erkennen und konstruieren rechte Winkel, messen Strecken ab und beschriften Skizzen. ' +
        'Figuren werden analysiert und nach Eigenschaften (Seiten, Winkel) verglichen. ' +
        'Der NRW-Lehrplan 2021 verankert das Zeichnen ebener Figuren mit Werkzeugen im Bereich ' +
        '„Raum und Form" als verbindliche Kompetenz ab Klasse 3.',
    },
  },
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-nw-kombinatorik-vertiefen',
      title: 'Kombinatorik vertiefen: komplexere Anordnungen und Auswahlen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler bearbeiten anspruchsvollere Kombinationsaufgaben mit mehreren ' +
        'Auswahlkriterien und entwickeln Strategien zur vollständigen und systematischen Auflistung ' +
        '(geordnete Baumdiagramme, Tabellen). ' +
        'Sie begründen, warum ihre Auflistung vollständig ist, und übertragen Lösungsstrategien ' +
        'auf neue Situationen. ' +
        'Der NRW-Lehrplan 2021 sieht in Klasse 3 eine Vertiefung der Kombinatorik als Teil ' +
        'des Kompetenzbereichs „Daten, Häufigkeiten und Wahrscheinlichkeiten" vor.',
    },
  },

  // --- K4-Overrides (LP 2021) ---
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-nw-massstab',
      title: 'Maßstab und maßstabsgerechtes Zeichnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen abgebildeter ' +
        'und wirklicher Länge kennen. Sie lesen Entfernungen aus Karten und Plänen ab, ' +
        'rechnen diese mit gegebenem Maßstab in Wirklichkeitsmaße um und zeichnen ' +
        'Strecken und einfache Figuren maßstabsgerecht. ' +
        'Der NRW-Lehrplan 2021 verankert Maßstab und maßstabsgerechtes Zeichnen als ' +
        'Sachrecheninhalt im Kompetenzbereich „Größen und Messen" in Klasse 4.',
    },
  },
  {
    bundesland: 'Nordrhein-Westfalen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-nw-kombinatorik-wahrsch',
      title: 'Kombinatorik und Wahrscheinlichkeit vertiefen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k3-nw-kombinatorik-vertiefen'],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler vertiefen das kombinatorische Denken durch Baumdiagramme ' +
        'mit mehreren Stufen und berechnen einfache Wahrscheinlichkeiten als Brüche. ' +
        'Sie überprüfen theoretische Wahrscheinlichkeiten durch wiederholte Versuche ' +
        'und vergleichen experimentelle mit theoretischen Häufigkeiten. ' +
        'Der NRW-Lehrplan 2021 schließt in Klasse 4 den Kompetenzbereich ' +
        '„Daten, Häufigkeiten und Wahrscheinlichkeiten" mit vertiefter Kombinatorik ' +
        'und einfachen Wahrscheinlichkeitsberechnungen ab.',
    },
  },
];
