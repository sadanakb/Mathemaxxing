import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-vol-real-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-volumen-real',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Volumen eines Quaders
      const a = randInt(2, 10);
      const b = randInt(2, 10);
      const c = randInt(2, 10);
      const answer = a * b * c;

      return {
        id: genId(),
        topicId: 'k7-volumen-real',
        question: `Berechne das Volumen eines Quaders mit den Kantenlängen a = ${a} cm, b = ${b} cm, c = ${c} cm. Angabe in cm³.`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Volumen eines Quaders: V = a × b × c = ${a} × ${b} × ${c}`,
        explanation: `V = ${a} × ${b} × ${c} = ${answer} cm³`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 20,
      };
    } else if (d === 2) {
      // Volumen eines dreieckigen Prismas
      const grundseite = randInt(3, 12);
      const hoeheDreieck = randInt(2, 10);
      const laenge = randInt(4, 15);
      const grundflaeche = (grundseite * hoeheDreieck) / 2;
      const answer = grundflaeche * laenge;

      return {
        id: genId(),
        topicId: 'k7-volumen-real',
        question: `Ein Prisma hat als Grundfläche ein Dreieck (Grundseite = ${grundseite} cm, Höhe = ${hoeheDreieck} cm). Die Länge des Prismas beträgt ${laenge} cm. Berechne das Volumen in cm³.`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Volumen = Grundfläche × Länge. Grundfläche Dreieck = (Grundseite × Höhe) / 2 = (${grundseite} × ${hoeheDreieck}) / 2 = ${grundflaeche} cm².`,
        explanation: `Grundfläche = (${grundseite} × ${hoeheDreieck}) / 2 = ${grundflaeche} cm²\nVolumen = ${grundflaeche} × ${laenge} = ${answer} cm³`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 40,
      };
    } else {
      // Zusammengesetzter Körper: Quader + Quader
      const a1 = randInt(3, 8);
      const b1 = randInt(3, 8);
      const c1 = randInt(3, 8);
      const a2 = randInt(2, 6);
      const b2 = randInt(2, 6);
      const c2 = randInt(2, 6);
      const v1 = a1 * b1 * c1;
      const v2 = a2 * b2 * c2;
      const answer = v1 + v2;

      return {
        id: genId(),
        topicId: 'k7-volumen-real',
        question: `Ein Körper besteht aus zwei Quadern. Quader 1: ${a1} cm × ${b1} cm × ${c1} cm. Quader 2: ${a2} cm × ${b2} cm × ${c2} cm. Berechne das Gesamtvolumen in cm³.`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Berechne die Volumen einzeln und addiere sie: V₁ = ${a1}×${b1}×${c1} = ${v1}. V₂ = ${a2}×${b2}×${c2} = ${v2}.`,
        explanation: `V₁ = ${a1} × ${b1} × ${c1} = ${v1} cm³\nV₂ = ${a2} × ${b2} × ${c2} = ${v2} cm³\nGesamtvolumen = ${v1} + ${v2} = ${answer} cm³`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 55,
      };
    }
  },
};
