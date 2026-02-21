import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-zahlenstrahl-bis-1000 — Zahlenstrahl bis 1000
 *
 * Difficulty 1: Hunderter ablesen (0, 100, 200 ... 1000)
 * Difficulty 2: Zehner ablesen (z.B. 350, 470)
 * Difficulty 3: Beliebige Zahlen eintragen und ablesen
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-zahlenstrahl-bis-1000',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Hunderter auf dem Zahlenstrahl
      const target = randInt(1, 9) * 100;
      return {
        id: genId('k3-zstr'),
        topicId: 'k3-zahlenstrahl-bis-1000',
        question: `Zeige die Zahl ${target} auf dem Zahlenstrahl.`,
        answerType: 'number',
        exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 1000, step: 100, targets: [target] },
        visualConfig: { type: 'numberline', props: { min: 0, max: 1000, step: 100, highlights: [target] } },
        hint: `Zähle die Hunderter-Schritte auf dem Zahlenstrahl.`,
        explanation: `${target} liegt bei ${target / 100} Hunderter-Schritten auf dem Zahlenstrahl.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Zehner ablesen
      const hundreds = randInt(1, 8) * 100;
      const tens = randInt(1, 9) * 10;
      const target = hundreds + tens;
      return {
        id: genId('k3-zstr'),
        topicId: 'k3-zahlenstrahl-bis-1000',
        question: `Zeige die Zahl ${target} auf dem Zahlenstrahl.`,
        answerType: 'number',
        exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 1000, step: 100, targets: [target] },
        visualConfig: { type: 'numberline', props: { min: 0, max: 1000, step: 100, highlights: [target] } },
        hint: `${target} liegt zwischen ${hundreds} und ${hundreds + 100}.`,
        explanation: `${target} liegt ${tens} nach dem ${hundreds}-er Strich.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: Beliebige Zahlen
    const target1 = randInt(50, 450);
    const target2 = randInt(500, 950);
    return {
      id: genId('k3-zstr'),
      topicId: 'k3-zahlenstrahl-bis-1000',
      question: `Ordne die Zahlen ${target1} und ${target2} auf dem Zahlenstrahl ein.`,
      answerType: 'number',
      exerciseType: 'drag-onto-numberline',
      correctAnswer: target1,
      numberlineConfig: { min: 0, max: 1000, step: 100, targets: [target1, target2] },
      visualConfig: { type: 'numberline', props: { min: 0, max: 1000, step: 100, highlights: [target1, target2] } },
      hint: `Überlege zuerst, zwischen welchen Hundertern die Zahlen liegen.`,
      explanation: `${target1} liegt zwischen ${Math.floor(target1 / 100) * 100} und ${Math.ceil(target1 / 100) * 100}. ${target2} liegt zwischen ${Math.floor(target2 / 100) * 100} und ${Math.ceil(target2 / 100) * 100}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 30,
    };
  },
};
