// ============================================================
// Feature Flags — Monetization Preparation
// Currently all features are enabled (free).
// When monetization is activated, premium flags gate content.
// ============================================================

export type FeatureFlag =
  | 'premium-exercises'
  | 'ai-tutor-unlimited'
  | 'story-mode'
  | 'printables'
  | 'advanced-stats'
  | 'custom-avatar';

const FLAGS: Record<FeatureFlag, boolean> = {
  'premium-exercises': true,
  'ai-tutor-unlimited': true,
  'story-mode': true,
  'printables': true,
  'advanced-stats': true,
  'custom-avatar': true,
};

/** Check if a feature flag is enabled. */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FLAGS[flag] ?? false;
}

// ── Topic-level gating ──────────────────────────────────────

// Currently all topics are free. In the future, this set will
// contain topic IDs that require a premium subscription.
const PREMIUM_TOPICS = new Set<string>();

/** Check if a topic is free (not gated behind paywall). */
export function isTopicFree(topicId: string): boolean {
  return !PREMIUM_TOPICS.has(topicId);
}

/** Check if a topic requires premium access. */
export function isTopicPremium(topicId: string): boolean {
  return PREMIUM_TOPICS.has(topicId);
}
