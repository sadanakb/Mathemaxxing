'use client';

import { motion } from 'framer-motion';

export type PetId = 'cat' | 'owl' | 'dragon' | 'bunny';

type PetCompanionProps = {
  pet: PetId;
  size?: number;
};

const PETS: Record<PetId, React.ReactNode> = {
  cat: (
    <g>
      {/* Body */}
      <ellipse cx="20" cy="28" rx="14" ry="12" fill="#F97316" />
      {/* Ears */}
      <path d="M10 18 L8 8 L16 14Z" fill="#F97316" />
      <path d="M30 18 L32 8 L24 14Z" fill="#F97316" />
      <path d="M11 16 L10 10 L15 14Z" fill="#FDBA74" />
      <path d="M29 16 L30 10 L25 14Z" fill="#FDBA74" />
      {/* Face */}
      <circle cx="15" cy="24" r="2" fill="#2D2D2D" />
      <circle cx="25" cy="24" r="2" fill="#2D2D2D" />
      <ellipse cx="20" cy="28" rx="2" ry="1.5" fill="#FDBA74" />
      {/* Whiskers */}
      <line x1="8" y1="26" x2="2" y2="24" stroke="#2D2D2D" strokeWidth="0.5" />
      <line x1="8" y1="28" x2="2" y2="28" stroke="#2D2D2D" strokeWidth="0.5" />
      <line x1="32" y1="26" x2="38" y2="24" stroke="#2D2D2D" strokeWidth="0.5" />
      <line x1="32" y1="28" x2="38" y2="28" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* Tail */}
      <path d="M34 28 Q40 20 36 12" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  owl: (
    <g>
      {/* Body */}
      <ellipse cx="20" cy="26" rx="14" ry="16" fill="#92400E" />
      {/* Belly */}
      <ellipse cx="20" cy="30" rx="8" ry="10" fill="#FDE68A" />
      {/* Eyes */}
      <circle cx="14" cy="20" r="6" fill="white" />
      <circle cx="26" cy="20" r="6" fill="white" />
      <circle cx="14" cy="20" r="3" fill="#2D2D2D" />
      <circle cx="26" cy="20" r="3" fill="#2D2D2D" />
      <circle cx="15" cy="19" r="1" fill="white" />
      <circle cx="27" cy="19" r="1" fill="white" />
      {/* Beak */}
      <path d="M18 24 L20 28 L22 24Z" fill="#F59E0B" />
      {/* Ear tufts */}
      <path d="M10 12 L6 4 L14 10Z" fill="#92400E" />
      <path d="M30 12 L34 4 L26 10Z" fill="#92400E" />
    </g>
  ),
  dragon: (
    <g>
      {/* Body */}
      <ellipse cx="20" cy="28" rx="14" ry="12" fill="#10B981" />
      {/* Belly */}
      <ellipse cx="20" cy="30" rx="8" ry="8" fill="#6EE7B7" />
      {/* Head spikes */}
      <path d="M12 18 L8 6 L16 14Z" fill="#059669" />
      <path d="M20 16 L20 4 L24 14Z" fill="#059669" />
      <path d="M28 18 L32 6 L24 14Z" fill="#059669" />
      {/* Eyes */}
      <circle cx="14" cy="22" r="3" fill="#FDE68A" />
      <ellipse cx="14" cy="22" rx="1.5" ry="3" fill="#2D2D2D" />
      <circle cx="26" cy="22" r="3" fill="#FDE68A" />
      <ellipse cx="26" cy="22" rx="1.5" ry="3" fill="#2D2D2D" />
      {/* Nostrils */}
      <circle cx="18" cy="28" r="1" fill="#059669" />
      <circle cx="22" cy="28" r="1" fill="#059669" />
      {/* Wings */}
      <path d="M6 24 Q-2 16 4 10 Q8 16 8 24Z" fill="#059669" opacity="0.7" />
      <path d="M34 24 Q42 16 36 10 Q32 16 32 24Z" fill="#059669" opacity="0.7" />
    </g>
  ),
  bunny: (
    <g>
      {/* Body */}
      <ellipse cx="20" cy="30" rx="12" ry="10" fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
      {/* Ears */}
      <ellipse cx="14" cy="10" rx="4" ry="14" fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
      <ellipse cx="26" cy="10" rx="4" ry="14" fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
      <ellipse cx="14" cy="10" rx="2" ry="10" fill="#FFB5B5" />
      <ellipse cx="26" cy="10" rx="2" ry="10" fill="#FFB5B5" />
      {/* Eyes */}
      <circle cx="15" cy="26" r="2.5" fill="#2D2D2D" />
      <circle cx="25" cy="26" r="2.5" fill="#2D2D2D" />
      <circle cx="16" cy="25" r="1" fill="white" />
      <circle cx="26" cy="25" r="1" fill="white" />
      {/* Nose */}
      <path d="M18 30 L20 32 L22 30Z" fill="#FFB5B5" />
      {/* Whiskers */}
      <line x1="10" y1="30" x2="4" y2="28" stroke="#D1D5DB" strokeWidth="0.5" />
      <line x1="10" y1="32" x2="4" y2="32" stroke="#D1D5DB" strokeWidth="0.5" />
      <line x1="30" y1="30" x2="36" y2="28" stroke="#D1D5DB" strokeWidth="0.5" />
      <line x1="30" y1="32" x2="36" y2="32" stroke="#D1D5DB" strokeWidth="0.5" />
    </g>
  ),
};

export function PetCompanion({ pet, size = 40 }: PetCompanionProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-label={`Begleiter: ${pet}`}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {PETS[pet]}
    </motion.svg>
  );
}
