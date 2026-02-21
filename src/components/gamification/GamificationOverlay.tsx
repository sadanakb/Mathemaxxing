'use client';

import { useGamificationStore } from '@/store/gamificationStore';
import { XPPopup } from './XPPopup';
import { LevelUpOverlay } from './LevelUpOverlay';
import { AchievementUnlockModal } from './AchievementUnlockModal';

/**
 * Global overlay that consumes gamification events from the store
 * and renders the appropriate animation/modal.
 *
 * Place this component once in your layout or page wrapper.
 */
export function GamificationOverlay() {
  const { currentEvent, consumeEvent } = useGamificationStore();

  if (!currentEvent) return null;

  switch (currentEvent.type) {
    case 'xp':
      return (
        <XPPopup
          amount={currentEvent.amount}
          visible
          onDone={consumeEvent}
        />
      );

    case 'level-up':
      return (
        <LevelUpOverlay
          level={currentEvent.level}
          visible
          onClose={consumeEvent}
        />
      );

    case 'achievement':
      return (
        <AchievementUnlockModal
          achievement={currentEvent.achievement}
          onClose={consumeEvent}
        />
      );

    case 'streak':
      // Streak events are shown inline on dashboard, not as overlay
      // Consume immediately so the queue moves on
      consumeEvent();
      return null;

    default:
      return null;
  }
}
