/**
 * Daily Challenges — Duolingo-inspired daily quests
 *
 * 3 challenges per day, generated from user's curriculum.
 * Types: practice (complete X exercises), accuracy (get X% on topic),
 *        streak (maintain streak), speed (complete quiz in X minutes)
 */

export type ChallengeType = 'practice' | 'accuracy' | 'streak' | 'speed' | 'review';

export type DailyChallenge = {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  reward: number; // coins
  expiresAt: string; // ISO date
};

const CHALLENGE_TEMPLATES: Array<{
  type: ChallengeType;
  title: string;
  description: string;
  icon: string;
  target: number;
  reward: number;
}> = [
  {
    type: 'practice',
    title: 'Fleißige Biene',
    description: 'Löse 10 Aufgaben',
    icon: '🐝',
    target: 10,
    reward: 20,
  },
  {
    type: 'practice',
    title: 'Mathe-Marathon',
    description: 'Löse 20 Aufgaben',
    icon: '🏃',
    target: 20,
    reward: 35,
  },
  {
    type: 'accuracy',
    title: 'Perfektionist',
    description: 'Erreiche 100% in einem Quiz',
    icon: '🎯',
    target: 100,
    reward: 30,
  },
  {
    type: 'accuracy',
    title: 'Scharfschütze',
    description: 'Erreiche mindestens 80% in 2 Quizzen',
    icon: '🏹',
    target: 2,
    reward: 25,
  },
  {
    type: 'streak',
    title: 'Am Ball bleiben',
    description: 'Halte deinen Streak aufrecht',
    icon: '🔥',
    target: 1,
    reward: 15,
  },
  {
    type: 'speed',
    title: 'Blitzrechner',
    description: 'Beende ein Quiz in unter 3 Minuten',
    icon: '⚡',
    target: 180, // seconds
    reward: 25,
  },
  {
    type: 'review',
    title: 'Wiederholung',
    description: 'Übe 5 Leitner-Karten',
    icon: '🔄',
    target: 5,
    reward: 15,
  },
  {
    type: 'practice',
    title: 'Entdecker',
    description: 'Starte ein neues Thema',
    icon: '🗺️',
    target: 1,
    reward: 20,
  },
];

/**
 * Generate 3 daily challenges for today.
 * Uses date as seed for deterministic selection.
 */
export function generateDailyChallenges(dateStr?: string): DailyChallenge[] {
  const today = dateStr ?? new Date().toISOString().slice(0, 10);
  const seed = hashDate(today);

  // Select 3 unique challenges using seeded shuffle
  const indices = seededShuffle(
    Array.from({ length: CHALLENGE_TEMPLATES.length }, (_, i) => i),
    seed
  );

  const selected = indices.slice(0, 3);

  return selected.map((idx, i) => {
    const template = CHALLENGE_TEMPLATES[idx];
    return {
      id: `dc-${today}-${i}`,
      type: template.type,
      title: template.title,
      description: template.description,
      icon: template.icon,
      target: template.target,
      current: 0,
      reward: template.reward,
      expiresAt: today + 'T23:59:59',
    };
  });
}

/**
 * Check if a challenge is completed.
 */
export function isChallengeCompleted(challenge: DailyChallenge): boolean {
  return challenge.current >= challenge.target;
}

/**
 * Simple hash of a date string to use as seed.
 */
function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Seeded Fisher-Yates shuffle.
 */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
