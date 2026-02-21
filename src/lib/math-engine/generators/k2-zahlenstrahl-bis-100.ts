import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-zstrahl-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-zahlenstrahl-bis-100',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Place a multiple of 10 on the number line
      const target = randInt(1, 9) * 10;
      return {
        id: genId(),
        topicId: 'k2-zahlenstrahl-bis-100',
        question: `Markiere die ${target} auf dem Zahlenstrahl.`,
        answerType: 'number',
        exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 100, step: 10, targets: [target] },
        visualConfig: { type: 'numberline', props: { min: 0, max: 100, step: 10, highlights: [target] } },
        hint: `Zähle die Zehnerstriche: 10, 20, 30, ... Wo liegt ${target}?`,
        explanation: `Die ${target} liegt beim ${target / 10}. Zehnerstrich auf dem Zahlenstrahl.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Place a non-round number (step 5)
      const target = randInt(1, 19) * 5;
      return {
        id: genId(),
        topicId: 'k2-zahlenstrahl-bis-100',
        question: `Markiere die ${target} auf dem Zahlenstrahl.`,
        answerType: 'number',
        exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 100, step: 5, targets: [target] },
        visualConfig: { type: 'numberline', props: { min: 0, max: 100, step: 10, highlights: [target] } },
        hint: `Zwischen den Zehnern liegt immer genau eine 5er-Markierung. Wo passt ${target}?`,
        explanation: `Die ${target} liegt zwischen ${Math.floor(target / 10) * 10} und ${Math.ceil(target / 10) * 10} auf dem Zahlenstrahl.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: Read a number from a position on the number line
    const target = randInt(1, 99);
    const lower = Math.floor(target / 10) * 10;
    const upper = lower + 10;
    const distractors = [target + 1, target - 1, target + 10, target - 10]
      .filter(d => d >= 0 && d <= 100 && d !== target)
      .slice(0, 3);

    return {
      id: genId(),
      topicId: 'k2-zahlenstrahl-bis-100',
      question: `Welche Zahl liegt bei dem Pfeil auf dem Zahlenstrahl? (zwischen ${lower} und ${upper})`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: target,
      distractors,
      numberlineConfig: { min: 0, max: 100, step: 1, targets: [target] },
      visualConfig: { type: 'numberline', props: { min: 0, max: 100, step: 10, highlights: [target] } },
      hint: `Der Pfeil zeigt auf eine Stelle zwischen ${lower} und ${upper}. Zähle genau nach.`,
      explanation: `Der Pfeil zeigt auf die ${target}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 25,
    };
  },
};
