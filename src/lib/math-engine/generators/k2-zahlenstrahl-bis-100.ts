import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-zstrahl-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-zahlenstrahl-bis-100',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    if (variant === 0) {
      // drag-onto-numberline (existing)
      const target = difficulty === 1 ? randInt(1, 9) * 10 : randInt(1, 19) * 5;
      const step = difficulty === 1 ? 10 : 5;
      return {
        id: genId(), topicId: 'k2-zahlenstrahl-bis-100',
        question: `Markiere die ${target} auf dem Zahlenstrahl.`,
        answerType: 'number', exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 100, step, targets: [target] },
        hint: difficulty === 1
          ? `Zähle die Zehnerstriche: 10, 20, ... Wo liegt ${target}?`
          : `Zwischen Zehnern liegt eine 5er-Markierung. Wo passt ${target}?`,
        explanation: `${target} liegt beim ${difficulty === 1 ? target / 10 + '. Zehnerstrich' : 'entsprechenden Strich'} auf dem Zahlenstrahl.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 15,
        visualConfig: { type: 'numberline' as const, props: { min: 0, max: 100, step: 10 } },
      };
    }

    if (variant === 1) {
      // number-input: Welche Zahl liegt am Pfeil?
      const target = randInt(1, 99);
      const lower = Math.floor(target / 10) * 10;
      const upper = lower + 10;
      return {
        id: genId(), topicId: 'k2-zahlenstrahl-bis-100',
        question: `Welche Zahl liegt bei dem Pfeil? (zwischen ${lower} und ${upper})`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: target,
        distractors: [target + 1, target - 1, target + 10].filter(d => d >= 0 && d <= 100 && d !== target).slice(0, 3),
        numberlineConfig: { min: 0, max: 100, step: 1, targets: [target] },
        hint: `Zähle von ${lower} genau ${target - lower} Schritte.`,
        explanation: `Der Pfeil zeigt auf ${target}.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 20,
      };
    }

    if (variant === 2) {
      // true-false: "Liegt X zwischen Y und Z?"
      const target = randInt(11, 89);
      const lower = Math.floor(target / 10) * 10;
      const upper = lower + 10;
      const showCorrect = randInt(0, 1) === 0;
      const wrongTarget = target + (randInt(0, 1) === 0 ? 10 : -10);
      return {
        id: genId(), topicId: 'k2-zahlenstrahl-bis-100',
        question: `Stimmt das? ${showCorrect ? target : wrongTarget} liegt zwischen ${lower} und ${upper}.`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: showCorrect ? 'wahr' : 'falsch',
        hint: `Liegt die Zahl zwischen ${lower} und ${upper}? Sie muss größer als ${lower} und kleiner als ${upper} sein.`,
        explanation: showCorrect
          ? `Ja, ${target} liegt zwischen ${lower} und ${upper}.`
          : `Nein, ${wrongTarget} liegt nicht zwischen ${lower} und ${upper}.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 12,
      };
    }

    // variant === 3: multiple-choice — "Welche Zahl liegt zwischen X und Y?"
    const lower = randInt(1, 9) * 10;
    const upper = lower + 10;
    const correct = lower + randInt(1, 9);
    const wrong1 = lower - randInt(1, 9);
    const wrong2 = upper + randInt(1, 9);
    const wrong3 = lower; // edge case
    return {
      id: genId(), topicId: 'k2-zahlenstrahl-bis-100',
      question: `Welche Zahl liegt zwischen ${lower} und ${upper}?`,
      answerType: 'multiple-choice', exerciseType: 'multiple-choice',
      correctAnswer: correct,
      distractors: [wrong1, wrong2, wrong3].filter(d => d !== correct && d >= 0 && d <= 100).slice(0, 3),
      hint: `Gesucht ist eine Zahl zwischen ${lower} und ${upper} (nicht ${lower} oder ${upper} selbst).`,
      explanation: `${correct} liegt zwischen ${lower} und ${upper}.`,
      difficulty, category: 'Repräsentational', estimatedSeconds: 15,
    };
  },
};
