import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-zahl100-${++counter}-${Date.now()}`; }
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
  topicId: 'k2-zahlen-bis-100',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Easy: numbers up to 50, Stellenwert and Nachfolger
      const variant = randInt(0, 2);

      if (variant === 0) {
        // Stellenwert (place-value-table): "Welche Zahl hat X Zehner und Y Einer?"
        const zehner = randInt(1, 4);
        const einer = randInt(0, 9);
        const answer = zehner * 10 + einer;

        return {
          id: genId(),
          topicId: 'k2-zahlen-bis-100',
          question: `Welche Zahl hat ${zehner} Zehner und ${einer} Einer?`,
          answerType: 'number',
          exerciseType: 'place-value-table',
          correctAnswer: answer,
          distractors: [answer + 10, answer + 1, zehner + einer].filter(d => d !== answer && d > 0 && d <= 100),
          hint: `Zehner zeigen an, wie oft die 10 in der Zahl steckt. ${zehner} Zehner = ${zehner * 10}.`,
          explanation: `${zehner} Zehner = ${zehner * 10}, plus ${einer} Einer = ${answer}.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 15,
        };
      }

      if (variant === 1) {
        // Nachfolger
        const x = randInt(10, 49);
        const answer = x + 1;
        return {
          id: genId(),
          topicId: 'k2-zahlen-bis-100',
          question: `Was ist der Nachfolger von ${x}?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [x - 1, x, x + 2].filter(d => d !== answer && d > 0),
          hint: `Der Nachfolger ist die nächste Zahl nach ${x}.`,
          explanation: `Der Nachfolger von ${x} ist ${answer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 10,
        };
      }

      // True-false: "Ist 35 größer als 28?"
      const a = randInt(10, 50);
      let b = randInt(10, 50);
      while (b === a) b = randInt(10, 50);
      const isTrue = a > b;
      return {
        id: genId(),
        topicId: 'k2-zahlen-bis-100',
        question: `Stimmt das? ${a} ist größer als ${b}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Vergleiche die Zehnerstelle zuerst, dann die Einerstelle.',
        explanation: isTrue
          ? `Ja, ${a} > ${b}.`
          : `Nein, ${a} < ${b}. Die größere Zahl ist ${b}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    if (difficulty === 2) {
      // Medium: numbers up to 100
      const variant = randInt(0, 2);

      if (variant === 0) {
        // Stellenwert: "Wie viele Zehner hat die Zahl 74?"
        const num = randInt(11, 99);
        const zehner = Math.floor(num / 10);
        return {
          id: genId(),
          topicId: 'k2-zahlen-bis-100',
          question: `Wie viele Zehner hat die Zahl ${num}?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: zehner,
          distractors: [zehner + 1, zehner - 1, num % 10].filter(d => d !== zehner && d >= 0 && d <= 9),
          hint: 'Die Zehnerstelle ist die linke Ziffer einer zweistelligen Zahl.',
          explanation: `${num} hat ${zehner} Zehner und ${num % 10} Einer.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 12,
        };
      }

      if (variant === 1) {
        // Vorgänger
        const x = randInt(20, 100);
        const answer = x - 1;
        return {
          id: genId(),
          topicId: 'k2-zahlen-bis-100',
          question: `Was ist der Vorgänger von ${x}?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [x, x + 1, answer - 1].filter(d => d !== answer && d >= 0),
          hint: `Der Vorgänger ist die Zahl direkt vor ${x}.`,
          explanation: `Der Vorgänger von ${x} ist ${answer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 10,
        };
      }

      // Drag-sort: order 5 numbers
      const numbers = new Set<number>();
      while (numbers.size < 5) numbers.add(randInt(10, 99));
      const sorted = [...numbers].sort((a, b) => a - b);
      const shuffled = shuffle([...sorted]);

      return {
        id: genId(),
        topicId: 'k2-zahlen-bis-100',
        question: 'Ordne diese Zahlen von klein nach groß!',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        correctAnswer: sorted.join(', '),
        items: shuffled.map(String),
        hint: 'Finde zuerst die kleinste Zahl und arbeite dich hoch.',
        explanation: `Die richtige Reihenfolge ist: ${sorted.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // Difficulty 3: harder Stellenwert, Nachbarzehner, tricky ordering
    const variant = randInt(0, 2);

    if (variant === 0) {
      // "Welche Zahl hat X Zehner und Y Einer?" with place-value-table
      const zehner = randInt(5, 9);
      const einer = randInt(1, 9);
      const answer = zehner * 10 + einer;

      return {
        id: genId(),
        topicId: 'k2-zahlen-bis-100',
        question: `${zehner} Zehner und ${einer} Einer – welche Zahl ist das?`,
        answerType: 'number',
        exerciseType: 'place-value-table',
        correctAnswer: answer,
        distractors: [einer * 10 + zehner, answer + 10, answer - 10].filter(d => d !== answer && d > 0 && d <= 100),
        hint: `Zehner × 10 + Einer = die gesuchte Zahl.`,
        explanation: `${zehner} × 10 + ${einer} = ${answer}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      // Nachbarzehner: "Zwischen welchen Zehnern liegt 67?"
      const num = randInt(11, 99);
      if (num % 10 === 0) {
        // Exact ten - ask for Vorgänger instead
        const answer = num - 1;
        return {
          id: genId(),
          topicId: 'k2-zahlen-bis-100',
          question: `Was ist der Vorgänger von ${num}?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [num, num + 1, answer - 1].filter(d => d !== answer && d >= 0),
          hint: `Zähle eins zurück von ${num}.`,
          explanation: `Der Vorgänger von ${num} ist ${answer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 10,
        };
      }
      const lowerTen = Math.floor(num / 10) * 10;
      const upperTen = lowerTen + 10;
      // Ask which ten is closer
      const closerTen = (num - lowerTen) <= (upperTen - num) ? lowerTen : upperTen;
      return {
        id: genId(),
        topicId: 'k2-zahlen-bis-100',
        question: `Welcher Zehner liegt näher an ${num}?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: closerTen,
        distractors: [closerTen === lowerTen ? upperTen : lowerTen, lowerTen - 10, upperTen + 10].filter(d => d !== closerTen && d >= 0 && d <= 100),
        hint: `${num} liegt zwischen ${lowerTen} und ${upperTen}. Zu welchem Zehner ist es näher?`,
        explanation: `${num} liegt zwischen ${lowerTen} und ${upperTen}. Der Abstand zu ${closerTen} ist kleiner, also liegt ${closerTen} näher.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Drag-sort: 6 numbers including edge cases
    const numbers = new Set<number>();
    numbers.add(100);
    numbers.add(randInt(1, 9));
    while (numbers.size < 6) numbers.add(randInt(10, 99));
    const sorted = [...numbers].sort((a, b) => a - b);
    const shuffled = shuffle([...sorted]);

    return {
      id: genId(),
      topicId: 'k2-zahlen-bis-100',
      question: 'Ordne diese Zahlen von klein nach groß!',
      answerType: 'drag-drop',
      exerciseType: 'drag-sort',
      correctAnswer: sorted.join(', '),
      items: shuffled.map(String),
      hint: 'Achte auf ein- und zweistellige Zahlen!',
      explanation: `Die richtige Reihenfolge ist: ${sorted.join(', ')}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
    };
  },
};
