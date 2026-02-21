import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Kreisumfang berechnen ───────────────────────────────────

function generateKreisumfang(difficulty: 1 | 2 | 3): Exercise {
  let r: number;
  if (difficulty === 1) {
    r = pick([1, 2, 3, 5, 7, 10]);
  } else if (difficulty === 2) {
    r = randInt(1, 20);
  } else {
    r = randInt(1, 50);
  }

  const umfang = Math.round(2 * Math.PI * r * 100) / 100;

  return {
    id: genId('k6-krw'),
    topicId: 'k6-kreise-winkel',
    question: `Ein Kreis hat den Radius r = ${r} cm. Berechne den Umfang. (Runde auf 2 Dezimalstellen)`,
    questionLatex: `U = 2 \\cdot \\pi \\cdot r = 2 \\cdot \\pi \\cdot ${r} = \\text{?}`,
    answerType: 'number',
    correctAnswer: umfang,
    tolerance: 0.05,
    hint: 'Formel: U = 2 · π · r. Verwende π ≈ 3,14.',
    explanation: `U = 2 · π · ${r} = ${umfang.toFixed(2).replace('.', ',')} cm`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : 40,
    exerciseType: 'number-input',
  };
}

// ─── Kreisfläche berechnen ───────────────────────────────────

function generateKreisflaeche(difficulty: 1 | 2 | 3): Exercise {
  let r: number;
  if (difficulty === 1) {
    r = pick([1, 2, 3, 5, 10]);
  } else if (difficulty === 2) {
    r = randInt(1, 15);
  } else {
    r = randInt(1, 25);
  }

  const flaeche = Math.round(Math.PI * r * r * 100) / 100;

  return {
    id: genId('k6-krw'),
    topicId: 'k6-kreise-winkel',
    question: `Ein Kreis hat den Radius r = ${r} cm. Berechne den Flächeninhalt. (Runde auf 2 Dezimalstellen)`,
    questionLatex: `A = \\pi \\cdot r^2 = \\pi \\cdot ${r}^2 = \\text{?}`,
    answerType: 'number',
    correctAnswer: flaeche,
    tolerance: 0.1,
    hint: 'Formel: A = π · r². Verwende π ≈ 3,14.',
    explanation: `A = π · ${r}² = π · ${r * r} = ${flaeche.toFixed(2).replace('.', ',')} cm²`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 30 : 45,
    exerciseType: 'number-input',
  };
}

// ─── Radius / Durchmesser Beziehung ─────────────────────────

function generateRadiusDurchmesser(difficulty: 1 | 2 | 3): Exercise {
  const frageRadius = randInt(0, 1) === 0;

  if (frageRadius) {
    // Gegeben: Durchmesser, gesucht: Radius
    const d = randInt(2, difficulty === 1 ? 20 : difficulty === 2 ? 50 : 100) * 2;
    const r = d / 2;
    return {
      id: genId('k6-krw'),
      topicId: 'k6-kreise-winkel',
      question: `Der Durchmesser eines Kreises beträgt ${d} cm. Wie groß ist der Radius?`,
      answerType: 'number',
      correctAnswer: r,
      hint: 'Radius = Durchmesser / 2',
      explanation: `r = d / 2 = ${d} / 2 = ${r} cm`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
      exerciseType: 'number-input',
    };
  } else {
    // Gegeben: Radius, gesucht: Durchmesser
    const r = randInt(1, difficulty === 1 ? 10 : difficulty === 2 ? 25 : 50);
    const d = r * 2;
    return {
      id: genId('k6-krw'),
      topicId: 'k6-kreise-winkel',
      question: `Der Radius eines Kreises beträgt ${r} cm. Wie groß ist der Durchmesser?`,
      answerType: 'number',
      correctAnswer: d,
      hint: 'Durchmesser = 2 · Radius',
      explanation: `d = 2 · r = 2 · ${r} = ${d} cm`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
      exerciseType: 'number-input',
    };
  }
}

// ─── Winkelarten bestimmen (MC) ──────────────────────────────

function generateWinkelartMC(difficulty: 1 | 2 | 3): Exercise {
  let winkel: number;
  if (difficulty === 1) {
    winkel = pick([30, 45, 60, 90, 120, 150, 180]);
  } else if (difficulty === 2) {
    winkel = randInt(1, 359);
    while (winkel === 90 || winkel === 180 || winkel === 360) winkel = randInt(1, 359);
  } else {
    winkel = randInt(1, 359);
  }

  let correct: string;
  if (winkel < 90) correct = 'spitzer Winkel';
  else if (winkel === 90) correct = 'rechter Winkel';
  else if (winkel < 180) correct = 'stumpfer Winkel';
  else if (winkel === 180) correct = 'gestreckter Winkel';
  else correct = 'überstumpfer Winkel';

  const allTypes = ['spitzer Winkel', 'rechter Winkel', 'stumpfer Winkel', 'gestreckter Winkel', 'überstumpfer Winkel'];
  const distractors = allTypes.filter(t => t !== correct).slice(0, 3);

  return {
    id: genId('k6-krw'),
    topicId: 'k6-kreise-winkel',
    question: `Wie heißt ein Winkel mit ${winkel}°?`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors,
    hint: 'spitz: < 90°, recht: = 90°, stumpf: 90° < α < 180°, gestreckt: = 180°, überstumpf: > 180°.',
    explanation: `${winkel}° ist ein ${correct}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── Winkelsumme im Dreieck ─────────────────────────────────

function generateWinkelsummeDreieck(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    const alpha = randInt(30, 80);
    const beta = randInt(30, 180 - alpha - 10);
    const gamma = 180 - alpha - beta;
    return {
      id: genId('k6-krw'),
      topicId: 'k6-kreise-winkel',
      question: `In einem Dreieck sind α = ${alpha}° und β = ${beta}°. Wie groß ist γ?`,
      questionLatex: `\\alpha = ${alpha}°, \\; \\beta = ${beta}° \\implies \\gamma = \\text{?}`,
      answerType: 'number',
      correctAnswer: gamma,
      hint: 'Die Winkelsumme im Dreieck beträgt immer 180°.',
      explanation: `γ = 180° − ${alpha}° − ${beta}° = ${gamma}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else if (difficulty === 2) {
    // Gleichschenkliges Dreieck
    const basis = randInt(30, 120);
    const schenkel = (180 - basis) / 2;
    const frageSchenkel = randInt(0, 1) === 0;
    if (frageSchenkel) {
      return {
        id: genId('k6-krw'),
        topicId: 'k6-kreise-winkel',
        question: `Ein gleichschenkliges Dreieck hat einen Basiswinkel von ${basis}°. Wie groß sind die beiden Schenkelwinkel jeweils?`,
        answerType: 'number',
        correctAnswer: schenkel,
        hint: 'Gleichschenkliges Dreieck: Die zwei Schenkelwinkel sind gleich groß. Winkelsumme = 180°.',
        explanation: `Schenkelwinkel = (180° − ${basis}°) / 2 = ${schenkel}°`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
        exerciseType: 'number-input',
      };
    } else {
      return {
        id: genId('k6-krw'),
        topicId: 'k6-kreise-winkel',
        question: `Ein gleichschenkliges Dreieck hat Schenkelwinkel von je ${schenkel}°. Wie groß ist der Basiswinkel?`,
        answerType: 'number',
        correctAnswer: basis,
        hint: 'Winkelsumme = 180°. Ziehe die beiden gleichen Schenkelwinkel ab.',
        explanation: `Basiswinkel = 180° − 2 · ${schenkel}° = ${basis}°`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
        exerciseType: 'number-input',
      };
    }
  } else {
    // Dreieck mit Angabe einer Außenwinkelbeziehung
    const alpha = randInt(25, 75);
    const beta = randInt(25, 180 - alpha - 20);
    const gamma = 180 - alpha - beta;
    // Außenwinkel an gamma
    const aussenGamma = 180 - gamma;
    return {
      id: genId('k6-krw'),
      topicId: 'k6-kreise-winkel',
      question: `In einem Dreieck sind α = ${alpha}° und β = ${beta}°. Berechne den Außenwinkel an der Ecke C.`,
      answerType: 'number',
      correctAnswer: aussenGamma,
      hint: 'Berechne zuerst γ = 180° − α − β. Der Außenwinkel ist 180° − γ.',
      explanation: `γ = 180° − ${alpha}° − ${beta}° = ${gamma}°. Außenwinkel = 180° − ${gamma}° = ${aussenGamma}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
      exerciseType: 'number-input',
    };
  }
}

// ─── Begriffe am Kreis (MC) ─────────────────────────────────

function generateKreisBegriffeMC(difficulty: 1 | 2 | 3): Exercise {
  const begriffe: { frage: string; antwort: string; falsch: string[] }[] = [
    { frage: 'Wie heißt die Strecke vom Mittelpunkt zum Kreisrand?', antwort: 'Radius', falsch: ['Durchmesser', 'Sekante', 'Tangente'] },
    { frage: 'Wie heißt die Strecke durch den Mittelpunkt von Rand zu Rand?', antwort: 'Durchmesser', falsch: ['Radius', 'Sehne', 'Tangente'] },
    { frage: 'Wie heißt eine Gerade, die den Kreis in genau einem Punkt berührt?', antwort: 'Tangente', falsch: ['Sekante', 'Sehne', 'Radius'] },
    { frage: 'Wie heißt eine Strecke, die zwei Punkte auf dem Kreisrand verbindet?', antwort: 'Sehne', falsch: ['Radius', 'Tangente', 'Sekante'] },
    { frage: 'Wie heißt eine Gerade, die den Kreis in zwei Punkten schneidet?', antwort: 'Sekante', falsch: ['Tangente', 'Sehne', 'Durchmesser'] },
    { frage: 'Wie heißt die Kreislinie?', antwort: 'Kreisumfang', falsch: ['Kreisfläche', 'Kreisdurchmesser', 'Kreisbogen'] },
  ];

  const pool = difficulty === 1 ? begriffe.slice(0, 3) : difficulty === 2 ? begriffe.slice(0, 5) : begriffe;
  const chosen = pick(pool);

  return {
    id: genId('k6-krw'),
    topicId: 'k6-kreise-winkel',
    question: chosen.frage,
    answerType: 'multiple-choice',
    correctAnswer: chosen.antwort,
    distractors: chosen.falsch,
    hint: 'Denke an die Definitionen der Begriffe am Kreis.',
    explanation: `Die richtige Antwort ist: ${chosen.antwort}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Der Durchmesser ist doppelt so lang wie der Radius.', wahr: true },
    { text: 'Ein Dreieck kann zwei rechte Winkel haben.', wahr: false },
    { text: 'Die Winkelsumme im Dreieck beträgt 360°.', wahr: false },
    { text: 'Ein gleichseitiges Dreieck hat drei 60°-Winkel.', wahr: true },
    { text: 'Eine Tangente schneidet den Kreis in zwei Punkten.', wahr: false },
    { text: 'Der Umfang eines Kreises ist U = π · d.', wahr: true },
    { text: 'Ein rechter Winkel hat genau 90°.', wahr: true },
    { text: 'Der Flächeninhalt eines Kreises ist A = 2 · π · r.', wahr: false },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 6) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-krw'),
    topicId: 'k6-kreise-winkel',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Denke an die Formeln und Eigenschaften von Kreisen und Winkeln.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-kreise-winkel',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateRadiusDurchmesser, generateKreisumfang, generateWinkelartMC, generateWinkelsummeDreieck, generateKreisBegriffeMC, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateKreisumfang, generateKreisflaeche, generateWinkelartMC, generateWinkelsummeDreieck, generateKreisBegriffeMC, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateKreisumfang, generateKreisflaeche, generateWinkelartMC, generateWinkelsummeDreieck, generateKreisBegriffeMC, generateTrueFalse]);
      return gen(d);
    }
  },
};
