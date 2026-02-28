import type { CurriculumDelta } from '@/lib/curriculum/types';

// Berlin: Grundschule goes to Klasse 6 (handled by getGrundschuleMaxKlasse)
// Berlin: ISS follows standard Sekundarstufe curriculum
// Quelle: Rahmenlehrplan 2017 Berlin-Brandenburg, Teil C Mathematik, Jahrgangsstufen 1–10
// Kompetenzbereich "Daten und Zufall" ab Niveaustufe A (Klasse 1–2) verbindlich
// Gültig: 2017–2026 (keine Revision seither)
// https://bildungsserver.berlin-brandenburg.de/rlp-online/grundschule/mathematik/
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Berlin',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-be-daten-wahrscheinlichkeit',
      title: 'Daten sammeln, ordnen und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler sammeln Daten aus konkreten Alltagssituationen, ' +
        'ordnen diese nach Merkmalen und stellen sie in Strichlisten und einfachen Tabellen dar. ' +
        'Sie lesen Informationen aus Darstellungen ab und beantworten einfache Fragen dazu. ' +
        'Laut Rahmenlehrplan 2017 Berlin-Brandenburg ist "Daten und Zufall" ab Niveaustufe A ' +
        '(Klassen 1–2) als prozessbezogene und inhaltsbezogene Kompetenz verankert.',
    },
  },

  // --- K2-Overrides (Rahmenlehrplan 2017) ---
  {
    bundesland: 'Berlin',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-be-haeufigkeiten',
      title: 'Häufigkeiten und Diagramme: Daten vertiefen',
      lernbereich: 'Statistik',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln', 'k2-zahlen-bis-100'],
      estimatedMinutes: 70,
      description:
        'Schülerinnen und Schüler erheben Daten zu selbst gewählten Fragestellungen, ' +
        'ermitteln absolute Häufigkeiten und stellen Ergebnisse in Balkendiagrammen und ' +
        'Piktogrammen dar. Sie lesen Diagramme aus, vergleichen Häufigkeiten und formulieren ' +
        'Schlussfolgerungen in vollständigen Sätzen. ' +
        'Der Rahmenlehrplan 2017 Berlin-Brandenburg vertieft in Niveaustufe B (Klasse 2) ' +
        'den Kompetenzbereich "Daten und Wahrscheinlichkeit" durch intensivere Arbeit ' +
        'mit Häufigkeiten und verschiedenen Diagrammtypen.',
    },
  },

  // --- K3-Overrides (Rahmenlehrplan 2017, Niveaustufe B) ---
  {
    bundesland: 'Berlin',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-be-daten-vertiefen',
      title: 'Daten und Wahrscheinlichkeit vertiefen: statistische Analyse',
      lernbereich: 'Statistik',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler planen und führen eigene statistische Erhebungen durch, ' +
        'wählen geeignete Darstellungsformen (Balkendiagramm, Tabelle, Piktogramm) und ' +
        'interpretieren Ergebnisse kritisch. Sie erkennen Zusammenhänge zwischen Daten und ' +
        'formulieren Schlussfolgerungen, die über einfache Beschreibungen hinausgehen. ' +
        'Der Rahmenlehrplan 2017 Berlin-Brandenburg vertieft in Niveaustufe B (Klassen 3–4) ' +
        'den Kompetenzbereich „Daten und Wahrscheinlichkeit" durch umfassendere statistische ' +
        'Analysen und den Aufbau eines kritischen Datenverständnisses.',
    },
  },

  // --- K4-Overrides (Rahmenlehrplan 2017, Niveaustufe B erweitert) ---
  {
    bundesland: 'Berlin',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-be-daten-wahrsch-b',
      title: 'Daten und Wahrscheinlichkeit: Niveaustufe B vertieft',
      lernbereich: 'Statistik',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k3-be-daten-vertiefen'],
      estimatedMinutes: 85,
      description:
        'Schülerinnen und Schüler schließen den Kompetenzbereich „Daten und Wahrscheinlichkeit" ' +
        'auf Niveaustufe B ab. Sie führen komplexere Datenerhebungen durch, erstellen und ' +
        'vergleichen verschiedene Diagrammtypen und bewerten Darstellungen kritisch. ' +
        'Einfache Wahrscheinlichkeiten werden als Verhältnis (z. B. 1 von 6) beschrieben ' +
        'und durch Experimente überprüft. ' +
        'Der Rahmenlehrplan 2017 Berlin-Brandenburg sieht in Niveaustufe B (Klassen 3–4) ' +
        'eine abschließende Vertiefung des Kompetenzbereichs „Daten und Wahrscheinlichkeit" ' +
        'mit erweiterter statistischer Analyse und Wahrscheinlichkeitsverständnis vor.',
    },
  },
  {
    bundesland: 'Berlin',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-be-raumvorstellung',
      title: 'Raumvorstellung: Körper aus verschiedenen Perspektiven',
      lernbereich: 'Geometrie',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler entwickeln ihre Raumvorstellung durch das Betrachten, ' +
        'Beschreiben und Zeichnen geometrischer Körper aus verschiedenen Blickwinkeln. ' +
        'Sie erstellen und lesen einfache Schrägbilder und Grundrisse von Bauwerken ' +
        'aus Einheitswürfeln und erkennen Körper anhand von Ansichten (Vorderseite, Seite, oben). ' +
        'Der Rahmenlehrplan 2017 Berlin-Brandenburg verankert die Förderung der Raumvorstellung ' +
        'als durchgängige Kompetenz im Bereich „Raum und Form", die in Klasse 4 vertieft wird.',
    },
  },
];
