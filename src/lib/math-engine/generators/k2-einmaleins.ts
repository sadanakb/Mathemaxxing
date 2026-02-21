import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k2-einmaleins',
  generate(difficulty = 1): Exercise {
    let a: number, b: number;

    if (difficulty === 1) {
      // Easy tables: 1, 2, 5, 10
      const easyTables = [1, 2, 5, 10];
      a = easyTables[randInt(0, easyTables.length - 1)];
      b = randInt(1, 10);
    } else if (difficulty === 2) {
      // Medium tables: 3, 4, 6
      const medTables = [3, 4, 6];
      a = medTables[randInt(0, medTables.length - 1)];
      b = randInt(1, 10);
    } else {
      // Hard tables: 7, 8, 9
      const hardTables = [7, 8, 9];
      a = hardTables[randInt(0, hardTables.length - 1)];
      b = randInt(1, 10);
    }

    const answer = a * b;
    const distractors = [answer - a, answer + a, answer + b, answer - b]
      .filter(d => d > 0 && d !== answer)
      .slice(0, 3);

    return {
      id: genId('k2-mal'),
      topicId: 'k2-einmaleins',
      question: `Was ist ${a} × ${b}?`,
      questionLatex: `${a} \\times ${b} = ?`,
      answerType: 'number',
      correctAnswer: answer,
      distractors,
      hint: `${a} × ${b} bedeutet: addiere ${a} genau ${b} Mal.`,
      explanation: `${a} × ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20,
    };
  },
};
