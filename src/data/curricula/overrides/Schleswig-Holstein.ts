import type { CurriculumDelta } from '@/lib/curriculum/types';

// Schleswig-Holstein: Fachanforderungen Mathematik Grundschule (2019, gültig 2026)
// Quelle: Ministerium für Bildung, Wissenschaft und Kultur SH,
//         Fachanforderungen Mathematik — Primarstufe, Kiel 2019 — gültig ab 2019/20
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Schleswig-Holstein',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-sh-daten-zufall',
      title: 'Daten sammeln, ordnen und darstellen',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-20'],
      estimatedMinutes: 90,
      description:
        'Alltagsnahe Daten (z. B. Lieblingsspeisen, Haustiere der Klasse) erheben, ' +
        'in Strichlisten und einfachen Piktogrammen ordnen und darstellen. ' +
        'Ergebnisse beschreiben und vergleichen. Erste Zeitvorstellungen entwickeln: ' +
        'Tagesabläufe, Wochentage und Jahreszeiten einordnen, über die reine Uhrzeit ' +
        'hinaus. Die SH-Fachanforderungen 2019 sehen den Kompetenzbereich „Daten und ' +
        'Zufall" sowie erweiterte Zeitvorstellungen im Bereich „Größen und Messen" ' +
        'bereits für die Eingangsstufe vor.',
    },
  },

  // --- K2-Overrides (FA 2019) ---
  {
    bundesland: 'Schleswig-Holstein',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-sh-wahrscheinlichkeiten',
      title: 'Wahrscheinlichkeiten: Grundbegriffe einführen',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler beurteilen Alltagsereignisse und einfache Zufallsexperimente ' +
        'mithilfe der Grundbegriffe "sicher", "möglich" und "unmöglich". ' +
        'Sie führen einfache Zufallsversuche durch (z. B. Münzwurf, Ziehen aus Beutel) und ' +
        'beschreiben qualitativ, welche Ergebnisse wahrscheinlicher oder unwahrscheinlicher sind. ' +
        'Die Schleswig-Holsteinischen Fachanforderungen 2019 sehen in Klasse 2 die Einführung ' +
        'grundlegender Wahrscheinlichkeitsbegriffe im Bereich „Daten und Zufall" vor.',
    },
  },

  // --- K3-Overrides (FA 2019) ---
  {
    bundesland: 'Schleswig-Holstein',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-sh-daten-auswerten',
      title: 'Daten auswerten und darstellen: Diagramme erstellen',
      lernbereich: 'Statistik',
      klasse: 3,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler planen Datenerhebungen zu selbst gewählten Fragestellungen, ' +
        'erheben die Daten systematisch und werten sie aus. Sie erstellen eigenständig ' +
        'Balkendiagramme und Piktogramme und beschreiben die Darstellungen in vollständigen Sätzen. ' +
        'Ergebnisse werden kritisch reflektiert und mit anderen Gruppen verglichen. ' +
        'Die Schleswig-Holsteinischen Fachanforderungen 2019 verankern das selbstständige ' +
        'Erstellen und Interpretieren von Diagrammen als verbindliche Kompetenz im ' +
        'Bereich „Daten und Zufall" in Klasse 3.',
    },
  },

  // --- K4-Overrides (FA 2019) ---
  {
    bundesland: 'Schleswig-Holstein',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-sh-daten-vertiefen',
      title: 'Daten auswerten vertiefen: verschiedene Diagrammtypen vergleichen',
      lernbereich: 'Statistik',
      klasse: 4,
      schulformen: ['Grundschule' as any],
      kmkStandard: false,
      prerequisites: ['k3-sh-daten-auswerten'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler vertiefen den Umgang mit statistischen Daten durch ' +
        'Vergleich und kritische Bewertung verschiedener Diagrammtypen (Balkendiagramm, ' +
        'Säulendiagramm, Piktogramm). Sie erkennen, welcher Diagrammtyp für welche ' +
        'Fragestellung am besten geeignet ist, und begründen ihre Wahl. ' +
        'Sie werten Daten aus authentischen Quellen (Zeitung, Internet) aus und formulieren ' +
        'fundierte Schlussfolgerungen. ' +
        'Die Schleswig-Holsteinischen Fachanforderungen 2019 schließen in Klasse 4 den ' +
        'Bereich „Daten und Zufall" mit vertiefter Diagrammkompetenz und kritischem ' +
        'Datenverständnis ab.',
    },
  },
];
