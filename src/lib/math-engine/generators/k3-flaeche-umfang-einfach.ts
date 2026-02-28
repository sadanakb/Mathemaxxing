import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-flaeche-umfang-einfach — Fläche und Umfang (einfach)
 *
 * Difficulty 1: Kästchen zählen (area-count)
 * Difficulty 2: Umfang eines Rechtecks berechnen
 * Difficulty 3: Fläche und Umfang kombiniert
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-flaeche-umfang-einfach',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Kästchen zählen
      const rows = randInt(2, 4);
      const cols = randInt(2, 5);
      const area = rows * cols;

      // Erzeuge ein Grid
      const grid: boolean[][] = [];
      for (let r = 0; r < rows; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < cols; c++) {
          row.push(true);
        }
        grid.push(row);
      }

      return {
        id: genId('k3-flum'),
        topicId: 'k3-flaeche-umfang-einfach',
        question: `Wie viele Kästchen hat diese Figur? (${cols} breit, ${rows} hoch)`,
        answerType: 'number',
        exerciseType: 'area-count',
        correctAnswer: area,
        areaGrid: grid,
        hint: 'Zähle alle angemalten Kästchen oder rechne Breite × Höhe.',
        explanation: `${cols} × ${rows} = ${area} Kästchen.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Umfang eines Rechtecks
      const a = randInt(2, 10);
      const b = randInt(2, 10);
      const umfang = 2 * (a + b);

      return {
        id: genId('k3-flum'),
        topicId: 'k3-flaeche-umfang-einfach',
        question: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist der Umfang?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: umfang,
        hint: `Umfang = 2 × (Länge + Breite) = 2 × (${a} + ${b})`,
        explanation: `Umfang = 2 × (${a} + ${b}) = 2 × ${a + b} = ${umfang} cm.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'rectangle', labels: { sides: [`${a} cm`, `${b} cm`, `${a} cm`, `${b} cm`] } },
        } as VisualConfig,
      };
    }

    // Difficulty 3: Fläche und Umfang
    const a = randInt(3, 8);
    const b = randInt(3, 8);
    const flaeche = a * b;
    const umfang = 2 * (a + b);
    const askFlaeche = randInt(0, 1) === 0;

    if (askFlaeche) {
      // Fläche mit area-count
      const grid: boolean[][] = [];
      for (let r = 0; r < b; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < a; c++) {
          row.push(true);
        }
        grid.push(row);
      }

      return {
        id: genId('k3-flum'),
        topicId: 'k3-flaeche-umfang-einfach',
        question: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist die Fläche in cm²?`,
        answerType: 'number',
        exerciseType: 'area-count',
        correctAnswer: flaeche,
        areaGrid: grid,
        hint: 'Fläche = Länge × Breite.',
        explanation: `Fläche = ${a} × ${b} = ${flaeche} cm².`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // Variant selector for difficulty 3: 0 = number-input (umfang), 1 = area-count (grid), 2 = true-false (umfang check)
    const variant = randInt(0, 2);

    if (variant === 1) {
      // area-count: irregular L-shape grid (remove one corner rectangle)
      const removeRows = randInt(1, Math.min(2, b - 1));
      const removeCols = randInt(1, Math.min(2, a - 1));
      const grid: boolean[][] = [];
      for (let r = 0; r < b; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < a; c++) {
          // Remove top-right corner to make L-shape
          const inRemovedArea = r < removeRows && c >= a - removeCols;
          row.push(!inRemovedArea);
        }
        grid.push(row);
      }
      const lShapeArea = b * a - removeRows * removeCols;
      return {
        id: genId('k3-flum'),
        topicId: 'k3-flaeche-umfang-einfach',
        question: `Wie viele Kästchen hat diese L-förmige Figur? (${a} breit, ${b} hoch, Ecke ${removeCols}×${removeRows} fehlt)`,
        answerType: 'number',
        exerciseType: 'area-count',
        correctAnswer: lShapeArea,
        areaGrid: grid,
        hint: `Zähle alle Kästchen, oder rechne: ${a}×${b} − ${removeCols}×${removeRows}.`,
        explanation: `${a}×${b} = ${a * b} minus ${removeCols}×${removeRows} = ${removeRows * removeCols} fehlende Kästchen → ${lShapeArea} Kästchen.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    if (variant === 2) {
      // true-false: is this the correct Umfang?
      const wrongUmfang = umfang + (randInt(0, 1) === 0 ? randInt(1, 4) * 2 : -randInt(1, 4) * 2);
      const isCorrect = randInt(0, 1) === 0;
      const claimedUmfang = isCorrect ? umfang : wrongUmfang;
      return {
        id: genId('k3-flum'),
        topicId: 'k3-flaeche-umfang-einfach',
        question: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Stimmt es, dass der Umfang ${claimedUmfang} cm beträgt?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isCorrect ? 'Ja' : 'Nein',
        distractors: isCorrect ? ['Nein'] : ['Ja'],
        hint: `Umfang = 2 × (${a} + ${b}) = ?`,
        explanation: `Umfang = 2 × (${a} + ${b}) = 2 × ${a + b} = ${umfang} cm. Der angegebene Wert ${claimedUmfang} cm ist ${isCorrect ? 'richtig' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    return {
      id: genId('k3-flum'),
      topicId: 'k3-flaeche-umfang-einfach',
      question: `Ein Rechteck hat die Seiten ${a} cm und ${b} cm. Berechne den Umfang und die Fläche. Gib den Umfang an.`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: umfang,
      hint: `Umfang = 2 × (${a} + ${b}). Fläche = ${a} × ${b}.`,
      explanation: `Umfang = 2 × (${a} + ${b}) = ${umfang} cm. Fläche = ${a} × ${b} = ${flaeche} cm².`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 35,
    };
  },
};
