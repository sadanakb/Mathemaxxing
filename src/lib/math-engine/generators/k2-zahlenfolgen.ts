import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-folgen-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-zahlenfolgen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple +1 or +2 patterns in range 1-100
      const step = randInt(1, 2);
      const start = randInt(1, 20);
      const sequence = Array.from({ length: 5 }, (_, i) => start + i * step);
      const answer = start + 5 * step;

      const distractors = [answer + 1, answer - 1, answer + step]
        .filter(d => d !== answer && d > 0)
        .slice(0, 3);

      return {
        id: genId(),
        topicId: 'k2-zahlenfolgen',
        question: `Setze fort: ${sequence.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors,
        hint: `Schau dir den Abstand zwischen den Zahlen an. Immer +${step}.`,
        explanation: `Die Regel ist +${step}. Die nächste Zahl nach ${sequence[4]} ist ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // +3 or +5 patterns
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Addition pattern with bigger steps
        const step = [3, 5][randInt(0, 1)];
        const start = randInt(1, 15);
        const sequence = Array.from({ length: 4 }, (_, i) => start + i * step);
        const answer = start + 4 * step;

        const distractors = [answer + 1, answer - 1, answer + step]
          .filter(d => d !== answer && d > 0)
          .slice(0, 3);

        return {
          id: genId(),
          topicId: 'k2-zahlenfolgen',
          question: `Setze fort: ${sequence.join(', ')}, ___`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors,
          hint: `Der Abstand zwischen den Zahlen ist immer gleich. Zähle nach!`,
          explanation: `Die Regel ist +${step}. Nach ${sequence[3]} kommt ${answer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      // MC variant with +3 or +5
      const step = [3, 5][randInt(0, 1)];
      const start = randInt(2, 10);
      const sequence = Array.from({ length: 4 }, (_, i) => start + i * step);
      const answer = start + 4 * step;

      const wrong1 = answer + 1;
      const wrong2 = answer - 1;
      const wrong3 = answer + step;

      const options = [answer, wrong1, wrong2, wrong3]
        .filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .slice(0, 4)
        .sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-zahlenfolgen',
        question: `Setze fort: ${sequence.join(', ')}, ___`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: answer,
        distractors: [wrong1, wrong2, wrong3].filter(d => d !== answer && d > 0),
        options: options.map(String),
        correctOptions: [String(answer)],
        hint: `Der Abstand ist immer +${step}.`,
        explanation: `Die Regel ist +${step}. Nach ${sequence[3]} kommt ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: x2 patterns or descending patterns
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Doubling pattern
      const start = randInt(1, 3);
      const sequence = [start, start * 2, start * 4, start * 8];
      const answer = start * 16;

      return {
        id: genId(),
        topicId: 'k2-zahlenfolgen',
        question: `Setze fort: ${sequence.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 2, answer - 2, sequence[3] + sequence[2]].filter(d => d !== answer && d > 0).slice(0, 3),
        hint: 'Jede Zahl wird verdoppelt. Was ist das Doppelte der letzten Zahl?',
        explanation: `Jede Zahl ist doppelt so groß wie die vorherige. ${sequence[3]} x 2 = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 1) {
      // Descending pattern
      const step = [3, 4, 5][randInt(0, 2)];
      const start = randInt(50, 90);
      const sequence = Array.from({ length: 4 }, (_, i) => start - i * step);
      const answer = start - 4 * step;

      if (answer < 0) {
        // Fallback to ascending
        const ascStart = randInt(2, 10);
        const ascStep = randInt(4, 7);
        const ascSeq = Array.from({ length: 4 }, (_, i) => ascStart + i * ascStep);
        const ascAnswer = ascStart + 4 * ascStep;

        return {
          id: genId(),
          topicId: 'k2-zahlenfolgen',
          question: `Setze fort: ${ascSeq.join(', ')}, ___`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: ascAnswer,
          distractors: [ascAnswer + 1, ascAnswer - 1, ascAnswer + ascStep].filter(d => d !== ascAnswer && d > 0).slice(0, 3),
          hint: `Der Abstand ist immer +${ascStep}.`,
          explanation: `Die Regel ist +${ascStep}. Nach ${ascSeq[3]} kommt ${ascAnswer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      }

      return {
        id: genId(),
        topicId: 'k2-zahlenfolgen',
        question: `Setze fort: ${sequence.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + step].filter(d => d !== answer && d >= 0).slice(0, 3),
        hint: `Die Zahlen werden immer kleiner. Was ist der Abstand?`,
        explanation: `Die Regel ist -${step}. Nach ${sequence[3]} kommt ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // Alternating +/- pattern
    const start = randInt(10, 30);
    const addStep = randInt(3, 6);
    const subStep = randInt(1, 2);
    // start, start+addStep, start+addStep-subStep, start+2*addStep-subStep, ...
    const s0 = start;
    const s1 = s0 + addStep;
    const s2 = s1 - subStep;
    const s3 = s2 + addStep;
    const s4 = s3 - subStep;
    const answer = s4 + addStep;

    return {
      id: genId(),
      topicId: 'k2-zahlenfolgen',
      question: `Setze fort: ${s0}, ${s1}, ${s2}, ${s3}, ${s4}, ___`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      distractors: [answer + 1, answer - 1, s4 - subStep].filter(d => d !== answer && d > 0).slice(0, 3),
      hint: `Die Abstände wechseln sich ab: +${addStep}, -${subStep}, +${addStep}, -${subStep}, ...`,
      explanation: `Das Muster ist abwechselnd +${addStep} und -${subStep}. Nach ${s4} kommt ${s4} + ${addStep} = ${answer}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
    };
  },
};
