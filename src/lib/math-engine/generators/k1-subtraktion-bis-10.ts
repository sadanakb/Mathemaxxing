import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-sub10-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-subtraktion-bis-10',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Generate numbers so that a - b >= 0 and a <= 10
    let a: number, b: number;
    switch (difficulty) {
      case 1:
        a = randInt(2, 6); b = randInt(1, a - 1);
        break;
      case 2:
        a = randInt(3, 8); b = randInt(1, a);
        break;
      default:
        a = randInt(2, 10); b = randInt(1, a);
        break;
    }
    const answer = a - b;

    if (variant === 0) {
      // number-input
      return {
        id: genId(),
        topicId: 'k1-subtraktion-bis-10',
        question: `Wie viel ist ${a} - ${b}?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + 2].filter(d => d >= 0 && d <= 10 && d !== answer),
        hint: `Zähle von ${a} genau ${b} zurück.`,
        explanation: `${a} - ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    if (variant === 1) {
      // multiple-choice
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = answer + randInt(-2, 3);
        if (d !== answer && d >= 0 && d <= 10) wrong.add(d);
      }

      return {
        id: genId(),
        topicId: 'k1-subtraktion-bis-10',
        question: `Wie viel ist ${a} - ${b}?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [...wrong],
        options: [String(answer), ...[...wrong].map(String)],
        hint: `Zähle von ${a} genau ${b} zurück.`,
        explanation: `${a} - ${b} = ${answer}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    if (variant === 2) {
      // equation-balance: a - b = ? or ? - b = answer
      const hideMinuend = randInt(0, 1) === 0 && a > b;
      return {
        id: genId(),
        topicId: 'k1-subtraktion-bis-10',
        question: hideMinuend
          ? `Die Waage ist im Gleichgewicht: ? - ${b} = ${answer}. Welche Zahl fehlt?`
          : `Die Waage ist im Gleichgewicht: ${a} - ${b} = ?. Was ist das Ergebnis?`,
        answerType: 'number',
        exerciseType: 'equation-balance',
        correctAnswer: hideMinuend ? a : answer,
        equationConfig: {
          left: hideMinuend ? `? - ${b}` : `${a} - ${b}`,
          right: hideMinuend ? `${answer}` : `?`,
          variable: '?',
          target: hideMinuend ? a : answer,
        },
        hint: hideMinuend
          ? `Überlege: Welche Zahl minus ${b} ergibt ${answer}?`
          : `Zähle von ${a} genau ${b} zurück.`,
        explanation: hideMinuend
          ? `${a} - ${b} = ${answer}, also fehlt die ${a}.`
          : `${a} - ${b} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    // variant === 3: true-false — "Stimmt diese Rechnung?"
    const showCorrect = randInt(0, 1) === 0;
    const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 1 : -1);
    const validShown = Math.max(0, Math.min(10, shownAnswer));
    return {
      id: genId(),
      topicId: 'k1-subtraktion-bis-10',
      question: `Stimmt das? ${a} - ${b} = ${validShown}`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: (validShown === answer) ? 'wahr' : 'falsch',
      hint: `Zähle von ${a} genau ${b} zurück und vergleiche.`,
      explanation: (validShown === answer)
        ? `Ja, ${a} - ${b} = ${answer}.`
        : `Nein, ${a} - ${b} = ${answer}, nicht ${validShown}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 10,
    };
  },
};
