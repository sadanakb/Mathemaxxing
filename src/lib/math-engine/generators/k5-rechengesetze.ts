import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k5-rechengesetze',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Punkt-vor-Strich: Berechne den Ausdruck
      const a = randInt(2, d === 1 ? 10 : 20);
      const b = randInt(2, d === 1 ? 5 : 10);
      const c = randInt(1, d === 1 ? 10 : 20);
      const op = randInt(0, 1) === 0 ? '+' : '-';
      // a +/- b * c
      const result = op === '+' ? a + b * c : a - b * c;
      const term = `${a} ${op} ${b} \\cdot ${c}`;

      return {
        id: genId('k5-rg'),
        topicId: 'k5-rechengesetze',
        question: `Berechne: ${a} ${op} ${b} \u00b7 ${c}`,
        questionLatex: `\\text{Berechne: } ${term}`,
        answerType: 'number',
        correctAnswer: result.toString(),
        hint: 'Denke an die Regel: Punkt vor Strich! Berechne zuerst die Multiplikation.',
        explanation: `Zuerst ${b} \u00b7 ${c} = ${b * c}, dann ${a} ${op} ${b * c} = ${result}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 2) {
      // Klammern: Berechne Ausdruck mit Klammern
      const a = randInt(2, d === 1 ? 10 : 20);
      const b = randInt(2, d === 1 ? 10 : 15);
      const c = randInt(2, d === 1 ? 5 : 10);
      // (a + b) * c
      const result = (a + b) * c;

      return {
        id: genId('k5-rg'),
        topicId: 'k5-rechengesetze',
        question: `Berechne: (${a} + ${b}) \u00b7 ${c}`,
        questionLatex: `\\text{Berechne: } (${a} + ${b}) \\cdot ${c}`,
        answerType: 'number',
        correctAnswer: result.toString(),
        hint: 'Berechne zuerst den Ausdruck in der Klammer!',
        explanation: `Zuerst die Klammer: ${a} + ${b} = ${a + b}, dann ${a + b} \u00b7 ${c} = ${result}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 3) {
      // Kommutativgesetz: Welche Umstellung ist richtig?
      const a = randInt(3, 15);
      const b = randInt(3, 15);
      const isAdd = randInt(0, 1) === 0;
      const op = isAdd ? '+' : '\u00b7';
      const correct = `${b} ${op} ${a}`;
      const wrong1 = `${a} ${isAdd ? '-' : '\u00f7'} ${b}`;
      const wrong2 = `${b} ${isAdd ? '-' : '\u00f7'} ${a}`;

      return {
        id: genId('k5-rg'),
        topicId: 'k5-rechengesetze',
        question: `Welcher Ausdruck ergibt das gleiche Ergebnis wie ${a} ${op} ${b}? (Kommutativgesetz)`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: [wrong1, wrong2],
        hint: `Beim Kommutativgesetz darf man die Zahlen bei ${isAdd ? 'Addition' : 'Multiplikation'} vertauschen.`,
        explanation: `${a} ${op} ${b} = ${b} ${op} ${a} (Kommutativgesetz: Die Reihenfolge darf getauscht werden).`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 35,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 4) {
      // Distributivgesetz: Ausklammern / Ausmultiplizieren
      const a = randInt(2, d === 1 ? 5 : 10);
      const b = randInt(2, d === 1 ? 10 : 20);
      const c = randInt(2, d === 1 ? 10 : 20);

      if (d <= 2) {
        // Ausmultiplizieren: a * (b + c) = ?
        const result = a * (b + c);
        return {
          id: genId('k5-rg'),
          topicId: 'k5-rechengesetze',
          question: `Berechne mit dem Distributivgesetz: ${a} \u00b7 (${b} + ${c})`,
          questionLatex: `\\text{Berechne: } ${a} \\cdot (${b} + ${c})`,
          answerType: 'number',
          correctAnswer: result.toString(),
          hint: `Distributivgesetz: ${a} \u00b7 (${b} + ${c}) = ${a} \u00b7 ${b} + ${a} \u00b7 ${c}`,
          explanation: `${a} \u00b7 ${b} + ${a} \u00b7 ${c} = ${a * b} + ${a * c} = ${result}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: d === 1 ? 25 : 35,
          exerciseType: 'number-input',
        };
      } else {
        // Ausklammern: a*b + a*c = a * (b + c)
        const product = a * b + a * c;
        return {
          id: genId('k5-rg'),
          topicId: 'k5-rechengesetze',
          question: `Klammere aus: ${a * b} + ${a * c}. Welche Zahl kann man ausklammern?`,
          answerType: 'number',
          correctAnswer: a.toString(),
          hint: `Suche den gemeinsamen Faktor von ${a * b} und ${a * c}.`,
          explanation: `${a * b} + ${a * c} = ${a} \u00b7 ${b} + ${a} \u00b7 ${c} = ${a} \u00b7 (${b} + ${c}) = ${product}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 45,
          exerciseType: 'number-input',
        };
      }
    }

    // variant 5: Assoziativgesetz - True/False
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    const c = randInt(2, 10);
    const isAdd = randInt(0, 1) === 0;
    const op = isAdd ? '+' : '\u00b7';
    // Statement: (a op b) op c = a op (b op c)
    const isCorrect = true; // The associative law is always true for + and *
    const showCorrect = randInt(0, 1) === 0;

    if (showCorrect) {
      return {
        id: genId('k5-rg'),
        topicId: 'k5-rechengesetze',
        question: `Stimmt das? (${a} ${op} ${b}) ${op} ${c} = ${a} ${op} (${b} ${op} ${c})`,
        answerType: 'true-false',
        correctAnswer: 'true',
        hint: `Das Assoziativgesetz gilt für ${isAdd ? 'Addition' : 'Multiplikation'}.`,
        explanation: `Ja, das stimmt. Das Assoziativgesetz erlaubt es, die Klammern zu verschieben bei ${isAdd ? 'Addition' : 'Multiplikation'}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 30,
      };
    } else {
      // Show wrong statement: (a - b) - c = a - (b - c) which is generally false
      const sub = randInt(0, 1) === 0;
      const wrongOp = sub ? '-' : '\u00f7';
      const leftResult = sub ? (a + 10 - b - c) : 0;
      const rightResult = sub ? (a + 10 - (b - c)) : 0;
      const statement = sub
        ? `(${a + 10} ${wrongOp} ${b}) ${wrongOp} ${c} = ${a + 10} ${wrongOp} (${b} ${wrongOp} ${c})`
        : `(${a * b * c} ${wrongOp} ${b}) ${wrongOp} ${c} = ${a * b * c} ${wrongOp} (${b} ${wrongOp} ${c})`;
      const correct = sub ? leftResult === rightResult : false;

      return {
        id: genId('k5-rg'),
        topicId: 'k5-rechengesetze',
        question: `Stimmt das? ${statement}`,
        answerType: 'true-false',
        correctAnswer: correct ? 'true' : 'false',
        hint: `Das Assoziativgesetz gilt NICHT für ${sub ? 'Subtraktion' : 'Division'}.`,
        explanation: correct
          ? 'In diesem Sonderfall stimmt die Gleichung zufällig, aber allgemein gilt das Assoziativgesetz nicht für Subtraktion/Division.'
          : `Nein, das stimmt nicht. Das Assoziativgesetz gilt nicht für ${sub ? 'Subtraktion' : 'Division'}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
      };
    }
  },
};
