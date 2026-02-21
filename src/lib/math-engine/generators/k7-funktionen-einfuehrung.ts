import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── D1: Fill in value table for y = ax ─────────────────────

function generateValueTable(difficulty: 1 | 2 | 3): Exercise {
  const a = pick([2, 3, 4, 5, 6]);
  const x = randInt(1, 10);
  const y = a * x;

  const variant = randInt(0, 1);
  if (variant === 0) {
    // Given x, find y
    return {
      id: genId('k7-funk'),
      topicId: 'k7-funktionen-einfuehrung',
      question: `Gegeben ist die Funktion y = ${a}x. Berechne y f\u00FCr x = ${x}.`,
      questionLatex: `y = ${a}x,\\quad x = ${x} \\Rightarrow y = ?`,
      answerType: 'number',
      correctAnswer: y,
      distractors: [y + a, y - a, a + x].filter(d => d > 0 && d !== y).slice(0, 3),
      hint: `Setze x = ${x} in die Funktion ein: y = ${a} \u00D7 ${x}.`,
      explanation: `y = ${a} \u00D7 ${x} = ${y}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      visualConfig: {
        type: 'coordinate-system' as const,
        props: {
          xMin: 0, xMax: 12, yMin: 0, yMax: a * 12,
          functions: [{ expression: `${a}*x`, color: '#3b82f6' }],
          points: [{ x, y, label: `(${x}|${y})` }],
        },
      },
    };
  } else {
    // Given y, find x
    return {
      id: genId('k7-funk'),
      topicId: 'k7-funktionen-einfuehrung',
      question: `Gegeben ist die Funktion y = ${a}x. F\u00FCr welches x gilt y = ${y}?`,
      questionLatex: `y = ${a}x,\\quad y = ${y} \\Rightarrow x = ?`,
      answerType: 'number',
      correctAnswer: x,
      distractors: [x + 1, x - 1, y].filter(d => d > 0 && d !== x).slice(0, 3),
      hint: `Setze y = ${y} ein und l\u00F6se nach x auf: ${y} = ${a} \u00D7 x.`,
      explanation: `${y} = ${a}x \u2192 x = ${y} \u00F7 ${a} = ${x}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
    };
  }
}

// ─── D2: Determine function rule from value table ───────────

function generateFindRule(difficulty: 1 | 2 | 3): Exercise {
  const a = pick([2, 3, 4, 5, 6, 7]);
  const xValues = [1, 2, 3, 4, 5];
  const yValues = xValues.map(x => a * x);

  const tableStr = xValues.map((x, i) => `x=${x} \u2192 y=${yValues[i]}`).join(', ');

  return {
    id: genId('k7-funk'),
    topicId: 'k7-funktionen-einfuehrung',
    question: `Bestimme die Funktionsvorschrift. Wertetabelle: ${tableStr}. y = ?x`,
    answerType: 'number',
    correctAnswer: a,
    distractors: [a + 1, a - 1, a * 2].filter(d => d > 0 && d !== a).slice(0, 3),
    hint: `Wie \u00E4ndert sich y, wenn x um 1 steigt? Berechne y \u00F7 x f\u00FCr einen Wert.`,
    explanation: `y \u00F7 x = ${yValues[0]} \u00F7 ${xValues[0]} = ${a}. Also y = ${a}x.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 30,
    visualConfig: {
      type: 'coordinate-system' as const,
      props: {
        xMin: 0, xMax: 6, yMin: 0, yMax: a * 6,
        points: xValues.map((x, i) => ({ x, y: yValues[i], label: `(${x}|${yValues[i]})` })),
      },
    },
  };
}

// ─── D3: y = mx + b, find values, interpret slope/intercept ─

function generateLinearFunction(difficulty: 1 | 2 | 3): Exercise {
  const m = pick([1, 2, 3, 4, 5, -1, -2, -3]);
  const b = pick([0, 1, 2, 3, -1, -2, -3]);

  const variant = randInt(0, 2);

  if (variant === 0) {
    // Calculate y for given x
    const x = randInt(1, 6);
    const y = m * x + b;
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const funcStr = b === 0 ? `${m}x` : `${m}x ${bStr}`;

    return {
      id: genId('k7-funk'),
      topicId: 'k7-funktionen-einfuehrung',
      question: `Berechne y f\u00FCr x = ${x} bei der Funktion y = ${funcStr}.`,
      questionLatex: `y = ${funcStr},\\quad x = ${x} \\Rightarrow y = ?`,
      answerType: 'number',
      correctAnswer: y,
      distractors: [y + m, y - b, m * x].filter(d => d !== y).slice(0, 3),
      hint: `Setze x = ${x} ein: y = ${m} \u00D7 ${x} ${bStr}.`,
      explanation: `y = ${m} \u00D7 ${x} ${bStr} = ${m * x} ${bStr} = ${y}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      visualConfig: {
        type: 'coordinate-system' as const,
        props: {
          xMin: -2, xMax: 8, yMin: Math.min(-5, y - 3), yMax: Math.max(10, y + 3),
          functions: [{ expression: `${m}*x+${b}`, color: '#3b82f6' }],
          points: [{ x, y, label: `(${x}|${y})` }],
        },
      },
    };
  } else if (variant === 1) {
    // What is the slope (Steigung)?
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const funcStr = b === 0 ? `${m}x` : `${m}x ${bStr}`;

    return {
      id: genId('k7-funk'),
      topicId: 'k7-funktionen-einfuehrung',
      question: `Wie gro\u00DF ist die Steigung der Funktion y = ${funcStr}?`,
      questionLatex: `y = ${funcStr},\\quad m = ?`,
      answerType: 'number',
      correctAnswer: m,
      distractors: [b, m + 1, m - 1].filter(d => d !== m).slice(0, 3),
      hint: 'Bei y = mx + b ist m die Steigung (der Faktor vor x).',
      explanation: `In y = ${funcStr} ist die Steigung m = ${m}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  } else {
    // What is the y-intercept (y-Achsenabschnitt)?
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const funcStr = b === 0 ? `${m}x` : `${m}x ${bStr}`;

    return {
      id: genId('k7-funk'),
      topicId: 'k7-funktionen-einfuehrung',
      question: `Wo schneidet die Funktion y = ${funcStr} die y-Achse? Gib den y-Wert an.`,
      questionLatex: `y = ${funcStr},\\quad \\text{y-Achsenabschnitt} = ?`,
      answerType: 'number',
      correctAnswer: b,
      distractors: [m, b + 1, b - 1].filter(d => d !== b).slice(0, 3),
      hint: 'Der y-Achsenabschnitt ist der Wert b in y = mx + b (setze x = 0 ein).',
      explanation: `F\u00FCr x = 0: y = ${m} \u00D7 0 ${bStr} = ${b}. Der y-Achsenabschnitt ist ${b}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      visualConfig: {
        type: 'coordinate-system' as const,
        props: {
          xMin: -3, xMax: 6, yMin: -5, yMax: 10,
          functions: [{ expression: `${m}*x+${b}`, color: '#3b82f6' }],
          points: [{ x: 0, y: b, label: `(0|${b})` }],
        },
      },
    };
  }
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k7-funktionen-einfuehrung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateValueTable(1);
    if (difficulty === 2) return generateFindRule(2);
    return generateLinearFunction(3);
  },
};
