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

/**
 * k3-zahlen-bis-1000 — Zahlen bis 1000
 *
 * Difficulty 1: numbers up to 500 — Stellenwert, Nachbarzahlen
 * Difficulty 2: numbers up to 1000 — Stellenwert, Nachbarzahlen, simple rounding
 * Difficulty 3: rounding, ordering, decomposition
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-zahlen-bis-1000',
  generate(difficulty = 1): Exercise {
    const maxNum = difficulty === 1 ? 500 : 1000;

    // Choose exercise variant
    const variants =
      difficulty === 1
        ? ['stellenwert', 'nachbar', 'stellenwert']
        : difficulty === 2
          ? ['stellenwert', 'nachbar', 'runden', 'vergleich']
          : ['runden', 'ordnen', 'zerlegung', 'stellenwert'];
    const variant = variants[randInt(0, variants.length - 1)];

    if (variant === 'stellenwert') {
      // Place value table: H, Z, E
      const n = randInt(difficulty === 1 ? 100 : 100, maxNum - 1);
      const h = Math.floor(n / 100);
      const z = Math.floor((n % 100) / 10);
      const e = n % 10;

      // Ask for one specific digit
      const digitChoice = randInt(0, 2);
      const labels = ['Hunderter', 'Zehner', 'Einer'];
      const values = [h, z, e];

      return {
        id: genId('k3-z1k'),
        topicId: 'k3-zahlen-bis-1000',
        question: `Wie viele ${labels[digitChoice]} hat die Zahl ${n}?`,
        answerType: 'number',
        exerciseType: 'place-value-table',
        correctAnswer: values[digitChoice],
        hint: `Schreibe ${n} in eine Stellenwerttafel: H = ${h}, Z = ${z}, E = ${e}.`,
        explanation: `${n} = ${h} Hunderter, ${z} Zehner, ${e} Einer. Die Antwort ist ${values[digitChoice]}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
        visualConfig: { type: 'base10-blocks' as const, props: { hundreds: h, tens: z, ones: e } },
      };
    }

    if (variant === 'nachbar') {
      const n = randInt(difficulty === 1 ? 10 : 100, maxNum - 2);
      const askSuccessor = randInt(0, 1) === 0;
      const answer = askSuccessor ? n + 1 : n - 1;
      const label = askSuccessor ? 'Nachfolger' : 'Vorgänger';

      return {
        id: genId('k3-z1k'),
        topicId: 'k3-zahlen-bis-1000',
        question: `Was ist der ${label} von ${n}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: `Der ${label} ist die Zahl, die direkt ${askSuccessor ? 'nach' : 'vor'} ${n} kommt.`,
        explanation: `Der ${label} von ${n} ist ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (variant === 'runden') {
      const n = randInt(101, maxNum - 1);
      // Round to nearest ten
      const rounded = Math.round(n / 10) * 10;

      return {
        id: genId('k3-z1k'),
        topicId: 'k3-zahlen-bis-1000',
        question: `Runde ${n} auf den nächsten Zehner.`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: rounded,
        hint: `Schaue auf die Einer-Stelle. Ist sie 5 oder größer, rundest du auf. Ist sie kleiner als 5, rundest du ab.`,
        explanation: `Die Einer-Stelle von ${n} ist ${n % 10}. ${n % 10 >= 5 ? 'Aufrunden' : 'Abrunden'}: ${n} ≈ ${rounded}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (variant === 'ordnen') {
      // Generate 4 distinct numbers and ask to sort ascending
      const nums = new Set<number>();
      while (nums.size < 4) {
        nums.add(randInt(100, maxNum - 1));
      }
      const arr = [...nums];
      const sorted = [...arr].sort((a, b) => a - b);
      const shuffled = shuffle(arr);

      return {
        id: genId('k3-z1k'),
        topicId: 'k3-zahlen-bis-1000',
        question: `Ordne die Zahlen von klein nach groß.`,
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        items: shuffled.map(String),
        correctAnswer: sorted.join(', '),
        hint: 'Vergleiche die Hunderter zuerst, dann die Zehner, dann die Einer.',
        explanation: `Die richtige Reihenfolge ist: ${sorted.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    if (variant === 'vergleich') {
      const a = randInt(100, maxNum - 1);
      let b = a;
      while (b === a) b = randInt(100, maxNum - 1);
      const bigger = a > b ? a : b;
      const correctIdx = randInt(0, 3);
      const distractors: number[] = [];
      for (let i = 0; i < 4; i++) {
        if (i === correctIdx) {
          distractors.push(bigger);
        } else {
          distractors.push(randInt(100, maxNum - 1));
        }
      }

      return {
        id: genId('k3-z1k'),
        topicId: 'k3-zahlen-bis-1000',
        question: `Welche Zahl ist größer: ${a} oder ${b}?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: bigger,
        distractors: [a, b],
        hint: 'Vergleiche die Zahlen stellenweise von links nach rechts.',
        explanation: `${bigger} ist größer als ${a === bigger ? b : a}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    // variant === 'zerlegung'
    const n = randInt(100, maxNum - 1);
    const h = Math.floor(n / 100);
    const z = Math.floor((n % 100) / 10);
    const e = n % 10;

    return {
      id: genId('k3-z1k'),
      topicId: 'k3-zahlen-bis-1000',
      question: `Zerlege die Zahl ${n}: ___ Hunderter + ___ Zehner + ___ Einer. Wie viele Hunderter?`,
      answerType: 'number',
      exerciseType: 'place-value-table',
      correctAnswer: h,
      hint: `Denke an die Stellenwerttafel: ${n} = ? H + ? Z + ? E`,
      explanation: `${n} = ${h} × 100 + ${z} × 10 + ${e} × 1 = ${h} Hunderter + ${z} Zehner + ${e} Einer.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      visualConfig: { type: 'base10-blocks' as const, props: { hundreds: h, tens: z, ones: e } },
    };
  },
};
