import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k3-schriftliche-addition',
  generate(difficulty = 1): Exercise {
    let a: number, b: number;

    if (difficulty === 1) {
      // No carrying needed: tens + tens <= 100
      const tensA = randInt(1, 4);
      const tensB = randInt(1, 9 - tensA);
      const onesA = randInt(0, 4);
      const onesB = randInt(0, 9 - onesA);
      a = tensA * 10 + onesA;
      b = tensB * 10 + onesB;
    } else if (difficulty === 2) {
      // With carrying, up to 999
      a = randInt(100, 499);
      b = randInt(100, 1000 - a);
    } else {
      // Three summands, up to 1000
      a = randInt(100, 400);
      b = randInt(100, 400);
      const c = randInt(10, 1000 - a - b);
      const answer = a + b + c;
      return {
        id: genId('k3-sadd'),
        topicId: 'k3-schriftliche-addition',
        question: `Berechne schriftlich: ${a} + ${b} + ${c} = ?`,
        questionLatex: `${a} + ${b} + ${c} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Addiere zuerst ${a} + ${b}, dann addiere ${c} zum Ergebnis.`,
        explanation: `${a} + ${b} = ${a + b}, dann + ${c} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }

    const answer = a + b;
    return {
      id: genId('k3-sadd'),
      topicId: 'k3-schriftliche-addition',
      question: `Berechne schriftlich: ${a} + ${b} = ?`,
      questionLatex: `${a} + ${b} = ?`,
      answerType: 'number',
      correctAnswer: answer,
      hint: 'Schreibe die Zahlen untereinander und addiere spaltenweise von rechts nach links.',
      explanation: `${a} + ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 30 : 45,
    };
  },
};
