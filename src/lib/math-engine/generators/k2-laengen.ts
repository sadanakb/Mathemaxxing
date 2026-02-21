import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-laeng-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-laengen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // cm only, simple comparisons and conversions
      const variant = randInt(0, 2);

      if (variant === 0) {
        // "Was ist länger: X cm oder Y cm?" (true-false)
        const a = randInt(5, 30);
        let b = randInt(5, 30);
        while (b === a) b = randInt(5, 30);
        const claim = a > b;
        return {
          id: genId(),
          topicId: 'k2-laengen',
          question: `Stimmt das? ${a} cm ist länger als ${b} cm.`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: claim ? 'wahr' : 'falsch',
          hint: 'Vergleiche die Zahlen: Die größere Zahl bedeutet eine größere Länge.',
          explanation: claim
            ? `Ja, ${a} cm ist mehr als ${b} cm.`
            : `Nein, ${b} cm ist mehr als ${a} cm.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 10,
        };
      }

      if (variant === 1) {
        // Simple measurement: "Wie viele cm sind X cm + Y cm?"
        const a = randInt(3, 15);
        const b = randInt(3, 15);
        const answer = a + b;
        return {
          id: genId(),
          topicId: 'k2-laengen',
          question: `Ein Stift ist ${a} cm lang, ein Radiergummi ist ${b} cm lang. Wie lang sind beide zusammen?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [answer + 1, answer - 1, answer + 2].filter(d => d > 0 && d !== answer),
          hint: `Addiere die beiden Längen: ${a} + ${b}.`,
          explanation: `${a} cm + ${b} cm = ${answer} cm.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 15,
          visualConfig: {
            type: 'ruler',
            props: { length: Math.max(a, b) + 2, unit: 'cm', pointer: a, showNumbers: true },
          } as VisualConfig,
        };
      }

      // Drag-sort: order lengths (all cm)
      const lengths = new Set<number>();
      while (lengths.size < 4) lengths.add(randInt(2, 50));
      const sorted = [...lengths].sort((a, b) => a - b);
      const shuffled = shuffle([...sorted]);

      return {
        id: genId(),
        topicId: 'k2-laengen',
        question: 'Ordne diese Längen von kurz nach lang!',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        correctAnswer: sorted.map(l => `${l} cm`).join(', '),
        items: shuffled.map(l => `${l} cm`),
        hint: 'Schaue auf die Zahlen und ordne sie von der kleinsten zur größten.',
        explanation: `Die richtige Reihenfolge ist: ${sorted.map(l => `${l} cm`).join(', ')}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 20,
      };
    }

    if (difficulty === 2) {
      // cm and m, simple conversions
      const variant = randInt(0, 2);

      if (variant === 0) {
        // "Wie viele cm sind 1 m / 2 m?" (number-input)
        const meters = randInt(1, 3);
        const answer = meters * 100;
        return {
          id: genId(),
          topicId: 'k2-laengen',
          question: `Wie viele cm sind ${meters} m?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [answer + 10, answer - 10, answer + 50].filter(d => d > 0 && d !== answer),
          hint: '1 Meter = 100 Zentimeter.',
          explanation: `${meters} m = ${meters} × 100 cm = ${answer} cm.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      if (variant === 1) {
        // "Was ist länger: 30 cm oder 1 m?" (multiple-choice)
        const cm = randInt(20, 80);
        const m = 1;
        const cmIsLonger = cm > 100;
        const correct = cmIsLonger ? `${cm} cm` : `${m} m`;
        const wrong = cmIsLonger ? `${m} m` : `${cm} cm`;

        return {
          id: genId(),
          topicId: 'k2-laengen',
          question: `Was ist länger?`,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: correct,
          distractors: [wrong, 'Beide gleich lang'],
          hint: 'Rechne alles in cm um: 1 m = 100 cm.',
          explanation: `${m} m = 100 cm. Da ${100} cm ${cm > 100 ? '<' : '>'} ${cm} cm ist, ist ${correct} länger.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      // Drag-sort with mixed units
      const items = ['5 cm', '50 cm', '1 m', '2 m'];
      const sortedItems = ['5 cm', '50 cm', '1 m', '2 m'];
      const shuffled = shuffle([...items]);

      return {
        id: genId(),
        topicId: 'k2-laengen',
        question: 'Ordne nach Größe: von kurz nach lang!',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        correctAnswer: sortedItems.join(', '),
        items: shuffled,
        hint: 'Rechne alles in cm um, um zu vergleichen. 1 m = 100 cm.',
        explanation: `Die richtige Reihenfolge ist: ${sortedItems.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // Difficulty 3: mixed units, calculations with lengths
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Conversion with addition: "1 m 30 cm = ___ cm"
      const m = randInt(1, 3);
      const cm = randInt(10, 90);
      const answer = m * 100 + cm;

      return {
        id: genId(),
        topicId: 'k2-laengen',
        question: `Wie viele cm sind ${m} m und ${cm} cm zusammen?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 10, answer - 10, m * 100].filter(d => d > 0 && d !== answer),
        hint: `Rechne die Meter zuerst in cm um: ${m} m = ${m * 100} cm.`,
        explanation: `${m} m = ${m * 100} cm. ${m * 100} cm + ${cm} cm = ${answer} cm.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 1) {
      // Difference: "Wie viel cm ist 1 m länger als 60 cm?"
      const metersCm = 100;
      const shorter = randInt(20, 90);
      const answer = metersCm - shorter;

      return {
        id: genId(),
        topicId: 'k2-laengen',
        question: `Wie viel cm ist 1 m länger als ${shorter} cm?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 5, answer - 5, shorter].filter(d => d > 0 && d !== answer),
        hint: '1 m = 100 cm. Ziehe die kürzere Länge ab.',
        explanation: `1 m = 100 cm. 100 cm − ${shorter} cm = ${answer} cm.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // True-false with tricky comparison
    const cmValue = randInt(90, 150);
    const isTrue = cmValue > 100;
    return {
      id: genId(),
      topicId: 'k2-laengen',
      question: `Stimmt das? ${cmValue} cm ist mehr als 1 m.`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: isTrue ? 'wahr' : 'falsch',
      hint: 'Wie viele cm hat 1 m?',
      explanation: isTrue
        ? `Ja, ${cmValue} cm > 100 cm = 1 m.`
        : `Nein, ${cmValue} cm < 100 cm = 1 m.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
