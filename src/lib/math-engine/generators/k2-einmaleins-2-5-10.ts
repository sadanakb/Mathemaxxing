import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-mal2510-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TABLES = [2, 5, 10];

export const template: ExerciseTemplate = {
  topicId: 'k2-einmaleins-2-5-10',
  generate(difficulty = 1): Exercise {
    const table = TABLES[randInt(0, TABLES.length - 1)];
    const factor = randInt(1, 10);
    const answer = table * factor;

    if (difficulty === 1) {
      // Multiple-choice: basic multiplication
      const distractors = [answer + table, answer - table, answer + 1, answer - 1]
        .filter(d => d > 0 && d !== answer)
        .slice(0, 3);

      return {
        id: genId(),
        topicId: 'k2-einmaleins-2-5-10',
        question: `Was ist ${table} x ${factor}?`,
        questionLatex: `${table} \\times ${factor} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors,
        options: [answer, ...distractors].sort(() => Math.random() - 0.5).map(String),
        correctOptions: [String(answer)],
        hint: `${table} x ${factor} bedeutet: ${factor} mal die ${table}. Zähle in ${table}er-Schritten.`,
        explanation: `${table} x ${factor} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    if (difficulty === 2) {
      // Speed-quiz style: direct number input
      return {
        id: genId(),
        topicId: 'k2-einmaleins-2-5-10',
        question: `Schnell! ${table} x ${factor} = ?`,
        questionLatex: `${table} \\times ${factor} = ?`,
        answerType: 'number',
        exerciseType: 'speed-quiz',
        correctAnswer: answer,
        timeLimit: 8,
        hint: `Zähle in ${table}er-Schritten bis ${factor} Schritte.`,
        explanation: `${table} x ${factor} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 8,
      };
    }

    // Difficulty 3: Missing factor — "? x 5 = 30"
    return {
      id: genId(),
      topicId: 'k2-einmaleins-2-5-10',
      question: `? x ${table} = ${answer}`,
      questionLatex: `\\square \\times ${table} = ${answer}`,
      answerType: 'number',
      exerciseType: 'speed-quiz',
      correctAnswer: factor,
      timeLimit: 10,
      distractors: [factor + 1, factor - 1, factor + 2].filter(d => d > 0 && d <= 10 && d !== factor).slice(0, 3),
      hint: `Wie oft passt ${table} in ${answer}?`,
      explanation: `${factor} x ${table} = ${answer}. Die fehlende Zahl ist ${factor}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  },
};
