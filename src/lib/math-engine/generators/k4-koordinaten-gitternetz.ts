import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-koordinaten-gitternetz',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const gridW = difficulty === 1 ? 6 : difficulty === 2 ? 8 : 10;
    const gridH = difficulty === 1 ? 6 : difficulty === 2 ? 8 : 10;
    const x = randInt(1, gridW - 1);
    const y = randInt(1, gridH - 1);

    if (variant === 0) {
      // number-input: Koordinate ablesen
      const askX = randInt(0, 1) === 0;
      return {
        id: genId('k4-koord'), topicId: 'k4-koordinaten-gitternetz',
        question: `Punkt A liegt bei (${x} | ${y}). Was ist der ${askX ? 'x-Wert (waagerecht)' : 'y-Wert (senkrecht)'} von Punkt A?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: askX ? x : y,
        gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'A' }] },
        visualConfig: {
          type: 'coordinate-system',
          props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [{ x, y, label: 'A' }], showGrid: true },
        },
        hint: `Der ${askX ? 'x-Wert' : 'y-Wert'} gibt an, wie weit der Punkt ${askX ? 'nach rechts' : 'nach oben'} liegt.`,
        explanation: `Punkt A liegt bei (${x} | ${y}). Der ${askX ? 'x-Wert' : 'y-Wert'} ist ${askX ? x : y}.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      // drag-onto-grid: Punkt einzeichnen
      return {
        id: genId('k4-koord'), topicId: 'k4-koordinaten-gitternetz',
        question: `Zeichne den Punkt B bei (${x} | ${y}) in das Gitternetz ein.`,
        answerType: 'drag-drop', exerciseType: 'drag-onto-grid',
        correctAnswer: `(${x}|${y})`,
        gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'B' }] },
        visualConfig: {
          type: 'coordinate-system',
          props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [], showGrid: true },
        },
        hint: `Gehe ${x} Schritte nach rechts und ${y} Schritte nach oben.`,
        explanation: `Punkt B liegt bei (${x} | ${y}): ${x} nach rechts, ${y} nach oben.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 20,
      };
    }

    if (variant === 2) {
      // true-false: Liegt Punkt A bei diesen Koordinaten?
      const showCorrect = randInt(0, 1) === 0;
      const shownX = showCorrect ? x : x + (randInt(0, 1) === 0 ? 1 : -1);
      const shownY = showCorrect ? y : y + (randInt(0, 1) === 0 ? 1 : -1);
      const isTrue = shownX === x && shownY === y;
      return {
        id: genId('k4-koord'), topicId: 'k4-koordinaten-gitternetz',
        question: `Stimmt es? Punkt A liegt bei (${shownX} | ${shownY}).`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'A' }] },
        visualConfig: {
          type: 'coordinate-system',
          props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [{ x, y, label: 'A' }], showGrid: true },
        },
        hint: 'Lies zuerst den x-Wert (waagerecht), dann den y-Wert (senkrecht) ab.',
        explanation: isTrue
          ? `Ja, Punkt A liegt bei (${x} | ${y}).`
          : `Nein, Punkt A liegt bei (${x} | ${y}), nicht bei (${shownX} | ${shownY}).`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 15,
      };
    }

    // variant === 3: multiple-choice — Welche Koordinaten hat Punkt A?
    const wrong1 = `(${x + 1} | ${y})`;
    const wrong2 = `(${x} | ${y + 1})`;
    const wrong3 = `(${y} | ${x})`;
    const correct = `(${x} | ${y})`;
    const distractors = [wrong1, wrong2, wrong3].filter(d => d !== correct).slice(0, 3);
    return {
      id: genId('k4-koord'), topicId: 'k4-koordinaten-gitternetz',
      question: `Welche Koordinaten hat Punkt A?`,
      answerType: 'multiple-choice', exerciseType: 'multiple-choice',
      correctAnswer: correct, distractors,
      gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'A' }] },
      visualConfig: {
        type: 'coordinate-system',
        props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [{ x, y, label: 'A' }], showGrid: true },
      },
      hint: 'x-Wert = wie weit nach rechts. y-Wert = wie weit nach oben.',
      explanation: `Punkt A liegt ${x} Schritte nach rechts und ${y} Schritte nach oben: (${x} | ${y}).`,
      difficulty, category: 'Repräsentational', estimatedSeconds: 20,
    };
  },
};
