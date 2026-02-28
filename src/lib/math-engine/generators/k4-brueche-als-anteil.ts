import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const template: ExerciseTemplate = {
  topicId: 'k4-brueche-als-anteil',
  generate(difficulty = 1): Exercise {
    // Choose variant per difficulty: standard, fraction-visual, or drag-sort
    const variantRoll = randInt(0, 2);

    // ── Variant: fraction-visual (circle or rectangle) ────────────────────
    if (variantRoll === 1) {
      const shape = randInt(0, 1) === 0 ? 'circle' : 'rectangle';
      let numerator: number, denominator: number, whole: number, answer: number;

      if (difficulty === 1) {
        denominator = randInt(0, 1) === 0 ? 2 : 4;
        numerator = 1;
        whole = randInt(1, 8) * denominator;
        answer = whole / denominator;
      } else if (difficulty === 2) {
        const options = [[1, 3], [1, 5], [2, 4], [3, 4]] as [number, number][];
        [numerator, denominator] = options[randInt(0, options.length - 1)];
        whole = randInt(1, 6) * denominator;
        answer = (numerator * whole) / denominator;
      } else {
        const options = [[3, 5], [2, 3], [3, 8], [5, 6]] as [number, number][];
        [numerator, denominator] = options[randInt(0, options.length - 1)];
        whole = randInt(2, 4) * denominator;
        answer = (numerator * whole) / denominator;
      }

      return {
        id: genId('k4-bruch'),
        topicId: 'k4-brueche-als-anteil',
        question: `Schau auf die Figur: Welcher Anteil ist eingefärbt? Schreibe als Bruch (z.B. 3/4).`,
        answerType: 'text',
        exerciseType: 'fraction-visual',
        fractionConfig: {
          shape,
          total: denominator,
          target: numerator,
        },
        correctAnswer: `${numerator}/${denominator}`,
        hint: `Zähle die eingefärbten Teile und die Gesamtteile der Figur.`,
        explanation: `Die Figur hat ${denominator} gleiche Teile, davon sind ${numerator} eingefärbt. Das ist ${numerator}/${denominator}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40,
      };
    }

    // ── Variant: drag-sort (order fractions smallest to largest) ──────────
    if (variantRoll === 2) {
      const allFractions: [number, number][] =
        difficulty === 1
          ? [[1, 2], [1, 4], [3, 4], [1, 8]]
          : difficulty === 2
            ? [[1, 3], [2, 3], [1, 4], [3, 4]]
            : [[2, 3], [3, 5], [3, 8], [5, 6]];

      const selected = shuffle(allFractions).slice(0, 4);
      const sorted = [...selected].sort((a, b) => a[0] / a[1] - b[0] / b[1]);
      const shuffled = shuffle(selected);

      const toLabel = ([n, d]: [number, number]) => `${n}/${d}`;
      const sortedLabels = sorted.map(toLabel);
      const shuffledLabels = shuffled.map(toLabel);

      return {
        id: genId('k4-bruch'),
        topicId: 'k4-brueche-als-anteil',
        question: `Ordne die Brüche von klein nach groß.`,
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        items: shuffledLabels,
        correctAnswer: sortedLabels.join(', '),
        hint: 'Vergleiche die Brüche: Bringe sie auf gleiche Nenner oder stelle sie als Tortenstück vor.',
        explanation: `Richtige Reihenfolge: ${sortedLabels.join(' < ')} (${sorted.map(([n, d]) => (n / d).toFixed(2)).join(' < ')}).`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 35 : difficulty === 2 ? 45 : 55,
      };
    }

    // ── Variant: standard number-input ────────────────────────────────────
    let numerator: number, denominator: number, whole: number, answer: number;

    if (difficulty === 1) {
      denominator = randInt(0, 1) === 0 ? 2 : 4;
      numerator = 1;
      whole = randInt(1, 10) * denominator;
      answer = whole / denominator;
    } else if (difficulty === 2) {
      const options = [[1, 3], [1, 5], [2, 4], [3, 4]];
      const [n, d] = options[randInt(0, options.length - 1)];
      numerator = n;
      denominator = d;
      whole = randInt(1, 8) * denominator;
      answer = (numerator * whole) / denominator;
    } else {
      const options = [[3, 5], [2, 3], [3, 8], [5, 6]];
      const [n, d] = options[randInt(0, options.length - 1)];
      numerator = n;
      denominator = d;
      whole = randInt(2, 6) * denominator;
      answer = (numerator * whole) / denominator;
    }

    return {
      id: genId('k4-bruch'),
      topicId: 'k4-brueche-als-anteil',
      question: `${numerator}/${denominator} von ${whole} = ?`,
      questionLatex: `\\frac{${numerator}}{${denominator}} \\text{ von } ${whole} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: `Teile ${whole} durch ${denominator}, dann multipliziere mit ${numerator}.`,
      explanation: `${whole} ÷ ${denominator} × ${numerator} = ${whole / denominator} × ${numerator} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45,
      visualConfig: {
        type: 'fraction-circle' as const,
        props: { total: denominator, filled: numerator, showLabel: true },
      },
    };
  },
};
