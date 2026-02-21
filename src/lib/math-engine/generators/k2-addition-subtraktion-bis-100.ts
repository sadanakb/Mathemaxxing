import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k2-addition-subtraktion-bis-100',
  generate(difficulty = 1): Exercise {
    const isAdd = randInt(0, 1) === 0;

    let a: number, b: number, answer: number, question: string, explanation: string;

    if (difficulty === 1) {
      // Multiples of 10
      a = randInt(1, 9) * 10;
      b = randInt(1, (isAdd ? (100 - a) : a) / 10) * 10;
      answer = isAdd ? a + b : a - b;
      question = isAdd ? `${a} + ${b} = ?` : `${a} - ${b} = ?`;
      explanation = isAdd ? `${a} + ${b} = ${answer}` : `${a} - ${b} = ${answer}`;
    } else if (difficulty === 2) {
      a = randInt(10, 80);
      b = isAdd ? randInt(1, 100 - a) : randInt(1, a);
      answer = isAdd ? a + b : a - b;
      question = isAdd ? `${a} + ${b} = ?` : `${a} - ${b} = ?`;
      explanation = isAdd ? `${a} + ${b} = ${answer}` : `${a} - ${b} = ${answer}`;
    } else {
      // Missing addend / subtrahend
      a = randInt(20, 90);
      b = isAdd ? randInt(1, 100 - a) : randInt(1, a);
      answer = isAdd ? a + b : a - b;
      question = isAdd ? `? + ${b} = ${answer}` : `${a} - ? = ${answer}`;
      const correctAnswer = isAdd ? a : b;
      explanation = isAdd ? `${correctAnswer} + ${b} = ${answer}` : `${a} - ${correctAnswer} = ${answer}`;
      return {
        id: genId('k2-addub'),
        topicId: 'k2-addition-subtraktion-bis-100',
        question,
        questionLatex: question,
        answerType: 'number',
        correctAnswer,
        hint: isAdd ? `Was musst du zu ${b} addieren, um ${answer} zu erhalten?` : `Was musst du von ${a} abziehen, um ${answer} zu erhalten?`,
        explanation,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    const distractors = [answer - 1, answer + 1, answer + 10, answer - 10]
      .filter(d => d >= 0 && d <= 100 && d !== answer)
      .slice(0, 3);

    return {
      id: genId('k2-addub'),
      topicId: 'k2-addition-subtraktion-bis-100',
      question,
      questionLatex: question,
      answerType: 'number',
      correctAnswer: answer,
      distractors,
      hint: isAdd ? `Zähle ${b} zu ${a} hinzu.` : `Ziehe ${b} von ${a} ab.`,
      explanation,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: difficulty === 1 ? 20 : 30,
    };
  },
};
