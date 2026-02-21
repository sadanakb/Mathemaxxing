import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-grund-fest-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-grundrechenarten-festigen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einfache Addition/Subtraktion mit ganzen Zahlen
      const ops = ['+', '-'];
      const op = ops[randInt(0, 1)];
      const a = randInt(10, 999);
      const b = randInt(10, 999);
      const answer = op === '+' ? a + b : a - b;

      // Bei Subtraktion sicherstellen, dass a >= b für einfache Aufgaben
      const realA = op === '-' ? Math.max(a, b) : a;
      const realB = op === '-' ? Math.min(a, b) : b;
      const realAnswer = op === '+' ? realA + realB : realA - realB;

      return {
        id: genId(),
        topicId: 'k7-grundrechenarten-festigen',
        question: `Berechne: ${realA} ${op} ${realB}`,
        answerType: 'number',
        correctAnswer: realAnswer,
        hint: op === '+'
          ? `Stelle die Zahlen untereinander und addiere stellenweise von rechts nach links.`
          : `Stelle die Zahlen untereinander und subtrahiere stellenweise. Achte auf den Übertrag.`,
        explanation: `${realA} ${op} ${realB} = ${realAnswer}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else if (d === 2) {
      // Multiplikation und Division
      const isMult = Math.random() < 0.5;

      if (isMult) {
        const a = randInt(12, 99);
        const b = randInt(3, 12);
        const answer = a * b;

        return {
          id: genId(),
          topicId: 'k7-grundrechenarten-festigen',
          question: `Berechne: ${a} \u00d7 ${b}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Zerlege die Multiplikation: ${a} \u00d7 ${b} = (${Math.floor(a / 10) * 10} + ${a % 10}) \u00d7 ${b}`,
          explanation: `${a} \u00d7 ${b} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 30,
        };
      } else {
        const b = randInt(3, 12);
        const answer = randInt(10, 99);
        const a = answer * b;

        return {
          id: genId(),
          topicId: 'k7-grundrechenarten-festigen',
          question: `Berechne: ${a} \u00f7 ${b}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `\u00dcberlege: Welche Zahl mal ${b} ergibt ${a}? Oder teile schriftlich.`,
          explanation: `${a} \u00f7 ${b} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 30,
        };
      }
    } else {
      // Gemischte Aufgaben mit Dezimalzahlen und Punkt-vor-Strich
      const types = ['dezimal', 'punktVorStrich', 'klammern'];
      const type = types[randInt(0, types.length - 1)];

      if (type === 'dezimal') {
        const a = randInt(10, 99);
        const b = randInt(1, 9);
        const aDecimal = a / 10;
        const bDecimal = b / 10;
        const op = Math.random() < 0.5 ? '+' : '-';
        const answer = op === '+'
          ? Math.round((aDecimal + bDecimal) * 10) / 10
          : Math.round((aDecimal - bDecimal) * 10) / 10;

        return {
          id: genId(),
          topicId: 'k7-grundrechenarten-festigen',
          question: `Berechne: ${aDecimal} ${op} ${bDecimal}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Achte auf die Kommastelle. Rechne wie mit ganzen Zahlen und setze das Komma richtig.`,
          explanation: `${aDecimal} ${op} ${bDecimal} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      } else if (type === 'punktVorStrich') {
        const a = randInt(2, 20);
        const b = randInt(2, 9);
        const c = randInt(2, 9);
        const op = Math.random() < 0.5 ? '+' : '-';
        const answer = op === '+' ? a + b * c : a - b * c;

        return {
          id: genId(),
          topicId: 'k7-grundrechenarten-festigen',
          question: `Berechne (Punkt vor Strich!): ${a} ${op} ${b} \u00d7 ${c}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Punkt vor Strich: Erst ${b} \u00d7 ${c} = ${b * c} berechnen, dann ${a} ${op} ${b * c}.`,
          explanation: `${a} ${op} ${b} \u00d7 ${c} = ${a} ${op} ${b * c} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 30,
        };
      } else {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const c = randInt(2, 5);
        const answer = (a + b) * c;

        return {
          id: genId(),
          topicId: 'k7-grundrechenarten-festigen',
          question: `Berechne: (${a} + ${b}) \u00d7 ${c}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Erst die Klammer berechnen: ${a} + ${b} = ${a + b}. Dann mal ${c}.`,
          explanation: `(${a} + ${b}) \u00d7 ${c} = ${a + b} \u00d7 ${c} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      }
    }
  },
};
