import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-sub100-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-subtraktion-bis-100',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // Generate a and b appropriate for difficulty
    let a: number, b: number;
    if (difficulty === 1) {
      do { a = randInt(20, 99); b = randInt(10, a - 1); } while ((a % 10) < (b % 10));
    } else if (difficulty === 2) {
      do { a = randInt(21, 99); b = randInt(3, a - 1); } while ((a % 10) >= (b % 10) || b < 10);
    } else {
      a = randInt(70, 100);
      b = randInt(25, a - 5);
    }
    const answer = a - b;
    const distractors = [answer + 1, answer - 1, answer + 10, answer - 10]
      .filter(d => d >= 0 && d !== answer).slice(0, 3);

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k2-subtraktion-bis-100',
        question: `${a} - ${b} = ?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: difficulty === 1
          ? `Ziehe erst die Zehner ab, dann die Einer.`
          : `Entbündeln: Zähle von ${b} aufwärts bis ${a}.`,
        explanation: `${a} - ${b} = ${answer}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 35,
      };
    }

    if (variant === 1) {
      // true-false: stimmt diese Differenz?
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 10 : 1);
      return {
        id: genId(), topicId: 'k2-subtraktion-bis-100',
        question: `Stimmt das? ${a} - ${b} = ${shownAnswer}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint: `Rechne ${a} - ${b} selbst. Zähle von ${b} bis ${a} oder arbeite schrittweise.`,
        explanation: (shownAnswer === answer)
          ? `Ja, ${a} - ${b} = ${answer}.`
          : `Nein, ${a} - ${b} = ${answer}, nicht ${shownAnswer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 20,
      };
    }

    if (variant === 2) {
      // equation-balance: a - ? = answer (find b)
      return {
        id: genId(), topicId: 'k2-subtraktion-bis-100',
        question: `Welche Zahl fehlt? ${a} - ___ = ${answer}`,
        questionLatex: `${a} - \\square = ${answer}`,
        answerType: 'number', exerciseType: 'equation-balance',
        correctAnswer: b,
        equationConfig: { left: `${a} - ?`, right: String(answer), variable: '?', target: b },
        distractors: [b + 1, b - 1, b + 10].filter(d => d > 0 && d !== b).slice(0, 3),
        hint: `Was musst du von ${a} abziehen, um ${answer} zu bekommen? Rechne ${a} - ${answer}.`,
        explanation: `${a} - ${b} = ${answer}. Die fehlende Zahl ist ${b}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 25,
      };
    }

    // variant === 3: drag-onto-numberline
    return {
      id: genId(), topicId: 'k2-subtraktion-bis-100',
      question: `${a} - ${b} = ? Zeige das Ergebnis auf dem Zahlenstrahl!`,
      answerType: 'number', exerciseType: 'drag-onto-numberline',
      correctAnswer: answer,
      numberlineConfig: { min: 0, max: 100, step: 10, targets: [answer] },
      hint: `Starte bei ${a} auf dem Zahlenstrahl und gehe ${b} Schritte zurück.`,
      explanation: `${a} - ${b} = ${answer}. Auf dem Zahlenstrahl von ${a} aus ${b} zurück.`,
      difficulty, category: 'Repräsentational', estimatedSeconds: 25,
      visualConfig: { type: 'numberline' as const, props: { min: 0, max: 100 } },
    };
  },
};
