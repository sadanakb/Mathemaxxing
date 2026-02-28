import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-zahl20-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Shuffle an array in-place (Fisher-Yates) and return it. */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-zahlen-bis-20',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Nachfolger: "Welche Zahl kommt nach X?" (number-input)
      const x = randInt(1, 10);
      const answer = x + 1;
      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-20',
        question: `Welche Zahl kommt nach ${x}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [x, answer + 1, answer + 2].filter(d => d !== answer && d >= 0 && d <= 20),
        hint: `Der Nachfolger von ${x} ist die nächste Zahl beim Zählen.`,
        explanation: `Die Zahl nach ${x} ist ${answer}. Beim Zählen kommt ${answer} direkt nach ${x}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
        visualConfig: { type: 'base10-blocks' as const, props: { tens: Math.floor(x / 10), ones: x % 10 } },
      };
    }

    if (difficulty === 2) {
      // Randomly pick between drag-sort and true-false
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Drag-sort: "Ordne diese Zahlen der Größe nach"
        const count = randInt(4, 5);
        const numbers = new Set<number>();
        while (numbers.size < count) {
          numbers.add(randInt(1, 20));
        }
        const sorted = [...numbers].sort((a, b) => a - b);
        const shuffled = shuffle([...sorted]);

        return {
          id: genId(),
          topicId: 'k1-zahlen-bis-20',
          question: 'Ordne diese Zahlen von klein nach groß!',
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          correctAnswer: sorted.join(', '),
          items: shuffled.map(String),
          hint: 'Finde zuerst die kleinste Zahl und stelle sie an den Anfang.',
          explanation: `Die richtige Reihenfolge ist: ${sorted.join(', ')}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      }

      // True-false: "Ist X größer als Y?"
      const x = randInt(1, 19);
      let y = randInt(1, 20);
      while (y === x) y = randInt(1, 20);
      const isTrue = x > y;
      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-20',
        question: `Stimmt das? ${x} ist größer als ${y}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Denke an den Zahlenstrahl: Welche Zahl liegt weiter rechts?',
        explanation: isTrue
          ? `${x} ist tatsächlich größer als ${y}, denn ${x} liegt weiter rechts auf dem Zahlenstrahl.`
          : `${x} ist nicht größer als ${y}. ${y} ist die größere Zahl.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    // Difficulty 3: "Welche Zahl liegt zwischen X und Y?", Vorgänger, or drag-onto-numberline
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Zahl zwischen X und Y
      const middle = randInt(2, 18);
      const x = middle - 1;
      const y = middle + 1;
      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-20',
        question: `Welche Zahl liegt zwischen ${x} und ${y}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: middle,
        distractors: [x, y, middle + 2].filter(d => d !== middle && d >= 0 && d <= 20),
        hint: `Zähle von ${x} aufwärts – welche Zahl kommt vor ${y}?`,
        explanation: `Zwischen ${x} und ${y} liegt die Zahl ${middle}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      // Vorgänger
      const x = randInt(2, 20);
      const answer = x - 1;
      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-20',
        question: `Was ist der Vorgänger von ${x}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [x, x + 1, answer - 1].filter(d => d !== answer && d >= 0 && d <= 20),
        hint: `Der Vorgänger ist die Zahl, die direkt vor ${x} kommt.`,
        explanation: `Der Vorgänger von ${x} ist ${answer}. Beim Rückwärtszählen kommt ${answer} direkt vor ${x}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    // variant === 2: drag-onto-numberline (0–20)
    const target = randInt(1, 19);
    return {
      id: genId(),
      topicId: 'k1-zahlen-bis-20',
      question: `Zeige die Zahl ${target} auf dem Zahlenstrahl!`,
      answerType: 'number',
      exerciseType: 'drag-onto-numberline',
      correctAnswer: target,
      numberlineConfig: { min: 0, max: 20, step: 1, targets: [target] },
      hint: `Zähle vom Anfang bis zur ${target} auf dem Zahlenstrahl.`,
      explanation: `Die Zahl ${target} liegt an Position ${target} auf dem Zahlenstrahl von 0 bis 20.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 18,
      visualConfig: { type: 'numberline' as const, props: { min: 0, max: 20 } },
    };
  },
};
