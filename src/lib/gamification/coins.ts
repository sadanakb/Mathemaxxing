/**
 * Coin Economy — Prodigy/Duolingo-inspired virtual currency
 *
 * Earning:
 * - Quiz completed: +10 coins
 * - 3-star quiz: +25 coins
 * - Streak day: +5 coins
 * - Achievement unlocked: +15 coins
 * - Daily challenge completed: +20 coins
 *
 * Spending:
 * - Streak Freeze: 50 coins
 * - Double XP (30 min): 75 coins
 * - Extra hints (3x): 30 coins
 * - Avatar items: 20-100 coins
 */

export type CoinTransaction = {
  amount: number;
  reason: CoinReason;
  timestamp: Date;
};

export type CoinReason =
  | 'quiz-completed'
  | 'quiz-3-stars'
  | 'streak-bonus'
  | 'achievement-unlocked'
  | 'daily-challenge'
  | 'purchase-streak-freeze'
  | 'purchase-double-xp'
  | 'purchase-hints'
  | 'purchase-avatar-item';

const COIN_REWARDS: Record<string, number> = {
  'quiz-completed': 10,
  'quiz-3-stars': 25,
  'streak-bonus': 5,
  'achievement-unlocked': 15,
  'daily-challenge': 20,
};

const COIN_COSTS: Record<string, number> = {
  'purchase-streak-freeze': 50,
  'purchase-double-xp': 75,
  'purchase-hints': 30,
};

/**
 * Calculate coins earned for a quiz completion.
 */
export function calculateQuizCoins(stars: 0 | 1 | 2 | 3): number {
  const base = COIN_REWARDS['quiz-completed'];
  if (stars === 3) return base + COIN_REWARDS['quiz-3-stars'];
  return base;
}

/**
 * Calculate streak bonus coins.
 */
export function calculateStreakCoins(streakDays: number): number {
  const base = COIN_REWARDS['streak-bonus'];
  // Bonus multiplier for longer streaks
  if (streakDays >= 30) return base * 3;
  if (streakDays >= 14) return base * 2;
  if (streakDays >= 7) return Math.round(base * 1.5);
  return base;
}

/**
 * Get the cost of an item.
 */
export function getItemCost(reason: CoinReason): number {
  return COIN_COSTS[reason] ?? 0;
}

/**
 * Check if user can afford an item.
 */
export function canAfford(currentCoins: number, reason: CoinReason): boolean {
  return currentCoins >= getItemCost(reason);
}

/**
 * Get reward amount for a reason.
 */
export function getRewardAmount(reason: CoinReason): number {
  return COIN_REWARDS[reason] ?? 0;
}
