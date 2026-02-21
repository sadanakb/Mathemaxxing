import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(n: number, d: number): [number, number] {
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}

function fractionStr(n: number, d: number): string {
  const [sn, sd] = simplify(n, d);
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

export const template: ExerciseTemplate = {
  topicId: 'k6-bruchrechnung',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // Add same denominator
      const d = randInt(2, 8);
      const n1 = randInt(1, d - 1);
      const n2 = randInt(1, d - n1);
      const rn = n1 + n2;
      const [sn, sd] = simplify(rn, d);
      return {
        id: genId('k6-bruch'),
        topicId: 'k6-bruchrechnung',
        question: `${n1}/${d} + ${n2}/${d} = ?`,
        questionLatex: `\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}} = ?`,
        answerType: 'fraction',
        correctAnswer: fractionStr(sn, sd),
        correctAnswerLatex: sd === 1 ? `${sn}` : `\\frac{${sn}}{${sd}}`,
        hint: 'Gleiche Nenner: Zähler addieren, Nenner bleibt.',
        explanation: `${n1}/${d} + ${n2}/${d} = ${rn}/${d}${sn !== rn || sd !== d ? ` = ${fractionStr(sn, sd)}` : ''}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 30,
      };
    } else if (difficulty === 2) {
      // Add different denominators (LCM needed)
      const d1 = randInt(2, 6);
      let d2 = randInt(2, 6);
      while (d2 === d1) d2 = randInt(2, 6);
      const lcm = (d1 * d2) / gcd(d1, d2);
      const n1 = randInt(1, d1 - 1);
      const n2 = randInt(1, d2 - 1);
      const rn = n1 * (lcm / d1) + n2 * (lcm / d2);
      const [sn, sd] = simplify(rn, lcm);
      return {
        id: genId('k6-bruch'),
        topicId: 'k6-bruchrechnung',
        question: `${n1}/${d1} + ${n2}/${d2} = ?`,
        questionLatex: `\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = ?`,
        answerType: 'fraction',
        correctAnswer: fractionStr(sn, sd),
        correctAnswerLatex: sd === 1 ? `${sn}` : `\\frac{${sn}}{${sd}}`,
        hint: `Finde den gemeinsamen Nenner (kgV von ${d1} und ${d2} = ${lcm}).`,
        explanation: `${n1}/${d1} = ${n1 * (lcm / d1)}/${lcm}, ${n2}/${d2} = ${n2 * (lcm / d2)}/${lcm} → ${rn}/${lcm} = ${fractionStr(sn, sd)}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    } else {
      // Multiply fractions
      const n1 = randInt(1, 5);
      const d1 = randInt(2, 6);
      const n2 = randInt(1, 5);
      const d2 = randInt(2, 6);
      const rn = n1 * n2;
      const rd = d1 * d2;
      const [sn, sd] = simplify(rn, rd);
      return {
        id: genId('k6-bruch'),
        topicId: 'k6-bruchrechnung',
        question: `${n1}/${d1} × ${n2}/${d2} = ?`,
        questionLatex: `\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}} = ?`,
        answerType: 'fraction',
        correctAnswer: fractionStr(sn, sd),
        correctAnswerLatex: sd === 1 ? `${sn}` : `\\frac{${sn}}{${sd}}`,
        hint: 'Zähler × Zähler, Nenner × Nenner, dann kürzen.',
        explanation: `${n1}/${d1} × ${n2}/${d2} = ${rn}/${rd} = ${fractionStr(sn, sd)}`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 60,
      };
    }
  },
};
