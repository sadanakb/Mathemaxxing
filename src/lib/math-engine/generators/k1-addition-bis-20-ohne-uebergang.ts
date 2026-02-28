import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-add20o-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-addition-bis-20-ohne-uebergang',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    // No crossing the ten: ones digit of a + b < 10
    let a: number, b: number;
    switch (difficulty) {
      case 1: a = randInt(10, 14); b = randInt(1, Math.max(1, Math.min(5, 9 - (a % 10)))); break;
      case 2: a = randInt(10, 16); b = randInt(1, Math.max(1, Math.min(7, 9 - (a % 10)))); break;
      default: a = randInt(10, 18); b = randInt(1, Math.max(1, Math.min(9, 9 - (a % 10)))); break;
    }
    const answer = a + b;
    const distractors = [answer - 2, answer - 1, answer + 1, answer + 10]
      .filter(d => d > 0 && d <= 20 && d !== answer).slice(0, 3);

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k1-addition-bis-20-ohne-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint: `Die Zehner bleiben gleich. Rechne nur die Einer: ${a % 10} + ${b} = ${(a % 10) + b}.`,
        explanation: `${a} + ${b} = ${answer}. Der Zehner bleibt ${Math.floor(a / 10) * 10}, die Einer: ${(a % 10) + b}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      return {
        id: genId(), topicId: 'k1-addition-bis-20-ohne-uebergang',
        question: `Wie viel ist ${a} + ${b}?`,
        questionLatex: `${a} + ${b} = ?`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint: `Die Zehner bleiben gleich. Rechne nur die Einer.`,
        explanation: `${a} + ${b} = ${answer}`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 12,
      };
    }

    if (variant === 2) {
      // true-false: "Stimmt das? a + b = X?"
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 1 : -1);
      return {
        id: genId(), topicId: 'k1-addition-bis-20-ohne-uebergang',
        question: `Stimmt das? ${a} + ${b} = ${shownAnswer}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint: `Rechne: Die Zehner bleiben, nur Einer: ${a % 10} + ${b}.`,
        explanation: (shownAnswer === answer)
          ? `Ja, ${a} + ${b} = ${answer} stimmt!`
          : `Nein, ${a} + ${b} = ${answer}, nicht ${shownAnswer}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 12,
      };
    }

    // variant === 3: calculation-pyramid (3 Basisfelder)
    // Base: [x, b, y] where x+b and b+y fill middle, then sum at top
    const baseL = randInt(1, difficulty === 1 ? 4 : difficulty === 2 ? 6 : 9);
    const baseM = randInt(1, difficulty === 1 ? 4 : difficulty === 2 ? 5 : 8);
    const baseR = randInt(1, difficulty === 1 ? 3 : difficulty === 2 ? 4 : 7);
    const pyramidAnswer = baseL + baseM + baseR;
    return {
      id: genId(), topicId: 'k1-addition-bis-20-ohne-uebergang',
      question: `Zahlenpyramide: Was steht ganz oben? Basis: ${baseL}, ${baseM}, ${baseR}`,
      answerType: 'number', exerciseType: 'calculation-pyramid',
      correctAnswer: pyramidAnswer,
      pyramidBase: [baseL, baseM, baseR],
      hint: `Addiere benachbarte Zahlen. Erst ${baseL}+${baseM}=${baseL + baseM} und ${baseM}+${baseR}=${baseM + baseR}, dann diese beiden addieren.`,
      explanation: `${baseL}+${baseM}=${baseL + baseM}, ${baseM}+${baseR}=${baseM + baseR}, ${baseL + baseM}+${baseM + baseR}=${pyramidAnswer}.`,
      difficulty, category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 20 : 25,
    };
  },
};
