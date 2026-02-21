import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const primesUpTo50 = Array.from({ length: 49 }, (_, i) => i + 2).filter(isPrime);
// [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]

export const template: ExerciseTemplate = {
  topicId: 'k5-primzahlen-teilbarkeit',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // True/false: is this number prime? (small numbers 2-19)
      const candidates = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      const num = candidates[randInt(0, candidates.length - 1)];
      const prime = isPrime(num);
      return {
        id: genId('k5-prim'),
        topicId: 'k5-primzahlen-teilbarkeit',
        question: `Ist ${num} eine Primzahl?`,
        answerType: 'true-false',
        correctAnswer: prime ? 'true' : 'false',
        hint: 'Eine Primzahl ist nur durch 1 und sich selbst teilbar.',
        explanation: prime
          ? `Ja, ${num} ist eine Primzahl.`
          : `Nein, ${num} ist keine Primzahl (teilbar durch ${primesUpTo50.find(p => num % p === 0 && p !== num) ?? '?'}).`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else if (difficulty === 2) {
      // Multiple choice: all primes up to 20
      const numbersUpTo20 = Array.from({ length: 19 }, (_, i) => i + 2);
      const primes20 = numbersUpTo20.filter(isPrime);
      const nonPrimes20 = numbersUpTo20.filter(n => !isPrime(n));
      return {
        id: genId('k5-prim'),
        topicId: 'k5-primzahlen-teilbarkeit',
        question: 'Welche Zahl bis 20 ist eine Primzahl?',
        answerType: 'multiple-choice',
        correctAnswer: '13',
        distractors: ['9', '15', '21'],
        visualConfig: {
          type: 'set-diagram',
          props: {
            sets: [
              { label: 'Primzahlen', elements: primes20 },
              { label: 'Nicht-Primzahlen', elements: nonPrimes20 },
            ],
            intersection: [],
          },
        },
        hint: 'Prüfe: Ist die Zahl nur durch 1 und sich selbst teilbar?',
        explanation: '13 ist eine Primzahl. 9 = 3×3, 15 = 3×5, 21 = 3×7.',
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    } else {
      // Divisibility: is X divisible by Y?
      const divisors = [2, 3, 5, 7];
      const d = divisors[randInt(0, divisors.length - 1)];
      const isDivisible = randInt(0, 1) === 0;
      const base = randInt(10, 30) * d;
      const num = isDivisible ? base : base + randInt(1, d - 1);
      return {
        id: genId('k5-prim'),
        topicId: 'k5-primzahlen-teilbarkeit',
        question: `Ist ${num} durch ${d} teilbar?`,
        answerType: 'true-false',
        correctAnswer: (num % d === 0) ? 'true' : 'false',
        hint: `${d}er-Regel: ${d === 2 ? 'Endet auf 0, 2, 4, 6 oder 8?' : d === 3 ? 'Quersumme durch 3 teilbar?' : d === 5 ? 'Endet auf 0 oder 5?' : 'Durch 7 teilen.'}`,
        explanation: `${num} ÷ ${d} = ${Math.floor(num / d)} Rest ${num % d}. ${num % d === 0 ? 'Ja, teilbar.' : 'Nein, nicht teilbar.'}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }
  },
};
