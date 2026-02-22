'use client';

type FaceExpression = 'happy' | 'neutral' | 'excited' | 'thinking' | 'sad';

type AvatarFaceProps = {
  expression?: FaceExpression;
  skinColor?: string;
};

const EYES: Record<FaceExpression, React.ReactNode> = {
  happy: (
    <>
      <ellipse cx="42" cy="50" rx="4" ry="5" fill="#2D2D2D" />
      <ellipse cx="78" cy="50" rx="4" ry="5" fill="#2D2D2D" />
      <ellipse cx="43" cy="48" rx="1.5" ry="2" fill="white" />
      <ellipse cx="79" cy="48" rx="1.5" ry="2" fill="white" />
    </>
  ),
  neutral: (
    <>
      <ellipse cx="42" cy="50" rx="4" ry="5" fill="#2D2D2D" />
      <ellipse cx="78" cy="50" rx="4" ry="5" fill="#2D2D2D" />
    </>
  ),
  excited: (
    <>
      <ellipse cx="42" cy="48" rx="5" ry="6" fill="#2D2D2D" />
      <ellipse cx="78" cy="48" rx="5" ry="6" fill="#2D2D2D" />
      <ellipse cx="43" cy="46" rx="2" ry="2.5" fill="white" />
      <ellipse cx="79" cy="46" rx="2" ry="2.5" fill="white" />
    </>
  ),
  thinking: (
    <>
      <ellipse cx="42" cy="50" rx="4" ry="5" fill="#2D2D2D" />
      <ellipse cx="78" cy="52" rx="3.5" ry="4" fill="#2D2D2D" />
    </>
  ),
  sad: (
    <>
      <ellipse cx="42" cy="52" rx="4" ry="4" fill="#2D2D2D" />
      <ellipse cx="78" cy="52" rx="4" ry="4" fill="#2D2D2D" />
    </>
  ),
};

const MOUTHS: Record<FaceExpression, React.ReactNode> = {
  happy: (
    <path d="M48 68 Q60 80 72 68" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  ),
  neutral: (
    <line x1="48" y1="70" x2="72" y2="70" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
  ),
  excited: (
    <path d="M46 66 Q60 82 74 66" stroke="#2D2D2D" strokeWidth="2.5" fill="#FF8E8E" strokeLinecap="round" />
  ),
  thinking: (
    <circle cx="68" cy="70" r="4" fill="#2D2D2D" opacity="0.6" />
  ),
  sad: (
    <path d="M48 74 Q60 64 72 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  ),
};

export function AvatarFace({ expression = 'happy', skinColor = '#FFD5A0' }: AvatarFaceProps) {
  return (
    <g>
      {/* Head */}
      <circle cx="60" cy="52" r="32" fill={skinColor} />
      {/* Cheeks */}
      <circle cx="38" cy="60" r="6" fill="#FFB5B5" opacity="0.3" />
      <circle cx="82" cy="60" r="6" fill="#FFB5B5" opacity="0.3" />
      {/* Nose */}
      <ellipse cx="60" cy="58" rx="2.5" ry="2" fill={skinColor} stroke="#D4A574" strokeWidth="1" />
      {/* Eyes */}
      {EYES[expression]}
      {/* Mouth */}
      {MOUTHS[expression]}
    </g>
  );
}
