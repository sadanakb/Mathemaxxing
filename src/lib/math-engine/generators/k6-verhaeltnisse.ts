import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

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

function generateAufteilen(difficulty: 1 | 2 | 3): Exercise {
  // Im Verhältnis a:b teile N auf
  const a = randInt(1, difficulty === 1 ? 3 : difficulty === 2 ? 5 : 7);
  let b = randInt(1, difficulty === 1 ? 3 : difficulty === 2 ? 5 : 7);
  while (b === a) b = randInt(1, 5);
  const sumParts = a + b;
  const multiplier = randInt(2, difficulty === 1 ? 10 : 20);
  const total = sumParts * multiplier;
  const ersteGruppe = a * multiplier;

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: `Teile ${total} im Verhältnis ${a}:${b} auf. Wie viel bekommt die erste Gruppe?`,
    answerType: 'number',
    correctAnswer: ersteGruppe,
    hint: `Das Verhältnis ${a}:${b} hat insgesamt ${sumParts} Teile. Teile ${total} durch ${sumParts}.`,
    explanation: `${total} ÷ ${sumParts} = ${multiplier} pro Teil. Erste Gruppe: ${a} × ${multiplier} = ${ersteGruppe}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : difficulty === 2 ? 30 : 40,
    exerciseType: 'number-input',
  };
}

function generateVereinfachen(difficulty: 1 | 2 | 3): Exercise {
  // Vereinfache das Verhältnis
  const simplA = randInt(1, difficulty === 1 ? 4 : 6);
  let simplB = randInt(1, difficulty === 1 ? 4 : 6);
  while (simplB === simplA && gcd(simplA, simplB) === simplA) simplB = randInt(1, 6);
  const g = gcd(simplA, simplB);
  const redA = simplA / g;
  const redB = simplB / g;
  const factor = randInt(2, difficulty === 1 ? 4 : difficulty === 2 ? 6 : 8);
  const bigA = simplA * factor;
  const bigB = simplB * factor;

  const distractors: string[] = [];
  // Generate plausible wrong answers
  distractors.push(`${redA + 1}:${redB}`);
  distractors.push(`${redA}:${redB + 1}`);
  if (redA > 1) distractors.push(`${redA - 1}:${redB}`);
  else distractors.push(`${redA + 2}:${redB}`);

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: `Vereinfache das Verhältnis ${bigA}:${bigB}.`,
    answerType: 'multiple-choice',
    correctAnswer: `${redA}:${redB}`,
    distractors: distractors.slice(0, 3),
    hint: `Suche den größten gemeinsamen Teiler von ${bigA} und ${bigB}.`,
    explanation: `ggT(${bigA}, ${bigB}) = ${factor * g} → ${bigA}:${bigB} = ${redA}:${redB}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'multiple-choice',
  };
}

function generateKlasseVerhaeltnisMC(difficulty: 1 | 2 | 3): Exercise {
  // In einer Klasse — Verhältnis erkennen
  const g = gcd(3, 2); // base ratio
  const factor = randInt(2, difficulty === 1 ? 5 : 8);
  const maedchen = pick([2, 3, 4, 5]) * factor;
  const jungen = pick([2, 3, 4, 5]) * factor;
  const g2 = gcd(maedchen, jungen);
  const ratioM = maedchen / g2;
  const ratioJ = jungen / g2;

  const correct = `${ratioM}:${ratioJ}`;
  const distractors = shuffle([
    `${ratioJ}:${ratioM}`,
    `${maedchen}:${jungen}`,
    `${ratioM + 1}:${ratioJ}`,
  ]);

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: `In einer Klasse sind ${maedchen} Mädchen und ${jungen} Jungen. Wie ist das Verhältnis Mädchen zu Jungen (vereinfacht)?`,
    answerType: 'multiple-choice',
    correctAnswer: correct,
    distractors: distractors.slice(0, 3),
    hint: 'Teile beide Zahlen durch den größten gemeinsamen Teiler.',
    explanation: `${maedchen}:${jungen} → ggT = ${g2} → ${correct}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 20 : 30,
    exerciseType: 'multiple-choice',
  };
}

function generateRezeptSkalieren(difficulty: 1 | 2 | 3): Exercise {
  // Rezept hochrechnen
  const basisPersonen = pick([2, 4, 6]);
  const zielPersonen = difficulty === 1
    ? basisPersonen * 2
    : difficulty === 2
      ? basisPersonen + pick([2, 3])
      : basisPersonen * 3 + pick([1, 2]);

  const zutat = pick(['Mehl', 'Zucker', 'Butter', 'Milch']);
  const einheit = zutat === 'Milch' ? 'ml' : 'g';
  const basisMenge = pick([100, 150, 200, 250, 300]);
  const zielMenge = Math.round((basisMenge / basisPersonen) * zielPersonen);

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: `Ein Rezept für ${basisPersonen} Personen braucht ${basisMenge} ${einheit} ${zutat}. Wie viel ${zutat} brauchst du für ${zielPersonen} Personen?`,
    answerType: 'number',
    correctAnswer: zielMenge,
    hint: `Berechne zuerst die Menge pro Person: ${basisMenge} ÷ ${basisPersonen}.`,
    explanation: `${basisMenge} ÷ ${basisPersonen} = ${basisMenge / basisPersonen} ${einheit} pro Person. ${basisMenge / basisPersonen} × ${zielPersonen} = ${zielMenge} ${einheit}`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45,
    exerciseType: 'number-input',
  };
}

function generateProportionalitaetsTabelle(difficulty: 1 | 2 | 3): Exercise {
  // fill-table: Proportionalitätstabelle ausfüllen
  const faktor = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 12);
  const headerLeft = pick(['Anzahl Personen', 'Stückzahl', 'Packungen']);
  const headerRight = pick(['Gesamtpreis (€)', 'Gewicht (g)', 'Kosten (€)']);

  const rowCount = difficulty === 1 ? 3 : difficulty === 2 ? 4 : 5;
  const xValues = Array.from({ length: rowCount }, (_, i) => i + 1);

  // One or two cells are hidden (null)
  const hiddenCount = difficulty === 1 ? 1 : difficulty === 2 ? 2 : 2;
  const hiddenIndices = new Set<number>();
  while (hiddenIndices.size < hiddenCount) {
    hiddenIndices.add(randInt(0, rowCount - 1));
  }

  const rows: (string | null)[][] = xValues.map((x, i) => {
    const y = x * faktor;
    if (hiddenIndices.has(i)) {
      return [String(x), null]; // y is hidden
    }
    return [String(x), String(y)];
  });

  const correctRows: string[][] = xValues.map(x => [String(x), String(x * faktor)]);

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: 'Fülle die Lücken in der Proportionalitätstabelle aus.',
    answerType: 'text',
    correctAnswer: correctRows.filter((_, i) => hiddenIndices.has(i)).map(r => r[1]).join(', '),
    tableConfig: {
      headers: [headerLeft, headerRight],
      rows,
      correctRows,
    },
    hint: `Finde den Faktor: Wie verändert sich der rechte Wert, wenn der linke Wert um 1 steigt?`,
    explanation: `Der Faktor ist ${faktor}. Jeder rechte Wert = linker Wert × ${faktor}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 30 : difficulty === 2 ? 40 : 50,
    exerciseType: 'fill-table',
  };
}

function generateEstimation(difficulty: 1 | 2 | 3): Exercise {
  // Schätzaufgabe: Verhältnisse im Alltag
  const szenarien = [
    {
      frage: 'Auf einem Parkplatz stehen 60 Autos. 2 von 5 sind weiß. Schätze, wie viele weiße Autos es ungefähr sind.',
      antwort: 24,
      toleranz: 3,
    },
    {
      frage: 'In einer Schule mit 300 Schülern ist jeder 3. im Sportverein. Schätze die Anzahl.',
      antwort: 100,
      toleranz: 10,
    },
    {
      frage: 'Von 80 Murmeln sind 3/8 blau. Schätze, wie viele blaue Murmeln es sind.',
      antwort: 30,
      toleranz: 3,
    },
  ];

  const szenario = pick(szenarien);

  return {
    id: genId('k6-ver'),
    topicId: 'k6-verhaeltnisse',
    question: szenario.frage,
    answerType: 'number',
    correctAnswer: szenario.antwort,
    tolerance: szenario.toleranz * difficulty,
    hint: 'Berechne den Anteil und runde sinnvoll.',
    explanation: `Die genaue Antwort ist ${szenario.antwort}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 30,
    exerciseType: 'estimation',
  };
}

// ─── Main template ──────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-verhaeltnisse',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const generators = [
      generateAufteilen,
      generateVereinfachen,
      generateKlasseVerhaeltnisMC,
      generateRezeptSkalieren,
      generateProportionalitaetsTabelle,
      generateEstimation,
    ];
    const gen = pick(generators);
    return gen(d);
  },
};
