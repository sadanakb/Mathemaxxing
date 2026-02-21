import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const themen = [
  { context: 'Lieblingsfarben der Klasse', items: ['Rot', 'Blau', 'Grün', 'Gelb', 'Lila'] },
  { context: 'Lieblingssportarten', items: ['Fußball', 'Basketball', 'Schwimmen', 'Tennis', 'Turnen'] },
  { context: 'Haustiere der Schüler', items: ['Hund', 'Katze', 'Hamster', 'Fisch', 'Vogel'] },
  { context: 'Lieblingsessen in der Mensa', items: ['Pizza', 'Nudeln', 'Schnitzel', 'Salat', 'Suppe'] },
  { context: 'Schulwege der Schüler', items: ['zu Fuß', 'Fahrrad', 'Bus', 'Auto', 'Roller'] },
];

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function mittelwert(arr: number[]): number {
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

export const template: ExerciseTemplate = {
  topicId: 'k5-daten-zufall',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Diagramm lesen: Welche Kategorie hat die meisten Stimmen?
      const thema = themen[randInt(0, themen.length - 1)];
      const count = d === 1 ? 3 : d === 2 ? 4 : 5;
      const items = thema.items.slice(0, count);
      const values = items.map(() => randInt(2, d === 1 ? 10 : d === 2 ? 15 : 25));
      // Make sure there's a unique maximum
      const maxVal = Math.max(...values);
      const maxIdx = values.indexOf(maxVal);
      // Ensure uniqueness
      for (let i = 0; i < values.length; i++) {
        if (i !== maxIdx && values[i] === maxVal) values[i] = maxVal - randInt(1, 3);
      }
      const correct = items[maxIdx];
      const distractors = items.filter((_, i) => i !== maxIdx);

      const dataStr = items.map((item, i) => `${item}: ${values[i]}`).join(', ');

      return {
        id: genId('k5-dat'),
        topicId: 'k5-daten-zufall',
        question: `${thema.context}: ${dataStr}. Welche Kategorie wurde am häufigsten genannt?`,
        answerType: 'multiple-choice',
        correctAnswer: correct,
        distractors: distractors.slice(0, 3),
        chartData: items.map((label, i) => ({ label, value: values[i] })),
        hint: 'Suche den größten Wert in der Auflistung.',
        explanation: `${correct} hat mit ${maxVal} Stimmen die meisten Nennungen.`,
        difficulty: d,
        category: 'Repräsentational',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 25 : 35,
        exerciseType: 'bar-chart-read',
      };
    }

    if (variant === 2) {
      // Mittelwert berechnen
      const count = d === 1 ? 3 : d === 2 ? 5 : 7;
      const maxVal = d === 1 ? 10 : d === 2 ? 20 : 50;

      // Generate values that produce a whole-number average
      let values: number[];
      do {
        values = Array.from({ length: count }, () => randInt(1, maxVal));
      } while (values.reduce((s, v) => s + v, 0) % count !== 0);

      const avg = mittelwert(values);
      const sum = values.reduce((s, v) => s + v, 0);

      const contexts = [
        `In ${count} Mathearbeiten hat Anna folgende Punkte erreicht`,
        `Die Temperaturen an ${count} Tagen waren`,
        `${count} Schüler haben folgende Körpergrößen in cm`,
      ];
      const ctx = contexts[randInt(0, contexts.length - 1)];

      return {
        id: genId('k5-dat'),
        topicId: 'k5-daten-zufall',
        question: `${ctx}: ${values.join(', ')}. Berechne den Mittelwert (Durchschnitt).`,
        answerType: 'number',
        correctAnswer: avg.toString(),
        hint: `Addiere alle Werte und teile durch die Anzahl (${count}).`,
        explanation: `Summe: ${values.join(' + ')} = ${sum}. Mittelwert: ${sum} \u00f7 ${count} = ${avg}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 25 : d === 2 ? 35 : 50,
        exerciseType: 'number-input',
      };
    }

    if (variant === 3) {
      // Median bestimmen
      const count = d === 1 ? 3 : d === 2 ? 5 : 7;
      const values = Array.from({ length: count }, () => randInt(1, d === 1 ? 10 : d === 2 ? 20 : 50));
      const sorted = [...values].sort((a, b) => a - b);
      const med = median(values);

      return {
        id: genId('k5-dat'),
        topicId: 'k5-daten-zufall',
        question: `Bestimme den Median der Zahlenreihe: ${values.join(', ')}`,
        answerType: 'number',
        correctAnswer: med.toString(),
        hint: `Sortiere die Zahlen zuerst der Größe nach. Der Median ist der mittlere Wert.`,
        explanation: `Sortiert: ${sorted.join(', ')}. Der Median (mittlerer Wert) ist ${med}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 45,
        exerciseType: 'number-input',
      };
    }

    if (variant === 4) {
      // Strichliste / Häufigkeiten: Wie viele insgesamt?
      const thema = themen[randInt(0, themen.length - 1)];
      const count = d === 1 ? 3 : d === 2 ? 4 : 5;
      const items = thema.items.slice(0, count);
      const values = items.map(() => randInt(2, d === 1 ? 8 : d === 2 ? 12 : 20));
      const total = values.reduce((s, v) => s + v, 0);

      const dataStr = items.map((item, i) => `${item}: ${values[i]}`).join(', ');

      return {
        id: genId('k5-dat'),
        topicId: 'k5-daten-zufall',
        question: `${thema.context}: ${dataStr}. Wie viele Schüler wurden insgesamt befragt?`,
        answerType: 'number',
        correctAnswer: total.toString(),
        chartData: items.map((label, i) => ({ label, value: values[i] })),
        hint: 'Addiere alle Häufigkeiten zusammen.',
        explanation: `${values.join(' + ')} = ${total}. Insgesamt wurden ${total} Schüler befragt.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 35,
        exerciseType: 'number-input',
      };
    }

    // variant 5: Spannweite berechnen (größter - kleinster Wert)
    const count = d === 1 ? 4 : d === 2 ? 6 : 8;
    const maxVal = d === 1 ? 15 : d === 2 ? 30 : 100;
    const values = Array.from({ length: count }, () => randInt(1, maxVal));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const spannweite = max - min;

    return {
      id: genId('k5-dat'),
      topicId: 'k5-daten-zufall',
      question: `Berechne die Spannweite der Datenreihe: ${values.join(', ')}`,
      answerType: 'number',
      correctAnswer: spannweite.toString(),
      hint: 'Die Spannweite ist die Differenz zwischen dem größten und dem kleinsten Wert.',
      explanation: `Größter Wert: ${max}, kleinster Wert: ${min}. Spannweite: ${max} - ${min} = ${spannweite}.`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
      exerciseType: 'number-input',
    };
  },
};
