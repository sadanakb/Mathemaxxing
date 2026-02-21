import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-geom-grund-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-geometrie-grundlagen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Umfang und Fl\u00e4che eines Rechtecks
      const a = randInt(3, 15);
      const b = randInt(3, 15);
      const isUmfang = Math.random() < 0.5;

      if (isUmfang) {
        const answer = 2 * (a + b);
        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Berechne den Umfang eines Rechtecks mit a = ${a} cm und b = ${b} cm.`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Umfang Rechteck: U = 2 \u00d7 (a + b) = 2 \u00d7 (${a} + ${b})`,
          explanation: `U = 2 \u00d7 (${a} + ${b}) = 2 \u00d7 ${a + b} = ${answer} cm`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 20,
        };
      } else {
        const answer = a * b;
        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Berechne die Fl\u00e4che eines Rechtecks mit a = ${a} cm und b = ${b} cm. Angabe in cm\u00b2.`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Fl\u00e4che Rechteck: A = a \u00d7 b = ${a} \u00d7 ${b}`,
          explanation: `A = ${a} \u00d7 ${b} = ${answer} cm\u00b2`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 15,
        };
      }
    } else if (d === 2) {
      // Quadrat oder Dreieck
      const isQuadrat = Math.random() < 0.5;

      if (isQuadrat) {
        const seite = randInt(3, 20);
        const isUmfang = Math.random() < 0.5;

        if (isUmfang) {
          const answer = 4 * seite;
          return {
            id: genId(),
            topicId: 'k7-geometrie-grundlagen',
            question: `Berechne den Umfang eines Quadrats mit der Seitenl\u00e4nge ${seite} cm.`,
            answerType: 'number',
            correctAnswer: answer,
            hint: `Umfang Quadrat: U = 4 \u00d7 a = 4 \u00d7 ${seite}`,
            explanation: `U = 4 \u00d7 ${seite} = ${answer} cm`,
            difficulty: d,
            category: 'Konkret',
            estimatedSeconds: 15,
          };
        } else {
          const answer = seite * seite;
          return {
            id: genId(),
            topicId: 'k7-geometrie-grundlagen',
            question: `Berechne die Fl\u00e4che eines Quadrats mit der Seitenl\u00e4nge ${seite} cm. Angabe in cm\u00b2.`,
            answerType: 'number',
            correctAnswer: answer,
            hint: `Fl\u00e4che Quadrat: A = a \u00d7 a = ${seite} \u00d7 ${seite}`,
            explanation: `A = ${seite} \u00d7 ${seite} = ${answer} cm\u00b2`,
            difficulty: d,
            category: 'Konkret',
            estimatedSeconds: 15,
          };
        }
      } else {
        // Dreieck: Fl\u00e4che
        const grundseite = randInt(4, 16);
        const hoehe = randInt(3, 12);
        const answer = (grundseite * hoehe) / 2;

        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Berechne die Fl\u00e4che eines Dreiecks mit Grundseite g = ${grundseite} cm und H\u00f6he h = ${hoehe} cm. Angabe in cm\u00b2.`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Fl\u00e4che Dreieck: A = (g \u00d7 h) / 2 = (${grundseite} \u00d7 ${hoehe}) / 2`,
          explanation: `A = (${grundseite} \u00d7 ${hoehe}) / 2 = ${grundseite * hoehe} / 2 = ${answer} cm\u00b2`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 25,
        };
      }
    } else {
      // R\u00fcckw\u00e4rts: Seitenl\u00e4nge berechnen aus Fl\u00e4che oder Umfang
      const types = ['rechteckSeite', 'quadratSeite', 'dreieckHoehe'];
      const type = types[randInt(0, types.length - 1)];

      if (type === 'rechteckSeite') {
        const a = randInt(4, 12);
        const b = randInt(3, 10);
        const flaeche = a * b;

        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Ein Rechteck hat eine Fl\u00e4che von ${flaeche} cm\u00b2 und eine Seite von ${a} cm. Wie lang ist die andere Seite?`,
          answerType: 'number',
          correctAnswer: b,
          hint: `A = a \u00d7 b, also b = A \u00f7 a = ${flaeche} \u00f7 ${a}`,
          explanation: `b = ${flaeche} \u00f7 ${a} = ${b} cm`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 25,
        };
      } else if (type === 'quadratSeite') {
        const seite = randInt(3, 15);
        const umfang = 4 * seite;

        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Ein Quadrat hat einen Umfang von ${umfang} cm. Wie lang ist eine Seite?`,
          answerType: 'number',
          correctAnswer: seite,
          hint: `U = 4 \u00d7 a, also a = U \u00f7 4 = ${umfang} \u00f7 4`,
          explanation: `a = ${umfang} \u00f7 4 = ${seite} cm`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 20,
        };
      } else {
        const grundseite = randInt(4, 12);
        const hoehe = randInt(3, 10);
        const flaeche = (grundseite * hoehe) / 2;

        return {
          id: genId(),
          topicId: 'k7-geometrie-grundlagen',
          question: `Ein Dreieck hat eine Fl\u00e4che von ${flaeche} cm\u00b2 und eine Grundseite von ${grundseite} cm. Wie hoch ist das Dreieck?`,
          answerType: 'number',
          correctAnswer: hoehe,
          hint: `A = (g \u00d7 h) / 2, also h = 2 \u00d7 A / g = 2 \u00d7 ${flaeche} / ${grundseite}`,
          explanation: `h = 2 \u00d7 ${flaeche} / ${grundseite} = ${2 * flaeche} / ${grundseite} = ${hoehe} cm`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 35,
        };
      }
    }
  },
};
