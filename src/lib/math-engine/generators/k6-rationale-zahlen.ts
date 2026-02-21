import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(n: number, d: number): [number, number] {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}

function fractionStr(n: number, d: number): string {
  const [sn, sd] = simplify(n, d);
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

// ─── Betrag berechnen ────────────────────────────────────────

function generateBetrag(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const n = pick([-1, 1]) * randInt(1, 20);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne den Betrag: |${n}| = ?`,
      questionLatex: `|${n}| = \\text{?}`,
      answerType: 'number',
      correctAnswer: Math.abs(n),
      hint: 'Der Betrag einer Zahl ist ihr Abstand zur Null – immer positiv.',
      explanation: `|${n}| = ${Math.abs(n)}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
      exerciseType: 'number-input',
    };
  } else if (difficulty === 2) {
    const a = pick([-1, 1]) * randInt(1, 15);
    const b = pick([-1, 1]) * randInt(1, 15);
    const result = Math.abs(a) + Math.abs(b);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne: |${a}| + |${b}| = ?`,
      questionLatex: `|${a}| + |${b}| = \\text{?}`,
      answerType: 'number',
      correctAnswer: result,
      hint: 'Berechne zuerst jeden Betrag einzeln, dann addiere.',
      explanation: `|${a}| + |${b}| = ${Math.abs(a)} + ${Math.abs(b)} = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else {
    const a = pick([-1, 1]) * randInt(1, 20);
    const b = pick([-1, 1]) * randInt(1, 20);
    const inner = a - b;
    const result = Math.abs(inner);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne: |${a} − (${b})| = ?`,
      questionLatex: `|${a} - (${b})| = \\text{?}`,
      answerType: 'number',
      correctAnswer: result,
      hint: 'Berechne zuerst den Ausdruck in den Betragsstrichen, dann nimm den Betrag.',
      explanation: `|${a} − (${b})| = |${inner}| = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
      exerciseType: 'number-input',
    };
  }
}

// ─── Addition rationaler Zahlen ──────────────────────────────

function generateAddition(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const a = pick([-1, 1]) * randInt(1, 10);
    const b = pick([-1, 1]) * randInt(1, 10);
    const result = a + b;
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne: (${a}) + (${b}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      hint: 'Gleiche Vorzeichen: Beträge addieren, Vorzeichen übernehmen. Verschiedene: Beträge subtrahieren, Vorzeichen der größeren.',
      explanation: `(${a}) + (${b}) = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else if (difficulty === 2) {
    const a = pick([-1, 1]) * randInt(1, 20);
    const b = pick([-1, 1]) * randInt(1, 20);
    const c = pick([-1, 1]) * randInt(1, 10);
    const result = a + b + c;
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne: (${a}) + (${b}) + (${c}) = ?`,
      answerType: 'number',
      correctAnswer: result,
      hint: 'Rechne schrittweise von links nach rechts.',
      explanation: `(${a}) + (${b}) + (${c}) = ${a + b} + (${c}) = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
      exerciseType: 'number-input',
    };
  } else {
    // Brüche mit rationalen Zahlen
    const d1 = pick([2, 3, 4, 5, 6]);
    const d2 = d1;
    const n1 = pick([-1, 1]) * randInt(1, d1 * 2);
    const n2 = pick([-1, 1]) * randInt(1, d2 * 2);
    const rn = n1 + n2;
    const [sn, sd] = simplify(rn, d1);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Berechne: ${n1}/${d1} + (${n2}/${d2}) = ?`,
      questionLatex: `\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = \\text{?}`,
      answerType: 'fraction',
      correctAnswer: fractionStr(sn, sd),
      hint: 'Gleiche Nenner: Zähler addieren (mit Vorzeichen!), Nenner bleibt.',
      explanation: `${n1}/${d1} + ${n2}/${d2} = ${rn}/${d1} = ${fractionStr(sn, sd)}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
      exerciseType: 'text-input',
    };
  }
}

// ─── Subtraktion rationaler Zahlen ───────────────────────────

function generateSubtraktion(difficulty: 1 | 2 | 3): Exercise {
  const a = pick([-1, 1]) * randInt(1, difficulty === 1 ? 10 : 20);
  const b = pick([-1, 1]) * randInt(1, difficulty === 1 ? 10 : 20);
  const result = a - b;

  return {
    id: genId('k6-rat'),
    topicId: 'k6-rationale-zahlen',
    question: `Berechne: (${a}) − (${b}) = ?`,
    answerType: 'number',
    correctAnswer: result,
    hint: 'Subtraktion = Addition der Gegenzahl: a − b = a + (−b).',
    explanation: `(${a}) − (${b}) = (${a}) + (${-b}) = ${result}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'number-input',
  };
}

// ─── Multiplikation rationaler Zahlen ────────────────────────

function generateMultiplikation(difficulty: 1 | 2 | 3): Exercise {
  const a = pick([-1, 1]) * randInt(1, difficulty === 1 ? 5 : difficulty === 2 ? 10 : 12);
  const b = pick([-1, 1]) * randInt(1, difficulty === 1 ? 5 : difficulty === 2 ? 10 : 12);
  const result = a * b;

  return {
    id: genId('k6-rat'),
    topicId: 'k6-rationale-zahlen',
    question: `Berechne: (${a}) · (${b}) = ?`,
    questionLatex: `(${a}) \\cdot (${b}) = \\text{?}`,
    answerType: 'number',
    correctAnswer: result,
    hint: 'Gleiche Vorzeichen → positiv. Verschiedene Vorzeichen → negativ.',
    explanation: `(${a}) · (${b}) = ${result} (${(a > 0) === (b > 0) ? 'gleiche' : 'verschiedene'} Vorzeichen → ${result >= 0 ? 'positiv' : 'negativ'})`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
  };
}

// ─── Ordnung auf der Zahlengerade ────────────────────────────

function generateOrdnen(difficulty: 1 | 2 | 3): Exercise {
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const range = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 30;

  const nums = new Set<number>();
  while (nums.size < count) {
    nums.add(pick([-1, 1]) * randInt(0, range));
  }

  const numArr = Array.from(nums);
  const sorted = [...numArr].sort((a, b) => a - b);
  const items = shuffle(numArr).map(n => `${n}`);

  return {
    id: genId('k6-rat'),
    topicId: 'k6-rationale-zahlen',
    question: `Ordne die Zahlen der Größe nach (aufsteigend):`,
    answerType: 'text',
    correctAnswer: sorted.join('; '),
    hint: 'Negative Zahlen sind kleiner als positive. Bei negativen Zahlen: je größer der Betrag, desto kleiner die Zahl.',
    explanation: `Richtige Reihenfolge: ${sorted.join(' < ')}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 35,
    exerciseType: 'drag-sort',
    items,
  };
}

// ─── Vorzeichen bestimmen (MC) ───────────────────────────────

function generateVorzeichenMC(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty <= 2) {
    const a = pick([-1, 1]) * randInt(1, 10);
    const b = pick([-1, 1]) * randInt(1, 10);
    const product = a * b;
    const correct = product > 0 ? 'positiv' : product < 0 ? 'negativ' : 'null';
    const distractors = ['positiv', 'negativ', 'null'].filter(s => s !== correct);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Ist das Ergebnis von (${a}) · (${b}) positiv, negativ oder null?`,
      answerType: 'multiple-choice',
      correctAnswer: correct,
      distractors,
      hint: 'Gleiche Vorzeichen → positiv, verschiedene → negativ.',
      explanation: `(${a}) · (${b}) = ${product} → ${correct}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'multiple-choice',
    };
  } else {
    const a = pick([-1, 1]) * randInt(1, 5);
    const b = pick([-1, 1]) * randInt(1, 5);
    const c = pick([-1, 1]) * randInt(1, 5);
    const product = a * b * c;
    const correct = product > 0 ? 'positiv' : 'negativ';
    const distractors = ['positiv', 'negativ', 'null'].filter(s => s !== correct);
    return {
      id: genId('k6-rat'),
      topicId: 'k6-rationale-zahlen',
      question: `Ist das Ergebnis von (${a}) · (${b}) · (${c}) positiv, negativ oder null?`,
      answerType: 'multiple-choice',
      correctAnswer: correct,
      distractors,
      hint: 'Zähle die negativen Faktoren: gerade Anzahl → positiv, ungerade → negativ.',
      explanation: `(${a}) · (${b}) · (${c}) = ${product} → ${correct}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'multiple-choice',
    };
  }
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: '|−5| = 5', wahr: true },
    { text: '−3 > −1', wahr: false },
    { text: '(−2) · (−3) = −6', wahr: false },
    { text: '(−4) + 4 = 0', wahr: true },
    { text: '|0| = 0', wahr: true },
    { text: '−7 < −10', wahr: false },
    { text: '(−1) · (−1) · (−1) = −1', wahr: true },
    { text: 'Der Betrag einer negativen Zahl ist immer negativ.', wahr: false },
    { text: '(−8) − (−3) = −5', wahr: true },
    { text: 'Auf der Zahlengerade liegt −2 rechts von −5.', wahr: true },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 7) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-rat'),
    topicId: 'k6-rationale-zahlen',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Denke an die Vorzeichenregeln und die Zahlengerade.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-rationale-zahlen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateBetrag, generateAddition, generateSubtraktion, generateVorzeichenMC, generateOrdnen, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateBetrag, generateAddition, generateSubtraktion, generateMultiplikation, generateVorzeichenMC, generateOrdnen, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateBetrag, generateAddition, generateSubtraktion, generateMultiplikation, generateVorzeichenMC, generateOrdnen, generateTrueFalse]);
      return gen(d);
    }
  },
};
