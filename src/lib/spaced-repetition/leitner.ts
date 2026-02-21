import type { LeitnerCard } from '@/lib/curriculum/types';

// ─── Leitner Box Intervals (days) ─────────────────────────────

export const LEITNER_INTERVALS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1,   // Review tomorrow
  2: 3,   // Review in 3 days
  3: 7,   // Review in 1 week
  4: 14,  // Review in 2 weeks
  5: 30,  // Review in 1 month
};

// ─── Core Leitner Logic ───────────────────────────────────────

/**
 * Advances a card to the next box on a correct answer.
 * Box 5 cards that are answered correctly reset their nextReview but stay in box 5.
 */
export function advanceCard(card: LeitnerCard): LeitnerCard {
  const nextBox = Math.min(5, card.box + 1) as 1 | 2 | 3 | 4 | 5;
  return {
    ...card,
    box: nextBox,
    nextReview: addDays(new Date(), LEITNER_INTERVALS[nextBox]),
    lastReviewed: new Date(),
    consecutiveCorrect: card.consecutiveCorrect + 1,
    totalAttempts: card.totalAttempts + 1,
    totalCorrect: card.totalCorrect + 1,
  };
}

/**
 * Resets a card to box 1 on a wrong answer.
 */
export function resetCard(card: LeitnerCard): LeitnerCard {
  return {
    ...card,
    box: 1,
    nextReview: addDays(new Date(), LEITNER_INTERVALS[1]),
    lastReviewed: new Date(),
    consecutiveCorrect: 0,
    totalAttempts: card.totalAttempts + 1,
  };
}

/**
 * Creates a new Leitner card for a topic (starts in box 1).
 */
export function createCard(topicId: string): LeitnerCard {
  return {
    topicId,
    box: 1,
    nextReview: addDays(new Date(), LEITNER_INTERVALS[1]),
    consecutiveCorrect: 0,
    totalAttempts: 0,
    totalCorrect: 0,
  };
}

/**
 * Returns cards that are due for review as of `now`.
 */
export function getDueCards(cards: LeitnerCard[], now: Date = new Date()): LeitnerCard[] {
  return cards.filter((c) => c.nextReview <= now);
}

/**
 * Returns the next card to review (prioritises box 1, then lowest box).
 */
export function getNextCard(cards: LeitnerCard[], now: Date = new Date()): LeitnerCard | null {
  const due = getDueCards(cards, now);
  if (due.length === 0) return null;

  // Sort: box 1 first, then by box number ascending, then by nextReview
  return due.sort((a, b) => {
    if (a.box !== b.box) return a.box - b.box;
    return a.nextReview.getTime() - b.nextReview.getTime();
  })[0];
}

/**
 * Returns the accuracy percentage for a card (0-100).
 */
export function getCardAccuracy(card: LeitnerCard): number {
  if (card.totalAttempts === 0) return 0;
  return Math.round((card.totalCorrect / card.totalAttempts) * 100);
}

// ─── Utilities ────────────────────────────────────────────────

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
