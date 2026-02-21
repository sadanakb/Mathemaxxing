import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-sachaufgaben-alle-ops — Sachaufgaben mit allen Grundrechenarten
 *
 * Difficulty 1: Addition/Subtraktion, einfache Textaufgaben
 * Difficulty 2: Multiplikation/Division, Alltagskontexte
 * Difficulty 3: Gemischte Operationen, zwei Schritte
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-sachaufgaben-alle-ops',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      const variant = randInt(0, 1);
      if (variant === 0) {
        // Addition
        const a = randInt(50, 300);
        const b = randInt(50, 300);
        const answer = a + b;
        return {
          id: genId('k3-sach'),
          topicId: 'k3-sachaufgaben-alle-ops',
          question: `Anna hat ${a} Murmeln. Ben schenkt ihr noch ${b} Murmeln. Wie viele Murmeln hat Anna jetzt?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          hint: 'Addiere die beiden Anzahlen.',
          explanation: `${a} + ${b} = ${answer} Murmeln.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 25,
        };
      }
      // Subtraktion
      const total = randInt(200, 500);
      const spent = randInt(50, total - 10);
      const answer = total - spent;
      return {
        id: genId('k3-sach'),
        topicId: 'k3-sachaufgaben-alle-ops',
        question: `Tom hat ${total} Sticker. Er verschenkt ${spent} Sticker. Wie viele hat er noch?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: 'Ziehe die verschenkten Sticker von der Gesamtzahl ab.',
        explanation: `${total} − ${spent} = ${answer} Sticker.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 25,
      };
    }

    if (difficulty === 2) {
      const variant = randInt(0, 1);
      if (variant === 0) {
        // Multiplikation
        const packs = randInt(3, 8);
        const perPack = randInt(4, 12);
        const answer = packs * perPack;
        const options = [answer, answer + perPack, answer - perPack, packs + perPack].filter(o => o > 0);
        return {
          id: genId('k3-sach'),
          topicId: 'k3-sachaufgaben-alle-ops',
          question: `Im Supermarkt gibt es ${packs} Packungen Stifte. In jeder Packung sind ${perPack} Stifte. Wie viele Stifte sind es insgesamt?`,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: answer,
          distractors: options.filter(o => o !== answer).slice(0, 3),
          hint: `Rechne: ${packs} × ${perPack}.`,
          explanation: `${packs} × ${perPack} = ${answer} Stifte.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 30,
        };
      }
      // Division
      const children = randInt(3, 8);
      const perChild = randInt(2, 10);
      const total = children * perChild;
      return {
        id: genId('k3-sach'),
        topicId: 'k3-sachaufgaben-alle-ops',
        question: `${total} Äpfel werden gleichmäßig auf ${children} Kinder verteilt. Wie viele Äpfel bekommt jedes Kind?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: perChild,
        hint: `Teile ${total} durch ${children}.`,
        explanation: `${total} ÷ ${children} = ${perChild} Äpfel pro Kind.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: Zwei Schritte
    const variant = randInt(0, 2);
    if (variant === 0) {
      // Kaufen und Rückgeld
      const price = randInt(3, 9);
      const count = randInt(2, 5);
      const totalCost = price * count;
      const paid = Math.ceil(totalCost / 10) * 10;
      const change = paid - totalCost;
      return {
        id: genId('k3-sach'),
        topicId: 'k3-sachaufgaben-alle-ops',
        question: `Lina kauft ${count} Hefte zu je ${price} Euro. Sie bezahlt mit ${paid} Euro. Wie viel Rückgeld bekommt sie?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: change,
        hint: `Rechne zuerst: ${count} × ${price} = ? Dann: ${paid} − Gesamtpreis = Rückgeld.`,
        explanation: `${count} × ${price} = ${totalCost} Euro. ${paid} − ${totalCost} = ${change} Euro Rückgeld.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 45,
      };
    }
    if (variant === 1) {
      // Sammeln und Aufteilen
      const day1 = randInt(30, 100);
      const day2 = randInt(30, 100);
      const total = day1 + day2;
      const groups = randInt(2, 5);
      const perGroup = Math.floor(total / groups);
      // Wir sorgen dafür, dass es aufgeht
      const adjustedTotal = perGroup * groups;
      const adjustedDay2 = adjustedTotal - day1;
      return {
        id: genId('k3-sach'),
        topicId: 'k3-sachaufgaben-alle-ops',
        question: `Am Montag sammelt die Klasse ${day1} Kastanien, am Dienstag ${adjustedDay2}. Sie teilen alle Kastanien gleichmäßig auf ${groups} Gruppen auf. Wie viele bekommt jede Gruppe?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: perGroup,
        hint: `Zuerst addieren: ${day1} + ${adjustedDay2} = ? Dann teilen durch ${groups}.`,
        explanation: `${day1} + ${adjustedDay2} = ${adjustedTotal}. ${adjustedTotal} ÷ ${groups} = ${perGroup} Kastanien pro Gruppe.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 50,
      };
    }
    // Einkauf mit Addition und Multiplikation
    const priceA = randInt(2, 8);
    const countA = randInt(2, 4);
    const priceB = randInt(3, 10);
    const answer = priceA * countA + priceB;
    return {
      id: genId('k3-sach'),
      topicId: 'k3-sachaufgaben-alle-ops',
      question: `Max kauft ${countA} Brötchen zu je ${priceA} Euro und eine Torte für ${priceB} Euro. Wie viel bezahlt er insgesamt?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: `Rechne: ${countA} × ${priceA} + ${priceB}.`,
      explanation: `${countA} × ${priceA} = ${priceA * countA}, plus ${priceB} = ${answer} Euro.`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 40,
    };
  },
};
