import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── D1: Compare 2 fractions with same denominator ──────────

function generateSameDenominator(difficulty: 1 | 2 | 3): Exercise {
  const d = pick([2, 3, 4, 5, 6, 8]);
  let n1 = randInt(1, d - 1);
  let n2 = randInt(1, d - 1);
  while (n1 === n2) n2 = randInt(1, d - 1);

  const correct = n1 > n2 ? `${n1}/${d}` : `${n2}/${d}`;
  const other = n1 > n2 ? `${n2}/${d}` : `${n1}/${d}`;

  return {
    id: genId('k4-bv'),
    topicId: 'k4-bruchvergleich',
    question: `Welcher Bruch ist größer: ${n1}/${d} oder ${n2}/${d}?`,
    questionLatex: `\\text{Welcher Bruch ist größer: } \\frac{${n1}}{${d}} \\text{ oder } \\frac{${n2}}{${d}}\\text{?}`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors: [other, 'Beide sind gleich groß'],
    hint: 'Bei gleichem Nenner ist der Bruch mit dem größeren Zähler der größere.',
    explanation: `Bei gleichem Nenner ${d} vergleiche die Zähler: ${Math.max(n1, n2)} > ${Math.min(n1, n2)}, also ist ${correct} größer.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
    visualConfig: {
      type: 'fraction-bar' as const,
      props: { total: d, filled: Math.max(n1, n2), showLabel: true },
    },
  };
}

// ─── D2: Compare 2 fractions with different denominators ────

function generateDifferentDenominator(difficulty: 1 | 2 | 3): Exercise {
  const denominators = [2, 3, 4, 5, 6, 8, 10];
  let d1 = pick(denominators);
  let d2 = pick(denominators);
  while (d1 === d2) d2 = pick(denominators);

  const n1 = randInt(1, d1 - 1);
  const n2 = randInt(1, d2 - 1);

  const val1 = n1 / d1;
  const val2 = n2 / d2;

  if (Math.abs(val1 - val2) < 0.01) {
    return generateDifferentDenominator(difficulty);
  }

  const commonD = lcm(d1, d2);
  const expandedN1 = n1 * (commonD / d1);
  const expandedN2 = n2 * (commonD / d2);

  const correct = val1 > val2 ? `${n1}/${d1}` : `${n2}/${d2}`;
  const other = val1 > val2 ? `${n2}/${d2}` : `${n1}/${d1}`;

  return {
    id: genId('k4-bv'),
    topicId: 'k4-bruchvergleich',
    question: `Welcher Bruch ist größer: ${n1}/${d1} oder ${n2}/${d2}?`,
    questionLatex: `\\text{Welcher Bruch ist größer: } \\frac{${n1}}{${d1}} \\text{ oder } \\frac{${n2}}{${d2}}\\text{?}`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors: [other, 'Beide sind gleich groß'],
    hint: `Bringe beide Brüche auf den Hauptnenner ${commonD} und vergleiche dann die Zähler.`,
    explanation: `Hauptnenner: ${commonD}. ${n1}/${d1} = ${expandedN1}/${commonD}, ${n2}/${d2} = ${expandedN2}/${commonD}. Da ${Math.max(expandedN1, expandedN2)} > ${Math.min(expandedN1, expandedN2)}, ist ${correct} größer.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 30,
    exerciseType: 'multiple-choice',
    visualConfig: {
      type: 'fraction-bar' as const,
      props: { total: commonD, filled: Math.max(expandedN1, expandedN2), showLabel: true },
    },
  };
}

// ─── D3: Order 3 fractions from smallest to largest ─────────

function generateOrderFractions(difficulty: 1 | 2 | 3): Exercise {
  const denominators = [2, 3, 4, 5, 6, 8, 10, 12];
  const fractions: { n: number; d: number; val: number }[] = [];
  const usedVals = new Set<string>();

  while (fractions.length < 3) {
    const d = pick(denominators);
    const n = randInt(1, d - 1);
    const key = `${(n / d).toFixed(4)}`;
    if (!usedVals.has(key)) {
      usedVals.add(key);
      fractions.push({ n, d, val: n / d });
    }
  }

  const sorted = [...fractions].sort((a, b) => a.val - b.val);
  const sortedLabels = sorted.map(f => `${f.n}/${f.d}`);
  const shuffledLabels = shuffle(fractions.map(f => `${f.n}/${f.d}`));

  return {
    id: genId('k4-bv'),
    topicId: 'k4-bruchvergleich',
    question: `Ordne die Brüche von klein nach groß: ${shuffledLabels.join(', ')}`,
    answerType: 'drag-drop',
    correctAnswer: sortedLabels.join(', '),
    items: shuffledLabels,
    hint: 'Bringe alle Brüche auf einen gemeinsamen Nenner oder wandle sie in Dezimalzahlen um.',
    explanation: `Richtige Reihenfolge: ${sortedLabels.join(' < ')} (${sorted.map(f => f.val.toFixed(3)).join(' < ')})`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 45,
    exerciseType: 'drag-sort',
  };
}

// ─── Main template ──────────────────────────────────────────

const generators = [generateSameDenominator, generateDifferentDenominator, generateOrderFractions];

export const template: ExerciseTemplate = {
  topicId: 'k4-bruchvergleich',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateSameDenominator(1);
    if (difficulty === 2) return generateDifferentDenominator(2);
    return generateOrderFractions(3);
  },
};
