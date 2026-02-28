import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

function getMultiples(n: number, count: number): number[] {
  return Array.from({ length: count }, (_, i) => n * (i + 1));
}

function getDivisors(n: number): number[] {
  const divs: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

// ─── Exercise variants ──────────────────────────────────────

function generateVielfache(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty === 1) {
    // "Ist X ein Vielfaches von Y?" or "Nenne die ersten 5 Vielfachen von X"
    const variant = randInt(0, 1);
    if (variant === 0) {
      const base = randInt(2, 5);
      const multiples = getMultiples(base, 5);
      return {
        id: genId('k3-vt'),
        topicId: 'k3-vielfache-teiler',
        question: `Nenne die ersten 5 Vielfachen von ${base}. Schreibe sie mit Komma getrennt.`,
        answerType: 'text',
        correctAnswer: multiples.join(', '),
        hint: `Zähle: ${base}, ${base * 2}, ${base * 3}, ...`,
        explanation: `Die ersten 5 Vielfachen von ${base} sind: ${multiples.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else {
      const base = randInt(2, 5);
      const isMultiple = randInt(0, 1) === 0;
      const number = isMultiple ? base * randInt(2, 10) : base * randInt(2, 10) + randInt(1, base - 1);
      const correct = number % base === 0;
      return {
        id: genId('k3-vt'),
        topicId: 'k3-vielfache-teiler',
        question: `Ist ${number} ein Vielfaches von ${base}?`,
        answerType: 'true-false',
        correctAnswer: correct ? 'Ja' : 'Nein',
        distractors: correct ? ['Nein'] : ['Ja'],
        hint: `Prüfe: Kann man ${number} ohne Rest durch ${base} teilen?`,
        explanation: correct
          ? `Ja, denn ${number} ÷ ${base} = ${number / base} (ohne Rest).`
          : `Nein, denn ${number} ÷ ${base} = ${Math.floor(number / base)} Rest ${number % base}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }
  } else if (difficulty === 2) {
    // "Finde alle Teiler von X" (X <= 36)
    const number = pick([12, 15, 16, 18, 20, 24, 28, 30, 36]);
    const divisors = getDivisors(number);
    return {
      id: genId('k3-vt'),
      topicId: 'k3-vielfache-teiler',
      question: `Finde alle Teiler von ${number}. Schreibe sie mit Komma getrennt.`,
      answerType: 'text',
      correctAnswer: divisors.join(', '),
      hint: `Beginne bei 1 und prüfe jede Zahl: Geht ${number} ÷ Zahl ohne Rest auf?`,
      explanation: `Die Teiler von ${number} sind: ${divisors.join(', ')}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  } else {
    // D3: variant 0 = true-false (Teilbarkeitsregeln), 1 = classify (Vielfache), 2 = true-false (ist X Vielfaches von Y)
    const variant = randInt(0, 2);

    if (variant === 1) {
      // classify: sort numbers into Vielfache vs. Nicht-Vielfache of a base
      const base = pick([3, 4, 5, 6]);
      const multiples: number[] = [];
      const nonMultiples: number[] = [];
      let attempts = 0;
      while ((multiples.length < 3 || nonMultiples.length < 3) && attempts < 50) {
        attempts++;
        const candidate = randInt(2, 60);
        if (candidate % base === 0 && multiples.length < 3 && !multiples.includes(candidate)) {
          multiples.push(candidate);
        } else if (candidate % base !== 0 && nonMultiples.length < 3 && !nonMultiples.includes(candidate)) {
          nonMultiples.push(candidate);
        }
      }
      const allItems = [...multiples, ...nonMultiples].sort((a, b) => a - b).map(String);
      return {
        id: genId('k3-vt'),
        topicId: 'k3-vielfache-teiler',
        question: `Sortiere die Zahlen: Welche sind Vielfache von ${base}? ${allItems.join(', ')}`,
        answerType: 'drag-drop',
        exerciseType: 'classify',
        correctAnswer: JSON.stringify({
          [`Vielfache von ${base}`]: multiples.map(String),
          [`Keine Vielfachen von ${base}`]: nonMultiples.map(String),
        }),
        classifyItems: allItems,
        classifyCategories: [`Vielfache von ${base}`, `Keine Vielfachen von ${base}`],
        classifyCorrect: {
          [`Vielfache von ${base}`]: multiples.map(String),
          [`Keine Vielfachen von ${base}`]: nonMultiples.map(String),
        },
        hint: `Prüfe jede Zahl: Lässt sie sich ohne Rest durch ${base} teilen?`,
        explanation: `Vielfache von ${base}: ${multiples.join(', ')}. Keine Vielfachen: ${nonMultiples.join(', ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    if (variant === 2) {
      // true-false: is 12 a Vielfaches of 4? (simple specific true-false)
      const base2 = pick([3, 4, 5, 6, 7]);
      const isViel = randInt(0, 1) === 0;
      const number2 = isViel
        ? base2 * randInt(2, 10)
        : base2 * randInt(2, 10) + randInt(1, base2 - 1);
      const correct2 = number2 % base2 === 0;
      return {
        id: genId('k3-vt'),
        topicId: 'k3-vielfache-teiler',
        question: `Ist ${number2} ein Vielfaches von ${base2}?`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: correct2 ? 'Ja' : 'Nein',
        distractors: correct2 ? ['Nein'] : ['Ja'],
        hint: `Prüfe: ${number2} ÷ ${base2} — geht das ohne Rest auf?`,
        explanation: correct2
          ? `Ja! ${number2} ÷ ${base2} = ${number2 / base2} (kein Rest).`
          : `Nein. ${number2} ÷ ${base2} = ${Math.floor(number2 / base2)} Rest ${number2 % base2}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // variant === 0: original Teilbarkeitsregeln true-false
    const rules: { divisor: number; hint: string }[] = [
      { divisor: 2, hint: 'Eine Zahl ist durch 2 teilbar, wenn die letzte Ziffer gerade ist (0, 2, 4, 6, 8).' },
      { divisor: 3, hint: 'Eine Zahl ist durch 3 teilbar, wenn die Quersumme durch 3 teilbar ist.' },
      { divisor: 5, hint: 'Eine Zahl ist durch 5 teilbar, wenn die letzte Ziffer 0 oder 5 ist.' },
      { divisor: 9, hint: 'Eine Zahl ist durch 9 teilbar, wenn die Quersumme durch 9 teilbar ist.' },
      { divisor: 10, hint: 'Eine Zahl ist durch 10 teilbar, wenn die letzte Ziffer 0 ist.' },
    ];
    const rule = pick(rules);
    const isDivisible = randInt(0, 1) === 0;
    let number: number;
    if (isDivisible) {
      number = rule.divisor * randInt(10, 99);
    } else {
      number = rule.divisor * randInt(10, 99) + randInt(1, rule.divisor - 1);
    }
    const correct = number % rule.divisor === 0;
    return {
      id: genId('k3-vt'),
      topicId: 'k3-vielfache-teiler',
      question: `Ist ${number} durch ${rule.divisor} teilbar?`,
      answerType: 'true-false',
      correctAnswer: correct ? 'Ja' : 'Nein',
      distractors: correct ? ['Nein'] : ['Ja'],
      hint: rule.hint,
      explanation: correct
        ? `Ja, denn ${number} ÷ ${rule.divisor} = ${number / rule.divisor} (ohne Rest).`
        : `Nein, denn ${number} ÷ ${rule.divisor} = ${Math.floor(number / rule.divisor)} Rest ${number % rule.divisor}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  }
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k3-vielfache-teiler',
  generate(difficulty = 1): Exercise {
    return generateVielfache(difficulty as 1 | 2 | 3);
  },
};
