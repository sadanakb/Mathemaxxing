import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-zins-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-zinsrechnung',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einfache Zinsen berechnen: Z = K * p / 100
      const kapital = randInt(2, 20) * 100;
      const zinssatz = [1, 2, 3, 4, 5][randInt(0, 4)];
      const zinsen = kapital * zinssatz / 100;

      return {
        id: genId(),
        topicId: 'k7-zinsrechnung',
        question: `Du legst ${kapital} \u20ac zu ${zinssatz} % Zinsen an. Wie viel Zinsen bekommst du nach einem Jahr?`,
        answerType: 'number',
        correctAnswer: zinsen,
        hint: `Zinsformel: Zinsen = Kapital \u00d7 Zinssatz / 100 = ${kapital} \u00d7 ${zinssatz} / 100`,
        explanation: `Zinsen = ${kapital} \u00d7 ${zinssatz} / 100 = ${zinsen} \u20ac`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 25,
      };
    } else if (d === 2) {
      // Kapital oder Zinssatz gesucht
      const findCapital = Math.random() < 0.5;

      if (findCapital) {
        const zinssatz = [2, 3, 4, 5][randInt(0, 3)];
        const kapital = randInt(5, 30) * 100;
        const zinsen = kapital * zinssatz / 100;

        return {
          id: genId(),
          topicId: 'k7-zinsrechnung',
          question: `Bei ${zinssatz} % Zinsen erh\u00e4ltst du ${zinsen} \u20ac Zinsen pro Jahr. Wie hoch ist das angelegte Kapital?`,
          answerType: 'number',
          correctAnswer: kapital,
          hint: `Kapital = Zinsen \u00d7 100 / Zinssatz = ${zinsen} \u00d7 100 / ${zinssatz}`,
          explanation: `Kapital = ${zinsen} \u00d7 100 / ${zinssatz} = ${kapital} \u20ac`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 35,
        };
      } else {
        const kapital = randInt(5, 30) * 100;
        const zinssatz = [2, 3, 4, 5][randInt(0, 3)];
        const zinsen = kapital * zinssatz / 100;

        return {
          id: genId(),
          topicId: 'k7-zinsrechnung',
          question: `Du legst ${kapital} \u20ac an und bekommst ${zinsen} \u20ac Zinsen im Jahr. Wie hoch ist der Zinssatz in Prozent?`,
          answerType: 'number',
          correctAnswer: zinssatz,
          hint: `Zinssatz = Zinsen \u00d7 100 / Kapital = ${zinsen} \u00d7 100 / ${kapital}`,
          explanation: `Zinssatz = ${zinsen} \u00d7 100 / ${kapital} = ${zinssatz} %`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 35,
        };
      }
    } else {
      // Zinseszins: K_n = K * (1 + p/100)^n
      const kapital = randInt(5, 20) * 100;
      const zinssatz = [2, 3, 4, 5][randInt(0, 3)];
      const jahre = [2, 3][randInt(0, 1)];
      const faktor = 1 + zinssatz / 100;
      const endkapital = Math.round(kapital * Math.pow(faktor, jahre) * 100) / 100;

      return {
        id: genId(),
        topicId: 'k7-zinsrechnung',
        question: `Du legst ${kapital} \u20ac zu ${zinssatz} % Zinseszins f\u00fcr ${jahre} Jahre an. Wie hoch ist das Endkapital? (Runde auf 2 Nachkommastellen)`,
        answerType: 'number',
        correctAnswer: endkapital,
        hint: `Zinseszinsformel: Endkapital = Kapital \u00d7 (1 + Zinssatz/100)^Jahre = ${kapital} \u00d7 ${faktor}^${jahre}`,
        explanation: `Endkapital = ${kapital} \u00d7 ${faktor}^${jahre} = ${kapital} \u00d7 ${Math.round(Math.pow(faktor, jahre) * 10000) / 10000} = ${endkapital} \u20ac`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 60,
      };
    }
  },
};
