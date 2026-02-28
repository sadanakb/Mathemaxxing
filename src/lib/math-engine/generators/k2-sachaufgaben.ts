import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k2-sach-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type WordProblemTemplate = { template: (a: number, b: number) => string; isAddition: boolean };

const TEMPLATES_ADD: WordProblemTemplate[] = [
  { template: (a, b) => `In der Klasse 2a sind ${a} Kinder. In der Klasse 2b sind ${b} Kinder. Wie viele Kinder sind es zusammen?`, isAddition: true },
  { template: (a, b) => `Auf dem Spielplatz spielen ${a} Kinder. Dann kommen noch ${b} dazu. Wie viele Kinder sind jetzt da?`, isAddition: true },
  { template: (a, b) => `Tim hat ${a} Murmeln. Zum Geburtstag bekommt er ${b} dazu. Wie viele hat Tim jetzt?`, isAddition: true },
];

const TEMPLATES_SUB: WordProblemTemplate[] = [
  { template: (a, b) => `In der Klasse sind ${a} Kinder. ${b} sind krank. Wie viele Kinder sind da?`, isAddition: false },
  { template: (a, b) => `Auf dem Schulhof spielen ${a} Kinder. ${b} gehen nach Hause. Wie viele bleiben?`, isAddition: false },
  { template: (a, b) => `Anna hat ${a} Aufkleber. Sie verschenkt ${b}. Wie viele hat sie noch?`, isAddition: false },
];

function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

export const template: ExerciseTemplate = {
  topicId: 'k2-sachaufgaben',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const isAdd = randInt(0, 1) === 0;
    const tmplList = isAdd ? TEMPLATES_ADD : TEMPLATES_SUB;
    const tmpl = pick(tmplList);

    let a: number, b: number, answer: number;
    if (difficulty === 1) {
      a = randInt(10, 30); b = isAdd ? randInt(5, 50 - a) : randInt(3, a - 2);
    } else if (difficulty === 2) {
      a = randInt(20, 70); b = isAdd ? randInt(10, 100 - a) : randInt(5, a - 5);
    } else {
      // Two-step
      const c = randInt(3, 15);
      a = randInt(20, 50); b = randInt(5, 20);
      const step1 = a + b;
      answer = step1 - c;
      const twoStepQ = `Tim sammelt ${a} Kastanien. Er findet noch ${b} weitere. Dann verschenkt er ${c}. Wie viele hat er jetzt?`;

      if (variant === 0) {
        return {
          id: genId(), topicId: 'k2-sachaufgaben',
          question: twoStepQ,
          answerType: 'number', exerciseType: 'number-input',
          correctAnswer: answer,
          hint: `Schritt 1: ${a} + ${b} = ${step1}. Schritt 2: ${step1} - ${c} = ?`,
          explanation: `${a} + ${b} = ${step1}, dann ${step1} - ${c} = ${answer}.`,
          difficulty, category: 'Konkret', estimatedSeconds: 50,
        };
      }
      // difficulty 3 variants use simpler format
      const mcDistr = [answer + 5, answer - 3, answer + 10].filter(d => d >= 0 && d !== answer).slice(0, 3);
      return {
        id: genId(), topicId: 'k2-sachaufgaben',
        question: twoStepQ,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors: mcDistr,
        hint: `Rechne in zwei Schritten: Erst ${a} + ${b}, dann das Ergebnis minus ${c}.`,
        explanation: `${a} + ${b} = ${step1}. ${step1} - ${c} = ${answer}.`,
        difficulty, category: 'Konkret', estimatedSeconds: 50,
      };
    }

    answer = isAdd ? a + b : a - b;
    const questionText = tmpl.template(a, b);
    const distractors = [answer + 1, answer - 1, answer + 5].filter(d => d >= 0 && d !== answer).slice(0, 3);
    const hint = isAdd ? `Plus-Aufgabe: ${a} + ${b}` : `Minus-Aufgabe: ${a} - ${b}`;
    const explanation = `${a} ${isAdd ? '+' : '-'} ${b} = ${answer}.`;

    if (variant === 0) {
      return {
        id: genId(), topicId: 'k2-sachaufgaben',
        question: questionText,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer, distractors,
        hint, explanation,
        difficulty, category: 'Konkret', estimatedSeconds: 30,
      };
    }

    if (variant === 1) {
      return {
        id: genId(), topicId: 'k2-sachaufgaben',
        question: questionText,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint, explanation,
        difficulty, category: 'Konkret', estimatedSeconds: 30,
      };
    }

    if (variant === 2) {
      // true-false: ist dieses Ergebnis korrekt?
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? 5 : -3);
      return {
        id: genId(), topicId: 'k2-sachaufgaben',
        question: `${questionText}\nStimmt das Ergebnis: ${shownAnswer}?`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === answer) ? 'wahr' : 'falsch',
        hint,
        explanation: (shownAnswer === answer)
          ? `Ja, das Ergebnis ${answer} ist richtig!`
          : `Nein, das richtige Ergebnis ist ${answer}.`,
        difficulty, category: 'Konkret', estimatedSeconds: 30,
      };
    }

    // variant === 3: classify — Plus- oder Minus-Aufgabe?
    const addTmpl = pick(TEMPLATES_ADD);
    const subTmpl = pick(TEMPLATES_SUB);
    const addA = randInt(10, 30);
    const addB = randInt(5, 30);
    const subA = randInt(20, 50);
    const subB = randInt(5, subA - 2);
    const addText = addTmpl.template(addA, addB).split('.')[0];
    const subText = subTmpl.template(subA, subB).split('.')[0];
    return {
      id: genId(), topicId: 'k2-sachaufgaben',
      question: 'Sortiere: Plus-Aufgabe oder Minus-Aufgabe?',
      answerType: 'drag-drop', exerciseType: 'classify',
      correctAnswer: 'ok',
      classifyItems: [addText, subText],
      classifyCategories: ['Plus-Aufgabe (+)', 'Minus-Aufgabe (−)'],
      classifyCorrect: {
        'Plus-Aufgabe (+)': [addText],
        'Minus-Aufgabe (−)': [subText],
      },
      hint: '"dazu", "zusammen", "mehr" → Plus. "weg", "krank", "weniger" → Minus.',
      explanation: 'Schlüsselwörter verraten die Rechenart.',
      difficulty, category: 'Konkret', estimatedSeconds: 30,
    };
  },
};
