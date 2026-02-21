import type { TopicProgress, MasteryLevel } from '@/lib/curriculum/types';

// ─── Mastery Thresholds ───────────────────────────────────────

const MASTERY_THRESHOLDS = {
  /** Minimum correct % to move from 'practicing' to 'mastered' */
  MASTERY_THRESHOLD: 0.8,
  /** Minimum exercises to count toward mastery */
  MIN_EXERCISES_FOR_MASTERY: 5,
  /** Post-quiz score needed to achieve mastery */
  POST_QUIZ_MASTERY_SCORE: 0.8,
};

/**
 * Determines the current mastery level from progress data.
 */
export function computeMasteryLevel(progress: TopicProgress): MasteryLevel {
  if (progress.attemptsTotal === 0) return 'not-started';

  const accuracy = progress.attemptsCorrect / progress.attemptsTotal;
  const enoughAttempts = progress.attemptsTotal >= MASTERY_THRESHOLDS.MIN_EXERCISES_FOR_MASTERY;

  if (enoughAttempts && accuracy >= MASTERY_THRESHOLDS.MASTERY_THRESHOLD) {
    return 'mastered';
  }
  if (progress.attemptsTotal >= 3 || accuracy >= 0.5) {
    return 'practicing';
  }
  return 'introduced';
}

/**
 * Calculates XP earned for a completed exercise.
 */
export function calculateXP(params: {
  isCorrect: boolean;
  difficulty: 1 | 2 | 3;
  hintsUsed: number;
  timeSeconds: number;
  isFirstAttempt: boolean;
}): number {
  if (!params.isCorrect) return 0;

  const baseXP = params.difficulty * 10; // 10, 20, or 30 XP
  const hintPenalty = params.hintsUsed * 3;
  const speedBonus = params.timeSeconds < 10 ? 5 : params.timeSeconds < 20 ? 2 : 0;
  const firstAttemptBonus = params.isFirstAttempt ? 5 : 0;

  return Math.max(1, baseXP - hintPenalty + speedBonus + firstAttemptBonus);
}

/**
 * Determines the next difficulty level to show based on performance.
 */
export function adaptDifficulty(
  currentDifficulty: 1 | 2 | 3,
  recentCorrectRate: number
): 1 | 2 | 3 {
  if (recentCorrectRate >= 0.85 && currentDifficulty < 3) {
    return (currentDifficulty + 1) as 2 | 3;
  }
  if (recentCorrectRate < 0.5 && currentDifficulty > 1) {
    return (currentDifficulty - 1) as 1 | 2;
  }
  return currentDifficulty;
}

/**
 * Calculates the mastery score for display (0-100%).
 */
export function getMasteryScore(progress: TopicProgress): number {
  if (progress.attemptsTotal === 0) return 0;
  const accuracy = progress.attemptsCorrect / progress.attemptsTotal;
  // Post-quiz score is the definitive measure
  if (progress.postQuizScore !== undefined) {
    return Math.round(progress.postQuizScore * 100);
  }
  return Math.round(accuracy * 100);
}
