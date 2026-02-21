import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-einmaleins-meister — Einmaleins Meister (alle Reihen gemischt)
 *
 * Difficulty 1: Reihen 2–5, Speed-Quiz
 * Difficulty 2: Reihen 2–9, gemischt
 * Difficulty 3: Reihen 2–10 mit Umkehraufgaben (Division)
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-einmaleins-meister',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Speed-Quiz: kleine Reihen
      const a = randInt(2, 5);
      const b = randInt(2, 10);
      const answer = a * b;

      return {
        id: genId('k3-1x1m'),
        topicId: 'k3-einmaleins-meister',
        question: `Schnell! ${a} × ${b} = ?`,
        questionLatex: `${a} \\times ${b} = ?`,
        answerType: 'number',
        exerciseType: 'speed-quiz',
        correctAnswer: answer,
        timeLimit: 10,
        hint: `Denke an die ${a}-er Reihe.`,
        explanation: `${a} × ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 8,
      };
    }

    if (difficulty === 2) {
      // Alle Reihen gemischt, number-input
      const a = randInt(2, 9);
      const b = randInt(2, 10);
      const answer = a * b;

      // Manchmal als Speed-Quiz, manchmal als number-input
      const useSpeed = randInt(0, 1) === 0;
      return {
        id: genId('k3-1x1m'),
        topicId: 'k3-einmaleins-meister',
        question: useSpeed ? `Schnell! ${a} × ${b} = ?` : `Berechne: ${a} × ${b} = ?`,
        questionLatex: `${a} \\times ${b} = ?`,
        answerType: 'number',
        exerciseType: useSpeed ? 'speed-quiz' : 'number-input',
        correctAnswer: answer,
        timeLimit: useSpeed ? 10 : undefined,
        hint: `Denke an die ${a}-er Reihe.`,
        explanation: `${a} × ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: useSpeed ? 8 : 12,
      };
    }

    // Difficulty 3: gemischt Multiplikation und Division
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    const product = a * b;
    const useDivision = randInt(0, 1) === 0;

    if (useDivision) {
      return {
        id: genId('k3-1x1m'),
        topicId: 'k3-einmaleins-meister',
        question: `Schnell! ${product} ÷ ${a} = ?`,
        questionLatex: `${product} \\div ${a} = ?`,
        answerType: 'number',
        exerciseType: 'speed-quiz',
        correctAnswer: b,
        timeLimit: 10,
        hint: `${a} mal was ergibt ${product}?`,
        explanation: `${product} ÷ ${a} = ${b}, weil ${a} × ${b} = ${product}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    return {
      id: genId('k3-1x1m'),
      topicId: 'k3-einmaleins-meister',
      question: `Schnell! ${a} × ${b} = ?`,
      questionLatex: `${a} \\times ${b} = ?`,
      answerType: 'number',
      exerciseType: 'speed-quiz',
      correctAnswer: product,
      timeLimit: 10,
      hint: `Denke an die ${a}-er Reihe.`,
      explanation: `${a} × ${b} = ${product}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 8,
    };
  },
};
