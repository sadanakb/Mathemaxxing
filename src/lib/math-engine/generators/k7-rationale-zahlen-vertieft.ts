import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId() { return `k7-rat-vert-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const template: ExerciseTemplate = {
  topicId: 'k7-rationale-zahlen-vertieft',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;

    if (d === 1) {
      // Addition und Subtraktion mit negativen ganzen Zahlen
      const a = randInt(-20, 20);
      const b = randInt(-20, 20);
      const op = Math.random() < 0.5 ? '+' : '-';
      const answer = op === '+' ? a + b : a - b;
      const bStr = b < 0 ? `(${b})` : `${b}`;

      return {
        id: genId(),
        topicId: 'k7-rationale-zahlen-vertieft',
        question: `Berechne: ${a} ${op} ${bStr}`,
        answerType: 'number',
        correctAnswer: answer,
        hint: op === '+'
          ? `Bei der Addition: Gleiche Vorzeichen => Betr\u00e4ge addieren, Vorzeichen beibehalten. Verschiedene Vorzeichen => Betr\u00e4ge subtrahieren, Vorzeichen der gr\u00f6\u00dferen Zahl.`
          : `Subtraktion = Addition des Gegenwerts: ${a} - ${bStr} = ${a} + (${-b}).`,
        explanation: `${a} ${op} ${bStr} = ${answer}`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    } else if (d === 2) {
      // Multiplikation und Division mit negativen Zahlen
      const isMultiplication = Math.random() < 0.5;

      if (isMultiplication) {
        const a = randInt(-12, 12);
        const b = randInt(-12, 12);
        const answer = a * b;
        const aStr = a < 0 ? `(${a})` : `${a}`;
        const bStr = b < 0 ? `(${b})` : `${b}`;

        return {
          id: genId(),
          topicId: 'k7-rationale-zahlen-vertieft',
          question: `Berechne: ${aStr} \u00b7 ${bStr}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Vorzeichenregel: Plus mal Plus = Plus, Minus mal Minus = Plus, Plus mal Minus = Minus.`,
          explanation: `${aStr} \u00b7 ${bStr} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      } else {
        const b = randInt(2, 12) * (Math.random() < 0.5 ? 1 : -1);
        const answer = randInt(-10, 10);
        const a = answer * b;
        const aStr = a < 0 ? `(${a})` : `${a}`;
        const bStr = b < 0 ? `(${b})` : `${b}`;

        return {
          id: genId(),
          topicId: 'k7-rationale-zahlen-vertieft',
          question: `Berechne: ${aStr} : ${bStr}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Vorzeichenregel bei Division: Gleiche Vorzeichen => positives Ergebnis. Verschiedene Vorzeichen => negatives Ergebnis.`,
          explanation: `${aStr} : ${bStr} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 25,
        };
      }
    } else {
      // Gemischte Aufgaben mit Br\u00fcchen und negativen Zahlen
      const types = ['bruchAdd', 'bruchMult', 'gemischt'];
      const type = types[randInt(0, types.length - 1)];

      if (type === 'bruchAdd') {
        // a/b + c/b mit negativen Werten
        const denom = [2, 3, 4, 5, 6][randInt(0, 4)];
        const num1 = randInt(-denom * 3, denom * 3);
        const num2 = randInt(-denom * 3, denom * 3);
        const resultNum = num1 + num2;
        const gcd = gcdCalc(Math.abs(resultNum), denom);
        const finalNum = resultNum / gcd;
        const finalDenom = denom / gcd;

        const num1Str = num1 < 0 ? `(${num1})` : `${num1}`;
        const num2Str = num2 >= 0 ? `+ ${num2}` : `- ${Math.abs(num2)}`;

        const answerStr = finalDenom === 1 ? `${finalNum}` : `${finalNum}/${finalDenom}`;

        return {
          id: genId(),
          topicId: 'k7-rationale-zahlen-vertieft',
          question: `Berechne: ${num1Str}/${denom} ${num2Str}/${denom}`,
          answerType: 'text',
          correctAnswer: answerStr,
          hint: `Gleichnamige Br\u00fcche: Z\u00e4hler addieren, Nenner beibehalten. Dann k\u00fcrzen.`,
          explanation: `${num1Str}/${denom} ${num2Str}/${denom} = ${resultNum}/${denom} = ${answerStr}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 45,
        };
      } else if (type === 'bruchMult') {
        const n1 = randInt(-5, 5);
        const d1 = randInt(2, 6);
        const n2 = randInt(-5, 5);
        const d2 = randInt(2, 6);
        const resultNum = n1 * n2;
        const resultDenom = d1 * d2;
        const gcd = gcdCalc(Math.abs(resultNum), resultDenom);
        const finalNum = resultNum / gcd;
        const finalDenom = resultDenom / gcd;

        const frac1 = n1 < 0 ? `(${n1}/${d1})` : `${n1}/${d1}`;
        const frac2 = n2 < 0 ? `(${n2}/${d2})` : `${n2}/${d2}`;
        const answerStr = finalDenom === 1 ? `${finalNum}` : `${finalNum}/${finalDenom}`;

        return {
          id: genId(),
          topicId: 'k7-rationale-zahlen-vertieft',
          question: `Berechne: ${frac1} \u00b7 ${frac2}`,
          answerType: 'text',
          correctAnswer: answerStr,
          hint: `Br\u00fcche multiplizieren: Z\u00e4hler mal Z\u00e4hler, Nenner mal Nenner. Vorzeichen beachten!`,
          explanation: `${frac1} \u00b7 ${frac2} = ${resultNum}/${resultDenom} = ${answerStr}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 50,
        };
      } else {
        // Gemischte Rechnung: a + b * c mit negativen Zahlen
        const a = randInt(-10, 10);
        const b = randInt(-8, 8);
        const c = randInt(-8, 8);
        const answer = a + b * c;
        const bStr = b < 0 ? `(${b})` : `${b}`;
        const cStr = c < 0 ? `(${c})` : `${c}`;

        return {
          id: genId(),
          topicId: 'k7-rationale-zahlen-vertieft',
          question: `Berechne (Punkt vor Strich): ${a} + ${bStr} \u00b7 ${cStr}`,
          answerType: 'number',
          correctAnswer: answer,
          hint: `Punkt vor Strich! Erst ${bStr} \u00b7 ${cStr} = ${b * c}, dann ${a} + ${b * c} rechnen.`,
          explanation: `${a} + ${bStr} \u00b7 ${cStr} = ${a} + ${b * c} = ${answer}`,
          difficulty: d,
          category: 'Abstrakt',
          estimatedSeconds: 40,
        };
      }
    }
  },
};

function gcdCalc(a: number, b: number): number {
  if (a === 0) return b;
  return gcdCalc(b % a, a);
}
