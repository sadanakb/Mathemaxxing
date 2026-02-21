import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-prozent-rabatt-mwst',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Rabatt: find final price
      const price = randInt(2, 10) * 10;
      const rabatt = [10, 20, 25, 50][randInt(0, 3)];
      const discount = (price * rabatt) / 100;
      const final = price - discount;
      return {
        id: genId('k7-rabatt'),
        topicId: 'k7-prozent-rabatt-mwst',
        question: `Preis: ${price} €, Rabatt: ${rabatt}%. Endpreis = ?`,
        answerType: 'number',
        correctAnswer: final,
        hint: `Rabattbetrag = ${price} × ${rabatt}/100 = ${discount} €`,
        explanation: `Rabatt: ${discount} €. Endpreis: ${price} − ${discount} = ${final} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    } else if (difficulty === 2) {
      // MwSt: calculate gross price from net
      const net = randInt(10, 100);
      const mwstRate = [7, 19][randInt(0, 1)];
      const mwst = Math.round(net * mwstRate) / 100;
      const gross = Math.round((net + mwst) * 100) / 100;
      return {
        id: genId('k7-rabatt'),
        topicId: 'k7-prozent-rabatt-mwst',
        question: `Nettopreis: ${net} €, MwSt: ${mwstRate}%. Bruttopreis = ?`,
        answerType: 'number',
        correctAnswer: gross,
        hint: `MwSt-Betrag = ${net} × ${mwstRate}/100. Bruttopreis = Netto + MwSt.`,
        explanation: `MwSt: ${net} × ${mwstRate}% = ${mwst} €. Brutto: ${net} + ${mwst} = ${gross} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    } else {
      // Find original price before discount
      const origPrice = randInt(4, 20) * 10;
      const rabatt = [10, 20, 25][randInt(0, 2)];
      const finalPrice = origPrice * (1 - rabatt / 100);
      return {
        id: genId('k7-rabatt'),
        topicId: 'k7-prozent-rabatt-mwst',
        question: `Nach ${rabatt}% Rabatt kostet ein Artikel ${finalPrice} €. Was war der Originalpreis?`,
        answerType: 'number',
        correctAnswer: origPrice,
        hint: `Originalpreis × (1 − ${rabatt}/100) = ${finalPrice}. Also: ${finalPrice} ÷ ${(100 - rabatt) / 100}`,
        explanation: `${finalPrice} ÷ ${(100 - rabatt) / 100} = ${origPrice} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
