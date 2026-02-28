import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add20m-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-20-mit-uebergang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Crossing the ten: a + b > 10, both a and b are single-digit or a is near 10
    let a: number, b: number;
    switch (difficulty) {
      case 1: a = randInt(6, 9); b = randInt(10 - a + 1, Math.min(9, 20 - a)); break;
      case 2: a = randInt(5, 9); b = randInt(10 - a + 1, Math.min(9, 20 - a)); break;
      default: a = randInt(3, 9); b = randInt(10 - a + 1, Math.min(9, 20 - a)); break;
    }
    const answer = a + b;
    const fillTo10 = 10 - a;
    const remainder = b - fillTo10;
    const distractors = [answer - 1, answer + 1, 10].filter(d => d > 0 && d <= 20 && d !== answer);

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k1-addition-bis-20-mit-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: `Zerlege ${b} in ${fillTo10} und ${remainder}. Erst ${a} + ${fillTo10} = 10, dann 10 + ${remainder} = ${answer}.`,
        explanation: `${a} + ${b} = ${answer}. Strategie: ${a} + ${fillTo10} = 10, dann 10 + ${remainder} = ${answer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 20,
      };
    }

    if (variant === 1) {
      return {
        id: genId(), topicId: 'k1-addition-bis-20-mit-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint: `Zerlege ${b} in ${fillTo10} und ${remainder}. Erst ${a} + ${fillTo10} = 10, dann + ${remainder}.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 15,
      };
    }

    if (variant === 2) {
      // true-false
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 1 : -1);
      return {
        id: genId(), topicId: 'k1-addition-bis-20-mit-uebergang',
        question: `Stimmt das? ${a} + ${b} = ${shownAnswer}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint: `Zerlege ${b} in ${fillTo10} und ${remainder}. Erst ${a} + ${fillTo10} = 10.`,
        explanation: (shownAnswer === answer)
          ? `Ja, ${a} + ${b} = ${answer} ist richtig.`
          : `Nein, ${a} + ${b} = ${answer}, nicht ${shownAnswer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 15,
      };
    }

    // variant === 3: drag-onto-numberline — show result on 0-20 number line
    return {
      id: genId(), topicId: 'k1-addition-bis-20-mit-uebergang',
      question: `${a} + ${b} = ? Zeige das Ergebnis auf dem Zahlenstrahl!`,
      answerType: 'number', exerciseType: 'drag-onto-numberline',
      correctAnswer: answer,
      numberlineConfig: { min: 0, max: 20, step: 1, targets: [answer] },
      hint: `Starte bei ${a} und mache ${b} Schritte nach rechts. Du überquerst dabei die 10!`,
      explanation: `${a} + ${b} = ${answer}. Du gehst von ${a} über die 10 bis zu ${answer}.`,
      difficulty, category: 'Repräsentational',
      estimatedSeconds: 18,
      visualConfig: { type: 'numberline' as const, props: { min: 0, max: 20 } },
    };
  },
};
