import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-sach-geld-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-sachaufgaben-geld',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einkaufsrechnung: Einzelpreise addieren
      const items = [
        { name: 'Brot', preis: [1.29, 1.49, 1.79, 2.19][randInt(0, 3)] },
        { name: 'Milch', preis: [0.89, 1.09, 1.19, 1.29][randInt(0, 3)] },
        { name: 'Butter', preis: [1.49, 1.69, 1.99, 2.29][randInt(0, 3)] },
        { name: '\u00c4pfel', preis: [1.99, 2.49, 2.99, 3.49][randInt(0, 3)] },
        { name: 'Käse', preis: [1.79, 2.29, 2.79, 3.29][randInt(0, 3)] },
      ];
      const selected = [items[randInt(0, 4)], items[randInt(0, 4)], items[randInt(0, 4)]];
      // Sicherstellen, dass verschiedene Items
      selected[1] = items[(items.indexOf(selected[0]) + 1) % 5];
      selected[2] = items[(items.indexOf(selected[0]) + 2) % 5];

      const summe = Math.round((selected[0].preis + selected[1].preis + selected[2].preis) * 100) / 100;

      const artikelListe = selected.map(s => `${s.name} (${s.preis.toFixed(2)} \u20ac)`).join(', ');

      return {
        id: genId(),
        topicId: 'k7-sachaufgaben-geld',
        question: `Du kaufst: ${artikelListe}. Wie viel bezahlst du insgesamt?`,
        answerType: 'number',
        correctAnswer: summe,
        hint: `Addiere alle Preise: ${selected[0].preis.toFixed(2)} + ${selected[1].preis.toFixed(2)} + ${selected[2].preis.toFixed(2)}`,
        explanation: `${selected[0].preis.toFixed(2)} + ${selected[1].preis.toFixed(2)} + ${selected[2].preis.toFixed(2)} = ${summe.toFixed(2)} \u20ac`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    } else if (d === 2) {
      // Rückgeld berechnen
      const preise = [3.47, 5.23, 7.89, 12.35, 15.67, 8.42];
      const preis = preise[randInt(0, preise.length - 1)];
      const bezahlt = preis < 10 ? 10 : 20;
      const rueckgeld = Math.round((bezahlt - preis) * 100) / 100;

      return {
        id: genId(),
        topicId: 'k7-sachaufgaben-geld',
        question: `Du kaufst etwas f\u00fcr ${preis.toFixed(2)} \u20ac und bezahlst mit einem ${bezahlt}-Euro-Schein. Wie viel R\u00fcckgeld bekommst du?`,
        answerType: 'number',
        correctAnswer: rueckgeld,
        hint: `R\u00fcckgeld = Bezahlt - Preis = ${bezahlt.toFixed(2)} - ${preis.toFixed(2)}`,
        explanation: `${bezahlt.toFixed(2)} \u20ac - ${preis.toFixed(2)} \u20ac = ${rueckgeld.toFixed(2)} \u20ac R\u00fcckgeld`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    } else {
      // Haushaltsplanung: Monatsbudget
      const types = ['budget', 'preisvergleich'];
      const type = types[randInt(0, 1)];

      if (type === 'budget') {
        const einkommen = randInt(8, 15) * 100;
        const miete = randInt(3, 5) * 100;
        const essen = randInt(150, 300);
        const sonstiges = randInt(50, 150);
        const ausgaben = miete + essen + sonstiges;
        const answer = einkommen - ausgaben;

        return {
          id: genId(),
          topicId: 'k7-sachaufgaben-geld',
          question: `Monatliches Einkommen: ${einkommen} \u20ac. Ausgaben: Miete ${miete} \u20ac, Essen ${essen} \u20ac, Sonstiges ${sonstiges} \u20ac. Wie viel Geld bleibt am Ende des Monats \u00fcbrig?`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Berechne zuerst die gesamten Ausgaben: ${miete} + ${essen} + ${sonstiges} = ${ausgaben} \u20ac. Dann vom Einkommen abziehen.`,
          explanation: `Ausgaben: ${miete} + ${essen} + ${sonstiges} = ${ausgaben} \u20ac\n\u00dcbrig: ${einkommen} - ${ausgaben} = ${answer} \u20ac`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 45,
        };
      } else {
        // Preisvergleich: Welches Angebot ist g\u00fcnstiger?
        const menge1 = randInt(3, 6);
        const preis1 = Math.round(randInt(10, 30) * menge1 * (0.8 + Math.random() * 0.4)) / 10;
        const menge2 = randInt(7, 12);
        const preis2 = Math.round(randInt(10, 30) * menge2 * (0.8 + Math.random() * 0.4)) / 10;

        const einzelpreis1 = Math.round((preis1 / menge1) * 100) / 100;
        const einzelpreis2 = Math.round((preis2 / menge2) * 100) / 100;
        const answer = Math.min(einzelpreis1, einzelpreis2);

        return {
          id: genId(),
          topicId: 'k7-sachaufgaben-geld',
          question: `Angebot A: ${menge1} St\u00fcck f\u00fcr ${preis1.toFixed(2)} \u20ac. Angebot B: ${menge2} St\u00fcck f\u00fcr ${preis2.toFixed(2)} \u20ac. Wie hoch ist der g\u00fcnstigere St\u00fcckpreis? (auf 2 Nachkommastellen)`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Berechne den St\u00fcckpreis: A = ${preis1.toFixed(2)} \u00f7 ${menge1}, B = ${preis2.toFixed(2)} \u00f7 ${menge2}. W\u00e4hle den niedrigeren.`,
          explanation: `A: ${preis1.toFixed(2)} \u00f7 ${menge1} = ${einzelpreis1.toFixed(2)} \u20ac/St\u00fcck\nB: ${preis2.toFixed(2)} \u00f7 ${menge2} = ${einzelpreis2.toFixed(2)} \u20ac/St\u00fcck\nG\u00fcnstiger: ${answer.toFixed(2)} \u20ac/St\u00fcck`,
          difficulty: d,
          category: 'Konkret',
          estimatedSeconds: 55,
        };
      }
    }
  },
};
