import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-schriftliche-division',
  generate(difficulty = 1): Exercise {
    let divisor: number, quotient: number, dividend: number, remainder: number;

    if (difficulty === 1) {
      // No remainder, small dividend
      divisor = randInt(2, 5);
      quotient = randInt(10, 30);
      dividend = divisor * quotient;
      remainder = 0;
    } else if (difficulty === 2) {
      // With remainder, medium dividend
      divisor = randInt(3, 7);
      quotient = randInt(20, 80);
      remainder = randInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
    } else {
      // With remainder, large dividend
      divisor = randInt(6, 9);
      quotient = randInt(80, 200);
      remainder = randInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
    }

    const questionText = remainder === 0
      ? `${dividend} ÷ ${divisor} = ?`
      : `${dividend} ÷ ${divisor} = ? (mit Rest)`;

    const answerVal = quotient;
    const explanationText = remainder === 0
      ? `${dividend} ÷ ${divisor} = ${quotient}`
      : `${dividend} ÷ ${divisor} = ${quotient} Rest ${remainder} (da ${divisor} × ${quotient} = ${divisor * quotient} und ${divisor * quotient} + ${remainder} = ${dividend})`;

    return {
      id: genId('k4-div'),
      topicId: 'k4-schriftliche-division',
      question: questionText,
      questionLatex: `${dividend} \\div ${divisor} = ?`,
      answerType: 'number',
      correctAnswer: answerVal,
      hint: `Wie oft passt ${divisor} in ${dividend}? Schriftliche Division: von links nach rechts.`,
      explanation: explanationText,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 40 : difficulty === 2 ? 60 : 90,
    };
  },
};
