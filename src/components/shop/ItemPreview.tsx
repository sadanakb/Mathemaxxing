'use client';

import { AvatarHair, type HairStyleId } from '@/components/gamification/avatar/AvatarHair';
import { AvatarOutfit, type OutfitId } from '@/components/gamification/avatar/AvatarOutfit';
import { AvatarAccessory, type AccessoryId } from '@/components/gamification/avatar/AvatarAccessory';
import { PetCompanion, type PetId } from '@/components/gamification/avatar/PetCompanion';
import type { ShopCategory } from '@/lib/gamification/shop-items';

type ItemPreviewProps = {
  category: ShopCategory;
  svgPreview?: string;
  icon: string;
  size?: number;
};

const VALID_HAIR: HairStyleId[] = ['spiky', 'long', 'curly', 'bob', 'mohawk'];
const VALID_OUTFIT: OutfitId[] = ['wizard', 'superhero', 'astronaut', 'pirate', 'scientist', 'ninja'];
const VALID_ACCESSORY: AccessoryId[] = ['glasses', 'crown', 'headphones', 'hat', 'scarf'];
const VALID_PET: PetId[] = ['cat', 'owl', 'dragon', 'bunny'];

export function ItemPreview({ category, svgPreview, icon, size = 64 }: ItemPreviewProps) {
  // For power-ups or items without SVG preview, show the emoji icon
  if (!svgPreview || category === 'power-up') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-4xl">{icon}</span>
      </div>
    );
  }

  // Pet — render as standalone component
  if (category === 'pet' && VALID_PET.includes(svgPreview as PetId)) {
    return <PetCompanion pet={svgPreview as PetId} size={size} />;
  }

  // Hair, Outfit, Accessory — render in an SVG
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="55" fill="#F3F4F6" />
      {category === 'hair' && VALID_HAIR.includes(svgPreview as HairStyleId) && (
        <AvatarHair style={svgPreview as HairStyleId} />
      )}
      {category === 'outfit' && VALID_OUTFIT.includes(svgPreview as OutfitId) && (
        <AvatarOutfit outfit={svgPreview as OutfitId} />
      )}
      {category === 'accessory' && VALID_ACCESSORY.includes(svgPreview as AccessoryId) && (
        <AvatarAccessory accessory={svgPreview as AccessoryId} />
      )}
    </svg>
  );
}
