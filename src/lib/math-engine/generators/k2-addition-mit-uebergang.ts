import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-addue-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genWithCarry(aMin: number, aMax: number, bMax: number): { a: number; b: number } {
  let a: number, b: number;
  do {
    a = randInt(aMin, aMax);
    b = randInt(2, bMax);
  } while ((a % 10) + (b % 10) < 10 || a + b > 100);
  return { a, b };
}

export const template: ExerciseTemplate = {
  topicId: 'k2-addition-mit-uebergang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    const { a, b } = difficulty === 1
      ? genWithCarry(12, 89, 9)
      : difficulty === 2
      ? genWithCarry(15, 70, 30)
      : (() => {
          let aa: number, bb: number, cc: number;
          do {
            aa = randInt(10, 50);
            bb = randInt(5, 25);
            cc = randInt(5, 25);
          } while (aa + bb + cc > 100 || ((aa % 10) + (bb % 10) < 10 && (bb % 10) + (cc % 10) < 10));
          return { a: aa, b: bb };
        })();

    const answer = a + b;
    const onesA = a % 10;
    const toNext10 = 10 - onesA;
    const tensB = Math.floor(b / 10) * 10;
    const onesB = b % 10;

    const distractors = [answer - 1, answer + 1, answer - 10, answer + 10]
      .filter(d => d >= 0 && d <= 100 && d !== answer).slice(0, 3);

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k2-addition-mit-uebergang',
        question: `${a} + ${b} = ?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: difficulty === 1
          ? `Zerlege ${b}: Erst +${toNext10} bis ${a + toNext10}, dann +${b - toNext10}.`
          : `Zerlege ${b} in ${tensB} und ${onesB}. Rechne erst ${a} + ${tensB}, dann + ${onesB}.`,
        explanation: difficulty === 1
          ? `${a} + ${toNext10} = ${a + toNext10}, dann + ${b - toNext10} = ${answer}.`
          : `${a} + ${tensB} = ${a + tensB}, dann + ${onesB} = ${answer}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 30 : 40,
      };
    }

    if (variant === 1) {
      // true-false: ist diese Summe korrekt?
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 10 : -1);
      return {
        id: genId(), topicId: 'k2-addition-mit-uebergang',
        question: `Stimmt das? ${a} + ${b} = ${shownAnswer}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint: `Rechne: Erst ${a} + ${toNext10} = ${a + toNext10}, dann weiter.`,
        explanation: (shownAnswer === answer)
          ? `Ja, ${a} + ${b} = ${answer}.`
          : `Nein, ${a} + ${b} = ${answer}, nicht ${shownAnswer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 20,
      };
    }

    if (variant === 2) {
      // equation-balance: ? + b = answer (find a)
      const missing = a;
      return {
        id: genId(), topicId: 'k2-addition-mit-uebergang',
        question: `Welche Zahl fehlt? ___ + ${b} = ${answer}`,
        questionLatex: `\\square + ${b} = ${answer}`,
        answerType: 'number', exerciseType: 'equation-balance',
        correctAnswer: missing,
        equationConfig: { left: `? + ${b}`, right: String(answer), variable: '?', target: missing },
        distractors: [missing + 1, missing - 1, missing + 10].filter(d => d >= 0 && d !== missing).slice(0, 3),
        hint: `Überlege: Was + ${b} ergibt ${answer}? Rechne ${answer} - ${b}.`,
        explanation: `${missing} + ${b} = ${answer}. Probe: ${answer} - ${b} = ${missing}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 25,
      };
    }

    // variant === 3: drag-onto-numberline (0-100)
    return {
      id: genId(), topicId: 'k2-addition-mit-uebergang',
      question: `${a} + ${b} = ? Zeige das Ergebnis auf dem Zahlenstrahl!`,
      answerType: 'number', exerciseType: 'drag-onto-numberline',
      correctAnswer: answer,
      numberlineConfig: { min: 0, max: 100, step: 10, targets: [answer] },
      hint: `Starte bei ${a} und mache ${b} Schritte. Du überquerst dabei einen Zehner!`,
      explanation: `${a} + ${b} = ${answer}. Du gehst über die ${Math.floor(answer / 10) * 10}.`,
      difficulty, category: 'Repräsentational', estimatedSeconds: 25,
      visualConfig: { type: 'numberline' as const, props: { min: 0, max: 100 } },
    };
  },
};
