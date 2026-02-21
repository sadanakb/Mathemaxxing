import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── D1: Calculate simple powers (2^3, 3^2, etc.) ──────────

function generateSimplePower(difficulty: 1 | 2 | 3): Exercise {
  const base = randInt(2, 10);
  const exponent = randInt(2, 4);
  const result = Math.pow(base, exponent);

  return {
    id: genId('k7-pot'),
    topicId: 'k7-potenzen',
    question: `Berechne ${base}${superscript(exponent)}.`,
    questionLatex: `${base}^{${exponent}} = ?`,
    answerType: 'number',
    correctAnswer: result,
    distractors: [base * exponent, result + base, result - base].filter(d => d > 0 && d !== result).slice(0, 3),
    hint: `${base}${superscript(exponent)} bedeutet: ${base} wird ${exponent}-mal mit sich selbst multipliziert.`,
    explanation: `${base}${superscript(exponent)} = ${Array(exponent).fill(base).join(' \u00D7 ')} = ${result}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
  };
}

// ─── D2: Apply power laws (a^m * a^n = a^(m+n)) ────────────

function generatePowerLaw(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 2);

  if (variant === 0) {
    // a^m * a^n = a^(m+n)
    const base = randInt(2, 7);
    const m = randInt(2, 5);
    const n = randInt(2, 5);
    const sum = m + n;

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Vereinfache: ${base}${superscript(m)} \u00D7 ${base}${superscript(n)}. Gib den Exponenten an.`,
      questionLatex: `${base}^{${m}} \\cdot ${base}^{${n}} = ${base}^{?}`,
      answerType: 'number',
      correctAnswer: sum,
      distractors: [m * n, sum + 1, sum - 1].filter(d => d > 0 && d !== sum).slice(0, 3),
      hint: 'Potenzgesetz: Bei gleicher Basis werden die Exponenten addiert.',
      explanation: `${base}${superscript(m)} \u00D7 ${base}${superscript(n)} = ${base}${superscript(sum)} (Exponenten addieren: ${m} + ${n} = ${sum}).`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
    };
  } else if (variant === 1) {
    // a^m / a^n = a^(m-n)
    const base = randInt(2, 7);
    const m = randInt(4, 8);
    const n = randInt(1, m - 1);
    const diff = m - n;

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Vereinfache: ${base}${superscript(m)} \u00F7 ${base}${superscript(n)}. Gib den Exponenten an.`,
      questionLatex: `\\frac{${base}^{${m}}}{${base}^{${n}}} = ${base}^{?}`,
      answerType: 'number',
      correctAnswer: diff,
      distractors: [m + n, diff + 1, m].filter(d => d > 0 && d !== diff).slice(0, 3),
      hint: 'Potenzgesetz: Bei gleicher Basis werden die Exponenten subtrahiert.',
      explanation: `${base}${superscript(m)} \u00F7 ${base}${superscript(n)} = ${base}${superscript(diff)} (Exponenten subtrahieren: ${m} - ${n} = ${diff}).`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
    };
  } else {
    // (a^m)^n = a^(m*n)
    const base = randInt(2, 5);
    const m = randInt(2, 4);
    const n = randInt(2, 3);
    const product = m * n;

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Vereinfache: (${base}${superscript(m)})${superscript(n)}. Gib den Exponenten an.`,
      questionLatex: `(${base}^{${m}})^{${n}} = ${base}^{?}`,
      answerType: 'number',
      correctAnswer: product,
      distractors: [m + n, product + 1, product - 1].filter(d => d > 0 && d !== product).slice(0, 3),
      hint: 'Potenzgesetz: Bei Potenz einer Potenz werden die Exponenten multipliziert.',
      explanation: `(${base}${superscript(m)})${superscript(n)} = ${base}${superscript(product)} (Exponenten multiplizieren: ${m} \u00D7 ${n} = ${product}).`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  }
}

// ─── D3: Negative bases, zero exponent, combined laws ───────

function generateAdvancedPower(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 3);

  if (variant === 0) {
    // Zero exponent: a^0 = 1
    const base = randInt(2, 100);
    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Berechne ${base}${superscript(0)}.`,
      questionLatex: `${base}^{0} = ?`,
      answerType: 'number',
      correctAnswer: 1,
      distractors: [0, base, -1],
      hint: 'Jede Zahl (au\u00DFer 0) hoch 0 ergibt immer das gleiche Ergebnis.',
      explanation: `${base}${superscript(0)} = 1. Jede Zahl ungleich 0 hoch 0 ergibt 1.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  } else if (variant === 1) {
    // Negative base with even exponent: (-a)^n > 0
    const base = pick([2, 3, 4, 5]);
    const exponent = pick([2, 4]);
    const result = Math.pow(base, exponent); // positive because even exponent

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Berechne (\u2212${base})${superscript(exponent)}.`,
      questionLatex: `(-${base})^{${exponent}} = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [-result, base * exponent, result + base].filter(d => d !== result).slice(0, 3),
      hint: `Gerader Exponent: (\u2212${base})${superscript(exponent)} ist positiv, weil Minus mal Minus Plus ergibt.`,
      explanation: `(\u2212${base})${superscript(exponent)} = ${result}. Gerader Exponent \u2192 positives Ergebnis.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  } else if (variant === 2) {
    // Negative base with odd exponent: (-a)^n < 0
    const base = pick([2, 3, 4, 5]);
    const exponent = 3;
    const result = -Math.pow(base, exponent); // negative because odd exponent

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Berechne (\u2212${base})${superscript(exponent)}.`,
      questionLatex: `(-${base})^{${exponent}} = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [-result, base * exponent, result - base].filter(d => d !== result).slice(0, 3),
      hint: `Ungerader Exponent: (\u2212${base})${superscript(exponent)} ist negativ.`,
      explanation: `(\u2212${base})${superscript(exponent)} = ${result}. Ungerader Exponent \u2192 negatives Ergebnis.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  } else {
    // Combined: e.g., 2^3 * 2^4 / 2^5
    const base = pick([2, 3, 5]);
    const a = randInt(2, 5);
    const b = randInt(2, 5);
    const c = randInt(1, a + b - 1);
    const resultExp = a + b - c;

    return {
      id: genId('k7-pot'),
      topicId: 'k7-potenzen',
      question: `Vereinfache: ${base}${superscript(a)} \u00D7 ${base}${superscript(b)} \u00F7 ${base}${superscript(c)}. Gib den Exponenten an.`,
      questionLatex: `\\frac{${base}^{${a}} \\cdot ${base}^{${b}}}{${base}^{${c}}} = ${base}^{?}`,
      answerType: 'number',
      correctAnswer: resultExp,
      distractors: [a * b - c, resultExp + 1, a + b + c].filter(d => d > 0 && d !== resultExp).slice(0, 3),
      hint: `Erst Z\u00E4hler: ${a} + ${b} = ${a + b}. Dann durch Nenner: ${a + b} - ${c}.`,
      explanation: `${base}${superscript(a)} \u00D7 ${base}${superscript(b)} \u00F7 ${base}${superscript(c)} = ${base}${superscript(a + b)} \u00F7 ${base}${superscript(c)} = ${base}${superscript(resultExp)}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  }
}

// ─── Helpers ────────────────────────────────────────────────

function superscript(n: number): string {
  const map: Record<string, string> = {
    '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074',
    '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079',
  };
  return String(n).split('').map(c => map[c] ?? c).join('');
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k7-potenzen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateSimplePower(1);
    if (difficulty === 2) return generatePowerLaw(2);
    return generateAdvancedPower(3);
  },
};
