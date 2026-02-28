'use client';

import { useEffect } from 'react';
import { useGamificationStore } from '@/store/gamificationStore';
import { XPPopup } from './XPPopup';
import { LevelUpOverlay } from './LevelUpOverlay';
import { AchievementUnlockModal } from './AchievementUnlockModal';
// Story imports — StoryBeatOverlay and getStoryBeatsForWorld are imported for
// future Phase 1 integration. The 'story' event is consumed immediately for now.
import { StoryBeatOverlay } from '@/components/story/StoryBeatOverlay';
import { getStoryBeatsForWorld } from '@/lib/story/story-engine';

/**
 * Global overlay that consumes gamification events from the store
 * and renders the appropriate animation/modal.
 *
 * Place this component once in your layout or page wrapper.
 */
export function GamificationOverlay() {
  const { currentEvent, consumeEvent } = useGamificationStore();

  // Consume streak and story events in an effect instead of during render.
  // Story events are consumed immediately here as a placeholder;
  // Phase 1 will wire up the proper StoryBeatOverlay display.
  useEffect(() => {
    if (currentEvent?.type === 'streak' || currentEvent?.type === 'story') {
      consumeEvent();
    }
  }, [currentEvent, consumeEvent]);

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
      // Streak events are consumed via useEffect above
      return null;

    case 'story':
      // Story events are consumed via useEffect above.
      // Phase 1 will connect this to StoryBeatOverlay + getStoryBeatsForWorld.
      // Placeholder: void the unused imports to satisfy lint until wired up.
      void StoryBeatOverlay;
      void getStoryBeatsForWorld;
      return null;

    default:
      return null;
  }
}
