import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function euroCoins(euros: number): { value: number; count: number }[] {
  const coins: { value: number; count: number }[] = [];
  if (euros >= 2) { coins.push({ value: 200, count: Math.floor(euros / 2) }); euros %= 2; }
  if (euros >= 1) { coins.push({ value: 100, count: 1 }); }
  return coins;
}

/** Shuffle an array in-place (Fisher-Yates) and return it. */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const template: ExerciseTemplate = {
  topicId: 'k1-geld-euro-cent',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    if (difficulty === 1) {
      if (variant === 0) {
        // Euro to Cent: whole euros only (original)
        const euros = randInt(1, 5);
        const cents = euros * 100;
        return {
          id: genId('k1-geld'),
          topicId: 'k1-geld-euro-cent',
          question: `Wie viel Cent sind ${euros} Euro?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: cents,
          hint: '1 Euro = 100 Cent.',
          explanation: `${euros} Euro × 100 = ${cents} Cent.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 20,
          visualConfig: {
            type: 'coins',
            props: { coins: euroCoins(euros) },
          },
        };
      }

      if (variant === 1) {
        // drag-sort: order coin values from smallest to largest
        const coinValues = shuffle([1, 2, 5, 10, 20, 50]).slice(0, 4);
        const sorted = [...coinValues].sort((a, b) => a - b);
        const shuffled = shuffle([...sorted]);
        return {
          id: genId('k1-geld'),
          topicId: 'k1-geld-euro-cent',
          question: 'Ordne die Münzwerte von klein nach groß!',
          answerType: 'drag-drop',
          exerciseType: 'drag-sort',
          correctAnswer: sorted.map(v => `${v} Ct`).join(', '),
          items: shuffled.map(v => `${v} Ct`),
          hint: 'Finde die kleinste Münze und stelle sie an den Anfang.',
          explanation: `Die richtige Reihenfolge: ${sorted.map(v => `${v} Ct`).join(', ')}.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 22,
        };
      }

      // variant === 2: multiple-choice — how much is X euro in cent?
      const euros = randInt(1, 5);
      const cents = euros * 100;
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = cents + randInt(-150, 150);
        if (d !== cents && d > 0 && d % 10 === 0) wrong.add(d);
      }
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `Wie viel Cent sind ${euros} Euro?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: cents,
        distractors: [...wrong],
        options: [String(cents), ...[...wrong].map(String)],
        hint: '1 Euro = 100 Cent.',
        explanation: `${euros} Euro × 100 = ${cents} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 18,
      };
    }

    if (difficulty === 2) {
      if (variant === 0) {
        // Cent to Euro + Cent remainder (original)
        const totalCent = randInt(101, 500);
        const euros = Math.floor(totalCent / 100);
        const rest = totalCent % 100;
        return {
          id: genId('k1-geld'),
          topicId: 'k1-geld-euro-cent',
          question: `${totalCent} Cent – wie viele Euro und wie viele Cent bleiben übrig? Antworte mit dem Cent-Rest.`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: rest,
          hint: `Teile ${totalCent} durch 100. Der Rest sind die übrigen Cent.`,
          explanation: `${totalCent} Cent = ${euros} Euro und ${rest} Cent. Der Rest ist ${rest} Cent.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 30,
        };
      }

      if (variant === 1) {
        // estimation: "Hast du genug Geld?"
        const price = randInt(2, 4);
        const priceCent = price * 100;
        const walletEuros = randInt(1, 5);
        const walletCent = walletEuros * 100;
        const hasEnough = walletCent >= priceCent;
        return {
          id: genId('k1-geld'),
          topicId: 'k1-geld-euro-cent',
          question: `Du hast ${walletEuros} Euro. Ein Spielzeug kostet ${price} Euro. Hast du genug Geld?`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: hasEnough ? 'wahr' : 'falsch',
          hint: `Vergleiche: Du hast ${walletEuros} Euro, das Spielzeug kostet ${price} Euro.`,
          explanation: hasEnough
            ? `Ja, ${walletEuros} Euro reicht für ${price} Euro.`
            : `Nein, ${walletEuros} Euro reicht nicht. Du brauchst ${price} Euro.`,
          difficulty,
          category: 'Konkret',
          estimatedSeconds: 20,
        };
      }

      // variant === 2: multiple-choice cent remainder
      const totalCent = randInt(101, 500);
      const euros = Math.floor(totalCent / 100);
      const rest = totalCent % 100;
      const wrongSet = new Set<number>();
      while (wrongSet.size < 3) {
        const d = rest + randInt(-30, 30);
        if (d !== rest && d >= 0 && d < 100) wrongSet.add(d);
      }
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `${totalCent} Cent = ${euros} Euro und wie viel Cent Rest?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: rest,
        distractors: [...wrongSet],
        options: [String(rest), ...[...wrongSet].map(String)],
        hint: `${totalCent} ÷ 100 = ${euros} Rest ${rest}.`,
        explanation: `${totalCent} Cent = ${euros} Euro und ${rest} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 25,
      };
    }

    // difficulty === 3
    if (variant === 0) {
      // Mixed: how much total in cent (original)
      const euros = randInt(2, 9);
      const cents = randInt(5, 95);
      const total = euros * 100 + cents;
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: `${euros} Euro und ${cents} Cent – wie viel Cent sind das insgesamt?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: total,
        hint: `Multipliziere ${euros} × 100 und addiere ${cents}.`,
        explanation: `${euros} × 100 + ${cents} = ${total} Cent.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 35,
      };
    }

    if (variant === 1) {
      // drag-sort: order mixed amounts from lowest to highest
      const amounts = shuffle([50, 150, 200, 75, 125]).slice(0, 4);
      const sorted = [...amounts].sort((a, b) => a - b);
      const shuffled = shuffle([...sorted]);
      const label = (v: number) => v % 100 === 0 ? `${v / 100} €` : `${v} Ct`;
      return {
        id: genId('k1-geld'),
        topicId: 'k1-geld-euro-cent',
        question: 'Ordne die Geldbeträge von klein nach groß!',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        correctAnswer: sorted.map(label).join(', '),
        items: shuffled.map(label),
        hint: 'Denke daran: 1 Euro = 100 Cent.',
        explanation: `Richtige Reihenfolge: ${sorted.map(label).join(', ')}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    }

    // variant === 2: estimation — is the total more or less than 1 Euro?
    const euros = randInt(0, 1);
    const cents = randInt(10, 90);
    const total = euros * 100 + cents;
    const moreThanOneEuro = total > 100;
    return {
      id: genId('k1-geld'),
      topicId: 'k1-geld-euro-cent',
      question: `${euros} Euro und ${cents} Cent – ist das mehr als 1 Euro?`,
      answerType: 'true-false',
      exerciseType: 'estimation',
      correctAnswer: moreThanOneEuro ? 'wahr' : 'falsch',
      hint: '1 Euro = 100 Cent. Rechne zusammen und vergleiche.',
      explanation: moreThanOneEuro
        ? `Ja, ${euros * 100 + cents} Cent ist mehr als 100 Cent (= 1 Euro).`
        : `Nein, ${euros * 100 + cents} Cent ist weniger als 100 Cent (= 1 Euro).`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 25,
    };
  },
};
