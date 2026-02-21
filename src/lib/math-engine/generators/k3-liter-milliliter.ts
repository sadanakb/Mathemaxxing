import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * k3-liter-milliliter — Liter und Milliliter
 *
 * Difficulty 1: Einfache Umrechnung l → ml (number-input)
 * Difficulty 2: ml → l, Sortieren (drag-sort), Wahr/Falsch
 * Difficulty 3: Gemischte Einheiten addieren, Vergleiche
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-liter-milliliter',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // l → ml
      const liter = randInt(1, 10);
      const ml = liter * 1000;
      return {
        id: genId('k3-lml'),
        topicId: 'k3-liter-milliliter',
        question: `${liter} l = ? ml`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: ml,
        hint: '1 Liter = 1000 Milliliter.',
        explanation: `${liter} l × 1000 = ${ml} ml.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 15,
        visualConfig: {
          type: 'ruler' as const,
          props: { length: liter, unit: 'cm' as const, highlights: [liter] },
        },
      };
    }

    if (difficulty === 2) {
      const variant = randInt(0, 2);

      if (variant === 0) {
        // ml → l
        const liter = randInt(1, 10);
        const ml = liter * 1000;
        return {
          id: genId('k3-lml'),
          topicId: 'k3-liter-milliliter',
          question: `${ml} ml = ? l`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: liter,
          hint: 'Teile die Milliliter durch 1000.',
          explanation: `${ml} ml ÷ 1000 = ${liter} l.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 20,
        };
      }

      if (variant === 1) {
        // Sortieren: Mengen von klein nach groß
        const values = [
          { display: `${randInt(1, 3)} l`, ml: 0 },
          { display: `${randInt(200, 800)} ml`, ml: 0 },
          { display: `${randInt(4, 7)} l`, ml: 0 },
          { display: `${randInt(100, 400)} ml`, ml: 0 },
        ];
        // Berechne ml-Werte
        for (const v of values) {
          if (v.display.includes('l')) {
            v.ml = parseInt(v.display) * 1000;
          } else {
            v.ml = parseInt(v.display);
          }
        }
        const sorted = [...values].sort((a, b) => a.ml - b.ml);
        const shuffled = shuffle(values);

        return {
          id: genId('k3-lml'),
          topicId: 'k3-liter-milliliter',
          question: 'Ordne die Mengen von wenig nach viel.',
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          items: shuffled.map(v => v.display),
          correctAnswer: sorted.map(v => v.display).join(', '),
          hint: 'Rechne alle Werte in Milliliter um und vergleiche.',
          explanation: `Richtige Reihenfolge: ${sorted.map(v => `${v.display} (${v.ml} ml)`).join(', ')}.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 30,
        };
      }

      // True-False
      const l = randInt(1, 5);
      const ml = randInt(500, 2000);
      const isTrue = randInt(0, 1) === 0;
      const statement = isTrue
        ? `${l} l sind weniger als ${l * 1000 + 1} ml.`
        : `${l} l sind mehr als ${l * 1000 + 500} ml.`;

      return {
        id: genId('k3-lml'),
        topicId: 'k3-liter-milliliter',
        question: `Stimmt das? ${statement}`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: `Rechne um: ${l} l = ${l * 1000} ml.`,
        explanation: `${l} l = ${l * 1000} ml. Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: Gemischte Einheiten addieren
    const l1 = randInt(1, 3);
    const ml1 = randInt(100, 900);
    const l2 = randInt(1, 3);
    const ml2 = randInt(100, 900);
    const totalMl = l1 * 1000 + ml1 + l2 * 1000 + ml2;
    const totalL = Math.floor(totalMl / 1000);
    const restMl = totalMl % 1000;

    return {
      id: genId('k3-lml'),
      topicId: 'k3-liter-milliliter',
      question: `${l1} l ${ml1} ml + ${l2} l ${ml2} ml = ? ml insgesamt`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: totalMl,
      hint: `Rechne alles in ml um: ${l1} l ${ml1} ml = ${l1 * 1000 + ml1} ml.`,
      explanation: `${l1 * 1000 + ml1} ml + ${l2 * 1000 + ml2} ml = ${totalMl} ml (= ${totalL} l ${restMl} ml).`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 35,
      visualConfig: {
        type: 'scale' as const,
        props: { leftWeight: l1 * 1000 + ml1, rightWeight: l2 * 1000 + ml2 },
      },
    };
  },
};
