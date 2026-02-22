'use client';

import { useAvatarStore } from '@/store/avatarStore';
import { AvatarFace } from './avatar/AvatarFace';
import { AvatarHair, type HairStyleId } from './avatar/AvatarHair';
import { AvatarOutfit, type OutfitId } from './avatar/AvatarOutfit';
import { AvatarAccessory, type AccessoryId } from './avatar/AvatarAccessory';
import { PetCompanion, type PetId } from './avatar/PetCompanion';

type AvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  showPet?: boolean;
};

const SIZE_MAP = {
  sm: 40,
  md: 64,
  lg: 96,
};

const PET_SIZE_MAP = {
  sm: 20,
  md: 32,
  lg: 40,
};

/** Map shop item IDs to SVG component IDs */
const HAIR_MAP: Record<string, HairStyleId> = {
  'hair-spiky': 'spiky',
  'hair-long': 'long',
  'hair-curly': 'curly',
  'hair-bob': 'bob',
  'hair-mohawk': 'mohawk',
};

const OUTFIT_MAP: Record<string, OutfitId> = {
  'outfit-wizard': 'wizard',
  'outfit-superhero': 'superhero',
  'outfit-astronaut': 'astronaut',
  'outfit-pirate': 'pirate',
  'outfit-scientist': 'scientist',
  'outfit-ninja': 'ninja',
};

const ACCESSORY_MAP: Record<string, AccessoryId> = {
  'acc-glasses': 'glasses',
  'acc-crown': 'crown',
  'acc-headphones': 'headphones',
  'acc-hat': 'hat',
  'acc-scarf': 'scarf',
};

const PET_MAP: Record<string, PetId> = {
  'pet-cat': 'cat',
  'pet-owl': 'owl',
  'pet-dragon': 'dragon',
  'pet-bunny': 'bunny',
};

export default function Avatar({ size = 'md', showPet = true }: AvatarProps) {
  const { hairStyle, outfit, accessory, pet, skinColor, faceExpression } = useAvatarStore();

  const px = SIZE_MAP[size];
  const hairId = hairStyle ? HAIR_MAP[hairStyle] : undefined;
  const outfitId = outfit ? OUTFIT_MAP[outfit] : undefined;
  const accessoryId = accessory ? ACCESSORY_MAP[accessory] : undefined;
  const petId = pet ? PET_MAP[pet] : undefined;

  return (
    <div className="inline-flex items-end gap-1" aria-label="Dein Avatar">
      <svg
        width={px}
        height={px}
        viewBox="0 0 120 120"
        fill="none"
        className="flex-shrink-0"
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="url(#avatar-bg)"
          stroke="white"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="avatar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.15" />
          </linearGradient>
          <clipPath id="avatar-clip">
            <circle cx="60" cy="60" r="56" />
          </clipPath>
        </defs>

        <g clipPath="url(#avatar-clip)">
          {/* Outfit (behind face) */}
          {outfitId && <AvatarOutfit outfit={outfitId} />}

          {/* Face */}
          <AvatarFace expression={faceExpression} skinColor={skinColor} />

          {/* Hair (on top of face) */}
          {hairId && <AvatarHair style={hairId} />}

          {/* Accessory (topmost layer) */}
          {accessoryId && <AvatarAccessory accessory={accessoryId} />}
        </g>
      </svg>

      {/* Pet companion */}
      {showPet && petId && (
        <PetCompanion pet={petId} size={PET_SIZE_MAP[size]} />
      )}
    </div>
  );
}
