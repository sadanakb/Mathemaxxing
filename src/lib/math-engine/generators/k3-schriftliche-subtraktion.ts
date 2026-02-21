import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-schriftliche-subtraktion — Schriftliche Subtraktion
 *
 * Difficulty 1: 3-digit - 2-digit without borrowing
 * Difficulty 2: 3-digit - 3-digit with one borrowing
 * Difficulty 3: 3-digit - 3-digit with multiple borrowings
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-schriftliche-subtraktion',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // 3-digit - 2-digit, no borrowing needed
      // Ensure each digit of a >= corresponding digit of b
      const aH = randInt(2, 9);
      const aZ = randInt(1, 9);
      const aE = randInt(1, 9);
      const bZ = randInt(0, aZ - 1);
      const bE = randInt(0, aE - 1);
      const a = aH * 100 + aZ * 10 + aE;
      const b = bZ * 10 + bE;
      const answer = a - b;

      // Vary: sometimes use number-input, sometimes step-by-step hint style
      const useStepByStep = randInt(0, 2) === 0;

      return {
        id: genId('k3-ssub'),
        topicId: 'k3-schriftliche-subtraktion',
        question: `Berechne schriftlich: ${a} − ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: useStepByStep ? 'step-by-step' : 'number-input',
        correctAnswer: answer,
        hint: 'Schreibe die Zahlen untereinander und subtrahiere spaltenweise von rechts nach links: zuerst Einer, dann Zehner, dann Hunderter.',
        explanation: `${a} − ${b} = ${answer}. Einer: ${aE} − ${bE} = ${aE - bE}, Zehner: ${aZ} − ${bZ} = ${aZ - bZ}, Hunderter: ${aH} bleibt.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    if (difficulty === 2) {
      // 3-digit - 3-digit, exactly one borrowing
      // We force one column to need borrowing and the other not
      const borrowColumn = randInt(0, 1); // 0 = Einer, 1 = Zehner

      let aH: number, aZ: number, aE: number, bH: number, bZ: number, bE: number;

      if (borrowColumn === 0) {
        // Einer needs borrowing (aE < bE), Zehner doesn't (after adjusting aZ-1 >= bZ)
        aH = randInt(3, 9);
        aZ = randInt(2, 9);
        aE = randInt(0, 4);
        bH = randInt(1, aH - 1);
        bZ = randInt(0, aZ - 2); // after borrowing aZ becomes aZ-1, still >= bZ
        bE = randInt(aE + 1, 9);
      } else {
        // Zehner needs borrowing (aZ < bZ), Einer doesn't
        aH = randInt(3, 9);
        aZ = randInt(0, 4);
        aE = randInt(1, 9);
        bH = randInt(1, aH - 2); // after borrowing aH becomes aH-1, still >= bH
        bZ = randInt(aZ + 1, 9);
        bE = randInt(0, aE);
      }

      const a = aH * 100 + aZ * 10 + aE;
      const b = bH * 100 + bZ * 10 + bE;
      const answer = a - b;

      return {
        id: genId('k3-ssub'),
        topicId: 'k3-schriftliche-subtraktion',
        question: `Berechne schriftlich: ${a} − ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: 'Schreibe die Zahlen untereinander. Wenn eine Ziffer oben kleiner ist als unten, borgst du 1 von der nächsten Stelle.',
        explanation: `${a} − ${b} = ${answer}. Ein Übertrag war nötig bei den ${borrowColumn === 0 ? 'Einern' : 'Zehnern'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    }

    // difficulty === 3: 3-digit - 3-digit, multiple borrowings
    // Force both Einer and Zehner to need borrowing
    const aH = randInt(4, 9);
    const aZ = randInt(0, 3);
    const aE = randInt(0, 3);
    const bH = randInt(1, aH - 2); // leave room for double borrow
    const bZ = randInt(aZ + 1, 9);
    const bE = randInt(aE + 1, 9);

    const a = aH * 100 + aZ * 10 + aE;
    const b = bH * 100 + bZ * 10 + bE;
    const answer = a - b;

    // For difficulty 3, sometimes use calculation-pyramid as a variation
    const usePyramid = randInt(0, 3) === 0;

    if (usePyramid) {
      // Pyramid: bottom row has 3 numbers; each upper = left - right (subtraction pyramid)
      const c = randInt(100, 300);
      const base = [a, b, c];
      return {
        id: genId('k3-ssub'),
        topicId: 'k3-schriftliche-subtraktion',
        question: `Subtraktionspyramide: Berechne die Differenzen von unten nach oben.`,
        answerType: 'number',
        exerciseType: 'calculation-pyramid',
        correctAnswer: (a - b) - (b - c),
        pyramidBase: base,
        hint: 'Berechne die Differenz jedes Paares nebeneinander, dann die Differenz der Ergebnisse.',
        explanation: `Ebene 1: ${a} − ${b} = ${a - b}, ${b} − ${c} = ${b - c}. Spitze: ${a - b} − ${b - c} = ${(a - b) - (b - c)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 90,
      };
    }

    return {
      id: genId('k3-ssub'),
      topicId: 'k3-schriftliche-subtraktion',
      question: `Berechne schriftlich: ${a} − ${b} = ?`,
      questionLatex: `${a} - ${b} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: 'Schreibe die Zahlen untereinander. Hier brauchst du mehrere Überträge! Beginne bei den Einern.',
      explanation: `${a} − ${b} = ${answer}. Es waren Überträge bei Einern und Zehnern nötig.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 60,
    };
  },
};
