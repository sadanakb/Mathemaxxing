import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k4-schriftliche-division',
  generate(difficulty = 1): Exercise {
    // Choose variant: standard number-input, step-by-step, or estimation
    const variantRoll = randInt(0, 2);

    // ── Variant: step-by-step (division steps) ──────────────────────────
    if (variantRoll === 1) {
      const divisor = difficulty === 1 ? randInt(2, 4) : difficulty === 2 ? randInt(3, 6) : randInt(4, 9);
      const quotient = difficulty === 1 ? randInt(10, 30) : difficulty === 2 ? randInt(20, 80) : randInt(50, 150);
      const dividend = divisor * quotient;

      // Build step-by-step: digit-by-digit long division explanation
      const dividendStr = String(dividend);
      const steps: string[] = [];
      let current = 0;
      for (let i = 0; i < dividendStr.length; i++) {
        current = current * 10 + parseInt(dividendStr[i]);
        const partQuotient = Math.floor(current / divisor);
        const partRemainder = current % divisor;
        steps.push(`${current} ÷ ${divisor} = ${partQuotient} (Rest ${partRemainder})`);
        current = partRemainder;
      }

      return {
        id: genId('k4-div'),
        topicId: 'k4-schriftliche-division',
        question: `Schriftliche Division Schritt für Schritt: ${dividend} ÷ ${divisor} = ?`,
        questionLatex: `${dividend} \\div ${divisor} = ?`,
        answerType: 'number',
        exerciseType: 'step-by-step',
        correctAnswer: quotient,
        steps,
        hint: `Teile ${dividend} Stelle für Stelle durch ${divisor}. Beginne von links.`,
        explanation: `${dividend} ÷ ${divisor} = ${quotient}. Schritte: ${steps.join(' → ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 50 : difficulty === 2 ? 75 : 100,
      };
    }

    // ── Variant: estimation (is quotient > 100?) ─────────────────────────
    if (variantRoll === 2) {
      const divisor = difficulty === 1 ? randInt(2, 5) : difficulty === 2 ? randInt(3, 7) : randInt(4, 9);
      const quotient = difficulty === 1 ? randInt(5, 50) : difficulty === 2 ? randInt(30, 200) : randInt(50, 500);
      const dividend = divisor * quotient + (difficulty > 1 ? randInt(0, divisor - 1) : 0);
      const threshold = difficulty === 1 ? 20 : 100;
      const isAbove = quotient > threshold;

      return {
        id: genId('k4-div'),
        topicId: 'k4-schriftliche-division',
        question: `Ist der Quotient von ${dividend} ÷ ${divisor} größer als ${threshold}?`,
        answerType: 'true-false',
        exerciseType: 'estimation',
        correctAnswer: isAbove ? 'wahr' : 'falsch',
        hint: `Schätze: ${threshold} × ${divisor} = ${threshold * divisor}. Ist ${dividend} größer oder kleiner?`,
        explanation: `${dividend} ÷ ${divisor} ≈ ${quotient}. ${quotient} ist ${isAbove ? 'größer' : 'nicht größer'} als ${threshold}, also ist die Aussage ${isAbove ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // ── Variant: standard number-input ───────────────────────────────────
    let divisor: number, quotient: number, dividend: number, remainder: number;

    if (difficulty === 1) {
      divisor = randInt(2, 5);
      quotient = randInt(10, 30);
      dividend = divisor * quotient;
      remainder = 0;
    } else if (difficulty === 2) {
      divisor = randInt(3, 7);
      quotient = randInt(20, 80);
      remainder = randInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
    } else {
      divisor = randInt(6, 9);
      quotient = randInt(80, 200);
      remainder = randInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
    }

    const questionText = remainder === 0
      ? `${dividend} ÷ ${divisor} = ?`
      : `${dividend} ÷ ${divisor} = ? (mit Rest)`;

    const answerVal = quotient;
    const explanationText = remainder === 0
      ? `${dividend} ÷ ${divisor} = ${quotient}`
      : `${dividend} ÷ ${divisor} = ${quotient} Rest ${remainder} (da ${divisor} × ${quotient} = ${divisor * quotient} und ${divisor * quotient} + ${remainder} = ${dividend})`;

    return {
      id: genId('k4-div'),
      topicId: 'k4-schriftliche-division',
      question: questionText,
      questionLatex: `${dividend} \\div ${divisor} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answerVal,
      hint: `Wie oft passt ${divisor} in ${dividend}? Schriftliche Division: von links nach rechts.`,
      explanation: explanationText,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 40 : difficulty === 2 ? 60 : 90,
    };
  },
};
