import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(n: number, d: number): [number, number] {
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}

function fractionStr(n: number, d: number): string {
  const [sn, sd] = simplify(n, d);
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

/** Shuffle an array in place (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Exercise variants ──────────────────────────────────────

function generateKuerzen(difficulty: 1 | 2 | 3): Exercise {
  // Kürze den Bruch
  const denominators =
    difficulty === 1 ? [2, 4, 6] :
    difficulty === 2 ? [5, 6, 8, 10] :
    [8, 10, 12, 15, 18];
  const d = pick(denominators);
  const factor = randInt(2, difficulty === 3 ? 5 : 3);
  const sn = randInt(1, d - 1);
  const [simplN, simplD] = simplify(sn, d);
  const n = simplN * factor;
  const fullD = simplD * factor;

  return {
    id: genId('k5-bru'),
    topicId: 'k5-brueche-einfuehrung',
    question: `Kürze den Bruch ${n}/${fullD} so weit wie möglich.`,
    questionLatex: `\\text{Kürze } \\frac{${n}}{${fullD}}`,
    answerType: 'fraction',
    correctAnswer: fractionStr(simplN, simplD),
    correctAnswerLatex: simplD === 1 ? `${simplN}` : `\\frac{${simplN}}{${simplD}}`,
    hint: `Suche den größten gemeinsamen Teiler von ${n} und ${fullD}.`,
    explanation: `ggT(${n}, ${fullD}) = ${gcd(n, fullD)} → ${n}/${fullD} = ${fractionStr(simplN, simplD)}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40,
    exerciseType: 'number-input',
    visualConfig: fullD <= 12 ? {
      type: 'fraction-bar' as const,
      props: { total: fullD, filled: n, showLabel: true },
    } : undefined,
  };
}

function generateErweitern(difficulty: 1 | 2 | 3): Exercise {
  const denominators =
    difficulty === 1 ? [2, 3, 4] :
    difficulty === 2 ? [3, 5, 6] :
    [4, 5, 7, 8];
  const d = pick(denominators);
  const n = randInt(1, d - 1);
  const factor = randInt(2, difficulty === 3 ? 6 : 4);
  const newN = n * factor;
  const newD = d * factor;

  return {
    id: genId('k5-bru'),
    topicId: 'k5-brueche-einfuehrung',
    question: `Erweitere den Bruch ${n}/${d} mit ${factor}.`,
    questionLatex: `\\text{Erweitere } \\frac{${n}}{${d}} \\text{ mit } ${factor}`,
    answerType: 'fraction',
    correctAnswer: `${newN}/${newD}`,
    correctAnswerLatex: `\\frac{${newN}}{${newD}}`,
    hint: `Multipliziere Zähler und Nenner jeweils mit ${factor}.`,
    explanation: `${n}/${d} × ${factor}/${factor} = ${newN}/${newD}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
  };
}

function generateVergleichMC(difficulty: 1 | 2 | 3): Exercise {
  // Welcher Bruch ist größer? (Multiple Choice)
  const denominators =
    difficulty === 1 ? [2, 3, 4] :
    difficulty === 2 ? [4, 5, 6, 8] :
    [6, 8, 10, 12];

  const d1 = pick(denominators);
  let d2 = pick(denominators);
  while (d2 === d1) d2 = pick(denominators);
  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);

  const val1 = n1 / d1;
  const val2 = n2 / d2;

  // Ensure they are different
  if (Math.abs(val1 - val2) < 0.01) {
    return generateVergleichMC(difficulty); // re-roll
  }

  const correctFrac = val1 > val2 ? `${n1}/${d1}` : `${n2}/${d2}`;
  const otherFrac = val1 > val2 ? `${n2}/${d2}` : `${n1}/${d1}`;

  return {
    id: genId('k5-bru'),
    topicId: 'k5-brueche-einfuehrung',
    question: `Welcher Bruch ist größer: ${n1}/${d1} oder ${n2}/${d2}?`,
    questionLatex: `\\text{Welcher Bruch ist größer: } \\frac{${n1}}{${d1}} \\text{ oder } \\frac{${n2}}{${d2}}\\text{?}`,
    answerType: 'multiple-choice',
    correctAnswer: correctFrac,
    distractors: [otherFrac, 'Beide sind gleich groß'],
    hint: 'Bringe beide Brüche auf den gleichen Nenner und vergleiche die Zähler.',
    explanation: `${n1}/${d1} ≈ ${val1.toFixed(3)}, ${n2}/${d2} ≈ ${val2.toFixed(3)} → ${correctFrac} ist größer.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 35,
    exerciseType: 'multiple-choice',
  };
}

function generateFractionVisual(difficulty: 1 | 2 | 3): Exercise {
  const denominators =
    difficulty === 1 ? [2, 3, 4] :
    difficulty === 2 ? [5, 6, 8] :
    [8, 10, 12];
  const total = pick(denominators);
  const target = randInt(1, total - 1);
  const shape = pick<'circle' | 'rectangle'>(['circle', 'rectangle']);

  return {
    id: genId('k5-bru'),
    topicId: 'k5-brueche-einfuehrung',
    question: `Markiere ${target}/${total} der Fläche.`,
    questionLatex: `\\text{Markiere } \\frac{${target}}{${total}} \\text{ der Fläche.}`,
    answerType: 'fraction',
    correctAnswer: `${target}/${total}`,
    hint: `Teile die Fläche in ${total} gleiche Teile und markiere ${target} davon.`,
    explanation: `${target} von ${total} Teilen = ${target}/${total}`,
    difficulty,
    category: 'Repräsentational',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'fraction-visual',
    fractionConfig: { total, target, shape },
  };
}

function generateSortieren(difficulty: 1 | 2 | 3): Exercise {
  // Ordne diese Brüche nach Größe (drag-sort)
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const fractions: { n: number; d: number; val: number }[] = [];
  const usedVals = new Set<string>();

  while (fractions.length < count) {
    const d = difficulty === 1 ? pick([2, 3, 4]) : difficulty === 2 ? pick([3, 4, 5, 6]) : pick([4, 5, 6, 8, 10]);
    const n = randInt(1, d - 1);
    const key = fractionStr(n, d);
    if (!usedVals.has(key)) {
      usedVals.add(key);
      fractions.push({ n, d, val: n / d });
    }
  }

  // Correct order: smallest to largest
  const sorted = [...fractions].sort((a, b) => a.val - b.val);
  const sortedLabels = sorted.map(f => `${f.n}/${f.d}`);
  const shuffledLabels = shuffle(fractions.map(f => `${f.n}/${f.d}`));

  return {
    id: genId('k5-bru'),
    topicId: 'k5-brueche-einfuehrung',
    question: 'Ordne die Brüche von klein nach groß.',
    answerType: 'drag-drop',
    correctAnswer: sortedLabels.join(', '),
    items: shuffledLabels,
    hint: 'Bringe alle Brüche auf einen gemeinsamen Nenner, um sie vergleichen zu können.',
    explanation: `Richtige Reihenfolge: ${sortedLabels.join(' < ')}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 35 : 50,
    exerciseType: 'drag-sort',
  };
}

// ─── Main template ──────────────────────────────────────────

const generators = [
  generateKuerzen,
  generateErweitern,
  generateVergleichMC,
  generateFractionVisual,
  generateSortieren,
];

export const template: ExerciseTemplate = {
  topicId: 'k5-brueche-einfuehrung',
  generate(difficulty = 1): Exercise {
    const gen = pick(generators);
    return gen(difficulty as 1 | 2 | 3);
  },
};
