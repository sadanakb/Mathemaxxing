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
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}

function fractionStr(n: number, d: number): string {
  const [sn, sd] = simplify(n, d);
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

// ─── Bruch → Dezimalbruch ────────────────────────────────────

function generateBruchZuDezimal(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    // Einfache Brüche mit Nenner 2, 4, 5, 10
    const pairs: [number, number, string][] = [
      [1, 2, '0,5'], [1, 4, '0,25'], [3, 4, '0,75'], [1, 5, '0,2'],
      [2, 5, '0,4'], [3, 5, '0,6'], [4, 5, '0,8'], [1, 10, '0,1'],
      [3, 10, '0,3'], [7, 10, '0,7'], [9, 10, '0,9'],
    ];
    const [n, d, dec] = pick(pairs);
    return {
      id: genId('k6-dez'),
      topicId: 'k6-dezimalbrueche',
      question: `Wandle ${n}/${d} in einen Dezimalbruch um.`,
      questionLatex: `\\text{Wandle } \\frac{${n}}{${d}} \\text{ in einen Dezimalbruch um.}`,
      answerType: 'text',
      correctAnswer: dec,
      hint: `Erweitere oder kürze den Bruch so, dass der Nenner 10 oder 100 wird.`,
      explanation: `${n}/${d} = ${dec}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      exerciseType: 'text-input',
    };
  } else if (difficulty === 2) {
    // Nenner 8, 20, 25, 50
    const pairs: [number, number, string][] = [
      [1, 8, '0,125'], [3, 8, '0,375'], [5, 8, '0,625'], [7, 8, '0,875'],
      [1, 20, '0,05'], [3, 20, '0,15'], [7, 20, '0,35'], [9, 20, '0,45'],
      [1, 25, '0,04'], [3, 25, '0,12'], [7, 25, '0,28'],
      [1, 50, '0,02'], [3, 50, '0,06'],
    ];
    const [n, d, dec] = pick(pairs);
    return {
      id: genId('k6-dez'),
      topicId: 'k6-dezimalbrueche',
      question: `Wandle ${n}/${d} in einen Dezimalbruch um.`,
      questionLatex: `\\text{Wandle } \\frac{${n}}{${d}} \\text{ in einen Dezimalbruch um.}`,
      answerType: 'text',
      correctAnswer: dec,
      hint: `Versuche den Nenner auf 100 oder 1000 zu erweitern.`,
      explanation: `${n}/${d} = ${dec}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
      exerciseType: 'text-input',
    };
  } else {
    // Periodische Dezimalbrüche erkennen
    const pairs: [number, number, string][] = [
      [1, 3, '0,333...'], [2, 3, '0,666...'],
      [1, 6, '0,1666...'], [5, 6, '0,8333...'],
      [1, 9, '0,111...'], [2, 9, '0,222...'],
      [4, 9, '0,444...'], [7, 9, '0,777...'],
      [1, 11, '0,0909...'], [2, 11, '0,1818...'],
    ];
    const [n, d, dec] = pick(pairs);
    return {
      id: genId('k6-dez'),
      topicId: 'k6-dezimalbrueche',
      question: `Wandle ${n}/${d} in einen Dezimalbruch um. Schreibe periodische Stellen mit "..." am Ende.`,
      questionLatex: `\\text{Wandle } \\frac{${n}}{${d}} \\text{ in einen Dezimalbruch um.}`,
      answerType: 'text',
      correctAnswer: dec,
      hint: `Führe die schriftliche Division ${n} : ${d} durch. Was fällt dir auf?`,
      explanation: `${n}/${d} = ${dec} (periodischer Dezimalbruch)`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 60,
      exerciseType: 'text-input',
    };
  }
}

// ─── Dezimalbruch → Bruch ────────────────────────────────────

function generateDezimalZuBruch(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const pairs: [string, string][] = [
      ['0,5', '1/2'], ['0,25', '1/4'], ['0,75', '3/4'],
      ['0,2', '1/5'], ['0,4', '2/5'], ['0,6', '3/5'],
      ['0,1', '1/10'], ['0,3', '3/10'], ['0,7', '7/10'],
      ['0,8', '4/5'], ['0,9', '9/10'],
    ];
    const [dec, frac] = pick(pairs);
    return {
      id: genId('k6-dez'),
      topicId: 'k6-dezimalbrueche',
      question: `Wandle ${dec} in einen gekürzten Bruch um.`,
      answerType: 'fraction',
      correctAnswer: frac,
      hint: `Schreibe den Dezimalbruch als Bruch mit Nenner 10 (oder 100) und kürze.`,
      explanation: `${dec} = ${frac}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      exerciseType: 'text-input',
    };
  } else {
    const pairs: [string, string][] = [
      ['0,125', '1/8'], ['0,375', '3/8'], ['0,625', '5/8'],
      ['0,05', '1/20'], ['0,15', '3/20'], ['0,35', '7/20'],
      ['0,04', '1/25'], ['0,12', '3/25'],
      ['0,875', '7/8'], ['0,45', '9/20'],
    ];
    const [dec, frac] = pick(pairs);
    return {
      id: genId('k6-dez'),
      topicId: 'k6-dezimalbrueche',
      question: `Wandle ${dec} in einen vollständig gekürzten Bruch um.`,
      answerType: 'fraction',
      correctAnswer: frac,
      hint: `Schreibe den Dezimalbruch als Bruch mit Nenner 1000 und kürze schrittweise.`,
      explanation: `${dec} = ${frac}`,
      difficulty: difficulty as 1 | 2 | 3,
      category: 'Abstrakt',
      estimatedSeconds: 45,
      exerciseType: 'text-input',
    };
  }
}

// ─── Dezimalbrüche vergleichen ───────────────────────────────

function generateVergleichen(difficulty: 1 | 2 | 3): Exercise {
  let a: number, b: number;
  if (difficulty === 1) {
    a = randInt(1, 9) / 10;
    b = randInt(1, 9) / 10;
    while (b === a) b = randInt(1, 9) / 10;
  } else if (difficulty === 2) {
    a = randInt(1, 99) / 100;
    b = randInt(1, 99) / 100;
    while (b === a) b = randInt(1, 99) / 100;
  } else {
    a = randInt(1, 999) / 1000;
    b = randInt(1, 999) / 1000;
    while (b === a) b = randInt(1, 999) / 1000;
  }

  const aStr = a.toFixed(difficulty === 1 ? 1 : difficulty === 2 ? 2 : 3).replace('.', ',');
  const bStr = b.toFixed(difficulty === 1 ? 1 : difficulty === 2 ? 2 : 3).replace('.', ',');
  const correct = a > b ? '>' : '<';
  const distractors = ['>', '<', '='].filter(s => s !== correct);

  return {
    id: genId('k6-dez'),
    topicId: 'k6-dezimalbrueche',
    question: `Vergleiche: ${aStr} __ ${bStr}. Welches Zeichen gehört in die Lücke?`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors,
    hint: 'Vergleiche stellenweise von links nach rechts.',
    explanation: `${aStr} ${correct} ${bStr}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'multiple-choice',
  };
}

// ─── Dezimalbrüche addieren / subtrahieren ───────────────────

function generateRechnen(difficulty: 1 | 2 | 3): Exercise {
  const isAdd = randInt(0, 1) === 0;
  let a: number, b: number;

  if (difficulty === 1) {
    a = randInt(1, 9) / 10;
    b = randInt(1, 9) / 10;
    if (!isAdd && b > a) [a, b] = [b, a];
  } else if (difficulty === 2) {
    a = randInt(10, 99) / 100;
    b = randInt(10, 99) / 100;
    if (!isAdd && b > a) [a, b] = [b, a];
  } else {
    a = randInt(1, 9) + randInt(1, 99) / 100;
    b = randInt(1, 9) + randInt(1, 99) / 100;
    if (!isAdd && b > a) [a, b] = [b, a];
  }

  const result = isAdd ? a + b : a - b;
  const decimals = difficulty === 1 ? 1 : 2;
  const aStr = a.toFixed(decimals).replace('.', ',');
  const bStr = b.toFixed(decimals).replace('.', ',');
  const resultStr = result.toFixed(decimals).replace('.', ',');
  const op = isAdd ? '+' : '−';

  return {
    id: genId('k6-dez'),
    topicId: 'k6-dezimalbrueche',
    question: `Berechne: ${aStr} ${op} ${bStr} = ?`,
    answerType: 'text',
    correctAnswer: resultStr,
    hint: isAdd
      ? 'Schreibe die Zahlen untereinander, Komma unter Komma, und addiere stellenweise.'
      : 'Schreibe die Zahlen untereinander, Komma unter Komma, und subtrahiere stellenweise.',
    explanation: `${aStr} ${op} ${bStr} = ${resultStr}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 35 : 50,
    exerciseType: 'text-input',
  };
}

// ─── Sortieren ───────────────────────────────────────────────

function generateSortieren(difficulty: 1 | 2 | 3): Exercise {
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const decimals = difficulty === 1 ? 1 : difficulty === 2 ? 2 : 3;
  const max = difficulty === 1 ? 9 : difficulty === 2 ? 99 : 999;
  const divisor = difficulty === 1 ? 10 : difficulty === 2 ? 100 : 1000;

  const nums = new Set<number>();
  while (nums.size < count) {
    nums.add(randInt(1, max));
  }
  const numArr = Array.from(nums);
  const sorted = [...numArr].sort((a, b) => a - b);
  const items = shuffle(numArr).map(n => (n / divisor).toFixed(decimals).replace('.', ','));
  const correctOrder = sorted.map(n => (n / divisor).toFixed(decimals).replace('.', ','));

  return {
    id: genId('k6-dez'),
    topicId: 'k6-dezimalbrueche',
    question: `Sortiere die Dezimalbrüche der Größe nach (aufsteigend):`,
    answerType: 'text',
    correctAnswer: correctOrder.join('; '),
    hint: 'Vergleiche die Zahlen stellenweise von links nach rechts.',
    explanation: `Richtige Reihenfolge: ${correctOrder.join(' < ')}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 35 : 50,
    exerciseType: 'drag-sort',
    items,
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: '0,5 ist größer als 0,50.', wahr: false },
    { text: '1/4 entspricht dem Dezimalbruch 0,25.', wahr: true },
    { text: '0,33 ist gleich 1/3.', wahr: false },
    { text: '0,1 + 0,2 = 0,3.', wahr: true },
    { text: '3/8 entspricht dem Dezimalbruch 0,375.', wahr: true },
    { text: '0,9 ist kleiner als 0,09.', wahr: false },
    { text: '1/3 ergibt einen periodischen Dezimalbruch.', wahr: true },
    { text: '0,125 ist gleich 1/8.', wahr: true },
    { text: '0,6 ist gleich 3/5.', wahr: true },
    { text: '1/7 ergibt einen endlichen Dezimalbruch.', wahr: false },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 7) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-dez'),
    topicId: 'k6-dezimalbrueche',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Rechne den Bruch in einen Dezimalbruch um (oder umgekehrt) und vergleiche.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-dezimalbrueche',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateBruchZuDezimal, generateDezimalZuBruch, generateVergleichen, generateRechnen, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateBruchZuDezimal, generateDezimalZuBruch, generateVergleichen, generateRechnen, generateSortieren, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateBruchZuDezimal, generateDezimalZuBruch, generateVergleichen, generateRechnen, generateSortieren, generateTrueFalse]);
      return gen(d);
    }
  },
};
