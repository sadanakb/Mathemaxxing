import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-flaechenberechnung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Triangle area: A = (base * height) / 2
      const base = randInt(2, 12) * 2; // even number ensures integer result
      const height = randInt(2, 10);
      const area = (base * height) / 2;
      return {
        id: genId('k7-fla'),
        topicId: 'k7-flaechenberechnung',
        question: `Fläche des Dreiecks: Grundlinie ${base} cm, Höhe ${height} cm. A = ?`,
        questionLatex: `A = \\frac{${base} \\times ${height}}{2} = ?`,
        answerType: 'number',
        correctAnswer: area,
        hint: 'Formel: A = (Grundlinie × Höhe) ÷ 2',
        explanation: `A = (${base} × ${height}) ÷ 2 = ${base * height} ÷ 2 = ${area} cm²`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'triangle' as const, sideA: base, height: height, showDimensions: true },
        },
      };
    } else if (difficulty === 2) {
      // Parallelogram: A = base * height
      const base = randInt(4, 15);
      const height = randInt(3, 12);
      const area = base * height;
      return {
        id: genId('k7-fla'),
        topicId: 'k7-flaechenberechnung',
        question: `Fläche des Parallelogramms: Grundlinie ${base} cm, Höhe ${height} cm. A = ?`,
        questionLatex: `A = ${base} \\times ${height} = ?`,
        answerType: 'number',
        correctAnswer: area,
        hint: 'Formel: A = Grundlinie × Höhe',
        explanation: `A = ${base} × ${height} = ${area} cm²`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'parallelogram' as const, width: base, height: height, showDimensions: true },
        },
      };
    } else {
      // Trapezoid: A = (a + c) / 2 * h
      const a = randInt(4, 12);
      const c = randInt(2, a - 1); // shorter parallel side
      const h = randInt(3, 10);
      const area = ((a + c) / 2) * h;
      return {
        id: genId('k7-fla'),
        topicId: 'k7-flaechenberechnung',
        question: `Fläche des Trapezes: parallele Seiten ${a} cm und ${c} cm, Höhe ${h} cm. A = ?`,
        questionLatex: `A = \\frac{(${a} + ${c})}{2} \\times ${h} = ?`,
        answerType: 'number',
        correctAnswer: area,
        hint: 'Formel: A = (Seite a + Seite c) ÷ 2 × Höhe',
        explanation: `A = (${a} + ${c}) ÷ 2 × ${h} = ${(a + c) / 2} × ${h} = ${area} cm²`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'trapezoid' as const, sideA: a, sideB: c, height: h, showDimensions: true },
        },
      };
    }
  },
};
