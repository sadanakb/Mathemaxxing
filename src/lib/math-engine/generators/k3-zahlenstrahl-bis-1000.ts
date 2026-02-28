import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k3-zstr-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k3-zahlenstrahl-bis-1000',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    if (variant === 0) {
      // drag-onto-numberline (original approach)
      const target = difficulty === 1
        ? randInt(1, 9) * 100
        : difficulty === 2
        ? randInt(1, 8) * 100 + randInt(1, 9) * 10
        : randInt(50, 950);
      return {
        id: genId(), topicId: 'k3-zahlenstrahl-bis-1000',
        question: `Zeige die Zahl ${target} auf dem Zahlenstrahl.`,
        answerType: 'number', exerciseType: 'drag-onto-numberline',
        correctAnswer: target,
        numberlineConfig: { min: 0, max: 1000, step: 100, targets: [target] },
        hint: difficulty === 1
          ? `Zähle die Hunderterschritte: 0, 100, 200, ...`
          : `${target} liegt zwischen ${Math.floor(target / 100) * 100} und ${Math.ceil(target / 100) * 100}.`,
        explanation: `${target} liegt ${target >= 500 ? 'in der zweiten Hälfte' : 'in der ersten Hälfte'} des Zahlenstrahls.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 20,
        visualConfig: { type: 'numberline' as const, props: { min: 0, max: 1000, step: 100 } },
      };
    }

    if (variant === 1) {
      // true-false: Liegt Zahl X zwischen zwei Hundertern?
      const target = randInt(101, 899);
      const lower = Math.floor(target / 100) * 100;
      const upper = lower + 100;
      const showCorrect = randInt(0, 1) === 0;
      const wrongTarget = target + (randInt(0, 1) === 0 ? 100 : -100);
      return {
        id: genId(), topicId: 'k3-zahlenstrahl-bis-1000',
        question: `Stimmt das? ${showCorrect ? target : wrongTarget} liegt zwischen ${lower} und ${upper}.`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: showCorrect ? 'wahr' : 'falsch',
        hint: `Eine Zahl liegt zwischen ${lower} und ${upper}, wenn sie größer als ${lower} und kleiner als ${upper} ist.`,
        explanation: showCorrect
          ? `Ja, ${target} liegt zwischen ${lower} und ${upper}.`
          : `Nein, ${wrongTarget} liegt nicht zwischen ${lower} und ${upper}.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 15,
      };
    }

    if (variant === 2) {
      // estimation: Welche Zahl liegt ungefähr bei diesem Strich?
      const target = randInt(50, 950);
      const rounded = Math.round(target / 100) * 100;
      const tolerance = 80;
      return {
        id: genId(), topicId: 'k3-zahlenstrahl-bis-1000',
        question: `Schätze: Welche Zahl liegt ungefähr am markierten Strich? (ca. ${rounded})`,
        answerType: 'number', exerciseType: 'estimation',
        correctAnswer: target,
        tolerance,
        hint: `Schaue, zwischen welchen Hunderten der Strich liegt. Schätze grob.`,
        explanation: `Der Strich zeigt auf ${target} (± ${tolerance} wird als richtig gewertet).`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 20,
      };
    }

    // variant === 3: multiple-choice — Welche Zahl liegt zwischen X und Y?
    const lower = randInt(1, 9) * 100;
    const upper = lower + 100;
    const correct = lower + randInt(10, 90);
    return {
      id: genId(), topicId: 'k3-zahlenstrahl-bis-1000',
      question: `Welche Zahl liegt zwischen ${lower} und ${upper}?`,
      answerType: 'multiple-choice', exerciseType: 'multiple-choice',
      correctAnswer: correct,
      distractors: [lower - 50, upper + 50, lower].filter(d => d !== correct && d >= 0 && d <= 1000).slice(0, 3),
      hint: `Gesucht: eine Zahl zwischen ${lower} und ${upper}.`,
      explanation: `${correct} liegt zwischen ${lower} und ${upper}.`,
      difficulty, category: 'Abstrakt', estimatedSeconds: 15,
    };
  },
};
