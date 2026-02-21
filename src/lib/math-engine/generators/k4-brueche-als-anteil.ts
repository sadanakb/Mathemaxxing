import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-brueche-als-anteil',
  generate(difficulty = 1): Exercise {
    let numerator: number, denominator: number, whole: number, answer: number;

    if (difficulty === 1) {
      // 1/2 or 1/4 of multiples
      denominator = randInt(0, 1) === 0 ? 2 : 4;
      numerator = 1;
      whole = randInt(1, 10) * denominator;
      answer = whole / denominator;
    } else if (difficulty === 2) {
      // 1/3 or 1/5 or 2/4
      const options = [[1, 3], [1, 5], [2, 4], [3, 4]];
      const [n, d] = options[randInt(0, options.length - 1)];
      numerator = n;
      denominator = d;
      whole = randInt(1, 8) * denominator;
      answer = (numerator * whole) / denominator;
    } else {
      // Larger fractions: 3/5, 2/3, 3/8
      const options = [[3, 5], [2, 3], [3, 8], [5, 6]];
      const [n, d] = options[randInt(0, options.length - 1)];
      numerator = n;
      denominator = d;
      whole = randInt(2, 6) * denominator;
      answer = (numerator * whole) / denominator;
    }

    return {
      id: genId('k4-bruch'),
      topicId: 'k4-brueche-als-anteil',
      question: `${numerator}/${denominator} von ${whole} = ?`,
      questionLatex: `\\frac{${numerator}}{${denominator}} \\text{ von } ${whole} = ?`,
      answerType: 'number',
      correctAnswer: answer,
      hint: `Teile ${whole} durch ${denominator}, dann multipliziere mit ${numerator}.`,
      explanation: `${whole} ÷ ${denominator} × ${numerator} = ${whole / denominator} × ${numerator} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45,
      visualConfig: {
        type: 'fraction-circle' as const,
        props: { total: denominator, filled: numerator, showLabel: true },
      },
    };
  },
};
