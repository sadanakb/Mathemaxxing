import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-halbschriftliche-division — Halbschriftliche Division
 *
 * Difficulty 1: Zweistellig durch einstellig, ohne Rest
 * Difficulty 2: Zweistellig durch einstellig, mit Zahlenmaschine
 * Difficulty 3: Dreistellig durch einstellig
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-halbschriftliche-division',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      const divisor = randInt(2, 5);
      const quotient = randInt(10, 20);
      const dividend = divisor * quotient;
      const tens = Math.floor(quotient / 10) * 10;
      const ones = quotient - tens;

      return {
        id: genId('k3-hdiv'),
        topicId: 'k3-halbschriftliche-division',
        question: `Berechne halbschriftlich: ${dividend} ÷ ${divisor} = ?`,
        questionLatex: `${dividend} \\div ${divisor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: quotient,
        hint: `Zerlege: ${dividend} = ${tens * divisor} + ${ones * divisor}. Teile beide Teile durch ${divisor}.`,
        explanation: `${tens * divisor} ÷ ${divisor} = ${tens}, ${ones * divisor} ÷ ${divisor} = ${ones}. Zusammen: ${tens} + ${ones} = ${quotient}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (difficulty === 2) {
      // Zahlenmaschine
      const divisor = randInt(2, 9);
      const quotient = randInt(10, 30);
      const dividend = divisor * quotient;
      const hidden = (['input', 'output'] as const)[randInt(0, 1)];

      return {
        id: genId('k3-hdiv'),
        topicId: 'k3-halbschriftliche-division',
        question: hidden === 'output'
          ? `Zahlenmaschine: ${dividend} → ÷ ${divisor} → ?`
          : `Zahlenmaschine: ? → ÷ ${divisor} → ${quotient}`,
        answerType: 'number',
        exerciseType: 'number-machine',
        correctAnswer: hidden === 'output' ? quotient : dividend,
        machineConfig: {
          input: dividend,
          operation: `÷ ${divisor}`,
          output: quotient,
          hidden,
        },
        hint: hidden === 'output'
          ? `Teile ${dividend} durch ${divisor}.`
          : `Welche Zahl geteilt durch ${divisor} ergibt ${quotient}? Rechne ${quotient} × ${divisor}.`,
        explanation: `${dividend} ÷ ${divisor} = ${quotient}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: Dreistellig durch einstellig
    const divisor = randInt(2, 9);
    const quotient = randInt(50, 150);
    const dividend = divisor * quotient;
    const hundreds = Math.floor(quotient / 100) * 100;
    const rest = quotient - hundreds;

    return {
      id: genId('k3-hdiv'),
      topicId: 'k3-halbschriftliche-division',
      question: `Berechne halbschriftlich: ${dividend} ÷ ${divisor} = ?`,
      questionLatex: `${dividend} \\div ${divisor} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: quotient,
      hint: `Zerlege ${dividend} geschickt und teile die Teile einzeln durch ${divisor}.`,
      explanation: `${hundreds * divisor} ÷ ${divisor} = ${hundreds}, ${rest * divisor} ÷ ${divisor} = ${rest}. Zusammen: ${hundreds} + ${rest} = ${quotient}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
    };
  },
};
