import type { TopicProgress } from '@/lib/curriculum/types';

/**
 * SmartScore — IXL-inspired mastery score (0-100)
 *
 * Unlike a simple accuracy %, SmartScore weighs:
 * - Recent performance more heavily (recency bias)
 * - Difficulty of exercises
 * - Consistency (streak of correct answers)
 * - Post-quiz performance as definitive measure
 */

const SMART_SCORE_CONFIG = {
  /** Weight for post-quiz score (definitive) */
  QUIZ_WEIGHT: 0.6,
  /** Weight for practice accuracy */
  PRACTICE_WEIGHT: 0.25,
  /** Weight for consistency (stars, streak) */
  CONSISTENCY_WEIGHT: 0.15,
  /** Minimum attempts before SmartScore is meaningful */
  MIN_ATTEMPTS: 3,
  /** Score thresholds for mastery labels */
  THRESHOLDS: {
    BEGINNER: 20,
    LEARNING: 40,
    PRACTICING: 60,
    PROFICIENT: 80,
    MASTERED: 90,
  },
};

export type SmartScoreLevel = 'beginner' | 'learning' | 'practicing' | 'proficient' | 'mastered';

export type SmartScoreResult = {
  score: number;        // 0-100
  level: SmartScoreLevel;
  label: string;        // German label
  color: string;        // Tailwind color class
  trend: 'up' | 'down' | 'stable';
};

const LEVEL_CONFIG: Record<SmartScoreLevel, { label: string; color: string }> = {
  beginner: { label: 'Anfänger', color: 'text-gray-500' },
  learning: { label: 'Lernend', color: 'text-amber-500' },
  practicing: { label: 'Übend', color: 'text-blue-500' },
  proficient: { label: 'Sicher', color: 'text-emerald-500' },
  mastered: { label: 'Meister', color: 'text-purple-600' },
};

/**
 * Calculate the SmartScore for a topic.
 */
export function calculateSmartScore(progress: TopicProgress): SmartScoreResult {
  if (progress.attemptsTotal < SMART_SCORE_CONFIG.MIN_ATTEMPTS) {
    const rawScore = progress.attemptsTotal === 0
      ? 0
      : Math.round((progress.attemptsCorrect / progress.attemptsTotal) * 30);

    return {
      score: rawScore,
      level: 'beginner',
      label: LEVEL_CONFIG.beginner.label,
      color: LEVEL_CONFIG.beginner.color,
      trend: 'stable',
    };
  }

  // Practice accuracy component (0-100)
  const practiceAccuracy = (progress.attemptsCorrect / progress.attemptsTotal) * 100;

  // Quiz score component (0-100), most important
  const quizScore = progress.postQuizScore !== undefined
    ? progress.postQuizScore * 100
    : practiceAccuracy * 0.7; // Fallback: weighted practice

  // Consistency component (0-100)
  const starsBonus = (progress.stars ?? 0) * 15; // 0, 15, 30, 45
  const testBonus = progress.testScore !== undefined ? progress.testScore * 40 : 0;
  const consistencyScore = Math.min(100, starsBonus + testBonus);

  // Weighted SmartScore
  const rawScore = Math.round(
    quizScore * SMART_SCORE_CONFIG.QUIZ_WEIGHT +
    practiceAccuracy * SMART_SCORE_CONFIG.PRACTICE_WEIGHT +
    consistencyScore * SMART_SCORE_CONFIG.CONSISTENCY_WEIGHT
  );

  const score = Math.max(0, Math.min(100, rawScore));
  const level = getLevel(score);

  // Determine trend based on quiz vs practice
  const trend: 'up' | 'down' | 'stable' =
    progress.postQuizScore !== undefined && progress.postQuizScore * 100 > practiceAccuracy
      ? 'up'
      : progress.postQuizScore !== undefined && progress.postQuizScore * 100 < practiceAccuracy - 10
        ? 'down'
        : 'stable';

  return {
    score,
    level,
    label: LEVEL_CONFIG[level].label,
    color: LEVEL_CONFIG[level].color,
    trend,
  };
}

function getLevel(score: number): SmartScoreLevel {
  const t = SMART_SCORE_CONFIG.THRESHOLDS;
  if (score >= t.MASTERED) return 'mastered';
  if (score >= t.PROFICIENT) return 'proficient';
  if (score >= t.PRACTICING) return 'practicing';
  if (score >= t.LEARNING) return 'learning';
  return 'beginner';
}

/**
 * Analyze weak areas from all topic progress.
 * Returns topics sorted by weakness (lowest SmartScore first).
 */
export function analyzeWeakAreas(
  topicProgress: Record<string, TopicProgress>,
  minAttempts = 3
): Array<{ topicId: string; score: number; level: SmartScoreLevel }> {
  return Object.entries(topicProgress)
    .filter(([, tp]) => tp.attemptsTotal >= minAttempts)
    .map(([topicId, tp]) => {
      const result = calculateSmartScore(tp);
      return { topicId, score: result.score, level: result.level };
    })
    .sort((a, b) => a.score - b.score);
}

/**
 * Get recommended next topics based on SmartScore analysis.
 * Prioritizes topics that are 'learning' or 'practicing' (not mastered, not beginner).
 */
export function getRecommendedTopics(
  topicProgress: Record<string, TopicProgress>,
  limit = 3
): string[] {
  const weak = analyzeWeakAreas(topicProgress, 1);

  // Prioritize topics in the "learning zone" (score 20-79)
  const learningZone = weak.filter(
    (t) => t.score >= 20 && t.score < 80
  );

  // Then add beginners that have been attempted
  const beginners = weak.filter(
    (t) => t.score < 20 && t.score > 0
  );

  return [...learningZone, ...beginners]
    .slice(0, limit)
    .map((t) => t.topicId);
}
