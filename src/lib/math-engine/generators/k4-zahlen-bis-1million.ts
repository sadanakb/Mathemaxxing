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

function formatDE(n: number): string {
  return n.toLocaleString('de-DE');
}

/**
 * k4-zahlen-bis-1million — Zahlen bis 1 Million
 *
 * Difficulty 1: up to 10.000
 * Difficulty 2: up to 100.000
 * Difficulty 3: up to 1.000.000
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-zahlen-bis-1million',
  generate(difficulty = 1): Exercise {
    const maxNum = difficulty === 1 ? 10_000 : difficulty === 2 ? 100_000 : 1_000_000;
    const minNum = difficulty === 1 ? 1_000 : difficulty === 2 ? 10_000 : 100_000;

    // Choose exercise variant
    const variants =
      difficulty === 1
        ? ['stellenwert', 'nachbar', 'runden', 'vergleich']
        : difficulty === 2
          ? ['stellenwert', 'runden', 'ordnen', 'vergleich']
          : ['runden', 'ordnen', 'vergleich', 'stellenwert'];
    const variant = variants[randInt(0, variants.length - 1)];

    if (variant === 'stellenwert') {
      const n = randInt(minNum, maxNum - 1);
      const digits = [
        { label: 'Hunderttausender', value: Math.floor(n / 100_000) },
        { label: 'Zehntausender', value: Math.floor((n % 100_000) / 10_000) },
        { label: 'Tausender', value: Math.floor((n % 10_000) / 1_000) },
        { label: 'Hunderter', value: Math.floor((n % 1_000) / 100) },
        { label: 'Zehner', value: Math.floor((n % 100) / 10) },
        { label: 'Einer', value: n % 10 },
      ];
      // Only ask about non-zero positions that exist in the range
      const relevant = digits.filter(d => d.value > 0 || randInt(0, 2) === 0);
      const chosen = relevant[randInt(0, relevant.length - 1)];

      return {
        id: genId('k4-z1m'),
        topicId: 'k4-zahlen-bis-1million',
        question: `Wie viele ${chosen.label} hat die Zahl ${formatDE(n)}?`,
        answerType: 'number',
        exerciseType: 'place-value-table',
        correctAnswer: chosen.value,
        hint: `Zerlege ${formatDE(n)} in die Stellenwerte.`,
        explanation: `${formatDE(n)}: ${chosen.label} = ${chosen.value}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 'nachbar') {
      const n = randInt(minNum, maxNum - 2);
      const askSuccessor = randInt(0, 1) === 0;
      const answer = askSuccessor ? n + 1 : n - 1;
      const label = askSuccessor ? 'Nachfolger' : 'Vorgänger';

      return {
        id: genId('k4-z1m'),
        topicId: 'k4-zahlen-bis-1million',
        question: `Was ist der ${label} von ${formatDE(n)}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: `Der ${label} ist die Zahl direkt ${askSuccessor ? 'nach' : 'vor'} ${formatDE(n)}.`,
        explanation: `Der ${label} von ${formatDE(n)} ist ${formatDE(answer)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (variant === 'runden') {
      const n = randInt(minNum, maxNum - 1);

      // Choose rounding target based on difficulty
      let roundTo: number;
      let roundLabel: string;
      if (difficulty === 1) {
        roundTo = randInt(0, 1) === 0 ? 10 : 100;
        roundLabel = roundTo === 10 ? 'Zehner' : 'Hunderter';
      } else if (difficulty === 2) {
        const options = [100, 1_000];
        roundTo = options[randInt(0, options.length - 1)];
        roundLabel = roundTo === 100 ? 'Hunderter' : 'Tausender';
      } else {
        const options = [1_000, 10_000, 100_000];
        roundTo = options[randInt(0, options.length - 1)];
        roundLabel = roundTo === 1_000 ? 'Tausender' : roundTo === 10_000 ? 'Zehntausender' : 'Hunderttausender';
      }

      const rounded = Math.round(n / roundTo) * roundTo;
      const digitToCheck = Math.floor((n % roundTo) / (roundTo / 10));

      return {
        id: genId('k4-z1m'),
        topicId: 'k4-zahlen-bis-1million',
        question: `Runde ${formatDE(n)} auf ${roundLabel}.`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: rounded,
        hint: `Schaue auf die Stelle rechts vom ${roundLabel}. Ist sie 5 oder mehr → aufrunden, sonst abrunden.`,
        explanation: `Die entscheidende Ziffer ist ${digitToCheck}. ${digitToCheck >= 5 ? 'Aufrunden' : 'Abrunden'}: ${formatDE(n)} ≈ ${formatDE(rounded)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 'ordnen') {
      // Generate 4 distinct numbers, ask to sort
      const nums = new Set<number>();
      while (nums.size < 4) {
        nums.add(randInt(minNum, maxNum - 1));
      }
      const arr = [...nums];
      const sorted = [...arr].sort((a, b) => a - b);
      const shuffled = shuffle(arr);

      return {
        id: genId('k4-z1m'),
        topicId: 'k4-zahlen-bis-1million',
        question: `Ordne die Zahlen von klein nach groß.`,
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        items: shuffled.map(n => formatDE(n)),
        correctAnswer: sorted.map(n => formatDE(n)).join(', '),
        hint: 'Vergleiche die Zahlen stellenweise von links nach rechts.',
        explanation: `Die richtige Reihenfolge ist: ${sorted.map(n => formatDE(n)).join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    // variant === 'vergleich'
    const a = randInt(minNum, maxNum - 1);
    let b = a;
    while (b === a) b = randInt(minNum, maxNum - 1);

    // Use true-false or multiple-choice
    const useTrueFalse = randInt(0, 1) === 0;

    if (useTrueFalse) {
      const claim = randInt(0, 1) === 0;
      // claim: "a > b" — is it true?
      const isTrue = claim ? a > b : a < b;
      const symbol = claim ? '>' : '<';

      return {
        id: genId('k4-z1m'),
        topicId: 'k4-zahlen-bis-1million',
        question: `Stimmt es? ${formatDE(a)} ${symbol} ${formatDE(b)}`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Vergleiche die Zahlen Stelle für Stelle von links.',
        explanation: `${formatDE(a)} ${a > b ? '>' : '<'} ${formatDE(b)}, also ist die Aussage ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    const bigger = Math.max(a, b);
    return {
      id: genId('k4-z1m'),
      topicId: 'k4-zahlen-bis-1million',
      question: `Welche Zahl ist größer?`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: bigger,
      distractors: [a, b],
      hint: 'Vergleiche die Zahlen stellenweise von links nach rechts.',
      explanation: `${formatDE(bigger)} ist größer.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
