import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-sub20-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-subtraktion-bis-20',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    let a: number, b: number;
    switch (difficulty) {
      case 1: a = randInt(2, 10); b = randInt(1, a); break;
      case 2: a = randInt(6, 15); b = randInt(1, a); break;
      default: a = randInt(11, 20); b = randInt(1, a); break;
    }
    const answer = a - b;
    const distractors = [answer - 2, answer - 1, answer + 1, answer + 2]
      .filter(d => d >= 0 && d <= 20 && d !== answer).slice(0, 3);

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k1-subtraktion-bis-20',
        question: `Wie viel ist ${a} − ${b}?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: `Zähle von ${a} rückwärts ${b} Schritte.`,
        explanation: `${a} − ${b} = ${answer}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20,
      };
    }

    if (variant === 1) {
      return {
        id: genId(), topicId: 'k1-subtraktion-bis-20',
        question: `Wie viel ist ${a} − ${b}?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint: `Zähle von ${a} rückwärts ${b} Schritte.`,
        explanation: `${a} − ${b} = ${answer}. Wenn du von ${a} genau ${b} abziehst, landest du bei ${answer}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 12 : difficulty === 2 ? 15 : 20,
      };
    }

    if (variant === 2) {
      // drag-onto-numberline: show the result on a number line
      return {
        id: genId(), topicId: 'k1-subtraktion-bis-20',
        question: `${a} − ${b} = ? Zeige das Ergebnis auf dem Zahlenstrahl!`,
        answerType: 'number', exerciseType: 'drag-onto-numberline',
        correctAnswer: answer,
        numberlineConfig: { min: 0, max: 20, step: 1, targets: [answer] },
        hint: `Starte bei ${a} und gehe ${b} Schritte nach links.`,
        explanation: `${a} − ${b} = ${answer}. Auf dem Zahlenstrahl: von ${a} aus ${b} Schritte zurück ergibt ${answer}.`,
        difficulty, category: 'Repräsentational',
        estimatedSeconds: difficulty === 1 ? 15 : 20,
        visualConfig: { type: 'numberline' as const, props: { min: 0, max: 20 } },
      };
    }

    // variant === 3: true-false — stimmt diese Rechnung?
    const showCorrect = randInt(0, 1) === 0;
    const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 1 : -1);
    const isValid = shownAnswer >= 0 && shownAnswer <= 20;
    const actualShown = isValid ? shownAnswer : answer;
    const actualCorrect = actualShown === answer;
    return {
      id: genId(), topicId: 'k1-subtraktion-bis-20',
      question: `Stimmt das? ${a} − ${b} = ${actualShown}`,
      answerType: 'true-false', exerciseType: 'true-false',
      correctAnswer: actualCorrect ? 'wahr' : 'falsch',
      hint: `Rechne selbst: ${a} − ${b}. Zähle von ${a} rückwärts.`,
      explanation: actualCorrect
        ? `Ja, ${a} − ${b} = ${answer} ist richtig!`
        : `Nein, ${a} − ${b} = ${answer}, nicht ${actualShown}.`,
      difficulty, category: 'Abstrakt',
      estimatedSeconds: 12,
    };
  },
};
