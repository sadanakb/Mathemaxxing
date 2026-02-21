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

function dezDE(n: number): string {
  return n.toFixed(2).replace('.', ',');
}

/**
 * k4-dezimalzahlen-einfuehrung — Dezimalzahlen als Kommazahlen (Einführung)
 *
 * Difficulty 1: Dezimalzahlen im Geldkontext (number-input)
 * Difficulty 2: Dezimalzahlen ordnen (drag-sort), Bruch → Dezimalzahl (number-input)
 * Difficulty 3: Vergleiche und true-false
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-dezimalzahlen-einfuehrung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Euro und Cent → Dezimalzahl (number-input)
      const euro = randInt(1, 20);
      const cent = randInt(1, 99);
      const dezimal = euro + cent / 100;

      return {
        id: genId('k4-dez'),
        topicId: 'k4-dezimalzahlen-einfuehrung',
        question: `${euro} Euro und ${cent} Cent — wie viel Euro ist das als Kommazahl? (z.B. 3,50 als 3.50)`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: parseFloat(dezimal.toFixed(2)),
        tolerance: 0.001,
        hint: `${cent} Cent = ${cent}/100 Euro = 0,${cent < 10 ? '0' + cent : cent} Euro.`,
        explanation: `${euro} Euro und ${cent} Cent = ${dezDE(dezimal)} Euro.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (difficulty === 2) {
      // Mischung: drag-sort und Bruch→Dezimal
      const useDragSort = randInt(0, 1) === 0;

      if (useDragSort) {
        // 4 Dezimalzahlen ordnen
        const nums = new Set<number>();
        while (nums.size < 4) {
          const ganzer = randInt(0, 5);
          const zehntel = randInt(0, 9);
          const hundertstel = randInt(0, 9);
          const val = ganzer + zehntel / 10 + hundertstel / 100;
          nums.add(parseFloat(val.toFixed(2)));
        }
        const arr = [...nums];
        const sorted = [...arr].sort((a, b) => a - b);
        const shuffled = shuffle(arr);

        return {
          id: genId('k4-dez'),
          topicId: 'k4-dezimalzahlen-einfuehrung',
          question: 'Ordne die Dezimalzahlen von klein nach groß.',
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          items: shuffled.map(n => dezDE(n)),
          correctAnswer: sorted.map(n => dezDE(n)).join(', '),
          hint: 'Vergleiche zuerst den ganzen Teil, dann die Zehntelstelle, dann die Hundertstelstelle.',
          explanation: `Richtige Reihenfolge: ${sorted.map(n => dezDE(n)).join(' < ')}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 35,
        };
      }

      // Bruch → Dezimalzahl
      const options: [number, number][] = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10]];
      const [z, n] = options[randInt(0, options.length - 1)];
      const dezimal = z / n;

      return {
        id: genId('k4-dez'),
        topicId: 'k4-dezimalzahlen-einfuehrung',
        question: `Schreibe den Bruch ${z}/${n} als Dezimalzahl.`,
        questionLatex: `\\frac{${z}}{${n}} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: parseFloat(dezimal.toFixed(2)),
        tolerance: 0.001,
        hint: `Teile ${z} durch ${n}.`,
        explanation: `${z} ÷ ${n} = ${dezDE(dezimal)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // difficulty === 3: true-false Vergleiche
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Ist 0,5 > 0,35? — true/false
      const a = parseFloat((randInt(1, 50) / 10).toFixed(1));
      const b = parseFloat((randInt(1, 99) / 100 + randInt(0, 4)).toFixed(2));
      const claimGreater = randInt(0, 1) === 0;
      const isTrue = claimGreater ? a > b : a < b;
      const symbol = claimGreater ? '>' : '<';

      return {
        id: genId('k4-dez'),
        topicId: 'k4-dezimalzahlen-einfuehrung',
        question: `Stimmt es? ${dezDE(a)} ${symbol} ${dezDE(b)}`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Vergleiche Stelle für Stelle: zuerst Einer, dann Zehntel, dann Hundertstel.',
        explanation: `${dezDE(a)} ${a > b ? '>' : a < b ? '<' : '='} ${dezDE(b)} — die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Längenumrechnung: cm → m als Dezimalzahl
    const cm = randInt(10, 250);
    const m = cm / 100;

    return {
      id: genId('k4-dez'),
      topicId: 'k4-dezimalzahlen-einfuehrung',
      question: `Wie viel Meter sind ${cm} cm? Schreibe als Dezimalzahl.`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: parseFloat(m.toFixed(2)),
      tolerance: 0.001,
      hint: '100 cm = 1 m. Teile die cm-Zahl durch 100.',
      explanation: `${cm} cm ÷ 100 = ${dezDE(m)} m.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
    };
  },
};
