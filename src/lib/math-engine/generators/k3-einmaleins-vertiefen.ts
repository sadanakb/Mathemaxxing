import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k3-div-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const template: ExerciseTemplate = {
  topicId: 'k3-einmaleins-vertiefen',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Harder multiplication tables for K3: 6, 7, 8, 9
    const tablePool = difficulty === 1 ? [6, 7] : difficulty === 2 ? [6, 7, 8] : [6, 7, 8, 9];
    const table = tablePool[randInt(0, tablePool.length - 1)];
    const factor = difficulty === 1 ? randInt(1, 5) : difficulty === 2 ? randInt(2, 8) : randInt(6, 10);
    const product = table * factor;
    const distractors = [product - table, product + table, product - 1]
      .filter(d => d > 0 && d !== product).slice(0, 3);

    if (variant === 0) {
      // number-input (division form: product ÷ table = ?)
      return {
        id: genId(), topicId: 'k3-einmaleins-vertiefen',
        question: `${product} ÷ ${table} = ?`,
        questionLatex: `${product} \\div ${table} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: factor, distractors,
        hint: `Frage: ${table} mal was ergibt ${product}?`,
        explanation: `${product} ÷ ${table} = ${factor}, weil ${table} × ${factor} = ${product}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 15 : difficulty === 2 ? 20 : 25,
      };
    }

    if (variant === 1) {
      // speed-quiz: schnelle Multiplikation
      return {
        id: genId(), topicId: 'k3-einmaleins-vertiefen',
        question: `Schnell! ${table} × ${factor} = ?`,
        questionLatex: `${table} \\times ${factor} = ?`,
        answerType: 'number', exerciseType: 'speed-quiz',
        correctAnswer: product,
        timeLimit: difficulty === 1 ? 8 : difficulty === 2 ? 6 : 5,
        distractors: [product + table, product - table, product + 1].filter(d => d > 0 && d !== product).slice(0, 3),
        hint: `${table}er-Reihe: ${Array.from({ length: Math.min(factor, 5) }, (_, i) => table * (i + 1)).join(', ')}, ...`,
        explanation: `${table} × ${factor} = ${product}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 8 : 6,
      };
    }

    if (variant === 2) {
      // memory-pairs: Malaufgabe ↔ Ergebnis
      const pairsCount = 4;
      const usedProducts = new Set<number>();
      const pairs: [string, string][] = [];
      const allFactors = Array.from({ length: 10 }, (_, i) => i + 1);
      const shuffledFactors = shuffle(allFactors).slice(0, pairsCount);
      for (const f of shuffledFactors) {
        const p = table * f;
        if (!usedProducts.has(p)) {
          usedProducts.add(p);
          pairs.push([`${table} × ${f}`, String(p)]);
        }
      }
      return {
        id: genId(), topicId: 'k3-einmaleins-vertiefen',
        question: `Memory: Ordne die ${table}er-Aufgaben den richtigen Ergebnissen zu!`,
        answerType: 'matching', exerciseType: 'memory-pairs',
        correctAnswer: 'ok',
        pairs: pairs.slice(0, 4),
        hint: `Denke an die ${table}er-Reihe.`,
        explanation: `${pairs.map(p => `${p[0]}=${p[1]}`).join(', ')}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    // variant === 3: fill-table — Malreihe vervollständigen
    const startFactor = randInt(1, 5);
    const tableCells: (string | null)[] = [];
    const correctCells: string[] = [];
    for (let f = startFactor; f <= startFactor + 4; f++) {
      const p = table * f;
      const hide = randInt(0, 1) === 0;
      tableCells.push(hide ? null : String(p));
      correctCells.push(String(p));
    }
    return {
      id: genId(), topicId: 'k3-einmaleins-vertiefen',
      question: `Ergänze die ${table}er-Malreihe: ${table}×${startFactor} bis ${table}×${startFactor + 4}`,
      answerType: 'drag-drop', exerciseType: 'fill-table',
      correctAnswer: correctCells.join(', '),
      tableConfig: {
        headers: Array.from({ length: 5 }, (_, i) => `${table}×${startFactor + i}`),
        rows: [tableCells],
        correctRows: [correctCells],
      },
      hint: `Fange mit ${table} × ${startFactor} = ${table * startFactor} an und addiere immer ${table}.`,
      explanation: correctCells.map((v, i) => `${table}×${startFactor + i}=${v}`).join(', '),
      difficulty, category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  },
};
