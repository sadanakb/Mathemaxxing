import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-vdhlb-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-verdoppeln-halbieren',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    if (variant === 0) {
      // Verdoppeln (number-input)
      const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
      const n = randInt(1, max);
      const answer = n * 2;

      return {
        id: genId(),
        topicId: 'k1-verdoppeln-halbieren',
        question: `Was ist das Doppelte von ${n}?`,
        questionLatex: `${n} \\times 2 = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 2].filter(d => d > 0 && d !== answer),
        hint: `Doppelt heißt: ${n} + ${n}. Zähle zusammen!`,
        explanation: `Das Doppelte von ${n} ist ${n} + ${n} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    if (variant === 1) {
      // Halbieren (number-input)
      const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
      const half = randInt(1, max);
      const n = half * 2; // always even
      const answer = half;

      return {
        id: genId(),
        topicId: 'k1-verdoppeln-halbieren',
        question: `Was ist die Hälfte von ${n}?`,
        questionLatex: `${n} \\div 2 = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 2].filter(d => d > 0 && d !== answer),
        hint: `Halbieren heißt: In zwei gleiche Teile teilen. ${n} = ___ + ___`,
        explanation: `Die Hälfte von ${n} ist ${answer}, denn ${answer} + ${answer} = ${n}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    if (variant === 2) {
      // true-false: "Ist das Doppelte von X gleich Y?"
      const n = randInt(1, difficulty === 1 ? 5 : 10);
      const correct = n * 2;
      const showCorrect = randInt(0, 1) === 0;
      const shown = showCorrect ? correct : correct + (randInt(0, 1) === 0 ? 1 : -1);

      return {
        id: genId(),
        topicId: 'k1-verdoppeln-halbieren',
        question: `Stimmt das? Das Doppelte von ${n} ist ${shown}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: showCorrect ? 'wahr' : 'falsch',
        hint: `Rechne ${n} + ${n} und vergleiche.`,
        explanation: showCorrect
          ? `Ja, das Doppelte von ${n} ist ${correct}.`
          : `Nein, das Doppelte von ${n} ist ${correct}, nicht ${shown}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    // variant === 3: multiple-choice — Verdoppeln or Halbieren
    const doDouble = randInt(0, 1) === 0;
    const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
    if (doDouble) {
      const n = randInt(1, max);
      const answer = n * 2;
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = answer + randInt(-3, 3);
        if (d !== answer && d > 0) wrong.add(d);
      }
      return {
        id: genId(),
        topicId: 'k1-verdoppeln-halbieren',
        question: `Wähle das Doppelte von ${n}!`,
        questionLatex: `${n} \\times 2 = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [...wrong],
        options: [String(answer), ...[...wrong].map(String)],
        hint: `Doppelt heißt: ${n} + ${n}.`,
        explanation: `Das Doppelte von ${n} ist ${n} + ${n} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    } else {
      const half = randInt(1, max);
      const n = half * 2;
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = half + randInt(-2, 3);
        if (d !== half && d > 0) wrong.add(d);
      }
      return {
        id: genId(),
        topicId: 'k1-verdoppeln-halbieren',
        question: `Wähle die Hälfte von ${n}!`,
        questionLatex: `${n} \\div 2 = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: half,
        distractors: [...wrong],
        options: [String(half), ...[...wrong].map(String)],
        hint: `Halbieren: In zwei gleiche Teile teilen. ${n} = ___ + ___`,
        explanation: `Die Hälfte von ${n} ist ${half}, denn ${half} + ${half} = ${n}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }
  },
};
