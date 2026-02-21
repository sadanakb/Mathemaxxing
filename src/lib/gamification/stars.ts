/**
 * Calculate stars for a quiz result:
 * 0 stars: < 50%
 * 1 star:  50-69%
 * 2 stars: 70-89%
 * 3 stars: 90-100%
 */
export function calculateStars(score: number): 0 | 1 | 2 | 3 {
  if (score >= 0.9) return 3;
  if (score >= 0.7) return 2;
  if (score >= 0.5) return 1;
  return 0;
}
