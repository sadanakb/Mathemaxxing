'use client';

export type AccessoryId = 'glasses' | 'crown' | 'headphones' | 'hat' | 'scarf';

type AvatarAccessoryProps = {
  accessory: AccessoryId;
};

const ACCESSORIES: Record<AccessoryId, React.ReactNode> = {
  glasses: (
    <g>
      <circle cx="42" cy="50" r="8" fill="none" stroke="#374151" strokeWidth="2" />
      <circle cx="78" cy="50" r="8" fill="none" stroke="#374151" strokeWidth="2" />
      <line x1="50" y1="50" x2="70" y2="50" stroke="#374151" strokeWidth="2" />
      <line x1="34" y1="50" x2="28" y2="46" stroke="#374151" strokeWidth="1.5" />
      <line x1="86" y1="50" x2="92" y2="46" stroke="#374151" strokeWidth="1.5" />
    </g>
  ),
  crown: (
    <g>
      <path d="M36 26 L40 14 L48 22 L60 10 L72 22 L80 14 L84 26Z" fill="#FFD93D" />
      <path d="M36 26 L84 26 L84 32 L36 32Z" fill="#F59E0B" />
      <circle cx="60" cy="29" r="3" fill="#EF4444" />
      <circle cx="48" cy="29" r="2" fill="#3B82F6" />
      <circle cx="72" cy="29" r="2" fill="#10B981" />
    </g>
  ),
  headphones: (
    <g>
      <path d="M28 52 Q28 28 60 26 Q92 28 92 52" fill="none" stroke="#374151" strokeWidth="3" />
      <rect x="24" y="48" width="8" height="14" rx="4" fill="#374151" />
      <rect x="88" y="48" width="8" height="14" rx="4" fill="#374151" />
      <rect x="25" y="50" width="6" height="10" rx="3" fill="#6B7280" />
      <rect x="89" y="50" width="6" height="10" rx="3" fill="#6B7280" />
    </g>
  ),
  hat: (
    <g>
      <ellipse cx="60" cy="28" rx="30" ry="6" fill="#1F2937" />
      <path d="M40 28 Q40 10 60 8 Q80 10 80 28" fill="#1F2937" />
      <rect x="40" y="24" width="40" height="4" fill="#EF4444" />
    </g>
  ),
  scarf: (
    <g>
      <path d="M35 72 Q35 68 60 68 Q85 68 85 72 Q85 78 75 78 L75 90 Q75 94 70 94 L70 78 Q60 80 50 78 L50 88 Q50 92 45 92 L45 78 Q35 78 35 72Z" fill="#EF4444" />
      <line x1="45" y1="72" x2="45" y2="88" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="72" x2="70" y2="90" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
    </g>
  ),
};

export function AvatarAccessory({ accessory }: AvatarAccessoryProps) {
  return <g>{ACCESSORIES[accessory]}</g>;
}
