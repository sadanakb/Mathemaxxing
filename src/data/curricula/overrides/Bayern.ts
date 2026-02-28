import type { CurriculumDelta } from '@/lib/curriculum/types';

// Bayern: Mittelschule uses same topics as Hauptschule (covered by schulform filter)
// Bayern: LehrplanPLUS — slightly different topic ordering in Klasse 5
// Quelle: LehrplanPLUS Bayern, Grundschule Mathematik Jahrgangsstufe 1
// Gültig: 2014 (Einführung LehrplanPLUS), zuletzt aktualisiert 2023, gültig 2026
// https://www.lehrplanplus.bayern.de/fachlehrplan/grundschule/1/mathematik
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Bayern',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-by-koerperformen',
      title: 'Körperformen: Würfel, Quader, Kugel, Zylinder',
      lernbereich: 'Geometrie',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-geometrische-formen'],
      estimatedMinutes: 90,
      description:
        'Schülerinnen und Schüler erkennen, benennen und beschreiben dreidimensionale Körper ' +
        '(Würfel, Quader, Kugel, Zylinder) aus ihrer Umgebung. Sie ordnen Alltagsgegenstände ' +
        'den Körperformen zu und vergleichen deren Eigenschaften (Flächen, Kanten, Ecken). ' +
        'Laut LehrplanPLUS Bayern ist "Raum und Form" mit explizitem Körperbezug ab Klasse 1 verbindlich.',
    },
  },
  {
    bundesland: 'Bayern',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-by-daten-zufall',
      title: 'Daten erfassen und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erheben einfache Daten aus ihrer Lebenswelt, ' +
        'ordnen diese und stellen sie in Strichlisten und einfachen Diagrammen dar. ' +
        'Sie lesen Informationen aus Darstellungen ab und formulieren einfache Aussagen dazu. ' +
        'Laut LehrplanPLUS Bayern ist der Lernbereich "Daten und Zufall" ab Jahrgangsstufe 1 verbindlich.',
    },
  },

  // --- K2-Overrides (LehrplanPLUS 2026) ---
  {
    bundesland: 'Bayern',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-by-zufallsexperimente',
      title: 'Zufallsexperimente: sicher, möglich, unmöglich',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler führen einfache Zufallsexperimente durch (z. B. Münzwurf, ' +
        'Würfeln, Ziehen aus einem Beutel) und beschreiben Ereignisse mit den Begriffen ' +
        '"sicher", "möglich" und "unmöglich". Sie vergleichen Ereignisse nach ihrer ' +
        'Eintrittswahrscheinlichkeit und begründen ihre Einschätzungen. ' +
        'Laut LehrplanPLUS Bayern 2026 wird der Lernbereich "Daten und Zufall" in ' +
        'Jahrgangsstufe 2 um erste Zufallsexperimente und Wahrscheinlichkeitsbegriffe erweitert.',
    },
  },

  // --- K3-Overrides (LehrplanPLUS 2026) ---
  {
    bundesland: 'Bayern',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-by-rechter-winkel',
      title: 'Rechter Winkel: erkennen, zeichnen und prüfen',
      lernbereich: 'Geometrie',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k3-geometrische-koerper'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler lernen den rechten Winkel als besondere Winkelgröße kennen ' +
        'und erkennen ihn an Figuren, Gegenständen und in der Umgebung. ' +
        'Sie überprüfen Winkel mit Geodreieck und Winkelkarte und zeichnen rechte Winkel freehand ' +
        'sowie mithilfe von Hilfsmitteln. Figuren werden nach rechten Winkeln klassifiziert. ' +
        'Laut LehrplanPLUS Bayern 2026 wird der Bereich „Raum und Form" in Jahrgangsstufe 3 ' +
        'um die explizite Arbeit mit dem rechten Winkel als Grundlage der Flächengeometrie erweitert.',
    },
  },
  {
    bundesland: 'Bayern',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-by-zufall-vertiefen',
      title: 'Zufallsversuche vertiefen: Häufigkeiten und Vorhersagen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-by-zufallsexperimente'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler vertiefen ihre Kenntnisse zu Zufallsexperimenten, indem sie ' +
        'Versuche häufiger wiederholen und relative Häufigkeiten bestimmen und vergleichen. ' +
        'Sie machen begründete Vorhersagen zu Versuchsausgängen und überprüfen diese experimentell. ' +
        'Der Begriff "wahrscheinlicher" wird quantitativ eingeführt und mit einfachen Bruchvorstellungen ' +
        'verknüpft. Laut LehrplanPLUS Bayern 2026 wird der Lernbereich „Daten und Zufall" in ' +
        'Jahrgangsstufe 3 durch vertiefte Zufallsexperimente und erste quantitative ' +
        'Wahrscheinlichkeitsvorstellungen ausgebaut.',
    },
  },

  // --- K4-Overrides (LehrplanPLUS 2026) ---
  {
    bundesland: 'Bayern',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-by-massstab',
      title: 'Maßstab: Karten und Pläne lesen und zeichnen',
      lernbereich: 'Sachrechnen',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k4-zahlen-bis-1million'],
      estimatedMinutes: 90,
      description:
        'Schülerinnen und Schüler lernen den Begriff Maßstab als Verhältnis zwischen ' +
        'Kartenmaß und Wirklichkeitsmaß kennen. Sie lesen Entfernungen auf einfachen ' +
        'Karten und Plänen ab, rechnen diese mit gegebenem Maßstab in reale Längen um ' +
        'und zeichnen Strecken maßstabsgerecht. Alltagsbeispiele (Stadtplan, Schulgebäudegrundriss) ' +
        'veranschaulichen den Nutzen von Maßstäben. ' +
        'Laut LehrplanPLUS Bayern 2026 wird der Bereich „Größen und Messen" in Jahrgangsstufe 4 ' +
        'um das Thema Maßstab als Sachrecheninhalt mit Verhältnisbezug erweitert.',
    },
  },
  {
    bundesland: 'Bayern',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-by-kombinatorik-vertiefen',
      title: 'Zufallsexperimente und Kombinatorik vertiefen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k3-by-zufall-vertiefen'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler vertiefen die Kombinatorik durch systematisches Zählen ' +
        'mit Baumdiagrammen und geordneten Listen. Sie berechnen einfache Wahrscheinlichkeiten ' +
        'als Brüche (z. B. Wahrscheinlichkeit, eine bestimmte Farbe zu ziehen) und überprüfen ' +
        'Vorhersagen durch wiederholte Zufallsexperimente. ' +
        'Laut LehrplanPLUS Bayern 2026 wird der Lernbereich „Daten und Zufall" in Jahrgangsstufe 4 ' +
        'durch vertiefte Kombinatorik mit Baumdiagrammen und erste quantitative ' +
        'Wahrscheinlichkeitsberechnungen abgeschlossen.',
    },
  },
];
