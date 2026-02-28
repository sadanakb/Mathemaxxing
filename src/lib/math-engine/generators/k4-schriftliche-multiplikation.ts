import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/**
 * k4-schriftliche-multiplikation — Schriftliche Multiplikation
 *
 * Difficulty 1: zweistellig × einstellig (number-input)
 * Difficulty 2: dreistellig × einstellig (number-input)
 * Difficulty 3: zweistellig × zweistellig + number-machine
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-schriftliche-multiplikation',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // zweistellig × einstellig
      const a = randInt(12, 49);
      const b = randInt(2, 6);
      const result = a * b;

      return {
        id: genId('k4-smul'),
        topicId: 'k4-schriftliche-multiplikation',
        question: `Berechne schriftlich: ${a} × ${b} = ?`,
        questionLatex: `${a} \\times ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: result,
        hint: `Multipliziere zuerst die Einer von ${a} mit ${b}, dann die Zehner. Vergiss die Überträge nicht!`,
        explanation: `${a} × ${b} = ${result}. (${a % 10} × ${b} = ${(a % 10) * b}, Zehner: ${Math.floor(a / 10)} × ${b} = ${Math.floor(a / 10) * b}.)`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    if (difficulty === 2) {
      // dreistellig × einstellig
      const a = randInt(100, 499);
      const b = randInt(2, 8);
      const result = a * b;

      return {
        id: genId('k4-smul'),
        topicId: 'k4-schriftliche-multiplikation',
        question: `Berechne schriftlich: ${a} × ${b} = ?`,
        questionLatex: `${a} \\times ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: result,
        hint: `Multipliziere Stelle für Stelle von rechts nach links. Notiere die Überträge.`,
        explanation: `${a} × ${b} = ${result}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }

    // difficulty === 3: mix of zweistellig × zweistellig and number-machine
    const useNumberMachine = randInt(0, 2) === 0;

    if (useNumberMachine) {
      // Zahlenmaschine: input → ×? → output
      const input = randInt(10, 50);
      const factor = randInt(3, 9);
      const output = input * factor;

      const hiddenOptions: Array<'input' | 'operation' | 'output'> = ['input', 'operation', 'output'];
      const hidden = hiddenOptions[randInt(0, hiddenOptions.length - 1)];

      let question: string;
      let answer: number | string;
      let hint: string;
      let explanation: string;

      if (hidden === 'output') {
        question = `Zahlenmaschine: ${input} → × ${factor} → ?`;
        answer = output;
        hint = `Multipliziere ${input} mit ${factor}.`;
        explanation = `${input} × ${factor} = ${output}.`;
      } else if (hidden === 'input') {
        question = `Zahlenmaschine: ? → × ${factor} → ${output}`;
        answer = input;
        hint = `Welche Zahl ergibt mit ${factor} multipliziert ${output}?`;
        explanation = `${output} ÷ ${factor} = ${input}. Also: ${input} → × ${factor} → ${output}.`;
      } else {
        question = `Zahlenmaschine: ${input} → ×? → ${output}. Welcher Faktor fehlt?`;
        answer = factor;
        hint = `${input} × ? = ${output}. Teile ${output} durch ${input}.`;
        explanation = `${output} ÷ ${input} = ${factor}. Die Operation ist × ${factor}.`;
      }

      return {
        id: genId('k4-smul'),
        topicId: 'k4-schriftliche-multiplikation',
        question,
        answerType: 'number',
        exerciseType: 'number-machine',
        correctAnswer: answer,
        machineConfig: { input, operation: `× ${factor}`, output, hidden },
        hint,
        explanation,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    }

    // difficulty === 3: mix of zweistellig × zweistellig, step-by-step, and estimation
    const variantD3 = randInt(0, 2);

    // ── Variant: step-by-step (multiplication steps) ─────────────────────
    if (variantD3 === 1) {
      const a = randInt(12, 35);
      const b = randInt(11, 25);
      const result = a * b;
      const bOnes = b % 10;
      const bTens = Math.floor(b / 10) * 10;
      const partialOnes = a * bOnes;
      const partialTens = a * bTens;

      return {
        id: genId('k4-smul'),
        topicId: 'k4-schriftliche-multiplikation',
        question: `Schriftliche Multiplikation Schritt für Schritt: ${a} × ${b} = ?`,
        questionLatex: `${a} \\times ${b} = ?`,
        answerType: 'number',
        exerciseType: 'step-by-step',
        correctAnswer: result,
        steps: [
          `${a} × ${bOnes} = ${partialOnes} (Einer-Teilprodukt)`,
          `${a} × ${bTens} = ${partialTens} (Zehner-Teilprodukt)`,
          `${partialOnes} + ${partialTens} = ${result} (Summe)`,
        ],
        hint: `Zerlege ${b} in Zehner (${bTens}) und Einer (${bOnes}). Berechne beide Teilprodukte und addiere.`,
        explanation: `${a} × ${b} = ${a} × ${bOnes} + ${a} × ${bTens} = ${partialOnes} + ${partialTens} = ${result}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 75,
      };
    }

    // ── Variant: estimation (is product > 10000?) ─────────────────────────
    if (variantD3 === 2) {
      const a = randInt(20, 99);
      const b = randInt(20, 99);
      const result = a * b;
      const isAbove = result > 10000;

      return {
        id: genId('k4-smul'),
        topicId: 'k4-schriftliche-multiplikation',
        question: `Ist das Produkt von ${a} × ${b} größer als 10.000?`,
        answerType: 'true-false',
        exerciseType: 'estimation',
        correctAnswer: isAbove ? 'wahr' : 'falsch',
        hint: `Schätze: Runde beide Zahlen auf Zehner. ${Math.round(a / 10) * 10} × ${Math.round(b / 10) * 10} = ${Math.round(a / 10) * 10 * Math.round(b / 10) * 10}.`,
        explanation: `${a} × ${b} = ${result}. ${result} ist ${isAbove ? 'größer' : 'nicht größer'} als 10.000, also ist die Aussage ${isAbove ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // zweistellig × zweistellig (standard)
    const a = randInt(12, 35);
    const b = randInt(11, 25);
    const result = a * b;

    return {
      id: genId('k4-smul'),
      topicId: 'k4-schriftliche-multiplikation',
      question: `Berechne schriftlich: ${a} × ${b} = ?`,
      questionLatex: `${a} \\times ${b} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: result,
      hint: `Zerlege ${b} in Zehner und Einer: ${a} × ${Math.floor(b / 10) * 10} + ${a} × ${b % 10}. Addiere die Teilprodukte.`,
      explanation: `${a} × ${b} = ${a} × ${Math.floor(b / 10) * 10} + ${a} × ${b % 10} = ${a * Math.floor(b / 10) * 10} + ${a * (b % 10)} = ${result}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 90,
    };
  },
};
