import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-addue-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Ensure the addition has a tens-crossing (Zehneruebergang). */
function genWithCarry(aMin: number, aMax: number, bMax: number): { a: number; b: number } {
  let a: number, b: number;
  do {
    a = randInt(aMin, aMax);
    b = randInt(2, bMax);
  } while ((a % 10) + (b % 10) < 10 || a + b > 100);
  return { a, b };
}

export const template: ExerciseTemplate = {
  topicId: 'k2-addition-mit-uebergang',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Single-digit addend with carry
      const { a, b } = genWithCarry(12, 89, 9);
      const answer = a + b;
      const onesA = a % 10;
      const toNext10 = 10 - onesA;

      return {
        id: genId(),
        topicId: 'k2-addition-mit-uebergang',
        question: `${a} + ${b} = ?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 10].filter(d => d >= 0 && d <= 100 && d !== answer).slice(0, 3),
        hint: `Zerlege ${b}: Erst +${toNext10} bis zum nächsten Zehner (${a + toNext10}), dann den Rest (+${b - toNext10}).`,
        explanation: `${a} + ${toNext10} = ${a + toNext10}, dann + ${b - toNext10} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (difficulty === 2) {
      // Two-digit addend with carry
      const { a, b } = genWithCarry(15, 70, 30);
      const answer = a + b;
      const tensB = Math.floor(b / 10) * 10;
      const onesB = b % 10;

      return {
        id: genId(),
        topicId: 'k2-addition-mit-uebergang',
        question: `${a} + ${b} = ?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer - 10, answer + 10].filter(d => d >= 0 && d <= 100 && d !== answer).slice(0, 3),
        hint: `Zerlege ${b} in ${tensB} und ${onesB}. Rechne erst ${a} + ${tensB}, dann + ${onesB}.`,
        explanation: `${a} + ${tensB} = ${a + tensB}, dann + ${onesB} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: Three numbers with carries
    let a: number, b: number, c: number;
    do {
      a = randInt(10, 50);
      b = randInt(5, 25);
      c = randInt(5, 25);
    } while (a + b + c > 100 || ((a % 10) + (b % 10) < 10 && (b % 10) + (c % 10) < 10));
    const answer = a + b + c;

    return {
      id: genId(),
      topicId: 'k2-addition-mit-uebergang',
      question: `${a} + ${b} + ${c} = ?`,
      questionLatex: `${a} + ${b} + ${c} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      distractors: [answer - 1, answer + 1, answer - 10].filter(d => d >= 0 && d <= 100 && d !== answer).slice(0, 3),
      hint: `Rechne schrittweise: Erst ${a} + ${b} = ${a + b}, dann + ${c}.`,
      explanation: `${a} + ${b} = ${a + b}, dann ${a + b} + ${c} = ${answer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  },
};
