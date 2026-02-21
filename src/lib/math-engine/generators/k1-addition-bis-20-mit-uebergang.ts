import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add20m-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-20-mit-uebergang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    // Crossing the ten: a + b > 10, both a and b are single-digit or a is near 10
    let a: number, b: number;
    switch (difficulty) {
      case 1:
        // Easy crossings: 9+2, 8+3, 7+4 etc.
        a = randInt(6, 9);
        b = randInt(10 - a + 1, Math.min(9, 20 - a));
        break;
      case 2:
        a = randInt(5, 9);
        b = randInt(10 - a + 1, Math.min(9, 20 - a));
        break;
      default:
        a = randInt(3, 9);
        b = randInt(10 - a + 1, Math.min(9, 20 - a));
        break;
    }
    const answer = a + b;
    const fillTo10 = 10 - a;
    const remainder = b - fillTo10;

    if (variant === 0) {
      // number-input with decomposition hint
      return {
        id: genId(),
        topicId: 'k1-addition-bis-20-mit-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, 10].filter(d => d > 0 && d <= 20 && d !== answer),
        hint: `Zerlege ${b} in ${fillTo10} und ${remainder}. Erst ${a} + ${fillTo10} = 10, dann 10 + ${remainder} = ${answer}.`,
        explanation: `${a} + ${b} = ${answer}. Strategie: ${a} + ${fillTo10} = 10, dann 10 + ${remainder} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (variant === 1) {
      // multiple-choice
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = answer + randInt(-2, 3);
        if (d !== answer && d > 0 && d <= 20) wrong.add(d);
      }

      return {
        id: genId(),
        topicId: 'k1-addition-bis-20-mit-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [...wrong],
        options: [String(answer), ...[...wrong].map(String)],
        hint: `Zerlege ${b} in ${fillTo10} und ${remainder}. Erst ${a} + ${fillTo10} = 10, dann + ${remainder}.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    // true-false: "Ist 8 + 5 = 14?"
    const wrongAnswer = answer + (randInt(0, 1) === 0 ? 1 : -1);
    const showCorrect = randInt(0, 1) === 0;
    const shownAnswer = showCorrect ? answer : wrongAnswer;

    return {
      id: genId(),
      topicId: 'k1-addition-bis-20-mit-uebergang',
      question: `Stimmt das? ${a} + ${b} = ${shownAnswer}`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: showCorrect ? 'wahr' : 'falsch',
      hint: `Rechne ${a} + ${b} selbst aus. Zerlege ${b} in ${fillTo10} und ${remainder}.`,
      explanation: showCorrect
        ? `Ja, ${a} + ${b} = ${answer} ist richtig.`
        : `Nein, ${a} + ${b} = ${answer}, nicht ${shownAnswer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
