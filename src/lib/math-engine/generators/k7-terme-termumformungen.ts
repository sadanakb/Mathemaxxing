import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-terme-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-terme-termumformungen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Gleichartige Terme zusammenfassen: ax + bx
      const a = randInt(2, 9);
      const b = randInt(1, 8);
      const op = Math.random() < 0.5 ? '+' : '-';
      const answer = op === '+' ? a + b : a - b;
      const sign = answer < 0 ? `(${answer})` : `${answer}`;

      return {
        id: genId(),
        topicId: 'k7-terme-termumformungen',
        question: `Fasse zusammen: ${a}x ${op} ${b}x`,
        answerType: 'text',
        correctAnswer: `${answer}x`,
        hint: `Gleichartige Terme haben dieselbe Variable. Rechne die Zahlen vor x zusammen: ${a} ${op} ${b}.`,
        explanation: `${a}x ${op} ${b}x = (${a} ${op} ${b})x = ${answer}x`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else if (d === 2) {
      // Klammer auflösen: a(bx + c)
      const a = randInt(2, 6);
      const b = randInt(1, 5);
      const c = randInt(1, 9);
      const op = Math.random() < 0.5 ? '+' : '-';
      const prod1 = a * b;
      const prod2 = a * c;

      return {
        id: genId(),
        topicId: 'k7-terme-termumformungen',
        question: `Löse die Klammer auf: ${a} * (${b}x ${op} ${c})`,
        answerType: 'text',
        correctAnswer: `${prod1}x ${op} ${prod2}`,
        hint: `Multipliziere ${a} mit jedem Glied in der Klammer: ${a} * ${b}x und ${a} * ${c}.`,
        explanation: `${a} * (${b}x ${op} ${c}) = ${a}*${b}x ${op} ${a}*${c} = ${prod1}x ${op} ${prod2}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    } else {
      // Ausmultiplizieren und zusammenfassen: a(bx + c) + d(ex + f)
      const a = randInt(2, 5);
      const b = randInt(1, 4);
      const c = randInt(1, 6);
      const e = randInt(2, 5);
      const f = randInt(1, 4);
      const g = randInt(1, 6);
      const op1 = Math.random() < 0.5 ? '+' : '-';
      const op2 = Math.random() < 0.5 ? '+' : '-';

      const xCoeff1 = a * b;
      const const1 = op1 === '+' ? a * c : -(a * c);
      const xCoeff2 = e * f;
      const const2 = op2 === '+' ? e * g : -(e * g);

      const totalX = xCoeff1 + xCoeff2;
      const totalConst = const1 + const2;

      const constPart = totalConst >= 0 ? `+ ${totalConst}` : `- ${Math.abs(totalConst)}`;

      return {
        id: genId(),
        topicId: 'k7-terme-termumformungen',
        question: `Vereinfache: ${a}(${b}x ${op1} ${c}) + ${e}(${f}x ${op2} ${g})`,
        answerType: 'text',
        correctAnswer: `${totalX}x ${constPart}`.replace('+ -', '- '),
        hint: `Erst beide Klammern ausmultiplizieren, dann gleichartige Terme zusammenfassen.`,
        explanation: `${a}(${b}x ${op1} ${c}) + ${e}(${f}x ${op2} ${g}) = ${xCoeff1}x ${const1 >= 0 ? '+' : '-'} ${Math.abs(const1)} + ${xCoeff2}x ${const2 >= 0 ? '+' : '-'} ${Math.abs(const2)} = ${totalX}x ${constPart}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
