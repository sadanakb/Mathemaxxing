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
      const variant = randInt(0, 2);

      if (variant === 1) {
        // drag-sort: order 4 products of the chosen table smallest to largest
        const factors = [randInt(1, 4), randInt(5, 7), randInt(8, 9), 10];
        const products = factors.map(f => table * f);
        const sorted = [...products].sort((a, b) => a - b);
        const shuffled = [...sorted].sort(() => Math.random() - 0.5);

        return {
          id: genId(),
          topicId: 'k2-einmaleins-2-5-10',
          question: `Ordne die Ergebnisse der ${table}er-Reihe von klein nach groß!`,
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          correctAnswer: sorted.join(', '),
          items: shuffled.map(String),
          hint: `Zähle in ${table}er-Schritten, um die richtige Reihenfolge zu finden.`,
          explanation: `Die ${table}er-Reihe in Ordnung: ${sorted.join(', ')}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      if (variant === 2) {
        // true-false: is 5×7=35?
        const f1 = randInt(1, 10);
        const correctProduct = table * f1;
        const showCorrect = randInt(0, 1) === 0;
        const shownProduct = showCorrect ? correctProduct : correctProduct + table * randInt(1, 3);
        return {
          id: genId(),
          topicId: 'k2-einmaleins-2-5-10',
          question: `Stimmt das? ${table} × ${f1} = ${shownProduct}`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: showCorrect ? 'wahr' : 'falsch',
          hint: `Zähle in ${table}er-Schritten: ${Array.from({ length: Math.min(f1, 5) }, (_, i) => table * (i + 1)).join(', ')} …`,
          explanation: showCorrect
            ? `Ja! ${table} × ${f1} = ${correctProduct}.`
            : `Nein! ${table} × ${f1} = ${correctProduct}, nicht ${shownProduct}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 10,
        };
      }

      // Multiple-choice: basic multiplication (variant 0 — original)
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
