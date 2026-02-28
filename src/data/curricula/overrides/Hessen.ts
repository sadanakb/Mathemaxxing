import type { CurriculumDelta } from '@/lib/curriculum/types';

// Quelle: Kerncurriculum Hessen 2011, Grundschule Mathematik
// Gültig: 2011–2026 (keine Gesamtrevision; punktuelle Anpassungen 2019)
// Lernbereich "Daten und Zufall" mit Strichlisten und Tabellen ab Klasse 1 vorgesehen
// https://kultusministerium.hessen.de/schulsystem/bildungsstandards-kerncurricula-und-lehrplaene/kerncurricula/grundschule/mathematik
export const OVERRIDES: CurriculumDelta[] = [
  {
    bundesland: 'Hessen',
    klasse: 1,
    action: 'add',
    topic: {
      id: 'k1-he-daten-zufall',
      title: 'Daten erfassen und darstellen: Strichlisten',
      lernbereich: 'Statistik',
      klasse: 1,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k1-zahlen-bis-10'],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler erfassen Daten aus ihrer Lebenswelt durch systematisches Zählen ' +
        'und tragen Ergebnisse in Strichlisten und einfache Tabellen ein. ' +
        'Sie lesen Darstellungen aus und beschreiben Ergebnisse mit eigenen Worten. ' +
        'Laut Kerncurriculum Hessen 2011 ist "Daten und Zufall" als Leitidee bereits ab Klasse 1 ' +
        'mit dem Schwerpunkt Strichlisten und Tabellen verbindlich.',
    },
  },

  // --- K2-Overrides (KC 2011) ---
  {
    bundesland: 'Hessen',
    klasse: 2,
    action: 'add',
    topic: {
      id: 'k2-he-wahrscheinlichkeit',
      title: 'Wahrscheinlichkeit: sicher, möglich, unmöglich',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 2,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k2-daten-sammeln'],
      estimatedMinutes: 65,
      description:
        'Schülerinnen und Schüler beurteilen Ereignisse aus dem Alltag und aus einfachen ' +
        'Zufallsexperimenten mit den Begriffen "sicher", "möglich" und "unmöglich". ' +
        'Sie sortieren Ereignisse auf einer Wahrscheinlichkeitsskala und begründen ihre Einschätzungen ' +
        'mithilfe eigener Beispiele. ' +
        'Das Kerncurriculum Hessen 2011 sieht in der Leitidee "Daten und Zufall" in Klasse 2 ' +
        'die Einführung grundlegender Wahrscheinlichkeitsbegriffe vor.',
    },
  },

  // --- K3-Overrides (KC 2011, 2026-Konkretisierung) ---
  {
    bundesland: 'Hessen',
    klasse: 3,
    action: 'add',
    topic: {
      id: 'k3-he-kombinatorik',
      title: 'Kombinatorik: systematisches Zählen von Möglichkeiten',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 3,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: [],
      estimatedMinutes: 75,
      description:
        'Schülerinnen und Schüler untersuchen kombinatorische Fragestellungen aus ihrem Alltag ' +
        '(z. B. "Wie viele verschiedene Frühstückskombinationen gibt es mit 4 Brotbelägen?"). ' +
        'Sie entwickeln und nutzen systematische Zählmethoden (Listen, Baumdiagramme) und ' +
        'begründen die Vollständigkeit ihrer Auflistungen. ' +
        'Das Kerncurriculum Hessen 2011 verankert systematisches Zählen und Kombinatorik ' +
        'in der Leitidee „Daten und Zufall" als Kompetenz in der Jahrgangsstufe 3.',
    },
  },

  // --- K4-Overrides (KC 2011, 2026-Konkretisierung) ---
  {
    bundesland: 'Hessen',
    klasse: 4,
    action: 'add',
    topic: {
      id: 'k4-he-kombinatorik-vertiefen',
      title: 'Kombinatorik vertiefen: Baumdiagramme und Wahrscheinlichkeiten',
      lernbereich: 'Wahrscheinlichkeit',
      klasse: 4,
      schulformen: ['Grundschule'],
      kmkStandard: false,
      prerequisites: ['k3-he-kombinatorik'],
      estimatedMinutes: 80,
      description:
        'Schülerinnen und Schüler vertiefen die Kombinatorik durch den systematischen Einsatz ' +
        'von Baumdiagrammen bei zwei- und dreistufigen Auswahlprozessen. Sie bestimmen die ' +
        'Anzahl aller möglichen Ausgänge und berechnen einfache Wahrscheinlichkeiten als Brüche. ' +
        'Ergebnisse werden durch Zufallsexperimente überprüft und mit theoretischen Werten verglichen. ' +
        'Das Kerncurriculum Hessen 2011 schließt in Jahrgangsstufe 4 die Leitidee „Daten und Zufall" ' +
        'mit vertiefter Kombinatorik und ersten Wahrscheinlichkeitsberechnungen ab.',
    },
  },
];
