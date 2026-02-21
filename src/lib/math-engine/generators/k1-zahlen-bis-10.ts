import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-zahl10-${++counter}-${Date.now()}`; }
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
  topicId: 'k1-zahlen-bis-10',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    if (variant === 0) {
      // "Welche Zahl kommt nach X?" (number-input)
      const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 9;
      const x = randInt(1, max);
      const answer = x + 1;
      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-10',
        question: `Welche Zahl kommt nach ${x}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [x, answer + 1, x - 1].filter(d => d !== answer && d >= 1 && d <= 10),
        hint: `Zähle von ${x} weiter: ${x}, ...`,
        explanation: `Nach ${x} kommt ${answer}. Beim Zählen: ...${x}, ${answer}...`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
        visualConfig: { type: 'base10-blocks' as const, props: { ones: x } },
      };
    }

    if (variant === 1) {
      // "Ordne die Zahlen" (drag-sort)
      const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
      const numbers = new Set<number>();
      while (numbers.size < count) {
        numbers.add(randInt(1, 10));
      }
      const sorted = [...numbers].sort((a, b) => a - b);
      const shuffled = shuffle([...sorted]);

      return {
        id: genId(),
        topicId: 'k1-zahlen-bis-10',
        question: 'Ordne diese Zahlen von klein nach groß!',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        correctAnswer: sorted.join(', '),
        items: shuffled.map(String),
        hint: 'Finde zuerst die kleinste Zahl und stelle sie an den Anfang.',
        explanation: `Die richtige Reihenfolge ist: ${sorted.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // "Ist X größer als Y?" (true-false)
    const x = randInt(1, 9);
    let y = randInt(1, 10);
    while (y === x) y = randInt(1, 10);
    const isTrue = x > y;

    return {
      id: genId(),
      topicId: 'k1-zahlen-bis-10',
      question: `Stimmt das? ${x} ist größer als ${y}.`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: isTrue ? 'wahr' : 'falsch',
      hint: 'Denke an deine Finger: Welche Zahl braucht mehr Finger?',
      explanation: isTrue
        ? `Ja, ${x} ist größer als ${y}.`
        : `Nein, ${x} ist nicht größer als ${y}. ${y} ist größer.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  },
};
