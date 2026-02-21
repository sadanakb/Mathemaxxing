import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-zuord-real-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-zuordnungen-real',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Einfache proportionale Zuordnung mit Alltagsbezug
      const contexts = [
        { item: 'Brötchen', einheit: 'Stück', preisEinheit: 'kosten', currency: '€' },
        { item: 'Äpfel', einheit: 'kg', preisEinheit: 'kosten', currency: '€' },
        { item: 'Benzin', einheit: 'Liter', preisEinheit: 'kosten', currency: '€' },
      ];
      const ctx = contexts[randInt(0, contexts.length - 1)];
      const preis = randInt(1, 5);
      const menge1 = randInt(2, 6);
      const kosten1 = menge1 * preis;
      const menge2 = randInt(3, 10);
      const answer = menge2 * preis;

      return {
        id: genId(),
        topicId: 'k7-zuordnungen-real',
        question: `${menge1} ${ctx.einheit} ${ctx.item} ${ctx.preisEinheit} ${kosten1} ${ctx.currency}. Wie viel ${ctx.preisEinheit} ${menge2} ${ctx.einheit}?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Berechne den Preis pro ${ctx.einheit}: ${kosten1} ÷ ${menge1} = ${preis} ${ctx.currency}. Dann: ${preis} × ${menge2}.`,
        explanation: `Preis pro ${ctx.einheit} = ${kosten1} ÷ ${menge1} = ${preis} ${ctx.currency}\n${menge2} ${ctx.einheit} kosten: ${preis} × ${menge2} = ${answer} ${ctx.currency}`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 25,
      };
    } else if (d === 2) {
      // Tabelle vervollständigen
      const factor = randInt(2, 8);
      const xValues = [1, randInt(2, 5), randInt(6, 10)];
      const missingIdx = randInt(0, 2);
      const answer = xValues[missingIdx] * factor;

      const tableRows = xValues.map((x, i) => {
        return i === missingIdx
          ? `x = ${x}, y = ?`
          : `x = ${x}, y = ${x * factor}`;
      });

      return {
        id: genId(),
        topicId: 'k7-zuordnungen-real',
        question: `Proportionale Zuordnung. Vervollständige die Tabelle:\n${tableRows.join(' | ')}\nWie groß ist y bei x = ${xValues[missingIdx]}?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Bestimme den Faktor aus einem bekannten Paar. z.B. y/x = ${xValues[missingIdx === 0 ? 1 : 0] * factor}/${xValues[missingIdx === 0 ? 1 : 0]} = ${factor}.`,
        explanation: `Faktor = ${factor}. Also: y = ${factor} × ${xValues[missingIdx]} = ${answer}`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 40,
      };
    } else {
      // Sachaufgabe: Rezept umrechnen
      const personen1 = [2, 4][randInt(0, 1)];
      const personen2 = randInt(3, 8);
      const zutaten = [
        { name: 'Mehl', menge: randInt(2, 5) * 100, einheit: 'g' },
        { name: 'Zucker', menge: randInt(1, 3) * 50, einheit: 'g' },
        { name: 'Milch', menge: randInt(2, 5) * 100, einheit: 'ml' },
      ];
      const zutat = zutaten[randInt(0, zutaten.length - 1)];
      const mengeProPerson = zutat.menge / personen1;
      const answer = mengeProPerson * personen2;

      return {
        id: genId(),
        topicId: 'k7-zuordnungen-real',
        question: `Ein Rezept für ${personen1} Personen braucht ${zutat.menge} ${zutat.einheit} ${zutat.name}. Wie viel ${zutat.name} brauchst du für ${personen2} Personen?`,
        answerType: 'number',
        correctAnswer: answer,
        hint: `Berechne die Menge pro Person: ${zutat.menge} ÷ ${personen1} = ${mengeProPerson} ${zutat.einheit}. Dann für ${personen2} Personen hochrechnen.`,
        explanation: `${zutat.menge} ${zutat.einheit} ÷ ${personen1} = ${mengeProPerson} ${zutat.einheit} pro Person\n${mengeProPerson} × ${personen2} = ${answer} ${zutat.einheit}`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 50,
      };
    }
  },
};
