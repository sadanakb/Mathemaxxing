import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-mal34-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TABLES = [3, 4];

export const template: ExerciseTemplate = {
  topicId: 'k2-einmaleins-3-4',
  generate(difficulty = 1): Exercise {
    const table = TABLES[randInt(0, TABLES.length - 1)];
    const factor = randInt(1, 10);
    const answer = table * factor;

    if (difficulty === 1) {
      // Number-input: basic multiplication
      const distractors = [answer + table, answer - table, answer + 1]
        .filter(d => d > 0 && d !== answer)
        .slice(0, 3);

      return {
        id: genId(),
        topicId: 'k2-einmaleins-3-4',
        question: `Was ist ${table} x ${factor}?`,
        questionLatex: `${table} \\times ${factor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors,
        hint: `Zähle in ${table}er-Schritten: ${Array.from({ length: factor }, (_, i) => table * (i + 1)).join(', ')}.`,
        explanation: `${table} x ${factor} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    if (difficulty === 2) {
      // Multiple-choice: mixed 3 and 4 table
      const otherTable = table === 3 ? 4 : 3;
      const distractors = [
        otherTable * factor,
        answer + table,
        answer - table,
      ].filter(d => d > 0 && d !== answer).slice(0, 3);

      const allOptions = [answer, ...distractors].sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-einmaleins-3-4',
        question: `${table} x ${factor} = ?`,
        questionLatex: `${table} \\times ${factor} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors,
        options: allOptions.map(String),
        correctOptions: [String(answer)],
        hint: `Die ${table}er-Reihe: ${Array.from({ length: 10 }, (_, i) => table * (i + 1)).join(', ')}.`,
        explanation: `${table} x ${factor} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    // Difficulty 3: Speed-quiz with missing factor
    return {
      id: genId(),
      topicId: 'k2-einmaleins-3-4',
      question: `Schnell! ? x ${table} = ${answer}`,
      questionLatex: `\\square \\times ${table} = ${answer}`,
      answerType: 'number',
      exerciseType: 'speed-quiz',
      correctAnswer: factor,
      timeLimit: 10,
      distractors: [factor + 1, factor - 1, factor + 2].filter(d => d > 0 && d <= 10 && d !== factor).slice(0, 3),
      hint: `Wie oft passt ${table} in ${answer}? Denke an die ${table}er-Reihe.`,
      explanation: `${factor} x ${table} = ${answer}. Die fehlende Zahl ist ${factor}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  },
};
