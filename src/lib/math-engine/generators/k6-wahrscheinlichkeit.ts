import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function fractionStr(n: number, d: number): string {
  const g = gcd(n, d);
  const sn = n / g;
  const sd = d / g;
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

export const template: ExerciseTemplate = {
  topicId: 'k6-wahrscheinlichkeit',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Coin flip
      return {
        id: genId('k6-wahr'),
        topicId: 'k6-wahrscheinlichkeit',
        question: 'Wie groß ist die Wahrscheinlichkeit, beim Münzwurf Kopf zu werfen?',
        answerType: 'fraction',
        correctAnswer: '1/2',
        correctAnswerLatex: '\\frac{1}{2}',
        hint: 'Es gibt 2 gleichwahrscheinliche Ergebnisse.',
        explanation: 'P(Kopf) = 1/2, da es 2 mögliche Ergebnisse gibt und 1 davon Kopf ist.',
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else if (difficulty === 2) {
      // Standard die
      const scenarios = [
        { event: 'eine gerade Zahl', favorable: 3, total: 6 },
        { event: 'eine Zahl größer als 4', favorable: 2, total: 6 },
        { event: 'eine 3 oder 5', favorable: 2, total: 6 },
        { event: 'eine Zahl kleiner als 3', favorable: 2, total: 6 },
        { event: 'eine ungerade Zahl', favorable: 3, total: 6 },
      ];
      const s = scenarios[randInt(0, scenarios.length - 1)];
      const answer = fractionStr(s.favorable, s.total);
      return {
        id: genId('k6-wahr'),
        topicId: 'k6-wahrscheinlichkeit',
        question: `Würfel: Wie groß ist P(${s.event})?`,
        answerType: 'fraction',
        correctAnswer: answer,
        correctAnswerLatex: `\\frac{${s.favorable}}{${s.total}}`,
        hint: `Ein Würfel hat ${s.total} Seiten. Wie viele davon sind „${s.event}"?`,
        explanation: `P(${s.event}) = ${s.favorable}/${s.total} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    } else {
      // Colored balls in a bag
      const red = randInt(1, 4);
      const blue = randInt(1, 4);
      const green = randInt(1, 4);
      const total = red + blue + green;
      const colorChoice = randInt(0, 2);
      const [color, favorable] = colorChoice === 0
        ? ['rot', red]
        : colorChoice === 1
        ? ['blau', blue]
        : ['grün', green];
      const answer = fractionStr(favorable, total);
      return {
        id: genId('k6-wahr'),
        topicId: 'k6-wahrscheinlichkeit',
        question: `In einem Beutel sind ${red} rote, ${blue} blaue und ${green} grüne Kugeln. Wie groß ist P(${color}e Kugel)?`,
        answerType: 'fraction',
        correctAnswer: answer,
        correctAnswerLatex: `\\frac{${favorable}}{${total}}`,
        hint: `Günstige Ergebnisse: ${favorable}. Alle möglichen: ${total}.`,
        explanation: `P(${color}) = ${favorable}/${total} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    }
  },
};
