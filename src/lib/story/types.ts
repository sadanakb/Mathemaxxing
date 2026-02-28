// ============================================================
// Story System — Types for narrative progression per world
// ============================================================

import type { WorldId } from '@/lib/theme/worlds';

/** A single narrative moment triggered by progress. */
export type StoryBeat = {
  id: string;
  worldId: WorldId;
  /** Number of mastered topics required to trigger this beat. */
  triggerAfterMastered: number;
  title: string;
  text: string;
  /** Path to illustration image (relative to world asset folder). */
  illustrationPath?: string;
  /** Optional Finn mood for this beat. */
  finnMood?: 'happy' | 'celebrating' | 'encouraging';
};

/** Tracks which story beats the user has seen. */
export type StoryProgress = {
  /** Set of story beat IDs the user has already viewed. */
  seenBeats: string[];
  /** The last beat ID that was shown. */
  lastBeatId: string | null;
};

/** Creates a fresh story progress object. */
export function createDefaultStoryProgress(): StoryProgress {
  return {
    seenBeats: [],
    lastBeatId: null,
  };
}
