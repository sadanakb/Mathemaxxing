import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function roundDec(n: number, places: number): number {
  const factor = Math.pow(10, places);
  return Math.round(n * factor) / factor;
}

function formatDec(n: number): string {
  return n.toString().replace('.', ',');
}

export const template: ExerciseTemplate = {
  topicId: 'k5-dezimalzahlen-rechnen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Addition von Dezimalzahlen
      const places = d === 1 ? 1 : d === 2 ? 2 : 2;
      const factor = Math.pow(10, places);
      const a = roundDec(randInt(10, d === 1 ? 99 : 999) / factor, places);
      const b = roundDec(randInt(10, d === 1 ? 99 : 999) / factor, places);
      const result = roundDec(a + b, places);

      return {
        id: genId('k5-dezr'),
        topicId: 'k5-dezimalzahlen-rechnen',
        question: `Berechne: ${formatDec(a)} + ${formatDec(b)}`,
        answerType: 'number',
        correctAnswer: formatDec(result),
        tolerance: 0.001,
        hint: 'Schreibe die Zahlen untereinander und achte darauf, dass die Kommas genau untereinander stehen.',
        explanation: `${formatDec(a)} + ${formatDec(b)} = ${formatDec(result)}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 2) {
      // Subtraktion von Dezimalzahlen
      const places = d === 1 ? 1 : d === 2 ? 2 : 2;
      const factor = Math.pow(10, places);
      let a = roundDec(randInt(50, d === 1 ? 99 : 999) / factor, places);
      let b = roundDec(randInt(10, d === 1 ? 49 : 499) / factor, places);
      if (b > a) [a, b] = [b, a];
      const result = roundDec(a - b, places);

      return {
        id: genId('k5-dezr'),
        topicId: 'k5-dezimalzahlen-rechnen',
        question: `Berechne: ${formatDec(a)} - ${formatDec(b)}`,
        answerType: 'number',
        correctAnswer: formatDec(result),
        tolerance: 0.001,
        hint: 'Schreibe die Zahlen untereinander. Achte auf das Komma!',
        explanation: `${formatDec(a)} - ${formatDec(b)} = ${formatDec(result)}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 3) {
      // Multiplikation von Dezimalzahlen
      if (d === 1) {
        // Dezimalzahl * ganze Zahl
        const a = roundDec(randInt(11, 99) / 10, 1);
        const b = randInt(2, 5);
        const result = roundDec(a * b, 1);
        return {
          id: genId('k5-dezr'),
          topicId: 'k5-dezimalzahlen-rechnen',
          question: `Berechne: ${formatDec(a)} \u00b7 ${b}`,
          answerType: 'number',
          correctAnswer: formatDec(result),
          tolerance: 0.001,
          hint: 'Multipliziere zuerst ohne Komma, dann setze das Komma an die richtige Stelle.',
          explanation: `${formatDec(a)} \u00b7 ${b} = ${formatDec(result)}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
          exerciseType: 'number-input',
        };
      } else if (d === 2) {
        // Dezimalzahl * 10, 100, 1000
        const a = roundDec(randInt(12, 999) / 100, 2);
        const mult = [10, 100, 1000][randInt(0, 2)];
        const result = roundDec(a * mult, 2);
        return {
          id: genId('k5-dezr'),
          topicId: 'k5-dezimalzahlen-rechnen',
          question: `Berechne: ${formatDec(a)} \u00b7 ${mult}`,
          answerType: 'number',
          correctAnswer: formatDec(result),
          tolerance: 0.001,
          hint: `Bei Multiplikation mit ${mult} verschiebt sich das Komma um ${Math.log10(mult)} Stelle(n) nach rechts.`,
          explanation: `${formatDec(a)} \u00b7 ${mult} = ${formatDec(result)}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
          exerciseType: 'number-input',
        };
      } else {
        // Dezimalzahl * Dezimalzahl
        const a = roundDec(randInt(11, 99) / 10, 1);
        const b = roundDec(randInt(11, 99) / 10, 1);
        const result = roundDec(a * b, 2);
        return {
          id: genId('k5-dezr'),
          topicId: 'k5-dezimalzahlen-rechnen',
          question: `Berechne: ${formatDec(a)} \u00b7 ${formatDec(b)}`,
          answerType: 'number',
          correctAnswer: formatDec(result),
          tolerance: 0.01,
          hint: 'Multipliziere ohne Komma, dann zähle die Nachkommastellen beider Zahlen zusammen.',
          explanation: `${formatDec(a)} \u00b7 ${formatDec(b)} = ${formatDec(result)}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 45,
          exerciseType: 'number-input',
        };
      }
    }

    if (variant === 4) {
      // Division von Dezimalzahlen
      if (d === 1) {
        // Ganze Zahl / 10, 100
        const divisor = [10, 100][randInt(0, 1)];
        const num = randInt(1, 99) * (divisor === 10 ? 1 : 1);
        const result = roundDec(num / divisor, 2);
        return {
          id: genId('k5-dezr'),
          topicId: 'k5-dezimalzahlen-rechnen',
          question: `Berechne: ${num} \u00f7 ${divisor}`,
          answerType: 'number',
          correctAnswer: formatDec(result),
          tolerance: 0.001,
          hint: `Division durch ${divisor}: Das Komma verschiebt sich um ${Math.log10(divisor)} Stelle(n) nach links.`,
          explanation: `${num} \u00f7 ${divisor} = ${formatDec(result)}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 20,
          exerciseType: 'number-input',
        };
      } else {
        // Dezimalzahl / ganze Zahl
        const divisor = randInt(2, d === 2 ? 5 : 8);
        const quotient = roundDec(randInt(11, 99) / 10, 1);
        const dividend = roundDec(quotient * divisor, 1);
        return {
          id: genId('k5-dezr'),
          topicId: 'k5-dezimalzahlen-rechnen',
          question: `Berechne: ${formatDec(dividend)} \u00f7 ${divisor}`,
          answerType: 'number',
          correctAnswer: formatDec(quotient),
          tolerance: 0.01,
          hint: 'Teile wie bei ganzen Zahlen. Wenn du das Komma im Dividenden erreichst, setze es auch im Ergebnis.',
          explanation: `${formatDec(dividend)} \u00f7 ${divisor} = ${formatDec(quotient)}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: d === 2 ? 35 : 45,
          exerciseType: 'number-input',
        };
      }
    }

    // variant 5: Sachaufgabe mit Dezimalzahlen
    const sachaufgaben = d === 1
      ? [
          () => {
            const preis = roundDec(randInt(10, 50) / 10, 1);
            const anzahl = randInt(2, 5);
            const total = roundDec(preis * anzahl, 2);
            return {
              question: `Ein Brötchen kostet ${formatDec(preis)} \u20ac. Wie viel kosten ${anzahl} Brötchen?`,
              answer: formatDec(total),
              hint: `Multipliziere den Preis mit der Anzahl: ${formatDec(preis)} \u00b7 ${anzahl}`,
              explanation: `${anzahl} \u00b7 ${formatDec(preis)} \u20ac = ${formatDec(total)} \u20ac`,
            };
          },
        ]
      : d === 2
      ? [
          () => {
            const gesamt = roundDec(randInt(100, 500) / 10, 1);
            const ausgabe = roundDec(randInt(10, Math.floor(gesamt * 10) - 10) / 10, 1);
            const rest = roundDec(gesamt - ausgabe, 1);
            return {
              question: `Du hast ${formatDec(gesamt)} \u20ac. Du kaufst ein Buch für ${formatDec(ausgabe)} \u20ac. Wie viel Geld hast du noch?`,
              answer: formatDec(rest),
              hint: `Ziehe den Preis vom Gesamtbetrag ab: ${formatDec(gesamt)} - ${formatDec(ausgabe)}`,
              explanation: `${formatDec(gesamt)} \u20ac - ${formatDec(ausgabe)} \u20ac = ${formatDec(rest)} \u20ac`,
            };
          },
        ]
      : [
          () => {
            const preisProKg = roundDec(randInt(15, 80) / 10, 1);
            const kg = roundDec(randInt(10, 30) / 10, 1);
            const total = roundDec(preisProKg * kg, 2);
            return {
              question: `Äpfel kosten ${formatDec(preisProKg)} \u20ac pro kg. Wie viel kosten ${formatDec(kg)} kg?`,
              answer: formatDec(total),
              hint: `Multipliziere Preis pro kg mit der Menge: ${formatDec(preisProKg)} \u00b7 ${formatDec(kg)}`,
              explanation: `${formatDec(preisProKg)} \u20ac/kg \u00b7 ${formatDec(kg)} kg = ${formatDec(total)} \u20ac`,
            };
          },
        ];

    const sa = sachaufgaben[randInt(0, sachaufgaben.length - 1)]();

    return {
      id: genId('k5-dezr'),
      topicId: 'k5-dezimalzahlen-rechnen',
      question: sa.question,
      answerType: 'number',
      correctAnswer: sa.answer,
      tolerance: 0.01,
      hint: sa.hint,
      explanation: sa.explanation,
      difficulty: d,
      category: 'Konkret',
      estimatedSeconds: d === 1 ? 25 : d === 2 ? 35 : 50,
      exerciseType: 'number-input',
    };
  },
};
