import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Arithmetisches Mittel berechnen ─────────────────────────

function generateMittelwert(difficulty: 1 | 2 | 3): Exercise {
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 5 : 7;
  const maxVal = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 50;

  const werte: number[] = [];
  for (let i = 0; i < count; i++) {
    werte.push(randInt(1, maxVal));
  }

  const summe = werte.reduce((a, b) => a + b, 0);
  const mittel = Math.round((summe / count) * 100) / 100;

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: `Berechne das arithmetische Mittel der Werte: ${werte.join(', ')}. (Runde auf 2 Dezimalstellen)`,
    answerType: 'number',
    correctAnswer: mittel,
    tolerance: 0.01,
    hint: 'Arithmetisches Mittel = Summe aller Werte / Anzahl der Werte.',
    explanation: `Summe: ${werte.join(' + ')} = ${summe}. Mittelwert: ${summe} / ${count} = ${mittel}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 40 : 55,
    exerciseType: 'number-input',
  };
}

// ─── Median bestimmen ────────────────────────────────────────

function generateMedian(difficulty: 1 | 2 | 3): Exercise {
  // Ungerade Anzahl für einfacheren Median
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 5 : 7;
  const maxVal = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 50;

  const werte: number[] = [];
  for (let i = 0; i < count; i++) {
    werte.push(randInt(1, maxVal));
  }

  const unsortiert = [...werte];
  const sortiert = [...werte].sort((a, b) => a - b);
  const median = sortiert[Math.floor(count / 2)];

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: `Bestimme den Median der Werte: ${unsortiert.join(', ')}.`,
    answerType: 'number',
    correctAnswer: median,
    hint: 'Sortiere zuerst die Werte der Größe nach. Der Median ist der mittlere Wert.',
    explanation: `Sortiert: ${sortiert.join(', ')}. Der mittlere Wert (Position ${Math.floor(count / 2) + 1}) ist ${median}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 35 : 50,
    exerciseType: 'number-input',
  };
}

// ─── Median mit gerader Anzahl ───────────────────────────────

function generateMedianGerade(difficulty: 1 | 2 | 3): Exercise {
  const count = difficulty === 2 ? 4 : 6;
  const maxVal = difficulty === 2 ? 15 : 30;

  const werte: number[] = [];
  for (let i = 0; i < count; i++) {
    werte.push(randInt(1, maxVal));
  }

  const unsortiert = [...werte];
  const sortiert = [...werte].sort((a, b) => a - b);
  const mid = count / 2;
  const median = (sortiert[mid - 1] + sortiert[mid]) / 2;

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: `Bestimme den Median der Werte: ${unsortiert.join(', ')}.`,
    answerType: 'number',
    correctAnswer: median,
    tolerance: 0.01,
    hint: 'Bei gerader Anzahl ist der Median der Durchschnitt der beiden mittleren Werte.',
    explanation: `Sortiert: ${sortiert.join(', ')}. Mittlere Werte: ${sortiert[mid - 1]} und ${sortiert[mid]}. Median = (${sortiert[mid - 1]} + ${sortiert[mid]}) / 2 = ${median}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 40,
    exerciseType: 'number-input',
  };
}

// ─── Spannweite berechnen ────────────────────────────────────

function generateSpannweite(difficulty: 1 | 2 | 3): Exercise {
  const count = difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8;
  const maxVal = difficulty === 1 ? 15 : difficulty === 2 ? 30 : 50;

  const werte: number[] = [];
  for (let i = 0; i < count; i++) {
    werte.push(randInt(1, maxVal));
  }

  const min = Math.min(...werte);
  const max = Math.max(...werte);
  const spannweite = max - min;

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: `Berechne die Spannweite der Werte: ${werte.join(', ')}.`,
    answerType: 'number',
    correctAnswer: spannweite,
    hint: 'Spannweite = größter Wert − kleinster Wert.',
    explanation: `Maximum: ${max}, Minimum: ${min}. Spannweite = ${max} − ${min} = ${spannweite}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
  };
}

// ─── Häufigkeit bestimmen ────────────────────────────────────

function generateHaeufigkeit(difficulty: 1 | 2 | 3): Exercise {
  const noten = [1, 2, 3, 4, 5, 6];
  const count = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;

  const daten: number[] = [];
  for (let i = 0; i < count; i++) {
    daten.push(pick(noten));
  }

  const gesucht = pick(noten);
  const absolut = daten.filter(n => n === gesucht).length;

  if (difficulty <= 2) {
    // Absolute Häufigkeit
    return {
      id: genId('k6-stat'),
      topicId: 'k6-statistik',
      question: `Bei einer Klassenarbeit wurden folgende Noten vergeben:\n${daten.join(', ')}\nWie oft kommt die Note ${gesucht} vor? (Absolute Häufigkeit)`,
      answerType: 'number',
      correctAnswer: absolut,
      hint: 'Zähle, wie oft die gesuchte Note in der Liste vorkommt.',
      explanation: `Die Note ${gesucht} kommt ${absolut} mal vor.`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: difficulty === 1 ? 20 : 30,
      exerciseType: 'number-input',
    };
  } else {
    // Relative Häufigkeit
    const relativ = Math.round((absolut / count) * 100) / 100;
    return {
      id: genId('k6-stat'),
      topicId: 'k6-statistik',
      question: `Bei einer Klassenarbeit wurden folgende Noten vergeben:\n${daten.join(', ')}\nBerechne die relative Häufigkeit der Note ${gesucht}. (Runde auf 2 Dezimalstellen)`,
      answerType: 'number',
      correctAnswer: relativ,
      tolerance: 0.01,
      hint: 'Relative Häufigkeit = absolute Häufigkeit / Gesamtanzahl.',
      explanation: `Note ${gesucht} kommt ${absolut} mal vor. Relative Häufigkeit: ${absolut}/${count} = ${relativ}`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 45,
      exerciseType: 'number-input',
    };
  }
}

// ─── Diagramm ablesen (Balkendiagramm) ───────────────────────

function generateDiagrammAblesen(difficulty: 1 | 2 | 3): Exercise {
  const kategorien = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
  const count = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const selected = kategorien.slice(0, count);

  const maxVal = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 30;
  const chartData = selected.map(label => ({
    label,
    value: randInt(1, maxVal),
  }));

  const frageTyp = randInt(0, 2);

  if (frageTyp === 0) {
    // Welcher Tag hat den höchsten Wert?
    const maxEntry = chartData.reduce((a, b) => a.value > b.value ? a : b);
    const distractors = chartData.filter(e => e.label !== maxEntry.label).map(e => e.label);
    return {
      id: genId('k6-stat'),
      topicId: 'k6-statistik',
      question: `Laut Balkendiagramm: An welchem Tag wurden die meisten Bücher gelesen?\n${chartData.map(d => `${d.label}: ${d.value}`).join(', ')}`,
      answerType: 'multiple-choice',
      correctAnswer: maxEntry.label,
      distractors: distractors.slice(0, 3),
      hint: 'Suche den größten Wert im Diagramm.',
      explanation: `${maxEntry.label} hat den höchsten Wert (${maxEntry.value}).`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 15,
      exerciseType: 'multiple-choice',
      chartData,
      visualConfig: { type: 'pie-chart' as const, props: { segments: chartData.map(d => ({ label: d.label, value: d.value })), showLabels: true, showPercentages: true } },
    };
  } else if (frageTyp === 1) {
    // Summe aller Werte
    const summe = chartData.reduce((a, b) => a + b.value, 0);
    return {
      id: genId('k6-stat'),
      topicId: 'k6-statistik',
      question: `Wie viele Bücher wurden insgesamt gelesen?\n${chartData.map(d => `${d.label}: ${d.value}`).join(', ')}`,
      answerType: 'number',
      correctAnswer: summe,
      hint: 'Addiere alle Werte zusammen.',
      explanation: `${chartData.map(d => d.value).join(' + ')} = ${summe}`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
      chartData,
    };
  } else {
    // Differenz zwischen max und min
    const values = chartData.map(d => d.value);
    const diff = Math.max(...values) - Math.min(...values);
    return {
      id: genId('k6-stat'),
      topicId: 'k6-statistik',
      question: `Wie groß ist der Unterschied zwischen dem Tag mit den meisten und dem Tag mit den wenigsten gelesenen Büchern?\n${chartData.map(d => `${d.label}: ${d.value}`).join(', ')}`,
      answerType: 'number',
      correctAnswer: diff,
      hint: 'Finde den größten und den kleinsten Wert und berechne die Differenz.',
      explanation: `Maximum: ${Math.max(...values)}, Minimum: ${Math.min(...values)}. Unterschied: ${diff}`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 25,
      exerciseType: 'number-input',
      chartData,
    };
  }
}

// ─── Begriffe zuordnen (MC) ─────────────────────────────────

function generateBegriffeMC(difficulty: 1 | 2 | 3): Exercise {
  const begriffe: { frage: string; antwort: string; falsch: string[] }[] = [
    { frage: 'Welcher statistische Kennwert beschreibt den Durchschnitt aller Werte?', antwort: 'Arithmetisches Mittel', falsch: ['Median', 'Spannweite', 'Modus'] },
    { frage: 'Welcher Kennwert ist der mittlere Wert einer sortierten Datenreihe?', antwort: 'Median', falsch: ['Arithmetisches Mittel', 'Spannweite', 'Modus'] },
    { frage: 'Wie heißt die Differenz zwischen dem größten und kleinsten Wert?', antwort: 'Spannweite', falsch: ['Median', 'Arithmetisches Mittel', 'Varianz'] },
    { frage: 'Welcher Wert kommt in einer Datenreihe am häufigsten vor?', antwort: 'Modus', falsch: ['Median', 'Spannweite', 'Arithmetisches Mittel'] },
    { frage: 'Wie heißt die Anzahl, wie oft ein Wert vorkommt?', antwort: 'Absolute Häufigkeit', falsch: ['Relative Häufigkeit', 'Median', 'Spannweite'] },
  ];

  const pool = difficulty === 1 ? begriffe.slice(0, 3) : begriffe;
  const chosen = pick(pool);

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: chosen.frage,
    answerType: 'multiple-choice',
    correctAnswer: chosen.antwort,
    distractors: chosen.falsch,
    hint: 'Erinnere dich an die Definitionen der statistischen Kennwerte.',
    explanation: `Die richtige Antwort ist: ${chosen.antwort}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'multiple-choice',
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Das arithmetische Mittel von 2, 4, 6 ist 4.', wahr: true },
    { text: 'Der Median von 1, 3, 5, 7, 9 ist 5.', wahr: true },
    { text: 'Die Spannweite kann negativ sein.', wahr: false },
    { text: 'Bei einer ungeraden Anzahl von Werten ist der Median immer eine ganze Zahl.', wahr: false },
    { text: 'Das arithmetische Mittel kann größer als der größte Wert sein.', wahr: false },
    { text: 'Die relative Häufigkeit liegt immer zwischen 0 und 1.', wahr: true },
    { text: 'Ein Kreisdiagramm zeigt Anteile am Ganzen.', wahr: true },
    { text: 'Der Median und das arithmetische Mittel sind immer gleich.', wahr: false },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 3) : difficulty === 2 ? aussagen.slice(0, 6) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-stat'),
    topicId: 'k6-statistik',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Überprüfe die Aussage anhand der Definition oder mit einem Gegenbeispiel.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-statistik',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateMittelwert, generateMedian, generateSpannweite, generateHaeufigkeit, generateDiagrammAblesen, generateBegriffeMC, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateMittelwert, generateMedian, generateMedianGerade, generateSpannweite, generateHaeufigkeit, generateDiagrammAblesen, generateBegriffeMC, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateMittelwert, generateMedian, generateMedianGerade, generateSpannweite, generateHaeufigkeit, generateDiagrammAblesen, generateBegriffeMC, generateTrueFalse]);
      return gen(d);
    }
  },
};
