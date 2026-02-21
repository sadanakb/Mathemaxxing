/**
 * Feature Flags — Stufenweises Rollout neuer Features
 *
 * In localStorage gespeichert. Alle Features default 'on'.
 * Kann über Settings-Seite oder DevTools gesteuert werden.
 */

export type FeatureFlag =
  | 'leaderboard'
  | 'shop'
  | 'daily-challenges'
  | 'parent-dashboard'
  | 'learning-map'
  | 'xp-multiplier'
  | 'streak-freeze'
  | 'weekly-recap'
  | 'smart-score';

const DEFAULTS: Record<FeatureFlag, boolean> = {
  'leaderboard': true,
  'shop': true,
  'daily-challenges': true,
  'parent-dashboard': true,
  'learning-map': true,
  'xp-multiplier': true,
  'streak-freeze': true,
  'weekly-recap': true,
  'smart-score': true,
};

const STORAGE_KEY = 'mathemaxxing-feature-flags';

function loadFlags(): Record<FeatureFlag, boolean> {
  if (typeof window === 'undefined') return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

/**
 * Check if a feature is enabled.
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return loadFlags()[flag] ?? true;
}

/**
 * Enable or disable a feature flag.
 */
export function setFeatureFlag(flag: FeatureFlag, enabled: boolean): void {
  if (typeof window === 'undefined') return;
  const flags = loadFlags();
  flags[flag] = enabled;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

/**
 * Get all feature flags with their current state.
 */
export function getAllFlags(): Record<FeatureFlag, boolean> {
  return loadFlags();
}
