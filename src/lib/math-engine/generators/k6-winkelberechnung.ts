import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Nebenwinkel berechnen ───────────────────────────────────

function generateNebenwinkel(difficulty: 1 | 2 | 3): Exercise {
  const alpha = randInt(10, 170);
  const nebenwinkel = 180 - alpha;

  return {
    id: genId('k6-wink'),
    topicId: 'k6-winkelberechnung',
    question: `Ein Winkel α beträgt ${alpha}°. Berechne den Nebenwinkel β.`,
    questionLatex: `\\alpha = ${alpha}° \\implies \\beta = \\text{?}`,
    answerType: 'number',
    correctAnswer: nebenwinkel,
    hint: 'Nebenwinkel ergänzen sich zu 180°: α + β = 180°.',
    explanation: `β = 180° − ${alpha}° = ${nebenwinkel}°`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 10 : 15,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'protractor' as const,
      props: { angle: alpha, showLabels: true },
    },
  };
}

// ─── Scheitelwinkel erkennen ─────────────────────────────────

function generateScheitelwinkel(difficulty: 1 | 2 | 3): Exercise {
  const alpha = randInt(15, 165);

  if (difficulty === 1) {
    // Einfach: Scheitelwinkel = gleich groß
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei Geraden schneiden sich. Ein Winkel beträgt ${alpha}°. Wie groß ist der Scheitelwinkel?`,
      answerType: 'number',
      correctAnswer: alpha,
      hint: 'Scheitelwinkel sind immer gleich groß.',
      explanation: `Scheitelwinkel von ${alpha}° = ${alpha}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
      exerciseType: 'number-input',
      visualConfig: {
        type: 'protractor' as const,
        props: { angle: alpha, showLabels: true },
      },
    };
  } else {
    // Alle vier Winkel an einer Kreuzung
    const nebenwinkel = 180 - alpha;
    const correct = `${alpha}°, ${nebenwinkel}°, ${alpha}°, ${nebenwinkel}°`;
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei Geraden schneiden sich. Ein Winkel beträgt ${alpha}°. Wie groß sind alle vier Winkel im Uhrzeigersinn?`,
      answerType: 'text',
      correctAnswer: correct,
      hint: 'Scheitelwinkel sind gleich groß. Nebenwinkel ergänzen sich zu 180°.',
      explanation: `Die vier Winkel: ${alpha}°, ${nebenwinkel}°, ${alpha}°, ${nebenwinkel}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      exerciseType: 'text-input',
    };
  }
}

// ─── Stufenwinkel (an parallelen Geraden) ────────────────────

function generateStufenwinkel(difficulty: 1 | 2 | 3): Exercise {
  const alpha = randInt(20, 160);

  if (difficulty <= 2) {
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei parallele Geraden werden von einer Transversale geschnitten. Ein Winkel beträgt ${alpha}°. Wie groß ist der Stufenwinkel?`,
      answerType: 'number',
      correctAnswer: alpha,
      hint: 'Stufenwinkel an parallelen Geraden sind gleich groß (F-Winkel).',
      explanation: `Stufenwinkel = ${alpha}° (an parallelen Geraden gleich groß)`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'number-input',
      visualConfig: {
        type: 'protractor' as const,
        props: { angle: alpha, showLabels: true },
      },
    };
  } else {
    // Kombination: Stufenwinkel + Nebenwinkel
    const nebenwinkel = 180 - alpha;
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei parallele Geraden werden von einer Transversale geschnitten. Winkel α = ${alpha}°. Berechne den Nebenwinkel des Stufenwinkels von α.`,
      answerType: 'number',
      correctAnswer: nebenwinkel,
      hint: 'Stufenwinkel = α. Nebenwinkel des Stufenwinkels = 180° − α.',
      explanation: `Stufenwinkel = ${alpha}°. Nebenwinkel davon = 180° − ${alpha}° = ${nebenwinkel}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
      exerciseType: 'number-input',
    };
  }
}

// ─── Wechselwinkel (an parallelen Geraden) ───────────────────

function generateWechselwinkel(difficulty: 1 | 2 | 3): Exercise {
  const alpha = randInt(20, 160);

  if (difficulty <= 2) {
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei parallele Geraden werden von einer Transversale geschnitten. Ein Winkel beträgt ${alpha}°. Wie groß ist der Wechselwinkel?`,
      answerType: 'number',
      correctAnswer: alpha,
      hint: 'Wechselwinkel an parallelen Geraden sind gleich groß (Z-Winkel).',
      explanation: `Wechselwinkel = ${alpha}° (an parallelen Geraden gleich groß)`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      exerciseType: 'number-input',
    };
  } else {
    // Kombination mit weiterem Winkel
    const nebenwinkel = 180 - alpha;
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `Zwei parallele Geraden werden von einer Transversale geschnitten. Der Nebenwinkel eines Winkels beträgt ${nebenwinkel}°. Wie groß ist der Wechselwinkel des ursprünglichen Winkels?`,
      answerType: 'number',
      correctAnswer: alpha,
      hint: 'Berechne zuerst den ursprünglichen Winkel (180° − Nebenwinkel). Der Wechselwinkel ist gleich groß.',
      explanation: `Ursprünglicher Winkel = 180° − ${nebenwinkel}° = ${alpha}°. Wechselwinkel = ${alpha}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
      exerciseType: 'number-input',
    };
  }
}

// ─── Winkelart bestimmen (MC) ────────────────────────────────

function generateWinkelartMC(difficulty: 1 | 2 | 3): Exercise {
  const paare: { beschreibung: string; antwort: string; falsch: string[] }[] = [
    { beschreibung: 'Zwei Winkel liegen nebeneinander und ergänzen sich zu 180°', antwort: 'Nebenwinkel', falsch: ['Scheitelwinkel', 'Stufenwinkel', 'Wechselwinkel'] },
    { beschreibung: 'Zwei Winkel liegen sich an einer Kreuzung gegenüber', antwort: 'Scheitelwinkel', falsch: ['Nebenwinkel', 'Stufenwinkel', 'Wechselwinkel'] },
    { beschreibung: 'Zwei Winkel liegen an parallelen Geraden auf derselben Seite der Transversale und in derselben Lage', antwort: 'Stufenwinkel', falsch: ['Nebenwinkel', 'Scheitelwinkel', 'Wechselwinkel'] },
    { beschreibung: 'Zwei Winkel liegen an parallelen Geraden auf verschiedenen Seiten der Transversale zwischen den Parallelen', antwort: 'Wechselwinkel', falsch: ['Nebenwinkel', 'Scheitelwinkel', 'Stufenwinkel'] },
  ];

  const pool = difficulty === 1 ? paare.slice(0, 2) : paare;
  const chosen = pick(pool);

  return {
    id: genId('k6-wink'),
    topicId: 'k6-winkelberechnung',
    question: `Welche Winkelbeziehung wird beschrieben? "${chosen.beschreibung}"`,
    answerType: 'multiple-choice',
    correctAnswer: chosen.antwort,
    distractors: chosen.falsch,
    hint: 'Nebenwinkel: 180°. Scheitelwinkel: gegenüber. Stufenwinkel: F-Winkel. Wechselwinkel: Z-Winkel.',
    explanation: `"${chosen.beschreibung}" → ${chosen.antwort}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    exerciseType: 'multiple-choice',
  };
}

// ─── Komplexe Winkelberechnung ───────────────────────────────

function generateKomplex(difficulty: 1 | 2 | 3): Exercise {
  // Drei Winkel an einem Punkt auf einer Geraden
  const alpha = randInt(20, 80);
  const beta = randInt(20, 160 - alpha);
  const gamma = 180 - alpha - beta;

  if (difficulty <= 2) {
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `An einem Punkt auf einer Geraden liegen drei Winkel nebeneinander. α = ${alpha}° und β = ${beta}°. Wie groß ist γ?`,
      answerType: 'number',
      correctAnswer: gamma,
      hint: 'Winkel auf einer Geraden ergeben zusammen 180°.',
      explanation: `γ = 180° − ${alpha}° − ${beta}° = ${gamma}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else {
    // Winkel an parallelen Geraden + Dreieck kombiniert
    const winkelA = randInt(30, 70);
    const winkelB = randInt(30, 130 - winkelA);
    const winkelC = 180 - winkelA - winkelB;

    // Stufenwinkel zu winkelA ist gegeben, winkelB ist gegeben → winkelC gesucht
    return {
      id: genId('k6-wink'),
      topicId: 'k6-winkelberechnung',
      question: `In einem Dreieck ist der Stufenwinkel von α an parallelen Geraden ${winkelA}° und β = ${winkelB}°. Berechne γ.`,
      answerType: 'number',
      correctAnswer: winkelC,
      hint: 'Stufenwinkel an parallelen Geraden → α = Stufenwinkel. Winkelsumme im Dreieck = 180°.',
      explanation: `α = ${winkelA}° (Stufenwinkel). γ = 180° − ${winkelA}° − ${winkelB}° = ${winkelC}°`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
      exerciseType: 'number-input',
    };
  }
}

// ─── Winkelbeziehung klassifizieren (drag-match) ─────────────

function generateZuordnung(difficulty: 1 | 2 | 3): Exercise {
  const paare: [string, string][] = [
    ['Nebenwinkel', 'ergänzen sich zu 180°'],
    ['Scheitelwinkel', 'sind gleich groß (gegenüber)'],
    ['Stufenwinkel', 'F-Winkel an parallelen Geraden'],
    ['Wechselwinkel', 'Z-Winkel an parallelen Geraden'],
  ];

  const selected = difficulty === 1 ? paare.slice(0, 2) : difficulty === 2 ? paare.slice(0, 3) : paare;

  return {
    id: genId('k6-wink'),
    topicId: 'k6-winkelberechnung',
    question: 'Ordne die Winkelbegriffe ihren Beschreibungen zu.',
    answerType: 'matching',
    correctAnswer: selected.map(([a, b]) => `${a}=${b}`).join(';'),
    pairs: selected,
    hint: 'Denke an die Merksätze: F-Winkel, Z-Winkel, Scheitelwinkel gegenüber, Nebenwinkel nebeneinander.',
    explanation: selected.map(([a, b]) => `${a} → ${b}`).join('. '),
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'drag-match',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Nebenwinkel ergänzen sich immer zu 180°.', wahr: true },
    { text: 'Scheitelwinkel sind immer gleich groß.', wahr: true },
    { text: 'Stufenwinkel sind immer gleich groß, auch wenn die Geraden nicht parallel sind.', wahr: false },
    { text: 'Wechselwinkel an parallelen Geraden ergänzen sich zu 180°.', wahr: false },
    { text: 'Zwei Nebenwinkel können beide 90° groß sein.', wahr: true },
    { text: 'Scheitelwinkel können unterschiedlich groß sein.', wahr: false },
    { text: 'Stufenwinkel werden auch F-Winkel genannt.', wahr: true },
    { text: 'Wechselwinkel werden auch Z-Winkel genannt.', wahr: true },
    { text: 'Wenn α = 60°, dann ist der Scheitelwinkel 120°.', wahr: false },
    { text: 'Stufen- und Wechselwinkel an parallelen Geraden sind gleich groß.', wahr: true },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 4) : difficulty === 2 ? aussagen.slice(0, 7) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-wink'),
    topicId: 'k6-winkelberechnung',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Denke an die Definitionen und Eigenschaften der Winkelpaare.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-winkelberechnung',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateNebenwinkel, generateScheitelwinkel, generateWinkelartMC, generateKomplex, generateZuordnung, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateNebenwinkel, generateScheitelwinkel, generateStufenwinkel, generateWechselwinkel, generateWinkelartMC, generateKomplex, generateZuordnung, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateNebenwinkel, generateScheitelwinkel, generateStufenwinkel, generateWechselwinkel, generateWinkelartMC, generateKomplex, generateZuordnung, generateTrueFalse]);
      return gen(d);
    }
  },
};
