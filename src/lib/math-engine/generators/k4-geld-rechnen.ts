import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function euroFormat(cents: number): number {
  return Math.round(cents) / 100;
}

function euroStr(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',') + ' €';
}

type Item = { name: string; cents: number };

const itemPool: { name: string; minCents: number; maxCents: number }[] = [
  { name: 'ein Buch', minCents: 500, maxCents: 1599 },
  { name: 'einen Stift', minCents: 50, maxCents: 399 },
  { name: 'ein Heft', minCents: 100, maxCents: 499 },
  { name: 'eine Schere', minCents: 200, maxCents: 599 },
  { name: 'einen Radiergummi', minCents: 30, maxCents: 199 },
  { name: 'ein Lineal', minCents: 100, maxCents: 350 },
  { name: 'einen Rucksack', minCents: 1500, maxCents: 3999 },
  { name: 'eine Trinkflasche', minCents: 400, maxCents: 999 },
  { name: 'ein T-Shirt', minCents: 800, maxCents: 1999 },
  { name: 'eine Mütze', minCents: 500, maxCents: 1499 },
];

const names = ['Lisa', 'Tom', 'Emma', 'Paul', 'Mia', 'Leon', 'Anna', 'Ben', 'Sophie', 'Max'];

function pickItems(count: number, roundPrices: boolean): Item[] {
  const items: Item[] = [];
  const usedIndices = new Set<number>();
  while (items.length < count) {
    let idx = randInt(0, itemPool.length - 1);
    while (usedIndices.has(idx)) idx = randInt(0, itemPool.length - 1);
    usedIndices.add(idx);
    const pool = itemPool[idx];
    let cents: number;
    if (roundPrices) {
      cents = randInt(Math.ceil(pool.minCents / 100), Math.floor(pool.maxCents / 100)) * 100;
    } else {
      // Round to 5 or 25 cent increments for realistic prices
      cents = randInt(pool.minCents, pool.maxCents);
      cents = Math.round(cents / 25) * 25;
    }
    items.push({ name: pool.name, cents });
  }
  return items;
}

/**
 * k4-geld-rechnen — Geld rechnen
 *
 * Difficulty 1: simple addition of 2 items, round euro prices
 * Difficulty 2: addition/subtraction with decimal prices
 * Difficulty 3: multiple items, change calculation
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-geld-rechnen',
  generate(difficulty = 1): Exercise {
    const name = names[randInt(0, names.length - 1)];

    if (difficulty === 1) {
      // Simple addition of 2 items, round prices (whole euros)
      const items = pickItems(2, true);
      const totalCents = items[0].cents + items[1].cents;
      const answer = euroFormat(totalCents);

      return {
        id: genId('k4-geld'),
        topicId: 'k4-geld-rechnen',
        question: `${name} kauft ${items[0].name} für ${euroStr(items[0].cents)} und ${items[1].name} für ${euroStr(items[1].cents)}. Wie viel bezahlt ${name} insgesamt? (Antwort in Euro, z.B. 15.50)`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        tolerance: 0.01,
        hint: 'Addiere erst die Euro-Beträge zusammen.',
        explanation: `${euroStr(items[0].cents)} + ${euroStr(items[1].cents)} = ${euroStr(totalCents)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (difficulty === 2) {
      // Addition/subtraction with decimal prices
      const useSubtraction = randInt(0, 1) === 0;
      const items = pickItems(2, false);

      if (useSubtraction) {
        // Change calculation: pay with rounded amount
        const totalCents = items[0].cents + items[1].cents;
        // Round up to next 5€ or 10€ or 20€ or 50€ for payment
        const payOptions = [500, 1000, 2000, 5000];
        const payCents = payOptions.find(p => p > totalCents) ?? 5000;
        const changeCents = payCents - totalCents;
        const answer = euroFormat(changeCents);

        return {
          id: genId('k4-geld'),
          topicId: 'k4-geld-rechnen',
          question: `${name} kauft ${items[0].name} für ${euroStr(items[0].cents)} und ${items[1].name} für ${euroStr(items[1].cents)}. ${name} bezahlt mit ${euroStr(payCents)}. Wie viel Rückgeld bekommt ${name}? (Antwort in Euro)`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          tolerance: 0.01,
          hint: 'Berechne zuerst den Gesamtpreis, dann ziehe ihn vom Bezahlbetrag ab.',
          explanation: `Gesamtpreis: ${euroStr(totalCents)}. Rückgeld: ${euroStr(payCents)} − ${euroStr(totalCents)} = ${euroStr(changeCents)}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 40,
        };
      }

      // Addition with decimal prices
      const totalCents = items[0].cents + items[1].cents;
      const answer = euroFormat(totalCents);

      return {
        id: genId('k4-geld'),
        topicId: 'k4-geld-rechnen',
        question: `${name} kauft ${items[0].name} für ${euroStr(items[0].cents)} und ${items[1].name} für ${euroStr(items[1].cents)}. Wie viel kostet das zusammen? (Antwort in Euro)`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        tolerance: 0.01,
        hint: 'Addiere erst die Euro, dann die Cent. Vergiss nicht: 100 Cent = 1 Euro.',
        explanation: `${euroStr(items[0].cents)} + ${euroStr(items[1].cents)} = ${euroStr(totalCents)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    // difficulty === 3: multiple items + change
    const itemCount = randInt(3, 4);
    const items = pickItems(itemCount, false);
    const totalCents = items.reduce((sum, item) => sum + item.cents, 0);

    // Pay with next round amount
    const payOptions = [2000, 5000, 10000];
    const payCents = payOptions.find(p => p > totalCents) ?? 10000;
    const changeCents = payCents - totalCents;
    const answer = euroFormat(changeCents);

    const itemList = items.map(i => `${i.name} (${euroStr(i.cents)})`).join(', ');
    const additionChain = items.map(i => euroStr(i.cents)).join(' + ');

    // For difficulty 3, sometimes use multiple-choice
    const useMC = randInt(0, 2) === 0;
    if (useMC) {
      const d1 = euroFormat(changeCents + 100);
      const d2 = euroFormat(changeCents - 50);
      const d3 = euroFormat(totalCents);

      return {
        id: genId('k4-geld'),
        topicId: 'k4-geld-rechnen',
        question: `${name} kauft ${itemList}. ${name} bezahlt mit ${euroStr(payCents)}. Wie viel Rückgeld? (in Euro)`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [d1, d2, d3],
        hint: 'Addiere alle Preise, dann ziehe die Summe vom Bezahlbetrag ab.',
        explanation: `Gesamtpreis: ${additionChain} = ${euroStr(totalCents)}. Rückgeld: ${euroStr(payCents)} − ${euroStr(totalCents)} = ${euroStr(changeCents)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }

    return {
      id: genId('k4-geld'),
      topicId: 'k4-geld-rechnen',
      question: `${name} kauft ${itemList}. ${name} bezahlt mit ${euroStr(payCents)}. Wie viel Rückgeld bekommt ${name}? (Antwort in Euro)`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      tolerance: 0.01,
      hint: 'Addiere alle Preise, dann ziehe die Summe vom Bezahlbetrag ab.',
      explanation: `Gesamtpreis: ${additionChain} = ${euroStr(totalCents)}. Rückgeld: ${euroStr(payCents)} − ${euroStr(totalCents)} = ${euroStr(changeCents)}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 60,
    };
  },
};
