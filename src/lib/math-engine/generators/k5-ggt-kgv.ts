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

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      factors.push(d);
      n = n / d;
    }
    d++;
  }
  if (n > 1) factors.push(n);
  return factors;
}

function formatFactors(factors: number[]): string {
  return factors.join(' \u00D7 ');
}

// ─── D1: Simple ggT/kgV of small numbers ───────────────────

function generateSimple(difficulty: 1 | 2 | 3): Exercise {
  const isGgt = randInt(0, 1) === 0;
  const a = randInt(4, 18);
  const b = randInt(4, 18);

  if (isGgt) {
    const result = gcd(a, b);
    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Berechne den ggT von ${a} und ${b}.`,
      questionLatex: `\\text{ggT}(${a},\\, ${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [result + 1, result > 1 ? result - 1 : result + 2, lcm(a, b)].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Welche Zahl teilt sowohl ${a} als auch ${b} und ist die größte?`,
      explanation: `Teiler von ${a}: ${getDivisors(a).join(', ')}. Teiler von ${b}: ${getDivisors(b).join(', ')}. Gemeinsame: der größte ist ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  } else {
    const result = lcm(a, b);
    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Berechne das kgV von ${a} und ${b}.`,
      questionLatex: `\\text{kgV}(${a},\\, ${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [a * b, result + a, result - b].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Welche Zahl ist das kleinste gemeinsame Vielfache von ${a} und ${b}?`,
      explanation: `Vielfache von ${a}: ${getMultiples(a, 5).join(', ')}, ... Vielfache von ${b}: ${getMultiples(b, 5).join(', ')}, ... Das kgV ist ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
    };
  }
}

// ─── D2: ggT/kgV with 2-digit numbers ──────────────────────

function generateMedium(difficulty: 1 | 2 | 3): Exercise {
  const isGgt = randInt(0, 1) === 0;
  const a = randInt(12, 48);
  const b = randInt(12, 48);

  if (isGgt) {
    const result = gcd(a, b);
    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Berechne den ggT von ${a} und ${b}.`,
      questionLatex: `\\text{ggT}(${a},\\, ${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [result * 2, result > 1 ? result - 1 : 2, result + 2].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Zerlege beide Zahlen in Primfaktoren: ${a} = ${formatFactors(primeFactors(a))}, ${b} = ${formatFactors(primeFactors(b))}.`,
      explanation: `${a} = ${formatFactors(primeFactors(a))}, ${b} = ${formatFactors(primeFactors(b))}. ggT(${a}, ${b}) = ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  } else {
    const result = lcm(a, b);
    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Berechne das kgV von ${a} und ${b}.`,
      questionLatex: `\\text{kgV}(${a},\\, ${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [a * b, result + a, result + b].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Nutze: kgV(a, b) = (a \u00D7 b) \u00F7 ggT(a, b). ggT(${a}, ${b}) = ${gcd(a, b)}.`,
      explanation: `ggT(${a}, ${b}) = ${gcd(a, b)}. kgV = (${a} \u00D7 ${b}) \u00F7 ${gcd(a, b)} = ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
    };
  }
}

// ─── D3: Primfaktorzerlegung, then ggT/kgV ─────────────────

function generateAdvanced(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 2);

  if (variant === 0) {
    // Primfaktorzerlegung
    const numbers = [24, 30, 36, 42, 48, 54, 56, 60, 72, 84, 90];
    const n = pick(numbers);
    const factors = primeFactors(n);
    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Zerlege ${n} in Primfaktoren. Schreibe das Ergebnis als Multiplikation (z.B. 2 \u00D7 2 \u00D7 3).`,
      answerType: 'text',
      correctAnswer: formatFactors(factors),
      hint: 'Teile die Zahl immer wieder durch die kleinste Primzahl, die passt.',
      explanation: `${n} = ${formatFactors(factors)}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  } else {
    // ggT or kgV via Primfaktorzerlegung
    const isGgt = variant === 1;
    const a = pick([24, 30, 36, 42, 48, 60]);
    const b = pick([18, 24, 30, 36, 40, 54]);
    const result = isGgt ? gcd(a, b) : lcm(a, b);
    const label = isGgt ? 'ggT' : 'kgV';

    return {
      id: genId('k5-gk'),
      topicId: 'k5-ggt-kgv',
      question: `Bestimme den ${label} von ${a} und ${b} mithilfe der Primfaktorzerlegung.`,
      questionLatex: `\\text{${label}}(${a},\\, ${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [result + 6, result > 6 ? result - 6 : result * 2, a * b].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Zerlege beide Zahlen: ${a} = ${formatFactors(primeFactors(a))}, ${b} = ${formatFactors(primeFactors(b))}. ${isGgt ? 'Nimm die gemeinsamen Faktoren.' : 'Nimm jeden Faktor in der höchsten vorkommenden Potenz.'}`,
      explanation: `${a} = ${formatFactors(primeFactors(a))}, ${b} = ${formatFactors(primeFactors(b))}. ${label}(${a}, ${b}) = ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 60,
    };
  }
}

// ─── Helpers ────────────────────────────────────────────────

function getDivisors(n: number): number[] {
  const divs: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

function getMultiples(n: number, count: number): number[] {
  return Array.from({ length: count }, (_, i) => n * (i + 1));
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k5-ggt-kgv',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateSimple(1);
    if (difficulty === 2) return generateMedium(2);
    return generateAdvanced(3);
  },
};
