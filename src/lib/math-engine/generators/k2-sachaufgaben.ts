import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-sach-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type WordProblemTemplate = {
  template: (a: number, b: number, answer: number) => string;
  isAddition: boolean;
};

const TEMPLATES_ADD: WordProblemTemplate[] = [
  {
    template: (a, b, answer) => `In der Klasse 2a sind ${a} Kinder. In der Klasse 2b sind ${b} Kinder. Wie viele Kinder sind es zusammen?`,
    isAddition: true,
  },
  {
    template: (a, b) => `Auf dem Spielplatz spielen ${a} Kinder. Dann kommen noch ${b} Kinder dazu. Wie viele Kinder sind jetzt auf dem Spielplatz?`,
    isAddition: true,
  },
  {
    template: (a, b) => `Tim hat ${a} Murmeln. Zum Geburtstag bekommt er ${b} Murmeln dazu. Wie viele Murmeln hat Tim jetzt?`,
    isAddition: true,
  },
  {
    template: (a, b) => `Im Regal stehen ${a} Bücher. Lena stellt ${b} weitere Bücher dazu. Wie viele Bücher stehen jetzt im Regal?`,
    isAddition: true,
  },
];

const TEMPLATES_SUB: WordProblemTemplate[] = [
  {
    template: (a, b) => `In der Klasse sind ${a} Kinder. ${b} sind krank. Wie viele Kinder sind da?`,
    isAddition: false,
  },
  {
    template: (a, b) => `Auf dem Schulhof spielen ${a} Kinder. ${b} gehen nach Hause. Wie viele Kinder bleiben?`,
    isAddition: false,
  },
  {
    template: (a, b) => `Anna hat ${a} Aufkleber. Sie verschenkt ${b}. Wie viele hat sie noch?`,
    isAddition: false,
  },
  {
    template: (a, b) => `Im Bus sitzen ${a} Personen. An der Haltestelle steigen ${b} aus. Wie viele sitzen noch im Bus?`,
    isAddition: false,
  },
];

export const template: ExerciseTemplate = {
  topicId: 'k2-sachaufgaben',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Simple addition or subtraction, results up to 50
      const isAdd = randInt(0, 1) === 0;
      const templates = isAdd ? TEMPLATES_ADD : TEMPLATES_SUB;
      const tmpl = templates[randInt(0, templates.length - 1)];

      const a = randInt(10, 30);
      const b = isAdd ? randInt(5, 50 - a) : randInt(3, a - 2);
      const answer = isAdd ? a + b : a - b;

      return {
        id: genId(),
        topicId: 'k2-sachaufgaben',
        question: tmpl.template(a, b, answer),
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: isAdd
          ? `Das ist eine Plusaufgabe: ${a} + ${b} = ?`
          : `Das ist eine Minusaufgabe: ${a} - ${b} = ?`,
        explanation: isAdd
          ? `${a} + ${b} = ${answer}.`
          : `${a} - ${b} = ${answer}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    }

    if (difficulty === 2) {
      // Larger numbers up to 100
      const isAdd = randInt(0, 1) === 0;
      const templates = isAdd ? TEMPLATES_ADD : TEMPLATES_SUB;
      const tmpl = templates[randInt(0, templates.length - 1)];

      const a = randInt(20, 70);
      const b = isAdd ? randInt(10, 100 - a) : randInt(5, a - 5);
      const answer = isAdd ? a + b : a - b;

      return {
        id: genId(),
        topicId: 'k2-sachaufgaben',
        question: tmpl.template(a, b, answer),
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: answer,
        hint: isAdd
          ? `Überlege: Wird es mehr oder weniger? Es wird mehr -> Plusaufgabe: ${a} + ${b}.`
          : `Überlege: Wird es mehr oder weniger? Es wird weniger -> Minusaufgabe: ${a} - ${b}.`,
        explanation: isAdd
          ? `Rechnung: ${a} + ${b} = ${answer}.`
          : `Rechnung: ${a} - ${b} = ${answer}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 40,
      };
    }

    // Difficulty 3: Two-step word problem
    const a = randInt(20, 50);
    const b = randInt(5, 20);
    const c = randInt(3, 15);
    const step1 = a + b;
    const answer = step1 - c;

    const problems = [
      `In der Schule sind ${a} Kinder. Am Morgen kommen noch ${b} dazu. Nach der Pause gehen ${c} nach Hause. Wie viele Kinder sind noch da?`,
      `Tim sammelt ${a} Kastanien. Er findet noch ${b} weitere. Dann verschenkt er ${c}. Wie viele hat er jetzt?`,
      `Im Schwimmbad sind ${a} Besucher. Es kommen ${b} neue Besucher. Dann gehen ${c} weg. Wie viele Besucher sind jetzt da?`,
    ];

    return {
      id: genId(),
      topicId: 'k2-sachaufgaben',
      question: problems[randInt(0, problems.length - 1)],
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: answer,
      hint: `Rechne in zwei Schritten: Erst ${a} + ${b} = ${step1}. Dann ${step1} - ${c} = ?`,
      explanation: `Schritt 1: ${a} + ${b} = ${step1}. Schritt 2: ${step1} - ${c} = ${answer}.`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 50,
    };
  },
};
