'use client';

export type OutfitId = 'wizard' | 'superhero' | 'astronaut' | 'pirate' | 'scientist' | 'ninja';

type AvatarOutfitProps = {
  outfit: OutfitId;
};

const OUTFITS: Record<OutfitId, React.ReactNode> = {
  wizard: (
    <g>
      {/* Robe */}
      <path d="M35 85 Q35 78 45 76 L60 74 L75 76 Q85 78 85 85 L85 110 L35 110Z" fill="#6B3FA0" />
      {/* Star pattern */}
      <circle cx="55" cy="90" r="2" fill="#FFD93D" />
      <circle cx="68" cy="95" r="1.5" fill="#FFD93D" />
      <circle cx="50" cy="100" r="1.5" fill="#FFD93D" />
      {/* Collar */}
      <path d="M45 76 L60 82 L75 76" stroke="#8B5CF6" strokeWidth="2" fill="none" />
    </g>
  ),
  superhero: (
    <g>
      {/* Body suit */}
      <path d="M38 85 Q38 78 48 76 L72 76 Q82 78 82 85 L82 110 L38 110Z" fill="#EF4444" />
      {/* Belt */}
      <rect x="38" y="95" width="44" height="5" rx="2" fill="#FFD93D" />
      {/* Emblem */}
      <circle cx="60" cy="86" r="6" fill="#FFD93D" />
      <path d="M57 86 L60 82 L63 86 L60 90Z" fill="#EF4444" />
      {/* Cape */}
      <path d="M38 78 Q30 90 28 110 L38 110Z" fill="#DC2626" opacity="0.8" />
      <path d="M82 78 Q90 90 92 110 L82 110Z" fill="#DC2626" opacity="0.8" />
    </g>
  ),
  astronaut: (
    <g>
      {/* Suit */}
      <path d="M36 85 Q36 76 48 74 L72 74 Q84 76 84 85 L84 110 L36 110Z" fill="#E5E7EB" />
      {/* Chest panel */}
      <rect x="48" y="82" width="24" height="15" rx="3" fill="#374151" />
      <circle cx="54" cy="87" r="2" fill="#10B981" />
      <circle cx="60" cy="87" r="2" fill="#EF4444" />
      <circle cx="66" cy="87" r="2" fill="#3B82F6" />
      {/* Shoulder patches */}
      <rect x="38" y="78" width="8" height="4" rx="1" fill="#F59E0B" />
      <rect x="74" y="78" width="8" height="4" rx="1" fill="#F59E0B" />
    </g>
  ),
  pirate: (
    <g>
      {/* Vest */}
      <path d="M38 85 Q38 78 48 76 L72 76 Q82 78 82 85 L82 110 L38 110Z" fill="#92400E" />
      {/* Shirt underneath */}
      <path d="M48 76 L60 82 L72 76 L72 100 L48 100Z" fill="#FEF3C7" />
      {/* Belt with buckle */}
      <rect x="38" y="95" width="44" height="4" rx="1" fill="#1F2937" />
      <rect x="56" y="94" width="8" height="6" rx="1" fill="#F59E0B" />
      {/* Skull on vest */}
      <circle cx="44" cy="88" r="3" fill="#FEF3C7" />
    </g>
  ),
  scientist: (
    <g>
      {/* Lab coat */}
      <path d="M34 85 Q34 76 46 74 L74 74 Q86 76 86 85 L86 110 L34 110Z" fill="white" stroke="#D1D5DB" strokeWidth="1" />
      {/* Shirt + tie */}
      <path d="M52 74 L60 80 L68 74" fill="#3B82F6" />
      <rect x="58" y="80" width="4" height="20" fill="#3B82F6" />
      {/* Pocket */}
      <rect x="70" y="85" width="10" height="8" rx="1" fill="white" stroke="#D1D5DB" strokeWidth="0.5" />
      <line x1="72" y1="86" x2="72" y2="92" stroke="#EF4444" strokeWidth="1.5" />
    </g>
  ),
  ninja: (
    <g>
      {/* Suit */}
      <path d="M38 85 Q38 78 48 76 L72 76 Q82 78 82 85 L82 110 L38 110Z" fill="#1F2937" />
      {/* Belt */}
      <rect x="38" y="92" width="44" height="4" rx="1" fill="#EF4444" />
      {/* Star shuriken emblem */}
      <path d="M60 82 L62 86 L66 84 L63 88 L67 90 L62 90 L60 94 L58 90 L53 90 L57 88 L54 84 L58 86Z" fill="#9CA3AF" />
    </g>
  ),
};

export function AvatarOutfit({ outfit }: AvatarOutfitProps) {
  return <g>{OUTFITS[outfit]}</g>;
}
