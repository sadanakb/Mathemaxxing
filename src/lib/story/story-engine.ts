// ============================================================
// Story Engine — Query and manage story beats per world
// ============================================================

import type { StoryBeat } from '@/lib/story/types';
import type { WorldId } from '@/lib/theme/worlds';

/** Internal registry of story beats per world. */
const STORY_BEATS: Record<WorldId, StoryBeat[]> = {
  entdecker: [],
  abenteuer: [],
  forscher: [],
  weltraum: [],
};

/**
 * Register story beats for a specific world.
 * Typically called during app initialization to load beats from data files.
 */
export function registerStoryBeats(worldId: WorldId, beats: StoryBeat[]): void {
  STORY_BEATS[worldId] = beats;
}

/**
 * Get all story beats for a given world.
 * @param worldId The world to fetch beats for
 * @returns Array of all story beats in that world
 */
export function getStoryBeatsForWorld(worldId: WorldId): StoryBeat[] {
  return STORY_BEATS[worldId] || [];
}

/**
 * Find the next story beat to show the user.
 * Returns the first beat whose `triggerAfterMastered` threshold is met and hasn't been seen yet.
 *
 * @param worldId The current world
 * @param masteredCount Number of topics the user has mastered
 * @param seenBeats Set of beat IDs the user has already viewed
 * @returns The next beat to show, or null if no new beat is available
 */
export function getNextStoryBeat(
  worldId: WorldId,
  masteredCount: number,
  seenBeats: string[]
): StoryBeat | null {
  const worldBeats = getStoryBeatsForWorld(worldId);
  const seenSet = new Set(seenBeats);

  // Sort beats by triggerAfterMastered in ascending order
  // to show them in the intended sequence
  const sortedBeats = [...worldBeats].sort(
    (a, b) => a.triggerAfterMastered - b.triggerAfterMastered
  );

  for (const beat of sortedBeats) {
    // Check if this beat's trigger threshold is met
    const thresholdMet = masteredCount >= beat.triggerAfterMastered;
    // Check if this beat hasn't been seen yet
    const notSeen = !seenSet.has(beat.id);

    if (thresholdMet && notSeen) {
      return beat;
    }
  }

  return null;
}
