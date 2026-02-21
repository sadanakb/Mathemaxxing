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

// ─── Exercise variants ──────────────────────────────────────

function generateRechteckFlaeche(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 1 ? 10 : difficulty === 2 ? 15 : 25);
  const b = randInt(2, difficulty === 1 ? 10 : difficulty === 2 ? 15 : 25);
  const flaeche = a * b;

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: `Berechne die Fläche eines Rechtecks mit a = ${a} cm und b = ${b} cm.`,
    questionLatex: `A = a \\times b = ${a} \\times ${b} = ?`,
    answerType: 'number',
    correctAnswer: flaeche,
    hint: 'Fläche eines Rechtecks: A = a × b',
    explanation: `A = ${a} cm × ${b} cm = ${flaeche} cm²`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'geometric-shape' as const,
      props: { shape: 'rectangle' as const, width: a, height: b, showDimensions: true },
    },
  };
}

function generateUmfangQuadrat(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(2, difficulty === 1 ? 10 : difficulty === 2 ? 20 : 50);
  const umfang = 4 * a;

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: `Berechne den Umfang eines Quadrats mit Seitenlänge a = ${a} cm.`,
    questionLatex: `U = 4 \\times a = 4 \\times ${a} = ?`,
    answerType: 'number',
    correctAnswer: umfang,
    hint: 'Umfang eines Quadrats: U = 4 × a',
    explanation: `U = 4 × ${a} cm = ${umfang} cm`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 10 : 20,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'geometric-shape' as const,
      props: { shape: 'rectangle' as const, width: a, height: a, showDimensions: true },
    },
  };
}

function generateKoerperEigenschaftMC(difficulty: 1 | 2 | 3): Exercise {
  type KoerperInfo = { name: string; ecken: number; kanten: number; flaechen: number };
  const koerper: KoerperInfo[] = [
    { name: 'Würfel', ecken: 8, kanten: 12, flaechen: 6 },
    { name: 'Quader', ecken: 8, kanten: 12, flaechen: 6 },
    { name: 'Dreiecksprisma', ecken: 6, kanten: 9, flaechen: 5 },
    { name: 'Zylinder', ecken: 0, kanten: 2, flaechen: 3 },
    { name: 'Kegel', ecken: 1, kanten: 1, flaechen: 2 },
    { name: 'Kugel', ecken: 0, kanten: 0, flaechen: 1 },
  ];

  const pool = difficulty === 1 ? koerper.slice(0, 2) : difficulty === 2 ? koerper.slice(0, 4) : koerper;
  const chosen = pick(pool);
  const eigenschaft = pick<'ecken' | 'kanten' | 'flaechen'>(['ecken', 'kanten', 'flaechen']);
  const correct = chosen[eigenschaft];

  const eigenschaftLabel =
    eigenschaft === 'ecken' ? 'Ecken' :
    eigenschaft === 'kanten' ? 'Kanten' : 'Flächen';

  // Generate distractors
  const allValues = pool.map(k => k[eigenschaft]);
  const uniqueValues = [...new Set(allValues)].filter(v => v !== correct);
  while (uniqueValues.length < 3) {
    const extra = correct + randInt(1, 4) * pick([1, -1]);
    if (extra >= 0 && !uniqueValues.includes(extra) && extra !== correct) {
      uniqueValues.push(extra);
    }
  }
  const distractors = shuffle(uniqueValues).slice(0, 3).map(String);

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: `Wie viele ${eigenschaftLabel} hat ein ${chosen.name}?`,
    answerType: 'multiple-choice',
    correctAnswer: String(correct),
    distractors,
    hint: `Stelle dir einen ${chosen.name} vor und zähle die ${eigenschaftLabel}.`,
    explanation: `Ein ${chosen.name} hat ${correct} ${eigenschaftLabel}.`,
    difficulty,
    category: 'Konkret',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'multiple-choice',
  };
}

function generateDreieckFlaeche(difficulty: 1 | 2 | 3): Exercise {
  // Difficulty 2+: Dreiecke
  const a = randInt(3, difficulty === 2 ? 12 : 20);
  const h = randInt(2, difficulty === 2 ? 10 : 16);
  // Ensure even product for clean division
  const base = a % 2 === 0 || h % 2 === 0 ? a : a + 1;
  const flaeche = (base * h) / 2;

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: `Berechne die Fläche eines Dreiecks mit Grundseite a = ${base} cm und Höhe h = ${h} cm.`,
    questionLatex: `A = \\frac{a \\times h}{2} = \\frac{${base} \\times ${h}}{2} = ?`,
    answerType: 'number',
    correctAnswer: flaeche,
    hint: 'Fläche eines Dreiecks: A = (a × h) ÷ 2',
    explanation: `A = (${base} × ${h}) ÷ 2 = ${base * h} ÷ 2 = ${flaeche} cm²`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 30,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'geometric-shape' as const,
      props: { shape: 'triangle' as const, sideA: base, height: h, showDimensions: true },
    },
  };
}

function generateFormFormelMatch(difficulty: 1 | 2 | 3): Exercise {
  // Ordne zu: Form → Formel (drag-match)
  const allPairs: [string, string][] = [
    ['Rechteck (Fläche)', 'a × b'],
    ['Quadrat (Fläche)', 'a × a'],
    ['Dreieck (Fläche)', 'a × h ÷ 2'],
    ['Rechteck (Umfang)', '2 × (a + b)'],
    ['Quadrat (Umfang)', '4 × a'],
    ['Parallelogramm (Fläche)', 'a × h'],
  ];

  const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const selectedPairs = shuffle(allPairs).slice(0, count) as [string, string][];

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: 'Ordne jeder Form die richtige Formel zu.',
    answerType: 'matching',
    correctAnswer: selectedPairs.map(([f, r]) => `${f} → ${r}`).join('; '),
    pairs: selectedPairs,
    hint: 'Erinnere dich an die Formeln für Flächen und Umfänge.',
    explanation: selectedPairs.map(([f, r]) => `${f} → ${r}`).join('\n'),
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 30 : difficulty === 2 ? 40 : 50,
    exerciseType: 'drag-match',
  };
}

function generateWelcherKoerperMC(_difficulty: 1 | 2 | 3): Exercise {
  // Welcher Körper hat X Flächen?
  const questions: { frage: string; antwort: string; falsch: string[] }[] = [
    { frage: 'Welcher Körper hat genau 6 Flächen, die alle gleich groß sind?', antwort: 'Würfel', falsch: ['Quader', 'Dreiecksprisma', 'Zylinder'] },
    { frage: 'Welcher Körper hat keine Ecken und keine Kanten?', antwort: 'Kugel', falsch: ['Zylinder', 'Kegel', 'Würfel'] },
    { frage: 'Welcher Körper hat genau 5 Flächen?', antwort: 'Dreiecksprisma', falsch: ['Würfel', 'Quader', 'Kegel'] },
    { frage: 'Welcher Körper hat eine Spitze und eine runde Grundfläche?', antwort: 'Kegel', falsch: ['Zylinder', 'Kugel', 'Dreiecksprisma'] },
    { frage: 'Welcher Körper hat 2 runde Flächen und keine Ecken?', antwort: 'Zylinder', falsch: ['Kegel', 'Kugel', 'Quader'] },
  ];
  const q = pick(questions);

  return {
    id: genId('k5-flk'),
    topicId: 'k5-flaechen-koerper',
    question: q.frage,
    answerType: 'multiple-choice',
    correctAnswer: q.antwort,
    distractors: q.falsch,
    hint: 'Überlege dir die Eigenschaften jedes Körpers.',
    explanation: `Die richtige Antwort ist: ${q.antwort}.`,
    difficulty: _difficulty,
    category: 'Konkret',
    estimatedSeconds: 20,
    exerciseType: 'multiple-choice',
  };
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k5-flaechen-koerper',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateRechteckFlaeche, generateUmfangQuadrat, generateKoerperEigenschaftMC]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateDreieckFlaeche, generateFormFormelMatch, generateKoerperEigenschaftMC, generateRechteckFlaeche]);
      return gen(d);
    } else {
      const gen = pick([generateDreieckFlaeche, generateFormFormelMatch, generateWelcherKoerperMC, generateRechteckFlaeche]);
      return gen(d);
    }
  },
};
