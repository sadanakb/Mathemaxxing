import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-tausch-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-tausch-umkehraufgaben',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Tauschaufgabe: "Wenn 3+5=8, dann ist 5+3=?" (number-input)
      const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
      const a = randInt(1, max);
      const b = randInt(1, Math.min(max, 10 - a));
      const sum = a + b;

      return {
        id: genId(),
        topicId: 'k1-tausch-umkehraufgaben',
        question: `Wenn ${a} + ${b} = ${sum}, wie viel ist dann ${b} + ${a}?`,
        questionLatex: `${a} + ${b} = ${sum} \\Rightarrow ${b} + ${a} = ?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: sum,
        distractors: [sum - 1, sum + 1, a, b].filter(d => d !== sum && d >= 0 && d <= 20),
        hint: 'Beim Plusrechnen kannst du die Zahlen tauschen. Das Ergebnis bleibt gleich!',
        explanation: `${b} + ${a} = ${sum}. Beim Tauschen ändert sich das Ergebnis nicht: ${a} + ${b} = ${b} + ${a}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 12,
      };
    }

    if (variant === 1) {
      // Ergänzungsaufgabe: "4 + ___ = 9" (number-input)
      const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;
      const a = randInt(1, max);
      const sum = randInt(a + 1, Math.min(a + max, 10));
      const answer = sum - a;

      return {
        id: genId(),
        topicId: 'k1-tausch-umkehraufgaben',
        question: `Ergänze: ${a} + ___ = ${sum}`,
        questionLatex: `${a} + \\square = ${sum}`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer - 1, answer + 1, a].filter(d => d !== answer && d >= 0 && d <= 10),
        hint: `Überlege: Was musst du zu ${a} addieren, um ${sum} zu bekommen? Rechne ${sum} - ${a}.`,
        explanation: `${a} + ${answer} = ${sum}. Die Umkehraufgabe ist: ${sum} - ${a} = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    // true-false: "3+5 = 5+3?" (wahr)
    const a = randInt(1, difficulty === 1 ? 5 : 9);
    const b = randInt(1, Math.min(9, 10 - a));
    // Sometimes show a false claim for variety
    const showCorrect = randInt(0, 2) !== 0; // 2/3 chance true
    const sum = a + b;
    const claimedResult = showCorrect ? sum : sum + (randInt(0, 1) === 0 ? 1 : -1);

    return {
      id: genId(),
      topicId: 'k1-tausch-umkehraufgaben',
      question: `Stimmt das? ${a} + ${b} = ${b} + ${a} = ${claimedResult}`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: showCorrect ? 'wahr' : 'falsch',
      hint: 'Beim Tauschen bleibt das Ergebnis gleich. Prüfe, ob die Zahl stimmt!',
      explanation: showCorrect
        ? `Ja! ${a} + ${b} = ${b} + ${a} = ${sum}. Die Tauschaufgabe stimmt.`
        : `Nein! ${a} + ${b} = ${b} + ${a} = ${sum}, nicht ${claimedResult}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 12,
    };
  },
};
