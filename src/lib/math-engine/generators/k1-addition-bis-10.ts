import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add10-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-10',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 1);

    // Generate numbers so that a + b <= 10
    let a: number, b: number;
    switch (difficulty) {
      case 1:
        a = randInt(1, 5); b = randInt(1, 5 - a + 1);
        break;
      case 2:
        a = randInt(1, 7); b = randInt(1, Math.min(7, 10 - a));
        break;
      default:
        a = randInt(1, 9); b = randInt(1, 10 - a);
        break;
    }
    const answer = a + b;

    if (variant === 0) {
      // number-input
      return {
        id: genId(),
        topicId: 'k1-addition-bis-10',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 2].filter(d => d > 0 && d <= 10 && d !== answer),
        hint: `Zähle von ${a} noch ${b} weiter.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
        visualConfig: { type: 'base10-blocks' as const, props: { ones: a } },
      };
    }

    // multiple-choice
    const wrong = new Set<number>();
    while (wrong.size < 3) {
      const d = answer + randInt(-2, 2);
      if (d !== answer && d >= 0 && d <= 10) wrong.add(d);
    }

    return {
      id: genId(),
      topicId: 'k1-addition-bis-10',
      question: `Wie viel ist ${a} + ${b}?`,
      questionLatex: `${a} + ${b} = ?`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: answer,
      distractors: [...wrong],
      options: [String(answer), ...[...wrong].map(String)],
      hint: `Zähle von ${a} noch ${b} weiter.`,
      explanation: `${a} + ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  },
};
