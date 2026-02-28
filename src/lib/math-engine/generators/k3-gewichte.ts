import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k3-gew-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const template: ExerciseTemplate = {
  topicId: 'k3-gewichte',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);

    if (variant === 0) {
      // number-input: Umrechnung kg ↔ g
      if (difficulty === 1) {
        const kg = randInt(1, 10);
        const g = kg * 1000;
        return {
          id: genId(), topicId: 'k3-gewichte',
          question: `${kg} kg = ? g`,
          answerType: 'number', exerciseType: 'number-input',
          correctAnswer: g,
          hint: '1 kg = 1000 g',
          explanation: `${kg} kg × 1000 = ${g} g`,
          difficulty, category: 'Konkret', estimatedSeconds: 20,
          visualConfig: { type: 'scale' as const, props: { leftItems: [{ label: `${kg} kg`, weight: kg }] } },
        };
      }
      if (difficulty === 2) {
        const kg = randInt(1, 10);
        const g = kg * 1000;
        return {
          id: genId(), topicId: 'k3-gewichte',
          question: `${g} g = ? kg`,
          answerType: 'number', exerciseType: 'number-input',
          correctAnswer: kg,
          hint: 'Teile die Gramm durch 1000.',
          explanation: `${g} g ÷ 1000 = ${kg} kg`,
          difficulty, category: 'Konkret', estimatedSeconds: 25,
        };
      }
      const kg = randInt(1, 5);
      const g = randInt(100, 900);
      const total = kg * 1000 + g;
      return {
        id: genId(), topicId: 'k3-gewichte',
        question: `${kg} kg und ${g} g – wie viel Gramm sind das insgesamt?`,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: total,
        hint: `Rechne: ${kg} × 1000 + ${g}`,
        explanation: `${kg} × 1000 + ${g} = ${total} g`,
        difficulty, category: 'Konkret', estimatedSeconds: 35,
      };
    }

    if (variant === 1) {
      // classify: leichter / schwerer als 1 kg
      const leicht = [
        `${randInt(50, 400)} g`, `${randInt(100, 900)} g`,
        `${randInt(200, 800)} g`, `${randInt(50, 500)} g`,
      ];
      const schwer = [
        `${randInt(2, 8)} kg`, `${randInt(3, 10)} kg`,
        `${randInt(1500, 5000)} g`, `${randInt(2000, 9000)} g`,
      ];
      const allItems = shuffle([...leicht.slice(0, 2), ...schwer.slice(0, 2)]);
      return {
        id: genId(), topicId: 'k3-gewichte',
        question: 'Sortiere: leichter als 1 kg oder schwerer als 1 kg?',
        answerType: 'drag-drop', exerciseType: 'classify',
        correctAnswer: 'ok',
        classifyItems: allItems,
        classifyCategories: ['Leichter als 1 kg', 'Schwerer als 1 kg'],
        classifyCorrect: {
          'Leichter als 1 kg': allItems.filter(i => {
            const n = parseInt(i);
            return i.includes('g') && !i.includes('kg') ? n < 1000 : false;
          }),
          'Schwerer als 1 kg': allItems.filter(i => {
            if (i.includes('kg')) return true;
            const n = parseInt(i);
            return n >= 1000;
          }),
        },
        hint: '1 kg = 1000 g. Alles unter 1000 g ist leichter als 1 kg.',
        explanation: 'Masse über 1000 g = über 1 kg. kg-Angaben sind immer mindestens 1 kg.',
        difficulty, category: 'Konkret', estimatedSeconds: 30,
      };
    }

    if (variant === 2) {
      // true-false: Vergleich zweier Gewichte
      const pairs: Array<{ a: string; b: string; aG: number; bG: number }> = [
        { a: '500 g', b: '1 kg', aG: 500, bG: 1000 },
        { a: '2 kg', b: '1500 g', aG: 2000, bG: 1500 },
        { a: '1 kg', b: '999 g', aG: 1000, bG: 999 },
        { a: `${randInt(2, 5)} kg`, b: `${randInt(1500, 4000)} g`, aG: 0, bG: 0 },
      ];
      const pick = pairs[randInt(0, 2)];
      const aG = pick.aG || parseInt(pick.a) * 1000;
      const bG = pick.bG || parseInt(pick.b);
      const isTrue = randInt(0, 1) === 0;
      const question = isTrue
        ? `${pick.a} ist leichter als ${pick.b}.`
        : `${pick.a} ist schwerer als ${pick.b}.`;
      const correct = isTrue ? (aG < bG) : (aG > bG);
      return {
        id: genId(), topicId: 'k3-gewichte',
        question: `Stimmt das? ${question}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: correct ? 'wahr' : 'falsch',
        hint: `Rechne um: ${pick.a} = ${aG} g, ${pick.b} = ${bG} g.`,
        explanation: `${aG} g ${aG < bG ? '<' : '>'} ${bG} g → Die Aussage ist ${correct ? 'wahr' : 'falsch'}.`,
        difficulty, category: 'Abstrakt', estimatedSeconds: 20,
      };
    }

    // variant === 3: fill-table (Einheitentabelle)
    const kgVal = difficulty === 1 ? randInt(1, 5) : difficulty === 2 ? randInt(1, 10) : randInt(1, 5);
    const gVal = kgVal * 1000;
    const extraG = difficulty === 3 ? randInt(100, 500) : 0;
    const totalG = gVal + extraG;
    const question = difficulty === 3
      ? `${kgVal} kg ${extraG} g in Gramm?`
      : `Ergänze die Tabelle: ${kgVal} kg = ? g`;
    return {
      id: genId(), topicId: 'k3-gewichte',
      question,
      answerType: 'drag-drop', exerciseType: 'fill-table',
      correctAnswer: String(totalG),
      tableConfig: {
        headers: ['kg', 'g'],
        rows: [[String(kgVal), null]],
        correctRows: [[String(kgVal), String(totalG)]],
      },
      hint: `1 kg = 1000 g. Multipliziere mit 1000.`,
      explanation: `${kgVal} kg = ${kgVal} × 1000 g = ${gVal} g${extraG > 0 ? ` + ${extraG} g = ${totalG} g` : ''}.`,
      difficulty, category: 'Abstrakt', estimatedSeconds: 25,
    };
  },
};
