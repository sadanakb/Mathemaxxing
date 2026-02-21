import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// ─── Dreisatz (proportional) ─────────────────────────────────

function generateDreisatzProportional(difficulty: 1 | 2 | 3): Exercise {
  const contexts = [
    { einheit: 'kg Äpfel', preisEinheit: 'Euro', plural: 'kg' },
    { einheit: 'Liter Benzin', preisEinheit: 'Euro', plural: 'Liter' },
    { einheit: 'Meter Stoff', preisEinheit: 'Euro', plural: 'Meter' },
    { einheit: 'Stück Brötchen', preisEinheit: 'Euro', plural: 'Stück' },
    { einheit: 'Stunden', preisEinheit: 'km', plural: 'Stunden' },
  ];
  const ctx = pick(contexts);

  let menge1: number, preis1: number, menge2: number;
  if (difficulty === 1) {
    menge1 = randInt(2, 5);
    preis1 = menge1 * randInt(1, 4); // ganzzahliger Einheitspreis
    menge2 = randInt(1, 10);
  } else if (difficulty === 2) {
    menge1 = randInt(3, 8);
    preis1 = menge1 * randInt(2, 6);
    menge2 = randInt(2, 15);
  } else {
    menge1 = randInt(4, 12);
    preis1 = randInt(5, 50);
    menge2 = randInt(3, 20);
  }

  const einheitspreis = preis1 / menge1;
  const result = Math.round(einheitspreis * menge2 * 100) / 100;
  const resultStr = result % 1 === 0 ? `${result}` : result.toFixed(2).replace('.', ',');

  return {
    id: genId('k6-prop'),
    topicId: 'k6-proportionale-zuordnungen',
    question: `${menge1} ${ctx.plural} kosten ${preis1} ${ctx.preisEinheit}. Wie viel kosten ${menge2} ${ctx.plural}?`,
    answerType: 'number',
    correctAnswer: result,
    tolerance: 0.01,
    hint: `Berechne zuerst den Preis für 1 ${ctx.einheit} (Einheitspreis).`,
    explanation: `1 ${ctx.einheit} kostet ${preis1}/${menge1} = ${einheitspreis.toFixed(2).replace('.', ',')} ${ctx.preisEinheit}. ${menge2} ${ctx.plural} kosten ${menge2} · ${einheitspreis.toFixed(2).replace('.', ',')} = ${resultStr} ${ctx.preisEinheit}.`,
    difficulty,
    category: 'Konkret',
    estimatedSeconds: difficulty === 1 ? 30 : difficulty === 2 ? 45 : 60,
    exerciseType: 'number-input',
  };
}

// ─── Dreisatz (antiproportional) ─────────────────────────────

function generateDreisatzAntiproportional(difficulty: 1 | 2 | 3): Exercise {
  const contexts = [
    { situation: 'Arbeiter', einheit: 'Tage', verb: 'brauchen' },
    { situation: 'Pumpen', einheit: 'Stunden', verb: 'brauchen' },
    { situation: 'Maschinen', einheit: 'Stunden', verb: 'brauchen' },
  ];
  const ctx = pick(contexts);

  let anz1: number, zeit1: number, anz2: number;
  if (difficulty === 1) {
    anz1 = randInt(2, 4);
    zeit1 = randInt(2, 6) * anz1; // saubere Division
    anz2 = randInt(1, 6);
    while (anz2 === anz1) anz2 = randInt(1, 6);
  } else if (difficulty === 2) {
    anz1 = randInt(3, 6);
    zeit1 = randInt(4, 12);
    anz2 = randInt(2, 10);
    while (anz2 === anz1) anz2 = randInt(2, 10);
  } else {
    anz1 = randInt(4, 10);
    zeit1 = randInt(3, 15);
    anz2 = randInt(2, 12);
    while (anz2 === anz1) anz2 = randInt(2, 12);
  }

  const gesamt = anz1 * zeit1;
  const result = gesamt / anz2;
  const resultRound = Math.round(result * 100) / 100;

  return {
    id: genId('k6-prop'),
    topicId: 'k6-proportionale-zuordnungen',
    question: `${anz1} ${ctx.situation} ${ctx.verb} ${zeit1} ${ctx.einheit}. Wie viele ${ctx.einheit} ${ctx.verb} ${anz2} ${ctx.situation}?`,
    answerType: 'number',
    correctAnswer: resultRound,
    tolerance: 0.01,
    hint: `Antiproportional: Mehr ${ctx.situation} → weniger ${ctx.einheit}. Berechne erst die Gesamtarbeit.`,
    explanation: `Gesamtarbeit: ${anz1} · ${zeit1} = ${gesamt}. Bei ${anz2} ${ctx.situation}: ${gesamt} / ${anz2} = ${resultRound} ${ctx.einheit}.`,
    difficulty,
    category: 'Konkret',
    estimatedSeconds: difficulty === 1 ? 35 : difficulty === 2 ? 50 : 65,
    exerciseType: 'number-input',
  };
}

// ─── Proportional oder antiproportional? (MC) ────────────────

function generateErkennenMC(difficulty: 1 | 2 | 3): Exercise {
  const situationen: { text: string; typ: string }[] = [
    { text: 'Anzahl der Äpfel und Gesamtpreis', typ: 'proportional' },
    { text: 'Geschwindigkeit und Fahrzeit für dieselbe Strecke', typ: 'antiproportional' },
    { text: 'Anzahl der Arbeiter und Bauzeit', typ: 'antiproportional' },
    { text: 'Menge an Mehl und Anzahl der Brote', typ: 'proportional' },
    { text: 'Seitenlänge eines Quadrats und sein Umfang', typ: 'proportional' },
    { text: 'Anzahl der Wasserhähne und Füllzeit einer Badewanne', typ: 'antiproportional' },
    { text: 'Fahrtstrecke und Benzinverbrauch', typ: 'proportional' },
    { text: 'Breite und Länge eines Rechtecks mit festem Flächeninhalt', typ: 'antiproportional' },
  ];

  const pool = difficulty === 1 ? situationen.slice(0, 4) : difficulty === 2 ? situationen.slice(0, 6) : situationen;
  const chosen = pick(pool);
  const distractors = ['proportional', 'antiproportional', 'weder noch'].filter(s => s !== chosen.typ);

  return {
    id: genId('k6-prop'),
    topicId: 'k6-proportionale-zuordnungen',
    question: `Welche Art von Zuordnung liegt vor? "${chosen.text}"`,
    answerType: 'multiple-choice',
    correctAnswer: chosen.typ,
    distractors,
    hint: 'Proportional: Je mehr, desto mehr. Antiproportional: Je mehr, desto weniger.',
    explanation: `"${chosen.text}" ist ${chosen.typ}.`,
    difficulty,
    category: 'Konkret',
    estimatedSeconds: 20,
    exerciseType: 'multiple-choice',
  };
}

// ─── Wertetabelle ergänzen ───────────────────────────────────

function generateWertetabelle(difficulty: 1 | 2 | 3): Exercise {
  const faktor = randInt(2, difficulty === 1 ? 5 : difficulty === 2 ? 8 : 12);
  const x1 = randInt(1, 5);
  const x2 = randInt(2, 8);
  const x3 = randInt(3, 10);

  const y1 = x1 * faktor;
  const y2 = x2 * faktor;
  const y3 = x3 * faktor;

  // Lücke zufällig wählen
  const luecke = randInt(0, 2);
  const correct = luecke === 0 ? y1 : luecke === 1 ? y2 : y3;

  const row1 = [
    `${x1}`, `${x2}`, `${x3}`,
  ];
  const row2 = [
    luecke === 0 ? '?' : `${y1}`,
    luecke === 1 ? '?' : `${y2}`,
    luecke === 2 ? '?' : `${y3}`,
  ];

  return {
    id: genId('k6-prop'),
    topicId: 'k6-proportionale-zuordnungen',
    question: `Ergänze die Wertetabelle (proportionale Zuordnung):\nx: ${row1.join(' | ')}\ny: ${row2.join(' | ')}`,
    answerType: 'number',
    correctAnswer: correct,
    hint: `Finde den Faktor: y = Faktor · x. Nutze ein bekanntes Wertepaar.`,
    explanation: `Faktor = ${faktor}. Der fehlende Wert ist ${correct}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: difficulty === 1 ? 25 : 40,
    exerciseType: 'number-input',
    tableConfig: {
      headers: ['x', 'y'],
      rows: [[`${x1}`, luecke === 0 ? null : `${y1}`], [`${x2}`, luecke === 1 ? null : `${y2}`], [`${x3}`, luecke === 2 ? null : `${y3}`]],
      correctRows: [[`${x1}`, `${y1}`], [`${x2}`, `${y2}`], [`${x3}`, `${y3}`]],
    },
  };
}

// ─── True/False ──────────────────────────────────────────────

function generateTrueFalse(difficulty: 1 | 2 | 3): Exercise {
  const aussagen: { text: string; wahr: boolean }[] = [
    { text: 'Bei proportionalen Zuordnungen verdoppelt sich y, wenn sich x verdoppelt.', wahr: true },
    { text: 'Beim Dreisatz muss man immer zuerst den Einheitswert berechnen.', wahr: true },
    { text: 'Mehr Arbeiter brauchen mehr Zeit für dieselbe Aufgabe.', wahr: false },
    { text: 'Eine proportionale Zuordnung geht immer durch den Ursprung.', wahr: true },
    { text: 'Bei einer antiproportionalen Zuordnung ist das Produkt x · y konstant.', wahr: true },
    { text: 'Geschwindigkeit und Fahrzeit sind proportional zueinander.', wahr: false },
    { text: 'Wenn 3 Brötchen 1,50 € kosten, kosten 6 Brötchen 3,00 €.', wahr: true },
  ];

  const pool = difficulty === 1 ? aussagen.slice(0, 3) : difficulty === 2 ? aussagen.slice(0, 5) : aussagen;
  const chosen = pick(pool);

  return {
    id: genId('k6-prop'),
    topicId: 'k6-proportionale-zuordnungen',
    question: `Wahr oder falsch? ${chosen.text}`,
    answerType: 'true-false',
    correctAnswer: chosen.wahr ? 'wahr' : 'falsch',
    hint: 'Denke an die Eigenschaften proportionaler und antiproportionaler Zuordnungen.',
    explanation: `"${chosen.text}" ist ${chosen.wahr ? 'wahr' : 'falsch'}.`,
    difficulty,
    category: 'Abstrakt',
    estimatedSeconds: 15,
    exerciseType: 'true-false',
  };
}

// ─── Main template ───────────────────────────────────────────

export const template: ExerciseTemplate = {
  topicId: 'k6-proportionale-zuordnungen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    if (d === 1) {
      const gen = pick([generateDreisatzProportional, generateErkennenMC, generateWertetabelle, generateTrueFalse]);
      return gen(d);
    } else if (d === 2) {
      const gen = pick([generateDreisatzProportional, generateDreisatzAntiproportional, generateErkennenMC, generateWertetabelle, generateTrueFalse]);
      return gen(d);
    } else {
      const gen = pick([generateDreisatzProportional, generateDreisatzAntiproportional, generateErkennenMC, generateWertetabelle, generateTrueFalse]);
      return gen(d);
    }
  },
};
