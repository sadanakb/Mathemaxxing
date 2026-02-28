import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-tausch-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-tausch-umkehraufgaben',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const max = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;

    if (variant === 0) {
      // number-input: Tauschaufgabe "Wenn a+b=sum, dann b+a=?"
      const a = randInt(1, max);
      const b = randInt(1, Math.min(max, 10 - a));
      const sum = a + b;
      return {
        id: genId(), topicId: 'k1-tausch-umkehraufgaben',
        question: `Wenn ${a} + ${b} = ${sum}, wie viel ist dann ${b} + ${a}?`,
        questionLatex: `${b} + ${a} = ?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: sum,
        distractors: [sum - 1, sum + 1, a, b].filter(d => d !== sum && d >= 0 && d <= 20),
        hint: 'Beim Plusrechnen kannst du die Zahlen tauschen. Das Ergebnis bleibt gleich!',
        explanation: `${b} + ${a} = ${sum}. Tauschen ändert das Ergebnis nicht: ${a} + ${b} = ${b} + ${a}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 12,
      };
    }

    if (variant === 1) {
      // true-false: "a + b = b + a = sum?"
      const a = randInt(1, Math.min(max, 9));
      const b = randInt(1, Math.min(max, 10 - a));
      const sum = a + b;
      const showCorrect = randInt(0, 2) !== 0;
      const claimedResult = showCorrect ? sum : sum + (randInt(0, 1) === 0 ? 1 : -1);
      return {
        id: genId(), topicId: 'k1-tausch-umkehraufgaben',
        question: `Stimmt das? ${a} + ${b} = ${b} + ${a} = ${claimedResult}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (claimedResult === sum) ? 'wahr' : 'falsch',
        hint: 'Beim Tauschen bleibt das Ergebnis gleich. Prüfe, ob die Zahl stimmt!',
        explanation: (claimedResult === sum)
          ? `Ja! ${a} + ${b} = ${b} + ${a} = ${sum}. Die Tauschaufgabe stimmt.`
          : `Nein! ${a} + ${b} = ${b} + ${a} = ${sum}, nicht ${claimedResult}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 12,
      };
    }

    if (variant === 2) {
      // multiple-choice: "Was ist die Tauschaufgabe von a + b = sum?"
      const a = randInt(1, max);
      const b = randInt(1, Math.min(max, 10 - a));
      const sum = a + b;
      const correct = `${b} + ${a} = ${sum}`;
      const d1 = `${a} − ${b} = ${a - b >= 0 ? a - b : 0}`; // Umkehraufgabe (distractor)
      const d2 = `${sum} − ${a} = ${b}`; // Also eine Umkehraufgabe
      const d3 = `${a} + ${sum} = ${a + sum <= 20 ? a + sum : sum + 1}`;
      return {
        id: genId(), topicId: 'k1-tausch-umkehraufgaben',
        question: `Was ist die Tauschaufgabe von ${a} + ${b} = ${sum}?`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: correct,
        distractors: [d1, d2, d3],
        hint: 'Bei der Tauschaufgabe werden die beiden Summanden (die zwei Zahlen vor dem =) vertauscht.',
        explanation: `${a} + ${b} = ${sum} → Tauschaufgabe: ${b} + ${a} = ${sum}. Die Summanden werden getauscht, das Ergebnis bleibt gleich.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 15,
      };
    }

    // variant === 3: drag-sort — ordne die Aufgabe, Tauschaufgabe und Umkehraufgaben
    const a = randInt(2, max);
    const b = randInt(1, Math.min(max - 1, 9 - a + 1));
    const sum = a + b;
    const items = shuffle([
      `${a} + ${b} = ${sum}`,
      `${b} + ${a} = ${sum}`,
      `${sum} − ${a} = ${b}`,
      `${sum} − ${b} = ${a}`,
    ]);
    const sortedOrder = [
      `${a} + ${b} = ${sum}`,
      `${b} + ${a} = ${sum}`,
      `${sum} − ${a} = ${b}`,
      `${sum} − ${b} = ${a}`,
    ];
    return {
      id: genId(), topicId: 'k1-tausch-umkehraufgaben',
      question: `Ordne die Aufgabenfamilie! (Zuerst die Additions-, dann die Subtraktionsaufgaben)`,
      answerType: 'drag-drop', exerciseType: 'drag-sort',
      correctAnswer: sortedOrder.join(', '),
      items,
      hint: 'Die Aufgabenfamilie hat 2 Additionsaufgaben und 2 Subtraktionsaufgaben.',
      explanation: `Aufgabenfamilie: ${sortedOrder.join(' | ')}`,
      difficulty, category: 'Abstrakt', estimatedSeconds: 30,
    };
  },
};
