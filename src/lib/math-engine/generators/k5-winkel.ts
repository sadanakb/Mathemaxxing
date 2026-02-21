import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

type WinkelArt = 'spitzer Winkel' | 'rechter Winkel' | 'stumpfer Winkel' | 'gestreckter Winkel' | 'überstumpfer Winkel' | 'Vollwinkel';

function getWinkelart(grad: number): WinkelArt {
  if (grad < 90) return 'spitzer Winkel';
  if (grad === 90) return 'rechter Winkel';
  if (grad < 180) return 'stumpfer Winkel';
  if (grad === 180) return 'gestreckter Winkel';
  if (grad < 360) return 'überstumpfer Winkel';
  return 'Vollwinkel';
}

export const template: ExerciseTemplate = {
  topicId: 'k5-winkel',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Winkelart bestimmen: Gegeben ist ein Gradmaß
      const angles = d === 1
        ? [30, 45, 60, 90, 120, 150, 180]
        : d === 2
        ? [15, 35, 55, 75, 90, 105, 135, 160, 180]
        : [12, 27, 43, 68, 90, 97, 112, 148, 165, 180, 210, 270, 360];
      const angle = angles[randInt(0, angles.length - 1)];
      const art = getWinkelart(angle);
      const allArts: WinkelArt[] = ['spitzer Winkel', 'rechter Winkel', 'stumpfer Winkel', 'gestreckter Winkel'];
      const distractors = allArts.filter(a => a !== art).slice(0, 3);

      return {
        id: genId('k5-wink'),
        topicId: 'k5-winkel',
        question: `Ein Winkel hat ${angle}\u00b0. Welche Winkelart ist das?`,
        answerType: 'multiple-choice',
        correctAnswer: art,
        distractors,
        hint: 'Spitz: < 90\u00b0, Recht: = 90\u00b0, Stumpf: 90\u00b0-180\u00b0, Gestreckt: = 180\u00b0.',
        explanation: `${angle}\u00b0 ist ein ${art}. ${angle < 90 ? '(kleiner als 90\u00b0)' : angle === 90 ? '(genau 90\u00b0)' : angle < 180 ? '(zwischen 90\u00b0 und 180\u00b0)' : '(genau 180\u00b0)'}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
        exerciseType: 'multiple-choice',
        visualConfig: angle <= 180 ? {
          type: 'protractor' as const,
          props: { angle, showAngle: true },
        } as VisualConfig : undefined,
      };
    }

    if (variant === 2) {
      // Winkel schätzen: Welcher Winkel könnte das sein?
      const targetAngles = d === 1 ? [45, 90, 135, 180] : d === 2 ? [30, 60, 90, 120, 150] : [15, 45, 75, 90, 110, 135, 165];
      const target = targetAngles[randInt(0, targetAngles.length - 1)];
      const art = getWinkelart(target);

      const distractorSet = new Set<number>();
      while (distractorSet.size < 3) {
        const offset = randInt(15, 60) * (randInt(0, 1) === 0 ? 1 : -1);
        const dist = Math.max(5, Math.min(355, target + offset));
        if (dist !== target) distractorSet.add(dist);
      }

      return {
        id: genId('k5-wink'),
        topicId: 'k5-winkel',
        question: `Schätze: Wie groß ist ein ${art} ungefähr? Wähle den passenden Wert.`,
        answerType: 'multiple-choice',
        correctAnswer: `${target}\u00b0`,
        distractors: Array.from(distractorSet).map(v => `${v}\u00b0`),
        hint: `Ein ${art} ist ${target < 90 ? 'kleiner als 90\u00b0' : target === 90 ? 'genau 90\u00b0' : target < 180 ? 'zwischen 90\u00b0 und 180\u00b0' : 'genau 180\u00b0'}.`,
        explanation: `Ein typischer ${art} hat ${target}\u00b0.`,
        difficulty: d,
        category: 'Repräsentational',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 30,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 3) {
      // Nebenwinkel berechnen: alpha + beta = 180°
      const alpha = d === 1 ? randInt(2, 8) * 10 : d === 2 ? randInt(10, 170) : randInt(1, 179);
      const beta = 180 - alpha;

      return {
        id: genId('k5-wink'),
        topicId: 'k5-winkel',
        question: `Zwei Winkel liegen nebeneinander und ergeben zusammen einen gestreckten Winkel (180\u00b0). Der eine Winkel ist ${alpha}\u00b0. Wie groß ist der andere?`,
        answerType: 'number',
        correctAnswer: beta.toString(),
        hint: 'Nebenwinkel ergeben zusammen 180\u00b0. Rechne 180\u00b0 - gegebener Winkel.',
        explanation: `180\u00b0 - ${alpha}\u00b0 = ${beta}\u00b0`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
        exerciseType: 'number-input',
      };
    }

    if (variant === 4) {
      // Winkelarten ordnen nach Größe (drag-sort)
      const types: Array<{ name: string; range: string; order: number }> = [
        { name: 'spitzer Winkel', range: '< 90\u00b0', order: 1 },
        { name: 'rechter Winkel', range: '= 90\u00b0', order: 2 },
        { name: 'stumpfer Winkel', range: '90\u00b0 - 180\u00b0', order: 3 },
        { name: 'gestreckter Winkel', range: '= 180\u00b0', order: 4 },
      ];

      const shuffled = [...types].sort(() => Math.random() - 0.5);
      const sorted = [...types].sort((a, b) => a.order - b.order);

      return {
        id: genId('k5-wink'),
        topicId: 'k5-winkel',
        question: 'Ordne die Winkelarten von klein nach groß.',
        answerType: 'drag-drop',
        correctAnswer: sorted.map(t => t.name).join(', '),
        items: shuffled.map(t => t.name),
        hint: 'Spitz ist am kleinsten, gestreckt am größten.',
        explanation: `Reihenfolge: ${sorted.map(t => `${t.name} (${t.range})`).join(' < ')}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 35,
        exerciseType: 'drag-sort',
      };
    }

    // variant 5: True/False - Aussagen über Winkel
    const statements = [
      { text: 'Ein rechter Winkel hat genau 90\u00b0.', correct: true },
      { text: 'Ein stumpfer Winkel ist kleiner als 90\u00b0.', correct: false },
      { text: 'Ein spitzer Winkel ist immer kleiner als 90\u00b0.', correct: true },
      { text: 'Ein gestreckter Winkel hat 360\u00b0.', correct: false },
      { text: 'Ein gestreckter Winkel hat 180\u00b0.', correct: true },
      { text: 'Ein rechter Winkel ist ein stumpfer Winkel.', correct: false },
      { text: 'Ein Winkel von 120\u00b0 ist ein stumpfer Winkel.', correct: true },
      { text: 'Ein Winkel von 45\u00b0 ist ein spitzer Winkel.', correct: true },
      { text: 'Zwei Nebenwinkel ergeben zusammen 360\u00b0.', correct: false },
      { text: 'Ein Vollwinkel hat 360\u00b0.', correct: true },
    ];

    const pool = d === 1 ? statements.slice(0, 5) : d === 2 ? statements.slice(0, 8) : statements;
    const stmt = pool[randInt(0, pool.length - 1)];

    return {
      id: genId('k5-wink'),
      topicId: 'k5-winkel',
      question: `Stimmt diese Aussage? "${stmt.text}"`,
      answerType: 'true-false',
      correctAnswer: stmt.correct ? 'wahr' : 'falsch',
      hint: 'Erinnere dich an die Definitionen der Winkelarten.',
      explanation: stmt.correct
        ? `Ja, die Aussage ist richtig.`
        : `Nein, die Aussage ist falsch.`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
    };
  },
};
