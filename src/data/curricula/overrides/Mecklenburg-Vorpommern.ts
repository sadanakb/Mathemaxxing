import type { CurriculumDelta } from '@/lib/curriculum/types';

// MV: Regionale Schule = combined Haupt+Real
// Quelle: Rahmenplan Mecklenburg-Vorpommern 2019, Grundschule Mathematik
// Gültig: 2019–2026 (keine Revision seither)
// Lernbereiche "Daten und Zufall" und Geometrie (inkl. Symmetrie) ab Klasse 1 verbindlich
// https://www.bildung-mv.de/schueler/schule-und-unterricht/lehrplaene/grundschule/
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Mecklenburg-Vorpommern',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-mv-daten-zufall',
      title: 'Daten sammeln und ordnen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler sammeln Daten zu einfachen Fragestellungen aus ihrer Lebenswelt, ' +
        'ordnen diese nach vorgegebenen Kriterien und stellen sie in Strichlisten dar. ' +
        'Sie vergleichen Häufigkeiten und formulieren einfache Aussagen zu den Daten. ' +
        'Laut Rahmenplan MV 2019 ist "Daten und Zufall" ab Klasse 1 als verbindlicher Inhaltsbereich ausgewiesen.',
    },
  },
  {
    bundesland: 'Mecklenburg-Vorpommern',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-mv-symmetrie',
      title: 'Einfache Symmetrien entdecken',
      lernbereich: 'Geometrie',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-geometrische-formen', 'k1-muster-und-strukturen'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler entdecken Achsensymmetrie an einfachen geometrischen Figuren ' +
        'und in ihrer Umgebung (z. B. Schmetterlinge, Blätter). ' +
        'Sie falten Figuren, um Symmetrieachsen zu finden, und legen symmetrische Muster mit Materialien. ' +
        'Laut Rahmenplan MV 2019 ist das Entdecken einfacher Symmetrien explizit ab Klasse 1 ' +
        'im Lernbereich Geometrie verankert.',
    },
  },

  // --- K2-Overrides (Rahmenplan 2019, in Anlehnung an Nachbarländer) ---
  {
    bundesland: 'Mecklenburg-Vorpommern',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-mv-kombinatorik',
      title: 'Kombinatorik: einfaches systematisches Zählen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erkunden, auf wie viele Arten sich Gegenstände ' +
        'kombinieren oder anordnen lassen (z. B. "Wie viele verschiedene Fahrradfarben ' +
        'mit 3 Rahmenfarben und 2 Lenkerfarben gibt es?"). ' +
        'Sie entwickeln systematische Vorgehensweisen und halten alle Möglichkeiten in ' +
        'Listen übersichtlich fest. ' +
        'Der Rahmenplan Mecklenburg-Vorpommern 2019 verankert im Lernbereich ' +
        '„Daten und Zufall" in Klasse 2 erste Kombinationsaufgaben als ' +
        'Grundlage für kombinatorisches Denken.',
    },
  },

  // --- K3-Overrides (Rahmenplan 2019) ---
  {
    bundesland: 'Mecklenburg-Vorpommern',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-mv-rechter-winkel',
      title: 'Rechter Winkel: erkennen, prüfen und beim Zeichnen anwenden',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als besondere Winkelart kennen ' +
        'und erkennen ihn an geometrischen Figuren sowie in ihrer Umgebung (z. B. Zimmerwände, ' +
        'Buchtitel, Tischkanten). ' +
        'Sie überprüfen Winkel mit Winkelkarte oder Geodreieck und nutzen rechte Winkel ' +
        'beim Zeichnen von Rechtecken, Quadraten und L-förmigen Figuren. ' +
        'Der Rahmenplan Mecklenburg-Vorpommern 2019 verankert die Arbeit mit dem rechten Winkel ' +
        'im Lernbereich Geometrie als verbindlichen Inhalt in Klasse 3.',
    },
  },

  // --- K4-Overrides (Rahmenplan 2019) ---
  {
    bundesland: 'Mecklenburg-Vorpommern',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-mv-massstab',
      title: 'Maßstab: Karten und Pläne lesen und berechnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den Maßstab als Verhältnis zwischen Karten- und ' +
        'Wirklichkeitsmaß kennen. Sie lesen Entfernungen aus einfachen Karten (z. B. Stadtplan, ' +
        'Wanderkarte) mit angegebenem Maßstab ab und rechnen diese in tatsächliche Längen um. ' +
        'Einfache Strecken und Figuren werden maßstabsgerecht gezeichnet. ' +
        'Der Rahmenplan Mecklenburg-Vorpommern 2019 verankert in Klasse 4 den Maßstab ' +
        'als Sachrechnenanwendung mit Verhältnisbezug im Lernbereich „Größen und Messen".',
    },
  },
];
