import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add20o-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-20-ohne-uebergang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 1);

    // No crossing the ten: ones digit of a + b < 10
    // a is a teen number (10..19), b is small enough that (a%10)+b < 10
    let a: number, b: number;
    switch (difficulty) {
      case 1:
        a = randInt(10, 14);
        b = randInt(1, Math.min(5, 9 - (a % 10)));
        break;
      case 2:
        a = randInt(10, 16);
        b = randInt(1, Math.min(7, 9 - (a % 10)));
        break;
      default:
        a = randInt(10, 18);
        b = randInt(1, Math.min(9, 9 - (a % 10)));
        break;
    }
    // Ensure b >= 1
    if (b < 1) b = 1;
    const answer = a + b;

    if (variant === 0) {
      // number-input
      return {
        id: genId(),
        topicId: 'k1-addition-bis-20-ohne-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 10].filter(d => d > 0 && d <= 20 && d !== answer),
        hint: `Die Zehner bleiben gleich. Rechne nur die Einer: ${a % 10} + ${b} = ${(a % 10) + b}.`,
        explanation: `${a} + ${b} = ${answer}. Der Zehner bleibt bei ${Math.floor(a / 10) * 10}, die Einer ergeben ${(a % 10) + b}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    // multiple-choice
    const wrong = new Set<number>();
    while (wrong.size < 3) {
      const d = answer + randInt(-2, 3);
      if (d !== answer && d > 0 && d <= 20) wrong.add(d);
    }

    return {
      id: genId(),
      topicId: 'k1-addition-bis-20-ohne-uebergang',
      question: `Wie viel ist ${a} + ${b}?`,
      questionLatex: `${a} + ${b} = ?`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: answer,
      distractors: [...wrong],
      options: [String(answer), ...[...wrong].map(String)],
      hint: `Die Zehner bleiben gleich. Rechne nur die Einer.`,
      explanation: `${a} + ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 12,
    };
  },
};
