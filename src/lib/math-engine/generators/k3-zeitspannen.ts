import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function formatTime(h: number, m: number): string {
  return `${h}:${m.toString().padStart(2, '0')} Uhr`;
}

/**
 * k3-zeitspannen — Zeitspannen berechnen
 *
 * Difficulty 1: Zeitspanne in vollen Stunden (number-input)
 * Difficulty 2: Zeitspanne in Stunden und Minuten, clock-drag
 * Difficulty 3: Endzeit berechnen, Alltagskontexte
 */
export const template: ExerciseTemplate = {
  topicId: 'k3-zeitspannen',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Volle Stunden
      const startH = randInt(7, 14);
      const dauer = randInt(1, 5);
      const endH = startH + dauer;

      return {
        id: genId('k3-zeit'),
        topicId: 'k3-zeitspannen',
        question: `Der Unterricht beginnt um ${formatTime(startH, 0)} und endet um ${formatTime(endH, 0)}. Wie viele Stunden dauert er?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: dauer,
        hint: `Zähle die Stunden von ${startH} Uhr bis ${endH} Uhr.`,
        explanation: `Von ${formatTime(startH, 0)} bis ${formatTime(endH, 0)} sind es ${dauer} Stunden.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 15,
      };
    }

    if (difficulty === 2) {
      // Stunden und Minuten, mit Uhr
      const startH = randInt(8, 14);
      const startM = randInt(0, 3) * 15;
      const dauerMin = randInt(2, 8) * 15; // 30, 45, 60, 75, 90, 105, 120 Minuten
      const totalStartMin = startH * 60 + startM;
      const totalEndMin = totalStartMin + dauerMin;
      const endH = Math.floor(totalEndMin / 60);
      const endM = totalEndMin % 60;

      return {
        id: genId('k3-zeit'),
        topicId: 'k3-zeitspannen',
        question: `Beginn: ${formatTime(startH, startM)}. Dauer: ${dauerMin} Minuten. Wann ist Schluss? Gib die Stunde an.`,
        answerType: 'number',
        exerciseType: 'clock-drag',
        correctAnswer: endH,
        clockTarget: { hours: endH, minutes: endM },
        hint: `Addiere ${dauerMin} Minuten zu ${formatTime(startH, startM)}.`,
        explanation: `${formatTime(startH, startM)} + ${dauerMin} min = ${formatTime(endH, endM)}.`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 30,
      };
    }

    // Difficulty 3: Alltagskontext mit Zeitspannenberechnung
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Dauer berechnen
      const startH = randInt(8, 12);
      const startM = randInt(0, 11) * 5;
      const endH = startH + randInt(1, 4);
      const endM = randInt(0, 11) * 5;
      let dauerMin = (endH * 60 + endM) - (startH * 60 + startM);
      if (dauerMin < 0) dauerMin += 60;

      return {
        id: genId('k3-zeit'),
        topicId: 'k3-zeitspannen',
        question: `Ein Film startet um ${formatTime(startH, startM)} und endet um ${formatTime(endH, endM)}. Wie viele Minuten dauert der Film?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: dauerMin,
        hint: `Rechne von ${formatTime(startH, startM)} bis ${formatTime(endH, endM)} in Minuten.`,
        explanation: `Von ${formatTime(startH, startM)} bis ${formatTime(endH, endM)} = ${dauerMin} Minuten (${Math.floor(dauerMin / 60)} h ${dauerMin % 60} min).`,
        difficulty,
        category: 'Konkret',
        estimatedSeconds: 40,
      };
    }

    // Startzeit berechnen
    const endH = randInt(12, 17);
    const endM = randInt(0, 3) * 15;
    const dauerMin = randInt(3, 10) * 15;
    const totalStartMin = endH * 60 + endM - dauerMin;
    const startH = Math.floor(totalStartMin / 60);
    const startM = totalStartMin % 60;

    return {
      id: genId('k3-zeit'),
      topicId: 'k3-zeitspannen',
      question: `Das Training endet um ${formatTime(endH, endM)} und dauert ${dauerMin} Minuten. Wann hat es begonnen? Gib die Stunde an.`,
      answerType: 'number',
      exerciseType: 'clock-drag',
      correctAnswer: startH,
      clockTarget: { hours: startH, minutes: startM },
      hint: `Ziehe ${dauerMin} Minuten von ${formatTime(endH, endM)} ab.`,
      explanation: `${formatTime(endH, endM)} − ${dauerMin} min = ${formatTime(startH, startM)}.`,
      difficulty,
      category: 'Konkret',
      estimatedSeconds: 40,
    };
  },
};
