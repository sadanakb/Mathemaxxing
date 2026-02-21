import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-zuord-gym-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-zuordnungen-gym',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Proportionale Zuordnung: Fehlenden Wert berechnen
      const factor = randInt(2, 8);
      const x1 = randInt(2, 10);
      const y1 = x1 * factor;
      const x2 = randInt(2, 10);
      const y2 = x2 * factor;

      return {
        id: genId(),
        topicId: 'k7-zuordnungen-gym',
        question: `Proportionale Zuordnung: Wenn x = ${x1}, dann y = ${y1}. Wie groß ist y bei x = ${x2}?`,
        answerType: 'number',
        correctAnswer: y2,
        hint: `Bestimme zuerst den Faktor: y / x = ${y1} / ${x1} = ${factor}. Dann: y = ${factor} * ${x2}.`,
        explanation: `Faktor = ${y1} / ${x1} = ${factor}. Also: y = ${factor} * ${x2} = ${y2}.`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    } else if (d === 2) {
      // Antiproportionale Zuordnung
      const x1 = randInt(2, 8);
      const product = x1 * randInt(3, 12);
      const x2 = randInt(2, 10);
      // Sicherstellen, dass product durch x2 teilbar ist
      const adjustedProduct = x2 * Math.ceil(product / x2);
      const y1 = adjustedProduct / x1;
      const y2 = adjustedProduct / x2;

      return {
        id: genId(),
        topicId: 'k7-zuordnungen-gym',
        question: `Antiproportionale Zuordnung: Bei ${x1} Arbeitern dauert ein Auftrag ${y1} Stunden. Wie lange dauert er bei ${x2} Arbeitern?`,
        answerType: 'number',
        correctAnswer: y2,
        hint: `Bei antiproportionaler Zuordnung ist das Produkt konstant: ${x1} * ${y1} = ${adjustedProduct}. Also: ${adjustedProduct} / ${x2} = ?`,
        explanation: `Produkt = ${x1} * ${y1} = ${adjustedProduct}. Bei ${x2} Arbeitern: ${adjustedProduct} / ${x2} = ${y2} Stunden.`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 45,
      };
    } else {
      // Erkennen: proportional oder antiproportional?
      const isProportional = Math.random() < 0.5;
      const x1 = randInt(2, 6);
      const x2 = x1 * 2;

      if (isProportional) {
        const factor = randInt(3, 9);
        const y1 = x1 * factor;
        const y2 = x2 * factor;
        const x3 = randInt(3, 10);
        const y3 = x3 * factor;

        return {
          id: genId(),
          topicId: 'k7-zuordnungen-gym',
          question: `Tabelle: x = ${x1}, y = ${y1} | x = ${x2}, y = ${y2}. Ist die Zuordnung proportional oder antiproportional? Berechne y bei x = ${x3}.`,
          answerType: 'number',
          correctAnswer: y3,
          hint: `Prüfe: Ist y/x immer gleich (proportional) oder x*y immer gleich (antiproportional)? ${y1}/${x1} = ${factor}, ${y2}/${x2} = ${factor}.`,
          explanation: `y/x = ${y1}/${x1} = ${y2}/${x2} = ${factor} (konstant) => proportional. y = ${factor} * ${x3} = ${y3}.`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 60,
        };
      } else {
        const product = x1 * randInt(6, 15);
        const adjustedProduct = x2 * Math.round(product / x2);
        const y1 = adjustedProduct / x1;
        const y2Calc = adjustedProduct / x2;
        const x3 = randInt(2, 8);
        const adjustedProduct2 = x3 * Math.round(adjustedProduct / x3);
        const y1Final = adjustedProduct2 / x1;
        const y2Final = adjustedProduct2 / x2;
        const y3 = adjustedProduct2 / x3;

        return {
          id: genId(),
          topicId: 'k7-zuordnungen-gym',
          question: `Tabelle: x = ${x1}, y = ${y1Final} | x = ${x2}, y = ${y2Final}. Ist die Zuordnung proportional oder antiproportional? Berechne y bei x = ${x3}.`,
          answerType: 'number',
          correctAnswer: y3,
          hint: `Prüfe: x*y = ${x1}*${y1Final} = ${adjustedProduct2}, ${x2}*${y2Final} = ${adjustedProduct2}. Gleich => antiproportional.`,
          explanation: `x * y = ${adjustedProduct2} (konstant) => antiproportional. y = ${adjustedProduct2} / ${x3} = ${y3}.`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 70,
        };
      }
    }
  },
};
