import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function euroCoins(euros: number): { value: number; count: number }[] {
  const coins: { value: number; count: number }[] = [];
  if (euros >= 2) { coins.push({ value: 200, count: Math.floor(euros / 2) }); euros %= 2; }
  if (euros >= 1) { coins.push({ value: 100, count: 1 }); }
  return coins;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-geld-euro-cent',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Euro to Cent: whole euros only
      const euros = randInt(1, 5);
      const cents = euros * 100;
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `Wie viel Cent sind ${euros} Euro?`,
        answerType: 'number',
        correctAnswer: cents,
        hint: '1 Euro = 100 Cent.',
        explanation: `${euros} Euro × 100 = ${cents} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 20,
        visualConfig: {
          type: 'coins',
          props: { coins: euroCoins(euros) },
        },
      };
    } else if (difficulty === 2) {
      // Cent to Euro + Cent remainder
      const totalCent = randInt(101, 500);
      const euros = Math.floor(totalCent / 100);
      const rest = totalCent % 100;
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `${totalCent} Cent – wie viele Euro und wie viele Cent bleiben übrig? Antworte mit dem Cent-Rest.`,
        answerType: 'number',
        correctAnswer: rest,
        hint: `Teile ${totalCent} durch 100. Der Rest sind die übrigen Cent.`,
        explanation: `${totalCent} Cent = ${euros} Euro und ${rest} Cent. Der Rest ist ${rest} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    } else {
      // Mixed: how much total in cent
      const euros = randInt(2, 9);
      const cents = randInt(5, 95);
      const total = euros * 100 + cents;
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `${euros} Euro und ${cents} Cent – wie viel Cent sind das insgesamt?`,
        answerType: 'number',
        correctAnswer: total,
        hint: `Multipliziere ${euros} × 100 und addiere ${cents}.`,
        explanation: `${euros} × 100 + ${cents} = ${total} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 35,
      };
    }
  },
};
