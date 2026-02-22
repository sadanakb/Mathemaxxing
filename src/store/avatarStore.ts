'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SkinColor = '#FFD5A0' | '#F5C08B' | '#C68642' | '#8D5524' | '#5C3310';

export const SKIN_COLORS: { id: SkinColor; label: string }[] = [
  { id: '#FFD5A0', label: 'Hell' },
  { id: '#F5C08B', label: 'Mittel-hell' },
  { id: '#C68642', label: 'Mittel' },
  { id: '#8D5524', label: 'Mittel-dunkel' },
  { id: '#5C3310', label: 'Dunkel' },
];

export type FaceExpression = 'happy' | 'neutral' | 'excited' | 'thinking' | 'sad';

export type AvatarState = {
  hairStyle: string | null;
  outfit: string | null;
  accessory: string | null;
  pet: string | null;
  skinColor: SkinColor;
  faceExpression: FaceExpression;
  ownedItems: string[];
};

type AvatarActions = {
  equipItem: (category: 'hair' | 'outfit' | 'accessory' | 'pet', itemId: string) => void;
  unequipItem: (category: 'hair' | 'outfit' | 'accessory' | 'pet') => void;
  addOwnedItem: (itemId: string) => void;
  isOwned: (itemId: string) => boolean;
  setSkinColor: (color: SkinColor) => void;
  setFaceExpression: (expression: FaceExpression) => void;
};

type AvatarStore = AvatarState & AvatarActions;

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      hairStyle: null,
      outfit: null,
      accessory: null,
      pet: null,
      skinColor: '#FFD5A0',
      faceExpression: 'happy',
      ownedItems: [],

      equipItem: (category, itemId) => {
        const key = categoryToKey(category);
        set({ [key]: itemId });
      },

      unequipItem: (category) => {
        const key = categoryToKey(category);
        set({ [key]: null });
      },

      addOwnedItem: (itemId) => {
        const { ownedItems } = get();
        if (!ownedItems.includes(itemId)) {
          set({ ownedItems: [...ownedItems, itemId] });
        }
      },

      isOwned: (itemId) => {
        return get().ownedItems.includes(itemId);
      },

      setSkinColor: (color) => set({ skinColor: color }),

      setFaceExpression: (expression) => set({ faceExpression: expression }),
    }),
    {
      name: 'mathemaxxing-avatar',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function categoryToKey(category: 'hair' | 'outfit' | 'accessory' | 'pet'): keyof AvatarState {
  switch (category) {
    case 'hair': return 'hairStyle';
    case 'outfit': return 'outfit';
    case 'accessory': return 'accessory';
    case 'pet': return 'pet';
  }
}
