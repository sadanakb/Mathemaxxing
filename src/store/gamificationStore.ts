'use client';

import { create } from 'zustand';
import type { Achievement } from '@/lib/curriculum/types';

export type GamificationEvent =
  | { type: 'xp'; amount: number }
  | { type: 'level-up'; level: number }
  | { type: 'achievement'; achievement: Achievement }
  | { type: 'streak'; days: number };

type GamificationStore = {
  pendingEvents: GamificationEvent[];
  currentEvent: GamificationEvent | null;
  pushEvent: (event: GamificationEvent) => void;
  consumeEvent: () => void;
  clearAll: () => void;
};

export const useGamificationStore = create<GamificationStore>()((set, get) => ({
  pendingEvents: [],
  currentEvent: null,

  pushEvent: (event) => {
    set((state) => {
      if (!state.currentEvent) {
        return { currentEvent: event };
      }
      return { pendingEvents: [...state.pendingEvents, event] };
    });
  },

  consumeEvent: () => {
    set((state) => {
      const [next, ...rest] = state.pendingEvents;
      return {
        currentEvent: next ?? null,
        pendingEvents: rest,
      };
    });
  },

  clearAll: () => set({ pendingEvents: [], currentEvent: null }),
}));
