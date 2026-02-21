import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function toGermanDecimal(n: number, decimals = 1): string {
  return n.toFixed(decimals).replace('.', ',');
}

export const template: ExerciseTemplate = {
  topicId: 'k5-dezimalzahlen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // One decimal place addition
      const a = randInt(1, 9) + randInt(1, 9) / 10;
      const b = randInt(1, 9) + randInt(1, 9) / 10;
      const answer = Math.round((a + b) * 10) / 10;
      return {
        id: genId('k5-dez'),
        topicId: 'k5-dezimalzahlen',
        question: `${toGermanDecimal(a)} + ${toGermanDecimal(b)} = ?`,
        questionLatex: `${toGermanDecimal(a)} + ${toGermanDecimal(b)} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: 'Addiere zuerst die Vorkommastellen, dann die Nachkommastellen.',
        explanation: `${toGermanDecimal(a)} + ${toGermanDecimal(b)} = ${toGermanDecimal(answer)}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    } else if (difficulty === 2) {
      // One decimal place subtraction
      const isAdd = randInt(0, 1) === 0;
      const a = randInt(5, 20) + randInt(0, 9) / 10;
      const bBase = randInt(1, Math.floor(a));
      const b = bBase + randInt(0, 9) / 10;
      const safeB = b > a ? b - Math.floor(b - a) - 0.1 : b;
      const answer = isAdd
        ? Math.round((a + safeB) * 10) / 10
        : Math.round((a - safeB) * 10) / 10;
      const op = isAdd ? '+' : '-';
      const operand = isAdd ? safeB : safeB;
      return {
        id: genId('k5-dez'),
        topicId: 'k5-dezimalzahlen',
        question: `${toGermanDecimal(a)} ${op} ${toGermanDecimal(operand)} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: 'Komma unter Komma stellen und schriftlich rechnen.',
        explanation: `${toGermanDecimal(a)} ${op} ${toGermanDecimal(operand)} = ${toGermanDecimal(answer)}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    } else {
      // Two decimal places multiplication by whole number
      const a = randInt(1, 9) + randInt(1, 99) / 100;
      const b = randInt(2, 9);
      const answer = Math.round(a * b * 100) / 100;
      return {
        id: genId('k5-dez'),
        topicId: 'k5-dezimalzahlen',
        question: `${toGermanDecimal(a, 2)} × ${b} = ?`,
        questionLatex: `${toGermanDecimal(a, 2)} \\times ${b} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Rechne zuerst ohne Komma: ${Math.round(a * 100)} × ${b}, dann setze das Komma.`,
        explanation: `${toGermanDecimal(a, 2)} × ${b} = ${toGermanDecimal(answer, 2)}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    }
  },
};
