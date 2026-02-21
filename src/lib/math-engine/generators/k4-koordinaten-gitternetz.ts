import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k4-koordinaten-gitternetz — Koordinaten im Gitternetz
 *
 * Difficulty 1: Punkt ablesen (number-input für x oder y)
 * Difficulty 2: Punkt einzeichnen (drag-onto-grid)
 * Difficulty 3: Mehrere Punkte ablesen oder Figur beschreiben (number-input)
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-koordinaten-gitternetz',
  generate(difficulty = 1): Exercise {
    const gridW = difficulty === 1 ? 6 : difficulty === 2 ? 8 : 10;
    const gridH = difficulty === 1 ? 6 : difficulty === 2 ? 8 : 10;

    if (difficulty === 1) {
      // Punkt ablesen: Welche Koordinate hat Punkt A?
      const x = randInt(1, gridW - 1);
      const y = randInt(1, gridH - 1);
      const askX = randInt(0, 1) === 0;

      return {
        id: genId('k4-koord'),
        topicId: 'k4-koordinaten-gitternetz',
        question: `Punkt A liegt bei (${x} | ${y}). Was ist der ${askX ? 'x-Wert (waagerecht)' : 'y-Wert (senkrecht)'} von Punkt A?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: askX ? x : y,
        gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'A' }] },
        visualConfig: {
          type: 'coordinate-system',
          props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [{ x, y, label: 'A' }], showGrid: true },
        },
        hint: `Der ${askX ? 'x-Wert' : 'y-Wert'} gibt an, wie weit der Punkt ${askX ? 'nach rechts' : 'nach oben'} liegt.`,
        explanation: `Punkt A liegt bei (${x} | ${y}). Der ${askX ? 'x-Wert' : 'y-Wert'} ist ${askX ? x : y}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Punkt einzeichnen — drag-onto-grid
      const x = randInt(1, gridW - 1);
      const y = randInt(1, gridH - 1);

      return {
        id: genId('k4-koord'),
        topicId: 'k4-koordinaten-gitternetz',
        question: `Zeichne den Punkt B bei (${x} | ${y}) in das Gitternetz ein.`,
        answerType: 'drag-drop',
        exerciseType: 'drag-onto-grid',
        correctAnswer: `(${x}|${y})`,
        gridConfig: { width: gridW, height: gridH, points: [{ x, y, label: 'B' }] },
        visualConfig: {
          type: 'coordinate-system',
          props: { xMin: 0, xMax: gridW, yMin: 0, yMax: gridH, points: [], showGrid: true },
        },
        hint: `Gehe ${x} Schritte nach rechts und ${y} Schritte nach oben.`,
        explanation: `Punkt B liegt bei (${x} | ${y}): ${x} nach rechts, ${y} nach oben.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // difficulty === 3: Abstand zwischen Punkten oder Rechteck-Koordinaten
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Abstand auf einer Achse
      const x1 = randInt(1, 4);
      const y1 = randInt(1, 4);
      const horizontal = randInt(0, 1) === 0;
      const dist = randInt(2, 5);
      const x2 = horizontal ? x1 + dist : x1;
      const y2 = horizontal ? y1 : y1 + dist;

      return {
        id: genId('k4-koord'),
        topicId: 'k4-koordinaten-gitternetz',
        question: `Punkt A liegt bei (${x1} | ${y1}) und Punkt B bei (${x2} | ${y2}). Wie groß ist der Abstand zwischen A und B in Kästchen?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: dist,
        gridConfig: {
          width: gridW,
          height: gridH,
          points: [
            { x: x1, y: y1, label: 'A' },
            { x: x2, y: y2, label: 'B' },
          ],
        },
        hint: `Die Punkte liegen auf einer ${horizontal ? 'waagerechten' : 'senkrechten'} Linie. Zähle die Kästchen dazwischen.`,
        explanation: `${horizontal ? `|${x2} − ${x1}| = ${dist}` : `|${y2} − ${y1}| = ${dist}`} Kästchen Abstand.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 25,
      };
    }

    // Fehlender Eckpunkt eines Rechtecks
    const x1 = randInt(1, 3);
    const y1 = randInt(1, 3);
    const w = randInt(2, 5);
    const h = randInt(2, 4);
    // Ecken: (x1,y1), (x1+w,y1), (x1+w,y1+h), (x1,y1+h)
    const corners = [
      { x: x1, y: y1, label: 'A' },
      { x: x1 + w, y: y1, label: 'B' },
      { x: x1 + w, y: y1 + h, label: 'C' },
      { x: x1, y: y1 + h, label: 'D' },
    ];
    // Hide one corner
    const hideIdx = randInt(0, 3);
    const hidden = corners[hideIdx];
    const visible = corners.filter((_, i) => i !== hideIdx);

    return {
      id: genId('k4-koord'),
      topicId: 'k4-koordinaten-gitternetz',
      question: `Drei Ecken eines Rechtecks liegen bei ${visible.map(p => `${p.label}(${p.x}|${p.y})`).join(', ')}. Wo liegt die fehlende Ecke ${hidden.label}? Gib den x-Wert an.`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: hidden.x,
      gridConfig: {
        width: gridW,
        height: gridH,
        points: visible,
      },
      hint: 'Ein Rechteck hat 4 Ecken. Gegenüberliegende Seiten sind parallel und gleich lang.',
      explanation: `Die fehlende Ecke ${hidden.label} liegt bei (${hidden.x} | ${hidden.y}).`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 35,
    };
  },
};
