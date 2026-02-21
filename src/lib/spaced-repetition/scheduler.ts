import type { LeitnerCard } from '@/lib/curriculum/types';
import { getDueCards } from './leitner';

export type ReviewSession = {
  dueCards: LeitnerCard[];
  totalDue: number;
  nextReviewDate: Date | null;
  recommendedCount: number;
};

/**
 * Builds a review session from all Leitner cards.
 */
export function buildReviewSession(
  cards: LeitnerCard[],
  maxCards = 10,
  now: Date = new Date()
): ReviewSession {
  const dueCards = getDueCards(cards, now);

  // Find next upcoming card (for "next review" display)
  const upcoming = cards
    .filter((c) => c.nextReview > now)
    .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime());

  return {
    dueCards: dueCards.slice(0, maxCards),
    totalDue: dueCards.length,
    nextReviewDate: upcoming[0]?.nextReview ?? null,
    recommendedCount: Math.min(dueCards.length, maxCards),
  };
}

/**
 * Returns a mixed daily session: due Leitner cards + new topics.
 */
export function buildDailyMixSession(
  cards: LeitnerCard[],
  availableTopicIds: string[],
  dailyGoalMinutes: number,
  now: Date = new Date()
): { reviewTopicIds: string[]; newTopicIds: string[] } {
  const due = getDueCards(cards, now);

  // New topics = available topics that have no Leitner card yet
  const cardTopicIds = new Set(cards.map((c) => c.topicId));
  const newTopicIds = availableTopicIds
    .filter((id) => !cardTopicIds.has(id))
    .slice(0, 3); // Introduce max 3 new topics per day

  // Balance: fill remaining time with review
  const reviewIds = due.map((c) => c.topicId).slice(0, 7);

  return {
    reviewTopicIds: reviewIds,
    newTopicIds,
  };
}
