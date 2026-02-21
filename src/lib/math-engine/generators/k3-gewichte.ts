import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k3-gewichte',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // kg to g, whole kilograms
      const kg = randInt(1, 10);
      const g = kg * 1000;
      return {
        id: genId('k3-gew'),
        topicId: 'k3-gewichte',
        question: `${kg} kg = ? g`,
        answerType: 'number',
        correctAnswer: g,
        hint: '1 kg = 1000 g',
        explanation: `${kg} kg × 1000 = ${g} g`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 20,
        visualConfig: {
          type: 'scale' as const,
          props: {
            leftItems: [{ label: `${kg} kg`, weight: kg }],
            rightItems: [{ label: '?', weight: 0 }],
            showWeights: false,
          },
        },
      };
    } else if (difficulty === 2) {
      // g to kg (exact)
      const kg = randInt(1, 10);
      const g = kg * 1000;
      return {
        id: genId('k3-gew'),
        topicId: 'k3-gewichte',
        question: `${g} g = ? kg`,
        answerType: 'number',
        correctAnswer: kg,
        hint: 'Teile die Gramm durch 1000.',
        explanation: `${g} g ÷ 1000 = ${kg} kg`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 25,
      };
    } else {
      // Mixed: kg + g to total g
      const kg = randInt(1, 5);
      const g = randInt(100, 900);
      const total = kg * 1000 + g;
      return {
        id: genId('k3-gew'),
        topicId: 'k3-gewichte',
        question: `${kg} kg und ${g} g – wie viel Gramm sind das insgesamt?`,
        answerType: 'number',
        correctAnswer: total,
        hint: `Rechne: ${kg} × 1000 + ${g}`,
        explanation: `${kg} × 1000 + ${g} = ${total} g`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 35,
      };
    }
  },
};
