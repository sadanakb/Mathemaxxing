'use client';

import { useAvatarStore } from '@/store/avatarStore';
import { getShopItem } from '@/lib/gamification/shop-items';

type AvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  showPet?: boolean;
};

const SIZE_MAP = {
  sm: 'w-10 h-10 text-xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-24 h-24 text-5xl',
};

export default function Avatar({ size = 'md', showPet = true }: AvatarProps) {
  const { hairStyle, outfit, accessory, pet } = useAvatarStore();

  const outfitItem = outfit ? getShopItem(outfit) : null;
  const accessoryItem = accessory ? getShopItem(accessory) : null;
  const petItem = pet ? getShopItem(pet) : null;

  const mainIcon = outfitItem?.icon ?? '🧒';

  return (
    <div className="inline-flex items-end gap-1" aria-label="Dein Avatar">
      <div className="relative">
        {/* Accessory (top) */}
        {accessoryItem && (
          <span className="absolute -top-2 -right-1 text-sm" aria-hidden="true">
            {accessoryItem.icon}
          </span>
        )}

        {/* Main avatar body */}
        <div
          className={`${SIZE_MAP[size]} rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center`}
        >
          <span aria-hidden="true">{mainIcon}</span>
        </div>
      </div>

      {/* Pet (beside) */}
      {showPet && petItem && (
        <span className="text-lg" aria-hidden="true">
          {petItem.icon}
        </span>
      )}
    </div>
  );
}
