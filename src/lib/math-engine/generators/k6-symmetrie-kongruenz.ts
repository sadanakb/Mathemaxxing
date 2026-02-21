import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Achsensymmetrie – gespiegelten Punkt berechnen ──────────

function generateAchsensymmetriePunkt(difficulty: 1 | 2 | 3): Exercise {
  const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const x = pick([-1, 1]) * randInt(1, maxCoord);
  const y = pick([-1, 1]) * randInt(1, maxCoord);
  const achse = pick<'x' | 'y'>(['x', 'y']);

  let newX: number, newY: number;
  if (achse === 'y') {
    newX = -x;
    newY = y;
  } else {
    newX = x;
    newY = -y;
  }

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Spiegele den Punkt P(${x}|${y}) an der ${achse}-Achse. Gib die Koordinaten des Bildpunkts an. Format: (x|y)`,
    answerType: 'text',
    correctAnswer: `(${newX}|${newY})`,
    hint: achse === 'y'
      ? 'Bei Spiegelung an der y-Achse ändert sich nur das Vorzeichen der x-Koordinate.'
      : 'Bei Spiegelung an der x-Achse ändert sich nur das Vorzeichen der y-Koordinate.',
    explanation: `P(${x}|${y}) an der ${achse}-Achse gespiegelt → P'(${newX}|${newY})`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'text-input',
    gridConfig: {
      width: maxCoord * 2 + 1,
      height: maxCoord * 2 + 1,
      points: [
        { x, y, label: 'P' },
        { x: newX, y: newY, label: "P'" },
      ],
    },
  };
}

// ─── Punktsymmetrie – am Ursprung spiegeln ───────────────────

function generatePunktsymmetrie(difficulty: 1 | 2 | 3): Exercise {
  const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
  const x = pick([-1, 1]) * randInt(1, maxCoord);
  const y = pick([-1, 1]) * randInt(1, maxCoord);

  // Punktsymmetrie am Ursprung: beide Koordinaten negieren
  const newX = -x;
  const newY = -y;

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Spiegele den Punkt P(${x}|${y}) am Ursprung (0|0). Gib die Koordinaten des Bildpunkts an. Format: (x|y)`,
    answerType: 'text',
    correctAnswer: `(${newX}|${newY})`,
    hint: 'Bei Punktspiegelung am Ursprung werden beide Koordinaten negiert: (x|y) → (−x|−y).',
    explanation: `P(${x}|${y}) → P'(${newX}|${newY})`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'text-input',
    gridConfig: {
      width: maxCoord * 2 + 1,
      height: maxCoord * 2 + 1,
      points: [
        { x, y, label: 'P' },
        { x: newX, y: newY, label: "P'" },
      ],
    },
  };
}

// ─── Symmetrieart erkennen (MC) ──────────────────────────────

function generateSymmetrieMC(difficulty: 1 | 2 | 3): Exercise {
  const figuren: { name: string; achsen: number; punkt: boolean }[] = [
    { name: 'Quadrat', achsen: 4, punkt: true },
    { name: 'Rechteck (kein Quadrat)', achsen: 2, punkt: true },
    { name: 'gleichseitiges Dreieck', achsen: 3, punkt: false },
    { name: 'gleichschenkliges Dreieck', achsen: 1, punkt: false },
    { name: 'regelmäßiges Sechseck', achsen: 6, punkt: true },
    { name: 'Kreis', achsen: -1, punkt: true }, // unendlich viele Achsen
    { name: 'Parallelogramm (kein Rechteck)', achsen: 0, punkt: true },
    { name: 'allgemeines Dreieck', achsen: 0, punkt: false },
  ];

  const pool = difficulty === 1 ? figuren.slice(0, 4) : difficulty === 2 ? figuren.slice(0, 6) : figuren;
  const chosen = pick(pool);

  const frageTyp = randInt(0, 1);

  if (frageTyp === 0) {
    // Frage nach Achsensymmetrie
    const achsenText = chosen.achsen === -1 ? 'unendlich viele' : `${chosen.achsen}`;
    const correct = chosen.achsen > 0 || chosen.achsen === -1 ? 'ja' : 'nein';
    return {
      id: genId('k6-sym'),
      topicId: 'k6-symmetrie-kongruenz',
      question: `Ist ein ${chosen.name} achsensymmetrisch?`,
      answerType: 'multiple-choice',
      correctAnswer: correct,
      distractors: correct === 'ja' ? ['nein'] : ['ja'],
      hint: 'Achsensymmetrisch = es gibt mindestens eine Spiegelachse, die die Figur auf sich selbst abbildet.',
      explanation: `Ein ${chosen.name} hat ${achsenText} Symmetrieachse(n) → ${correct}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'multiple-choice',
    };
  } else {
    // Frage nach Punktsymmetrie
    const correct = chosen.punkt ? 'ja' : 'nein';
    return {
      id: genId('k6-sym'),
      topicId: 'k6-symmetrie-kongruenz',
      question: `Ist ein ${chosen.name} punktsymmetrisch?`,
      answerType: 'multiple-choice',
      correctAnswer: correct,
      distractors: correct === 'ja' ? ['nein'] : ['ja'],
      hint: 'Punktsymmetrisch = es gibt einen Punkt, bei dessen Drehung um 180° die Figur auf sich selbst abbildet.',
      explanation: `Ein ${chosen.name} ist ${chosen.punkt ? '' : 'nicht '}punktsymmetrisch.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'multiple-choice',
    };
  }
}

// ─── Anzahl der Symmetrieachsen ──────────────────────────────

function generateAnzahlAchsen(difficulty: 1 | 2 | 3): Exercise {
  const figuren: { name: string; achsen: number }[] = [
    { name: 'Quadrat', achsen: 4 },
    { name: 'Rechteck (kein Quadrat)', achsen: 2 },
    { name: 'gleichseitiges Dreieck', achsen: 3 },
    { name: 'gleichschenkliges Dreieck', achsen: 1 },
    { name: 'regelmäßiges Sechseck', achsen: 6 },
    { name: 'regelmäßiges Fünfeck', achsen: 5 },
    { name: 'Raute (kein Quadrat)', achsen: 2 },
    { name: 'Parallelogramm (kein Rechteck)', achsen: 0 },
  ];

  const pool = difficulty === 1 ? figuren.slice(0, 4) : difficulty === 2 ? figuren.slice(0, 6) : figuren;
  const chosen = pick(pool);

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Wie viele Symmetrieachsen hat ein ${chosen.name}?`,
    answerType: 'number',
    correctAnswer: chosen.achsen,
    hint: 'Zeichne die Figur und versuche, Spiegelachsen zu finden.',
    explanation: `Ein ${chosen.name} hat ${chosen.achsen} Symmetrieachse(n).`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'number-input',
  };
}

// ─── Kongruenzabbildung erkennen (MC) ────────────────────────

function generateKongruenzMC(difficulty: 1 | 2 | 3): Exercise {
  const abbildungen: { name: string; kongruenz: boolean }[] = [
    { name: 'Verschiebung (Translation)', kongruenz: true },
    { name: 'Drehung (Rotation)', kongruenz: true },
    { name: 'Spiegelung (Reflexion)', kongruenz: true },
    { name: 'Vergrößerung auf das Doppelte', kongruenz: false },
    { name: 'Verkleinerung auf die Hälfte', kongruenz: false },
    { name: 'Zentrische Streckung mit Faktor 3', kongruenz: false },
  ];

  const pool = difficulty === 1 ? abbildungen.slice(0, 4) : abbildungen;
  const chosen = pick(pool);
  const correct = chosen.kongruenz ? 'ja' : 'nein';

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Ist "${chosen.name}" eine Kongruenzabbildung?`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors: correct === 'ja' ? ['nein'] : ['ja'],
    hint: 'Kongruenzabbildungen ändern weder Größe noch Form der Figur.',
    explanation: `"${chosen.name}" ist ${chosen.kongruenz ? 'eine' : 'keine'} Kongruenzabbildung.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── Spiegelung an beliebiger Achse (x = k oder y = k) ──────

function generateSpiegelungAnGerade(difficulty: 1 | 2 | 3): Exercise {
  // Spiegelung an x = k (vertikale Achse)
  const k = randInt(-3, 3);
  const maxCoord = difficulty === 2 ? 8 : 10;
  const x = pick([-1, 1]) * randInt(1, maxCoord);
  const y = pick([-1, 1]) * randInt(1, maxCoord);

  // Spiegelung an x = k: newX = 2k - x, newY = y
  const newX = 2 * k - x;
  const newY = y;

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Spiegele P(${x}|${y}) an der Geraden x = ${k}. Gib die x-Koordinate des Bildpunkts an.`,
    answerType: 'number',
    correctAnswer: newX,
    hint: `Bei Spiegelung an x = ${k}: x' = 2 · ${k} − x.`,
    explanation: `x' = 2 · ${k} − ${x} = ${newX}. P'(${newX}|${newY})`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 35,
    exerciseType: 'number-input',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Jedes Quadrat ist achsensymmetrisch.', wahr: true },
    { text: 'Ein Parallelogramm ist immer achsensymmetrisch.', wahr: false },
    { text: 'Punktsymmetrie bedeutet Drehung um 180°.', wahr: true },
    { text: 'Bei einer Spiegelung bleibt die Größe der Figur erhalten.', wahr: true },
    { text: 'Ein gleichseitiges Dreieck hat genau 2 Symmetrieachsen.', wahr: false },
    { text: 'Eine Verschiebung ist eine Kongruenzabbildung.', wahr: true },
    { text: 'Ein Kreis hat unendlich viele Symmetrieachsen.', wahr: true },
    { text: 'Jede achsensymmetrische Figur ist auch punktsymmetrisch.', wahr: false },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 6) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-sym'),
    topicId: 'k6-symmetrie-kongruenz',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Denke an die Definitionen von Achsen- und Punktsymmetrie.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-symmetrie-kongruenz',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateAchsensymmetriePunkt, generateSymmetrieMC, generateAnzahlAchsen, generateKongruenzMC, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateAchsensymmetriePunkt, generatePunktsymmetrie, generateSymmetrieMC, generateAnzahlAchsen, generateKongruenzMC, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateAchsensymmetriePunkt, generatePunktsymmetrie, generateSymmetrieMC, generateAnzahlAchsen, generateKongruenzMC, generateSpiegelungAnGerade, generateTrueFalse]);
      return gen(d);
    }
  },
};
