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

type Gesetz = {
  name: string;
  beispiel: string;
  erklärung: string;
};

const gesetze: Gesetz[] = [
  { name: 'Kommutativgesetz (Addition)', beispiel: '3 + 5 = 5 + 3', erklärung: 'Bei der Addition darf man die Summanden vertauschen.' },
  { name: 'Kommutativgesetz (Multiplikation)', beispiel: '4 × 7 = 7 × 4', erklärung: 'Bei der Multiplikation darf man die Faktoren vertauschen.' },
  { name: 'Assoziativgesetz (Addition)', beispiel: '(2 + 3) + 4 = 2 + (3 + 4)', erklärung: 'Bei der Addition darf man die Klammern verschieben.' },
  { name: 'Assoziativgesetz (Multiplikation)', beispiel: '(2 × 3) × 4 = 2 × (3 × 4)', erklärung: 'Bei der Multiplikation darf man die Klammern verschieben.' },
  { name: 'Distributivgesetz', beispiel: '3 × (4 + 5) = 3 × 4 + 3 × 5', erklärung: 'Man darf einen Faktor an eine Summe verteilen (ausmultiplizieren).' },
];

/**
 * k4-rechengesetze — Rechengesetze (Kommutativ, Assoziativ, Distributiv)
 *
 * Difficulty 1: true-false — Stimmt die Gleichung?
 * Difficulty 2: drag-match — Ordne Gesetz dem Beispiel zu
 * Difficulty 3: multiple-choice — Welches Gesetz wurde angewendet?
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-rechengesetze',
  generate(difficulty = 1): Exercise {
    if (difficulty === 1) {
      // true-false: Ist die Gleichung richtig?
      const variant = randInt(0, 2);

      if (variant === 0) {
        // Kommutativgesetz
        const a = randInt(3, 20);
        const b = randInt(3, 20);
        const useMult = randInt(0, 1) === 0;
        const op = useMult ? '×' : '+';
        // Manchmal richtig, manchmal falsch (Subtraktion ist NICHT kommutativ)
        const makeFalse = randInt(0, 2) === 0;

        if (makeFalse) {
          // Subtraktion — nicht kommutativ
          const big = Math.max(a, b) + randInt(1, 5);
          const small = Math.min(a, b);
          return {
            id: genId('k4-rg'),
            topicId: 'k4-rechengesetze',
            question: `Stimmt es? ${big} − ${small} = ${small} − ${big}`,
            answerType: 'true-false',
            exerciseType: 'true-false',
            correctAnswer: 'falsch',
            hint: 'Gilt das Kommutativgesetz auch für die Subtraktion?',
            explanation: `${big} − ${small} = ${big - small}, aber ${small} − ${big} = ${small - big}. Subtraktion ist NICHT kommutativ.`,
            difficulty,
            category: 'Abstrakt',
            estimatedSeconds: 15,
          };
        }

        return {
          id: genId('k4-rg'),
          topicId: 'k4-rechengesetze',
          question: `Stimmt es? ${a} ${op} ${b} = ${b} ${op} ${a}`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: 'wahr',
          hint: `Darf man bei ${useMult ? 'der Multiplikation' : 'der Addition'} die Reihenfolge vertauschen?`,
          explanation: `Ja! Das Kommutativgesetz erlaubt das Vertauschen bei ${useMult ? 'Multiplikation' : 'Addition'}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      if (variant === 1) {
        // Assoziativgesetz
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const c = randInt(2, 10);
        const useMult = randInt(0, 1) === 0;
        const op = useMult ? '×' : '+';

        return {
          id: genId('k4-rg'),
          topicId: 'k4-rechengesetze',
          question: `Stimmt es? (${a} ${op} ${b}) ${op} ${c} = ${a} ${op} (${b} ${op} ${c})`,
          answerType: 'true-false',
          exerciseType: 'true-false',
          correctAnswer: 'wahr',
          hint: 'Darf man die Klammern bei dieser Rechenart verschieben?',
          explanation: `Ja! Das Assoziativgesetz erlaubt das Verschieben der Klammern bei ${useMult ? 'Multiplikation' : 'Addition'}.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 15,
        };
      }

      // Distributivgesetz
      const a = randInt(2, 8);
      const b = randInt(2, 10);
      const c = randInt(2, 10);
      const isCorrect = randInt(0, 1) === 0;
      const rightSide = isCorrect
        ? `${a} × ${b} + ${a} × ${c}`
        : `${a} × ${b} + ${b} × ${c}`;
      const correctLabel = isCorrect ? 'wahr' : 'falsch';

      return {
        id: genId('k4-rg'),
        topicId: 'k4-rechengesetze',
        question: `Stimmt es? ${a} × (${b} + ${c}) = ${rightSide}`,
        answerType: 'true-false',
        exerciseType: 'true-false',
        correctAnswer: correctLabel,
        hint: 'Beim Distributivgesetz wird der Faktor vor der Klammer mit JEDEM Summanden multipliziert.',
        explanation: isCorrect
          ? `Richtig: ${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c} = ${a * b} + ${a * c} = ${a * (b + c)}.`
          : `Falsch! Richtig wäre: ${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c} = ${a * b} + ${a * c} = ${a * (b + c)}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 20,
      };
    }

    if (difficulty === 2) {
      // drag-match: Ordne Gesetz dem Beispiel zu
      const shuffledGesetze = shuffle(gesetze).slice(0, 4);
      const pairs: [string, string][] = shuffledGesetze.map(g => [g.name, g.beispiel]);

      return {
        id: genId('k4-rg'),
        topicId: 'k4-rechengesetze',
        question: 'Ordne jedes Rechengesetz dem passenden Beispiel zu.',
        answerType: 'matching',
        exerciseType: 'drag-match',
        pairs,
        correctAnswer: pairs.map(([a, b]) => `${a} → ${b}`).join('; '),
        hint: 'Kommutativ = Vertauschen, Assoziativ = Umklammern, Distributiv = Verteilen.',
        explanation: shuffledGesetze.map(g => `${g.name}: ${g.beispiel} — ${g.erklärung}`).join(' | '),
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 45,
      };
    }

    // difficulty === 3: multiple-choice — Welches Gesetz?
    const idx = randInt(0, gesetze.length - 1);
    const chosen = gesetze[idx];

    // Generiere ein konkretes Beispiel
    const a = randInt(2, 12);
    const b = randInt(2, 12);
    const c = randInt(2, 12);

    let beispiel: string;
    if (idx <= 1) {
      // Kommutativ
      const op = idx === 0 ? '+' : '×';
      beispiel = `${a} ${op} ${b} = ${b} ${op} ${a}`;
    } else if (idx <= 3) {
      // Assoziativ
      const op = idx === 2 ? '+' : '×';
      beispiel = `(${a} ${op} ${b}) ${op} ${c} = ${a} ${op} (${b} ${op} ${c})`;
    } else {
      // Distributiv
      beispiel = `${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c}`;
    }

    const gesetzNames = ['Kommutativgesetz', 'Assoziativgesetz', 'Distributivgesetz'];
    const correctName = idx <= 1 ? 'Kommutativgesetz' : idx <= 3 ? 'Assoziativgesetz' : 'Distributivgesetz';
    const distractors = gesetzNames.filter(n => n !== correctName);

    return {
      id: genId('k4-rg'),
      topicId: 'k4-rechengesetze',
      question: `Welches Rechengesetz wird hier angewendet? ${beispiel}`,
      answerType: 'multiple-choice',
      exerciseType: 'multiple-choice',
      correctAnswer: correctName,
      distractors,
      hint: 'Kommutativ = Vertauschen, Assoziativ = Umklammern, Distributiv = Verteilen.',
      explanation: `${chosen.name}: ${chosen.erklärung}`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 25,
    };
  },
};
