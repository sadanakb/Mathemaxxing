import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-gleich-real-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-gleichungen-real',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einfache Gleichung: ax + b = c
      const x = randInt(-10, 10);
      const a = randInt(2, 8);
      const b = randInt(-15, 15);
      const c = a * x + b;

      return {
        id: genId(),
        topicId: 'k7-gleichungen-real',
        question: `L\u00f6se die Gleichung: ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`,
        answerType: 'number',
        correctAnswer: x,
        hint: `Bringe ${b >= 0 ? b : `(${b})`} auf die andere Seite: ${a}x = ${c} ${b >= 0 ? '-' : '+'} ${Math.abs(b)} = ${c - b}. Dann teile durch ${a}.`,
        explanation: `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c} | ${b >= 0 ? `-${b}` : `+${Math.abs(b)}`}\n${a}x = ${c - b} | :${a}\nx = ${x}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    } else if (d === 2) {
      // Gleichung mit x auf beiden Seiten: ax + b = cx + d
      const x = randInt(-8, 8);
      const a = randInt(3, 9);
      const cCoeff = randInt(1, a - 1);
      const b = randInt(-10, 10);
      const dVal = a * x + b - cCoeff * x;

      return {
        id: genId(),
        topicId: 'k7-gleichungen-real',
        question: `L\u00f6se: ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${cCoeff}x ${dVal >= 0 ? '+' : '-'} ${Math.abs(dVal)}`,
        answerType: 'number',
        correctAnswer: x,
        hint: `Bringe alle x-Terme auf eine Seite und alle Zahlen auf die andere: ${a}x - ${cCoeff}x = ${dVal} ${b >= 0 ? `-${b}` : `+${Math.abs(b)}`}`,
        explanation: `${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${cCoeff}x ${dVal >= 0 ? '+' : '-'} ${Math.abs(dVal)} | -${cCoeff}x ${b >= 0 ? `-${b}` : `+${Math.abs(b)}`}\n${a - cCoeff}x = ${dVal - b} | :${a - cCoeff}\nx = ${x}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    } else {
      // Gleichung mit Klammern: a(x + b) = c
      const x = randInt(-8, 8);
      const a = randInt(2, 6);
      const b = randInt(-8, 8);
      const c = a * (x + b);
      const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

      return {
        id: genId(),
        topicId: 'k7-gleichungen-real',
        question: `L\u00f6se: ${a}(x ${bStr}) = ${c}`,
        answerType: 'number',
        correctAnswer: x,
        hint: `L\u00f6sung 1: Erst Klammer aufl\u00f6sen: ${a}x ${a * b >= 0 ? '+' : '-'} ${Math.abs(a * b)} = ${c}.\nL\u00f6sung 2: Beide Seiten durch ${a} teilen: x ${bStr} = ${c / a}.`,
        explanation: `${a}(x ${bStr}) = ${c} | :${a}\nx ${bStr} = ${c / a} | ${b >= 0 ? `-${b}` : `+${Math.abs(b)}`}\nx = ${x}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    }
  },
};
