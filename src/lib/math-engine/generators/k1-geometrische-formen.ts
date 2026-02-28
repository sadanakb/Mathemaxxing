import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const shapeToVisual: Record<string, VisualConfig> = {
  'Dreieck': { type: 'geometric-shape', props: { shape: 'triangle' } },
  'Kreis': { type: 'geometric-shape', props: { shape: 'circle' } },
  'Quadrat': { type: 'geometric-shape', props: { shape: 'square' } },
  'Rechteck': { type: 'geometric-shape', props: { shape: 'rectangle' } },
  'Fünfeck': { type: 'geometric-shape', props: { shape: 'pentagon' } },
  'Sechseck': { type: 'geometric-shape', props: { shape: 'hexagon' } },
  'Viereck': { type: 'geometric-shape', props: { shape: 'rectangle' } },
};

const questions: Array<{ question: string; correct: string; choices: string[]; showShape?: string }> = [
  { question: 'Welche Form hat 3 Ecken?', correct: 'Dreieck', choices: ['Kreis', 'Dreieck', 'Viereck', 'Rechteck'], showShape: 'Dreieck' },
  { question: 'Welche Form hat keine Ecken?', correct: 'Kreis', choices: ['Dreieck', 'Kreis', 'Quadrat', 'Rechteck'], showShape: 'Kreis' },
  { question: 'Welche Form hat 4 gleich lange Seiten?', correct: 'Quadrat', choices: ['Dreieck', 'Rechteck', 'Quadrat', 'Kreis'], showShape: 'Quadrat' },
  { question: 'Welche Form hat 4 Ecken, aber nicht alle Seiten gleich lang?', correct: 'Rechteck', choices: ['Kreis', 'Dreieck', 'Quadrat', 'Rechteck'], showShape: 'Rechteck' },
  { question: 'Wie viele Seiten hat ein Dreieck?', correct: '3', choices: ['2', '3', '4', '5'], showShape: 'Dreieck' },
  { question: 'Wie viele Ecken hat ein Viereck?', correct: '4', choices: ['3', '4', '5', '6'], showShape: 'Viereck' },
  { question: 'Welche Form ist rund?', correct: 'Kreis', choices: ['Dreieck', 'Quadrat', 'Kreis', 'Rechteck'], showShape: 'Kreis' },
  { question: 'Welche Form hat 3 Seiten und 3 Winkel?', correct: 'Dreieck', choices: ['Viereck', 'Dreieck', 'Kreis', 'Fünfeck'], showShape: 'Dreieck' },
];

const hardQuestions: Array<{ question: string; correct: string; choices: string[]; showShape?: string }> = [
  { question: 'Wie viele Seiten hat ein Sechseck?', correct: '6', choices: ['4', '5', '6', '8'], showShape: 'Sechseck' },
  { question: 'Welche Form ist ein Quadrat auch?', correct: 'Rechteck', choices: ['Dreieck', 'Kreis', 'Rechteck', 'Fünfeck'], showShape: 'Quadrat' },
  { question: 'Wie viele Ecken hat ein Pentagon?', correct: '5', choices: ['4', '5', '6', '7'], showShape: 'Fünfeck' },
];

// True-false question pool for geometric shapes
const trueFalseQs: Array<{ statement: string; isTrue: boolean; hint: string; explanation: string }> = [
  { statement: 'Ein Dreieck hat 3 Ecken.', isTrue: true, hint: 'Zähle die Ecken eines Dreiecks.', explanation: 'Ja, ein Dreieck hat genau 3 Ecken.' },
  { statement: 'Ein Kreis hat 4 Ecken.', isTrue: false, hint: 'Ein Kreis ist rund — hat er überhaupt Ecken?', explanation: 'Nein, ein Kreis hat keine Ecken.' },
  { statement: 'Ein Quadrat hat 4 gleich lange Seiten.', isTrue: true, hint: 'Vergleiche alle vier Seiten eines Quadrats.', explanation: 'Ja, alle vier Seiten eines Quadrats sind gleich lang.' },
  { statement: 'Ein Rechteck hat 3 Seiten.', isTrue: false, hint: 'Zähle die Seiten eines Rechtecks.', explanation: 'Nein, ein Rechteck hat 4 Seiten.' },
  { statement: 'Ein Sechseck hat 6 Ecken.', isTrue: true, hint: '"Sechs" steckt schon im Namen!', explanation: 'Ja, ein Sechseck hat 6 Ecken und 6 Seiten.' },
  { statement: 'Ein Dreieck hat mehr Ecken als ein Viereck.', isTrue: false, hint: 'Dreieck = 3 Ecken, Viereck = 4 Ecken.', explanation: 'Nein, ein Dreieck hat 3 Ecken, ein Viereck hat 4 Ecken.' },
];

// Classify exercise: sort shapes into "round" vs "with corners"
const classifyShapes = {
  round: ['Kreis'],
  withCorners: ['Dreieck', 'Quadrat', 'Rechteck', 'Fünfeck', 'Sechseck'],
};

export const template: ExerciseTemplate = {
  topicId: 'k1-geometrische-formen',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    if (variant === 0) {
      // multiple-choice from question pools (original behaviour)
      const pool = difficulty === 3 ? hardQuestions : questions;
      const q = pool[randInt(0, pool.length - 1)];
      const distractors = q.choices.filter(c => c !== q.correct);

      return {
        id: genId('k1-geo'),
        topicId: 'k1-geometrische-formen',
        question: q.question,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: q.correct,
        distractors,
        hint: 'Denke an die Anzahl der Ecken und Seiten.',
        explanation: `Die richtige Antwort ist: ${q.correct}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: difficulty === 1 ? 15 : difficulty === 2 ? 20 : 25,
        visualConfig: q.showShape ? shapeToVisual[q.showShape] : undefined,
      };
    }

    if (variant === 1) {
      // true-false: is the statement about the shape correct?
      const pool = difficulty === 3 ? trueFalseQs.slice(4) : trueFalseQs.slice(0, 4);
      const q = pool[randInt(0, pool.length - 1)];
      return {
        id: genId('k1-geo'),
        topicId: 'k1-geometrische-formen',
        question: `Stimmt das? ${q.statement}`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: q.isTrue ? 'wahr' : 'falsch',
        hint: q.hint,
        explanation: q.explanation,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 12,
      };
    }

    // variant === 2: classify — "Ist diese Form rund oder hat sie Ecken?"
    const allShapes = [...classifyShapes.round, ...classifyShapes.withCorners];
    const pickedShapes = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
    const chosen = new Set<string>();
    while (chosen.size < pickedShapes) {
      chosen.add(allShapes[randInt(0, allShapes.length - 1)]);
    }
    const chosenList = [...chosen];
    const categories: Record<string, string[]> = {
      'Rund (keine Ecken)': chosenList.filter(s => classifyShapes.round.includes(s)),
      'Hat Ecken': chosenList.filter(s => classifyShapes.withCorners.includes(s)),
    };
    // correctAnswer for classify is a JSON summary used for display; the actual checking happens via categories
    return {
      id: genId('k1-geo'),
      topicId: 'k1-geometrische-formen',
      question: 'Sortiere die Formen! Welche sind rund, welche haben Ecken?',
      answerType: 'drag-drop',
      exerciseType: 'classify',
      correctAnswer: JSON.stringify(categories),
      items: chosenList,
      categories,
      hint: 'Ein Kreis ist rund. Dreiecke, Quadrate und Rechtecke haben Ecken.',
      explanation: `Rund: ${categories['Rund (keine Ecken)'].join(', ') || '–'}. Mit Ecken: ${categories['Hat Ecken'].join(', ') || '–'}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: difficulty === 1 ? 20 : 25,
    };
  },
};
