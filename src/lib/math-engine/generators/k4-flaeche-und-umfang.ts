import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-flaeche-und-umfang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Scale dimensions by difficulty
    const w = difficulty === 1 ? randInt(2, 8) : difficulty === 2 ? randInt(5, 20) : randInt(4, 15);
    const h = difficulty === 1 ? randInt(2, 8) : difficulty === 2 ? randInt(5, 20) : randInt(4, 15);
    const area = w * h;
    const perimeter = 2 * (w + h);

    if (variant === 0) {
      // number-input: Fläche berechnen
      return {
        id: genId('k4-fla'), topicId: 'k4-flaeche-und-umfang',
        question: `Berechne die Fläche des Rechtecks (${w} cm × ${h} cm).`,
        questionLatex: `A = ${w} \\times ${h} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: area,
        hint: 'Fläche = Länge × Breite',
        explanation: `A = ${w} × ${h} = ${area} cm²`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 35 : 45,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'rectangle', labels: { sides: [`${w} cm`, `${h} cm`, `${w} cm`, `${h} cm`] } },
        },
      };
    }

    if (variant === 1) {
      // multiple-choice: Umfang berechnen
      const distractors = [2 * w + 2 * h + 2, w * h, 2 * (w + h) + h]
        .filter(d => d > 0 && d !== perimeter).slice(0, 3);
      return {
        id: genId('k4-fla'), topicId: 'k4-flaeche-und-umfang',
        question: `Wie groß ist der Umfang des Rechtecks (${w} cm × ${h} cm)?`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: perimeter, distractors,
        hint: 'Umfang = 2 × (Länge + Breite)',
        explanation: `U = 2 × (${w} + ${h}) = 2 × ${w + h} = ${perimeter} cm`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    }

    if (variant === 2) {
      // true-false: Stimmt die Berechnung?
      const askArea = randInt(0, 1) === 0;
      const correct = askArea ? area : perimeter;
      const showCorrect = randInt(0, 1) === 0;
      const shown = showCorrect ? correct : correct + (randInt(0, 1) === 0 ? w : -h);
      return {
        id: genId('k4-fla'), topicId: 'k4-flaeche-und-umfang',
        question: `Stimmt das? ${askArea ? 'Fläche' : 'Umfang'} des Rechtecks (${w} cm × ${h} cm) = ${shown}${askArea ? ' cm²' : ' cm'}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shown === correct) ? 'wahr' : 'falsch',
        hint: askArea ? `A = ${w} × ${h}` : `U = 2 × (${w} + ${h})`,
        explanation: shown === correct
          ? `Ja: ${askArea ? `A = ${w} × ${h} = ${area} cm²` : `U = 2 × (${w} + ${h}) = ${perimeter} cm`}.`
          : `Nein: ${askArea ? `A = ${w} × ${h} = ${area} cm²` : `U = 2 × (${w} + ${h}) = ${perimeter} cm`}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // variant === 3: fill-table — 3 Rechtecke, fehlende Flächen/Umfänge ergänzen
    const sides: [number, number][] = [
      [randInt(2, 6), randInt(2, 6)],
      [randInt(3, 8), randInt(3, 8)],
      [randInt(4, 10), randInt(4, 10)],
    ];
    const headers = ['Länge (cm)', 'Breite (cm)', 'Fläche (cm²)', 'Umfang (cm)'];
    const rows: (string | null)[][] = sides.map(([l, b]) => {
      const a = l * b;
      const u = 2 * (l + b);
      const hideArea = randInt(0, 1) === 0;
      return [String(l), String(b), hideArea ? null : String(a), hideArea ? String(u) : null];
    });
    const correctRows: string[][] = sides.map(([l, b]) => [String(l), String(b), String(l * b), String(2 * (l + b))]);
    return {
      id: genId('k4-fla'), topicId: 'k4-flaeche-und-umfang',
      question: 'Ergänze die Tabelle: Berechne die fehlenden Flächen und Umfänge.',
      answerType: 'drag-drop', exerciseType: 'fill-table',
      correctAnswer: correctRows.map(r => r.join('/')).join(', '),
      tableConfig: { headers, rows, correctRows },
      hint: 'Fläche = Länge × Breite. Umfang = 2 × (Länge + Breite).',
      explanation: sides.map(([l, b]) => `${l}×${b}: A=${l * b} cm², U=${2 * (l + b)} cm`).join('; '),
      difficulty, category: 'Abstrakt',
      estimatedSeconds: 50,
    };
  },
};
