import { describe, it, expect } from 'vitest';
import {
  createCard,
  advanceCard,
  resetCard,
  getDueCards,
  getNextCard,
  getCardAccuracy,
  LEITNER_INTERVALS,
} from '@/lib/spaced-repetition/leitner';

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

describe('Leitner Card System', () => {
  describe('createCard', () => {
    it('creates a card in box 1', () => {
      const card = createCard('k1-addition-bis-20');
      expect(card.box).toBe(1);
      expect(card.topicId).toBe('k1-addition-bis-20');
      expect(card.consecutiveCorrect).toBe(0);
      expect(card.totalAttempts).toBe(0);
    });

    it('sets nextReview to tomorrow', () => {
      const card = createCard('test-topic');
      const tomorrow = daysFromNow(1);
      expect(card.nextReview.toDateString()).toBe(tomorrow.toDateString());
    });
  });

  describe('advanceCard', () => {
    it('moves card from box 1 to box 2', () => {
      const card = createCard('test');
      const advanced = advanceCard(card);
      expect(advanced.box).toBe(2);
    });

    it('advances box and updates intervals', () => {
      let card = createCard('test');
      for (let i = 1; i <= 4; i++) {
        card = advanceCard(card);
        expect(card.box).toBe(Math.min(5, i + 1));
      }
    });

    it('stays at box 5 (max)', () => {
      let card = createCard('test');
      // Advance to box 5
      for (let i = 0; i < 5; i++) card = advanceCard(card);
      expect(card.box).toBe(5);
      // Advance again — should stay at 5
      card = advanceCard(card);
      expect(card.box).toBe(5);
    });

    it('increments consecutiveCorrect and totalCorrect', () => {
      const card = createCard('test');
      const advanced = advanceCard(card);
      expect(advanced.consecutiveCorrect).toBe(1);
      expect(advanced.totalCorrect).toBe(1);
      expect(advanced.totalAttempts).toBe(1);
    });

    it('sets correct interval for each box', () => {
      let card = createCard('test');
      for (let expectedBox = 2; expectedBox <= 5; expectedBox++) {
        card = advanceCard(card);
        const expectedDays = LEITNER_INTERVALS[card.box as 1|2|3|4|5];
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + expectedDays);
        expect(card.nextReview.toDateString()).toBe(expectedDate.toDateString());
      }
    });
  });

  describe('resetCard', () => {
    it('resets card to box 1', () => {
      let card = createCard('test');
      card = advanceCard(card); // box 2
      card = advanceCard(card); // box 3
      const reset = resetCard(card);
      expect(reset.box).toBe(1);
    });

    it('resets consecutiveCorrect to 0', () => {
      let card = createCard('test');
      card = advanceCard(card);
      card = advanceCard(card);
      const reset = resetCard(card);
      expect(reset.consecutiveCorrect).toBe(0);
    });

    it('preserves totalAttempts and totalCorrect', () => {
      let card = createCard('test');
      card = advanceCard(card); // correct, box 2
      const reset = resetCard(card); // wrong, back to box 1
      expect(reset.totalAttempts).toBe(2);
      expect(reset.totalCorrect).toBe(1);
    });

    it('sets nextReview to tomorrow', () => {
      const card = createCard('test');
      const reset = resetCard(card);
      const tomorrow = daysFromNow(1);
      expect(reset.nextReview.toDateString()).toBe(tomorrow.toDateString());
    });
  });

  describe('getDueCards', () => {
    it('returns cards with nextReview in the past', () => {
      const due = {
        ...createCard('due-topic'),
        nextReview: daysAgo(1),
      };
      const notDue = {
        ...createCard('future-topic'),
        nextReview: daysFromNow(3),
      };
      const result = getDueCards([due, notDue]);
      expect(result).toHaveLength(1);
      expect(result[0].topicId).toBe('due-topic');
    });

    it('returns empty array when no cards are due', () => {
      const card = { ...createCard('test'), nextReview: daysFromNow(5) };
      expect(getDueCards([card])).toHaveLength(0);
    });

    it('returns card due today', () => {
      const now = new Date();
      const card = { ...createCard('test'), nextReview: now };
      const result = getDueCards([card], now);
      expect(result).toHaveLength(1);
    });
  });

  describe('getNextCard', () => {
    it('returns card with lowest box number when multiple due', () => {
      const box1 = { ...createCard('box1-topic'), box: 1 as const, nextReview: daysAgo(1) };
      const box3 = { ...createCard('box3-topic'), box: 3 as const, nextReview: daysAgo(2) };
      const next = getNextCard([box3, box1]);
      expect(next?.topicId).toBe('box1-topic');
    });

    it('returns null when no cards due', () => {
      const card = { ...createCard('test'), nextReview: daysFromNow(3) };
      expect(getNextCard([card])).toBeNull();
    });
  });

  describe('getCardAccuracy', () => {
    it('returns 0 for new card', () => {
      expect(getCardAccuracy(createCard('test'))).toBe(0);
    });

    it('calculates correct percentage', () => {
      let card = createCard('test');
      card = { ...card, totalAttempts: 10, totalCorrect: 8 };
      expect(getCardAccuracy(card)).toBe(80);
    });

    it('returns 100 for perfect card', () => {
      const card = { ...createCard('test'), totalAttempts: 5, totalCorrect: 5 };
      expect(getCardAccuracy(card)).toBe(100);
    });
  });
});
