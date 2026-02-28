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

      const variant = randInt(0, 2);

      if (variant === 1) {
        // drag-sort: order 4 money amounts from smallest to largest
        const amounts = [50, 100, 200, 500]; // Cent values
        const sorted = [...amounts];
        const shuffled = [...sorted].sort(() => Math.random() - 0.5);
        const fmt = (c: number) => c >= 100 ? `${c / 100} Euro` : `${c} Cent`;
        return {
          id: genId(),
          topicId: 'k2-geld-euro-cent',
          question: 'Ordne diese Geldbeträge von klein nach groß!',
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          correctAnswer: sorted.map(fmt).join(', '),
          items: shuffled.map(fmt),
          hint: '1 Euro = 100 Cent. Rechne alle Beträge in Cent um, um sie zu vergleichen.',
          explanation: `Die richtige Reihenfolge ist: ${sorted.map(fmt).join(', ')}.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 25,
        };
      }

      if (variant === 2) {
        // estimation: "Hat Lisa genug Geld?"
        const smallItem = items[randInt(0, items.length - 1)];
        const lisaBudget = (Math.ceil(smallItem.price / 100) + randInt(0, 1)) * 100;
        const hasEnough = lisaBudget >= smallItem.price;
        const smallPriceStr = smallItem.price >= 100
          ? `${Math.floor(smallItem.price / 100)},${String(smallItem.price % 100).padStart(2, '0')} Euro`
          : `${smallItem.price} Cent`;
        return {
          id: genId(),
          topicId: 'k2-geld-euro-cent',
          question: `Lisa hat ${lisaBudget / 100} Euro. ${smallItem.name} kostet ${smallPriceStr}. Hat Lisa genug Geld?`,
          answerType: 'true-false',
          exerciseType: 'estimation',
          correctAnswer: hasEnough ? 'wahr' : 'falsch',
          hint: `${lisaBudget / 100} Euro = ${lisaBudget} Cent. ${smallItem.name} kostet ${smallItem.price} Cent. Ist ${lisaBudget} ≥ ${smallItem.price}?`,
          explanation: hasEnough
            ? `Ja! Lisa hat ${lisaBudget} Cent und braucht ${smallItem.price} Cent. Das reicht.`
            : `Nein! Lisa hat ${lisaBudget} Cent, aber ${smallItem.name} kostet ${smallItem.price} Cent. Das reicht nicht.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 20,
        };
      }

      // variant 0 — original number-input change calculation
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

    const d3variant = randInt(0, 1);

    if (d3variant === 1) {
      // equation-balance: "? + item2 = total" — find the price of item 1
      return {
        id: genId(),
        topicId: 'k2-geld-euro-cent',
        question: `Ein Heft kostet ? Cent. Ein Stift kostet ${item2Price} Cent. Zusammen kosten sie ${total} Cent. Was kostet das Heft?`,
        questionLatex: `? + ${item2Price} = ${total}`,
        answerType: 'number',
        exerciseType: 'equation-balance',
        correctAnswer: item1Price,
        equationConfig: { left: `? + ${item2Price}`, right: `${total}`, variable: '?', target: item1Price },
        distractors: [item1Price + 10, item1Price - 10, item2Price].filter(d => d > 0 && d !== item1Price).slice(0, 3),
        hint: `${total} − ${item2Price} = ? Cent.`,
        explanation: `${total} − ${item2Price} = ${item1Price} Cent. Das Heft kostet ${item1Str}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 35,
      };
    }

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
