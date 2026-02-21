import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k7-dreisatz-intensiv',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Direct proportion: currency exchange
      const rate = randInt(1, 3) + randInt(0, 9) * 0.1; // e.g. 1.2 to 3.9
      const amount1 = randInt(2, 8) * 10;
      const amount2 = randInt(3, 9) * 10;
      const result = Math.round(amount2 * rate * 100) / 100;
      return {
        id: genId('k7-drei-int'),
        topicId: 'k7-dreisatz-intensiv',
        question: `Wechselkurs: ${amount1} € = ${Math.round(amount1 * rate * 100) / 100} $. Wie viel $ bekommt man für ${amount2} €?`,
        answerType: 'number',
        correctAnswer: result,
        hint: `Zuerst den Kurs pro Euro berechnen: ${Math.round(amount1 * rate * 100) / 100} ÷ ${amount1}`,
        explanation: `1 € = ${rate.toFixed(2)} $. ${amount2} € × ${rate.toFixed(2)} = ${result} $`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    } else if (difficulty === 2) {
      // Inverse proportion: speed/time
      const speed1 = randInt(4, 8) * 10; // km/h
      const time1 = randInt(2, 5); // hours
      const speed2 = randInt(speed1 / 10 + 1, 12) * 10;
      const time2 = (speed1 * time1) / speed2;
      const isInteger = Number.isInteger(time2);
      const displayTime2 = isInteger ? time2 : Math.round(time2 * 10) / 10;
      return {
        id: genId('k7-drei-int'),
        topicId: 'k7-dreisatz-intensiv',
        question: `Bei ${speed1} km/h dauert eine Fahrt ${time1} Stunden. Wie lange dauert sie bei ${speed2} km/h?`,
        answerType: 'number',
        correctAnswer: displayTime2,
        hint: `Gesamtstrecke = ${speed1} × ${time1} = ${speed1 * time1} km. Zeit = Strecke ÷ Geschwindigkeit.`,
        explanation: `Strecke: ${speed1} × ${time1} = ${speed1 * time1} km. Zeit: ${speed1 * time1} ÷ ${speed2} = ${displayTime2} h`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    } else {
      // Mixed proportion: recipe scaling
      const serves1 = randInt(2, 4);
      const serves2 = randInt(5, 8);
      const ingredient = randInt(2, 6) * 50; // grams
      const scaled = Math.round((ingredient / serves1) * serves2);
      return {
        id: genId('k7-drei-int'),
        topicId: 'k7-dreisatz-intensiv',
        question: `Ein Rezept für ${serves1} Personen braucht ${ingredient} g Mehl. Wie viel Mehl braucht man für ${serves2} Personen?`,
        answerType: 'number',
        correctAnswer: scaled,
        hint: `Zuerst: Menge für 1 Person = ${ingredient} ÷ ${serves1} = ${ingredient / serves1} g`,
        explanation: `Für 1 Person: ${ingredient / serves1} g. Für ${serves2} Personen: ${ingredient / serves1} × ${serves2} = ${scaled} g`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 55,
      };
    }
  },
};
