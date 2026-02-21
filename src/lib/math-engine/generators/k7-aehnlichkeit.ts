import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── D1: Given scale factor, calculate missing side ─────────

function generateMissingSide(difficulty: 1 | 2 | 3): Exercise {
  const scaleFactor = pick([2, 3, 4, 5]);
  const sideA = randInt(3, 12);
  const sideB = sideA * scaleFactor;

  const askLarger = randInt(0, 1) === 0;
  const givenSide = askLarger ? sideA : sideB;
  const missingSide = askLarger ? sideB : sideA;
  const directionText = askLarger
    ? `Die kleinere Figur hat eine Seite von ${givenSide} cm. Wie lang ist die entsprechende Seite der größeren Figur?`
    : `Die größere Figur hat eine Seite von ${givenSide} cm. Wie lang ist die entsprechende Seite der kleineren Figur?`;

  return {
    id: genId('k7-aehn'),
    topicId: 'k7-aehnlichkeit',
    question: `Zwei ähnliche Dreiecke haben den Vergrößerungsfaktor k = ${scaleFactor}. ${directionText}`,
    answerType: 'number',
    correctAnswer: missingSide,
    distractors: [missingSide + scaleFactor, missingSide - 1, givenSide].filter(d => d > 0 && d !== missingSide).slice(0, 3),
    hint: askLarger
      ? `Multipliziere die Seite mit dem Faktor k = ${scaleFactor}.`
      : `Teile die Seite durch den Faktor k = ${scaleFactor}.`,
    explanation: askLarger
      ? `${givenSide} \u00D7 ${scaleFactor} = ${missingSide} cm.`
      : `${givenSide} \u00F7 ${scaleFactor} = ${missingSide} cm.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 20,
    visualConfig: {
      type: 'geometric-shape' as const,
      props: {
        shape: 'triangle',
        sides: [sideA, sideA + 2, sideA + 4],
        scaleFactor,
        showLabels: true,
      },
    },
  };
}

// ─── D2: Determine scale factor from two figures ────────────

function generateFindScaleFactor(difficulty: 1 | 2 | 3): Exercise {
  const scaleFactor = pick([2, 3, 4, 5, 6]);
  const sideSmall = randInt(2, 8);
  const sideLarge = sideSmall * scaleFactor;

  // Also provide a second pair to confirm
  const sideSmall2 = randInt(3, 10);
  const sideLarge2 = sideSmall2 * scaleFactor;

  return {
    id: genId('k7-aehn'),
    topicId: 'k7-aehnlichkeit',
    question: `Zwei ähnliche Rechtecke: Das erste hat Seiten ${sideSmall} cm und ${sideSmall2} cm. Das zweite hat Seiten ${sideLarge} cm und ${sideLarge2} cm. Wie groß ist der Vergrößerungsfaktor k?`,
    answerType: 'number',
    correctAnswer: scaleFactor,
    distractors: [scaleFactor + 1, scaleFactor - 1, scaleFactor * 2].filter(d => d > 0 && d !== scaleFactor).slice(0, 3),
    hint: `Teile eine Seite der großen Figur durch die entsprechende Seite der kleinen Figur.`,
    explanation: `k = ${sideLarge} \u00F7 ${sideSmall} = ${scaleFactor} (Probe: ${sideLarge2} \u00F7 ${sideSmall2} = ${scaleFactor} \u2713).`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 30,
    visualConfig: {
      type: 'geometric-shape' as const,
      props: {
        shape: 'rectangle',
        dimensions: [
          { width: sideSmall, height: sideSmall2 },
          { width: sideLarge, height: sideLarge2 },
        ],
        showLabels: true,
      },
    },
  };
}

// ─── D3: Multi-step with area scaling (factor squared) ──────

function generateAreaScaling(difficulty: 1 | 2 | 3): Exercise {
  const variant = randInt(0, 1);

  if (variant === 0) {
    // Given area of small figure and scale factor, find area of large figure
    const scaleFactor = pick([2, 3, 4, 5]);
    const areaSmall = randInt(4, 20);
    const areaLarge = areaSmall * scaleFactor * scaleFactor;

    return {
      id: genId('k7-aehn'),
      topicId: 'k7-aehnlichkeit',
      question: `Zwei ähnliche Figuren mit Vergrößerungsfaktor k = ${scaleFactor}. Die kleinere Figur hat einen Flächeninhalt von ${areaSmall} cm\u00B2. Wie groß ist der Flächeninhalt der größeren Figur?`,
      questionLatex: `k = ${scaleFactor},\\; A_1 = ${areaSmall}\\,\\text{cm}^2.\\; A_2 = ?`,
      answerType: 'number',
      correctAnswer: areaLarge,
      distractors: [areaSmall * scaleFactor, areaLarge + areaSmall, areaSmall * scaleFactor * scaleFactor * scaleFactor].filter(d => d > 0 && d !== areaLarge).slice(0, 3),
      hint: `Bei ähnlichen Figuren gilt: Flächenverhältnis = k\u00B2. Also ${scaleFactor}\u00B2 = ${scaleFactor * scaleFactor}.`,
      explanation: `Flächenfaktor = k\u00B2 = ${scaleFactor}\u00B2 = ${scaleFactor * scaleFactor}. A\u2082 = ${areaSmall} \u00D7 ${scaleFactor * scaleFactor} = ${areaLarge} cm\u00B2.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 45,
    };
  } else {
    // Given both areas, find scale factor
    const scaleFactor = pick([2, 3, 4, 5]);
    const areaSmall = randInt(3, 15);
    const areaLarge = areaSmall * scaleFactor * scaleFactor;

    return {
      id: genId('k7-aehn'),
      topicId: 'k7-aehnlichkeit',
      question: `Zwei ähnliche Figuren haben Flächeninhalte von ${areaSmall} cm\u00B2 und ${areaLarge} cm\u00B2. Wie groß ist der Vergrößerungsfaktor k (Seitenverhältnis)?`,
      questionLatex: `A_1 = ${areaSmall}\\,\\text{cm}^2,\\; A_2 = ${areaLarge}\\,\\text{cm}^2.\\; k = ?`,
      answerType: 'number',
      correctAnswer: scaleFactor,
      distractors: [scaleFactor * scaleFactor, scaleFactor + 1, scaleFactor - 1].filter(d => d > 0 && d !== scaleFactor).slice(0, 3),
      hint: `Flächenverhältnis = ${areaLarge} \u00F7 ${areaSmall} = ${scaleFactor * scaleFactor}. Der Vergrößerungsfaktor ist die Wurzel davon.`,
      explanation: `Flächenverhältnis = ${areaLarge}/${areaSmall} = ${scaleFactor * scaleFactor}. k = \u221A${scaleFactor * scaleFactor} = ${scaleFactor}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 50,
    };
  }
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k7-aehnlichkeit',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) return generateMissingSide(1);
    if (difficulty === 2) return generateFindScaleFactor(2);
    return generateAreaScaling(3);
  },
};
