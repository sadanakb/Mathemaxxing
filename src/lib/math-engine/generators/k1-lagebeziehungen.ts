import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-lage-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type LageScenario = { question: string; correct: string; wrong: string[] };

const SCENARIOS_EASY: LageScenario[] = [
  { question: 'Der Ball liegt ___ dem Tisch.', correct: 'auf', wrong: ['unter', 'neben', 'hinter'] },
  { question: 'Die Katze sitzt ___ dem Stuhl.', correct: 'auf', wrong: ['unter', 'neben', 'vor'] },
  { question: 'Der Hund liegt ___ dem Bett.', correct: 'unter', wrong: ['auf', 'neben', 'hinter'] },
  { question: 'Das Bild hängt ___ der Tür.', correct: 'über', wrong: ['unter', 'neben', 'hinter'] },
  { question: 'Die Schuhe stehen ___ der Tür.', correct: 'vor', wrong: ['hinter', 'auf', 'unter'] },
];

const SCENARIOS_MEDIUM: LageScenario[] = [
  { question: 'Die Lampe hängt ___ dem Tisch.', correct: 'über', wrong: ['unter', 'neben', 'vor'] },
  { question: 'Der Stift liegt ___ dem Buch.', correct: 'neben', wrong: ['auf', 'unter', 'in'] },
  { question: 'Das Auto steht ___ dem Haus.', correct: 'vor', wrong: ['auf', 'unter', 'in'] },
  { question: 'Die Maus versteckt sich ___ dem Schrank.', correct: 'hinter', wrong: ['vor', 'auf', 'neben'] },
];

const SCENARIOS_HARD: LageScenario[] = [
  { question: 'Der Teddy liegt ___ dem Kissen.', correct: 'unter', wrong: ['auf', 'neben', 'vor'] },
  { question: 'Die Blume steht ___ den Büchern.', correct: 'zwischen', wrong: ['auf', 'unter', 'neben'] },
];

const TRUE_FALSE = [
  { statement: '"Links" ist das Gegenteil von "rechts".', isTrue: true },
  { statement: '"Oben" ist das Gegenteil von "links".', isTrue: false },
  { statement: '"Oben" ist das Gegenteil von "unten".', isTrue: true },
  { statement: '"Vor" ist das Gegenteil von "hinter".', isTrue: true },
  { statement: '"Neben" ist das Gegenteil von "unter".', isTrue: false },
];

function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

export const template: ExerciseTemplate = {
  topicId: 'k1-lagebeziehungen',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const pool = difficulty === 1 ? SCENARIOS_EASY
      : difficulty === 2 ? [...SCENARIOS_EASY, ...SCENARIOS_MEDIUM]
      : [...SCENARIOS_EASY, ...SCENARIOS_MEDIUM, ...SCENARIOS_HARD];

    if (variant === 0) {
      const scenario = pick(pool);
      return {
        id: genId(), topicId: 'k1-lagebeziehungen',
        question: `Setze ein: ${scenario.question}`,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: scenario.correct, distractors: scenario.wrong,
        hint: 'Stelle dir die Szene vor. Wo befindet sich der Gegenstand?',
        explanation: `Die richtige Antwort ist "${scenario.correct}".`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 15,
      };
    }

    if (variant === 1) {
      const tf = pick(TRUE_FALSE);
      return {
        id: genId(), topicId: 'k1-lagebeziehungen',
        question: `Stimmt das? ${tf.statement}`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: tf.isTrue ? 'wahr' : 'falsch',
        hint: 'Denke an die Gegenteile bei Richtungen.',
        explanation: tf.isTrue
          ? `Ja, das stimmt! ${tf.statement}`
          : `Nein, das stimmt nicht. Das ist kein echtes Gegenteilpaar.`,
        difficulty, category: 'Repräsentational', estimatedSeconds: 10,
      };
    }

    if (variant === 2) {
      // classify: sortiere Gegenstände in "über dem Tisch" vs "unter dem Tisch"
      const overItems = ['Lampe', 'Vogel', 'Ballon', 'Wolke', 'Bild'];
      const underItems = ['Schuh', 'Hund', 'Ball', 'Katze', 'Teppich'];
      const over = shuffle(overItems).slice(0, 2);
      const under = shuffle(underItems).slice(0, 2);
      const allItems = shuffle([...over, ...under]);
      return {
        id: genId(), topicId: 'k1-lagebeziehungen',
        question: 'Sortiere: Was ist über dem Tisch? Was ist unter dem Tisch?',
        answerType: 'drag-drop', exerciseType: 'classify',
        correctAnswer: 'ok',
        classifyItems: allItems,
        classifyCategories: ['Über dem Tisch', 'Unter dem Tisch'],
        classifyCorrect: {
          'Über dem Tisch': allItems.filter(i => over.includes(i)),
          'Unter dem Tisch': allItems.filter(i => under.includes(i)),
        },
        hint: 'Was befindet sich normalerweise über einem Tisch? Was darunter?',
        explanation: `Über dem Tisch: ${over.join(', ')}. Unter dem Tisch: ${under.join(', ')}.`,
        difficulty, category: 'Konkret', estimatedSeconds: 25,
      };
    }

    // variant === 3: drag-sort — ordne von "oben" nach "unten"
    const verticalItems = difficulty === 1
      ? [{ label: 'Dach', pos: 4 }, { label: 'Fenster', pos: 3 }, { label: 'Tür', pos: 2 }, { label: 'Boden', pos: 1 }]
      : [{ label: 'Himmel', pos: 5 }, { label: 'Dach', pos: 4 }, { label: 'Tür', pos: 3 }, { label: 'Keller', pos: 2 }, { label: 'Erdreich', pos: 1 }];
    const sorted = verticalItems.sort((a, b) => b.pos - a.pos).map(i => i.label);
    const shuffledItems = shuffle([...sorted]);
    return {
      id: genId(), topicId: 'k1-lagebeziehungen',
      question: 'Ordne von oben nach unten!',
      answerType: 'drag-drop', exerciseType: 'drag-sort',
      correctAnswer: sorted.join(', '),
      items: shuffledItems,
      hint: 'Was ist am höchsten? Was ist am niedrigsten?',
      explanation: `Von oben nach unten: ${sorted.join(', ')}.`,
      difficulty, category: 'Konkret', estimatedSeconds: 25,
    };
  },
};
