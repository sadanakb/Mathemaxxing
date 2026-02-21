'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Bundesland, Klassenstufe, Schulform, Kurstyp } from '@/lib/curriculum/types';

type CurriculumState = {
  bundesland: Bundesland | null;
  klasse: Klassenstufe | null;
  schulform: Schulform | null;
  kurstyp: Kurstyp;
  themePreference: 'auto' | 'grundschule' | 'unterstufe';

  // Actions
  setBundesland: (bl: Bundesland) => void;
  setKlasse: (k: Klassenstufe) => void;
  setSchulform: (sf: Schulform) => void;
  setKurstyp: (kt: Kurstyp) => void;
  setTheme: (t: 'auto' | 'grundschule' | 'unterstufe') => void;
  reset: () => void;
};

const initialState = {
  bundesland: null,
  klasse: null,
  schulform: null,
  kurstyp: 'keine' as Kurstyp,
  themePreference: 'auto' as const,
};

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      ...initialState,

      setBundesland: (bl) => set({ bundesland: bl }),
      setKlasse: (k) => set({ klasse: k }),
      setSchulform: (sf) => set({ schulform: sf }),
      setKurstyp: (kt) => set({ kurstyp: kt }),
      setTheme: (t) => set({ themePreference: t }),
      reset: () => set(initialState),
    }),
    {
      name: 'mathemeister-curriculum',
      version: 1,
      storage: createJSONStorage(() => {
        // Safe localStorage access (SSR + quota protection)
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return {
          getItem: (name) => {
            try {
              return localStorage.getItem(name);
            } catch {
              return null;
            }
          },
          setItem: (name, value) => {
            try {
              localStorage.setItem(name, value);
            } catch (err) {
              if (err instanceof DOMException && err.name === 'QuotaExceededError') {
                console.warn('[CurriculumStore] localStorage quota exceeded');
                // curriculum store data is small, this should rarely happen
              }
            }
          },
          removeItem: (name) => {
            try {
              localStorage.removeItem(name);
            } catch {}
          },
        };
      }),
      migrate: (state, _fromVersion) => {
        // Version migrations — add future migrations here
        return state as CurriculumState;
      },
      // Only persist the settings, not actions
      partialize: (state) => ({
        bundesland: state.bundesland,
        klasse: state.klasse,
        schulform: state.schulform,
        kurstyp: state.kurstyp,
        themePreference: state.themePreference,
      }),
    }
  )
);

// Derived: current theme based on Klasse or preference
export function useCurrentTheme(): 'grundschule' | 'unterstufe' {
  const { klasse, themePreference } = useCurriculumStore();
  if (themePreference !== 'auto') return themePreference;
  return (klasse ?? 1) <= 4 ? 'grundschule' : 'unterstufe';
}
