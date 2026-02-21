import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-geofig-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type ShapeInfo = {
  name: string;
  ecken: number;
  seiten: number;
  rund: boolean;
};

const shapes: ShapeInfo[] = [
  { name: 'Kreis', ecken: 0, seiten: 0, rund: true },
  { name: 'Dreieck', ecken: 3, seiten: 3, rund: false },
  { name: 'Quadrat', ecken: 4, seiten: 4, rund: false },
  { name: 'Rechteck', ecken: 4, seiten: 4, rund: false },
  { name: 'Fünfeck', ecken: 5, seiten: 5, rund: false },
  { name: 'Sechseck', ecken: 6, seiten: 6, rund: false },
];

const shapeVisual: Record<string, VisualConfig> = {
  'Kreis': { type: 'geometric-shape', props: { shape: 'circle' } },
  'Dreieck': { type: 'geometric-shape', props: { shape: 'triangle' } },
  'Quadrat': { type: 'geometric-shape', props: { shape: 'square' } },
  'Rechteck': { type: 'geometric-shape', props: { shape: 'rectangle' } },
  'Fünfeck': { type: 'geometric-shape', props: { shape: 'pentagon' } },
  'Sechseck': { type: 'geometric-shape', props: { shape: 'hexagon' } },
};

export const template: ExerciseTemplate = {
  topicId: 'k2-geometrie-ebene-figuren',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Basic shape recognition
      const variant = randInt(0, 2);

      if (variant === 0) {
        // "Wie viele Ecken hat ein Dreieck?" (number-input or MC)
        const shape = shapes.filter(s => !s.rund)[randInt(0, 3)]; // Dreieck, Quadrat, Rechteck, Fünfeck
        const useNumber = randInt(0, 1) === 0;

        if (useNumber) {
          return {
            id: genId(),
            topicId: 'k2-geometrie-ebene-figuren',
            question: `Wie viele Ecken hat ein ${shape.name}?`,
            answerType: 'number',
            exerciseType: 'number-input',
            correctAnswer: shape.ecken,
            distractors: [shape.ecken + 1, shape.ecken - 1, shape.ecken + 2].filter(d => d >= 0 && d !== shape.ecken),
            hint: 'Zähle die Ecken der Form ab.',
            explanation: `Ein ${shape.name} hat ${shape.ecken} Ecken.`,
            difficulty,
            category: 'Repräsentational',
            estimatedSeconds: 10,
            visualConfig: shapeVisual[shape.name],
          };
        }

        return {
          id: genId(),
          topicId: 'k2-geometrie-ebene-figuren',
          question: `Wie viele Ecken hat ein ${shape.name}?`,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: shape.ecken,
          distractors: [shape.ecken + 1, shape.ecken - 1, shape.ecken + 2].filter(d => d >= 0 && d !== shape.ecken),
          hint: 'Zähle die Ecken der Form ab.',
          explanation: `Ein ${shape.name} hat ${shape.ecken} Ecken.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 12,
          visualConfig: shapeVisual[shape.name],
        };
      }

      if (variant === 1) {
        // "Welche Form hat keine Ecken?" (MC)
        return {
          id: genId(),
          topicId: 'k2-geometrie-ebene-figuren',
          question: 'Welche Form hat keine Ecken?',
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: 'Kreis',
          distractors: ['Dreieck', 'Quadrat', 'Rechteck'],
          hint: 'Denke an eine runde Form.',
          explanation: 'Der Kreis hat keine Ecken und keine geraden Seiten.',
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 10,
        };
      }

      // "Ist ein Kreis ein Viereck?" (true-false)
      const tfQuestions: Array<{ q: string; answer: boolean; explain: string }> = [
        { q: 'Ist ein Kreis ein Viereck?', answer: false, explain: 'Ein Kreis hat keine Ecken und ist kein Viereck.' },
        { q: 'Hat ein Quadrat 4 Ecken?', answer: true, explain: 'Ja, ein Quadrat hat genau 4 Ecken.' },
        { q: 'Hat ein Dreieck 4 Seiten?', answer: false, explain: 'Nein, ein Dreieck hat 3 Seiten.' },
        { q: 'Ist ein Quadrat auch ein Rechteck?', answer: true, explain: 'Ja, ein Quadrat ist ein besonderes Rechteck mit 4 gleich langen Seiten.' },
      ];
      const tf = tfQuestions[randInt(0, tfQuestions.length - 1)];

      return {
        id: genId(),
        topicId: 'k2-geometrie-ebene-figuren',
        question: tf.q,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: tf.answer ? 'wahr' : 'falsch',
        hint: 'Denke an die Eigenschaften der Formen: Ecken, Seiten, Rundung.',
        explanation: tf.explain,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 10,
      };
    }

    if (difficulty === 2) {
      // Properties: Ecken, Seiten, specific features
      const variant = randInt(0, 2);

      if (variant === 0) {
        // "Welche Form hat 4 gleich lange Seiten?" (MC)
        const propQuestions: Array<{ q: string; correct: string; wrong: string[] }> = [
          { q: 'Welche Form hat 4 gleich lange Seiten?', correct: 'Quadrat', wrong: ['Rechteck', 'Dreieck', 'Kreis'] },
          { q: 'Welche Form hat 3 Ecken und 3 Seiten?', correct: 'Dreieck', wrong: ['Quadrat', 'Kreis', 'Rechteck'] },
          { q: 'Welche Form hat 6 Ecken?', correct: 'Sechseck', wrong: ['Fünfeck', 'Dreieck', 'Quadrat'] },
          { q: 'Welche Form hat 5 Seiten?', correct: 'Fünfeck', wrong: ['Sechseck', 'Quadrat', 'Dreieck'] },
        ];
        const pq = propQuestions[randInt(0, propQuestions.length - 1)];

        return {
          id: genId(),
          topicId: 'k2-geometrie-ebene-figuren',
          question: pq.q,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: pq.correct,
          distractors: pq.wrong,
          hint: 'Denke an die Anzahl der Ecken und Seiten jeder Form.',
          explanation: `Die richtige Antwort ist ${pq.correct}.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 15,
        };
      }

      if (variant === 1) {
        // Drag-match: Formen → Anzahl Ecken
        const selectedShapes = [
          shapes[1], // Dreieck
          shapes[2], // Quadrat
          shapes[4], // Fünfeck
          shapes[0], // Kreis
        ];
        const pairs: [string, string][] = selectedShapes.map(s => [s.name, `${s.ecken} Ecken`]);

        return {
          id: genId(),
          topicId: 'k2-geometrie-ebene-figuren',
          question: 'Ordne jeder Form die richtige Anzahl Ecken zu!',
          answerType: 'matching',
          exerciseType: 'drag-match',
          correctAnswer: pairs.map(p => `${p[0]}→${p[1]}`).join(', '),
          pairs,
          hint: 'Ein Dreieck hat 3, ein Quadrat hat 4, ein Fünfeck hat 5, ein Kreis hat 0 Ecken.',
          explanation: 'Dreieck → 3 Ecken, Quadrat → 4 Ecken, Fünfeck → 5 Ecken, Kreis → 0 Ecken.',
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 30,
        };
      }

      // "Wie viele Seiten hat ein Sechseck?" (number-input)
      const shape = shapes.filter(s => !s.rund)[randInt(0, shapes.filter(s => !s.rund).length - 1)];
      return {
        id: genId(),
        topicId: 'k2-geometrie-ebene-figuren',
        question: `Wie viele Seiten hat ein ${shape.name}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: shape.seiten,
        distractors: [shape.seiten + 1, shape.seiten - 1, shape.seiten + 2].filter(d => d >= 0 && d !== shape.seiten),
        hint: 'Bei den meisten Formen ist die Anzahl der Seiten gleich der Anzahl der Ecken.',
        explanation: `Ein ${shape.name} hat ${shape.seiten} Seiten.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 12,
      };
    }

    // Difficulty 3: comparisons, classification
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Classify: "Sortiere die Formen: rund / eckig"
      const roundShapes = ['Kreis'];
      const angularShapes = ['Dreieck', 'Quadrat', 'Rechteck', 'Fünfeck', 'Sechseck'];
      // Pick a mix
      const selectedRound = roundShapes;
      const selectedAngular = angularShapes.slice(0, 3);
      const allItems = [...selectedRound, ...selectedAngular];
      // Shuffle
      const shuffled = [...allItems].sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-geometrie-ebene-figuren',
        question: 'Sortiere die Formen in die richtige Gruppe!',
        answerType: 'drag-drop',
        exerciseType: 'classify',
        correctAnswer: `Rund: ${selectedRound.join(', ')} | Eckig: ${selectedAngular.join(', ')}`,
        categories: {
          'Rund': selectedRound,
          'Eckig': selectedAngular,
        },
        items: shuffled,
        hint: 'Runde Formen haben keine Ecken. Eckige Formen haben mindestens 3 Ecken.',
        explanation: `Rund: Kreis. Eckig: ${selectedAngular.join(', ')}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    if (variant === 1) {
      // Comparison: "Welche Form hat mehr Ecken: Dreieck oder Fünfeck?" (MC)
      const shapeA = shapes.filter(s => !s.rund)[randInt(0, 3)];
      let shapeB = shapes.filter(s => !s.rund)[randInt(0, 3)];
      while (shapeB.name === shapeA.name) {
        shapeB = shapes.filter(s => !s.rund)[randInt(0, 3)];
      }
      const correctShape = shapeA.ecken > shapeB.ecken ? shapeA : shapeB;
      const otherShape = correctShape === shapeA ? shapeB : shapeA;
      const otherOptions = shapes
        .filter(s => s.name !== correctShape.name && s.name !== otherShape.name && !s.rund)
        .map(s => s.name)
        .slice(0, 1);

      return {
        id: genId(),
        topicId: 'k2-geometrie-ebene-figuren',
        question: `Welche Form hat mehr Ecken: ${shapeA.name} oder ${shapeB.name}?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: correctShape.name,
        distractors: [otherShape.name, ...otherOptions, 'Beide gleich'].filter(d => d !== correctShape.name).slice(0, 3),
        hint: `Zähle die Ecken: ${shapeA.name} hat ${shapeA.ecken}, ${shapeB.name} hat ${shapeB.ecken}.`,
        explanation: `${correctShape.name} hat ${correctShape.ecken} Ecken, ${otherShape.name} hat ${otherShape.ecken} Ecken. Also hat das ${correctShape.name} mehr Ecken.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Drag-match: Formen → Eigenschaften
    const matchPairs: [string, string][] = [
      ['Kreis', 'rund, 0 Ecken'],
      ['Dreieck', '3 Ecken, 3 Seiten'],
      ['Quadrat', '4 gleiche Seiten'],
      ['Rechteck', '4 Ecken, gegenüberliegende Seiten gleich'],
    ];

    return {
      id: genId(),
      topicId: 'k2-geometrie-ebene-figuren',
      question: 'Ordne jeder Form die richtige Eigenschaft zu!',
      answerType: 'matching',
      exerciseType: 'drag-match',
      correctAnswer: matchPairs.map(p => `${p[0]}→${p[1]}`).join(', '),
      pairs: matchPairs,
      hint: 'Denke daran: Kreis = rund, Dreieck = 3 Ecken, Quadrat = 4 gleiche Seiten.',
      explanation: 'Kreis → rund, Dreieck → 3 Ecken, Quadrat → 4 gleiche Seiten, Rechteck → gegenüberliegende Seiten gleich.',
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 35,
    };
  },
};
