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

function getQuadrant(x: number, y: number): string {
  if (x > 0 && y > 0) return 'I';
  if (x < 0 && y > 0) return 'II';
  if (x < 0 && y < 0) return 'III';
  if (x > 0 && y < 0) return 'IV';
  return 'Achse'; // on an axis
}

// ─── Exercise variants ──────────────────────────────────────

function generateQuadrantMC(difficulty: 1 | 2 | 3): Exercise {
  // Welcher Quadrant enthält den Punkt?
  let x: number, y: number;
  if (difficulty === 1) {
    // Only positive coordinates (Quadrant I)
    x = randInt(1, 6);
    y = randInt(1, 6);
  } else if (difficulty === 2) {
    // All 4 quadrants
    x = pick([-1, 1]) * randInt(1, 8);
    y = pick([-1, 1]) * randInt(1, 8);
  } else {
    x = pick([-1, 1]) * randInt(1, 10);
    y = pick([-1, 1]) * randInt(1, 10);
  }

  const correct = getQuadrant(x, y);
  const allQuadrants = ['I', 'II', 'III', 'IV'];
  const distractors = allQuadrants.filter(q => q !== correct);

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `In welchem Quadranten liegt der Punkt (${x}|${y})?`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors,
    hint: `Beachte die Vorzeichen: x ist ${x >= 0 ? 'positiv' : 'negativ'}, y ist ${y >= 0 ? 'positiv' : 'negativ'}.`,
    explanation: `(${x}|${y}): x ${x > 0 ? '> 0' : '< 0'}, y ${y > 0 ? '> 0' : '< 0'} → Quadrant ${correct}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'multiple-choice',
  };
}

function generateQuadrantBeschreibungMC(difficulty: 1 | 2 | 3): Exercise {
  // In welchem Quadrant liegt ein Punkt mit beschriebenen Vorzeichen?
  const beschreibungen: { text: string; quadrant: string }[] = [
    { text: 'positiver x-Koordinate und positiver y-Koordinate', quadrant: 'I' },
    { text: 'negativer x-Koordinate und positiver y-Koordinate', quadrant: 'II' },
    { text: 'negativer x-Koordinate und negativer y-Koordinate', quadrant: 'III' },
    { text: 'positiver x-Koordinate und negativer y-Koordinate', quadrant: 'IV' },
  ];

  const chosen = pick(beschreibungen);
  const allQuadrants = ['I', 'II', 'III', 'IV'];
  const distractors = allQuadrants.filter(q => q !== chosen.quadrant);

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `In welchem Quadranten liegt ein Punkt mit ${chosen.text}?`,
    answerType: 'multiple-choice',
    correctAnswer: chosen.quadrant,
    distractors,
    hint: 'Merke dir: Q I (+/+), Q II (−/+), Q III (−/−), Q IV (+/−)',
    explanation: `${chosen.text} → Quadrant ${chosen.quadrant}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'multiple-choice',
  };
}

function generateKoordinatenAblesen(difficulty: 1 | 2 | 3): Exercise {
  // Lies die Koordinaten des Punkts ab (number-input, we ask for x-coordinate)
  const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const allowNeg = difficulty >= 2;

  const x = allowNeg ? pick([-1, 1]) * randInt(1, maxCoord) : randInt(1, maxCoord);
  const y = allowNeg ? pick([-1, 1]) * randInt(1, maxCoord) : randInt(1, maxCoord);

  const askForX = randInt(0, 1) === 0;
  const correct = askForX ? x : y;
  const koordLabel = askForX ? 'x' : 'y';

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `Ein Punkt liegt bei (${x}|${y}). Wie lautet die ${koordLabel}-Koordinate?`,
    answerType: 'number',
    correctAnswer: correct,
    hint: `Die ${koordLabel}-Koordinate ist der ${askForX ? 'erste' : 'zweite'} Wert im Klammerpaar.`,
    explanation: `Punkt (${x}|${y}) → ${koordLabel}-Koordinate = ${correct}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 10 : 20,
    exerciseType: 'number-input',
    gridConfig: {
      width: maxCoord * 2 + 1,
      height: maxCoord * 2 + 1,
      points: [{ x, y, label: 'P' }],
    },
  };
}

function generateSpiegelung(difficulty: 1 | 2 | 3): Exercise {
  // Spiegele den Punkt an der x-Achse oder y-Achse
  const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const x = pick([-1, 1]) * randInt(1, maxCoord);
  const y = pick([-1, 1]) * randInt(1, maxCoord);
  const achse = pick<'x' | 'y'>(['x', 'y']);

  let newX: number, newY: number;
  if (achse === 'x') {
    newX = x;
    newY = -y;
  } else {
    newX = -x;
    newY = y;
  }

  // Ask for one coordinate of the reflected point
  const askForX = randInt(0, 1) === 0;
  const correct = askForX ? newX : newY;
  const koordLabel = askForX ? 'x' : 'y';

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `Spiegele den Punkt (${x}|${y}) an der ${achse}-Achse. Wie lautet die ${koordLabel}-Koordinate des gespiegelten Punkts?`,
    answerType: 'number',
    correctAnswer: correct,
    hint: achse === 'x'
      ? 'Bei Spiegelung an der x-Achse ändert sich nur das Vorzeichen der y-Koordinate.'
      : 'Bei Spiegelung an der y-Achse ändert sich nur das Vorzeichen der x-Koordinate.',
    explanation: `(${x}|${y}) gespiegelt an der ${achse}-Achse = (${newX}|${newY}) → ${koordLabel} = ${correct}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 35,
    exerciseType: 'number-input',
  };
}

function generatePunktAufGrid(difficulty: 1 | 2 | 3): Exercise {
  // Trage den Punkt ins Koordinatensystem ein (drag-onto-grid)
  const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const allowNeg = difficulty >= 2;

  const x = allowNeg ? pick([-1, 1]) * randInt(1, maxCoord) : randInt(0, maxCoord);
  const y = allowNeg ? pick([-1, 1]) * randInt(1, maxCoord) : randInt(0, maxCoord);

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `Trage den Punkt P(${x}|${y}) in das Koordinatensystem ein.`,
    answerType: 'text',
    correctAnswer: `(${x}|${y})`,
    hint: `Gehe auf der x-Achse zu ${x}, dann auf der y-Achse zu ${y}.`,
    explanation: `Der Punkt P liegt bei (${x}|${y}).`,
    difficulty,
    category: 'Repräsentational',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'drag-onto-grid',
    gridConfig: {
      width: maxCoord * 2 + 1,
      height: maxCoord * 2 + 1,
      points: [{ x, y, label: 'P' }],
    },
  };
}

function generateAbstandBerechnen(difficulty: 1 | 2 | 3): Exercise {
  // Abstand zwischen zwei Punkten (nur achsenparallel für Klasse 6)
  const maxCoord = difficulty === 2 ? 8 : 10;

  // Generate two points that differ only in one coordinate (achsenparallel)
  const achsenparallel = randInt(0, 1) === 0; // horizontal or vertical
  const fix = pick([-1, 1]) * randInt(0, maxCoord);
  const c1 = pick([-1, 1]) * randInt(1, maxCoord);
  let c2 = pick([-1, 1]) * randInt(1, maxCoord);
  while (c2 === c1) c2 = pick([-1, 1]) * randInt(1, maxCoord);

  const x1 = achsenparallel ? c1 : fix;
  const y1 = achsenparallel ? fix : c1;
  const x2 = achsenparallel ? c2 : fix;
  const y2 = achsenparallel ? fix : c2;
  const abstand = Math.abs(achsenparallel ? c2 - c1 : c2 - c1);

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `Berechne den Abstand zwischen A(${x1}|${y1}) und B(${x2}|${y2}).`,
    answerType: 'number',
    correctAnswer: abstand,
    hint: 'Die Punkte liegen auf einer Linie. Berechne die Differenz der sich ändernden Koordinate.',
    explanation: achsenparallel
      ? `|${c2} − ${c1}| = ${abstand}`
      : `|${c2} − ${c1}| = ${abstand}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 2 ? 30 : 40,
    exerciseType: 'number-input',
    gridConfig: {
      width: maxCoord * 2 + 1,
      height: maxCoord * 2 + 1,
      points: [
        { x: x1, y: y1, label: 'A' },
        { x: x2, y: y2, label: 'B' },
      ],
    },
  };
}

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Der Punkt (0|0) liegt im Quadrant I.', wahr: false },
    { text: 'Im Quadrant III sind beide Koordinaten negativ.', wahr: true },
    { text: 'Der Punkt (-5|3) liegt im Quadrant II.', wahr: true },
    { text: 'Bei Spiegelung an der x-Achse ändert sich die x-Koordinate.', wahr: false },
    { text: 'Ein Punkt auf der y-Achse hat die x-Koordinate 0.', wahr: true },
    { text: 'Im Quadrant IV ist die y-Koordinate positiv.', wahr: false },
    { text: 'Der Punkt (3|-7) liegt im Quadrant IV.', wahr: true },
    { text: 'Die x-Achse ist die waagerechte Achse.', wahr: true },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 3) : difficulty === 2 ? aussagen.slice(0, 6) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-koo4'),
    topicId: 'k6-koordinatensystem-4-quadranten',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Erinnere dich an die Quadranten: I (+/+), II (−/+), III (−/−), IV (+/−).',
    explanation: `„${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-koordinatensystem-4-quadranten',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateQuadrantMC, generateQuadrantBeschreibungMC, generateKoordinatenAblesen, generatePunktAufGrid, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateQuadrantMC, generateKoordinatenAblesen, generateSpiegelung, generatePunktAufGrid, generateAbstandBerechnen, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateQuadrantMC, generateSpiegelung, generateAbstandBerechnen, generatePunktAufGrid, generateTrueFalse]);
      return gen(d);
    }
  },
};
