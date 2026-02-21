import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add20-${++counter}-${Date.now()}`; }

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-20',
  generate(difficulty = 1): Exercise {
    let a: number, b: number;

    switch (difficulty) {
      case 1:
        a = randInt(1, 9); b = randInt(1, 9 - a + 1);
        break;
      case 2:
        a = randInt(1, 14); b = randInt(1, Math.min(9, 20 - a));
        break;
      default:
        a = randInt(1, 19); b = 20 - a;
        break;
    }

    const answer = a + b;
    const distractors = [answer - 1, answer + 1, answer + 2].filter(
      (d) => d > 0 && d <= 20 && d !== answer
    );

    return {
      id: genId(),
      topicId: 'k1-addition-bis-20',
      question: `Wie viel ist ${a} + ${b}?`,
      questionLatex: `${a} + ${b} = ?`,
      answerType: 'number',
      correctAnswer: answer,
      distractors,
      hint: `Zähle von ${a} noch ${b} weiter.`,
      explanation: `${a} + ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      visualConfig: { type: 'base10-blocks' as const, props: { tens: Math.floor(a / 10), ones: a % 10 } },
    };
  },
};
