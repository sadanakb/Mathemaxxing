import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-sym-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type SymmetryItem = { name: string; symmetric: boolean };

const SYMMETRY_ITEMS: SymmetryItem[] = [
  { name: 'Schmetterling', symmetric: true },
  { name: 'Herz', symmetric: true },
  { name: 'Stern (5 Zacken)', symmetric: true },
  { name: 'Quadrat', symmetric: true },
  { name: 'Kreis', symmetric: true },
  { name: 'Buchstabe A', symmetric: true },
  { name: 'Buchstabe M', symmetric: true },
  { name: 'Tanne (Weihnachtsbaum)', symmetric: true },
  { name: 'Buchstabe F', symmetric: false },
  { name: 'Buchstabe R', symmetric: false },
  { name: 'Buchstabe G', symmetric: false },
  { name: 'die Zahl 6', symmetric: false },
  { name: 'Buchstabe J', symmetric: false },
  { name: 'Buchstabe P', symmetric: false },
];

export const template: ExerciseTemplate = {
  topicId: 'k2-symmetrie-erkennen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // True-false: "Hat X eine Symmetrieachse?"
      const item = SYMMETRY_ITEMS[randInt(0, SYMMETRY_ITEMS.length - 1)];

      return {
        id: genId(),
        topicId: 'k2-symmetrie-erkennen',
        question: `Hat ein/eine ${item.name} eine Symmetrieachse?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: item.symmetric ? 'wahr' : 'falsch',
        hint: 'Stell dir vor, du faltest das Bild in der Mitte. Passen beide Hälften genau aufeinander?',
        explanation: item.symmetric
          ? `Ja, ein/eine ${item.name} hat eine Symmetrieachse. Beide Hälften sind spiegelgleich.`
          : `Nein, ein/eine ${item.name} hat keine Symmetrieachse. Die Hälften passen nicht aufeinander.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 10,
      };
    }

    if (difficulty === 2) {
      // MC: "Welches Bild ist symmetrisch?"
      const symmetricItems = SYMMETRY_ITEMS.filter(i => i.symmetric);
      const asymmetricItems = SYMMETRY_ITEMS.filter(i => !i.symmetric);

      const correct = symmetricItems[randInt(0, symmetricItems.length - 1)];

      // Pick 3 asymmetric distractors
      const shuffled = [...asymmetricItems].sort(() => Math.random() - 0.5);
      const wrongItems = shuffled.slice(0, 3);

      const options = [correct.name, ...wrongItems.map(w => w.name)].sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-symmetrie-erkennen',
        question: 'Welches dieser Bilder/Formen ist symmetrisch?',
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: correct.name,
        distractors: wrongItems.map(w => w.name),
        options,
        correctOptions: [correct.name],
        hint: 'Symmetrisch bedeutet: Man kann es in der Mitte teilen und beide Hälften sehen gleich aus.',
        explanation: `${correct.name} ist symmetrisch. Man kann es entlang der Symmetrieachse falten.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: variant — classify OR mirror-draw
    const d3variant = randInt(0, 1);

    if (d3variant === 0) {
      // classify: sort symmetric and asymmetric shapes into two groups
      const symmetricItems = SYMMETRY_ITEMS.filter(i => i.symmetric);
      const asymmetricItems = SYMMETRY_ITEMS.filter(i => !i.symmetric);

      // Pick 2 symmetric and 2 asymmetric items
      const symPick = [...symmetricItems].sort(() => Math.random() - 0.5).slice(0, 2);
      const asymPick = [...asymmetricItems].sort(() => Math.random() - 0.5).slice(0, 2);
      const allItems = [...symPick, ...asymPick].sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-symmetrie-erkennen',
        question: 'Sortiere die Formen: Welche sind symmetrisch, welche nicht?',
        answerType: 'drag-drop',
        exerciseType: 'classify',
        correctAnswer: JSON.stringify({
          symmetrisch: symPick.map(i => i.name),
          'nicht symmetrisch': asymPick.map(i => i.name),
        }),
        items: allItems.map(i => i.name),
        categories: {
          symmetrisch: symPick.map(i => i.name),
          'nicht symmetrisch': asymPick.map(i => i.name),
        },
        hint: 'Stell dir vor, du faltest jede Form in der Mitte. Passen beide Hälften genau aufeinander?',
        explanation: `Symmetrisch: ${symPick.map(i => i.name).join(', ')}. Nicht symmetrisch: ${asymPick.map(i => i.name).join(', ')}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }

    // d3variant === 1: Mirror-draw — complete a simple pattern on a 6x6 grid
    const size = 6;
    const grid: boolean[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false)
    );

    // Fill left half with random pattern (columns 0-2), mirror to right half (columns 3-5)
    const filledCells = randInt(3, 5);
    for (let i = 0; i < filledCells; i++) {
      const row = randInt(0, size - 1);
      const col = randInt(0, 2);
      grid[row][col] = true;
      grid[row][size - 1 - col] = true;
    }

    return {
      id: genId(),
      topicId: 'k2-symmetrie-erkennen',
      question: 'Ergänze das Spiegelbild! Die linke Hälfte ist vorgegeben. Zeichne die rechte Hälfte symmetrisch.',
      answerType: 'drag-drop',
      exerciseType: 'mirror-draw',
      correctAnswer: 'mirror-complete',
      mirrorConfig: {
        axis: 'vertical',
        grid,
      },
      hint: 'Die Symmetrieachse ist in der Mitte. Jedes Feld links hat sein Spiegelbild rechts auf gleicher Höhe.',
      explanation: 'Das Spiegelbild entsteht, indem jeder Punkt auf der linken Seite auf die gleiche Position auf der rechten Seite gesetzt wird.',
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 40,
    };
  },
};
