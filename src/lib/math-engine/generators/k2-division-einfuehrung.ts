import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-div-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-division-einfuehrung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple division with results <= 5, divisors 2, 5, 10
      const divisors = [2, 5, 10];
      const divisor = divisors[randInt(0, divisors.length - 1)];
      const result = randInt(1, 5);
      const dividend = divisor * result;

      const distractors = [result + 1, result - 1, result + 2]
        .filter(d => d > 0 && d !== result)
        .slice(0, 3);

      return {
        id: genId(),
        topicId: 'k2-division-einfuehrung',
        question: `${dividend} : ${divisor} = ?`,
        questionLatex: `${dividend} \\div ${divisor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: result,
        distractors,
        hint: `Division ist die Umkehrung der Multiplikation: ? x ${divisor} = ${dividend}.`,
        explanation: `${dividend} : ${divisor} = ${result}, denn ${result} x ${divisor} = ${dividend}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Division with results <= 10, divisors 2-5
      const divisor = randInt(2, 5);
      const result = randInt(2, 10);
      const dividend = divisor * result;
      const variant = randInt(0, 2);

      if (variant === 1) {
        // equation-balance: fill in the division equation to balance both sides
        const left = `${dividend} ÷ ${divisor}`;
        const right = `?`;
        return {
          id: genId(),
          topicId: 'k2-division-einfuehrung',
          question: `Was muss in die Lücke, damit die Waage stimmt? ${dividend} ÷ ${divisor} = ?`,
          questionLatex: `${dividend} \\div ${divisor} = \\square`,
          answerType: 'number',
          exerciseType: 'equation-balance',
          correctAnswer: result,
          equationConfig: { left, right, variable: '?', target: result },
          distractors: [result + 1, result - 1, divisor].filter(d => d > 0 && d !== result).slice(0, 3),
          hint: `Denke: ? × ${divisor} = ${dividend}. Welche Zahl passt?`,
          explanation: `${dividend} ÷ ${divisor} = ${result}, denn ${result} × ${divisor} = ${dividend}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      if (variant === 2) {
        // multiple-choice: pick the correct quotient
        const distractorsArr = [result + 1, result - 1, result + divisor, divisor]
          .filter(d => d > 0 && d !== result)
          .slice(0, 3);
        const options = [result, ...distractorsArr].sort(() => Math.random() - 0.5).map(String);
        return {
          id: genId(),
          topicId: 'k2-division-einfuehrung',
          question: `${dividend} ÷ ${divisor} = ?`,
          questionLatex: `${dividend} \\div ${divisor} = ?`,
          answerType: 'multiple-choice',
          exerciseType: 'multiple-choice',
          correctAnswer: result,
          distractors: distractorsArr,
          options,
          correctOptions: [String(result)],
          hint: `Denke an die ${divisor}er-Reihe. Welches Ergebnis × ${divisor} = ${dividend}?`,
          explanation: `${dividend} ÷ ${divisor} = ${result}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      // variant 0 — original number-input
      const distractors = [result + 1, result - 1, result + divisor]
        .filter(d => d > 0 && d !== result)
        .slice(0, 3);

      return {
        id: genId(),
        topicId: 'k2-division-einfuehrung',
        question: `${dividend} : ${divisor} = ?`,
        questionLatex: `${dividend} \\div ${divisor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: result,
        distractors,
        hint: `Denke an die ${divisor}er-Reihe: ${Array.from({ length: 10 }, (_, i) => divisor * (i + 1)).join(', ')}. Wo ist ${dividend}?`,
        explanation: `${dividend} : ${divisor} = ${result}, denn ${result} x ${divisor} = ${dividend}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: Awareness of remainder — "Can this be divided evenly?"
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Clean division with larger numbers
      const divisor = randInt(2, 5);
      const result = randInt(5, 10);
      const dividend = divisor * result;

      return {
        id: genId(),
        topicId: 'k2-division-einfuehrung',
        question: `${dividend} : ${divisor} = ?`,
        questionLatex: `${dividend} \\div ${divisor} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: result,
        hint: `Wie oft passt ${divisor} in ${dividend}? Zähle in ${divisor}er-Schritten.`,
        explanation: `${dividend} : ${divisor} = ${result}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // True-false: "Geht die Division glatt auf?"
    const divisor = randInt(2, 5);
    const base = randInt(3, 10);
    const goesEvenly = randInt(0, 1) === 0;
    const dividend = goesEvenly ? divisor * base : divisor * base + randInt(1, divisor - 1);

    return {
      id: genId(),
      topicId: 'k2-division-einfuehrung',
      question: `Geht ${dividend} : ${divisor} glatt auf (ohne Rest)?`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: goesEvenly ? 'wahr' : 'falsch',
      hint: `Zähle in ${divisor}er-Schritten. Landest du genau auf ${dividend}?`,
      explanation: goesEvenly
        ? `Ja, ${dividend} : ${divisor} = ${base} geht glatt auf.`
        : `Nein, ${dividend} : ${divisor} geht nicht glatt auf. ${divisor} x ${base} = ${divisor * base}, es bleibt ein Rest von ${dividend - divisor * base}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
    };
  },
};
