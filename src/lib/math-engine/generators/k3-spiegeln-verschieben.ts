import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-spiegeln-verschieben — Spiegeln und Verschieben
 *
 * Difficulty 1: Einfache Spiegelung erkennen (true-false)
 * Difficulty 2: Figur an vertikaler Achse spiegeln (mirror-draw)
 * Difficulty 3: Figur an horizontaler Achse spiegeln (mirror-draw)
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-spiegeln-verschieben',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // True-False: Ist die Spiegelung richtig?
      const isCorrect = randInt(0, 1) === 0;
      const figur = randInt(0, 2);
      const figurNamen = ['L-Form', 'T-Form', 'Treppe'];
      const figurName = figurNamen[figur];

      return {
        id: genId('k3-spvs'),
        topicId: 'k3-spiegeln-verschieben',
        question: `Die rechte Figur soll die Spiegelung der linken ${figurName} an der senkrechten Achse sein. Stimmt das?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isCorrect ? 'wahr' : 'falsch',
        hint: 'Klappe die Figur gedanklich an der Achse um. Passt sie genau auf die andere Seite?',
        explanation: isCorrect
          ? `Ja, die Figur ist korrekt an der Achse gespiegelt.`
          : `Nein, die Spiegelung ist nicht korrekt. Die Figur müsste seitenverkehrt sein.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Mirror-draw: vertikale Achse
      const size = 4;
      const grid: boolean[][] = [];
      for (let r = 0; r < size; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < size; c++) {
          // Nur linke Hälfte füllen
          row.push(c < size / 2 ? randInt(0, 1) === 1 : false);
        }
        grid.push(row);
      }

      // Zähle die gefüllten Zellen für die Antwort
      let filled = 0;
      for (const row of grid) {
        for (const cell of row) {
          if (cell) filled++;
        }
      }

      return {
        id: genId('k3-spvs'),
        topicId: 'k3-spiegeln-verschieben',
        question: 'Spiegle die Figur an der senkrechten Achse (Mitte des Gitters).',
        answerType: 'number',
        exerciseType: 'mirror-draw',
        correctAnswer: filled,
        mirrorConfig: { axis: 'vertical', grid },
        hint: 'Jedes Kästchen links der Achse wird auf die gleiche Position rechts der Achse gespiegelt.',
        explanation: `Die Figur wird seitenverkehrt auf die rechte Seite übertragen. ${filled} Kästchen müssen gespiegelt werden.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: horizontale Achse
    const size = 5;
    const grid: boolean[][] = [];
    for (let r = 0; r < size; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < size; c++) {
        // Nur obere Hälfte füllen
        row.push(r < Math.floor(size / 2) ? randInt(0, 1) === 1 : false);
      }
      grid.push(row);
    }

    let filled = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (cell) filled++;
      }
    }

    return {
      id: genId('k3-spvs'),
      topicId: 'k3-spiegeln-verschieben',
      question: 'Spiegle die Figur an der waagerechten Achse (Mitte des Gitters).',
      answerType: 'number',
      exerciseType: 'mirror-draw',
      correctAnswer: filled,
      mirrorConfig: { axis: 'horizontal', grid },
      hint: 'Jedes Kästchen über der Achse wird auf die gleiche Position unter der Achse gespiegelt.',
      explanation: `Die Figur wird nach unten gespiegelt. ${filled} Kästchen müssen gespiegelt werden.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 35,
    };
  },
};
