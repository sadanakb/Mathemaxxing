import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-lineare-gleichungen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // x + b = c  or  x - b = c
      const x = randInt(1, 20);
      const b = randInt(1, 15);
      const isAdd = randInt(0, 1) === 0;
      const c = isAdd ? x + b : x - b;
      const question = isAdd ? `x + ${b} = ${c}` : `x - ${b} = ${c}`;
      const hint = isAdd ? `Ziehe ${b} von beiden Seiten ab.` : `Addiere ${b} auf beiden Seiten.`;
      const explanation = isAdd ? `x = ${c} - ${b} = ${x}` : `x = ${c} + ${b} = ${x}`;
      return {
        id: genId('k7-gleich'),
        topicId: 'k7-lineare-gleichungen',
        question: `${question}, x = ?`,
        questionLatex: `${question},\\quad x = ?`,
        answerType: 'number',
        correctAnswer: x,
        hint,
        explanation,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    } else if (difficulty === 2) {
      // ax + b = c
      const a = randInt(2, 5);
      const x = randInt(1, 10);
      const b = randInt(1, 20);
      const c = a * x + b;
      return {
        id: genId('k7-gleich'),
        topicId: 'k7-lineare-gleichungen',
        question: `${a}x + ${b} = ${c}, x = ?`,
        questionLatex: `${a}x + ${b} = ${c},\\quad x = ?`,
        answerType: 'number',
        correctAnswer: x,
        hint: `Subtrahiere ${b} auf beiden Seiten, dann teile durch ${a}.`,
        explanation: `${a}x = ${c} - ${b} = ${c - b} → x = ${c - b} ÷ ${a} = ${x}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    } else {
      // ax + b = cx + d (variables on both sides)
      const x = randInt(1, 10);
      const a = randInt(3, 7);
      const c = randInt(1, a - 1);
      const b = randInt(1, 10);
      const d = (a - c) * x + b;
      return {
        id: genId('k7-gleich'),
        topicId: 'k7-lineare-gleichungen',
        question: `${a}x + ${b} = ${c}x + ${d}, x = ?`,
        questionLatex: `${a}x + ${b} = ${c}x + ${d},\\quad x = ?`,
        answerType: 'number',
        correctAnswer: x,
        hint: `Bringe alle x auf eine Seite: ${a}x - ${c}x = ${d} - ${b}.`,
        explanation: `${a - c}x = ${d - b} → x = ${d - b} ÷ ${a - c} = ${x}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
