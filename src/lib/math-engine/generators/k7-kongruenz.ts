import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-kongr-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-kongruenz',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Kongruenzsatz benennen
      const saetze = [
        {
          gegeben: 'drei Seiten (a = 5 cm, b = 7 cm, c = 9 cm)',
          satz: 'SSS',
          erklaerung: 'Alle drei Seiten sind gegeben, daher gilt der Kongruenzsatz SSS (Seite-Seite-Seite).',
        },
        {
          gegeben: 'zwei Seiten und den eingeschlossenen Winkel (a = 4 cm, b = 6 cm, \u03b3 = 60\u00b0)',
          satz: 'SWS',
          erklaerung: 'Zwei Seiten und der eingeschlossene Winkel sind gegeben, daher gilt SWS (Seite-Winkel-Seite).',
        },
        {
          gegeben: 'eine Seite und zwei anliegende Winkel (c = 8 cm, \u03b1 = 50\u00b0, \u03b2 = 70\u00b0)',
          satz: 'WSW',
          erklaerung: 'Eine Seite und zwei anliegende Winkel sind gegeben, daher gilt WSW (Winkel-Seite-Winkel).',
        },
        {
          gegeben: 'zwei Seiten und den der l\u00e4ngeren Seite gegen\u00fcberliegenden Winkel (a = 5 cm, b = 8 cm, \u03b1 = 35\u00b0)',
          satz: 'SSW',
          erklaerung: 'Zwei Seiten und der Winkel gegen\u00fcber der l\u00e4ngeren Seite sind gegeben, daher gilt SSW (Seite-Seite-Winkel).',
        },
      ];
      const item = saetze[randInt(0, saetze.length - 1)];

      return {
        id: genId(),
        topicId: 'k7-kongruenz',
        question: `Welcher Kongruenzsatz gilt, wenn ${item.gegeben} gegeben sind? (Antworte mit SSS, SWS, WSW oder SSW)`,
        answerType: 'text',
        correctAnswer: item.satz,
        hint: `\u00dcberlege: Welche St\u00fccke (Seiten = S, Winkel = W) sind gegeben und in welcher Reihenfolge?`,
        explanation: item.erklaerung,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    } else if (d === 2) {
      // Fehlenden Winkel berechnen
      const alpha = randInt(30, 80);
      const beta = randInt(30, 150 - alpha);
      const gamma = 180 - alpha - beta;
      const gefragt = randInt(0, 2);
      const winkelNamen = ['\u03b1', '\u03b2', '\u03b3'];
      const winkelWerte = [alpha, beta, gamma];

      const gegebene = winkelNamen.filter((_, i) => i !== gefragt);
      const gegebeneWerte = winkelWerte.filter((_, i) => i !== gefragt);
      const answer = winkelWerte[gefragt];

      return {
        id: genId(),
        topicId: 'k7-kongruenz',
        question: `In einem Dreieck gilt: ${gegebene[0]} = ${gegebeneWerte[0]}\u00b0 und ${gegebene[1]} = ${gegebeneWerte[1]}\u00b0. Berechne ${winkelNamen[gefragt]} in Grad.`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Die Winkelsumme im Dreieck betr\u00e4gt immer 180\u00b0. Also: ${winkelNamen[gefragt]} = 180\u00b0 - ${gegebeneWerte[0]}\u00b0 - ${gegebeneWerte[1]}\u00b0.`,
        explanation: `${winkelNamen[gefragt]} = 180\u00b0 - ${gegebeneWerte[0]}\u00b0 - ${gegebeneWerte[1]}\u00b0 = ${answer}\u00b0`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    } else {
      // Kongruenz pr\u00fcfen: Sind zwei Dreiecke kongruent?
      const scenarios = [
        {
          d1: 'Dreieck ABC: a = 5 cm, b = 7 cm, c = 9 cm',
          d2: 'Dreieck DEF: d = 5 cm, e = 7 cm, f = 9 cm',
          kongruent: 'Ja',
          satz: 'SSS',
          erklaerung: 'Alle drei Seitenpaare stimmen \u00fcberein: a=d, b=e, c=f. Nach SSS sind die Dreiecke kongruent.',
        },
        {
          d1: 'Dreieck ABC: a = 4 cm, b = 6 cm, \u03b3 = 50\u00b0',
          d2: 'Dreieck DEF: d = 4 cm, e = 6 cm, \u03b6 = 50\u00b0',
          kongruent: 'Ja',
          satz: 'SWS',
          erklaerung: 'Zwei Seiten und der eingeschlossene Winkel stimmen \u00fcberein. Nach SWS sind die Dreiecke kongruent.',
        },
        {
          d1: 'Dreieck ABC: a = 5 cm, b = 7 cm, c = 9 cm',
          d2: 'Dreieck DEF: d = 5 cm, e = 7 cm, f = 10 cm',
          kongruent: 'Nein',
          satz: 'keiner',
          erklaerung: 'Die Seite c = 9 cm und f = 10 cm stimmen nicht \u00fcberein. Die Dreiecke sind nicht kongruent.',
        },
        {
          d1: 'Dreieck ABC: c = 8 cm, \u03b1 = 45\u00b0, \u03b2 = 65\u00b0',
          d2: 'Dreieck DEF: f = 8 cm, \u03b4 = 45\u00b0, \u03b5 = 65\u00b0',
          kongruent: 'Ja',
          satz: 'WSW',
          erklaerung: 'Eine Seite und die beiden anliegenden Winkel stimmen \u00fcberein. Nach WSW sind die Dreiecke kongruent.',
        },
      ];
      const s = scenarios[randInt(0, scenarios.length - 1)];

      return {
        id: genId(),
        topicId: 'k7-kongruenz',
        question: `Sind die folgenden Dreiecke kongruent? ${s.d1}. ${s.d2}. Antworte mit Ja oder Nein.`,
        answerType: 'text',
        correctAnswer: s.kongruent,
        hint: `Vergleiche die gegebenen St\u00fccke und pr\u00fcfe, ob ein Kongruenzsatz (SSS, SWS, WSW, SSW) anwendbar ist.`,
        explanation: s.erklaerung,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
