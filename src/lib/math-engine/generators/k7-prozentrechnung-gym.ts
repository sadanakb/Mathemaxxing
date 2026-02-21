import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-prozentrechnung-gym',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple: X% of Y where result is integer
      const percents = [10, 20, 25, 50];
      const p = percents[randInt(0, percents.length - 1)];
      const multiplier = randInt(2, 10);
      const base = (100 / p) * multiplier; // ensures integer result
      const answer = (p / 100) * base;
      return {
        id: genId('k7-proz'),
        topicId: 'k7-prozentrechnung-gym',
        question: `${p}% von ${base} = ?`,
        questionLatex: `${p}\\% \\text{ von } ${base} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `${p}% = ${p}/100. Rechne: ${base} × ${p} ÷ 100`,
        explanation: `${p}% von ${base} = ${base} × ${p}/100 = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    } else if (difficulty === 2) {
      // Find percentage: "X is what % of Y?"
      const total = randInt(50, 200);
      const part = randInt(1, total / 2) * (randInt(0, 1) === 0 ? 1 : 2);
      const percent = Math.round((part / total) * 100);
      const cleanPart = (percent / 100) * total;
      return {
        id: genId('k7-proz'),
        topicId: 'k7-prozentrechnung-gym',
        question: `${cleanPart} von ${total} – wie viel Prozent sind das?`,
        answerType: 'number',
        correctAnswer: percent,
        hint: `Prozentsatz = (Teil ÷ Ganzes) × 100`,
        explanation: `(${cleanPart} ÷ ${total}) × 100 = ${percent}%`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    } else {
      // Find base: "X% of what = Y?"
      const p = [10, 20, 25, 50][randInt(0, 3)];
      const answer = randInt(2, 20) * (100 / p);
      const part = (p / 100) * answer;
      return {
        id: genId('k7-proz'),
        topicId: 'k7-prozentrechnung-gym',
        question: `${p}% von einer Zahl ergibt ${part}. Wie groß ist die Zahl?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Grundwert = Teil ÷ Prozentsatz × 100 = ${part} ÷ ${p} × 100`,
        explanation: `${part} ÷ ${p} × 100 = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    }
  },
};
