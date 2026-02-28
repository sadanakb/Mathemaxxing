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

const namen = ['Lisa', 'Tom', 'Emma', 'Paul', 'Mia', 'Leon', 'Anna', 'Ben', 'Sophie', 'Max'];
function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

export const template: ExerciseTemplate = {
  topicId: 'k4-sachaufgaben-komplex',
  generate(difficulty = 1): Exercise {
    const variant = randInt(0, 3);
    const name = pick(namen);

    // ── Build problem data scaled to difficulty ───────────────────────────
    let questionText: string;
    let answer: number;
    let step1Text: string;
    let step2Text: string;

    if (difficulty === 1) {
      // Zweischrittig: Kaufen + Rückgeld
      const preis = randInt(3, 8);
      const anzahl = randInt(2, 5);
      const gesamt = preis * anzahl;
      const bezahlt = Math.ceil((gesamt + 1) / 10) * 10;
      const rueckgeld = bezahlt - gesamt;
      answer = rueckgeld;
      questionText = `${name} kauft ${anzahl} Hefte zu je ${preis} Euro und bezahlt mit einem ${bezahlt}-Euro-Schein. Wie viel Rückgeld bekommt ${name}?`;
      step1Text = `${anzahl} × ${preis} = ${gesamt} Euro (Gesamtpreis)`;
      step2Text = `${bezahlt} − ${gesamt} = ${rueckgeld} Euro (Rückgeld)`;
    } else if (difficulty === 2) {
      // Dreischrittig: Klassenfahrt
      const schueler = randInt(20, 28);
      const eintrittProPerson = randInt(5, 10);
      const essenProPerson = randInt(3, 7);
      const busKosten = randInt(100, 200);
      const gesamtProPerson = eintrittProPerson + essenProPerson;
      const gesamtSchueler = schueler * gesamtProPerson;
      const gesamt = busKosten + gesamtSchueler;
      answer = gesamt;
      questionText = `Die Klasse macht einen Ausflug. Der Bus kostet ${busKosten} Euro. Eintritt ${eintrittProPerson} Euro und Essen ${essenProPerson} Euro pro Person. Es fahren ${schueler} Schüler mit. Was kostet der Ausflug insgesamt?`;
      step1Text = `${eintrittProPerson} + ${essenProPerson} = ${gesamtProPerson} Euro (pro Person)`;
      step2Text = `${schueler} × ${gesamtProPerson} = ${gesamtSchueler} Euro (alle Schüler)`;
    } else {
      // Komplex: Flohmarkt
      const buecher = randInt(8, 15);
      const preisBuch = randInt(2, 4);
      const spiele = randInt(3, 6);
      const preisSpiel = randInt(5, 8);
      const einnahmen = buecher * preisBuch + spiele * preisSpiel;
      const standGebuehr = randInt(10, 20);
      const gewinn = einnahmen - standGebuehr;
      answer = gewinn;
      questionText = `${name} verkauft ${buecher} Bücher für je ${preisBuch} Euro und ${spiele} Spiele für je ${preisSpiel} Euro. Die Standgebühr beträgt ${standGebuehr} Euro. Wie viel Gewinn macht ${name}?`;
      step1Text = `${buecher} × ${preisBuch} + ${spiele} × ${preisSpiel} = ${einnahmen} Euro (Einnahmen)`;
      step2Text = `${einnahmen} − ${standGebuehr} = ${gewinn} Euro (Gewinn)`;
    }

    // ── Variants ──────────────────────────────────────────────────────────

    if (variant === 0) {
      // number-input
      return {
        id: genId('k4-sach'), topicId: 'k4-sachaufgaben-komplex',
        question: questionText,
        answerType: 'number', exerciseType: 'number-input',
        correctAnswer: answer,
        hint: `Schritt 1: ${step1Text}. Schritt 2: ${step2Text}.`,
        explanation: `${step1Text}. ${step2Text}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 40 : difficulty === 2 ? 60 : 75,
      };
    }

    if (variant === 1) {
      // multiple-choice
      const d = Math.max(1, Math.round(answer * 0.1));
      const distractors = [answer + d, answer - d, answer + 2 * d]
        .filter(v => v > 0 && v !== answer).slice(0, 3);
      return {
        id: genId('k4-sach'), topicId: 'k4-sachaufgaben-komplex',
        question: questionText,
        answerType: 'multiple-choice', exerciseType: 'multiple-choice',
        correctAnswer: answer, distractors,
        hint: `Rechne schrittweise: ${step1Text}.`,
        explanation: `${step1Text}. ${step2Text}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: difficulty === 1 ? 35 : difficulty === 2 ? 50 : 65,
      };
    }

    if (variant === 2) {
      // true-false: Stimmt das Ergebnis?
      const showCorrect = randInt(0, 1) === 0;
      const d = Math.max(1, randInt(1, Math.max(1, Math.round(answer * 0.15))));
      const shown = showCorrect ? answer : answer + (randInt(0, 1) === 0 ? d : -d);
      return {
        id: genId('k4-sach'), topicId: 'k4-sachaufgaben-komplex',
        question: `${questionText}\nStimmt das Ergebnis: ${shown}?`,
        answerType: 'true-false', exerciseType: 'true-false',
        correctAnswer: (shown === answer) ? 'wahr' : 'falsch',
        hint: `Schritt 1: ${step1Text}.`,
        explanation: shown === answer
          ? `Ja, das Ergebnis ${answer} ist korrekt.`
          : `Nein, das richtige Ergebnis ist ${answer}. ${step2Text}.`,
        difficulty, category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    // variant === 3: drag-sort — Rechenschritte in die richtige Reihenfolge bringen
    const extraStep = difficulty >= 2
      ? `Ergebnis prüfen: ${answer} ist das Endresultat`
      : null;
    const steps = extraStep
      ? shuffle([step1Text, step2Text, extraStep])
      : shuffle([step1Text, step2Text]);
    const correctOrder = extraStep
      ? [step1Text, step2Text, extraStep].join(', ')
      : [step1Text, step2Text].join(', ');
    return {
      id: genId('k4-sach'), topicId: 'k4-sachaufgaben-komplex',
      question: `${questionText}\nBringe die Rechenschritte in die richtige Reihenfolge.`,
      answerType: 'drag-drop', exerciseType: 'drag-sort',
      items: steps,
      correctAnswer: correctOrder,
      hint: 'Was muss man zuerst berechnen? Was folgt daraus?',
      explanation: `Richtige Reihenfolge: 1) ${step1Text}. 2) ${step2Text}.`,
      difficulty, category: 'Abstrakt',
      estimatedSeconds: 40,
    };
  },
};
