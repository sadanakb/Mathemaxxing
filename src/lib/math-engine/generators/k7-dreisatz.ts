import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-dreisatz',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple direct proportion: apples / price
      const qty1 = randInt(2, 5);
      const pricePerOne = randInt(2, 8) * 0.5; // 1€ to 4€ in 0.50 steps
      const cost1 = qty1 * pricePerOne;
      const qty2 = randInt(3, 8);
      const cost2 = qty2 * pricePerOne;
      return {
        id: genId('k7-drei'),
        topicId: 'k7-dreisatz',
        question: `${qty1} Äpfel kosten ${cost1.toFixed(2).replace('.', ',')} €. Was kosten ${qty2} Äpfel?`,
        answerType: 'number',
        correctAnswer: cost2,
        hint: `Erst den Preis für 1 Apfel berechnen: ${cost1.toFixed(2)} ÷ ${qty1} = ${pricePerOne.toFixed(2)} €`,
        explanation: `1 Apfel = ${pricePerOne.toFixed(2)} €. ${qty2} Äpfel = ${qty2} × ${pricePerOne.toFixed(2)} = ${cost2.toFixed(2)} €`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    } else if (difficulty === 2) {
      // Direct proportion with km/l
      const liters1 = randInt(2, 5);
      const kmPerLiter = randInt(8, 15);
      const km1 = liters1 * kmPerLiter;
      const liters2 = randInt(3, 8);
      const km2 = liters2 * kmPerLiter;
      return {
        id: genId('k7-drei'),
        topicId: 'k7-dreisatz',
        question: `Ein Auto fährt mit ${liters1} Litern Benzin ${km1} km. Wie weit kommt es mit ${liters2} Litern?`,
        answerType: 'number',
        correctAnswer: km2,
        hint: `${km1} ÷ ${liters1} = Kilometer pro Liter.`,
        explanation: `Pro Liter: ${km1} ÷ ${liters1} = ${kmPerLiter} km. Mit ${liters2} Litern: ${liters2} × ${kmPerLiter} = ${km2} km`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    } else {
      // Workers/time: inverse proportion
      const workers1 = randInt(2, 4);
      const days1 = randInt(6, 12);
      const workers2 = randInt(workers1 + 1, workers1 + 4);
      // workers1 * days1 = workers2 * days2
      const totalWork = workers1 * days1;
      if (totalWork % workers2 !== 0) {
        // Ensure integer result
        const adjustedWorkers2 = workers1 * 2;
        const days2 = days1 / 2;
        return {
          id: genId('k7-drei'),
          topicId: 'k7-dreisatz',
          question: `${workers1} Arbeiter brauchen ${days1} Tage für eine Aufgabe. Wie viele Tage brauchen ${adjustedWorkers2} Arbeiter?`,
          answerType: 'number',
          correctAnswer: days2,
          hint: `Mehr Arbeiter → weniger Tage. Gesamtarbeit = ${workers1} × ${days1} = ${totalWork} Arbeitstage.`,
          explanation: `Gesamtarbeit: ${workers1} × ${days1} = ${totalWork}. Mit ${adjustedWorkers2}: ${totalWork} ÷ ${adjustedWorkers2} = ${days2} Tage`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 60,
        };
      }
      const days2 = totalWork / workers2;
      return {
        id: genId('k7-drei'),
        topicId: 'k7-dreisatz',
        question: `${workers1} Arbeiter brauchen ${days1} Tage für eine Aufgabe. Wie viele Tage brauchen ${workers2} Arbeiter?`,
        answerType: 'number',
        correctAnswer: days2,
        hint: `Mehr Arbeiter → weniger Tage. Gesamtarbeit = ${workers1} × ${days1} = ${totalWork}.`,
        explanation: `Gesamtarbeit: ${workers1} × ${days1} = ${totalWork}. Mit ${workers2}: ${totalWork} ÷ ${workers2} = ${days2} Tage`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
