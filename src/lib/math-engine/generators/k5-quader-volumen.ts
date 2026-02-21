import type { Exercise, ExerciseTemplate, VisualConfig } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const template: ExerciseTemplate = {
  topicId: 'k5-quader-volumen',
  generate(difficulty = 1): Exercise {
    const d = difficulty as 1 | 2 | 3;
    const variant = randInt(1, 5);

    if (variant === 1) {
      // Volumen eines Würfels berechnen
      const a = d === 1 ? randInt(2, 5) : d === 2 ? randInt(3, 10) : randInt(5, 15);
      const vol = a * a * a;

      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Würfel hat die Kantenlänge ${a} cm. Berechne das Volumen in cm\u00b3.`,
        questionLatex: `\\text{Würfel mit } a = ${a}\\text{ cm. } V = ?`,
        answerType: 'number',
        correctAnswer: vol.toString(),
        hint: `Volumen eines Würfels: V = a \u00b7 a \u00b7 a = a\u00b3`,
        explanation: `V = ${a}\u00b3 = ${a} \u00b7 ${a} \u00b7 ${a} = ${vol} cm\u00b3`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 15 : d === 2 ? 25 : 35,
        exerciseType: 'number-input',
        visualConfig: {
          type: 'cuboid-3d' as const,
          props: { width: a, height: a, depth: a, labels: true },
        } as VisualConfig,
      };
    }

    if (variant === 2) {
      // Volumen eines Quaders berechnen
      const l = d === 1 ? randInt(2, 6) : d === 2 ? randInt(3, 10) : randInt(5, 15);
      const b = d === 1 ? randInt(2, 6) : d === 2 ? randInt(3, 10) : randInt(5, 15);
      const h = d === 1 ? randInt(2, 6) : d === 2 ? randInt(3, 10) : randInt(5, 15);
      const vol = l * b * h;

      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Quader hat die Maße: Länge = ${l} cm, Breite = ${b} cm, Höhe = ${h} cm. Berechne das Volumen in cm\u00b3.`,
        questionLatex: `V = l \\cdot b \\cdot h = ${l} \\cdot ${b} \\cdot ${h} = ?`,
        answerType: 'number',
        correctAnswer: vol.toString(),
        hint: 'Volumen eines Quaders: V = Länge \u00b7 Breite \u00b7 Höhe',
        explanation: `V = ${l} \u00b7 ${b} \u00b7 ${h} = ${vol} cm\u00b3`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
        visualConfig: {
          type: 'cuboid-3d' as const,
          props: { width: l, height: h, depth: b, labels: true },
        } as VisualConfig,
      };
    }

    if (variant === 3) {
      // Oberfläche eines Würfels berechnen
      const a = d === 1 ? randInt(2, 5) : d === 2 ? randInt(3, 8) : randInt(5, 12);
      const o = 6 * a * a;

      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Würfel hat die Kantenlänge ${a} cm. Berechne die Oberfläche in cm\u00b2.`,
        questionLatex: `O = 6 \\cdot a^2 = 6 \\cdot ${a}^2 = ?`,
        answerType: 'number',
        correctAnswer: o.toString(),
        hint: `Ein Würfel hat 6 gleich große quadratische Flächen. O = 6 \u00b7 a\u00b2`,
        explanation: `O = 6 \u00b7 ${a}\u00b2 = 6 \u00b7 ${a * a} = ${o} cm\u00b2`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 20 : d === 2 ? 30 : 40,
        exerciseType: 'number-input',
      };
    }

    if (variant === 4) {
      // Oberfläche eines Quaders berechnen
      const l = d === 1 ? randInt(2, 5) : d === 2 ? randInt(3, 8) : randInt(4, 12);
      const b = d === 1 ? randInt(2, 5) : d === 2 ? randInt(3, 8) : randInt(4, 12);
      const h = d === 1 ? randInt(2, 5) : d === 2 ? randInt(3, 8) : randInt(4, 12);
      const o = 2 * (l * b + l * h + b * h);

      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Quader hat die Maße: Länge = ${l} cm, Breite = ${b} cm, Höhe = ${h} cm. Berechne die Oberfläche in cm\u00b2.`,
        questionLatex: `O = 2 \\cdot (l \\cdot b + l \\cdot h + b \\cdot h)`,
        answerType: 'number',
        correctAnswer: o.toString(),
        hint: 'Ein Quader hat 3 Paare gleich großer Seitenflächen. O = 2 \u00b7 (l\u00b7b + l\u00b7h + b\u00b7h)',
        explanation: `O = 2 \u00b7 (${l}\u00b7${b} + ${l}\u00b7${h} + ${b}\u00b7${h}) = 2 \u00b7 (${l * b} + ${l * h} + ${b * h}) = 2 \u00b7 ${l * b + l * h + b * h} = ${o} cm\u00b2`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: d === 1 ? 30 : d === 2 ? 40 : 55,
        exerciseType: 'number-input',
      };
    }

    // variant 5: Sachaufgabe / Fehlende Kante berechnen
    if (d === 1) {
      // Gegeben: Volumen und zwei Kanten, finde die dritte
      const l = randInt(2, 6);
      const b = randInt(2, 6);
      const h = randInt(2, 6);
      const vol = l * b * h;
      // Ask for h
      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Quader hat das Volumen ${vol} cm\u00b3. Die Länge ist ${l} cm und die Breite ist ${b} cm. Wie hoch ist der Quader (in cm)?`,
        answerType: 'number',
        correctAnswer: h.toString(),
        hint: `V = l \u00b7 b \u00b7 h. Stelle nach h um: h = V \u00f7 (l \u00b7 b)`,
        explanation: `h = ${vol} \u00f7 (${l} \u00b7 ${b}) = ${vol} \u00f7 ${l * b} = ${h} cm`,
        difficulty: d,
        category: 'Abstrakt',
        estimatedSeconds: 25,
        exerciseType: 'number-input',
      };
    }

    if (d === 2) {
      // Sachaufgabe: Aquarium füllen
      const l = randInt(3, 8) * 10; // cm
      const b = randInt(2, 5) * 10;
      const h = randInt(2, 4) * 10;
      const volCm3 = l * b * h;
      const volLiter = volCm3 / 1000;

      return {
        id: genId('k5-qvol'),
        topicId: 'k5-quader-volumen',
        question: `Ein Aquarium hat die Maße ${l} cm \u00d7 ${b} cm \u00d7 ${h} cm. Wie viele Liter Wasser passen hinein? (1 Liter = 1.000 cm\u00b3)`,
        answerType: 'number',
        correctAnswer: volLiter.toString(),
        hint: `Berechne zuerst das Volumen in cm\u00b3, dann teile durch 1.000 für Liter.`,
        explanation: `V = ${l} \u00b7 ${b} \u00b7 ${h} = ${volCm3} cm\u00b3 = ${volLiter} Liter`,
        difficulty: d,
        category: 'Konkret',
        estimatedSeconds: 40,
        exerciseType: 'number-input',
      };
    }

    // d === 3: Kantenlänge aus dem Volumen eines Würfels bestimmen
    const a = randInt(2, 10);
    const vol = a * a * a;

    return {
      id: genId('k5-qvol'),
      topicId: 'k5-quader-volumen',
      question: `Ein Würfel hat das Volumen ${vol} cm\u00b3. Wie lang ist eine Kante (in cm)?`,
      questionLatex: `V = a^3 = ${vol} \\quad a = ?`,
      answerType: 'number',
      correctAnswer: a.toString(),
      hint: `Welche Zahl ergibt mit sich selbst dreimal multipliziert ${vol}? Also: a \u00b7 a \u00b7 a = ${vol}.`,
      explanation: `a = \u00b3\u221a${vol} = ${a} cm (denn ${a}\u00b3 = ${a} \u00b7 ${a} \u00b7 ${a} = ${vol})`,
      difficulty: d,
      category: 'Abstrakt',
      estimatedSeconds: 45,
      exerciseType: 'number-input',
    };
  },
};
