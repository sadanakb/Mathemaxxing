import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

type Ereignis = {
  text: string;
  kategorie: 'sicher' | 'möglich' | 'unmöglich';
  erklärung: string;
};

const wuerfelEreignisse: Ereignis[] = [
  { text: 'Du würfelst eine Zahl zwischen 1 und 6', kategorie: 'sicher', erklärung: 'Ein normaler Würfel zeigt immer eine Zahl von 1 bis 6.' },
  { text: 'Du würfelst eine 7', kategorie: 'unmöglich', erklärung: 'Ein normaler Würfel hat nur die Zahlen 1 bis 6.' },
  { text: 'Du würfelst eine 3', kategorie: 'möglich', erklärung: 'Die 3 ist eine der 6 möglichen Zahlen — aber nicht sicher.' },
  { text: 'Du würfelst eine gerade Zahl', kategorie: 'möglich', erklärung: 'Es gibt gerade Zahlen (2, 4, 6), aber auch ungerade (1, 3, 5).' },
  { text: 'Du würfelst eine Zahl kleiner als 10', kategorie: 'sicher', erklärung: 'Alle Zahlen auf dem Würfel (1–6) sind kleiner als 10.' },
  { text: 'Du würfelst eine negative Zahl', kategorie: 'unmöglich', erklärung: 'Ein Würfel hat keine negativen Zahlen.' },
];

const muenzEreignisse: Ereignis[] = [
  { text: 'Die Münze zeigt Kopf oder Zahl', kategorie: 'sicher', erklärung: 'Eine Münze landet immer auf einer Seite.' },
  { text: 'Die Münze zeigt Kopf', kategorie: 'möglich', erklärung: 'Kopf ist eine von zwei Möglichkeiten.' },
  { text: 'Die Münze landet auf der Kante', kategorie: 'unmöglich', erklärung: 'Wir gehen davon aus, dass die Münze nicht auf der Kante stehenbleibt.' },
  { text: 'Die Münze zeigt weder Kopf noch Zahl', kategorie: 'unmöglich', erklärung: 'Es gibt nur Kopf oder Zahl.' },
];

const alltagsEreignisse: Ereignis[] = [
  { text: 'Die Sonne geht morgen auf', kategorie: 'sicher', erklärung: 'Die Sonne geht jeden Tag auf — das ist sicher.' },
  { text: 'Es schneit morgen im Juli in Deutschland', kategorie: 'unmöglich', erklärung: 'Im Juli schneit es in Deutschland praktisch nie (vereinfacht: unmöglich).' },
  { text: 'Es regnet morgen', kategorie: 'möglich', erklärung: 'Es kann regnen, muss aber nicht — das ist möglich.' },
  { text: 'Du ziehst eine rote Kugel aus einem Beutel mit nur blauen Kugeln', kategorie: 'unmöglich', erklärung: 'Wenn nur blaue Kugeln im Beutel sind, kann man keine rote ziehen.' },
  { text: 'Du ziehst eine rote Kugel aus einem Beutel mit roten und blauen Kugeln', kategorie: 'möglich', erklärung: 'Es gibt rote Kugeln im Beutel — man kann eine ziehen, muss aber nicht.' },
  { text: 'Du ziehst eine Kugel aus einem Beutel, der nur rote Kugeln enthält — sie ist rot', kategorie: 'sicher', erklärung: 'Wenn nur rote Kugeln drin sind, ist jede gezogene Kugel rot.' },
];

const alleEreignisse = [...wuerfelEreignisse, ...muenzEreignisse, ...alltagsEreignisse];

/**
 * k4-wahrscheinlichkeit-einfuehrung — Wahrscheinlichkeit: Sicher/Möglich/Unmöglich
 *
 * Difficulty 1: classify — Ordne Ereignisse ein (sicher/möglich/unmöglich)
 * Difficulty 2: true-false — Stimmt die Einordnung?
 * Difficulty 3: Gemischte Aufgaben mit Begründungen
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-wahrscheinlichkeit-einfuehrung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // classify: Ordne 6 Ereignisse in sicher/möglich/unmöglich
      const selected = [...alleEreignisse].sort(() => Math.random() - 0.5).slice(0, 6);

      const categories: Record<string, string[]> = {
        'sicher': [],
        'möglich': [],
        'unmöglich': [],
      };
      for (const e of selected) {
        categories[e.kategorie].push(e.text);
      }

      // Ensure at least one in each category — if not, reselect
      // (Fallback: use curated set)
      if (categories['sicher'].length === 0 || categories['möglich'].length === 0 || categories['unmöglich'].length === 0) {
        const curated = [
          wuerfelEreignisse[0], // sicher
          wuerfelEreignisse[2], // möglich
          wuerfelEreignisse[1], // unmöglich
          alltagsEreignisse[0], // sicher
          alltagsEreignisse[2], // möglich
          alltagsEreignisse[3], // unmöglich
        ];
        categories['sicher'] = curated.filter(e => e.kategorie === 'sicher').map(e => e.text);
        categories['möglich'] = curated.filter(e => e.kategorie === 'möglich').map(e => e.text);
        categories['unmöglich'] = curated.filter(e => e.kategorie === 'unmöglich').map(e => e.text);
      }

      const allItems = [...categories['sicher'], ...categories['möglich'], ...categories['unmöglich']];

      return {
        id: genId('k4-wahr'),
        topicId: 'k4-wahrscheinlichkeit-einfuehrung',
        question: 'Ordne die Ereignisse ein: sicher, möglich oder unmöglich?',
        answerType: 'drag-drop',
        exerciseType: 'classify',
        categories,
        items: allItems.sort(() => Math.random() - 0.5),
        correctAnswer: Object.entries(categories).map(([k, v]) => `${k}: ${v.join(', ')}`).join(' | '),
        hint: 'Sicher = passiert immer. Möglich = kann passieren. Unmöglich = kann nie passieren.',
        explanation: selected.map(e => `„${e.text}" → ${e.kategorie}: ${e.erklärung}`).join(' | '),
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 40,
      };
    }

    if (difficulty === 2) {
      // true-false: Stimmt die Einordnung?
      const ereignis = alleEreignisse[randInt(0, alleEreignisse.length - 1)];
      const kategorien: Array<'sicher' | 'möglich' | 'unmöglich'> = ['sicher', 'möglich', 'unmöglich'];
      // Manchmal richtig, manchmal falsch
      const makeFalse = randInt(0, 1) === 0;
      let claimed: string;
      if (makeFalse) {
        const falseOptions = kategorien.filter(k => k !== ereignis.kategorie);
        claimed = falseOptions[randInt(0, falseOptions.length - 1)];
      } else {
        claimed = ereignis.kategorie;
      }
      const isTrue = claimed === ereignis.kategorie;

      return {
        id: genId('k4-wahr'),
        topicId: 'k4-wahrscheinlichkeit-einfuehrung',
        question: `Stimmt es? Das Ereignis „${ereignis.text}" ist ${claimed}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Überlege: Passiert es immer (sicher), kann es passieren (möglich) oder nie (unmöglich)?',
        explanation: `${ereignis.erklärung} → Das Ereignis ist ${ereignis.kategorie}. Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    // difficulty === 3: Situationsbezogene Aufgaben
    const variant = randInt(0, 2);

    if (variant === 0) {
      // Glücksrad mit Farben
      const farben = ['rot', 'blau', 'grün', 'gelb'];
      const felder = randInt(4, 8);
      const verteilung: Record<string, number> = {};
      let rest = felder;
      const usedFarben = farben.slice(0, randInt(2, Math.min(4, felder)));

      for (let i = 0; i < usedFarben.length; i++) {
        if (i === usedFarben.length - 1) {
          verteilung[usedFarben[i]] = rest;
        } else {
          const val = randInt(1, rest - (usedFarben.length - i - 1));
          verteilung[usedFarben[i]] = val;
          rest -= val;
        }
      }

      const farbenText = Object.entries(verteilung).map(([f, n]) => `${n}× ${f}`).join(', ');
      // Pick a question about this Glücksrad
      const frageFarbe = usedFarben[randInt(0, usedFarben.length - 1)];
      const nichtVorhandene = farben.find(f => !usedFarben.includes(f)) ?? 'weiß';

      const frageType = randInt(0, 2);
      let ereignisText: string;
      let kategorie: 'sicher' | 'möglich' | 'unmöglich';
      let erklaerung: string;

      if (frageType === 0 && verteilung[frageFarbe] === felder) {
        // Alle Felder gleiche Farbe → sicher
        ereignisText = `Der Zeiger bleibt auf ${frageFarbe} stehen`;
        kategorie = 'sicher';
        erklaerung = `Alle ${felder} Felder sind ${frageFarbe}, also ist das Ergebnis sicher.`;
      } else if (frageType === 0) {
        ereignisText = `Der Zeiger bleibt auf ${frageFarbe} stehen`;
        kategorie = 'möglich';
        erklaerung = `Es gibt ${verteilung[frageFarbe]} von ${felder} Feldern mit ${frageFarbe}. Es ist möglich, aber nicht sicher.`;
      } else if (frageType === 1) {
        ereignisText = `Der Zeiger bleibt auf ${nichtVorhandene} stehen`;
        kategorie = 'unmöglich';
        erklaerung = `Es gibt kein ${nichtVorhandene}s Feld auf dem Glücksrad.`;
      } else {
        ereignisText = `Der Zeiger bleibt auf einer Farbe stehen`;
        kategorie = 'sicher';
        erklaerung = 'Der Zeiger muss immer auf einem Feld stehen bleiben.';
      }

      // true-false
      const kategorien: Array<'sicher' | 'möglich' | 'unmöglich'> = ['sicher', 'möglich', 'unmöglich'];
      const makeFalse = randInt(0, 1) === 0;
      let claimed: string;
      if (makeFalse) {
        const others = kategorien.filter(k => k !== kategorie);
        claimed = others[randInt(0, others.length - 1)];
      } else {
        claimed = kategorie;
      }
      const isTrue = claimed === kategorie;

      return {
        id: genId('k4-wahr'),
        topicId: 'k4-wahrscheinlichkeit-einfuehrung',
        question: `Ein Glücksrad hat ${felder} Felder: ${farbenText}. Stimmt es? „${ereignisText}" ist ${claimed}.`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: isTrue ? 'wahr' : 'falsch',
        hint: 'Zähle die Felder mit der gefragten Farbe.',
        explanation: `${erklaerung} Die Aussage ist ${isTrue ? 'wahr' : 'falsch'}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    if (variant === 1) {
      // Beutel mit Kugeln
      const rote = randInt(0, 5);
      const blaue = randInt(0, 5);
      const gesamt = rote + blaue;
      // Sicherstellen dass mindestens 1 Kugel da ist
      const effRot = rote || 0;
      const effBlau = blaue || 1;
      const effGesamt = effRot + effBlau;

      let ereignisText: string;
      let kategorie: 'sicher' | 'möglich' | 'unmöglich';
      let erklaerung: string;

      if (effRot === 0) {
        ereignisText = 'Du ziehst eine rote Kugel';
        kategorie = 'unmöglich';
        erklaerung = `Es gibt keine rote Kugel im Beutel (${effBlau} blaue).`;
      } else if (effBlau === 0) {
        ereignisText = 'Du ziehst eine rote Kugel';
        kategorie = 'sicher';
        erklaerung = `Es gibt nur rote Kugeln im Beutel (${effRot} Stück).`;
      } else {
        ereignisText = 'Du ziehst eine rote Kugel';
        kategorie = 'möglich';
        erklaerung = `Es gibt ${effRot} rote und ${effBlau} blaue Kugeln — man kann eine rote ziehen, muss aber nicht.`;
      }

      return {
        id: genId('k4-wahr'),
        topicId: 'k4-wahrscheinlichkeit-einfuehrung',
        question: `In einem Beutel sind ${effRot} rote und ${effBlau} blaue Kugeln. Ist das Ereignis „${ereignisText}" sicher, möglich oder unmöglich?`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: kategorie,
        distractors: (['sicher', 'möglich', 'unmöglich'] as string[]).filter(k => k !== kategorie),
        hint: 'Gibt es rote Kugeln? Wenn ja: Gibt es auch andere Farben?',
        explanation: erklaerung,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 25,
      };
    }

    // variant === 2: Würfel mit besonderen Bedingungen
    const augenzahl = randInt(1, 8);
    let kategorie: 'sicher' | 'möglich' | 'unmöglich';
    let erklaerung: string;

    if (augenzahl >= 1 && augenzahl <= 6) {
      kategorie = 'möglich';
      erklaerung = `Die ${augenzahl} ist auf einem normalen Würfel vorhanden, aber es ist nicht sicher, dass sie fällt.`;
    } else {
      kategorie = 'unmöglich';
      erklaerung = `Ein normaler Würfel hat nur die Zahlen 1 bis 6. Die ${augenzahl} gibt es nicht.`;
    }

    return {
      id: genId('k4-wahr'),
      topicId: 'k4-wahrscheinlichkeit-einfuehrung',
      question: `Du wirfst einen normalen Würfel. Ist es sicher, möglich oder unmöglich, eine ${augenzahl} zu würfeln?`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: kategorie,
      distractors: (['sicher', 'möglich', 'unmöglich'] as string[]).filter(k => k !== kategorie),
      hint: 'Ein normaler Würfel hat die Zahlen 1, 2, 3, 4, 5, 6.',
      explanation: erklaerung,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 15,
      visualConfig: { type: 'dice' as const, props: { values: [Math.min(augenzahl, 6)] } },
    };
  },
};
