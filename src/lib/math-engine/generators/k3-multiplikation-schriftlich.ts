import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k3-multiplikation-schriftlich — Schriftliche Multiplikation
 *
 * Difficulty 1: 2-digit x 1-digit without carrying (e.g. 23 x 3)
 * Difficulty 2: 2-digit x 1-digit with carrying (e.g. 47 x 6)
 * Difficulty 3: 3-digit x 1-digit (e.g. 123 x 5)
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-multiplikation-schriftlich',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // 2-digit x 1-digit, no carrying: each digit * factor < 10
      const factor = randInt(2, 4);
      const tens = randInt(1, Math.floor(9 / factor));
      const ones = randInt(1, Math.floor(9 / factor));
      const a = tens * 10 + ones;
      const answer = a * factor;

      // Sometimes use number-machine exerciseType
      const useMachine = randInt(0, 2) === 0;
      if (useMachine) {
        const hidden = (['input', 'output'] as const)[randInt(0, 1)];
        return {
          id: genId('k3-smul'),
          topicId: 'k3-multiplikation-schriftlich',
          question: hidden === 'output'
            ? `Zahlenmaschine: ${a} → × ${factor} → ?`
            : `Zahlenmaschine: ? → × ${factor} → ${answer}`,
          answerType: 'number',
          exerciseType: 'number-machine',
          correctAnswer: hidden === 'output' ? answer : a,
          machineConfig: {
            input: a,
            operation: `× ${factor}`,
            output: answer,
            hidden,
          },
          hint: hidden === 'output'
            ? `Multipliziere ${a} mit ${factor}.`
            : `Welche Zahl mal ${factor} ergibt ${answer}? Teile ${answer} durch ${factor}.`,
          explanation: `${a} × ${factor} = ${answer}`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      return {
        id: genId('k3-smul'),
        topicId: 'k3-multiplikation-schriftlich',
        question: `Berechne: ${a} × ${factor} = ?`,
        questionLatex: `${a} \\times ${factor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: 'Multipliziere zuerst die Einer, dann die Zehner, und addiere die Teilergebnisse.',
        explanation: `${ones} × ${factor} = ${ones * factor} (Einer), ${tens} × ${factor} = ${tens * factor} (Zehner → ${tens * factor * 10}). Gesamt: ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (difficulty === 2) {
      // 2-digit x 1-digit, with carrying
      const factor = randInt(3, 9);
      // Ensure at least one digit * factor >= 10 (carrying)
      let a: number;
      do {
        a = randInt(13, 99);
      } while ((a % 10) * factor < 10 && Math.floor(a / 10) * factor < 10);
      const answer = a * factor;

      // Occasionally use multiple-choice
      const useMC = randInt(0, 3) === 0;
      if (useMC) {
        const offset1 = randInt(1, 3) * 10;
        const offset2 = randInt(1, 5);
        const offset3 = factor;
        const distractors = [answer + offset1, answer - offset2, answer + offset3];
        return {
          id: genId('k3-smul'),
          topicId: 'k3-multiplikation-schriftlich',
          question: `Was ergibt ${a} × ${factor}?`,
          questionLatex: `${a} \\times ${factor} = ?`,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: answer,
          distractors,
          hint: 'Multipliziere Einer, dann Zehner, dann addiere. Vergiss den Übertrag nicht!',
          explanation: `${a} × ${factor} = ${answer}`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 30,
        };
      }

      return {
        id: genId('k3-smul'),
        topicId: 'k3-multiplikation-schriftlich',
        question: `Berechne schriftlich: ${a} × ${factor} = ?`,
        questionLatex: `${a} \\times ${factor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: 'Multipliziere Einer, dann Zehner, dann addiere. Vergiss den Übertrag nicht!',
        explanation: `${a % 10} × ${factor} = ${(a % 10) * factor}, Übertrag ${Math.floor(((a % 10) * factor) / 10)}. ${Math.floor(a / 10)} × ${factor} = ${Math.floor(a / 10) * factor}, plus Übertrag → ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    // difficulty === 3: 3-digit x 1-digit
    const factor = randInt(2, 9);
    const a = randInt(100, 999);
    const answer = a * factor;

    // Sometimes use number-machine
    const useMachine = randInt(0, 3) === 0;
    if (useMachine) {
      return {
        id: genId('k3-smul'),
        topicId: 'k3-multiplikation-schriftlich',
        question: `Zahlenmaschine: ${a} → × ${factor} → ?`,
        answerType: 'number',
        exerciseType: 'number-machine',
        correctAnswer: answer,
        machineConfig: {
          input: a,
          operation: `× ${factor}`,
          output: answer,
          hidden: 'output',
        },
        hint: 'Multipliziere Einer, dann Zehner, dann Hunderter. Vergiss die Überträge nicht.',
        explanation: `${a} × ${factor} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    }

    const ones = a % 10;
    const tens = Math.floor((a % 100) / 10);
    const hundreds = Math.floor(a / 100);

    // Variant selector for difficulty 3: 0 = number-input, 1 = step-by-step, 2 = estimation
    const variant = randInt(0, 2);

    if (variant === 1) {
      // step-by-step: Einer → Zehner → Hunderter multiplication
      const onesResult = ones * factor;
      const onesCarry = Math.floor(onesResult / 10);
      const tensResult = tens * factor + onesCarry;
      const tensCarry = Math.floor(tensResult / 10);
      const hundredsResult = hundreds * factor + tensCarry;
      return {
        id: genId('k3-smul'),
        topicId: 'k3-multiplikation-schriftlich',
        question: `Berechne schriftlich Schritt für Schritt: ${a} × ${factor} = ?`,
        answerType: 'number',
        exerciseType: 'step-by-step',
        correctAnswer: answer,
        steps: [
          `Einer: ${ones} × ${factor} = ${onesResult}${onesCarry > 0 ? ` → schreibe ${onesResult % 10}, Übertrag ${onesCarry}` : ''}`,
          `Zehner: ${tens} × ${factor}${onesCarry > 0 ? ` + ${onesCarry} (Übertrag)` : ''} = ${tensResult}${tensCarry > 0 ? ` → schreibe ${tensResult % 10}, Übertrag ${tensCarry}` : ''}`,
          `Hunderter: ${hundreds} × ${factor}${tensCarry > 0 ? ` + ${tensCarry} (Übertrag)` : ''} = ${hundredsResult}`,
          `Ergebnis: ${answer}`,
        ],
        hint: 'Multipliziere jede Stelle einzeln und addiere die Überträge.',
        explanation: `${ones}×${factor}=${onesResult}, ${tens}×${factor}+${onesCarry}=${tensResult}, ${hundreds}×${factor}+${tensCarry}=${hundredsResult}. Gesamt: ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 70,
      };
    }

    if (variant === 2) {
      // estimation: is product > 1000?
      const threshold = 1000;
      const isGreater = answer > threshold;
      return {
        id: genId('k3-smul'),
        topicId: 'k3-multiplikation-schriftlich',
        question: `Ist das Produkt von ${a} × ${factor} größer als ${threshold}?`,
        answerType: 'true-false',
        exerciseType: 'estimation',
        correctAnswer: isGreater ? 'Ja' : 'Nein',
        distractors: isGreater ? ['Nein'] : ['Ja'],
        hint: `Schätze: ${hundreds} Hunderter mal ${factor} ≈ ${hundreds * factor * 100}`,
        explanation: `${a} × ${factor} = ${answer}. ${answer} ist ${isGreater ? 'größer' : 'nicht größer'} als ${threshold}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    return {
      id: genId('k3-smul'),
      topicId: 'k3-multiplikation-schriftlich',
      question: `Berechne schriftlich: ${a} × ${factor} = ?`,
      questionLatex: `${a} \\times ${factor} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: 'Multipliziere Einer, dann Zehner, dann Hunderter, und addiere. Vergiss die Überträge nicht.',
      explanation: `${ones} × ${factor} = ${ones * factor}, ${tens} × ${factor} = ${tens * factor}, ${hundreds} × ${factor} = ${hundreds * factor}. Gesamt: ${answer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 60,
    };
  },
};
