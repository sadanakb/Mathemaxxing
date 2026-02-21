/**
 * XP Multiplier — Duolingo-inspired XP boost system
 *
 * - 2x XP for the first 15 minutes of daily activity
 * - 1.5x XP when streak >= 7 days
 * - Stackable: 2x + 1.5x = 3x max
 * - Power-up: purchasable 2x XP for 30 minutes
 */

export type MultiplierSource = 'early-bird' | 'streak-bonus' | 'power-up';

export type ActiveMultiplier = {
  source: MultiplierSource;
  factor: number;
  expiresAt: number; // Unix timestamp ms
  label: string;
};

/**
 * Calculate the total XP multiplier for the current session.
 */
export function calculateXPMultiplier(params: {
  todayMinutes: number;
  streakDays: number;
  activePowerUps: ActiveMultiplier[];
}): { total: number; sources: ActiveMultiplier[] } {
  const now = Date.now();
  const sources: ActiveMultiplier[] = [];

  // Early bird: 2x for first 15 minutes
  if (params.todayMinutes < 15) {
    sources.push({
      source: 'early-bird',
      factor: 2,
      expiresAt: now + (15 - params.todayMinutes) * 60 * 1000,
      label: 'Frühstart-Bonus',
    });
  }

  // Streak bonus: 1.5x for 7+ day streak
  if (params.streakDays >= 7) {
    sources.push({
      source: 'streak-bonus',
      factor: 1.5,
      expiresAt: now + 24 * 60 * 60 * 1000, // Until end of day
      label: `${params.streakDays}-Tage-Streak`,
    });
  }

  // Active power-ups (purchased from shop)
  const validPowerUps = params.activePowerUps.filter((p) => p.expiresAt > now);
  sources.push(...validPowerUps);

  // Calculate combined multiplier (highest factor wins, not additive)
  const total = sources.length > 0
    ? Math.max(...sources.map((s) => s.factor))
    : 1;

  return { total, sources };
}

/**
 * Apply multiplier to a base XP amount.
 */
export function applyMultiplier(baseXP: number, multiplier: number): number {
  return Math.round(baseXP * multiplier);
}

/**
 * Create a power-up multiplier (from shop purchase).
 */
export function createPowerUpMultiplier(durationMinutes = 30): ActiveMultiplier {
  return {
    source: 'power-up',
    factor: 2,
    expiresAt: Date.now() + durationMinutes * 60 * 1000,
    label: `${durationMinutes} Min. Doppel-XP`,
  };
}

/**
 * Get a human-readable label for the current multiplier.
 */
export function getMultiplierLabel(total: number): string {
  if (total >= 2) return `${total}× XP!`;
  if (total > 1) return `${total}× XP`;
  return '';
}
