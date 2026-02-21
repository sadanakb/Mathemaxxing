/**
 * Generates plausible wrong answers (distractors) for multiple-choice exercises.
 * Distractors should be believable mistakes, not random numbers.
 */

/**
 * Generates numeric distractors for a given correct answer.
 */
export function generateNumericDistractors(
  correct: number,
  count = 3,
  options: {
    min?: number;
    max?: number;
    integers?: boolean;
  } = {}
): number[] {
  const { min = 0, max = correct * 2 + 10, integers = true } = options;
  const candidates = new Set<number>();

  // Common error patterns
  const commonErrors = [
    correct + 1,         // off-by-one
    correct - 1,         // off-by-one
    correct + 10,        // magnitude error
    correct - 10,        // magnitude error
    correct * 2,         // doubled
    Math.floor(correct / 2), // halved
    correct + 2,
    correct - 2,
  ];

  for (const candidate of commonErrors) {
    const val = integers ? Math.round(candidate) : Math.round(candidate * 100) / 100;
    if (val !== correct && val >= min && val <= max) {
      candidates.add(val);
    }
  }

  // Fill remaining with close random values
  let attempts = 0;
  while (candidates.size < count && attempts < 50) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    const candidate = correct + offset * sign;
    if (candidate !== correct && candidate >= min && candidate <= max) {
      candidates.add(integers ? Math.round(candidate) : Math.round(candidate * 100) / 100);
    }
    attempts++;
  }

  return Array.from(candidates).slice(0, count);
}

/**
 * Shuffles an array including the correct answer into a randomized options list.
 */
export function shuffleOptions<T>(correct: T, distractors: T[]): T[] {
  const all = [correct, ...distractors];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}
