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

// ─── Exercise variants ──────────────────────────────────────

function generateLaengenUmrechnung(difficulty: 1 | 2 | 3): Exercise {
  type Conversion = { von: string; nach: string; faktor: number; label: string };

  const easy: Conversion[] = [
    { von: 'cm', nach: 'mm', faktor: 10, label: 'cm → mm' },
    { von: 'm', nach: 'cm', faktor: 100, label: 'm → cm' },
  ];
  const medium: Conversion[] = [
    { von: 'km', nach: 'm', faktor: 1000, label: 'km → m' },
    { von: 'm', nach: 'mm', faktor: 1000, label: 'm → mm' },
  ];
  const hard: Conversion[] = [
    ...medium,
    { von: 'km', nach: 'cm', faktor: 100000, label: 'km → cm' },
  ];

  const pool = difficulty === 1 ? easy : difficulty === 2 ? medium : hard;
  const conv = pick(pool);
  const useDecimal = difficulty >= 2 && randInt(0, 1) === 1;
  const wert = useDecimal
    ? randInt(1, 9) + randInt(1, 9) / 10
    : randInt(1, difficulty === 1 ? 20 : 50);
  const antwort = Math.round(wert * conv.faktor * 100) / 100;
  const wertStr = useDecimal ? String(wert).replace('.', ',') : String(wert);

  return {
    id: genId('k5-gre'),
    topicId: 'k5-groessen-einheiten',
    question: `Wandle um: ${wertStr} ${conv.von} = ___ ${conv.nach}`,
    answerType: 'number',
    correctAnswer: antwort,
    hint: `1 ${conv.von} = ${conv.faktor} ${conv.nach}`,
    explanation: `${wertStr} ${conv.von} × ${conv.faktor} = ${antwort} ${conv.nach}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : difficulty === 2 ? 25 : 35,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'ruler' as const,
      props: { length: Math.min(wert, 30), unit: conv.von === 'mm' || conv.nach === 'mm' ? 'mm' as const : 'cm' as const, highlights: [wert] },
    },
  };
}

function generateGewichtUmrechnung(difficulty: 1 | 2 | 3): Exercise {
  type Conversion = { von: string; nach: string; faktor: number };

  const conversions: Conversion[] =
    difficulty === 1
      ? [{ von: 'kg', nach: 'g', faktor: 1000 }]
      : difficulty === 2
        ? [
            { von: 'kg', nach: 'g', faktor: 1000 },
            { von: 't', nach: 'kg', faktor: 1000 },
          ]
        : [
            { von: 'kg', nach: 'g', faktor: 1000 },
            { von: 't', nach: 'kg', faktor: 1000 },
            { von: 't', nach: 'g', faktor: 1000000 },
          ];

  const conv = pick(conversions);
  const useDecimal = difficulty >= 2 && randInt(0, 1) === 1;
  const wert = useDecimal
    ? randInt(1, 5) + randInt(1, 9) / 10
    : randInt(1, difficulty === 1 ? 10 : 25);
  const antwort = Math.round(wert * conv.faktor * 100) / 100;
  const wertStr = useDecimal ? String(wert).replace('.', ',') : String(wert);

  return {
    id: genId('k5-gre'),
    topicId: 'k5-groessen-einheiten',
    question: `Wie viel ${conv.nach} sind ${wertStr} ${conv.von}?`,
    answerType: 'number',
    correctAnswer: antwort,
    hint: `1 ${conv.von} = ${conv.faktor} ${conv.nach}`,
    explanation: `${wertStr} ${conv.von} = ${antwort} ${conv.nach}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 15 : 25,
    exerciseType: 'number-input',
    visualConfig: {
      type: 'scale' as const,
      props: { leftWeight: wert, rightWeight: antwort },
    },
  };
}

function generateSortierenNachGroesse(difficulty: 1 | 2 | 3): Exercise {
  // Ordne nach Größe (drag-sort) — values with different units
  type ValueWithUnit = { label: string; inBaseUnit: number };

  let items: ValueWithUnit[];
  if (difficulty === 1) {
    // Same unit category, simple
    const values = [randInt(100, 900), randInt(1, 9) * 1000, randInt(1000, 5000)];
    items = values.map(v => ({
      label: v >= 1000 ? `${v / 1000} kg` : `${v} g`,
      inBaseUnit: v,
    }));
  } else if (difficulty === 2) {
    items = [
      { label: `${randInt(200, 800)} g`, inBaseUnit: randInt(200, 800) },
      { label: `${randInt(1, 4)} kg`, inBaseUnit: randInt(1, 4) * 1000 },
      { label: `${randInt(1000, 3000)} g`, inBaseUnit: randInt(1000, 3000) },
      { label: `${randInt(5, 9) * 100} g`, inBaseUnit: randInt(5, 9) * 100 },
    ];
  } else {
    items = [
      { label: `${randInt(200, 600)} ml`, inBaseUnit: randInt(200, 600) },
      { label: `${randInt(1, 3)} l`, inBaseUnit: randInt(1, 3) * 1000 },
      { label: `${randInt(700, 1500)} ml`, inBaseUnit: randInt(700, 1500) },
      { label: `${randInt(2, 5)} l`, inBaseUnit: randInt(2, 5) * 1000 },
      { label: `${randInt(3000, 4500)} ml`, inBaseUnit: randInt(3000, 4500) },
    ];
  }

  // Recalculate inBaseUnit from the label to keep consistency
  // (labels above already use the random values correctly)
  const sorted = [...items].sort((a, b) => a.inBaseUnit - b.inBaseUnit);
  const sortedLabels = sorted.map(i => i.label);
  const shuffledLabels = shuffle(items.map(i => i.label));

  return {
    id: genId('k5-gre'),
    topicId: 'k5-groessen-einheiten',
    question: 'Ordne die Größen von klein nach groß.',
    answerType: 'drag-drop',
    correctAnswer: sortedLabels.join(', '),
    items: shuffledLabels,
    hint: 'Rechne alle Werte in die gleiche Einheit um.',
    explanation: `Richtige Reihenfolge: ${sortedLabels.join(' < ')}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : 40,
    exerciseType: 'drag-sort',
  };
}

function generateZeitUmrechnung(difficulty: 1 | 2 | 3): Exercise {
  if (difficulty <= 2) {
    // Stunden + Minuten → Minuten
    const stunden = randInt(1, difficulty === 1 ? 3 : 5);
    const minuten = randInt(0, 3) * 15; // 0, 15, 30, 45
    const gesamt = stunden * 60 + minuten;

    return {
      id: genId('k5-gre'),
      topicId: 'k5-groessen-einheiten',
      question: `${stunden} Stunde${stunden > 1 ? 'n' : ''} ${minuten > 0 ? `${minuten} Minuten` : ''} = ___ Minuten`,
      answerType: 'number',
      correctAnswer: gesamt,
      hint: '1 Stunde = 60 Minuten',
      explanation: `${stunden} × 60 + ${minuten} = ${gesamt} Minuten`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 20,
      exerciseType: 'number-input',
    };
  } else {
    // Difficulty 3: Minuten → Stunden und Minuten (text answer)
    const gesamtMin = randInt(61, 300);
    const h = Math.floor(gesamtMin / 60);
    const m = gesamtMin % 60;

    return {
      id: genId('k5-gre'),
      topicId: 'k5-groessen-einheiten',
      question: `Rechne um: ${gesamtMin} Minuten = ___ Stunden ___ Minuten. Gib die Stunden an.`,
      answerType: 'number',
      correctAnswer: h,
      hint: 'Teile die Minuten durch 60. Der Rest sind die übrigen Minuten.',
      explanation: `${gesamtMin} ÷ 60 = ${h} Rest ${m} → ${h} Stunden ${m} Minuten`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 30,
      exerciseType: 'number-input',
    };
  }
}

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  type Aussage = { text: string; wahr: boolean };

  const einfach: Aussage[] = [
    { text: '1 km = 1000 m', wahr: true },
    { text: '1 kg = 100 g', wahr: false },
    { text: '1 m = 100 cm', wahr: true },
    { text: '1 Stunde = 100 Minuten', wahr: false },
    { text: '1 cm = 10 mm', wahr: true },
  ];
  const mittel: Aussage[] = [
    { text: '1500 ml sind mehr als 1 Liter', wahr: true },
    { text: '2,5 km = 250 m', wahr: false },
    { text: '3000 g = 3 kg', wahr: true },
    { text: '1 Tag = 1440 Minuten', wahr: true },
    { text: '500 ml = 5 Liter', wahr: false },
  ];
  const schwer: Aussage[] = [
    { text: '0,5 t = 500 kg', wahr: true },
    { text: '2 Stunden 30 Minuten = 130 Minuten', wahr: false },
    { text: '1,25 km = 1250 m', wahr: true },
    { text: '750 ml + 250 ml = 1 Liter', wahr: true },
    { text: '3,5 kg = 350 g', wahr: false },
  ];

  const pool = difficulty === 1 ? einfach : difficulty === 2 ? mittel : schwer;
  const aussage = pick(pool);

  return {
    id: genId('k5-gre'),
    topicId: 'k5-groessen-einheiten',
    question: `Wahr oder falsch? ${aussage.text}`,
    answerType: 'true-false',
    correctAnswer: aussage.wahr ? 'wahr' : 'falsch',
    hint: 'Überlege dir die Umrechnungsfaktoren.',
    explanation: `${aussage.text} ist ${aussage.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

function generateClassify(difficulty: 1 | 2 | 3): Exercise {
  const laengen = ['mm', 'cm', 'm', 'km'];
  const gewichte = ['g', 'kg', 't'];
  const zeiten = ['Sekunde', 'Minute', 'Stunde', 'Tag'];
  const volumen = ['ml', 'l'];

  let cats: Record<string, string[]>;
  if (difficulty === 1) {
    cats = {
      Längeneinheiten: shuffle(laengen).slice(0, 3),
      Gewichtseinheiten: shuffle(gewichte).slice(0, 2),
    };
  } else if (difficulty === 2) {
    cats = {
      Längeneinheiten: shuffle(laengen).slice(0, 3),
      Gewichtseinheiten: shuffle(gewichte).slice(0, 2),
      Zeiteinheiten: shuffle(zeiten).slice(0, 2),
    };
  } else {
    cats = {
      Längeneinheiten: shuffle(laengen).slice(0, 2),
      Gewichtseinheiten: shuffle(gewichte).slice(0, 2),
      Zeiteinheiten: shuffle(zeiten).slice(0, 2),
      Volumeneinheiten: shuffle(volumen),
    };
  }

  return {
    id: genId('k5-gre'),
    topicId: 'k5-groessen-einheiten',
    question: 'Sortiere die Einheiten in die richtige Kategorie.',
    answerType: 'drag-drop',
    correctAnswer: Object.entries(cats).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; '),
    categories: cats,
    hint: 'Überlege, was jede Einheit misst: Länge, Gewicht, Zeit oder Volumen?',
    explanation: Object.entries(cats).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n'),
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40,
    exerciseType: 'classify',
  };
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k5-groessen-einheiten',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const generators = [
      generateLaengenUmrechnung,
      generateGewichtUmrechnung,
      generateSortierenNachGroesse,
      generateZeitUmrechnung,
      generateTrueFalse,
      generateClassify,
    ];
    const gen = pick(generators);
    return gen(d);
  },
};
