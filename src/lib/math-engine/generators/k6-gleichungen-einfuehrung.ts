import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── x + a = b ───────────────────────────────────────────────

function generateAddGleichung(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 50);
  const x = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 50);
  const b = x + a;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: x + ${a} = ${b}`,
    questionLatex: `x + ${a} = ${b}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Ziehe ${a} auf beiden Seiten ab.`,
    explanation: `x + ${a} = ${b}  |  −${a}\nx = ${b} − ${a} = ${x}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    equationConfig: { left: `x + ${a}`, right: `${b}`, variable: 'x', target: x },
  };
}

// ─── x − a = b ───────────────────────────────────────────────

function generateSubGleichung(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 40);
  const x = randInt(a + 1, a + (difficulty === 1 ? 10 : difficulty === 2 ? 20 : 40));
  const b = x - a;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: x − ${a} = ${b}`,
    questionLatex: `x - ${a} = ${b}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Addiere ${a} auf beiden Seiten.`,
    explanation: `x − ${a} = ${b}  |  +${a}\nx = ${b} + ${a} = ${x}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    equationConfig: { left: `x − ${a}`, right: `${b}`, variable: 'x', target: x },
  };
}

// ─── a · x = b ───────────────────────────────────────────────

function generateMulGleichung(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 10 : 12);
  const x = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20);
  const b = a * x;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: ${a}x = ${b}`,
    questionLatex: `${a}x = ${b}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Teile beide Seiten durch ${a}.`,
    explanation: `${a}x = ${b}  |  :${a}\nx = ${b} / ${a} = ${x}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    equationConfig: { left: `${a}x`, right: `${b}`, variable: 'x', target: x },
  };
}

// ─── x / a = b ───────────────────────────────────────────────

function generateDivGleichung(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 12);
  const b = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20);
  const x = a * b;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: x / ${a} = ${b}`,
    questionLatex: `\\frac{x}{${a}} = ${b}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Multipliziere beide Seiten mit ${a}.`,
    explanation: `x / ${a} = ${b}  |  ·${a}\nx = ${b} · ${a} = ${x}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    equationConfig: { left: `x/${a}`, right: `${b}`, variable: 'x', target: x },
  };
}

// ─── ax + b = c (zweischrittig) ──────────────────────────────

function generateZweischritt(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 2 ? 6 : 10);
  const x = randInt(1, difficulty === 2 ? 10 : 15);
  const b = randInt(1, difficulty === 2 ? 10 : 20);
  const c = a * x + b;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: ${a}x + ${b} = ${c}`,
    questionLatex: `${a}x + ${b} = ${c}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Schritt 1: Ziehe ${b} auf beiden Seiten ab. Schritt 2: Teile durch ${a}.`,
    explanation: `${a}x + ${b} = ${c}  |  −${b}\n${a}x = ${c - b}  |  :${a}\nx = ${(c - b) / a}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 2 ? 35 : 45,
    exerciseType: 'number-input',
    equationConfig: { left: `${a}x + ${b}`, right: `${c}`, variable: 'x', target: x },
  };
}

// ─── ax − b = c (zweischrittig mit Subtraktion) ─────────────

function generateZweischrittSub(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 2 ? 6 : 10);
  const x = randInt(2, difficulty === 2 ? 10 : 15);
  const b = randInt(1, a * x - 1);
  const c = a * x - b;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Löse die Gleichung: ${a}x − ${b} = ${c}`,
    questionLatex: `${a}x - ${b} = ${c}`,
    answerType: 'number',
    correctAnswer: x,
    hint: `Schritt 1: Addiere ${b} auf beiden Seiten. Schritt 2: Teile durch ${a}.`,
    explanation: `${a}x − ${b} = ${c}  |  +${b}\n${a}x = ${c + b}  |  :${a}\nx = ${x}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 2 ? 35 : 45,
    exerciseType: 'number-input',
    equationConfig: { left: `${a}x − ${b}`, right: `${c}`, variable: 'x', target: x },
  };
}

// ─── Textaufgabe → Gleichung aufstellen ──────────────────────

function generateTextaufgabe(difficulty: 1 | 2 | 3): Exercise {
  const aufgaben: { text: string; gleichung: string; loesung: number; diff: number }[] = [
    { text: 'Ich denke an eine Zahl. Addiere ich 7, erhalte ich 15. Welche Zahl ist es?', gleichung: 'x + 7 = 15', loesung: 8, diff: 1 },
    { text: 'Ich denke an eine Zahl. Subtrahiere ich 4, erhalte ich 9. Welche Zahl ist es?', gleichung: 'x − 4 = 9', loesung: 13, diff: 1 },
    { text: 'Das Dreifache einer Zahl ergibt 18. Welche Zahl ist es?', gleichung: '3x = 18', loesung: 6, diff: 1 },
    { text: 'Ich denke an eine Zahl. Verdopple ich sie und addiere 5, erhalte ich 17. Welche Zahl ist es?', gleichung: '2x + 5 = 17', loesung: 6, diff: 2 },
    { text: 'Das Vierfache einer Zahl minus 3 ergibt 25. Welche Zahl ist es?', gleichung: '4x − 3 = 25', loesung: 7, diff: 2 },
    { text: 'Teile ich eine Zahl durch 5 und addiere 3, erhalte ich 7. Welche Zahl ist es?', gleichung: 'x/5 + 3 = 7', loesung: 20, diff: 3 },
    { text: 'Das Fünffache einer Zahl vermindert um 8 ergibt 22. Welche Zahl ist es?', gleichung: '5x − 8 = 22', loesung: 6, diff: 3 },
    { text: 'Anna ist 3-mal so alt wie Ben. Zusammen sind sie 24 Jahre alt. Wie alt ist Ben?', gleichung: 'x + 3x = 24', loesung: 6, diff: 3 },
  ];

  const pool = aufgaben.filter(a => a.diff <= difficulty);
  const chosen = pick(pool);

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: chosen.text,
    answerType: 'number',
    correctAnswer: chosen.loesung,
    hint: `Stelle zuerst eine Gleichung auf: ${chosen.gleichung}`,
    explanation: `Gleichung: ${chosen.gleichung} → x = ${chosen.loesung}`,
    difficulty,
    category: 'Konkret',
    estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 40 : 55,
    exerciseType: 'number-input',
  };
}

// ─── Probe durchführen (True/False) ──────────────────────────

function generateProbe(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, 8);
  const xCorrect = randInt(1, 10);
  const b = randInt(1, 15);
  const c = a * xCorrect + b;

  // Zufällig: richtig oder falsch
  const isCorrect = randInt(0, 1) === 0;
  const xTest = isCorrect ? xCorrect : xCorrect + pick([-2, -1, 1, 2]);

  const leftResult = a * xTest + b;

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Ist x = ${xTest} die Lösung der Gleichung ${a}x + ${b} = ${c}?`,
    answerType: 'true-false',
    correctAnswer: isCorrect ? 'wahr' : 'falsch',
    hint: `Setze x = ${xTest} ein und prüfe, ob beide Seiten gleich sind.`,
    explanation: `Einsetzen: ${a} · ${xTest} + ${b} = ${leftResult}. Rechte Seite: ${c}. ${leftResult === c ? 'Stimmt!' : 'Stimmt nicht!'}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'true-false',
  };
}

// ─── Welche Umformung? (MC) ─────────────────────────────────

function generateUmformungMC(difficulty: 1 | 2 | 3): Exercise {
  const schritte: { gleichung: string; naechster: string; falsch: string[] }[] = [
    { gleichung: 'x + 5 = 12', naechster: '−5 auf beiden Seiten', falsch: ['+5 auf beiden Seiten', '·5 auf beiden Seiten', ':5 auf beiden Seiten'] },
    { gleichung: '3x = 21', naechster: ':3 auf beiden Seiten', falsch: ['−3 auf beiden Seiten', '+3 auf beiden Seiten', '·3 auf beiden Seiten'] },
    { gleichung: 'x − 8 = 3', naechster: '+8 auf beiden Seiten', falsch: ['−8 auf beiden Seiten', '·8 auf beiden Seiten', ':8 auf beiden Seiten'] },
    { gleichung: 'x / 4 = 6', naechster: '·4 auf beiden Seiten', falsch: [':4 auf beiden Seiten', '+4 auf beiden Seiten', '−4 auf beiden Seiten'] },
    { gleichung: '2x + 3 = 11', naechster: '−3 auf beiden Seiten', falsch: [':2 auf beiden Seiten', '+3 auf beiden Seiten', '·2 auf beiden Seiten'] },
    { gleichung: '5x − 10 = 15', naechster: '+10 auf beiden Seiten', falsch: ['−10 auf beiden Seiten', ':5 auf beiden Seiten', '·5 auf beiden Seiten'] },
  ];

  const pool = difficulty === 1 ? schritte.slice(0, 3) : difficulty === 2 ? schritte.slice(0, 5) : schritte;
  const chosen = pick(pool);

  return {
    id: genId('k6-gleich'),
    topicId: 'k6-gleichungen-einfuehrung',
    question: `Gleichung: ${chosen.gleichung}. Was ist der erste sinnvolle Umformungsschritt?`,
    answerType: 'multiple-choice',
    correctAnswer: chosen.naechster,
    distractors: chosen.falsch,
    hint: 'Ziel: x alleine auf einer Seite. Welche Operation macht den Term mit x einfacher?',
    explanation: `${chosen.gleichung} → erster Schritt: ${chosen.naechster}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-gleichungen-einfuehrung',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateAddGleichung, generateSubGleichung, generateMulGleichung, generateDivGleichung, generateTextaufgabe, generateUmformungMC, generateProbe]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateAddGleichung, generateSubGleichung, generateMulGleichung, generateDivGleichung, generateZweischritt, generateZweischrittSub, generateTextaufgabe, generateUmformungMC, generateProbe]);
      return gen(d);
    } else {
      const gen = pick([generateZweischritt, generateZweischrittSub, generateTextaufgabe, generateUmformungMC, generateProbe]);
      return gen(d);
    }
  },
};
