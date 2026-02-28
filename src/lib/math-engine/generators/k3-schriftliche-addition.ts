import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k3-schriftliche-addition',
  generate(difficulty = 1): Exercise {
    let a: number, b: number;

    if (difficulty === 1) {
      // No carrying needed: tens + tens <= 100
      const tensA = randInt(1, 4);
      const tensB = randInt(1, 9 - tensA);
      const onesA = randInt(0, 4);
      const onesB = randInt(0, 9 - onesA);
      a = tensA * 10 + onesA;
      b = tensB * 10 + onesB;
    } else if (difficulty === 2) {
      // With carrying, up to 999
      a = randInt(100, 499);
      b = randInt(100, 1000 - a);
    } else {
      // Three summands, up to 1000
      a = randInt(100, 400);
      b = randInt(100, 400);
      const c = randInt(10, 1000 - a - b);
      const answer = a + b + c;
      return {
        id: genId('k3-sadd'),
        topicId: 'k3-schriftliche-addition',
        question: `Berechne schriftlich: ${a} + ${b} + ${c} = ?`,
        questionLatex: `${a} + ${b} + ${c} = ?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Addiere zuerst ${a} + ${b}, dann addiere ${c} zum Ergebnis.`,
        explanation: `${a} + ${b} = ${a + b}, dann + ${c} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }

    const answer = a + b;

    // Variant selector: 0 = number-input, 1 = step-by-step, 2 = estimation
    const variant = randInt(0, 2);

    if (variant === 1) {
      // step-by-step: walk through Einer → Zehner → Hunderter columns
      const onesA = a % 10;
      const onesB = b % 10;
      const onesSum = onesA + onesB;
      const carry = Math.floor(onesSum / 10);
      const tensA = Math.floor((a % 100) / 10);
      const tensB = Math.floor((b % 100) / 10);
      const tensSum = tensA + tensB + carry;
      return {
        id: genId('k3-sadd'),
        topicId: 'k3-schriftliche-addition',
        question: `Berechne schriftlich Schritt für Schritt: ${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'step-by-step',
        correctAnswer: answer,
        steps: [
          `Einer: ${onesA} + ${onesB} = ${onesSum}${carry > 0 ? ` → schreibe ${onesSum % 10}, Übertrag ${carry}` : ''}`,
          `Zehner: ${tensA} + ${tensB}${carry > 0 ? ` + ${carry} (Übertrag)` : ''} = ${tensSum}`,
          `Ergebnis: ${answer}`,
        ],
        hint: 'Beginne bei den Einern und arbeite dich nach links vor.',
        explanation: `Einer: ${onesA}+${onesB}=${onesSum}. Zehner: ${tensA}+${tensB}+${carry}=${tensSum}. Ergebnis: ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 40 : 55,
      };
    }

    if (variant === 2) {
      // estimation: is the sum greater than 500?
      const threshold = difficulty === 1 ? 50 : 500;
      const isGreater = answer > threshold;
      return {
        id: genId('k3-sadd'),
        topicId: 'k3-schriftliche-addition',
        question: `Ist ${a} + ${b} größer als ${threshold}?`,
        answerType: 'true-false',
        exerciseType: 'estimation',
        correctAnswer: isGreater ? 'Ja' : 'Nein',
        distractors: isGreater ? ['Nein'] : ['Ja'],
        hint: `Schätze zuerst: Sind beide Zahlen zusammen mehr als ${threshold}?`,
        explanation: `${a} + ${b} = ${answer}. ${answer} ist ${isGreater ? 'größer' : 'nicht größer'} als ${threshold}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    return {
      id: genId('k3-sadd'),
      topicId: 'k3-schriftliche-addition',
      question: `Berechne schriftlich: ${a} + ${b} = ?`,
      questionLatex: `${a} + ${b} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: 'Schreibe die Zahlen untereinander und addiere spaltenweise von rechts nach links.',
      explanation: `${a} + ${b} = ${answer}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 30 : 45,
    };
  },
};
