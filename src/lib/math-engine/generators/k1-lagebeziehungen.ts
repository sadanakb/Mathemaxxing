import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-lage-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type LageScenario = {
  question: string;
  correct: string;
  wrong: string[];
};

const SCENARIOS_EASY: LageScenario[] = [
  { question: 'Der Ball liegt ___ dem Tisch.', correct: 'auf', wrong: ['unter', 'neben', 'hinter'] },
  { question: 'Die Katze sitzt ___ dem Stuhl.', correct: 'auf', wrong: ['unter', 'neben', 'vor'] },
  { question: 'Der Hund liegt ___ dem Bett.', correct: 'unter', wrong: ['auf', 'neben', 'hinter'] },
  { question: 'Das Bild hängt ___ der Tür.', correct: 'über', wrong: ['unter', 'neben', 'hinter'] },
  { question: 'Die Schuhe stehen ___ der Tür.', correct: 'vor', wrong: ['hinter', 'auf', 'unter'] },
  { question: 'Der Schrank steht ___ der Wand.', correct: 'vor', wrong: ['auf', 'unter', 'in'] },
];

const SCENARIOS_MEDIUM: LageScenario[] = [
  { question: 'Die Lampe hängt ___ dem Tisch.', correct: 'über', wrong: ['unter', 'neben', 'vor'] },
  { question: 'Der Stift liegt ___ dem Buch.', correct: 'neben', wrong: ['auf', 'unter', 'in'] },
  { question: 'Das Auto steht ___ dem Haus.', correct: 'vor', wrong: ['auf', 'unter', 'in'] },
  { question: 'Der Vogel sitzt ___ dem Baum.', correct: 'auf', wrong: ['unter', 'neben', 'vor'] },
  { question: 'Die Maus versteckt sich ___ dem Schrank.', correct: 'hinter', wrong: ['vor', 'auf', 'neben'] },
];

const SCENARIOS_HARD: LageScenario[] = [
  { question: 'Der Teddy liegt ___ dem Kissen.', correct: 'unter', wrong: ['auf', 'neben', 'vor'] },
  { question: 'Das Buch steht ___ Regal.', correct: 'im', wrong: ['auf dem', 'unter dem', 'vor dem'] },
  { question: 'Die Blume steht ___ den Büchern.', correct: 'zwischen', wrong: ['auf', 'unter', 'neben'] },
  { question: 'Der Ball rollt ___ dem Tor.', correct: 'hinter', wrong: ['vor', 'auf', 'neben'] },
];

type TrueFalseScenario = { statement: string; isTrue: boolean };

const TRUE_FALSE: TrueFalseScenario[] = [
  { statement: '"Links" ist das Gegenteil von "rechts".', isTrue: true },
  { statement: '"Oben" ist das Gegenteil von "links".', isTrue: false },
  { statement: '"Oben" ist das Gegenteil von "unten".', isTrue: true },
  { statement: '"Vor" ist das Gegenteil von "hinter".', isTrue: true },
  { statement: '"Neben" ist das Gegenteil von "unter".', isTrue: false },
  { statement: '"Links" ist das Gegenteil von "oben".', isTrue: false },
];

function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

export const template: ExerciseTemplate = {
  topicId: 'k1-lagebeziehungen',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 2);

    if (variant <= 1) {
      // multiple-choice: fill in the blank
      const pool = difficulty === 1 ? SCENARIOS_EASY
        : difficulty === 2 ? [...SCENARIOS_EASY, ...SCENARIOS_MEDIUM]
        : [...SCENARIOS_EASY, ...SCENARIOS_MEDIUM, ...SCENARIOS_HARD];
      const scenario = pick(pool);

      return {
        id: genId(),
        topicId: 'k1-lagebeziehungen',
        question: `Setze ein: ${scenario.question}`,
        answerType: 'multiple-choice',
        exerciseType: 'multiple-choice',
        correctAnswer: scenario.correct,
        distractors: scenario.wrong,
        options: [scenario.correct, ...scenario.wrong],
        hint: 'Stelle dir die Szene vor. Wo befindet sich der Gegenstand?',
        explanation: `Die richtige Antwort ist "${scenario.correct}".`,
        difficulty,
        category: 'Repräsentational',
        estimatedSeconds: 15,
      };
    }

    // true-false
    const tf = pick(TRUE_FALSE);

    return {
      id: genId(),
      topicId: 'k1-lagebeziehungen',
      question: `Stimmt das? ${tf.statement}`,
      answerType: 'true-false',
      exerciseType: 'true-false',
      correctAnswer: tf.isTrue ? 'wahr' : 'falsch',
      hint: 'Denke an die Gegenteile bei Richtungen.',
      explanation: tf.isTrue
        ? `Ja, das stimmt! ${tf.statement}`
        : `Nein, das stimmt nicht. ${tf.statement.replace('.', '')} ist falsch.`,
      difficulty,
      category: 'Repräsentational',
      estimatedSeconds: 10,
    };
  },
};
