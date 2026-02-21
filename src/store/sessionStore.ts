'use client';

import { create } from 'zustand';
import type { Exercise, SessionState } from '@/lib/curriculum/types';

// Session store is intentionally NOT persisted — ephemeral UI state only

type SessionStore = SessionState & {
  setCurrentExercise: (exercise: Exercise | null) => void;
  setCurrentTopic: (topicId: string | null) => void;
  startSession: (topicId: string) => void;
  endSession: () => void;
  recordExerciseCompleted: (xpEarned: number) => void;
  showHintAction: () => void;
  setAnimationState: (state: SessionState['animationState']) => void;
  resetAnimation: () => void;
};

export const useSessionStore = create<SessionStore>()((set) => ({
  // Initial state
  currentExercise: null,
  currentTopicId: null,
  sessionStartTime: null,
  exercisesCompletedThisSession: 0,
  xpEarnedThisSession: 0,
  showHint: false,
  animationState: 'idle',

  setCurrentExercise: (exercise) => set({ currentExercise: exercise, showHint: false }),
  setCurrentTopic: (topicId) => set({ currentTopicId: topicId }),

  startSession: (topicId) =>
    set({
      currentTopicId: topicId,
      sessionStartTime: new Date(),
      exercisesCompletedThisSession: 0,
      xpEarnedThisSession: 0,
      showHint: false,
      animationState: 'idle',
    }),

  endSession: () =>
    set({
      currentExercise: null,
      currentTopicId: null,
      sessionStartTime: null,
      animationState: 'idle',
    }),

  recordExerciseCompleted: (xpEarned) =>
    set((state) => ({
      exercisesCompletedThisSession: state.exercisesCompletedThisSession + 1,
      xpEarnedThisSession: state.xpEarnedThisSession + xpEarned,
    })),

  showHintAction: () => set({ showHint: true }),

  setAnimationState: (animState) => set({ animationState: animState }),

  resetAnimation: () =>
    setTimeout(() => set({ animationState: 'idle' }), 1500),
}));
