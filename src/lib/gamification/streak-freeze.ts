/**
 * Streak Freeze — Duolingo-inspired streak protection
 *
 * Users can purchase a Streak Freeze for 50 coins (max 2 active at a time).
 * When a streak would break (missed a day), one freeze is automatically consumed.
 * Track active freezes with purchase and usage timestamps.
 */

export type StreakFreeze = {
  id: string;
  purchasedAt: number; // Unix timestamp ms
  usedAt?: number;     // When consumed
};

/**
 * Cost of a streak freeze in coins.
 */
export const STREAK_FREEZE_COST = 50;

/**
 * Max active (unused) freezes.
 */
export const MAX_ACTIVE_FREEZES = 2;

/**
 * Get all unused freezes.
 */
export function getAvailableFreezes(freezes: StreakFreeze[]): StreakFreeze[] {
  return freezes.filter(f => !f.usedAt);
}

/**
 * Check if user has an available (unused) streak freeze.
 */
export function hasAvailableFreeze(freezes: StreakFreeze[]): boolean {
  return getAvailableFreezes(freezes).length > 0;
}

/**
 * Purchase a new streak freeze. Returns null if max reached.
 */
export function purchaseFreeze(freezes: StreakFreeze[]): StreakFreeze | null {
  if (getAvailableFreezes(freezes).length >= MAX_ACTIVE_FREEZES) return null;
  return {
    id: `sf-${Date.now()}`,
    purchasedAt: Date.now(),
  };
}

/**
 * Consume a streak freeze (mark as used). Returns updated list.
 */
export function consumeFreeze(freezes: StreakFreeze[]): StreakFreeze[] {
  const available = getAvailableFreezes(freezes);
  if (available.length === 0) return freezes;

  const toUse = available[0];
  return freezes.map(f =>
    f.id === toUse.id ? { ...f, usedAt: Date.now() } : f
  );
}
