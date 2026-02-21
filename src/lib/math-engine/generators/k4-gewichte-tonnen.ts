import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatDE(n: number): string {
  return n.toLocaleString('de-DE');
}

/**
 * k4-gewichte-tonnen — Gewichte: Tonnen, kg, g
 *
 * Difficulty 1: Einfache Umrechnungen kg↔g (number-input)
 * Difficulty 2: Gewichte ordnen (drag-sort), Umrechnung mit Tonnen (number-input)
 * Difficulty 3: true-false Vergleiche, gemischte Einheiten
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-gewichte-tonnen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Einfache Umrechnung kg → g oder g → kg
      const toGram = randInt(0, 1) === 0;

      if (toGram) {
        const kg = randInt(1, 20);
        const g = kg * 1000;

        return {
          id: genId('k4-gew'),
          topicId: 'k4-gewichte-tonnen',
          question: `Wie viel Gramm sind ${kg} kg?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: g,
          hint: '1 kg = 1.000 g',
          explanation: `${kg} kg × 1.000 = ${formatDE(g)} g.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      const g = randInt(1, 10) * 1000;
      const kg = g / 1000;

      return {
        id: genId('k4-gew'),
        topicId: 'k4-gewichte-tonnen',
        question: `Wie viel Kilogramm sind ${formatDE(g)} g?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: kg,
        hint: '1.000 g = 1 kg',
        explanation: `${formatDE(g)} g ÷ 1.000 = ${kg} kg.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Umrechnung mit Tonnen
        const toKg = randInt(0, 1) === 0;

        if (toKg) {
          const t = randInt(1, 10);
          const kg = t * 1000;

          return {
            id: genId('k4-gew'),
            topicId: 'k4-gewichte-tonnen',
            question: `Wie viel Kilogramm sind ${t} Tonnen?`,
            answerType: 'number',
            exerciseType: 'number-input',
            correctAnswer: kg,
            hint: '1 Tonne = 1.000 kg',
            explanation: `${t} t × 1.000 = ${formatDE(kg)} kg.`,
            difficulty,
            category: 'Abstrakt',
            estimatedSeconds: 15,
          };
        }

        const kg = randInt(1, 8) * 1000;
        const t = kg / 1000;

        return {
          id: genId('k4-gew'),
          topicId: 'k4-gewichte-tonnen',
          question: `Wie viel Tonnen sind ${formatDE(kg)} kg?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: t,
          hint: '1.000 kg = 1 Tonne',
          explanation: `${formatDE(kg)} kg ÷ 1.000 = ${t} t.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      // drag-sort: Gewichte ordnen (gemischte Einheiten)
      const gewichte: { label: string; gramm: number }[] = [
        { label: `${randInt(100, 900)} g`, gramm: 0 },
        { label: `${randInt(1, 5)} kg`, gramm: 0 },
        { label: `${randInt(1, 3)} kg ${randInt(100, 900)} g`, gramm: 0 },
        { label: `${randInt(6, 20)} kg`, gramm: 0 },
      ];
      // Calculate gram values
      gewichte[0].gramm = parseInt(gewichte[0].label);
      gewichte[1].gramm = parseInt(gewichte[1].label) * 1000;
      const kg3Parts = gewichte[2].label.match(/(\d+) kg (\d+) g/);
      if (kg3Parts) {
        gewichte[2].gramm = parseInt(kg3Parts[1]) * 1000 + parseInt(kg3Parts[2]);
      }
      gewichte[3].gramm = parseInt(gewichte[3].label) * 1000;

      const sorted = [...gewichte].sort((a, b) => a.gramm - b.gramm);
      const shuffled = shuffle(gewichte);

      return {
        id: genId('k4-gew'),
        topicId: 'k4-gewichte-tonnen',
        question: 'Ordne die Gewichte von leicht nach schwer.',
        answerType: 'drag-drop',
        exerciseType: 'drag-sort',
        items: shuffled.map(g => g.label),
        correctAnswer: sorted.map(g => g.label).join(', '),
        hint: 'Rechne alle Gewichte in Gramm um, dann vergleiche.',
        explanation: `Richtige Reihenfolge: ${sorted.map(g => `${g.label} (${formatDE(g.gramm)} g)`).join(' < ')}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    // difficulty === 3: true-false Vergleiche
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Vergleich: 3 kg ? 2.500 g
      const kg = randInt(1, 8);
      const g = randInt(500, 9500);
      const gStep = Math.round(g / 500) * 500; // Runde auf 500g
      const kgInG = kg * 1000;
      const claimGreater = randInt(0, 1) === 0;
      const isTrue = claimGreater ? kgInG > gStep : kgInG < gStep;

      return {
        id: genId('k4-gew'),
        topicId: 'k4-gewichte-tonnen',
        question: `Stimmt es? ${kg} kg ist ${claimGreater ? 'schwerer' : 'leichter'} als ${formatDE(gStep)} g.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: `Rechne ${kg} kg in Gramm um: ${kg} × 1.000 = ${formatDE(kgInG)} g.`,
        explanation: `${kg} kg = ${formatDE(kgInG)} g. ${formatDE(kgInG)} g ${kgInG > gStep ? '>' : kgInG < gStep ? '<' : '='} ${formatDE(gStep)} g. Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (variant === 1) {
      // Tonnen-Vergleich
      const t = randInt(1, 5);
      const kg = randInt(500, 6000);
      const kgStep = Math.round(kg / 500) * 500;
      const tInKg = t * 1000;
      const claimGreater = randInt(0, 1) === 0;
      const isTrue = claimGreater ? tInKg > kgStep : tInKg < kgStep;

      return {
        id: genId('k4-gew'),
        topicId: 'k4-gewichte-tonnen',
        question: `Stimmt es? ${t} Tonne${t > 1 ? 'n' : ''} ist ${claimGreater ? 'schwerer' : 'leichter'} als ${formatDE(kgStep)} kg.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: `1 Tonne = 1.000 kg. Also ${t} t = ${formatDE(tInKg)} kg.`,
        explanation: `${t} t = ${formatDE(tInKg)} kg. ${formatDE(tInKg)} kg ${tInKg > kgStep ? '>' : tInKg < kgStep ? '<' : '='} ${formatDE(kgStep)} kg. → ${isTrue ? 'Wahr' : 'Falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // Alltagsgewicht schätzen
    const gegenstaende: { name: string; gewichtLabel: string; grammWert: number }[] = [
      { name: 'ein Auto', gewichtLabel: '1.500 kg', grammWert: 1_500_000 },
      { name: 'ein Elefant', gewichtLabel: '5 Tonnen', grammWert: 5_000_000 },
      { name: 'eine Tafel Schokolade', gewichtLabel: '100 g', grammWert: 100 },
      { name: 'ein Sack Kartoffeln', gewichtLabel: '10 kg', grammWert: 10_000 },
      { name: 'ein Schulranzen', gewichtLabel: '5 kg', grammWert: 5_000 },
    ];
    const g1 = gegenstaende[randInt(0, gegenstaende.length - 1)];
    let g2 = g1;
    while (g2 === g1) g2 = gegenstaende[randInt(0, gegenstaende.length - 1)];

    const claimHeavier = randInt(0, 1) === 0;
    const isTrue = claimHeavier ? g1.grammWert > g2.grammWert : g1.grammWert < g2.grammWert;

    return {
      id: genId('k4-gew'),
      topicId: 'k4-gewichte-tonnen',
      question: `Stimmt es? ${g1.name} (ca. ${g1.gewichtLabel}) ist ${claimHeavier ? 'schwerer' : 'leichter'} als ${g2.name} (ca. ${g2.gewichtLabel}).`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: isTrue ? 'wahr' : 'falsch',
      hint: 'Vergleiche die Gewichtsangaben. Achte auf die Einheiten!',
      explanation: `${g1.name}: ca. ${g1.gewichtLabel}. ${g2.name}: ca. ${g2.gewichtLabel}. → ${isTrue ? 'Wahr' : 'Falsch'}.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
    };
  },
};
