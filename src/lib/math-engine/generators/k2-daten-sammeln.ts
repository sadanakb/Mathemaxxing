import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-daten-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type ChartTheme = { title: string; labels: string[] };

const THEMES: ChartTheme[] = [
  { title: 'Lieblingsfarben der Klasse', labels: ['Rot', 'Blau', 'Grün', 'Gelb'] },
  { title: 'Lieblingstiere der Klasse', labels: ['Hund', 'Katze', 'Pferd', 'Hamster'] },
  { title: 'Lieblingsobst der Klasse', labels: ['Apfel', 'Banane', 'Erdbeere', 'Kirsche'] },
  { title: 'Lieblingssport der Klasse', labels: ['Fußball', 'Schwimmen', 'Turnen', 'Radfahren'] },
];

function generateChartData(labels: string[]): { label: string; value: number }[] {
  return labels.map(label => ({ label, value: randInt(2, 12) }));
}

export const template: ExerciseTemplate = {
  topicId: 'k2-daten-sammeln',
  generate(difficulty = 1): Exercise {
    const theme = THEMES[randInt(0, THEMES.length - 1)];
    const data = generateChartData(theme.labels);

    if (difficulty === 1) {
      // "Wie viele Kinder mögen X?" — read one bar
      const targetIdx = randInt(0, data.length - 1);
      const target = data[targetIdx];

      return {
        id: genId(),
        topicId: 'k2-daten-sammeln',
        question: `${theme.title}: Wie viele Kinder mögen ${target.label}?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        correctAnswer: target.value,
        chartData: data,
        hint: `Schau auf den Balken für "${target.label}" und lies die Höhe ab.`,
        explanation: `${target.value} Kinder mögen ${target.label}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // "Welches X ist am beliebtesten?"
      const maxValue = Math.max(...data.map(d => d.value));
      const maxItem = data.find(d => d.value === maxValue)!;

      const options = data.map(d => d.label).sort(() => Math.random() - 0.5);

      return {
        id: genId(),
        topicId: 'k2-daten-sammeln',
        question: `${theme.title}: Was ist am beliebtesten?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: maxItem.label,
        distractors: data.filter(d => d.label !== maxItem.label).map(d => d.label),
        options,
        correctOptions: [maxItem.label],
        chartData: data,
        hint: 'Der höchste Balken zeigt das Beliebteste.',
        explanation: `${maxItem.label} ist am beliebtesten mit ${maxItem.value} Stimmen.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // Difficulty 3: "Wie viele Kinder haben insgesamt abgestimmt?" or difference
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Total
      const total = data.reduce((sum, d) => sum + d.value, 0);

      return {
        id: genId(),
        topicId: 'k2-daten-sammeln',
        question: `${theme.title}: Wie viele Kinder haben insgesamt abgestimmt?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        correctAnswer: total,
        chartData: data,
        hint: `Zähle alle Balken zusammen: ${data.map(d => d.value).join(' + ')}.`,
        explanation: `${data.map(d => `${d.label}: ${d.value}`).join(', ')}. Insgesamt: ${total} Kinder.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
      };
    }

    // Difference between most and least popular
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const most = sorted[0];
    const least = sorted[sorted.length - 1];
    const diff = most.value - least.value;

    return {
      id: genId(),
      topicId: 'k2-daten-sammeln',
      question: `${theme.title}: Wie viele Kinder mehr mögen ${most.label} als ${least.label}?`,
      answerType: 'number',
      exerciseType: 'bar-chart-read',
      correctAnswer: diff,
      chartData: data,
      hint: `Lies beide Werte ab und rechne die Differenz: ${most.value} - ${least.value}.`,
      explanation: `${most.label}: ${most.value}, ${least.label}: ${least.value}. Unterschied: ${most.value} - ${least.value} = ${diff}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 30,
    };
  },
};
