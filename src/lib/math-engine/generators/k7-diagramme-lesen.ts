import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const categories = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const subjects = ['Mathe', 'Deutsch', 'Englisch', 'Sport'];
const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni'];

export const template: ExerciseTemplate = {
  topicId: 'k7-diagramme-lesen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Find max in bar chart (5 days)
      const values = categories.map(cat => ({ cat, val: randInt(5, 30) }));
      const maxItem = values.reduce((a, b) => a.val > b.val ? a : b);
      const distractors = values
        .filter(v => v.cat !== maxItem.cat)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.cat);

      const chartDesc = values.map(v => `${v.cat}: ${v.val}`).join(', ');
      return {
        id: genId('k7-diag'),
        topicId: 'k7-diagramme-lesen',
        question: `Balkendiagramm – Schüleranzahl pro Tag:\n${chartDesc}\nWelcher Tag hat die meisten Schüler?`,
        answerType: 'multiple-choice',
        correctAnswer: maxItem.cat,
        distractors,
        hint: 'Suche den höchsten Balken.',
        explanation: `${maxItem.cat} hat mit ${maxItem.val} Schülern den höchsten Wert.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    } else if (difficulty === 2) {
      // Find total or difference
      const vals = subjects.map(s => ({ s, v: randInt(10, 50) }));
      const maxItem = vals.reduce((a, b) => a.v > b.v ? a : b);
      const minItem = vals.reduce((a, b) => a.v < b.v ? a : b);
      const diff = maxItem.v - minItem.v;
      const chartDesc = vals.map(v => `${v.s}: ${v.v}`).join(', ');
      return {
        id: genId('k7-diag'),
        topicId: 'k7-diagramme-lesen',
        question: `Balkendiagramm – Testergebnisse nach Fach:\n${chartDesc}\nWie groß ist der Unterschied zwischen dem besten und schlechtesten Ergebnis?`,
        answerType: 'number',
        correctAnswer: diff,
        hint: `Bester Wert: ${maxItem.v} (${maxItem.s}), Schlechtester: ${minItem.v} (${minItem.s})`,
        explanation: `${maxItem.v} − ${minItem.v} = ${diff}`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 45,
      };
    } else {
      // Percentage of total
      const vals = months.slice(0, 4).map(m => ({ m, v: randInt(20, 80) }));
      const total = vals.reduce((sum, v) => sum + v.v, 0);
      const targetIdx = randInt(0, vals.length - 1);
      const target = vals[targetIdx];
      const pct = Math.round((target.v / total) * 100);
      const chartDesc = vals.map(v => `${v.m}: ${v.v}`).join(', ');
      return {
        id: genId('k7-diag'),
        topicId: 'k7-diagramme-lesen',
        question: `Balkendiagramm – Verkäufe:\n${chartDesc}\nGesamtverkäufe: ${total}. Wie viel Prozent entfallen auf ${target.m} (gerundet)?`,
        answerType: 'number',
        correctAnswer: pct,
        hint: `Prozent = (${target.v} ÷ ${total}) × 100`,
        explanation: `(${target.v} ÷ ${total}) × 100 ≈ ${pct}%`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 55,
      };
    }
  },
};
