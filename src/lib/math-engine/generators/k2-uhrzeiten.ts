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

      const variant = randInt(0, 2);

      if (variant === 1) {
        // clock-drag: student drags clock hands to match the written time
        return {
          id: genId('k2-uhr'),
          topicId: 'k2-uhrzeiten',
          question: `Stelle die Uhr auf ${correct} ein!`,
          answerType: 'drag-drop',
          exerciseType: 'clock-drag',
          correctAnswer: correct,
          clockTarget: { hours: hour, minutes: 0 },
          hint: 'Der kleine Zeiger (Stundenzeiger) zeigt auf die Stunde. Der große Zeiger (Minutenzeiger) zeigt auf 12.',
          explanation: `${correct}: Der kleine Zeiger zeigt auf ${hour}, der große Zeiger auf 12.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 25,
        };
      }

      if (variant === 2) {
        // drag-match: match clock descriptions to written times
        const hour2 = hour === 12 ? 1 : hour + 1;
        const hour3 = hour === 1 ? 12 : hour - 1;
        const time1 = formatTime(hour, 0);
        const time2 = formatTime(hour2, 0);
        const time3 = formatTime(hour3, 0);
        return {
          id: genId('k2-uhr'),
          topicId: 'k2-uhrzeiten',
          question: 'Verbinde jede Uhrbeschreibung mit der richtigen Uhrzeit!',
          answerType: 'matching',
          exerciseType: 'drag-match',
          correctAnswer: `${hour}:${time1}|${hour2}:${time2}|${hour3}:${time3}`,
          pairs: [
            [`Kleiner Zeiger auf ${hour}`, time1],
            [`Kleiner Zeiger auf ${hour2}`, time2],
            [`Kleiner Zeiger auf ${hour3}`, time3],
          ],
          hint: 'Der kleine Zeiger (Stundenzeiger) zeigt die Stunde. Großer Zeiger auf 12 = volle Stunde.',
          explanation: `Kleiner Zeiger auf ${hour} → ${time1}. Auf ${hour2} → ${time2}. Auf ${hour3} → ${time3}.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 35,
        };
      }

      // variant 0 — original multiple-choice
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

      const variant = randInt(0, 1);

      if (variant === 1) {
        // clock-drag for half hours
        return {
          id: genId('k2-uhr'),
          topicId: 'k2-uhrzeiten',
          question: `Stelle die Uhr auf ${correct} ein!`,
          answerType: 'drag-drop',
          exerciseType: 'clock-drag',
          correctAnswer: correct,
          clockTarget: { hours: hour, minutes: 30 },
          hint: 'Wenn der große Zeiger auf 6 zeigt, sind 30 Minuten vergangen (halb).',
          explanation: `${correct}: Der kleine Zeiger zwischen ${hour} und ${hour === 12 ? 1 : hour + 1}, der große Zeiger auf 6.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 30,
        };
      }

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

      const variant = randInt(0, 1);

      if (variant === 1) {
        // clock-drag for quarter hours
        return {
          id: genId('k2-uhr'),
          topicId: 'k2-uhrzeiten',
          question: `Stelle die Uhr auf ${correct} ein!`,
          answerType: 'drag-drop',
          exerciseType: 'clock-drag',
          correctAnswer: correct,
          clockTarget: { hours: hour, minutes: minute },
          hint: `Großer Zeiger auf ${handPos} = ${minute} Minuten. Kleiner Zeiger auf ${hour}.`,
          explanation: `${correct}: Großer Zeiger auf ${handPos} (${minute} Min.), kleiner Zeiger auf ${hour}.`,
          difficulty,
          category: 'Repräsentational',
          estimatedSeconds: 40,
        };
      }

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
