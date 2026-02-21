import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-muster-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-muster-und-strukturen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple +1 or +2 number patterns (number-input)
      const step = randInt(1, 2);
      const start = randInt(1, 5);
      const sequence = Array.from({ length: 4 }, (_, i) => start + i * step);
      const answer = start + 4 * step;

      return {
        id: genId(),
        topicId: 'k1-muster-und-strukturen',
        question: `Setze das Muster fort: ${sequence.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + step].filter(d => d !== answer && d > 0),
        hint: `Schau dir den Abstand zwischen den Zahlen an. Immer +${step}.`,
        explanation: `Das Muster ist +${step}. Die nächste Zahl nach ${sequence[3]} ist ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Mix of number patterns (+3, +5) and color/shape patterns (multiple-choice)
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Number pattern with bigger steps
        const step = [3, 5][randInt(0, 1)];
        const start = randInt(1, 5);
        const sequence = Array.from({ length: 4 }, (_, i) => start + i * step);
        const answer = start + 4 * step;

        return {
          id: genId(),
          topicId: 'k1-muster-und-strukturen',
          question: `Setze das Muster fort: ${sequence.join(', ')}, ___`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: answer,
          distractors: [answer + 1, answer - 1, answer + step].filter(d => d !== answer && d > 0),
          hint: `Der Abstand zwischen den Zahlen ist immer gleich. Zähle nach!`,
          explanation: `Das Muster ist +${step}. Nach ${sequence[3]} kommt ${answer}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 20,
        };
      }

      // Color/shape pattern (multiple-choice)
      const patterns: Array<{ seq: string[]; answer: string; wrong: string[] }> = [
        { seq: ['rot', 'blau', 'rot', 'blau', 'rot'], answer: 'blau', wrong: ['rot', 'grün', 'gelb'] },
        { seq: ['Kreis', 'Quadrat', 'Kreis', 'Quadrat', 'Kreis'], answer: 'Quadrat', wrong: ['Kreis', 'Dreieck', 'Stern'] },
        { seq: ['groß', 'klein', 'groß', 'klein'], answer: 'groß', wrong: ['klein', 'mittel', 'winzig'] },
        { seq: ['A', 'B', 'A', 'B', 'A'], answer: 'B', wrong: ['A', 'C', 'D'] },
      ];
      const p = patterns[randInt(0, patterns.length - 1)];

      return {
        id: genId(),
        topicId: 'k1-muster-und-strukturen',
        question: `Was kommt als Nächstes? ${p.seq.join(', ')}, ___`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: p.answer,
        distractors: p.wrong,
        hint: 'Schau dir an, welche Elemente sich abwechseln.',
        explanation: `Das Muster wechselt sich immer ab. Nach ${p.seq[p.seq.length - 1]} kommt ${p.answer}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: alternating / two-rule patterns
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Alternating pattern: +1, +2, +1, +2, ...
      const start = randInt(1, 5);
      // Sequence: start, start+1, start+3, start+4, start+6, ...
      const seq = [start, start + 1, start + 3, start + 4, start + 6];
      const answer = start + 7; // next is +1

      return {
        id: genId(),
        topicId: 'k1-muster-und-strukturen',
        question: `Setze das Muster fort: ${seq.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 1, answer - 1, answer + 2].filter(d => d !== answer && d > 0),
        hint: 'Die Abstände sind nicht immer gleich. Schau genau hin: mal +1, mal +2.',
        explanation: `Die Abstände wechseln sich ab: +1, +2, +1, +2, +1. Die nächste Zahl ist ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 1) {
      // Doubling pattern
      const start = randInt(1, 3);
      const seq = [start, start * 2, start * 4, start * 8];
      const answer = start * 16;

      return {
        id: genId(),
        topicId: 'k1-muster-und-strukturen',
        question: `Setze das Muster fort: ${seq.join(', ')}, ___`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        distractors: [answer + 2, answer - 2, seq[3] + seq[2]].filter(d => d !== answer && d > 0),
        hint: 'Jede Zahl wird verdoppelt. Was ist das Doppelte der letzten Zahl?',
        explanation: `Jede Zahl ist doppelt so groß wie die vorherige. ${seq[3]} × 2 = ${answer}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // Triple pattern: A, B, C, A, B, C, ... (multiple-choice)
    const triplePatterns: Array<{ seq: string[]; answer: string; wrong: string[] }> = [
      { seq: ['rot', 'grün', 'blau', 'rot', 'grün', 'blau', 'rot'], answer: 'grün', wrong: ['rot', 'blau', 'gelb'] },
      { seq: ['Stern', 'Kreis', 'Dreieck', 'Stern', 'Kreis', 'Dreieck', 'Stern'], answer: 'Kreis', wrong: ['Stern', 'Dreieck', 'Quadrat'] },
    ];
    const tp = triplePatterns[randInt(0, triplePatterns.length - 1)];

    return {
      id: genId(),
      topicId: 'k1-muster-und-strukturen',
      question: `Was kommt als Nächstes? ${tp.seq.join(', ')}, ___`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: tp.answer,
      distractors: tp.wrong,
      hint: 'Das Muster wiederholt sich alle drei Elemente.',
      explanation: `Das Muster ist ein Dreier-Rhythmus. Nach ${tp.seq[tp.seq.length - 1]} kommt ${tp.answer}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 25,
    };
  },
};
