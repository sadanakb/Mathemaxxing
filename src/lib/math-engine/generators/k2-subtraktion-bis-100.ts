import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-sub100-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-subtraktion-bis-100',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Without borrowing: ones of a >= ones of b
      let a: number, b: number;
      do {
        a = randInt(20, 99);
        b = randInt(10, a - 1);
      } while ((a % 10) < (b % 10)); // no borrowing
      const answer = a - b;

      return {
        id: genId(),
        topicId: 'k2-subtraktion-bis-100',
        question: `${a} - ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + 10].filter(d => d >= 0 && d !== answer).slice(0, 3),
        hint: `Ziehe erst die Zehner ab, dann die Einer.`,
        explanation: `${a} - ${b} = ${answer}. Zehner: ${Math.floor(a / 10) * 10} - ${Math.floor(b / 10) * 10} = ${(Math.floor(a / 10) - Math.floor(b / 10)) * 10}. Einer: ${a % 10} - ${b % 10} = ${(a % 10) - (b % 10)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (difficulty === 2) {
      // With borrowing: ones of a < ones of b
      let a: number, b: number;
      do {
        a = randInt(21, 99);
        b = randInt(3, a - 1);
      } while ((a % 10) >= (b % 10) || b < 10); // force borrowing
      const answer = a - b;
      const onesB = b % 10;
      const aOnes = a % 10;
      const toZero = aOnes;

      return {
        id: genId(),
        topicId: 'k2-subtraktion-bis-100',
        question: `${a} - ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + 10, answer - 10].filter(d => d >= 0 && d !== answer).slice(0, 3),
        hint: `Hier musst du entbündeln: Erst -${toZero} bis zum Zehner (${a - toZero}), dann noch -${onesB - toZero} weiter.`,
        explanation: `${a} - ${b} = ${answer}. Über den Zehner: ${a} - ${toZero} = ${a - toZero}, dann - ${onesB - toZero} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: More complex subtraction or missing subtrahend
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Subtraction from close to 100
      const a = randInt(70, 100);
      const b = randInt(25, a - 5);
      const answer = a - b;

      return {
        id: genId(),
        topicId: 'k2-subtraktion-bis-100',
        question: `${a} - ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + 10].filter(d => d >= 0 && d !== answer).slice(0, 3),
        hint: `Rechne schrittweise: erst die Zehner, dann die Einer.`,
        explanation: `${a} - ${b} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    // Missing subtrahend
    const a = randInt(40, 95);
    const answer = randInt(5, a - 10);
    const b = a - answer;

    return {
      id: genId(),
      topicId: 'k2-subtraktion-bis-100',
      question: `${a} - ? = ${answer}`,
      questionLatex: `${a} - \\square = ${answer}`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: b,
      distractors: [b + 1, b - 1, b + 10].filter(d => d > 0 && d !== b).slice(0, 3),
      hint: `Was musst du von ${a} abziehen, um ${answer} zu erhalten? Rechne ${a} - ${answer}.`,
      explanation: `${a} - ${b} = ${answer}. Die fehlende Zahl ist ${b}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  },
};
