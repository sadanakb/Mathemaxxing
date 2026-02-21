import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-flaeche-und-umfang',
  generate(difficulty = 1): Exercise {
    const calcArea = randInt(0, 1) === 0 || difficulty === 1;

    if (difficulty === 1) {
      // Simple rectangle area
      const w = randInt(2, 8);
      const h = randInt(2, 8);
      const area = w * h;
      return {
        id: genId('k4-fla'),
        topicId: 'k4-flaeche-und-umfang',
        question: `Fläche des Rechtecks (${w} cm × ${h} cm) = ? cm²`,
        questionLatex: `A = ${w} \\times ${h} = ?`,
        answerType: 'number',
        correctAnswer: area,
        hint: 'Fläche = Länge × Breite',
        explanation: `A = ${w} × ${h} = ${area} cm²`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'rectangle', labels: { sides: [`${w} cm`, `${h} cm`, `${w} cm`, `${h} cm`] } },
        },
      };
    } else if (difficulty === 2) {
      // Rectangle perimeter or area, larger values
      const w = randInt(5, 20);
      const h = randInt(5, 20);
      if (calcArea) {
        const area = w * h;
        return {
          id: genId('k4-fla'),
          topicId: 'k4-flaeche-und-umfang',
          question: `Wie groß ist die Fläche eines Rechtecks mit Länge ${w} cm und Breite ${h} cm?`,
          answerType: 'number',
          correctAnswer: area,
          hint: 'A = Länge × Breite',
          explanation: `A = ${w} × ${h} = ${area} cm²`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 40,
        };
      } else {
        const perimeter = 2 * (w + h);
        return {
          id: genId('k4-fla'),
          topicId: 'k4-flaeche-und-umfang',
          question: `Wie groß ist der Umfang eines Rechtecks mit Länge ${w} cm und Breite ${h} cm?`,
          answerType: 'number',
          correctAnswer: perimeter,
          hint: 'U = 2 × (Länge + Breite)',
          explanation: `U = 2 × (${w} + ${h}) = 2 × ${w + h} = ${perimeter} cm`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 40,
        };
      }
    } else {
      // Find missing side given area or perimeter
      const knownSide = randInt(4, 15);
      if (calcArea) {
        const area = knownSide * randInt(4, 12);
        const missing = area / knownSide;
        return {
          id: genId('k4-fla'),
          topicId: 'k4-flaeche-und-umfang',
          question: `Ein Rechteck hat eine Fläche von ${area} cm² und eine Seite von ${knownSide} cm. Wie lang ist die andere Seite?`,
          answerType: 'number',
          correctAnswer: missing,
          hint: `Andere Seite = Fläche ÷ bekannte Seite = ${area} ÷ ${knownSide}`,
          explanation: `${area} ÷ ${knownSide} = ${missing} cm`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 50,
        };
      } else {
        const other = randInt(4, 15);
        const perimeter = 2 * (knownSide + other);
        return {
          id: genId('k4-fla'),
          topicId: 'k4-flaeche-und-umfang',
          question: `Ein Rechteck hat einen Umfang von ${perimeter} cm und eine Seite von ${knownSide} cm. Wie lang ist die andere Seite?`,
          answerType: 'number',
          correctAnswer: other,
          hint: `Andere Seite = (Umfang ÷ 2) − bekannte Seite`,
          explanation: `(${perimeter} ÷ 2) − ${knownSide} = ${perimeter / 2} − ${knownSide} = ${other} cm`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 50,
        };
      }
    }
  },
};
