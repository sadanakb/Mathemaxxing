import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Volumen eines Würfels ───────────────────────────────────

function generateVolumenWuerfel(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(1, difficulty === 1 ? 5 : difficulty === 2 ? 10 : 15);
  const volumen = a * a * a;

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Berechne das Volumen eines Würfels mit der Seitenlänge a = ${a} cm.`,
    questionLatex: `V = a^3 = ${a}^3 = \\text{?}`,
    answerType: 'number',
    correctAnswer: volumen,
    hint: 'Volumen eines Würfels: V = a³ = a · a · a.',
    explanation: `V = ${a}³ = ${a} · ${a} · ${a} = ${volumen} cm³`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
  };
}

// ─── Oberfläche eines Würfels ────────────────────────────────

function generateOberflaecheWuerfel(difficulty: 1 | 2 | 3): Exercise {
  const a = randInt(1, difficulty === 1 ? 5 : difficulty === 2 ? 10 : 15);
  const oberflaeche = 6 * a * a;

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Berechne die Oberfläche eines Würfels mit der Seitenlänge a = ${a} cm.`,
    questionLatex: `O = 6 \\cdot a^2 = 6 \\cdot ${a}^2 = \\text{?}`,
    answerType: 'number',
    correctAnswer: oberflaeche,
    hint: 'Oberfläche eines Würfels: O = 6 · a². Ein Würfel hat 6 gleiche quadratische Seitenflächen.',
    explanation: `O = 6 · ${a}² = 6 · ${a * a} = ${oberflaeche} cm²`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'number-input',
  };
}

// ─── Volumen eines Quaders ───────────────────────────────────

function generateVolumenQuader(difficulty: 1 | 2 | 3): Exercise {
  const l = randInt(2, difficulty === 1 ? 6 : difficulty === 2 ? 10 : 15);
  const b = randInt(2, difficulty === 1 ? 6 : difficulty === 2 ? 10 : 12);
  const h = randInt(2, difficulty === 1 ? 6 : difficulty === 2 ? 8 : 10);
  const volumen = l * b * h;

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Berechne das Volumen eines Quaders mit Länge ${l} cm, Breite ${b} cm und Höhe ${h} cm.`,
    questionLatex: `V = l \\cdot b \\cdot h = ${l} \\cdot ${b} \\cdot ${h} = \\text{?}`,
    answerType: 'number',
    correctAnswer: volumen,
    hint: 'Volumen eines Quaders: V = Länge · Breite · Höhe.',
    explanation: `V = ${l} · ${b} · ${h} = ${volumen} cm³`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'number-input',
  };
}

// ─── Oberfläche eines Quaders ────────────────────────────────

function generateOberflaecheQuader(difficulty: 1 | 2 | 3): Exercise {
  const l = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 12);
  const b = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10);
  const h = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 6 : 8);
  const oberflaeche = 2 * (l * b + l * h + b * h);

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Berechne die Oberfläche eines Quaders mit Länge ${l} cm, Breite ${b} cm und Höhe ${h} cm.`,
    questionLatex: `O = 2 \\cdot (l \\cdot b + l \\cdot h + b \\cdot h) = \\text{?}`,
    answerType: 'number',
    correctAnswer: oberflaeche,
    hint: 'O = 2 · (l·b + l·h + b·h). Ein Quader hat 3 Paare gleicher Seitenflächen.',
    explanation: `O = 2 · (${l}·${b} + ${l}·${h} + ${b}·${h}) = 2 · (${l * b} + ${l * h} + ${b * h}) = 2 · ${l * b + l * h + b * h} = ${oberflaeche} cm²`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 30 : 45,
    exerciseType: 'number-input',
  };
}

// ─── Volumen eines Prismas (dreieckige Grundfläche) ──────────

function generateVolumenPrisma(difficulty: 1 | 2 | 3): Exercise {
  const grundseite = randInt(2, difficulty === 2 ? 8 : 12);
  const hoeheDreieck = randInt(2, difficulty === 2 ? 8 : 10);
  const laengePrisma = randInt(3, difficulty === 2 ? 10 : 15);

  const grundflaeche = (grundseite * hoeheDreieck) / 2;
  const volumen = grundflaeche * laengePrisma;

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Ein Prisma hat als Grundfläche ein Dreieck mit Grundseite ${grundseite} cm und Höhe ${hoeheDreieck} cm. Die Länge des Prismas beträgt ${laengePrisma} cm. Berechne das Volumen.`,
    answerType: 'number',
    correctAnswer: volumen,
    hint: 'V = Grundfläche · Länge. Grundfläche eines Dreiecks = (g · h) / 2.',
    explanation: `Grundfläche = (${grundseite} · ${hoeheDreieck}) / 2 = ${grundflaeche} cm². V = ${grundflaeche} · ${laengePrisma} = ${volumen} cm³`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 2 ? 40 : 55,
    exerciseType: 'number-input',
  };
}

// ─── Einheiten umrechnen ─────────────────────────────────────

function generateEinheiten(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const umrechnungen: { frage: string; antwort: number; einheit: string }[] = [
      { frage: 'Wie viele cm³ sind 1 dm³?', antwort: 1000, einheit: 'cm³' },
      { frage: 'Wie viele dm³ sind 1 Liter?', antwort: 1, einheit: 'dm³' },
      { frage: 'Wie viele ml sind 1 cm³?', antwort: 1, einheit: 'ml' },
      { frage: 'Wie viele cm³ sind 1 Liter?', antwort: 1000, einheit: 'cm³' },
    ];
    const chosen = pick(umrechnungen);
    return {
      id: genId('k6-vol'),
      topicId: 'k6-volumen-oberflaeche',
      question: chosen.frage,
      answerType: 'number',
      correctAnswer: chosen.antwort,
      hint: '1 dm³ = 1000 cm³ = 1 Liter. 1 cm³ = 1 ml.',
      explanation: `${chosen.frage} → ${chosen.antwort} ${chosen.einheit}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'number-input',
    };
  } else {
    const wert = randInt(1, 10);
    const umrechnungen: { frage: string; antwort: number }[] = [
      { frage: `Rechne um: ${wert} dm³ = ? cm³`, antwort: wert * 1000 },
      { frage: `Rechne um: ${wert * 1000} cm³ = ? dm³`, antwort: wert },
      { frage: `Rechne um: ${wert} m³ = ? dm³`, antwort: wert * 1000 },
      { frage: `Rechne um: ${wert} Liter = ? cm³`, antwort: wert * 1000 },
      { frage: `Rechne um: ${wert * 1000} ml = ? Liter`, antwort: wert },
    ];
    const chosen = pick(umrechnungen);
    return {
      id: genId('k6-vol'),
      topicId: 'k6-volumen-oberflaeche',
      question: chosen.frage,
      answerType: 'number',
      correctAnswer: chosen.antwort,
      hint: '1 m³ = 1000 dm³. 1 dm³ = 1000 cm³ = 1 Liter. 1 cm³ = 1 ml.',
      explanation: `${chosen.frage} → ${chosen.antwort}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  }
}

// ─── Sachaufgabe ─────────────────────────────────────────────

function generateSachaufgabe(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const a = randInt(2, 5);
    const volumen = a * a * a;
    return {
      id: genId('k6-vol'),
      topicId: 'k6-volumen-oberflaeche',
      question: `Ein würfelförmiger Karton hat eine Seitenlänge von ${a} dm. Wie viel Liter passen hinein?`,
      answerType: 'number',
      correctAnswer: volumen,
      hint: 'Berechne das Volumen in dm³. 1 dm³ = 1 Liter.',
      explanation: `V = ${a}³ = ${volumen} dm³ = ${volumen} Liter`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 25,
      exerciseType: 'number-input',
    };
  } else if (difficulty === 2) {
    const l = randInt(3, 8);
    const b = randInt(2, 6);
    const h = randInt(2, 5);
    const volumen = l * b * h;
    return {
      id: genId('k6-vol'),
      topicId: 'k6-volumen-oberflaeche',
      question: `Ein Aquarium ist ${l} dm lang, ${b} dm breit und ${h} dm hoch. Wie viel Liter Wasser fasst es?`,
      answerType: 'number',
      correctAnswer: volumen,
      hint: 'V = l · b · h in dm³. 1 dm³ = 1 Liter.',
      explanation: `V = ${l} · ${b} · ${h} = ${volumen} dm³ = ${volumen} Liter`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 35,
      exerciseType: 'number-input',
    };
  } else {
    // Rückwärts: Volumen gegeben, eine Seite gesucht
    const l = randInt(3, 10);
    const b = randInt(2, 8);
    const h = randInt(2, 6);
    const volumen = l * b * h;
    const gesucht = pick<'l' | 'b' | 'h'>(['l', 'b', 'h']);
    const bekannt1 = gesucht === 'l' ? b : l;
    const bekannt2 = gesucht === 'h' ? b : h;
    const correct = gesucht === 'l' ? l : gesucht === 'b' ? b : h;
    const label = gesucht === 'l' ? 'Länge' : gesucht === 'b' ? 'Breite' : 'Höhe';

    return {
      id: genId('k6-vol'),
      topicId: 'k6-volumen-oberflaeche',
      question: `Ein Quader hat das Volumen ${volumen} cm³. Zwei Seiten sind ${bekannt1} cm und ${bekannt2} cm. Berechne die ${label}.`,
      answerType: 'number',
      correctAnswer: correct,
      hint: `V = l · b · h. Teile das Volumen durch die beiden bekannten Seiten.`,
      explanation: `${label} = ${volumen} / (${bekannt1} · ${bekannt2}) = ${volumen} / ${bekannt1 * bekannt2} = ${correct} cm`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
      exerciseType: 'number-input',
    };
  }
}

// ─── Formeln erkennen (MC) ──────────────────────────────────

function generateFormelMC(difficulty: 1 | 2 | 3): Exercise {
  const formeln: { frage: string; antwort: string; falsch: string[] }[] = [
    { frage: 'Welche Formel berechnet das Volumen eines Würfels?', antwort: 'V = a³', falsch: ['V = 6a²', 'V = a²', 'V = 4a³'] },
    { frage: 'Welche Formel berechnet die Oberfläche eines Würfels?', antwort: 'O = 6a²', falsch: ['O = a³', 'O = 4a²', 'O = 12a'] },
    { frage: 'Welche Formel berechnet das Volumen eines Quaders?', antwort: 'V = l · b · h', falsch: ['V = 2(lb + lh + bh)', 'V = l + b + h', 'V = l · b'] },
    { frage: 'Welche Formel berechnet die Oberfläche eines Quaders?', antwort: 'O = 2(lb + lh + bh)', falsch: ['O = l · b · h', 'O = 6 · l · b', 'O = 2l + 2b + 2h'] },
    { frage: 'Welche Formel berechnet das Volumen eines Prismas?', antwort: 'V = G · h', falsch: ['V = G + h', 'V = G²', 'V = 2G · h'] },
  ];

  const pool = difficulty === 1 ? formeln.slice(0, 3) : formeln;
  const chosen = pick(pool);

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: chosen.frage,
    answerType: 'multiple-choice',
    correctAnswer: chosen.antwort,
    distractors: chosen.falsch,
    hint: 'Erinnere dich an die Formeln für Volumen und Oberfläche.',
    explanation: `Die richtige Formel ist: ${chosen.antwort}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Das Volumen wird in cm³ gemessen.', wahr: true },
    { text: 'Die Oberfläche wird in cm³ gemessen.', wahr: false },
    { text: '1 dm³ = 1 Liter', wahr: true },
    { text: 'Ein Würfel mit Seitenlänge 2 cm hat das Volumen 6 cm³.', wahr: false },
    { text: '1 m³ = 1000 dm³', wahr: true },
    { text: 'Verdoppelt man alle Seitenlängen eines Quaders, verdoppelt sich das Volumen.', wahr: false },
    { text: 'Die Oberfläche eines Würfels mit a = 3 cm ist 54 cm².', wahr: true },
    { text: '1000 cm³ = 1 Liter', wahr: true },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 6) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-vol'),
    topicId: 'k6-volumen-oberflaeche',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Überprüfe die Aussage mit den Formeln und Einheiten.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-volumen-oberflaeche',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateVolumenWuerfel, generateOberflaecheWuerfel, generateVolumenQuader, generateEinheiten, generateSachaufgabe, generateFormelMC, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateVolumenWuerfel, generateOberflaecheWuerfel, generateVolumenQuader, generateOberflaecheQuader, generateVolumenPrisma, generateEinheiten, generateSachaufgabe, generateFormelMC, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateVolumenQuader, generateOberflaecheQuader, generateVolumenPrisma, generateEinheiten, generateSachaufgabe, generateFormelMC, generateTrueFalse]);
      return gen(d);
    }
  },
};
