import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add10-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-10',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Generate numbers so that a + b <= 10
    let a: number, b: number;
    switch (difficulty) {
      case 1:
        a = randInt(1, 5); b = randInt(1, 5 - a + 1);
        break;
      case 2:
        a = randInt(1, 7); b = randInt(1, Math.min(7, 10 - a));
        break;
      default:
        a = randInt(1, 9); b = randInt(1, 10 - a);
        break;
    }
    const answer = a + b;

    if (variant === 0) {
      // number-input
      return {
        id: genId(),
        topicId: 'k1-addition-bis-10',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, answer + 2].filter(d => d > 0 && d <= 10 && d !== answer),
        hint: `Zähle von ${a} noch ${b} weiter.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
        visualConfig: { type: 'base10-blocks' as const, props: { ones: a } },
      };
    }

    if (variant === 1) {
      // multiple-choice
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = answer + randInt(-2, 2);
        if (d !== answer && d >= 0 && d <= 10) wrong.add(d);
      }

      return {
        id: genId(),
        topicId: 'k1-addition-bis-10',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [...wrong],
        options: [String(answer), ...[...wrong].map(String)],
        hint: `Zähle von ${a} noch ${b} weiter.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    if (variant === 2) {
      // drag-onto-numberline: place the sum on the number line
      return {
        id: genId(),
        topicId: 'k1-addition-bis-10',
        question: `Rechne ${a} + ${b} und zeige das Ergebnis auf dem Zahlenstrahl!`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number',
        exerciseType: 'drag-onto-numberline',
        correctAnswer: answer,
        numberlineConfig: { min: 0, max: 10, step: 1, targets: [answer] },
        hint: `Starte bei ${a} und springe ${b} Schritte nach rechts.`,
        explanation: `${a} + ${b} = ${answer}. Das Ergebnis liegt bei der ${answer} auf dem Zahlenstrahl.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 18,
      };
    }

    // variant === 3: equation-balance
    // Show a balance: a + b = ? where one side has the sum hidden
    const hideLeft = randInt(0, 1) === 0;
    const leftSide = hideLeft ? `? + ${b}` : `${a} + ${b}`;
    const rightSide = hideLeft ? `${answer}` : `?`;
    return {
      id: genId(),
      topicId: 'k1-addition-bis-10',
      question: hideLeft
        ? `Die Waage ist im Gleichgewicht: ? + ${b} = ${answer}. Welche Zahl fehlt?`
        : `Die Waage ist im Gleichgewicht: ${a} + ${b} = ?. Was ergibt die Summe?`,
      answerType: 'number',
      exerciseType: 'equation-balance',
      correctAnswer: hideLeft ? a : answer,
      equationConfig: {
        left: leftSide,
        right: rightSide,
        variable: '?',
        target: hideLeft ? a : answer,
      },
      hint: hideLeft
        ? `Überlege: Welche Zahl plus ${b} ergibt ${answer}?`
        : `Zähle ${a} und ${b} zusammen.`,
      explanation: hideLeft
        ? `${a} + ${b} = ${answer}, also fehlt die ${a}.`
        : `${a} + ${b} = ${answer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
