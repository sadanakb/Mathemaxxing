import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k3-einmaleins-vertiefen',
  generate(difficulty = 1): Exercise {
    let divisor: number, quotient: number;

    if (difficulty === 1) {
      divisor = randInt(2, 5);
      quotient = randInt(1, 10);
    } else if (difficulty === 2) {
      divisor = randInt(2, 9);
      quotient = randInt(2, 10);
    } else {
      divisor = randInt(6, 10);
      quotient = randInt(6, 10);
    }

    const dividend = divisor * quotient;

    const distractors = [quotient - 1, quotient + 1, quotient + 2]
      .filter(d => d > 0 && d !== quotient)
      .slice(0, 3);

    return {
      id: genId('k3-div'),
      topicId: 'k3-einmaleins-vertiefen',
      question: `${dividend} ÷ ${divisor} = ?`,
      questionLatex: `${dividend} \\div ${divisor} = ?`,
      answerType: 'number',
      correctAnswer: quotient,
      distractors,
      hint: `Frage: ${divisor} mal was ergibt ${dividend}?`,
      explanation: `${dividend} ÷ ${divisor} = ${quotient}, weil ${divisor} × ${quotient} = ${dividend}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 15 : difficulty === 2 ? 20 : 25,
    };
  },
};
