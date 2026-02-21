import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-prozentrechnung-real',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple Rabatt (discount)
      const origPrice = randInt(2, 10) * 10; // 20–100
      const discountPct = [10, 20, 25, 50][randInt(0, 3)];
      const discount = (origPrice * discountPct) / 100;
      const finalPrice = origPrice - discount;
      return {
        id: genId('k7-real'),
        topicId: 'k7-prozentrechnung-real',
        question: `Ein Artikel kostet ${origPrice} €. Es gibt ${discountPct}% Rabatt. Wie viel kostet er danach?`,
        answerType: 'number',
        correctAnswer: finalPrice,
        hint: `Rabattbetrag = ${origPrice} × ${discountPct}/100 = ${discount} €`,
        explanation: `Rabatt: ${origPrice} × ${discountPct}% = ${discount} €. Endpreis: ${origPrice} − ${discount} = ${finalPrice} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    } else if (difficulty === 2) {
      // MwSt (VAT) – add 19%
      const netPrice = randInt(10, 80);
      const mwst = Math.round(netPrice * 19) / 100;
      const gross = Math.round((netPrice + mwst) * 100) / 100;
      return {
        id: genId('k7-real'),
        topicId: 'k7-prozentrechnung-real',
        question: `Ein Produkt kostet netto ${netPrice} €. Mit 19% MwSt – wie viel ist der Bruttopreis (auf Cent gerundet)?`,
        answerType: 'number',
        correctAnswer: gross,
        hint: `MwSt = ${netPrice} × 0,19. Bruttopreis = Nettopreis + MwSt.`,
        explanation: `MwSt: ${netPrice} × 0,19 = ${mwst} €. Brutto: ${netPrice} + ${mwst} = ${gross} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    } else {
      // Combined: price after discount + VAT
      const origPrice = randInt(5, 20) * 10;
      const discountPct = [5, 10, 15, 20][randInt(0, 3)];
      const discounted = origPrice * (1 - discountPct / 100);
      const final = Math.round(discounted * 119) / 100;
      return {
        id: genId('k7-real'),
        topicId: 'k7-prozentrechnung-real',
        question: `Originalpreis: ${origPrice} €. Rabatt: ${discountPct}%. Dann 19% MwSt. Endpreis?`,
        answerType: 'number',
        correctAnswer: final,
        hint: `Schritt 1: Rabatt abziehen. Schritt 2: MwSt aufschlagen (× 1,19).`,
        explanation: `Nach Rabatt: ${origPrice} × ${(100 - discountPct) / 100} = ${discounted} €. Mit MwSt: ${discounted} × 1,19 = ${final} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 70,
      };
    }
  },
};
