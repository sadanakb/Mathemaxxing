import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

type Figur = {
  name: string;
  typ: 'Viereck' | 'Dreieck';
  beschreibung: string;
  eigenschaft: string;
};

const figuren: Figur[] = [
  { name: 'Quadrat', typ: 'Viereck', beschreibung: '4 gleich lange Seiten, 4 rechte Winkel', eigenschaft: 'Alle Seiten gleich lang, alle Winkel 90°.' },
  { name: 'Rechteck', typ: 'Viereck', beschreibung: 'Gegenüberliegende Seiten gleich lang, 4 rechte Winkel', eigenschaft: 'Gegenüberliegende Seiten sind gleich lang.' },
  { name: 'Raute', typ: 'Viereck', beschreibung: '4 gleich lange Seiten, keine rechten Winkel', eigenschaft: 'Alle Seiten gleich lang, aber keine rechten Winkel (im Allgemeinen).' },
  { name: 'Parallelogramm', typ: 'Viereck', beschreibung: 'Gegenüberliegende Seiten parallel und gleich lang', eigenschaft: 'Gegenüberliegende Seiten sind parallel.' },
  { name: 'Trapez', typ: 'Viereck', beschreibung: 'Genau ein Paar paralleler Seiten', eigenschaft: 'Ein Paar gegenüberliegender Seiten ist parallel.' },
  { name: 'gleichseitiges Dreieck', typ: 'Dreieck', beschreibung: '3 gleich lange Seiten, 3 gleiche Winkel (60°)', eigenschaft: 'Alle Seiten und Winkel sind gleich.' },
  { name: 'gleichschenkliges Dreieck', typ: 'Dreieck', beschreibung: '2 gleich lange Seiten', eigenschaft: 'Zwei Seiten sind gleich lang, die Basiswinkel sind gleich.' },
  { name: 'rechtwinkliges Dreieck', typ: 'Dreieck', beschreibung: 'Ein Winkel beträgt 90°', eigenschaft: 'Es hat einen rechten Winkel (90°).' },
];

/**
 * k4-vierecke-dreiecke — Geometrische Figuren: Vierecke und Dreiecke
 *
 * Difficulty 1: classify — Dreieck oder Viereck?
 * Difficulty 2: multiple-choice — Welche Figur hat diese Eigenschaft?
 * Difficulty 3: true-false — Stimmen die Aussagen?
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-vierecke-dreiecke',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // classify: Ordne die Figuren den Kategorien Dreieck / Viereck zu
      const selected = [...figuren].sort(() => Math.random() - 0.5).slice(0, 6);
      const categories: Record<string, string[]> = {
        'Dreieck': selected.filter(f => f.typ === 'Dreieck').map(f => f.name),
        'Viereck': selected.filter(f => f.typ === 'Viereck').map(f => f.name),
      };

      // Ensure both categories have at least one entry
      if (categories['Dreieck'].length === 0 || categories['Viereck'].length === 0) {
        // Fallback: use all
        categories['Dreieck'] = figuren.filter(f => f.typ === 'Dreieck').map(f => f.name);
        categories['Viereck'] = figuren.filter(f => f.typ === 'Viereck').map(f => f.name);
      }

      const allItems = [...categories['Dreieck'], ...categories['Viereck']];

      return {
        id: genId('k4-fig'),
        topicId: 'k4-vierecke-dreiecke',
        question: 'Ordne die Figuren ein: Welche sind Dreiecke, welche sind Vierecke?',
        answerType: 'drag-drop',
        exerciseType: 'classify',
        categories,
        items: allItems.sort(() => Math.random() - 0.5),
        correctAnswer: Object.entries(categories).map(([k, v]) => `${k}: ${v.join(', ')}`).join(' | '),
        hint: 'Ein Dreieck hat 3 Ecken, ein Viereck hat 4 Ecken.',
        explanation: `Dreiecke: ${categories['Dreieck'].join(', ')}. Vierecke: ${categories['Viereck'].join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    if (difficulty === 2) {
      // multiple-choice: Welche Figur hat diese Eigenschaft?
      const idx = randInt(0, figuren.length - 1);
      const chosen = figuren[idx];

      // 3 Distraktoren aus dem gleichen Typ wenn möglich
      const others = figuren.filter((_, i) => i !== idx);
      const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3).map(f => f.name);

      const figVisualMap: Record<string, VisualConfig> = {
        'Quadrat': { type: 'geometric-shape', props: { shape: 'square' } },
        'Rechteck': { type: 'geometric-shape', props: { shape: 'rectangle' } },
        'gleichseitiges Dreieck': { type: 'geometric-shape', props: { shape: 'triangle' } },
        'gleichschenkliges Dreieck': { type: 'geometric-shape', props: { shape: 'triangle' } },
        'rechtwinkliges Dreieck': { type: 'geometric-shape', props: { shape: 'triangle' } },
      };

      return {
        id: genId('k4-fig'),
        topicId: 'k4-vierecke-dreiecke',
        question: `Welche Figur hat folgende Eigenschaft? "${chosen.beschreibung}"`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: chosen.name,
        distractors,
        hint: `Überlege: Wie viele Seiten und Winkel hat die Figur?`,
        explanation: `${chosen.name}: ${chosen.eigenschaft}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
        visualConfig: figVisualMap[chosen.name],
      };
    }

    // difficulty === 3: true-false
    const fig = figuren[randInt(0, figuren.length - 1)];
    const variant = randInt(0, 2);

    if (variant === 0) {
      // "Ein Quadrat ist ein Viereck" — immer wahr
      const isViereck = fig.typ === 'Viereck';
      const claimType = randInt(0, 1) === 0 ? 'Viereck' : 'Dreieck';
      const isTrue = (claimType === fig.typ);

      return {
        id: genId('k4-fig'),
        topicId: 'k4-vierecke-dreiecke',
        question: `Stimmt es? Ein ${fig.name} ist ein ${claimType}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: `Wie viele Ecken hat ein ${fig.name}?`,
        explanation: `Ein ${fig.name} ist ein ${fig.typ}. Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      // "Ein Rechteck hat 4 gleich lange Seiten" — falsch (das ist ein Quadrat)
      const claims: { claim: string; figur: string; wahr: boolean }[] = [
        { claim: 'hat 4 gleich lange Seiten', figur: 'Rechteck', wahr: false },
        { claim: 'hat 4 gleich lange Seiten', figur: 'Quadrat', wahr: true },
        { claim: 'hat 4 gleich lange Seiten', figur: 'Raute', wahr: true },
        { claim: 'hat einen rechten Winkel', figur: 'gleichseitiges Dreieck', wahr: false },
        { claim: 'hat einen rechten Winkel', figur: 'rechtwinkliges Dreieck', wahr: true },
        { claim: 'hat 3 gleich lange Seiten', figur: 'gleichschenkliges Dreieck', wahr: false },
        { claim: 'hat 3 gleich lange Seiten', figur: 'gleichseitiges Dreieck', wahr: true },
        { claim: 'hat genau ein Paar paralleler Seiten', figur: 'Trapez', wahr: true },
        { claim: 'hat genau ein Paar paralleler Seiten', figur: 'Parallelogramm', wahr: false },
      ];
      const c = claims[randInt(0, claims.length - 1)];

      return {
        id: genId('k4-fig'),
        topicId: 'k4-vierecke-dreiecke',
        question: `Stimmt es? Ein ${c.figur} ${c.claim}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: c.wahr ? 'wahr' : 'falsch',
        hint: 'Überlege genau, welche Eigenschaften diese Figur hat.',
        explanation: `Die Aussage "Ein ${c.figur} ${c.claim}" ist ${c.wahr ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Ecken-Frage
    const eckenFigur = figuren[randInt(0, figuren.length - 1)];
    const ecken = eckenFigur.typ === 'Dreieck' ? 3 : 4;
    const claimedEcken = ecken + (randInt(0, 1) === 0 ? 0 : (randInt(0, 1) === 0 ? 1 : -1));
    const isTrue = claimedEcken === ecken;

    return {
      id: genId('k4-fig'),
      topicId: 'k4-vierecke-dreiecke',
      question: `Stimmt es? Ein ${eckenFigur.name} hat ${claimedEcken} Ecken.`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: isTrue ? 'wahr' : 'falsch',
      hint: `Zähle die Ecken der Figur.`,
      explanation: `Ein ${eckenFigur.name} hat ${ecken} Ecken. Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
