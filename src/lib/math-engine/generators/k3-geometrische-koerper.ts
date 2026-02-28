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

type Koerper = {
  name: string;
  flaechen: number;
  kanten: number;
  ecken: number;
  beschreibung: string;
};

const koerperDaten: Koerper[] = [
  { name: 'Würfel', flaechen: 6, kanten: 12, ecken: 8, beschreibung: 'Alle 6 Flächen sind gleich große Quadrate.' },
  { name: 'Quader', flaechen: 6, kanten: 12, ecken: 8, beschreibung: 'Hat 6 rechteckige Flächen, gegenüberliegende sind gleich.' },
  { name: 'Kugel', flaechen: 0, kanten: 0, ecken: 0, beschreibung: 'Ist rund, hat keine Ecken und keine Kanten.' },
  { name: 'Zylinder', flaechen: 3, kanten: 2, ecken: 0, beschreibung: 'Hat 2 kreisförmige Flächen und eine gekrümmte Mantelfläche.' },
  { name: 'Kegel', flaechen: 2, kanten: 1, ecken: 1, beschreibung: 'Hat eine Spitze, eine kreisförmige Grundfläche und eine Mantelfläche.' },
];

/**
 * k3-geometrische-koerper — Geometrische Körper (Würfel, Quader, Kugel)
 *
 * Difficulty 1: Körper anhand der Beschreibung erkennen (Multiple-Choice)
 * Difficulty 2: Eigenschaften zuordnen (drag-match)
 * Difficulty 3: Anzahl Flächen/Kanten/Ecken bestimmen
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-geometrische-koerper',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Multiple-Choice: Körper erkennen
      const idx = randInt(0, koerperDaten.length - 1);
      const koerper = koerperDaten[idx];
      const distractors = koerperDaten
        .filter((_, i) => i !== idx)
        .map(k => k.name)
        .slice(0, 3);

      return {
        id: genId('k3-gkoe'),
        topicId: 'k3-geometrische-koerper',
        question: `Welcher Körper passt? ${koerper.beschreibung}`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: koerper.name,
        distractors,
        hint: 'Überlege, welcher Körper diese Eigenschaften hat.',
        explanation: `${koerper.beschreibung} → Das ist ein ${koerper.name}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 20,
        visualConfig: {
          type: 'geometric-shape' as const,
          props: { shape: 'rectangle' as const, width: 4, height: 4, showDimensions: false },
        },
      };
    }

    if (difficulty === 2) {
      // Drag-Match: Name ↔ Eigenschaft
      const selected = shuffle(koerperDaten).slice(0, 3);
      const pairs: [string, string][] = selected.map(k => [k.name, k.beschreibung]);

      return {
        id: genId('k3-gkoe'),
        topicId: 'k3-geometrische-koerper',
        question: 'Ordne jedem Körper die richtige Beschreibung zu.',
        answerType: 'matching',
        exerciseType: 'drag-match',
        correctAnswer: pairs.map(p => `${p[0]}→${p[1]}`).join('; '),
        pairs,
        hint: 'Überlege, wie viele Flächen, Kanten und Ecken jeder Körper hat.',
        explanation: pairs.map(p => `${p[0]}: ${p[1]}`).join(' | '),
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }

    // Difficulty 3: variant 0 = Eigenschaften abfragen (multiple-choice), 1 = classify by Kanten/Flächen, 2 = drag-match name→shape description
    const variant3 = randInt(0, 2);

    if (variant3 === 1) {
      // classify: sort Körper into groups based on whether they have edges (Kanten) or not
      const mitKanten = koerperDaten.filter(k => k.kanten > 0).map(k => k.name);
      const ohneKanten = koerperDaten.filter(k => k.kanten === 0).map(k => k.name);
      const allNames = shuffle([...mitKanten, ...ohneKanten]);
      return {
        id: genId('k3-gkoe'),
        topicId: 'k3-geometrische-koerper',
        question: 'Sortiere die Körper: Welche haben Kanten, welche haben keine Kanten?',
        answerType: 'drag-drop',
        exerciseType: 'classify',
        correctAnswer: JSON.stringify({ 'Hat Kanten': mitKanten.sort(), 'Hat keine Kanten': ohneKanten.sort() }),
        classifyItems: allNames,
        classifyCategories: ['Hat Kanten', 'Hat keine Kanten'],
        classifyCorrect: {
          'Hat Kanten': mitKanten,
          'Hat keine Kanten': ohneKanten,
        },
        hint: 'Kugel und Zylinder — denke genau nach, welche Kanten (Kanten = gerade Linien zwischen Flächen) sie haben.',
        explanation: `Mit Kanten: ${mitKanten.join(', ')}. Ohne Kanten: ${ohneKanten.join(', ')}.`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 35,
      };
    }

    if (variant3 === 2) {
      // drag-match: match Körper name to a short property fact
      const facts: [string, string][] = koerperDaten.map(k => [
        k.name,
        k.kanten === 0 && k.flaechen === 0
          ? 'keine Ecken, keine Kanten'
          : `${k.flaechen} Fläche${k.flaechen !== 1 ? 'n' : ''}, ${k.kanten} Kante${k.kanten !== 1 ? 'n' : ''}`,
      ]);
      const selected = shuffle(facts).slice(0, 3) as [string, string][];
      return {
        id: genId('k3-gkoe'),
        topicId: 'k3-geometrische-koerper',
        question: 'Ordne jedem Körper die passende Eigenschaft zu.',
        answerType: 'matching',
        exerciseType: 'drag-match',
        correctAnswer: selected.map(p => `${p[0]}→${p[1]}`).join('; '),
        pairs: selected,
        hint: 'Überlege, wie viele Flächen und Kanten jeder Körper hat.',
        explanation: selected.map(p => `${p[0]}: ${p[1]}`).join(' | '),
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 40,
      };
    }

    const idx = randInt(0, koerperDaten.length - 1);
    const koerper = koerperDaten[idx];
    const eigenschaft = (['Flächen', 'Kanten', 'Ecken'] as const)[randInt(0, 2)];
    const eigenschaftKey = eigenschaft === 'Flächen' ? 'flaechen' : eigenschaft === 'Kanten' ? 'kanten' : 'ecken';
    const answer = koerper[eigenschaftKey];

    return {
      id: genId('k3-gkoe'),
      topicId: 'k3-geometrische-koerper',
      question: `Wie viele ${eigenschaft} hat ein ${koerper.name}?`,
      answerType: 'number',
      exerciseType: 'multiple-choice',
      correctAnswer: answer,
      distractors: [answer + 2, answer + 4, Math.max(0, answer - 2)].filter(d => d !== answer),
      hint: `Stelle dir einen ${koerper.name} vor und zähle die ${eigenschaft}.`,
      explanation: `Ein ${koerper.name} hat ${koerper.flaechen} Flächen, ${koerper.kanten} Kanten und ${koerper.ecken} Ecken.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 25,
      visualConfig: koerper.name === 'Würfel' || koerper.name === 'Quader' ? {
        type: 'cuboid-3d' as const,
        props: { width: 4, height: 4, depth: koerper.name === 'Würfel' ? 4 : 6, showDimensions: true },
      } : {
        type: 'geometric-shape' as const,
        props: { shape: 'rectangle' as const, width: 4, height: 4, showDimensions: false },
      },
    };
  },
};
