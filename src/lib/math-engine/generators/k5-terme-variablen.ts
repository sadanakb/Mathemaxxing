import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const variablen = ['x', 'y', 'a', 'b', 'n'];

export const template: ExerciseTemplate = {
  topicId: 'k5-terme-variablen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Variable einsetzen: Berechne den Term für x = ...
      const v = variablen[randInt(0, variablen.length - 1)];
      const val = randInt(2, d === 1 ? 5 : d === 2 ? 10 : 15);
      const coeff = randInt(2, d === 1 ? 5 : 10);
      const add = randInt(1, d === 1 ? 10 : 20);
      const result = coeff * val + add;

      return {
        id: genId('k5-tv'),
        topicId: 'k5-terme-variablen',
        question: `Berechne den Term ${coeff} \u00b7 ${v} + ${add} für ${v} = ${val}.`,
        questionLatex: `\\text{Berechne } ${coeff} \\cdot ${v} + ${add} \\text{ für } ${v} = ${val}`,
        answerType: 'number',
        correctAnswer: result.toString(),
        hint: `Setze ${val} für ${v} ein und rechne: ${coeff} \u00b7 ${val} + ${add}.`,
        explanation: `${coeff} \u00b7 ${val} + ${add} = ${coeff * val} + ${add} = ${result}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 2) {
      // Term aufstellen: Textaufgabe -> Term
      const v = variablen[randInt(0, 2)]; // x, y, a
      const mult = randInt(2, d === 1 ? 3 : 6);
      const add = randInt(1, d === 1 ? 5 : 15);
      const correct = `${mult} \u00b7 ${v} + ${add}`;
      const wrong1 = `${mult} + ${v} \u00b7 ${add}`;
      const wrong2 = `${add} \u00b7 ${v} + ${mult}`;
      const wrong3 = `${mult} \u00b7 ${v} - ${add}`;

      const texts = [
        `Ein Heft kostet ${mult} Euro. Du kaufst ${v} Hefte und bezahlst noch ${add} Euro Versand. Welcher Term beschreibt die Gesamtkosten?`,
        `Ein Kinoticket kostet ${mult} Euro. ${v} Freunde gehen ins Kino und kaufen noch Popcorn für ${add} Euro. Welcher Term beschreibt die Gesamtkosten?`,
        `Jede Packung enthält ${mult} Äpfel. Du kaufst ${v} Packungen und bekommst ${add} Äpfel geschenkt. Wie viele Äpfel hast du insgesamt?`,
      ];
      const text = texts[randInt(0, texts.length - 1)];

      return {
        id: genId('k5-tv'),
        topicId: 'k5-terme-variablen',
        question: text,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: [wrong1, wrong2, wrong3],
        hint: `Überlege: Was wird multipliziert und was wird addiert?`,
        explanation: `${mult}-mal die Variable ${v} plus ${add} ergibt den Term ${correct}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 30 : d === 2 ? 40 : 50,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 3) {
      // Terme vereinfachen: gleichartige Terme zusammenfassen
      const v = variablen[randInt(0, 1)]; // x or y
      const a = randInt(2, d === 1 ? 5 : 10);
      const b = randInt(1, d === 1 ? 5 : 10);
      const op = randInt(0, 1) === 0 ? '+' : '-';
      const result = op === '+' ? a + b : a - b;

      if (d === 1) {
        return {
          id: genId('k5-tv'),
          topicId: 'k5-terme-variablen',
          question: `Vereinfache: ${a}${v} ${op} ${b}${v}`,
          questionLatex: `\\text{Vereinfache: } ${a}${v} ${op} ${b}${v}`,
          answerType: 'text',
          correctAnswer: `${result}${v}`,
          hint: `${a}${v} ${op} ${b}${v}: Fasse die gleichartigen Terme zusammen (wie ${a} Äpfel ${op} ${b} Äpfel).`,
          explanation: `${a}${v} ${op} ${b}${v} = (${a} ${op} ${b})${v} = ${result}${v}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
          exerciseType: 'text-input',
        };
      } else {
        // More complex: ax + b + cx
        const c = randInt(1, 8);
        const constVal = randInt(1, 10);
        const combined = a + c;
        return {
          id: genId('k5-tv'),
          topicId: 'k5-terme-variablen',
          question: `Vereinfache: ${a}${v} + ${constVal} + ${c}${v}`,
          questionLatex: `\\text{Vereinfache: } ${a}${v} + ${constVal} + ${c}${v}`,
          answerType: 'text',
          correctAnswer: `${combined}${v} + ${constVal}`,
          hint: `Fasse zuerst die ${v}-Terme zusammen: ${a}${v} + ${c}${v}. Die Zahl ${constVal} bleibt übrig.`,
          explanation: `${a}${v} + ${c}${v} = ${combined}${v}, also ergibt sich ${combined}${v} + ${constVal}.`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: d === 2 ? 35 : 45,
          exerciseType: 'text-input',
        };
      }
    }

    if (variant === 4) {
      // Wert bestimmen: Zweistelliger Term
      const v = variablen[randInt(0, 1)];
      const val = randInt(1, d === 1 ? 5 : d === 2 ? 8 : 12);

      if (d === 1) {
        // Simple: v + number
        const add = randInt(3, 10);
        const result = val + add;
        return {
          id: genId('k5-tv'),
          topicId: 'k5-terme-variablen',
          question: `Berechne ${v} + ${add} für ${v} = ${val}.`,
          answerType: 'number',
          correctAnswer: result.toString(),
          hint: `Setze ${val} für ${v} ein.`,
          explanation: `${val} + ${add} = ${result}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 15,
          exerciseType: 'number-input',
        };
      } else {
        // a*v - b
        const coeff = randInt(2, 8);
        const sub = randInt(1, coeff * val - 1);
        const result = coeff * val - sub;
        return {
          id: genId('k5-tv'),
          topicId: 'k5-terme-variablen',
          question: `Berechne ${coeff} \u00b7 ${v} - ${sub} für ${v} = ${val}.`,
          questionLatex: `\\text{Berechne } ${coeff} \\cdot ${v} - ${sub} \\text{ für } ${v} = ${val}`,
          answerType: 'number',
          correctAnswer: result.toString(),
          hint: `Setze ${val} ein: ${coeff} \u00b7 ${val} - ${sub}. Punkt vor Strich!`,
          explanation: `${coeff} \u00b7 ${val} - ${sub} = ${coeff * val} - ${sub} = ${result}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: d === 2 ? 30 : 40,
          exerciseType: 'number-input',
        };
      }
    }

    // variant 5: Gleichung lösen (einfach) - Was muss x sein?
    const v = variablen[randInt(0, 1)];
    const target = randInt(5, d === 1 ? 15 : d === 2 ? 30 : 50);
    const sub = randInt(1, target - 1);
    const answer = target - sub;

    return {
      id: genId('k5-tv'),
      topicId: 'k5-terme-variablen',
      question: `Welchen Wert muss ${v} haben, damit ${v} + ${sub} = ${target} gilt?`,
      questionLatex: `${v} + ${sub} = ${target} \\quad ${v} = \\text{?}`,
      answerType: 'number',
      correctAnswer: answer.toString(),
      hint: `Überlege: Welche Zahl plus ${sub} ergibt ${target}? Oder rechne ${target} - ${sub}.`,
      explanation: `${v} = ${target} - ${sub} = ${answer}`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 35,
      exerciseType: 'number-input',
    };
  },
};
