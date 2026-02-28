import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function formatDE(n: number): string {
  return n.toLocaleString('de-DE');
}

/**
 * k4-runden-ueberschlagen — Runden und Überschlagen
 *
 * Difficulty 1: Runden auf Zehner/Hunderter (number-input) + true-false (ist das richtig gerundet?)
 * Difficulty 2: Überschlagsrechnung bei Addition/Subtraktion (multiple-choice) + estimation (welcher Schätzwert ist näher?)
 * Difficulty 3: Überschlag bei Multiplikation, Toleranz-Schätzung (estimation)
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-runden-ueberschlagen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      const useVariant = randInt(0, 1) === 0;

      // ── Variant: true-false (is this rounded correctly?) ─────────────────
      if (useVariant) {
        const roundTo = randInt(0, 1) === 0 ? 10 : 100;
        const label = roundTo === 10 ? 'Zehner' : 'Hunderter';
        const n = randInt(101, 9999);
        const correctRounded = Math.round(n / roundTo) * roundTo;
        // Sometimes show a wrong rounded value
        const showWrong = randInt(0, 1) === 0;
        const claimedRounded = showWrong
          ? (correctRounded === Math.floor(n / roundTo) * roundTo ? Math.ceil(n / roundTo) * roundTo : Math.floor(n / roundTo) * roundTo)
          : correctRounded;
        const isCorrect = claimedRounded === correctRounded;

        return {
          id: genId('k4-rund'),
          topicId: 'k4-runden-ueberschlagen',
          question: `Stimmt es? ${formatDE(n)} auf ${label} gerundet ergibt ${formatDE(claimedRounded)}.`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: isCorrect ? 'wahr' : 'falsch',
          hint: `Schaue auf die Stelle rechts vom ${label}. Ist sie ≥ 5 → aufrunden, sonst abrunden.`,
          explanation: `${formatDE(n)} korrekt auf ${label} gerundet: ${formatDE(correctRounded)}. Die Behauptung (${formatDE(claimedRounded)}) ist daher ${isCorrect ? 'wahr' : 'falsch'}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      // ── Standard: Runden auf Zehner oder Hunderter — number-input ────────
      const roundTo = randInt(0, 1) === 0 ? 10 : 100;
      const label = roundTo === 10 ? 'Zehner' : 'Hunderter';
      const n = randInt(101, 9999);
      const rounded = Math.round(n / roundTo) * roundTo;
      const digit = Math.floor((n % roundTo) / (roundTo / 10));

      return {
        id: genId('k4-rund'),
        topicId: 'k4-runden-ueberschlagen',
        question: `Runde ${formatDE(n)} auf ${label}.`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: rounded,
        hint: `Schaue auf die Stelle rechts vom ${label}. Ist sie 5 oder mehr, wird aufgerundet.`,
        explanation: `Die entscheidende Ziffer ist ${digit}. ${digit >= 5 ? 'Aufrunden' : 'Abrunden'}: ${formatDE(n)} ≈ ${formatDE(rounded)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (difficulty === 2) {
      const useEstimationVariant = randInt(0, 1) === 0;

      // ── Variant: estimation (which estimate is closer?) ───────────────────
      if (useEstimationVariant) {
        const n = randInt(200, 9800);
        const roundTo = randInt(0, 1) === 0 ? 100 : 1000;
        const label = roundTo === 100 ? 'Hunderter' : 'Tausender';
        const correctRounded = Math.round(n / roundTo) * roundTo;
        const wrongRounded = correctRounded === Math.floor(n / roundTo) * roundTo
          ? Math.ceil(n / roundTo) * roundTo
          : Math.floor(n / roundTo) * roundTo;

        return {
          id: genId('k4-rund'),
          topicId: 'k4-runden-ueberschlagen',
          question: `Welcher Schätzwert ist näher an ${formatDE(n)}? A: ${formatDE(correctRounded)} oder B: ${formatDE(wrongRounded)}`,
          answerType: 'multiple-choice',
          exerciseType: 'estimation',
          correctAnswer: formatDE(correctRounded),
          distractors: [formatDE(wrongRounded)],
          hint: `Runde ${formatDE(n)} auf ${label}. Welcher der beiden Werte ist das Ergebnis?`,
          explanation: `${formatDE(n)} gerundet auf ${label} ergibt ${formatDE(correctRounded)}, weil die Differenz zu ${formatDE(correctRounded)} (${Math.abs(n - correctRounded)}) kleiner ist als zu ${formatDE(wrongRounded)} (${Math.abs(n - wrongRounded)}).`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      }

      // ── Standard: Überschlagsrechnung Addition/Subtraktion — multiple-choice
      const useAddition = randInt(0, 1) === 0;
      const a = randInt(100, 4999);
      const b = randInt(100, 4999);
      const exact = useAddition ? a + b : Math.max(a, b) - Math.min(a, b);
      const op = useAddition ? '+' : '−';
      const left = useAddition ? a : Math.max(a, b);
      const right = useAddition ? b : Math.min(a, b);

      // Runde auf Hunderter für den Überschlag
      const aR = Math.round(left / 100) * 100;
      const bR = Math.round(right / 100) * 100;
      const estimate = useAddition ? aR + bR : aR - bR;

      // Distraktoren
      const d1 = estimate + 100;
      const d2 = estimate - 100;
      const d3 = exact; // exakter Wert als Ablenker

      return {
        id: genId('k4-rund'),
        topicId: 'k4-runden-ueberschlagen',
        question: `Überschlage: ${formatDE(left)} ${op} ${formatDE(right)} ≈ ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: estimate,
        distractors: [d1, d2, d3],
        hint: `Runde beide Zahlen zuerst auf Hunderter, dann rechne.`,
        explanation: `${formatDE(left)} ≈ ${formatDE(aR)}, ${formatDE(right)} ≈ ${formatDE(bR)}. ${formatDE(aR)} ${op} ${formatDE(bR)} = ${formatDE(estimate)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    // difficulty === 3: Überschlag bei Multiplikation — estimation (mit Toleranz)
    const a = randInt(12, 99);
    const b = randInt(3, 9);
    const exact = a * b;

    // Runde a auf Zehner
    const aR = Math.round(a / 10) * 10;
    const estimate = aR * b;
    // Toleranz: bis zu 20% Abweichung vom exakten Ergebnis
    const tol = Math.max(Math.round(exact * 0.2), 10);

    return {
      id: genId('k4-rund'),
      topicId: 'k4-runden-ueberschlagen',
      question: `Schätze das Ergebnis: ${a} × ${b} ≈ ? (Überschlagsrechnung)`,
      questionLatex: `${a} \\times ${b} \\approx ?`,
      answerType: 'number',
      exerciseType: 'estimation',
      correctAnswer: estimate,
      tolerance: tol,
      hint: `Runde ${a} auf Zehner, dann multipliziere mit ${b}.`,
      explanation: `${a} ≈ ${aR}. ${aR} × ${b} = ${estimate}. (Exakt: ${a} × ${b} = ${exact}.)`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  },
};
