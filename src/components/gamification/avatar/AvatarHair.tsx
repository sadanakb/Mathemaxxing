'use client';

export type HairStyleId = 'spiky' | 'long' | 'curly' | 'bob' | 'mohawk';

type AvatarHairProps = {
  style: HairStyleId;
  color?: string;
};

const HAIR_PATHS: Record<HairStyleId, React.ReactNode> = {
  spiky: (
    <g>
      <path d="M35 40 Q30 15 45 22 Q42 8 60 15 Q65 5 75 18 Q85 12 82 30 Q88 35 85 42 Q80 28 60 25 Q40 28 35 40Z" fill="currentColor" />
    </g>
  ),
  long: (
    <g>
      <path d="M28 45 Q28 20 60 18 Q92 20 92 45 L92 75 Q92 82 85 80 L85 50 Q85 30 60 28 Q35 30 35 50 L35 80 Q28 82 28 75Z" fill="currentColor" />
    </g>
  ),
  curly: (
    <g>
      <circle cx="38" cy="28" r="10" fill="currentColor" />
      <circle cx="55" cy="22" r="11" fill="currentColor" />
      <circle cx="72" cy="25" r="10" fill="currentColor" />
      <circle cx="84" cy="35" r="9" fill="currentColor" />
      <circle cx="32" cy="40" r="8" fill="currentColor" />
      <circle cx="60" cy="18" r="8" fill="currentColor" />
    </g>
  ),
  bob: (
    <g>
      <path d="M30 50 Q28 22 60 18 Q92 22 90 50 Q88 62 78 58 L78 40 Q78 30 60 28 Q42 30 42 40 L42 58 Q32 62 30 50Z" fill="currentColor" />
    </g>
  ),
  mohawk: (
    <g>
      <path d="M50 38 Q48 5 60 8 Q72 5 70 38" fill="currentColor" />
      <path d="M52 36 Q54 12 60 14 Q66 12 68 36" fill="currentColor" opacity="0.7" />
    </g>
  ),
};

export function AvatarHair({ style, color = '#4A3728' }: AvatarHairProps) {
  return (
    <g style={{ color }}>
      {HAIR_PATHS[style]}
    </g>
  );
}
