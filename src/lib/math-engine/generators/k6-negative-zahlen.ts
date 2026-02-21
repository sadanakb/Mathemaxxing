import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function signedStr(n: number): string {
  return n >= 0 ? `${n}` : `(${n})`;
}

export const template: ExerciseTemplate = {
  topicId: 'k6-negative-zahlen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Negative + positive, result can be negative or positive
      const a = -randInt(1, 10);
      const b = randInt(1, 15);
      const answer = a + b;
      return {
        id: genId('k6-neg'),
        topicId: 'k6-negative-zahlen',
        question: `${a} + ${b} = ?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Starte bei ${a} auf dem Zahlenstrahl und gehe ${b} Schritte nach rechts.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
        visualConfig: { type: 'thermometer' as const, props: { temperature: a, min: -20, max: 20 } },
      };
    } else if (difficulty === 2) {
      // Various operations with negatives
      const ops = ['+', '-'];
      const op = ops[randInt(0, 1)];
      const a = randInt(-10, 10);
      const b = randInt(1, 10);
      const answer = op === '+' ? a + b : a - b;
      return {
        id: genId('k6-neg'),
        topicId: 'k6-negative-zahlen',
        question: `${signedStr(a)} ${op} ${b} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: op === '+' ? `Auf dem Zahlenstrahl: von ${a} um ${b} nach rechts.` : `Auf dem Zahlenstrahl: von ${a} um ${b} nach links.`,
        explanation: `${signedStr(a)} ${op} ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
        visualConfig: { type: 'thermometer' as const, props: { temperature: a, min: -20, max: 20 } },
      };
    } else {
      // Negative × negative or negative × positive
      const a = -randInt(1, 9);
      const b = randInt(-9, 9);
      const answer = a * b;
      return {
        id: genId('k6-neg'),
        topicId: 'k6-negative-zahlen',
        question: `${a} × ${signedStr(b)} = ?`,
        questionLatex: `${a} \\times ${signedStr(b)} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: b < 0 ? 'Minus × Minus = Plus' : 'Minus × Plus = Minus',
        explanation: `${a} × ${signedStr(b)} = ${answer}. ${b < 0 ? '(−) × (−) = (+)' : '(−) × (+) = (−)'}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }
  },
};
