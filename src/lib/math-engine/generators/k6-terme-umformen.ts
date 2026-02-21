import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Terme zusammenfassen (gleiche Variablen) ────────────────

function generateTermeZusammenfassen(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    // ax + bx
    const a = randInt(1, 8);
    const b = randInt(1, 8);
    const variable = pick(['x', 'y', 'a', 'n']);
    const result = a + b;
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Fasse zusammen: ${a}${variable} + ${b}${variable} = ?`,
      answerType: 'text',
      correctAnswer: `${result}${variable}`,
      hint: 'Gleiche Variablen zusammenfassen: Die Koeffizienten werden addiert.',
      explanation: `${a}${variable} + ${b}${variable} = (${a} + ${b})${variable} = ${result}${variable}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'text-input',
    };
  } else if (difficulty === 2) {
    // ax + bx + c (c ist eine Zahl ohne Variable)
    const a = randInt(1, 10);
    const b = pick([-1, 1]) * randInt(1, 8);
    const c = randInt(1, 10);
    const variable = pick(['x', 'y', 'a']);
    const koeff = a + b;
    const bStr = b > 0 ? `+ ${b}${variable}` : `− ${Math.abs(b)}${variable}`;
    const resultKoeff = koeff === 1 ? '' : koeff === -1 ? '−' : `${koeff}`;
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Fasse zusammen: ${a}${variable} ${bStr} + ${c} = ?`,
      answerType: 'text',
      correctAnswer: `${koeff}${variable} + ${c}`,
      hint: 'Nur Terme mit derselben Variable können zusammengefasst werden. Zahlen ohne Variable bleiben extra.',
      explanation: `${a}${variable} ${bStr} + ${c} = ${koeff}${variable} + ${c}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      exerciseType: 'text-input',
    };
  } else {
    // ax + by + cx + dy
    const a = randInt(1, 8);
    const b = randInt(1, 8);
    const c = pick([-1, 1]) * randInt(1, 6);
    const d = pick([-1, 1]) * randInt(1, 6);
    const xKoeff = a + c;
    const yKoeff = b + d;

    const cStr = c > 0 ? `+ ${c}x` : `− ${Math.abs(c)}x`;
    const dStr = d > 0 ? `+ ${d}y` : `− ${Math.abs(d)}y`;

    let resultStr: string;
    if (yKoeff >= 0) {
      resultStr = `${xKoeff}x + ${yKoeff}y`;
    } else {
      resultStr = `${xKoeff}x − ${Math.abs(yKoeff)}y`;
    }

    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Fasse zusammen: ${a}x + ${b}y ${cStr} ${dStr} = ?`,
      answerType: 'text',
      correctAnswer: resultStr,
      hint: 'Fasse x-Terme und y-Terme getrennt zusammen.',
      explanation: `x-Terme: ${a}x ${cStr} = ${xKoeff}x. y-Terme: ${b}y ${dStr} = ${yKoeff}y. Ergebnis: ${resultStr}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
      exerciseType: 'text-input',
    };
  }
}

// ─── Termwert berechnen (Einsetzen) ──────────────────────────

function generateTermwert(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const a = randInt(2, 6);
    const b = randInt(1, 10);
    const xVal = randInt(1, 5);
    const result = a * xVal + b;
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Berechne den Termwert von ${a}x + ${b} für x = ${xVal}.`,
      answerType: 'number',
      correctAnswer: result,
      hint: `Setze x = ${xVal} ein: ${a} · ${xVal} + ${b}.`,
      explanation: `${a} · ${xVal} + ${b} = ${a * xVal} + ${b} = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else if (difficulty === 2) {
    const a = randInt(2, 8);
    const b = pick([-1, 1]) * randInt(1, 10);
    const xVal = pick([-1, 1]) * randInt(1, 5);
    const result = a * xVal + b;
    const bStr = b > 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Berechne den Termwert von ${a}x ${bStr} für x = ${xVal}.`,
      answerType: 'number',
      correctAnswer: result,
      hint: `Setze x = ${xVal} ein. Achte auf die Vorzeichen!`,
      explanation: `${a} · (${xVal}) ${bStr} = ${a * xVal} ${bStr} = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
      exerciseType: 'number-input',
    };
  } else {
    // x² + bx + c
    const xVal = pick([-1, 1]) * randInt(1, 5);
    const b = pick([-1, 1]) * randInt(1, 6);
    const c = pick([-1, 1]) * randInt(1, 10);
    const result = xVal * xVal + b * xVal + c;
    const bStr = b > 0 ? `+ ${b}x` : `− ${Math.abs(b)}x`;
    const cStr = c > 0 ? `+ ${c}` : `− ${Math.abs(c)}`;
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Berechne den Termwert von x² ${bStr} ${cStr} für x = ${xVal}.`,
      questionLatex: `x^2 ${bStr} ${cStr} \\text{ für } x = ${xVal}`,
      answerType: 'number',
      correctAnswer: result,
      hint: `Setze x = ${xVal} ein. Berechne zuerst x².`,
      explanation: `(${xVal})² ${bStr.replace('x', `·(${xVal})`)} ${cStr} = ${xVal * xVal} + ${b * xVal} ${cStr} = ${result}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
      exerciseType: 'number-input',
    };
  }
}

// ─── Klammern auflösen ──────────────────────────────────────

function generateKlammernAufloesen(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    // a(x + b) = ax + ab
    const a = randInt(2, 5);
    const b = randInt(1, 8);
    const variable = pick(['x', 'y']);
    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Löse die Klammer auf: ${a}(${variable} + ${b}) = ?`,
      answerType: 'text',
      correctAnswer: `${a}${variable} + ${a * b}`,
      hint: 'Distributivgesetz: a · (b + c) = a · b + a · c.',
      explanation: `${a}(${variable} + ${b}) = ${a} · ${variable} + ${a} · ${b} = ${a}${variable} + ${a * b}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'text-input',
    };
  } else if (difficulty === 2) {
    // a(bx + c) mit negativem c möglich
    const a = randInt(2, 6);
    const bCoeff = randInt(1, 5);
    const c = pick([-1, 1]) * randInt(1, 8);
    const variable = pick(['x', 'y']);
    const resBCoeff = a * bCoeff;
    const resC = a * c;
    const cStr = c > 0 ? `+ ${c}` : `− ${Math.abs(c)}`;
    const resCStr = resC > 0 ? `+ ${resC}` : `− ${Math.abs(resC)}`;

    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Löse die Klammer auf: ${a}(${bCoeff}${variable} ${cStr}) = ?`,
      answerType: 'text',
      correctAnswer: `${resBCoeff}${variable} ${resCStr}`,
      hint: 'Multipliziere den Faktor vor der Klammer mit jedem Term in der Klammer.',
      explanation: `${a}(${bCoeff}${variable} ${cStr}) = ${a} · ${bCoeff}${variable} + ${a} · (${c}) = ${resBCoeff}${variable} ${resCStr}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
      exerciseType: 'text-input',
    };
  } else {
    // Minusklammer: -(ax + b) oder a - (bx + c)
    const a = randInt(2, 10);
    const bCoeff = randInt(1, 6);
    const c = randInt(1, 8);
    const variable = 'x';

    const result = `${a} − ${bCoeff}${variable} − ${c}`;
    const simplified = `${a - c} − ${bCoeff}${variable}`;

    return {
      id: genId('k6-term'),
      topicId: 'k6-terme-umformen',
      question: `Löse die Klammer auf und vereinfache: ${a} − (${bCoeff}${variable} + ${c}) = ?`,
      answerType: 'text',
      correctAnswer: `${a - c} − ${bCoeff}${variable}`,
      hint: 'Minus vor der Klammer: Alle Vorzeichen in der Klammer umdrehen!',
      explanation: `${a} − (${bCoeff}${variable} + ${c}) = ${a} − ${bCoeff}${variable} − ${c} = ${a - c} − ${bCoeff}${variable}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
      exerciseType: 'text-input',
    };
  }
}

// ─── Term aufstellen ─────────────────────────────────────────

function generateTermAufstellen(difficulty: 1 | 2 | 3): Exercise {
  const aufgaben: { text: string; term: string; diff: number }[] = [
    { text: 'Das Doppelte einer Zahl x', term: '2x', diff: 1 },
    { text: 'Eine Zahl x plus 5', term: 'x + 5', diff: 1 },
    { text: 'Das Dreifache einer Zahl x minus 7', term: '3x − 7', diff: 1 },
    { text: 'Die Summe einer Zahl x und ihrem Doppelten', term: '3x', diff: 1 },
    { text: 'Das Vierfache einer Zahl x vermindert um 3', term: '4x − 3', diff: 2 },
    { text: 'Die Hälfte einer Zahl x plus das Dreifache von y', term: 'x/2 + 3y', diff: 2 },
    { text: 'Das Produkt einer Zahl x mit sich selbst', term: 'x²', diff: 2 },
    { text: 'Das Fünffache der Summe von x und 2', term: '5(x + 2)', diff: 3 },
    { text: 'Die Differenz des Quadrats von x und 9', term: 'x² − 9', diff: 3 },
    { text: 'Das Doppelte von x plus das Dreifache von x minus 10', term: '5x − 10', diff: 3 },
  ];

  const pool = aufgaben.filter(a => a.diff <= difficulty);
  const chosen = pick(pool);

  return {
    id: genId('k6-term'),
    topicId: 'k6-terme-umformen',
    question: `Stelle den Term auf: "${chosen.text}"`,
    answerType: 'text',
    correctAnswer: chosen.term,
    hint: 'Übersetze die Worte Schritt für Schritt in mathematische Zeichen.',
    explanation: `"${chosen.text}" = ${chosen.term}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 35,
    exerciseType: 'text-input',
  };
}

// ─── Äquivalente Terme erkennen (MC) ─────────────────────────

function generateAequivalentMC(difficulty: 1 | 2 | 3): Exercise {
  const sets: { original: string; aequivalent: string; falsch: string[] }[] = [
    { original: '3x + 2x', aequivalent: '5x', falsch: ['6x', '5x²', '3x²'] },
    { original: '2(x + 3)', aequivalent: '2x + 6', falsch: ['2x + 3', 'x + 6', '2x + 5'] },
    { original: '4x − x', aequivalent: '3x', falsch: ['4', '3', '4x'] },
    { original: '3(2x − 1)', aequivalent: '6x − 3', falsch: ['6x − 1', '5x − 3', '6x + 3'] },
    { original: 'x + x + x + x', aequivalent: '4x', falsch: ['x⁴', '4 + x', '4x²'] },
    { original: '−(x − 5)', aequivalent: '−x + 5', falsch: ['−x − 5', 'x − 5', 'x + 5'] },
  ];

  const pool = difficulty === 1 ? sets.slice(0, 3) : difficulty === 2 ? sets.slice(0, 5) : sets;
  const chosen = pick(pool);

  return {
    id: genId('k6-term'),
    topicId: 'k6-terme-umformen',
    question: `Welcher Term ist äquivalent zu "${chosen.original}"?`,
    answerType: 'multiple-choice',
    correctAnswer: chosen.aequivalent,
    distractors: chosen.falsch,
    hint: 'Vereinfache den gegebenen Term und vergleiche.',
    explanation: `${chosen.original} = ${chosen.aequivalent}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'multiple-choice',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: '3x + 2x = 5x', wahr: true },
    { text: '3x · 2x = 6x', wahr: false },
    { text: '2(x + 4) = 2x + 8', wahr: true },
    { text: 'x + x = x²', wahr: false },
    { text: '5x − 3x = 2x', wahr: true },
    { text: '−(a + b) = −a − b', wahr: true },
    { text: '4x und 4y können zusammengefasst werden.', wahr: false },
    { text: '3(x − 2) = 3x − 6', wahr: true },
    { text: '2x + 3 = 5x', wahr: false },
    { text: 'x · x = 2x', wahr: false },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 7) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-term'),
    topicId: 'k6-terme-umformen',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Vereinfache beide Seiten und vergleiche.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-terme-umformen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateTermeZusammenfassen, generateTermwert, generateKlammernAufloesen, generateTermAufstellen, generateAequivalentMC, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateTermeZusammenfassen, generateTermwert, generateKlammernAufloesen, generateTermAufstellen, generateAequivalentMC, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateTermeZusammenfassen, generateTermwert, generateKlammernAufloesen, generateTermAufstellen, generateAequivalentMC, generateTrueFalse]);
      return gen(d);
    }
  },
};
