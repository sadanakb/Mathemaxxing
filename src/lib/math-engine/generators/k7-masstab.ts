import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-masstab-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-masstab',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einfach: Kartenstrecke in Wirklichkeit umrechnen
      const masstabWerte = [100, 500, 1000, 5000, 10000];
      const masstab = masstabWerte[randInt(0, masstabWerte.length - 1)];
      const kartenStrecke = randInt(2, 15);
      const wirklichkeit = kartenStrecke * masstab;
      // In sinnvolle Einheit umrechnen
      let answer: number;
      let einheit: string;
      if (wirklichkeit >= 100000) {
        answer = wirklichkeit / 100000;
        einheit = 'km';
      } else if (wirklichkeit >= 100) {
        answer = wirklichkeit / 100;
        einheit = 'm';
      } else {
        answer = wirklichkeit;
        einheit = 'cm';
      }

      return {
        id: genId(),
        topicId: 'k7-masstab',
        question: `Eine Karte hat den Ma\u00dfstab 1:${masstab.toLocaleString('de-DE')}. Eine Strecke ist auf der Karte ${kartenStrecke} cm lang. Wie lang ist sie in Wirklichkeit? (Angabe in ${einheit})`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Ma\u00dfstab 1:${masstab.toLocaleString('de-DE')} bedeutet: 1 cm auf der Karte = ${masstab.toLocaleString('de-DE')} cm in der Wirklichkeit. Also: ${kartenStrecke} \u00d7 ${masstab.toLocaleString('de-DE')} cm = ${wirklichkeit.toLocaleString('de-DE')} cm.`,
        explanation: `${kartenStrecke} cm \u00d7 ${masstab.toLocaleString('de-DE')} = ${wirklichkeit.toLocaleString('de-DE')} cm = ${answer} ${einheit}`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    } else if (d === 2) {
      // Wirkliche Strecke in Kartenstrecke umrechnen
      const masstabWerte = [10000, 25000, 50000];
      const masstab = masstabWerte[randInt(0, masstabWerte.length - 1)];
      const wirklichkeitM = randInt(1, 20) * 100;
      const wirklichkeitCm = wirklichkeitM * 100;
      const answer = wirklichkeitCm / masstab;

      return {
        id: genId(),
        topicId: 'k7-masstab',
        question: `Ma\u00dfstab 1:${masstab.toLocaleString('de-DE')}. Zwei Orte sind in Wirklichkeit ${wirklichkeitM} m voneinander entfernt. Wie weit sind sie auf der Karte voneinander entfernt? (Angabe in cm)`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Rechne erst ${wirklichkeitM} m in cm um: ${wirklichkeitM} \u00d7 100 = ${wirklichkeitCm.toLocaleString('de-DE')} cm. Dann durch den Ma\u00dfstab teilen: ${wirklichkeitCm.toLocaleString('de-DE')} \u00f7 ${masstab.toLocaleString('de-DE')}.`,
        explanation: `${wirklichkeitM} m = ${wirklichkeitCm.toLocaleString('de-DE')} cm\n${wirklichkeitCm.toLocaleString('de-DE')} \u00f7 ${masstab.toLocaleString('de-DE')} = ${answer} cm auf der Karte`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 45,
      };
    } else {
      // Ma\u00dfstab bestimmen
      const kartenStrecke = randInt(2, 10);
      const wirklichkeitKm = randInt(1, 10);
      const wirklichkeitCm = wirklichkeitKm * 100000;
      const masstab = wirklichkeitCm / kartenStrecke;

      return {
        id: genId(),
        topicId: 'k7-masstab',
        question: `Auf einer Karte sind ${kartenStrecke} cm = ${wirklichkeitKm} km. Welchen Ma\u00dfstab hat die Karte? (Gib die Zahl nach 1: ein, z.B. bei 1:50000 antworte 50000)`,
        answerType: 'number',
        correctAnswer: masstab,
        hint: `Rechne ${wirklichkeitKm} km in cm um: ${wirklichkeitKm} \u00d7 100.000 = ${wirklichkeitCm.toLocaleString('de-DE')} cm. Dann: Ma\u00dfstab = ${wirklichkeitCm.toLocaleString('de-DE')} \u00f7 ${kartenStrecke}.`,
        explanation: `${wirklichkeitKm} km = ${wirklichkeitCm.toLocaleString('de-DE')} cm\nMa\u00dfstab = 1 : ${wirklichkeitCm.toLocaleString('de-DE')} \u00f7 ${kartenStrecke} = 1 : ${masstab.toLocaleString('de-DE')}`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 55,
      };
    }
  },
};
