/**
 * Exercise answer evaluator.
 * Handles German decimal notation (3,14 → 3.14) before comparison.
 */

// ─── German number normalisation ─────────────────────────────

/**
 * Normalises a user-typed number string to standard JS float format.
 *
 * Examples:
 *   "3,14"      → "3.14"
 *   "1.000,50"  → "1000.50"   (thousands sep + decimal comma)
 *   "1000"      → "1000"
 *   "-7,5"      → "-7.5"
 *   "2,5"       → "2.5"
 */
export function normaliseGermanNumber(input: string): string {
  const trimmed = input.trim();
  // Remove thousands separators (dots used as thousand-separators in German)
  // Then replace comma with dot for decimal point
  // Heuristic: if there are dots AND a comma, dots are thousands separators
  if (trimmed.includes(',') && trimmed.includes('.')) {
    // e.g. "1.000,50" → remove dots → "1000,50" → replace comma → "1000.50"
    return trimmed.replace(/\./g, '').replace(',', '.');
  }
  // Just a comma (decimal): "3,14" → "3.14"
  if (trimmed.includes(',')) {
    return trimmed.replace(',', '.');
  }
  return trimmed;
}

// ─── Safe evaluator (no math.js for simple cases) ────────────

const FLOAT_TOLERANCE = 1e-9;

/**
 * Compares two numeric answers with float tolerance.
 */
function numericEqual(a: number, b: number): boolean {
  return Math.abs(a - b) <= FLOAT_TOLERANCE;
}

/**
 * Evaluates a user's answer against the correct answer.
 *
 * @param userInput   Raw string the user typed
 * @param correctAnswer  The expected correct answer (string or number)
 * @param answerType  The type of answer expected
 * @returns true if correct
 */
import type { AnswerType, Exercise } from '@/lib/curriculum/types';
import { resolveExerciseType } from './type-resolver';

export function evaluateAnswer(
  userInput: string,
  correctAnswer: string | number,
  answerType: AnswerType
): boolean {
  const normalised = normaliseGermanNumber(userInput.trim().toLowerCase());
  const correctStr = String(correctAnswer).trim().toLowerCase();
  const normalisedCorrect = normaliseGermanNumber(correctStr);

  switch (answerType) {
    case 'number': {
      const userNum = parseFloat(normalised);
      const correctNum = parseFloat(normalisedCorrect);
      if (isNaN(userNum) || isNaN(correctNum)) return false;
      return numericEqual(userNum, correctNum);
    }

    case 'fraction': {
      // Accept both "3/4" and "0.75" for 3/4
      if (normalised.includes('/')) {
        const [num, den] = normalised.split('/').map(Number);
        if (isNaN(num) || isNaN(den) || den === 0) return false;
        const userFraction = num / den;

        if (normalisedCorrect.includes('/')) {
          const [cn, cd] = normalisedCorrect.split('/').map(Number);
          const correctFraction = cn / cd;
          return numericEqual(userFraction, correctFraction);
        }
        return numericEqual(userFraction, parseFloat(normalisedCorrect));
      }
      // Decimal input for fraction question
      const userNum = parseFloat(normalised);
      if (normalisedCorrect.includes('/')) {
        const [cn, cd] = normalisedCorrect.split('/').map(Number);
        return numericEqual(userNum, cn / cd);
      }
      return numericEqual(userNum, parseFloat(normalisedCorrect));
    }

    case 'true-false': {
      return normalizeTrueFalse(normalised) === normalizeTrueFalse(correctStr);
    }

    case 'text':
    case 'multiple-choice':
    case 'drag-drop':
    case 'matching': {
      return normalised === correctStr.toLowerCase();
    }

    default:
      return normalised === correctStr;
  }
}

// ─── Safe math expression evaluator (Klassen 5+) ─────────────

/**
 * Safely evaluates a simple arithmetic expression.
 * Only allows: digits, +, -, *, /, (, ), spaces, decimal point.
 * Returns null if the expression is invalid or unsafe.
 */
export function safeEval(expression: string): number | null {
  // For full expressions (not single numbers), replace all commas globally
  // Individual number normalisation uses the smarter function above
  const normalised = expression.trim().replace(/,/g, '.');
  // Whitelist: only allow safe math characters
  if (!/^[\d\s+\-*/().]+$/.test(normalised)) return null;
  try {
    // Using Function constructor in a controlled, sanitised context
    // The input is already validated to contain only safe characters
    const result = Function(`"use strict"; return (${normalised})`)() as unknown;
    if (typeof result !== 'number' || !isFinite(result)) return null;
    return result;
  } catch {
    return null;
  }
}

// ─── True/False normalisation ─────────────────────────────────

/**
 * Normalises German/English true-false values to canonical 'true'/'false'.
 * Maps 'wahr' → 'true', 'falsch' → 'false'.
 */
function normalizeTrueFalse(value: string): string {
  const lower = value.trim().toLowerCase();
  if (lower === 'wahr') return 'true';
  if (lower === 'falsch') return 'false';
  return lower;
}

// ─── Extended evaluator for all 23+ ExerciseTypes ────────────

/**
 * Evaluates a user's answer based on the full Exercise object,
 * using the resolved ExerciseType to pick the right comparison logic.
 *
 * Falls back to the classic evaluateAnswer for unknown types.
 */
export function evaluateExerciseAnswer(userAnswer: string, exercise: Exercise): boolean {
  const exerciseType = resolveExerciseType(exercise);

  switch (exerciseType) {
    // --- Simple text / number via legacy evaluator ---
    case 'number-input':
    case 'text-input':
      return evaluateAnswer(userAnswer, exercise.correctAnswer, exercise.answerType);

    case 'multiple-choice':
      return evaluateAnswer(userAnswer, exercise.correctAnswer, 'multiple-choice');

    case 'true-false': {
      const normUser = normalizeTrueFalse(userAnswer);
      const normCorrect = normalizeTrueFalse(String(exercise.correctAnswer));
      return normUser === normCorrect;
    }

    // --- Numeric with tolerance (estimation, angle) ---
    case 'estimation':
    case 'angle-measure': {
      const tolerance = exercise.tolerance ?? 5;
      const userNum = parseFloat(normaliseGermanNumber(userAnswer));
      const correctNum =
        typeof exercise.correctAnswer === 'number'
          ? exercise.correctAnswer
          : parseFloat(String(exercise.correctAnswer));
      if (isNaN(userNum) || isNaN(correctNum)) return false;
      return Math.abs(userNum - correctNum) <= tolerance;
    }

    // --- Numeric exact (various visual/interactive types) ---
    case 'fraction-visual':
    case 'place-value-table':
    case 'number-machine':
    case 'equation-balance':
    case 'area-count':
    case 'speed-quiz':
    case 'bar-chart-read': {
      const userNum = parseFloat(normaliseGermanNumber(userAnswer));
      const correctNum =
        typeof exercise.correctAnswer === 'number'
          ? exercise.correctAnswer
          : parseFloat(String(exercise.correctAnswer));
      if (isNaN(userNum) || isNaN(correctNum)) return false;
      return Math.abs(userNum - correctNum) < 0.001;
    }

    // --- Clock time (H:MM format) ---
    case 'clock-drag': {
      if (!exercise.clockTarget) return false;
      const target = `${exercise.clockTarget.hours}:${String(exercise.clockTarget.minutes).padStart(2, '0')}`;
      return userAnswer === target;
    }

    // --- Array comparison (order matters) ---
    case 'drag-sort':
    case 'drag-into-gaps': {
      try {
        const userArr = JSON.parse(userAnswer) as string[];
        const correctArr = String(exercise.correctAnswer).split(',').map(s => s.trim());
        return JSON.stringify(userArr) === JSON.stringify(correctArr);
      } catch {
        return false;
      }
    }

    // --- Array comparison (order doesn't matter) ---
    case 'multiple-select': {
      try {
        const userArr = JSON.parse(userAnswer) as string[];
        const correctArr = exercise.correctOptions ?? [];
        return (
          userArr.length === correctArr.length &&
          userArr.every((item) => correctArr.includes(item))
        );
      } catch {
        return false;
      }
    }

    // --- Object comparison (drag-match / classify) ---
    case 'drag-match':
    case 'classify': {
      try {
        const userObj = JSON.parse(userAnswer) as Record<string, string | string[]>;
        // For drag-match: compare pair maps
        if (exercise.pairs) {
          const correctMap: Record<string, string> = {};
          for (const [left, right] of exercise.pairs) {
            correctMap[left] = right;
          }
          return (
            JSON.stringify(userObj) === JSON.stringify(correctMap) ||
            Object.entries(userObj).every(([k, v]) => correctMap[k] === v)
          );
        }
        // For classify: compare categories (order within each category doesn't matter)
        if (exercise.categories) {
          for (const [cat, items] of Object.entries(exercise.categories)) {
            const userItems = (userObj[cat] as string[] | undefined) ?? [];
            if (!Array.isArray(userItems)) return false;
            if (userItems.length !== items.length) return false;
            if (!items.every((item) => userItems.includes(item))) return false;
          }
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }

    // --- Numberline positions ---
    case 'drag-onto-numberline': {
      try {
        const userPositions = JSON.parse(userAnswer) as number[];
        const targets = exercise.numberlineConfig?.targets ?? [];
        if (userPositions.length !== targets.length) return false;
        const sortedUser = [...userPositions].sort((a, b) => a - b);
        const sortedTargets = [...targets].sort((a, b) => a - b);
        return sortedUser.every((v, i) => Math.abs(v - sortedTargets[i]) < 0.5);
      } catch {
        return false;
      }
    }

    // --- Grid / graph points ---
    case 'drag-onto-grid':
    case 'graph-draw': {
      try {
        const userPoints = JSON.parse(userAnswer) as { x: number; y: number }[];
        const correctPoints = exercise.gridConfig?.points ?? [];
        if (userPoints.length !== correctPoints.length) return false;
        return correctPoints.every((cp) =>
          userPoints.some((up) => Math.abs(up.x - cp.x) < 0.5 && Math.abs(up.y - cp.y) < 0.5),
        );
      } catch {
        return false;
      }
    }

    // --- 2D grid mirror ---
    case 'mirror-draw': {
      try {
        const userGrid = JSON.parse(userAnswer) as boolean[][];
        const source = exercise.mirrorConfig?.grid ?? [];
        if (!source.length) return false;
        // Compute the correct mirror based on axis
        if (exercise.mirrorConfig?.axis === 'vertical') {
          const mirrored = source.map((row) => [...row].reverse());
          return JSON.stringify(userGrid) === JSON.stringify(mirrored);
        } else {
          const mirrored = [...source].reverse();
          return JSON.stringify(userGrid) === JSON.stringify(mirrored);
        }
      } catch {
        return false;
      }
    }

    // --- Calculation pyramid ---
    case 'calculation-pyramid': {
      try {
        const userValues = JSON.parse(userAnswer) as number[][];
        // Build correct pyramid from base
        const base = exercise.pyramidBase ?? [];
        const pyramid: number[][] = [base];
        let currentRow = base;
        while (currentRow.length > 1) {
          const nextRow: number[] = [];
          for (let i = 0; i < currentRow.length - 1; i++) {
            nextRow.push(currentRow[i] + currentRow[i + 1]);
          }
          pyramid.push(nextRow);
          currentRow = nextRow;
        }
        return JSON.stringify(userValues) === JSON.stringify(pyramid);
      } catch {
        return false;
      }
    }

    // --- Fill table ---
    case 'fill-table': {
      try {
        const userRows = JSON.parse(userAnswer) as string[][];
        const correctRows = exercise.tableConfig?.correctRows ?? [];
        return JSON.stringify(userRows) === JSON.stringify(correctRows);
      } catch {
        return false;
      }
    }

    // --- Memory: always correct when submitted (game must be complete) ---
    case 'memory-pairs':
      return true;

    // --- Step-by-step: fallback to legacy ---
    case 'step-by-step':
    default:
      return evaluateAnswer(userAnswer, exercise.correctAnswer, exercise.answerType);
  }
}
