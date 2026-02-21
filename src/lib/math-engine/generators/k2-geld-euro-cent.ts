import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-geld-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildCoins(euros: number, cents: number): { value: number; count: number }[] {
  const coins: { value: number; count: number }[] = [];
  if (euros >= 2) { coins.push({ value: 200, count: Math.floor(euros / 2) }); euros %= 2; }
  if (euros >= 1) { coins.push({ value: 100, count: 1 }); }
  if (cents >= 50) { coins.push({ value: 50, count: Math.floor(cents / 50) }); cents %= 50; }
  if (cents >= 20) { coins.push({ value: 20, count: Math.floor(cents / 20) }); cents %= 20; }
  if (cents >= 10) { coins.push({ value: 10, count: Math.floor(cents / 10) }); cents %= 10; }
  return coins;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-geld-euro-cent',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // "3 Euro und 50 Cent = ___ Cent"
      const euros = randInt(1, 5);
      const cents = randInt(1, 9) * 10; // multiples of 10 for simplicity
      const totalCent = euros * 100 + cents;

      return {
        id: genId(),
        topicId: 'k2-geld-euro-cent',
        question: `${euros} Euro und ${cents} Cent = wie viele Cent?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: totalCent,
        hint: `1 Euro = 100 Cent. Also ${euros} Euro = ${euros * 100} Cent. Dann noch ${cents} Cent dazu.`,
        explanation: `${euros} Euro = ${euros * 100} Cent. ${euros * 100} + ${cents} = ${totalCent} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 20,
        visualConfig: {
          type: 'coins',
          props: { coins: buildCoins(euros, cents) },
        },
      };
    }

    if (difficulty === 2) {
      // Change calculation: "Lisa hat 5 Euro. Sie kauft X fur Y Euro. Wie viel Ruckgeld?"
      const items = [
        { name: 'ein Eis', price: randInt(1, 3) * 50 },         // 50, 100, 150 Cent
        { name: 'ein Heft', price: randInt(1, 3) * 100 + 50 },  // 150, 250, 350 Cent
        { name: 'einen Stift', price: randInt(50, 200) },
        { name: 'ein Buch', price: randInt(200, 400) },
      ];
      const item = items[randInt(0, items.length - 1)];
      const budget = (Math.ceil(item.price / 100) + randInt(1, 3)) * 100; // Always enough, whole euros
      const changeCent = budget - item.price;
      const budgetEuro = budget / 100;
      const priceStr = item.price >= 100
        ? `${Math.floor(item.price / 100)},${String(item.price % 100).padStart(2, '0')} Euro`
        : `${item.price} Cent`;
      const changeEuro = (changeCent / 100).toFixed(2).replace('.', ',');

      return {
        id: genId(),
        topicId: 'k2-geld-euro-cent',
        question: `Lisa hat ${budgetEuro} Euro. Sie kauft ${item.name} für ${priceStr}. Wie viel Rückgeld bekommt sie (in Cent)?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: changeCent,
        hint: `Rechne: ${budget} Cent - ${item.price} Cent = ?`,
        explanation: `${budget} Cent - ${item.price} Cent = ${changeCent} Cent (= ${changeEuro} Euro).`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 35,
      };
    }

    // Difficulty 3: Add multiple items together
    const item1Price = randInt(1, 3) * 100 + randInt(0, 9) * 10;
    const item2Price = randInt(1, 2) * 100 + randInt(0, 9) * 10;
    const total = item1Price + item2Price;
    const budget = Math.ceil(total / 100) * 100 + randInt(1, 3) * 100;
    const change = budget - total;

    const item1Str = `${Math.floor(item1Price / 100)},${String(item1Price % 100).padStart(2, '0')} Euro`;
    const item2Str = `${Math.floor(item2Price / 100)},${String(item2Price % 100).padStart(2, '0')} Euro`;

    return {
      id: genId(),
      topicId: 'k2-geld-euro-cent',
      question: `Max kauft ein Heft für ${item1Str} und einen Stift für ${item2Str}. Er bezahlt mit ${budget / 100} Euro. Wie viel Rückgeld bekommt er (in Cent)?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: change,
      hint: `Erst zusammenrechnen: ${item1Price} + ${item2Price} = ${total} Cent. Dann vom bezahlten Betrag abziehen.`,
      explanation: `${item1Price} + ${item2Price} = ${total} Cent. ${budget} - ${total} = ${change} Cent Rückgeld.`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 45,
    };
  },
};
