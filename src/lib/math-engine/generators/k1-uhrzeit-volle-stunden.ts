import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-uhr-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-uhrzeit-volle-stunden',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    if (variant === 0) {
      // clock-drag: "Stelle die Uhr auf X Uhr"
      const hour = randInt(1, 12);

      return {
        id: genId(),
        topicId: 'k1-uhrzeit-volle-stunden',
        question: `Stelle die Uhr auf ${hour} Uhr!`,
        answerType: 'number',
        exerciseType: 'clock-drag',
        correctAnswer: hour,
        clockTarget: { hours: hour, minutes: 0 },
        hint: 'Bewege den kleinen Zeiger auf die richtige Zahl. Der große Zeiger bleibt auf der 12.',
        explanation: `Bei ${hour} Uhr zeigt der kleine Zeiger auf die ${hour} und der große Zeiger auf die 12.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    if (variant === 1) {
      // multiple-choice: "Welche Uhrzeit zeigt die Uhr?"
      const hour = randInt(1, 12);
      const correct = `${hour}:00 Uhr`;
      const wrongHours = new Set<number>();
      while (wrongHours.size < 3) {
        const w = randInt(1, 12);
        if (w !== hour) wrongHours.add(w);
      }
      const wrong = [...wrongHours].map(h => `${h}:00 Uhr`);

      return {
        id: genId(),
        topicId: 'k1-uhrzeit-volle-stunden',
        question: `Der kleine Zeiger zeigt auf ${hour}, der große Zeiger zeigt auf 12. Welche Uhrzeit ist es?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: correct,
        distractors: wrong,
        options: [correct, ...wrong],
        clockTarget: { hours: hour, minutes: 0 },
        hint: 'Der kleine Zeiger zeigt die Stunde. Der große Zeiger auf 12 bedeutet: volle Stunde.',
        explanation: `Der kleine Zeiger auf ${hour} und der große auf 12 = ${correct}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (variant === 2) {
      // number-input: "Wie viele Stunden zeigt die Uhr?"
      const hour = randInt(1, 12);

      return {
        id: genId(),
        topicId: 'k1-uhrzeit-volle-stunden',
        question: `Der kleine Zeiger zeigt auf ${hour}, der große Zeiger zeigt auf 12. Wie viel Uhr ist es? (Gib nur die Zahl ein)`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: hour,
        clockTarget: { hours: hour, minutes: 0 },
        distractors: [hour - 1, hour + 1, hour + 2].filter(d => d >= 1 && d <= 12 && d !== hour),
        hint: 'Schau auf den kleinen Zeiger. Auf welche Zahl zeigt er?',
        explanation: `Der kleine Zeiger zeigt auf ${hour}. Es ist ${hour} Uhr.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 12,
      };
    }

    // variant === 3: true-false — "Zeigt die Uhr X Uhr?"
    const hour = randInt(1, 12);
    const showCorrect = randInt(0, 1) === 0;
    let shownHour = hour;
    if (!showCorrect) {
      shownHour = hour === 12 ? 1 : hour + randInt(1, 3);
      if (shownHour > 12) shownHour = shownHour - 12;
    }
    return {
      id: genId(),
      topicId: 'k1-uhrzeit-volle-stunden',
      question: `Der kleine Zeiger zeigt auf ${hour}, der große auf 12. Stimmt das – es ist ${shownHour} Uhr?`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: (hour === shownHour) ? 'wahr' : 'falsch',
      clockTarget: { hours: hour, minutes: 0 },
      hint: 'Schau genau: Auf welche Zahl zeigt der kleine Zeiger?',
      explanation: (hour === shownHour)
        ? `Ja, der kleine Zeiger auf ${hour} bedeutet ${hour} Uhr.`
        : `Nein, der kleine Zeiger zeigt auf ${hour}, also ist es ${hour} Uhr, nicht ${shownHour} Uhr.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 12,
    };
  },
};
