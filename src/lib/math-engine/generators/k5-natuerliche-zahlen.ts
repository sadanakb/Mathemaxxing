import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const stellenwerte = ['Einer', 'Zehner', 'Hunderter', 'Tausender', 'Zehntausender',
  'Hunderttausender', 'Millionen', 'Zehnmillionen', 'Hundertmillionen', 'Milliarden'];

function formatNumber(n: number): string {
  return n.toLocaleString('de-DE');
}

function getDigitAtPosition(n: number, pos: number): number {
  return Math.floor(n / Math.pow(10, pos)) % 10;
}

export const template: ExerciseTemplate = {
  topicId: 'k5-natuerliche-zahlen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Stellenwerttafel: Welche Ziffer steht an der Stelle X?
      const maxDigits = d === 1 ? 5 : d === 2 ? 7 : 10;
      const minDigits = d === 1 ? 3 : d === 2 ? 5 : 7;
      const numDigits = randInt(minDigits, maxDigits);
      let numStr = '';
      for (let i = 0; i < numDigits; i++) {
        numStr += i === 0 ? randInt(1, 9) : randInt(0, 9);
      }
      const num = parseInt(numStr, 10);
      const pos = randInt(0, numDigits - 1);
      const digit = getDigitAtPosition(num, pos);
      const stelle = stellenwerte[pos] ?? `10^${pos}`;

      return {
        id: genId('k5-nat'),
        topicId: 'k5-natuerliche-zahlen',
        question: `Welche Ziffer steht bei der Zahl ${formatNumber(num)} an der Stelle der ${stelle}?`,
        answerType: 'number',
        correctAnswer: digit.toString(),
        hint: `Zähle die Stellen von rechts. Die ${stelle}-Stelle ist die ${pos + 1}. Stelle von rechts.`,
        explanation: `Die Zahl ${formatNumber(num)} hat an der ${stelle}-Stelle die Ziffer ${digit}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 2) {
      // Zahlen vergleichen: Welche Zahl ist größer?
      const magnitude = d === 1 ? 10000 : d === 2 ? 1000000 : 1000000000;
      const a = randInt(Math.floor(magnitude / 10), magnitude);
      let b = randInt(Math.floor(magnitude / 10), magnitude);
      while (b === a) b = randInt(Math.floor(magnitude / 10), magnitude);

      const bigger = Math.max(a, b);
      const correct = formatNumber(bigger);
      const other = formatNumber(Math.min(a, b));

      return {
        id: genId('k5-nat'),
        topicId: 'k5-natuerliche-zahlen',
        question: `Welche Zahl ist größer: ${formatNumber(a)} oder ${formatNumber(b)}?`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: [other],
        hint: 'Vergleiche Stelle für Stelle von links nach rechts.',
        explanation: `${correct} ist größer als ${other}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 35,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 3) {
      // Potenzschreibweise: Berechne 10^n
      const exp = d === 1 ? randInt(1, 3) : d === 2 ? randInt(3, 6) : randInt(6, 9);
      const result = Math.pow(10, exp);

      return {
        id: genId('k5-nat'),
        topicId: 'k5-natuerliche-zahlen',
        question: `Berechne 10^${exp}. Schreibe das Ergebnis als Zahl.`,
        questionLatex: `\\text{Berechne } 10^{${exp}}`,
        answerType: 'number',
        correctAnswer: result.toString(),
        hint: `10^${exp} bedeutet: ${exp}-mal die 10 miteinander multiplizieren, also eine 1 mit ${exp} Nullen.`,
        explanation: `10^${exp} = ${formatNumber(result)}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 35,
        exerciseType: 'number-input',
      };
    }

    if (variant === 4) {
      // Runden: Runde auf die nächste Stelle
      const roundTo = d === 1 ? [10, 100] : d === 2 ? [1000, 10000] : [100000, 1000000];
      const roundUnit = roundTo[randInt(0, roundTo.length - 1)];
      const roundName = roundUnit === 10 ? 'Zehner' : roundUnit === 100 ? 'Hunderter' :
        roundUnit === 1000 ? 'Tausender' : roundUnit === 10000 ? 'Zehntausender' :
        roundUnit === 100000 ? 'Hunderttausender' : 'Millionen';
      const num = randInt(roundUnit, roundUnit * 100);
      const rounded = Math.round(num / roundUnit) * roundUnit;

      return {
        id: genId('k5-nat'),
        topicId: 'k5-natuerliche-zahlen',
        question: `Runde ${formatNumber(num)} auf ${roundName}.`,
        answerType: 'number',
        correctAnswer: rounded.toString(),
        hint: `Schau dir die Ziffer rechts neben der ${roundName}-Stelle an. Ist sie 5 oder größer, wird aufgerundet.`,
        explanation: `${formatNumber(num)} gerundet auf ${roundName} ergibt ${formatNumber(rounded)}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    // variant 5: Zahlen ordnen (drag-sort)
    const count = d === 1 ? 3 : d === 2 ? 4 : 5;
    const magnitude = d === 1 ? 1000 : d === 2 ? 100000 : 10000000;
    const nums: number[] = [];
    while (nums.length < count) {
      const n = randInt(Math.floor(magnitude / 10), magnitude);
      if (!nums.includes(n)) nums.push(n);
    }
    const sorted = [...nums].sort((a, b) => a - b);

    return {
      id: genId('k5-nat'),
      topicId: 'k5-natuerliche-zahlen',
      question: 'Ordne die Zahlen der Größe nach (kleinste zuerst).',
      answerType: 'drag-drop',
      correctAnswer: sorted.map(n => formatNumber(n)).join(', '),
      items: nums.map(n => formatNumber(n)),
      hint: 'Vergleiche die Zahlen Stelle für Stelle von links nach rechts.',
      explanation: `Die richtige Reihenfolge ist: ${sorted.map(n => formatNumber(n)).join(' < ')}.`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 25 : d === 2 ? 35 : 50,
      exerciseType: 'drag-sort',
    };
  },
};
