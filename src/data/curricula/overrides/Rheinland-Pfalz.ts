import type { CurriculumDelta } from '@/lib/curriculum/types';

// Rheinland-Pfalz: Teilrahmenplan Mathematik Grundschule (2014, gültig 2026)
// Quelle: Ministerium für Bildung RLP, Lehrplan Grundschule — Teilrahmenplan Mathematik,
//         Mainz 2014 — weiterhin gültig für Schuljahr 2025/26
// RP: Realschule plus — combined Haupt+Real (two tracks)
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Rheinland-Pfalz',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-rp-daten-zufall',
      title: 'Daten erheben: Strichlisten erstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 80,
      description:
        'Einfache Erhebungen aus dem Alltag der Kinder planen und durchführen. ' +
        'Ergebnisse in Strichlisten festhalten und auswerten. Mengen vergleichen und ' +
        'in vollständigen Sätzen beschreiben. Der RLP-Teilrahmenplan Mathematik 2014 ' +
        'sieht die Leitidee „Daten und Zufall" als eigenen Kompetenzbereich vor, der ' +
        'bereits im ersten Schuljahr grundgelegt wird.',
    },
  },

  // --- K2-Overrides (TRP 2014) ---
  {
    bundesland: 'Rheinland-Pfalz',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-rp-kombinatorik',
      title: 'Kombinatorik: einfaches systematisches Zählen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erkunden, auf wie viele Arten sich Objekte anordnen oder ' +
        'kombinieren lassen (z. B. "Wie viele verschiedene Frühstücksvarianten sind mit ' +
        '3 Brotsorten und 2 Belägen möglich?"). Sie nutzen systematische Zählmethoden ' +
        '(Listen, Baumdiagramme) und überprüfen die Vollständigkeit ihrer Ergebnisse. ' +
        'Der Teilrahmenplan Rheinland-Pfalz 2014 verortet einfaches systematisches Zählen ' +
        'im Kompetenzbereich „Daten und Zufall" in Klasse 2.',
    },
  },

  // --- K3-Overrides (TRP 2014, 2026-Konkretisierung) ---
  {
    bundesland: 'Rheinland-Pfalz',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-rp-kombinatorik',
      title: 'Kombinatorik vertiefen: mehrschrittige Kombinationsaufgaben',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler bearbeiten Kombinationsaufgaben mit zwei oder mehr Auswahlkriterien ' +
        'und entwickeln strukturierte Lösungsstrategien (Baumdiagramme, Tabellen, geordnete Listen). ' +
        'Sie begründen systematisch, warum ihre Auflistung vollständig ist, und übertragen ' +
        'Lösungsansätze auf neue, ähnlich strukturierte Aufgaben. ' +
        'Der Teilrahmenplan Rheinland-Pfalz 2014 sieht in Klasse 3 eine Vertiefung des ' +
        'kombinatorischen Denkens im Kompetenzbereich „Daten und Zufall" vor.',
    },
  },

  // --- K4-Overrides (TRP 2014, 2026-Konkretisierung) ---
  {
    bundesland: 'Rheinland-Pfalz',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-rp-massstab',
      title: 'Maßstab: Karten lesen und maßstabsgerecht zeichnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen Karten- und ' +
        'Wirklichkeitsmaß kennen und wenden ihn auf Stadtpläne und einfache Grundrisse an. ' +
        'Sie berechnen Wirklichkeitsmaße aus Kartenmaßen und umgekehrt. ' +
        'Einfache Figuren und Strecken werden maßstabsgerecht gezeichnet. ' +
        'Der Teilrahmenplan Rheinland-Pfalz 2014 ergänzt in Klasse 4 die Leitidee ' +
        '„Größen und Messen" um Maßstab als Sachrechnenanwendung mit Verhältnisbezug.',
    },
  },
  {
    bundesland: 'Rheinland-Pfalz',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-rp-baumdiagramme',
      title: 'Kombinatorik mit Baumdiagrammen: Wahrscheinlichkeiten bestimmen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k3-rp-kombinatorik'],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler stellen zwei- und mehrstufige Zufallsversuche vollständig ' +
        'in Baumdiagrammen dar und bestimmen daraus einfache Wahrscheinlichkeiten als Brüche. ' +
        'Sie vergleichen theoretische Wahrscheinlichkeiten mit experimentell ermittelten ' +
        'Häufigkeiten und erläutern Unterschiede. ' +
        'Der Teilrahmenplan Rheinland-Pfalz 2014 schließt in Klasse 4 die Leitidee ' +
        '„Daten und Zufall" mit Baumdiagrammen und ersten Wahrscheinlichkeitsberechnungen ab.',
    },
  },
];
