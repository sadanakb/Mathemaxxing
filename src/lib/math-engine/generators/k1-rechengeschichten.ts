import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k1-story-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NAMES = ['Anna', 'Tim', 'Lena', 'Max', 'Sophie', 'Paul', 'Mia', 'Leon'];
const ADD_ITEMS = ['Äpfel', 'Bonbons', 'Murmeln', 'Stifte', 'Bücher', 'Kekse'];
const SUB_ITEMS = ['Äpfel', 'Bonbons', 'Murmeln', 'Kekse', 'Aufkleber', 'Bälle'];

function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

type StoryData = { question: string; answer: number; hint: string; explanation: string; isAddition: boolean };

function makeAdditionStory(d: 1 | 2 | 3): StoryData {
  const maxN = d === 1 ? 5 : d === 2 ? 8 : 10;
  const name = pick(NAMES);
  const item = pick(ADD_ITEMS);
  const a = randInt(1, maxN);
  const b = randInt(1, Math.min(maxN, 10 - a));
  const answer = a + b;
  return {
    question: `${name} hat ${a} ${item}. ${name} bekommt ${b} ${item} dazu. Wie viele ${item} hat ${name} jetzt?`,
    answer, isAddition: true,
    hint: `${name} hatte ${a} und bekommt ${b} dazu. Rechne ${a} + ${b}.`,
    explanation: `${a} + ${b} = ${answer}. ${name} hat jetzt ${answer} ${item}.`,
  };
}

function makeSubtractionStory(d: 1 | 2 | 3): StoryData {
  const maxN = d === 1 ? 5 : d === 2 ? 8 : 10;
  const name = pick(NAMES);
  const item = pick(SUB_ITEMS);
  const a = randInt(2, maxN);
  const b = randInt(1, a);
  const answer = a - b;
  return {
    question: `${name} hat ${a} ${item}. ${name} gibt ${b} ${item} ab. Wie viele ${item} hat ${name} noch?`,
    answer, isAddition: false,
    hint: `${name} hatte ${a} und gibt ${b} weg. Rechne ${a} - ${b}.`,
    explanation: `${a} - ${b} = ${answer}. ${name} hat noch ${answer} ${item}.`,
  };
}

function makeCombinedStory(d: 1 | 2 | 3): StoryData {
  const maxN = d === 1 ? 5 : d === 2 ? 8 : 10;
  const name1 = pick(NAMES);
  let name2 = pick(NAMES);
  while (name2 === name1) name2 = pick(NAMES);
  const item = pick(ADD_ITEMS);
  const a = randInt(1, maxN);
  const b = randInt(1, maxN);
  const answer = a + b;
  return {
    question: `${name1} hat ${a} ${item} und ${name2} hat ${b} ${item}. Wie viele ${item} haben sie zusammen?`,
    answer, isAddition: true,
    hint: `Zähle die ${item} von ${name1} und ${name2} zusammen: ${a} + ${b}.`,
    explanation: `${a} + ${b} = ${answer}. Zusammen haben sie ${answer} ${item}.`,
  };
}

export const template: ExerciseTemplate = {
  topicId: 'k1-rechengeschichten',
  generate(difficulty = 1): Exercise {
    const storyType = randInt(0, 2);
    const exerciseVariant = randInt(0, 3);
    const d = difficulty as 1 | 2 | 3;

    const storyFns = [makeAdditionStory, makeSubtractionStory, makeCombinedStory];
    const story = storyFns[storyType](d);

    if (exerciseVariant === 0) {
      return {
        id: genId(), topicId: 'k1-rechengeschichten',
        question: story.question,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: story.answer,
        distractors: [story.answer - 1, story.answer + 1, story.answer + 2].filter(
          d => d >= 0 && d <= 20 && d !== story.answer
        ),
        hint: story.hint, explanation: story.explanation,
        difficulty, category: 'Konkret', estimatedSeconds: 20,
      };
    }

    if (exerciseVariant === 1) {
      const wrong = new Set<number>();
      while (wrong.size < 3) {
        const d = story.answer + randInt(-2, 3);
        if (d !== story.answer && d >= 0 && d <= 20) wrong.add(d);
      }
      return {
        id: genId(), topicId: 'k1-rechengeschichten',
        question: story.question,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: story.answer,
        distractors: [...wrong],
        hint: story.hint, explanation: story.explanation,
        difficulty, category: 'Konkret', estimatedSeconds: 25,
      };
    }

    if (exerciseVariant === 2) {
      // true-false: Is this the right answer?
      const showCorrect = randInt(0, 1) === 0;
      const shownAnswer = showCorrect ? story.answer : story.answer + (randInt(0, 1) === 0 ? 1 : -1);
      return {
        id: genId(), topicId: 'k1-rechengeschichten',
        question: `${story.question}\nStimmt das Ergebnis: ${shownAnswer}?`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shownAnswer === story.answer) ? 'wahr' : 'falsch',
        hint: story.hint,
        explanation: (shownAnswer === story.answer)
          ? `Ja! Das Ergebnis ${story.answer} ist richtig. ${story.explanation}`
          : `Nein, das Ergebnis ist ${story.answer}, nicht ${shownAnswer}. ${story.explanation}`,
        difficulty, category: 'Konkret', estimatedSeconds: 20,
      };
    }

    // exerciseVariant === 3: classify — Addieren oder Subtrahieren?
    // Generate two stories (one add, one subtract) for classification
    const addStory = makeAdditionStory(d);
    const subStory = makeSubtractionStory(d);
    return {
      id: genId(), topicId: 'k1-rechengeschichten',
      question: 'Sortiere: Addieren oder Subtrahieren?',
      answerType: 'drag-drop', exerciseType: 'classify',
      correctAnswer: 'ok',
      classifyItems: [addStory.question.split('.')[0], subStory.question.split('.')[0]],
      classifyCategories: ['Addieren (+)', 'Subtrahieren (−)'],
      classifyCorrect: {
        'Addieren (+)': [addStory.question.split('.')[0]],
        'Subtrahieren (−)': [subStory.question.split('.')[0]],
      },
      hint: 'Bei "mehr", "zusammen", "dazu" → Addieren. Bei "weniger", "weggeben", "verbraucht" → Subtrahieren.',
      explanation: 'Schlüsselwörter helfen: "dazu/zusammen" = +, "weg/weniger" = −.',
      difficulty, category: 'Konkret', estimatedSeconds: 30,
    };
  },
};
