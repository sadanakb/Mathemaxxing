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

export const template: ExerciseTemplate = {
  topicId: 'k1-geometrische-formen',
  generate(difficulty = 1): Exercise {
    const pool = difficulty === 3 ? hardQuestions : questions;
    const q = pool[randInt(0, pool.length - 1)];
    const distractors = q.choices.filter(c => c !== q.correct);

    return {
      id: genId('k1-geo'),
      topicId: 'k1-geometrische-formen',
      question: q.question,
      answerType: 'multiple-choice',
      correctAnswer: q.correct,
      distractors,
      hint: 'Denke an die Anzahl der Ecken und Seiten.',
      explanation: `Die richtige Antwort ist: ${q.correct}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: difficulty === 1 ? 15 : difficulty === 2 ? 20 : 25,
      visualConfig: q.showShape ? shapeToVisual[q.showShape] : undefined,
    };
  },
};
