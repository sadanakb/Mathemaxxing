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

    // Difficulty 3: variant 0 = speed-quiz Multiplikation, 1 = speed-quiz Division, 2 = memory-pairs
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    const product = a * b;
    const variant3 = randInt(0, 2);

    if (variant3 === 2) {
      // memory-pairs: match multiplication equations to their products
      const pairCount = 3;
      const pairs: [string, string][] = [];
      const usedProducts = new Set<number>();
      let attempts = 0;
      while (pairs.length < pairCount && attempts < 30) {
        attempts++;
        const pa = randInt(2, 9);
        const pb = randInt(2, 10);
        const prod = pa * pb;
        if (!usedProducts.has(prod)) {
          usedProducts.add(prod);
          pairs.push([`${pa} × ${pb}`, `${prod}`]);
        }
      }
      return {
        id: genId('k3-1x1m'),
        topicId: 'k3-einmaleins-meister',
        question: 'Memory: Ordne jede Aufgabe ihrem Ergebnis zu.',
        answerType: 'matching',
        exerciseType: 'memory-pairs',
        correctAnswer: pairs.map(p => `${p[0]}→${p[1]}`).join('; '),
        pairs,
        hint: 'Berechne jede Aufgabe und suche das passende Ergebnis.',
        explanation: pairs.map(p => `${p[0]} = ${p[1]}`).join(', '),
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    if (variant3 === 1) {
      // speed-quiz Division (Umkehraufgabe)
      return {
        id: genId('k3-1x1m'),
        topicId: 'k3-einmaleins-meister',
        question: `Schnell! ${product} ÷ ${a} = ?`,
        questionLatex: `${product} \\div ${a} = ?`,
        answerType: 'number',
        exerciseType: 'speed-quiz',
        correctAnswer: b,
        timeLimit: 8,
        hint: `${a} mal was ergibt ${product}?`,
        explanation: `${product} ÷ ${a} = ${b}, weil ${a} × ${b} = ${product}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    // variant3 === 0: speed-quiz Multiplikation
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
