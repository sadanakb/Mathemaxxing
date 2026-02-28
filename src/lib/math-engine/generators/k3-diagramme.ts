import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const tierNamen = ['Hunde', 'Katzen', 'Vögel', 'Fische', 'Hamster'];
const obstNamen = ['Äpfel', 'Birnen', 'Bananen', 'Orangen', 'Trauben'];
const wochentage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

/**
 * k3-diagramme — Diagramme lesen und erstellen
 *
 * Difficulty 1: Einfaches Balkendiagramm ablesen (bar-chart-read)
 * Difficulty 2: Werte vergleichen, Summe berechnen
 * Difficulty 3: Differenz, fehlenden Wert berechnen
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-diagramme',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Einfaches Ablesen: Welcher Balken ist am höchsten?
      const labels = tierNamen.slice(0, 4);
      const data = labels.map(label => ({ label, value: randInt(2, 15) }));
      const maxItem = data.reduce((a, b) => a.value > b.value ? a : b);
      const distractors = data
        .filter(d => d.label !== maxItem.label)
        .map(d => d.label);

      return {
        id: genId('k3-diag'),
        topicId: 'k3-diagramme',
        question: `Lieblingstiere der Klasse 3a:\nWelches Tier wurde am häufigsten genannt?`,
        answerType: 'multiple-choice',
        exerciseType: 'bar-chart-read',
        correctAnswer: maxItem.label,
        distractors,
        chartData: data,
        hint: 'Suche den höchsten Balken im Diagramm.',
        explanation: `${maxItem.label} wurde mit ${maxItem.value} Stimmen am häufigsten genannt.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
        visualConfig: {
          type: 'tally' as const,
          props: { items: data.map(d => ({ label: d.label, count: d.value })) },
        },
      };
    }

    if (difficulty === 2) {
      // Summe berechnen
      const labels = obstNamen.slice(0, 4);
      const data = labels.map(label => ({ label, value: randInt(3, 12) }));
      const total = data.reduce((sum, d) => sum + d.value, 0);

      return {
        id: genId('k3-diag'),
        topicId: 'k3-diagramme',
        question: `Obstverkauf am Schulkiosk:\n${data.map(d => `${d.label}: ${d.value}`).join(', ')}\nWie viel Obst wurde insgesamt verkauft?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        correctAnswer: total,
        chartData: data,
        hint: 'Addiere alle Werte zusammen.',
        explanation: `${data.map(d => d.value).join(' + ')} = ${total} Stück insgesamt.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 30,
        visualConfig: { type: 'pie-chart' as const, props: { segments: data.map(d => ({ label: d.label, value: d.value })), showLabels: true, showPercentages: true } },
      };
    }

    // Difficulty 3: variant 0 = Differenz, 1 = fehlender Wert, 2 = bar-chart-read (specific value), 3 = estimation (most)
    const variant = randInt(0, 3);

    if (variant === 0) {
      // Differenz
      const labels = wochentage.slice(0, 5);
      const data = labels.map(label => ({ label, value: randInt(5, 25) }));
      const maxItem = data.reduce((a, b) => a.value > b.value ? a : b);
      const minItem = data.reduce((a, b) => a.value < b.value ? a : b);
      const diff = maxItem.value - minItem.value;

      return {
        id: genId('k3-diag'),
        topicId: 'k3-diagramme',
        question: `Besucher pro Tag in der Bücherei:\n${data.map(d => `${d.label}: ${d.value}`).join(', ')}\nWie groß ist der Unterschied zwischen dem Tag mit den meisten und dem mit den wenigsten Besuchern?`,
        answerType: 'number',
        exerciseType: 'bar-chart-read',
        correctAnswer: diff,
        chartData: data,
        hint: `Finde den höchsten und niedrigsten Wert und berechne die Differenz.`,
        explanation: `Höchster Wert: ${maxItem.value} (${maxItem.label}), niedrigster: ${minItem.value} (${minItem.label}). Unterschied: ${maxItem.value} − ${minItem.value} = ${diff}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }

    if (variant === 2) {
      // bar-chart-read: read a specific value from the bar chart
      const labels3 = wochentage.slice(0, 5);
      const data3 = labels3.map(label => ({ label, value: randInt(4, 30) }));
      const targetIdx = randInt(0, labels3.length - 1);
      const targetItem = data3[targetIdx];
      const distractors3 = data3
        .filter(d => d.label !== targetItem.label)
        .map(d => d.value)
        .slice(0, 3);
      return {
        id: genId('k3-diag'),
        topicId: 'k3-diagramme',
        question: `Besucher pro Tag in der Bücherei:\nWie viele Besucher kamen am ${targetItem.label}?`,
        answerType: 'multiple-choice',
        exerciseType: 'bar-chart-read',
        correctAnswer: targetItem.value,
        distractors: distractors3,
        chartData: data3,
        hint: `Suche den Balken für ${targetItem.label} und lies den Wert ab.`,
        explanation: `Am ${targetItem.label} kamen ${targetItem.value} Besucher.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 25,
      };
    }

    if (variant === 3) {
      // estimation: which category has the most?
      const labels4 = obstNamen.slice(0, 4);
      const data4 = labels4.map(label => ({ label, value: randInt(3, 20) }));
      const maxItem4 = data4.reduce((a, b) => a.value > b.value ? a : b);
      const distractors4 = data4
        .filter(d => d.label !== maxItem4.label)
        .map(d => d.label);
      return {
        id: genId('k3-diag'),
        topicId: 'k3-diagramme',
        question: `Obstverkauf am Kiosk:\n${data4.map(d => `${d.label}: ${d.value}`).join(', ')}\nVon welchem Obst wurde am meisten verkauft? Schätze zuerst, bevor du nachschaust!`,
        answerType: 'multiple-choice',
        exerciseType: 'estimation',
        correctAnswer: maxItem4.label,
        distractors: distractors4,
        chartData: data4,
        hint: 'Vergleiche die Balken — welcher ist am höchsten?',
        explanation: `${maxItem4.label} wurde mit ${maxItem4.value} Stück am häufigsten verkauft.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
      };
    }

    // variant === 1: Fehlender Wert: Gesamtzahl gegeben
    const labels = obstNamen.slice(0, 3);
    const values = labels.map(() => randInt(4, 15));
    const total = values.reduce((s, v) => s + v, 0) + randInt(3, 12);
    const hiddenIdx = randInt(0, labels.length - 1);
    const hiddenValue = total - values.reduce((s, v) => s + v, 0);
    // Korrigiere, damit es aufgeht
    const actualValues = [...values];
    actualValues[hiddenIdx] = hiddenValue;
    const actualTotal = actualValues.reduce((s, v) => s + v, 0);
    const data = labels.map((label, i) => ({ label, value: actualValues[i] }));

    return {
      id: genId('k3-diag'),
      topicId: 'k3-diagramme',
      question: `Insgesamt wurden ${actualTotal} Stücke Obst verkauft.\n${data.filter((_, i) => i !== hiddenIdx).map(d => `${d.label}: ${d.value}`).join(', ')}\nWie viele ${labels[hiddenIdx]} wurden verkauft?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: hiddenValue,
      chartData: data,
      hint: `Addiere die bekannten Werte und ziehe sie von ${actualTotal} ab.`,
      explanation: `${actualTotal} − ${data.filter((_, i) => i !== hiddenIdx).map(d => d.value).join(' − ')} = ${hiddenValue} ${labels[hiddenIdx]}.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 40,
    };
  },
};
