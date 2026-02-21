import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

type ShapeInfo = {
  name: string;
  symmetrisch: boolean;
  achsen: number;
  description: string;
};

const shapes: ShapeInfo[] = [
  { name: 'Quadrat', symmetrisch: true, achsen: 4, description: 'Ein Quadrat hat 4 gleich lange Seiten und 4 rechte Winkel.' },
  { name: 'Rechteck', symmetrisch: true, achsen: 2, description: 'Ein Rechteck hat 2 Symmetrieachsen: eine senkrechte und eine waagerechte.' },
  { name: 'gleichseitiges Dreieck', symmetrisch: true, achsen: 3, description: 'Ein gleichseitiges Dreieck hat 3 Symmetrieachsen.' },
  { name: 'Kreis', symmetrisch: true, achsen: -1, description: 'Ein Kreis hat unendlich viele Symmetrieachsen.' },
  { name: 'gleichschenkliges Dreieck', symmetrisch: true, achsen: 1, description: 'Ein gleichschenkliges Dreieck hat genau 1 Symmetrieachse.' },
  { name: 'Raute', symmetrisch: true, achsen: 2, description: 'Eine Raute hat 2 Symmetrieachsen entlang der Diagonalen.' },
  { name: 'regelmäßiges Sechseck', symmetrisch: true, achsen: 6, description: 'Ein regelmäßiges Sechseck hat 6 Symmetrieachsen.' },
  { name: 'Parallelogramm', symmetrisch: false, achsen: 0, description: 'Ein Parallelogramm hat keine Symmetrieachse (aber Punktsymmetrie).' },
  { name: 'unregelmäßiges Dreieck', symmetrisch: false, achsen: 0, description: 'Ein unregelmäßiges Dreieck hat keine Symmetrieachse.' },
  { name: 'Trapez', symmetrisch: false, achsen: 0, description: 'Ein allgemeines Trapez hat keine Symmetrieachse.' },
];

/**
 * k4-symmetrie — Symmetrie
 *
 * Difficulty 1: basic yes/no symmetry (true-false)
 * Difficulty 2: count symmetry axes (multiple-choice)
 * Difficulty 3: mirror-draw exercises
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-symmetrie',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // "Ist diese Form symmetrisch?" — true/false
      const shape = shapes[randInt(0, shapes.length - 1)];
      const answer = shape.symmetrisch ? 'wahr' : 'falsch';

      return {
        id: genId('k4-sym'),
        topicId: 'k4-symmetrie',
        question: `Ist ein ${shape.name} symmetrisch?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: answer,
        hint: 'Kannst du die Form so falten, dass beide Hälften genau aufeinander liegen?',
        explanation: `${shape.description} → ${shape.symmetrisch ? 'Ja, symmetrisch.' : 'Nein, nicht achsensymmetrisch.'}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // "Wie viele Symmetrieachsen hat ...?" — multiple-choice
      // Pick a symmetric shape (not the circle, since that's infinite)
      const candidates = shapes.filter(s => s.symmetrisch && s.achsen > 0);
      const shape = candidates[randInt(0, candidates.length - 1)];

      // Generate distractors
      const correct = shape.achsen;
      const distractorSet = new Set<number>();
      distractorSet.add(correct);
      while (distractorSet.size < 4) {
        const d = randInt(0, 8);
        if (d !== correct) distractorSet.add(d);
      }
      distractorSet.delete(correct);
      const distractors = [...distractorSet].slice(0, 3);

      return {
        id: genId('k4-sym'),
        topicId: 'k4-symmetrie',
        question: `Wie viele Symmetrieachsen hat ein ${shape.name}?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: correct,
        distractors,
        hint: 'Überlege, auf wie viele Weisen du die Form so falten kannst, dass beide Hälften deckungsgleich sind.',
        explanation: `${shape.description}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // difficulty === 3: mix of mirror-draw, MC about most axes, and true-false comparisons
    const variant = randInt(0, 2);

    if (variant === 0) {
      // mirror-draw exercise with a simple 6x6 grid pattern
      const size = 6;
      const grid: boolean[][] = [];
      for (let r = 0; r < size; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < size / 2; c++) {
          row.push(randInt(0, 1) === 1);
        }
        // Fill right half with false (student must mirror)
        for (let c = size / 2; c < size; c++) {
          row.push(false);
        }
        grid.push(row);
      }

      // Count filled cells on left for a basic correctAnswer
      const filledCount = grid.reduce((sum, row) => sum + row.filter(Boolean).length, 0);

      return {
        id: genId('k4-sym'),
        topicId: 'k4-symmetrie',
        question: 'Spiegle das Muster an der senkrechten Achse. Klicke die Felder an, die gefüllt werden müssen.',
        answerType: 'number',
        exerciseType: 'mirror-draw',
        correctAnswer: filledCount,
        mirrorConfig: {
          axis: 'vertical',
          grid,
        },
        hint: 'Jedes ausgefüllte Feld links der Achse hat ein gespiegeltes Feld auf der rechten Seite.',
        explanation: `Spiegle jede gefüllte Zelle an der senkrechten Mittelachse. ${filledCount} Felder müssen insgesamt gefüllt sein.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 45,
      };
    }

    if (variant === 1) {
      // "Welche Form hat die meisten Symmetrieachsen?" — MC
      // Pick 4 shapes, one should have the most
      const candidates = shapes.filter(s => s.achsen >= 0 && s.achsen !== -1);
      const picked: ShapeInfo[] = [];
      const usedIndices = new Set<number>();
      while (picked.length < 4 && usedIndices.size < candidates.length) {
        const idx = randInt(0, candidates.length - 1);
        if (!usedIndices.has(idx)) {
          usedIndices.add(idx);
          picked.push(candidates[idx]);
        }
      }
      picked.sort((a, b) => b.achsen - a.achsen);
      const correct = picked[0].name;
      const distractors = picked.slice(1).map(s => s.name);

      return {
        id: genId('k4-sym'),
        topicId: 'k4-symmetrie',
        question: `Welche Form hat die meisten Symmetrieachsen?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: correct,
        distractors,
        hint: 'Überlege für jede Form, wie oft du sie falten kannst, sodass beide Hälften übereinander liegen.',
        explanation: `${picked[0].name} hat ${picked[0].achsen} Symmetrieachsen — mehr als die anderen Formen.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    // variant === 2: true-false comparison
    const s1 = shapes[randInt(0, shapes.length - 1)];
    let s2 = s1;
    while (s2 === s1) s2 = shapes[randInt(0, shapes.length - 1)];

    const claimMoreAxes = randInt(0, 1) === 0;
    const effectiveA1 = s1.achsen === -1 ? 999 : s1.achsen;
    const effectiveA2 = s2.achsen === -1 ? 999 : s2.achsen;
    const isTrue = claimMoreAxes ? effectiveA1 > effectiveA2 : effectiveA1 < effectiveA2;

    return {
      id: genId('k4-sym'),
      topicId: 'k4-symmetrie',
      question: `Stimmt es? Ein ${s1.name} hat ${claimMoreAxes ? 'mehr' : 'weniger'} Symmetrieachsen als ein ${s2.name}.`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: isTrue ? 'wahr' : 'falsch',
      hint: `Wie viele Symmetrieachsen hat jede Form?`,
      explanation: `${s1.name}: ${s1.achsen === -1 ? 'unendlich viele' : s1.achsen} Achsen. ${s2.name}: ${s2.achsen === -1 ? 'unendlich viele' : s2.achsen} Achsen. → ${isTrue ? 'Wahr' : 'Falsch'}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  },
};
