import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── D1: "Was sind X% von Y?" (simple: 10%, 25%, 50%) ──────

function generateSimplePercent(difficulty: 1 | 2 | 3): Exercise {
  const percentages = [10, 20, 25, 50];
  const p = pick(percentages);
  const bases = [40, 60, 80, 100, 120, 200, 400, 500];
  const base = pick(bases);
  const result = (p / 100) * base;

  return {
    id: genId('k6-proz'),
    topicId: 'k6-prozentrechnung-einfuehrung',
    question: `Was sind ${p}% von ${base}?`,
    questionLatex: `${p}\\% \\text{ von } ${base} = ?`,
    answerType: 'number',
    correctAnswer: result,
    distractors: [result + 10, result * 2, base - result].filter(d => d > 0 && d !== result).slice(0, 3),
    hint: `${p}% bedeutet ${p} von 100. Teile ${base} entsprechend auf.`,
    explanation: `${p}% von ${base} = ${p}/100 \u00D7 ${base} = ${result}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
  };
}

// ─── D2: "X ist Y% von welcher Zahl?" or harder percentages ─

function generateMediumPercent(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 1);

  if (variant === 0) {
    // Harder percentage values
    const percentages = [15, 30, 35, 40, 60, 75];
    const p = pick(percentages);
    const base = pick([80, 100, 120, 200, 250, 300, 400, 500]);
    const result = (p / 100) * base;

    if (result !== Math.round(result)) {
      return generateMediumPercent(difficulty); // re-roll for clean answer
    }

    return {
      id: genId('k6-proz'),
      topicId: 'k6-prozentrechnung-einfuehrung',
      question: `Was sind ${p}% von ${base}?`,
      questionLatex: `${p}\\% \\text{ von } ${base} = ?`,
      answerType: 'number',
      correctAnswer: result,
      distractors: [result + 5, result - 5, Math.round(result * 1.5)].filter(d => d > 0 && d !== result).slice(0, 3),
      hint: `Berechne zuerst 1% von ${base} (= ${base / 100}), dann multipliziere mit ${p}.`,
      explanation: `${p}% von ${base} = ${base} \u00D7 ${p}/100 = ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
    };
  } else {
    // "X ist Y% von welcher Zahl?"
    const p = pick([10, 20, 25, 50]);
    const grundwert = pick([40, 60, 80, 100, 120, 200, 400]);
    const prozentwert = (p / 100) * grundwert;

    return {
      id: genId('k6-proz'),
      topicId: 'k6-prozentrechnung-einfuehrung',
      question: `${prozentwert} ist ${p}% von welcher Zahl?`,
      questionLatex: `${prozentwert} = ${p}\\% \\text{ von } ?`,
      answerType: 'number',
      correctAnswer: grundwert,
      distractors: [grundwert + 20, prozentwert * 2, grundwert - 20].filter(d => d > 0 && d !== grundwert).slice(0, 3),
      hint: `Wenn ${prozentwert} gleich ${p}% ist, dann ist 1% = ${prozentwert / p}. Also 100% = ?`,
      explanation: `${prozentwert} = ${p}% \u2192 Grundwert = ${prozentwert} \u00D7 100 / ${p} = ${grundwert}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  }
}

// ─── D3: Mixed problems (Prozentwert, Grundwert, Prozentsatz) ─

function generateAdvancedPercent(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 2);

  if (variant === 0) {
    // Find Prozentsatz
    const grundwert = pick([50, 80, 100, 120, 150, 200, 250, 400]);
    const prozentwert = pick([10, 15, 20, 25, 30, 40, 50, 60, 75]);
    // Make sure it results in a clean percentage
    const prozentsatz = (prozentwert / grundwert) * 100;
    if (prozentsatz !== Math.round(prozentsatz)) {
      return generateAdvancedPercent(difficulty);
    }

    return {
      id: genId('k6-proz'),
      topicId: 'k6-prozentrechnung-einfuehrung',
      question: `${prozentwert} von ${grundwert} sind wie viel Prozent?`,
      questionLatex: `\\frac{${prozentwert}}{${grundwert}} = ?\\%`,
      answerType: 'number',
      correctAnswer: prozentsatz,
      distractors: [prozentsatz + 5, prozentsatz + 10, prozentsatz > 10 ? prozentsatz - 5 : prozentsatz + 15].filter(d => d > 0 && d !== prozentsatz).slice(0, 3),
      hint: `Prozentsatz = Prozentwert \u00F7 Grundwert \u00D7 100.`,
      explanation: `Prozentsatz = ${prozentwert} \u00F7 ${grundwert} \u00D7 100 = ${prozentsatz}%.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  } else if (variant === 1) {
    // Find Grundwert with harder numbers
    const p = pick([12, 15, 24, 30, 40, 60]);
    const grundwert = pick([50, 75, 100, 125, 150, 200, 250, 300, 500]);
    const prozentwert = (p / 100) * grundwert;
    if (prozentwert !== Math.round(prozentwert)) {
      return generateAdvancedPercent(difficulty);
    }

    return {
      id: genId('k6-proz'),
      topicId: 'k6-prozentrechnung-einfuehrung',
      question: `${prozentwert} ist ${p}% einer Zahl. Wie groß ist die Zahl?`,
      questionLatex: `${prozentwert} = ${p}\\% \\cdot G,\\quad G = ?`,
      answerType: 'number',
      correctAnswer: grundwert,
      distractors: [grundwert + 50, prozentwert * 10, grundwert * 2].filter(d => d > 0 && d !== grundwert).slice(0, 3),
      hint: `Grundwert = Prozentwert \u00D7 100 \u00F7 Prozentsatz.`,
      explanation: `G = ${prozentwert} \u00D7 100 \u00F7 ${p} = ${grundwert}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  } else {
    // Find Prozentwert with harder numbers
    const p = pick([12, 15, 18, 24, 35, 45, 60, 75]);
    const grundwert = pick([80, 120, 160, 200, 250, 300, 400, 500]);
    const prozentwert = (p / 100) * grundwert;
    if (prozentwert !== Math.round(prozentwert)) {
      return generateAdvancedPercent(difficulty);
    }

    return {
      id: genId('k6-proz'),
      topicId: 'k6-prozentrechnung-einfuehrung',
      question: `Berechne ${p}% von ${grundwert}.`,
      questionLatex: `${p}\\% \\text{ von } ${grundwert} = ?`,
      answerType: 'number',
      correctAnswer: prozentwert,
      distractors: [prozentwert + 10, grundwert - prozentwert, Math.round(prozentwert * 1.5)].filter(d => d > 0 && d !== prozentwert).slice(0, 3),
      hint: `1% von ${grundwert} = ${grundwert / 100}. Dann ${p} \u00D7 ${grundwert / 100} = ?`,
      explanation: `${p}% von ${grundwert} = ${grundwert} \u00D7 ${p} / 100 = ${prozentwert}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  }
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-prozentrechnung-einfuehrung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateSimplePercent(1);
    if (difficulty === 2) return generateMediumPercent(2);
    return generateAdvancedPercent(3);
  },
};
