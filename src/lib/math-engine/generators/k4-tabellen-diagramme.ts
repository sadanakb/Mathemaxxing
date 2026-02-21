import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const themen: { kontext: string; labels: string[] }[] = [
  { kontext: 'Lieblingsfarben der Klasse', labels: ['Rot', 'Blau', 'Grün', 'Gelb', 'Lila'] },
  { kontext: 'Lieblingssportarten', labels: ['Fußball', 'Schwimmen', 'Turnen', 'Basketball', 'Tennis'] },
  { kontext: 'Lieblingshaustiere', labels: ['Hund', 'Katze', 'Hamster', 'Fisch', 'Vogel'] },
  { kontext: 'Lieblingsobst', labels: ['Apfel', 'Banane', 'Erdbeere', 'Orange', 'Kirsche'] },
  { kontext: 'Transportmittel zur Schule', labels: ['Bus', 'Auto', 'Fahrrad', 'zu Fuß', 'Roller'] },
];

/**
 * k4-tabellen-diagramme — Tabellen und Diagramme (Säulen, Kreis)
 *
 * Difficulty 1: Säulendiagramm ablesen (bar-chart-read)
 * Difficulty 2: Tabelle ausfüllen (fill-table)
 * Difficulty 3: Kombination — Diagramm lesen + rechnen (bar-chart-read)
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-tabellen-diagramme',
  generate(difficulty = 1): Exercise {
    const thema = themen[randInt(0, themen.length - 1)];
    const labelCount = difficulty === 1 ? 4 : 5;
    const labels = thema.labels.slice(0, labelCount);
    const data = labels.map(label => ({
      label,
      value: randInt(2, difficulty === 1 ? 10 : 15),
    }));

    if (difficulty === 1) {
      // Säulendiagramm ablesen: Wie viele Schüler wählten X?
      const targetIdx = randInt(0, data.length - 1);
      const target = data[targetIdx];

      return {
        id: genId('k4-diag'),
        topicId: 'k4-tabellen-diagramme',
        question: `Das Säulendiagramm zeigt die ${thema.kontext}. Wie viele Stimmen hat „${target.label}"?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        chartData: data,
        correctAnswer: target.value,
        hint: 'Lies den Wert am oberen Ende der Säule ab.',
        explanation: `Die Säule für „${target.label}" zeigt ${target.value}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Tabelle ausfüllen: Eine Zelle fehlt
      const gesamt = data.reduce((sum, d) => sum + d.value, 0);
      const hideIdx = randInt(0, data.length - 1);
      const hiddenValue = data[hideIdx].value;

      // Build table rows with one null (the hidden value)
      const headers = ['Kategorie', 'Anzahl'];
      const rows: (string | null)[][] = data.map((d, i) => [
        d.label,
        i === hideIdx ? null : String(d.value),
      ]);
      // Add total row
      rows.push(['Gesamt', String(gesamt)]);

      const correctRows: string[][] = data.map(d => [d.label, String(d.value)]);
      correctRows.push(['Gesamt', String(gesamt)]);

      return {
        id: genId('k4-diag'),
        topicId: 'k4-tabellen-diagramme',
        question: `Die Tabelle zeigt die ${thema.kontext}. Die Gesamtzahl ist ${gesamt}. Welche Zahl fehlt bei „${data[hideIdx].label}"?`,
        answerType: 'number',
        exerciseType: 'fill-table',
        tableConfig: { headers, rows, correctRows },
        correctAnswer: hiddenValue,
        hint: `Addiere alle bekannten Werte und ziehe sie von ${gesamt} ab.`,
        explanation: `Bekannte Werte: ${data.filter((_, i) => i !== hideIdx).map(d => d.value).join(' + ')} = ${gesamt - hiddenValue}. Fehlender Wert: ${gesamt} − ${gesamt - hiddenValue} = ${hiddenValue}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }

    // difficulty === 3: Diagramm lesen + rechnen
    const variant = randInt(0, 2);
    const gesamt = data.reduce((sum, d) => sum + d.value, 0);

    if (variant === 0) {
      // Wie viele Stimmen insgesamt?
      return {
        id: genId('k4-diag'),
        topicId: 'k4-tabellen-diagramme',
        question: `Das Diagramm zeigt die ${thema.kontext}. Wie viele Stimmen wurden insgesamt abgegeben?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        chartData: data,
        correctAnswer: gesamt,
        hint: 'Addiere alle Säulenwerte zusammen.',
        explanation: `${data.map(d => d.value).join(' + ')} = ${gesamt} Stimmen insgesamt.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    if (variant === 1) {
      // Unterschied zwischen dem beliebtesten und unbeliebtesten
      const sorted = [...data].sort((a, b) => b.value - a.value);
      const max = sorted[0];
      const min = sorted[sorted.length - 1];
      const diff = max.value - min.value;

      return {
        id: genId('k4-diag'),
        topicId: 'k4-tabellen-diagramme',
        question: `Das Diagramm zeigt die ${thema.kontext}. Wie groß ist der Unterschied zwischen dem meisten und dem wenigsten Stimmen?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        chartData: data,
        correctAnswer: diff,
        hint: `Finde die höchste und niedrigste Säule. Berechne die Differenz.`,
        explanation: `Maximum: „${max.label}" mit ${max.value}. Minimum: „${min.label}" mit ${min.value}. Unterschied: ${max.value} − ${min.value} = ${diff}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    // Wie viel mehr hat A als B?
    const idxA = randInt(0, data.length - 1);
    let idxB = idxA;
    while (idxB === idxA) idxB = randInt(0, data.length - 1);
    const a = data[idxA];
    const b = data[idxB];
    const diff = Math.abs(a.value - b.value);

    return {
      id: genId('k4-diag'),
      topicId: 'k4-tabellen-diagramme',
      question: `Das Diagramm zeigt die ${thema.kontext}. Wie viel mehr Stimmen hat „${a.value >= b.value ? a.label : b.label}" als „${a.value >= b.value ? b.label : a.label}"?`,
      answerType: 'number',
      exerciseType: 'bar-chart-read',
      chartData: data,
      correctAnswer: diff,
      hint: 'Ziehe den kleineren Wert vom größeren ab.',
      explanation: `${Math.max(a.value, b.value)} − ${Math.min(a.value, b.value)} = ${diff}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 25,
    };
  },
};
