import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

type GeoBegriff = {
  name: string;
  definition: string;
  symbol?: string;
};

const begriffe: GeoBegriff[] = [
  { name: 'Punkt', definition: 'Hat keine Ausdehnung, nur eine Position.', symbol: 'P' },
  { name: 'Gerade', definition: 'Unendlich lang in beide Richtungen, keine Endpunkte.', symbol: 'g' },
  { name: 'Strecke', definition: 'Hat zwei Endpunkte und eine feste Länge.', symbol: 'AB' },
  { name: 'Strahl', definition: 'Hat einen Anfangspunkt und geht in eine Richtung unendlich weiter.', symbol: 's' },
];

const lagebeziehungen = [
  { name: 'parallel', definition: 'Zwei Geraden, die den gleichen Abstand haben und sich nie schneiden.', symbol: '\\parallel' },
  { name: 'senkrecht', definition: 'Zwei Geraden, die sich im rechten Winkel (90\u00b0) schneiden.', symbol: '\\perp' },
  { name: 'sich schneidend', definition: 'Zwei Geraden, die sich in genau einem Punkt treffen (nicht im rechten Winkel).', symbol: '' },
];

export const template: ExerciseTemplate = {
  topicId: 'k5-geometrische-grundbegriffe',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Begriff zuordnen: Was ist das? (Multiple Choice)
      const all = [...begriffe];
      const target = all[randInt(0, all.length - 1)];
      const distractors = all.filter(b => b.name !== target.name).map(b => b.name);

      return {
        id: genId('k5-geo'),
        topicId: 'k5-geometrische-grundbegriffe',
        question: `${target.definition} Welcher geometrische Grundbegriff wird hier beschrieben?`,
        answerType: 'multiple-choice',
        correctAnswer: target.name,
        distractors,
        hint: 'Überlege: Hat das Objekt Endpunkte? Ist es unendlich lang?',
        explanation: `${target.definition} Das ist ein/eine ${target.name}.`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 25 : 30,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 2) {
      // True/False: Aussagen über geometrische Begriffe
      const statements = [
        { text: 'Eine Strecke hat zwei Endpunkte.', correct: true },
        { text: 'Eine Gerade hat zwei Endpunkte.', correct: false },
        { text: 'Ein Strahl hat genau einen Anfangspunkt.', correct: true },
        { text: 'Eine Strecke ist unendlich lang.', correct: false },
        { text: 'Parallele Geraden schneiden sich nie.', correct: true },
        { text: 'Senkrechte Geraden schneiden sich im rechten Winkel.', correct: true },
        { text: 'Ein Strahl hat zwei Endpunkte.', correct: false },
        { text: 'Eine Gerade geht in beide Richtungen unendlich weiter.', correct: true },
        { text: 'Parallele Geraden haben immer den gleichen Abstand.', correct: true },
        { text: 'Senkrechte Geraden schneiden sich in einem 45\u00b0-Winkel.', correct: false },
        { text: 'Ein Punkt hat keine Ausdehnung.', correct: true },
        { text: 'Jede Strecke ist auch eine Gerade.', correct: false },
      ];

      const pool = d === 1 ? statements.slice(0, 6) : d === 2 ? statements.slice(0, 9) : statements;
      const stmt = pool[randInt(0, pool.length - 1)];

      return {
        id: genId('k5-geo'),
        topicId: 'k5-geometrische-grundbegriffe',
        question: `Stimmt diese Aussage? "${stmt.text}"`,
        answerType: 'true-false',
        correctAnswer: stmt.correct ? 'wahr' : 'falsch',
        hint: 'Erinnere dich an die Definitionen von Punkt, Gerade, Strecke und Strahl.',
        explanation: stmt.correct ? 'Ja, die Aussage ist richtig.' : 'Nein, die Aussage ist falsch.',
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
      };
    }

    if (variant === 3) {
      // Lagebeziehung erkennen: parallel, senkrecht oder sich schneidend
      const lage = lagebeziehungen[randInt(0, lagebeziehungen.length - 1)];
      const distractors = lagebeziehungen.filter(l => l.name !== lage.name).map(l => l.name);

      const examples: Record<string, string[]> = {
        parallel: [
          'Die beiden Schienen einer Eisenbahnstrecke',
          'Die gegenüberliegenden Seiten eines Rechtecks',
          'Zwei Linien auf einem linierten Blatt Papier',
        ],
        senkrecht: [
          'Die Kante einer Tür und der Fußboden',
          'Ein Kreuz (+)',
          'Die Seiten eines rechten Winkels',
        ],
        'sich schneidend': [
          'Die Buchstabe X',
          'Zwei Straßen an einer Kreuzung (ohne rechten Winkel)',
          'Die Diagonalen eines Parallelogramms',
        ],
      };

      const exampleList = examples[lage.name] ?? [];
      const example = exampleList[randInt(0, exampleList.length - 1)] ?? '';

      return {
        id: genId('k5-geo'),
        topicId: 'k5-geometrische-grundbegriffe',
        question: d <= 2
          ? `${lage.definition} Welche Lagebeziehung ist das?`
          : `"${example}" — Welche Lagebeziehung haben die beschriebenen Geraden?`,
        answerType: 'multiple-choice',
        correctAnswer: lage.name,
        distractors,
        hint: 'Parallel = gleicher Abstand, nie schneiden. Senkrecht = 90\u00b0 Winkel. Sich schneidend = treffen sich in einem Punkt.',
        explanation: `Das beschreibt "${lage.name}": ${lage.definition}`,
        difficulty: d,
        category: d <= 2 ? 'Abstrakt' : 'Konkret',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 25 : 30,
        exerciseType: 'multiple-choice',
      };
    }

    if (variant === 4) {
      // Begriffe ordnen nach "Ausdehnung" (drag-sort)
      const items = ['Punkt', 'Strecke', 'Strahl', 'Gerade'];
      const shuffled = [...items].sort(() => Math.random() - 0.5);

      return {
        id: genId('k5-geo'),
        topicId: 'k5-geometrische-grundbegriffe',
        question: 'Ordne die geometrischen Objekte nach ihrer Ausdehnung (kürzestes zuerst).',
        answerType: 'drag-drop',
        correctAnswer: items.join(', '),
        items: shuffled,
        hint: 'Ein Punkt hat keine Länge. Eine Strecke ist begrenzt. Ein Strahl geht in eine Richtung ins Unendliche. Eine Gerade in beide.',
        explanation: 'Punkt (keine Ausdehnung) < Strecke (begrenzt) < Strahl (eine Richtung unendlich) < Gerade (beide Richtungen unendlich).',
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 25 : d === 2 ? 30 : 35,
        exerciseType: 'drag-sort',
      };
    }

    // variant 5: Strecke berechnen - Abstand zwischen zwei Punkten auf einer Zahlengeraden
    const maxCoord = d === 1 ? 10 : d === 2 ? 20 : 50;
    const p1 = randInt(0, maxCoord - 2);
    const p2 = randInt(p1 + 1, maxCoord);
    const length = p2 - p1;

    return {
      id: genId('k5-geo'),
      topicId: 'k5-geometrische-grundbegriffe',
      question: `Punkt A liegt bei ${p1} auf dem Zahlenstrahl und Punkt B bei ${p2}. Wie lang ist die Strecke AB?`,
      answerType: 'number',
      correctAnswer: length.toString(),
      hint: 'Die Länge einer Strecke ist der Abstand zwischen den beiden Endpunkten: größere Zahl minus kleinere Zahl.',
      explanation: `Strecke AB = ${p2} - ${p1} = ${length}`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: d === 1 ? 15 : d === 2 ? 20 : 25,
      exerciseType: 'number-input',
    };
  },
};
