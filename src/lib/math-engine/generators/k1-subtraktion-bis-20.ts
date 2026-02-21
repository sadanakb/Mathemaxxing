import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-sub20-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-subtraktion-bis-20',
  generate(difficulty = 1): Exercise {
    let a: number, b: number;

    switch (difficulty) {
      case 1:
        a = randInt(2, 10);
        b = randInt(1, a);
        break;
      case 2:
        a = randInt(6, 15);
        b = randInt(1, a);
        break;
      default:
        // Difficulty 3: up to 20, sometimes with Zehnerübergang
        a = randInt(11, 20);
        b = randInt(1, a);
        break;
    }

    const answer = a - b;

    // Generate plausible distractors: ±1, ±2 from correct answer
    const distractors = [answer - 2, answer - 1, answer + 1, answer + 2]
      .filter(d => d >= 0 && d <= 20 && d !== answer);

    // Randomly pick exercise type: number-input or multiple-choice
    const useMultipleChoice = randInt(0, 1) === 1;

    if (useMultipleChoice) {
      const selectedDistractors = distractors.slice(0, 3);
      return {
        id: genId(),
        topicId: 'k1-subtraktion-bis-20',
        question: `Wie viel ist ${a} − ${b}?`,
        questionLatex: `${a} - ${b} = ?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: selectedDistractors,
        hint: `Zähle von ${a} rückwärts ${b} Schritte.`,
        explanation: `${a} − ${b} = ${answer}. Wenn du von ${a} genau ${b} abziehst, landest du bei ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 12 : difficulty === 2 ? 15 : 20,
      };
    }

    return {
      id: genId(),
      topicId: 'k1-subtraktion-bis-20',
      question: `Wie viel ist ${a} − ${b}?`,
      questionLatex: `${a} - ${b} = ?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      distractors: distractors.slice(0, 3),
      hint: `Zähle von ${a} rückwärts ${b} Schritte.`,
      explanation: `${a} − ${b} = ${answer}. Wenn du von ${a} genau ${b} abziehst, landest du bei ${answer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20,
    };
  },
};
