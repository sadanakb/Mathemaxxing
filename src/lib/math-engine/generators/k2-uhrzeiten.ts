import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function formatTime(h: number, m: number): string {
  return `${h}:${m.toString().padStart(2, '0')} Uhr`;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-uhrzeiten',
  generate(difficulty = 1): Exercise {
    let hour: number, minute: number, choices: string[];

    if (difficulty === 1) {
      // Full hours only
      hour = randInt(1, 12);
      minute = 0;
      const correct = formatTime(hour, 0);
      const wrong = [
        formatTime(hour === 12 ? 1 : hour + 1, 0),
        formatTime(hour === 1 ? 12 : hour - 1, 0),
        formatTime(hour < 10 ? hour + 2 : hour - 2, 0),
      ];
      choices = [correct, ...wrong];

      return {
        id: genId('k2-uhr'),
        topicId: 'k2-uhrzeiten',
        question: `Wie viel Uhr zeigt die Uhr? Der große Zeiger zeigt auf 12, der kleine Zeiger zeigt auf ${hour}.`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: wrong,
        hint: 'Der kleine Zeiger zeigt die Stunde, der große Zeiger zeigt die Minuten.',
        explanation: `Der kleine Zeiger zeigt auf ${hour} → Es ist ${correct}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    } else if (difficulty === 2) {
      // Half hours
      hour = randInt(1, 12);
      minute = 30;
      const correct = formatTime(hour, 30);
      const wrong = [
        formatTime(hour === 12 ? 1 : hour + 1, 30),
        formatTime(hour, 0),
        formatTime(hour === 1 ? 12 : hour - 1, 30),
      ];
      return {
        id: genId('k2-uhr'),
        topicId: 'k2-uhrzeiten',
        question: `Wie viel Uhr zeigt die Uhr? Der große Zeiger zeigt auf 6, der kleine Zeiger zeigt zwischen ${hour} und ${hour === 12 ? 1 : hour + 1}.`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: wrong,
        hint: 'Wenn der große Zeiger auf 6 zeigt, sind 30 Minuten vergangen.',
        explanation: `Der große Zeiger auf 6 = 30 Minuten → Es ist ${correct}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    } else {
      // Quarter hours
      const minuteOptions = [15, 45];
      minute = minuteOptions[randInt(0, 1)];
      hour = randInt(1, 12);
      const correct = formatTime(hour, minute);
      const wrong = [
        formatTime(hour, minute === 15 ? 45 : 15),
        formatTime(hour === 12 ? 1 : hour + 1, minute),
        formatTime(hour, 30),
      ];
      const handPos = minute === 15 ? 3 : 9;
      return {
        id: genId('k2-uhr'),
        topicId: 'k2-uhrzeiten',
        question: `Wie viel Uhr zeigt die Uhr? Der große Zeiger zeigt auf ${handPos}, der kleine Zeiger zeigt auf ${hour}.`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: wrong,
        hint: `Zeiger auf ${handPos} bedeutet ${minute} Minuten.`,
        explanation: `Großer Zeiger auf ${handPos} = ${minute} Minuten. Es ist ${correct}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }
  },
};
