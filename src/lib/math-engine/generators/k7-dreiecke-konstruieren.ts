import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const questions: Array<{
  question: string;
  correct: string;
  choices: string[];
  hint: string;
  explanation: string;
}> = [
  {
    question: 'Wie viele Winkel hat ein Dreieck?',
    correct: '3',
    choices: ['2', '3', '4', '6'],
    hint: 'Ein Dreieck hat genauso viele Winkel wie Ecken.',
    explanation: 'Ein Dreieck hat 3 Seiten, 3 Ecken und 3 Winkel.',
  },
  {
    question: 'Wie groß ist die Winkelsumme in einem Dreieck?',
    correct: '180°',
    choices: ['90°', '180°', '270°', '360°'],
    hint: 'Die drei Innenwinkel addieren sich zu einem konstanten Wert.',
    explanation: 'Die Winkelsumme im Dreieck beträgt immer 180°.',
  },
  {
    question: 'Welche Art von Dreieck hat alle Seiten gleich lang?',
    correct: 'Gleichseitiges Dreieck',
    choices: ['Gleichschenkliges Dreieck', 'Rechtwinkliges Dreieck', 'Gleichseitiges Dreieck', 'Stumpfwinkliges Dreieck'],
    hint: 'Das Präfix „gleich-seitig" beschreibt alle Seiten.',
    explanation: 'Ein gleichseitiges Dreieck hat drei gleich lange Seiten und drei 60°-Winkel.',
  },
  {
    question: 'Ein rechtwinkliges Dreieck hat einen Winkel von 90°. Wie groß sind die anderen beiden Winkel zusammen?',
    correct: '90°',
    choices: ['45°', '90°', '180°', '270°'],
    hint: 'Gesamtsumme der Winkel = 180°. Ziehe 90° ab.',
    explanation: '180° − 90° = 90°. Die anderen beiden Winkel ergeben zusammen 90°.',
  },
  {
    question: 'Wie heißt die längste Seite in einem rechtwinkligen Dreieck?',
    correct: 'Hypotenuse',
    choices: ['Kathete', 'Hypotenuse', 'Grundlinie', 'Mittellinie'],
    hint: 'Sie liegt dem rechten Winkel gegenüber.',
    explanation: 'Die Seite gegenüber dem 90°-Winkel heißt Hypotenuse und ist die längste Seite.',
  },
  {
    question: 'Welches Dreieck hat genau zwei gleich lange Seiten?',
    correct: 'Gleichschenkliges Dreieck',
    choices: ['Gleichseitiges Dreieck', 'Gleichschenkliges Dreieck', 'Unregelmäßiges Dreieck', 'Rechtwinkliges Dreieck'],
    hint: 'Zwei Seiten sind gleich, eine ist anders.',
    explanation: 'Das gleichschenklige Dreieck hat genau zwei gleich lange Seiten (Schenkel).',
  },
];

export const template: ExerciseTemplate = {
  topicId: 'k7-dreiecke-konstruieren',
  generate(difficulty = 1): Exercise {
    const pool = difficulty === 1 ? questions.slice(0, 2) : difficulty === 2 ? questions.slice(0, 4) : questions;
    const q = pool[randInt(0, pool.length - 1)];
    const distractors = q.choices.filter(c => c !== q.correct);

    return {
      id: genId('k7-drei'),
      topicId: 'k7-dreiecke-konstruieren',
      question: q.question,
      answerType: 'multiple-choice',
      correctAnswer: q.correct,
      distractors,
      hint: q.hint,
      explanation: q.explanation,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40,
    };
  },
};
