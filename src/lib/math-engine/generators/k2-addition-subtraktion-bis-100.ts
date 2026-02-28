import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-addub-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k2-addition-subtraktion-bis-100',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const isAdd = randInt(0, 1) === 0;

    let a: number, b: number, answer: number;
    if (difficulty === 1) {
      a = randInt(1, 9) * 10;
      b = randInt(1, (isAdd ? (100 - a) : a) / 10) * 10;
      answer = isAdd ? a + b : a - b;
    } else {
      a = randInt(10, 80);
      b = isAdd ? randInt(1, 100 - a) : randInt(1, a);
      answer = isAdd ? a + b : a - b;
    }

    const distractors = [answer - 1, answer + 1, answer + 10, answer - 10]
      .filter(d => d >= 0 && d <= 100 && d !== answer).slice(0, 3);
    const opSymbol = isAdd ? '+' : '-';
    const question = `${a} ${opSymbol} ${b} = ?`;

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k2-addition-subtraktion-bis-100',
        question, questionLatex: question,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: isAdd ? `Zähle ${b} zu ${a} hinzu.` : `Ziehe ${b} von ${a} ab.`,
        explanation: `${a} ${opSymbol} ${b} = ${answer}`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 20 : 30,
      };
    }

    if (variant === 1) {
      // multiple-choice
      return {
        id: genId(), topicId: 'k2-addition-subtraktion-bis-100',
        question, questionLatex: question,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint: isAdd ? `Addiere schrittweise.` : `Subtrahiere schrittweise.`,
        explanation: `${a} ${opSymbol} ${b} = ${answer}`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 20,
      };
    }

    if (variant === 2) {
      // true-false
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 10 : -1);
      return {
        id: genId(), topicId: 'k2-addition-subtraktion-bis-100',
        question: `Stimmt das? ${a} ${opSymbol} ${b} = ${shownAnswer}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint: `Rechne ${a} ${opSymbol} ${b} selbst.`,
        explanation: (shownAnswer === answer)
          ? `Ja, ${a} ${opSymbol} ${b} = ${answer}.`
          : `Nein, ${a} ${opSymbol} ${b} = ${answer}, nicht ${shownAnswer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 18,
      };
    }

    // variant === 3: Lückenaufgabe mit difficulty 3 Stil (missing operand)
    if (difficulty === 3) {
      const correctMissing = isAdd ? a : b;
      const missingQuestion = isAdd ? `? + ${b} = ${answer}` : `${a} - ? = ${answer}`;
      return {
        id: genId(), topicId: 'k2-addition-subtraktion-bis-100',
        question: `Welche Zahl fehlt? ${missingQuestion}`,
        questionLatex: missingQuestion,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: correctMissing,
        distractors: [correctMissing + 1, correctMissing - 1, correctMissing + 10].filter(d => d >= 0 && d !== correctMissing).slice(0, 3),
        hint: isAdd ? `Was + ${b} = ${answer}? Rechne ${answer} - ${b}.` : `${a} - was = ${answer}? Rechne ${a} - ${answer}.`,
        explanation: `${isAdd ? `${correctMissing} + ${b}` : `${a} - ${b}`} = ${answer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 40,
      };
    }
    // For difficulties 1-2 variant 3: drag-onto-numberline
    return {
      id: genId(), topicId: 'k2-addition-subtraktion-bis-100',
      question: `${a} ${opSymbol} ${b} = ? Zeige auf dem Zahlenstrahl!`,
      answerType: 'number', exerciseType: 'drag-onto-numberline',
      correctAnswer: answer,
      numberlineConfig: { min: 0, max: 100, step: 10, targets: [answer] },
      hint: `${isAdd ? 'Gehe vorwärts' : 'Gehe rückwärts'} vom ${a} aus ${b} Schritte.`,
      explanation: `${a} ${opSymbol} ${b} = ${answer}.`,
      difficulty, category: 'Repräsentational', estimatedSeconds: 22,
    };
  },
};
