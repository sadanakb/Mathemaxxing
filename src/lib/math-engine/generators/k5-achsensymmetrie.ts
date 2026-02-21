import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const symmetrischeFiguren: Array<{ name: string; achsen: number }> = [
  { name: 'Kreis', achsen: -1 }, // unendlich viele
  { name: 'Quadrat', achsen: 4 },
  { name: 'gleichseitiges Dreieck', achsen: 3 },
  { name: 'Rechteck', achsen: 2 },
  { name: 'gleichschenkliges Dreieck', achsen: 1 },
  { name: 'regelmäßiges Sechseck', achsen: 6 },
  { name: 'regelmäßiges Fünfeck', achsen: 5 },
  { name: 'Raute', achsen: 2 },
];

const nichtSymmetrischeFiguren = [
  'allgemeines Dreieck',
  'Parallelogramm (nicht Rechteck)',
  'unregelmäßiges Viereck',
  'Trapez (nicht gleichschenklig)',
];

const buchstaben: Array<{ letter: string; symmetric: boolean; achsen: string }> = [
  { letter: 'A', symmetric: true, achsen: 'senkrechte Achse' },
  { letter: 'B', symmetric: true, achsen: 'waagerechte Achse' },
  { letter: 'C', symmetric: true, achsen: 'waagerechte Achse' },
  { letter: 'D', symmetric: true, achsen: 'waagerechte Achse' },
  { letter: 'E', symmetric: true, achsen: 'waagerechte Achse' },
  { letter: 'F', symmetric: false, achsen: 'keine' },
  { letter: 'G', symmetric: false, achsen: 'keine' },
  { letter: 'H', symmetric: true, achsen: 'senkrechte und waagerechte Achse' },
  { letter: 'M', symmetric: true, achsen: 'senkrechte Achse' },
  { letter: 'O', symmetric: true, achsen: 'senkrechte und waagerechte Achse' },
  { letter: 'T', symmetric: true, achsen: 'senkrechte Achse' },
  { letter: 'X', symmetric: true, achsen: 'senkrechte und waagerechte Achse' },
  { letter: 'J', symmetric: false, achsen: 'keine' },
  { letter: 'N', symmetric: false, achsen: 'keine' },
  { letter: 'P', symmetric: false, achsen: 'keine' },
  { letter: 'R', symmetric: false, achsen: 'keine' },
];

export const template: ExerciseTemplate = {
  topicId: 'k5-achsensymmetrie',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Ist die Figur achsensymmetrisch? (True/False)
      const isSymm = randInt(0, 1) === 0;
      if (isSymm) {
        const fig = symmetrischeFiguren[randInt(0, symmetrischeFiguren.length - 1)];
        return {
          id: genId('k5-sym'),
          topicId: 'k5-achsensymmetrie',
          question: `Ist ein ${fig.name} achsensymmetrisch?`,
          answerType: 'true-false',
          correctAnswer: 'true',
          hint: 'Kann man die Figur so falten, dass beide Hälften genau übereinander liegen?',
          explanation: `Ja, ein ${fig.name} ist achsensymmetrisch${fig.achsen === -1 ? ' (unendlich viele Symmetrieachsen)' : ` (${fig.achsen} Symmetrieachse${fig.achsen > 1 ? 'n' : ''})`}.`,
          difficulty: d,
          category: 'Repräsentational',
          estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
        };
      } else {
        const fig = nichtSymmetrischeFiguren[randInt(0, nichtSymmetrischeFiguren.length - 1)];
        return {
          id: genId('k5-sym'),
          topicId: 'k5-achsensymmetrie',
          question: `Ist ein ${fig} achsensymmetrisch?`,
          answerType: 'true-false',
          correctAnswer: 'false',
          hint: 'Kann man die Figur so falten, dass beide Hälften genau übereinander liegen?',
          explanation: `Nein, ein ${fig} ist im Allgemeinen nicht achsensymmetrisch.`,
          difficulty: d,
          category: 'Repräsentational',
          estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
        };
      }
    }

    if (variant === 2) {
      // Wie viele Symmetrieachsen hat die Figur?
      const pool = d === 1
        ? symmetrischeFiguren.filter(f => f.achsen >= 1 && f.achsen <= 4)
        : symmetrischeFiguren.filter(f => f.achsen >= 1);
      const fig = pool[randInt(0, pool.length - 1)];

      return {
        id: genId('k5-sym'),
        topicId: 'k5-achsensymmetrie',
        question: `Wie viele Symmetrieachsen hat ein ${fig.name}?`,
        answerType: 'number',
        correctAnswer: fig.achsen === -1 ? 'unendlich' : fig.achsen.toString(),
        hint: 'Überlege, auf wie viele Arten man die Figur so falten kann, dass beide Hälften deckungsgleich sind.',
        explanation: `Ein ${fig.name} hat ${fig.achsen === -1 ? 'unendlich viele' : fig.achsen} Symmetrieachse${fig.achsen !== 1 ? 'n' : ''}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 25 : 35,
        exerciseType: 'number-input',
      };
    }

    if (variant === 3) {
      // Buchstaben-Symmetrie: Ist der Buchstabe symmetrisch?
      const b = buchstaben[randInt(0, buchstaben.length - 1)];

      return {
        id: genId('k5-sym'),
        topicId: 'k5-achsensymmetrie',
        question: `Ist der Großbuchstabe "${b.letter}" achsensymmetrisch?`,
        answerType: 'true-false',
        correctAnswer: b.symmetric ? 'true' : 'false',
        hint: 'Stell dir vor, du legst einen Spiegel auf den Buchstaben. Sieht er gleich aus?',
        explanation: b.symmetric
          ? `Ja, "${b.letter}" ist achsensymmetrisch (${b.achsen}).`
          : `Nein, "${b.letter}" ist nicht achsensymmetrisch.`,
        difficulty: d,
        category: 'Repräsentational',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
      };
    }

    if (variant === 4) {
      // Spiegelpunkt bestimmen: Ein Punkt wird an einer Achse gespiegelt
      const maxCoord = d === 1 ? 5 : d === 2 ? 8 : 10;
      const axis = randInt(0, 1) === 0 ? 'y-Achse' : 'x-Achse';
      const px = randInt(1, maxCoord);
      const py = randInt(1, maxCoord);

      let spiegelX: number, spiegelY: number;
      if (axis === 'y-Achse') {
        spiegelX = -px;
        spiegelY = py;
      } else {
        spiegelX = px;
        spiegelY = -py;
      }

      const correct = `(${spiegelX}|${spiegelY})`;
      const wrong1 = `(${-spiegelX}|${-spiegelY})`;
      const wrong2 = axis === 'y-Achse' ? `(${px}|${-py})` : `(${-px}|${py})`;

      return {
        id: genId('k5-sym'),
        topicId: 'k5-achsensymmetrie',
        question: `Der Punkt P(${px}|${py}) wird an der ${axis} gespiegelt. Wo liegt der Spiegelpunkt P'?`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: [wrong1, wrong2],
        hint: axis === 'y-Achse'
          ? 'Bei Spiegelung an der y-Achse ändert sich nur das Vorzeichen der x-Koordinate.'
          : 'Bei Spiegelung an der x-Achse ändert sich nur das Vorzeichen der y-Koordinate.',
        explanation: `P(${px}|${py}) gespiegelt an der ${axis} ergibt P'${correct}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 25 : d === 2 ? 35 : 40,
        exerciseType: 'multiple-choice',
      };
    }

    // variant 5: Welche Figur hat die meisten Symmetrieachsen? (Multiple Choice)
    const choices = d === 1
      ? [
          symmetrischeFiguren.find(f => f.name === 'Quadrat')!,
          symmetrischeFiguren.find(f => f.name === 'Rechteck')!,
          symmetrischeFiguren.find(f => f.name === 'gleichschenkliges Dreieck')!,
        ]
      : d === 2
      ? [
          symmetrischeFiguren.find(f => f.name === 'regelmäßiges Sechseck')!,
          symmetrischeFiguren.find(f => f.name === 'Quadrat')!,
          symmetrischeFiguren.find(f => f.name === 'gleichseitiges Dreieck')!,
          symmetrischeFiguren.find(f => f.name === 'Rechteck')!,
        ]
      : [
          symmetrischeFiguren.find(f => f.name === 'regelmäßiges Sechseck')!,
          symmetrischeFiguren.find(f => f.name === 'regelmäßiges Fünfeck')!,
          symmetrischeFiguren.find(f => f.name === 'Quadrat')!,
          symmetrischeFiguren.find(f => f.name === 'Raute')!,
        ];

    const maxAchsen = Math.max(...choices.map(c => c.achsen));
    const winner = choices.find(c => c.achsen === maxAchsen)!;
    const distractors = choices.filter(c => c !== winner).map(c => c.name);

    return {
      id: genId('k5-sym'),
      topicId: 'k5-achsensymmetrie',
      question: 'Welche Figur hat die meisten Symmetrieachsen?',
      answerType: 'multiple-choice',
      correctAnswer: winner.name,
      distractors,
      hint: 'Je regelmäßiger eine Figur, desto mehr Symmetrieachsen hat sie.',
      explanation: `${winner.name} hat ${winner.achsen} Symmetrieachsen — mehr als die anderen Figuren.`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
      exerciseType: 'multiple-choice',
    };
  },
};
