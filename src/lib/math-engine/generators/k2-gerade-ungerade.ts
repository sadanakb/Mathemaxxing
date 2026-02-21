import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-gerung-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k2-gerade-ungerade',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // True-false: "Ist X gerade oder ungerade?"
      const n = randInt(1, 50);
      const isEven = n % 2 === 0;

      return {
        id: genId(),
        topicId: 'k2-gerade-ungerade',
        question: `Ist ${n} eine gerade Zahl?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isEven ? 'wahr' : 'falsch',
        hint: `Eine gerade Zahl kann man durch 2 teilen, ohne dass ein Rest bleibt. Kann man ${n} durch 2 teilen?`,
        explanation: isEven
          ? `${n} ist gerade, denn ${n} : 2 = ${n / 2} (kein Rest).`
          : `${n} ist ungerade, denn ${n} : 2 = ${Math.floor(n / 2)} Rest 1.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 10,
      };
    }

    if (difficulty === 2) {
      // Classify: sort numbers into gerade/ungerade
      const numbers: number[] = [];
      while (numbers.length < 6) {
        const n = randInt(1, 99);
        if (!numbers.includes(n)) numbers.push(n);
      }
      const gerade = numbers.filter(n => n % 2 === 0).sort((a, b) => a - b);
      const ungerade = numbers.filter(n => n % 2 !== 0).sort((a, b) => a - b);

      return {
        id: genId(),
        topicId: 'k2-gerade-ungerade',
        question: `Sortiere die Zahlen in "gerade" und "ungerade": ${numbers.join(', ')}`,
        answerType: 'drag-drop',
        exerciseType: 'classify',
        correctAnswer: `gerade: ${gerade.join(', ')} | ungerade: ${ungerade.join(', ')}`,
        categories: {
          'gerade': gerade.map(String),
          'ungerade': ungerade.map(String),
        },
        items: numbers.map(String),
        hint: 'Gerade Zahlen enden auf 0, 2, 4, 6 oder 8. Ungerade auf 1, 3, 5, 7 oder 9.',
        explanation: `Gerade: ${gerade.join(', ')}. Ungerade: ${ungerade.join(', ')}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: MC — "Welche dieser Zahlen sind alle gerade?"
    const makeSet = (allEven: boolean): number[] => {
      const set: number[] = [];
      while (set.length < 3) {
        const n = allEven ? randInt(1, 49) * 2 : randInt(1, 99);
        if (!set.includes(n)) set.push(n);
      }
      if (!allEven) {
        // Make sure at least one is odd
        if (set.every(n => n % 2 === 0)) {
          set[randInt(0, 2)] = randInt(1, 49) * 2 + 1;
        }
      }
      return set;
    };

    const correctSet = makeSet(true);
    const wrong1 = makeSet(false);
    const wrong2 = makeSet(false);
    const wrong3 = makeSet(false);

    const options = [
      correctSet.join(', '),
      wrong1.join(', '),
      wrong2.join(', '),
      wrong3.join(', '),
    ].sort(() => Math.random() - 0.5);

    return {
      id: genId(),
      topicId: 'k2-gerade-ungerade',
      question: 'Welche Gruppe enthält nur gerade Zahlen?',
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: correctSet.join(', '),
      distractors: [wrong1.join(', '), wrong2.join(', '), wrong3.join(', ')],
      options,
      correctOptions: [correctSet.join(', ')],
      hint: 'Prüfe jede Zahl: Endet sie auf 0, 2, 4, 6 oder 8?',
      explanation: `${correctSet.join(', ')} sind alle gerade. Die anderen Gruppen enthalten mindestens eine ungerade Zahl.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  },
};
