'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AvatarState = {
  hairStyle: string | null;
  outfit: string | null;
  accessory: string | null;
  pet: string | null;
  ownedItems: string[];
};

type AvatarActions = {
  equipItem: (category: 'hair' | 'outfit' | 'accessory' | 'pet', itemId: string) => void;
  unequipItem: (category: 'hair' | 'outfit' | 'accessory' | 'pet') => void;
  addOwnedItem: (itemId: string) => void;
  isOwned: (itemId: string) => boolean;
};

type AvatarStore = AvatarState & AvatarActions;

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      hairStyle: null,
      outfit: null,
      accessory: null,
      pet: null,
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
