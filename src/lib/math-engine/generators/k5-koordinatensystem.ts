import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const pointLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

export const template: ExerciseTemplate = {
  topicId: 'k5-koordinatensystem',
  generate(difficulty = 1): Exercise {
    const maxCoord = difficulty === 1 ? 5 : difficulty === 2 ? 10 : 10;
    const allowNegative = difficulty === 3;

    // Generate 4 distinct points
    const points: Array<{ label: string; x: number; y: number }> = [];
    const used = new Set<string>();
    const labels = pointLabels.slice(0, 4);

    for (const label of labels) {
      let x: number, y: number, key: string;
      do {
        x = allowNegative ? randInt(-maxCoord, maxCoord) : randInt(0, maxCoord);
        y = allowNegative ? randInt(-maxCoord, maxCoord) : randInt(0, maxCoord);
        key = `${x},${y}`;
      } while (used.has(key));
      used.add(key);
      points.push({ label, x, y });
    }

    // Pick one target point
    const targetIdx = randInt(0, 3);
    const target = points[targetIdx];
    const correct = target.label;
    const distractors = labels.filter(l => l !== correct);

    return {
      id: genId('k5-koo'),
      topicId: 'k5-koordinatensystem',
      question: `Welcher Punkt liegt bei (${target.x}|${target.y})?\n` +
        points.map(p => `${p.label} = (${p.x}|${p.y})`).join(', '),
      answerType: 'multiple-choice',
      correctAnswer: correct,
      distractors,
      visualConfig: {
        type: 'coordinate-system',
        props: {
          xMin: allowNegative ? -maxCoord : 0,
          xMax: maxCoord,
          yMin: allowNegative ? -maxCoord : 0,
          yMax: maxCoord,
          points,
          showGrid: true,
        },
      },
      hint: `Gehe auf der x-Achse zu ${target.x}, dann auf der y-Achse zu ${target.y}.`,
      explanation: `Punkt ${correct} liegt bei (${target.x}|${target.y}).`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45,
    };
  },
};
