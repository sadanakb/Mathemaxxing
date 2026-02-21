'use client';

type StreakDisplayProps = {
  days: number;
  isActive: boolean;
};

type StreakTier = {
  scale: number;
  gradient: [string, string];
  glow: boolean;
  animated: boolean;
};

function getStreakTier(days: number): StreakTier {
  if (days >= 30) return { scale: 1.3, gradient: ['#9333EA', '#FFD700'], glow: true, animated: true };
  if (days >= 14) return { scale: 1.2, gradient: ['#DC2626', '#9333EA'], glow: true, animated: false };
  if (days >= 7) return { scale: 1.1, gradient: ['#DC2626', '#DC2626'], glow: false, animated: false };
  if (days >= 3) return { scale: 1.0, gradient: ['#F97316', '#DC2626'], glow: false, animated: false };
  return { scale: 0.85, gradient: ['#F97316', '#F97316'], glow: false, animated: false };
}

function getMotivation(days: number): string {
  if (days >= 30) return 'Mathe-Legende!';
  if (days >= 14) return 'Unglaublich!';
  if (days >= 7) return 'Starke Woche!';
  if (days >= 3) return 'Bleib dran!';
  if (days >= 1) return 'Guter Anfang!';
  return 'Starte deine Serie!';
}

function FlameIcon({
  tier,
  inactive,
}: {
  tier: StreakTier;
  inactive: boolean;
}) {
  const gradientId = 'streak-flame-grad';
  const color1 = inactive ? '#9CA3AF' : tier.gradient[0];
  const color2 = inactive ? '#6B7280' : tier.gradient[1];

  return (
    <svg
      viewBox="0 0 32 40"
      width={32 * tier.scale}
      height={40 * tier.scale}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        filter: !inactive && tier.glow
          ? `drop-shadow(0 0 6px ${tier.gradient[0]}88)`
          : undefined,
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {/* Main flame */}
      <path
        d="M16,2 Q20,10 24,16 Q28,22 26,30 Q24,36 20,38 Q18,34 16,30 Q14,34 12,38 Q8,36 6,30 Q4,22 8,16 Q12,10 16,2Z"
        fill={`url(#${gradientId})`}
      >
        {tier.animated && !inactive && (
          <animate
            attributeName="d"
            dur="0.8s"
            repeatCount="indefinite"
            values="
              M16,2 Q20,10 24,16 Q28,22 26,30 Q24,36 20,38 Q18,34 16,30 Q14,34 12,38 Q8,36 6,30 Q4,22 8,16 Q12,10 16,2Z;
              M16,4 Q21,11 25,17 Q29,23 27,30 Q25,36 21,38 Q19,33 16,29 Q13,33 11,38 Q7,36 5,30 Q3,23 7,17 Q11,11 16,4Z;
              M16,2 Q20,10 24,16 Q28,22 26,30 Q24,36 20,38 Q18,34 16,30 Q14,34 12,38 Q8,36 6,30 Q4,22 8,16 Q12,10 16,2Z
            "
          />
        )}
      </path>
      {/* Inner flame */}
      <path
        d="M16,14 Q18,18 20,22 Q22,26 20,32 Q18,34 16,32 Q14,34 12,32 Q10,26 12,22 Q14,18 16,14Z"
        fill={inactive ? '#D1D5DB' : '#FBBF24'}
        opacity={0.9}
      >
        {tier.animated && !inactive && (
          <animate
            attributeName="d"
            dur="0.6s"
            repeatCount="indefinite"
            values="
              M16,14 Q18,18 20,22 Q22,26 20,32 Q18,34 16,32 Q14,34 12,32 Q10,26 12,22 Q14,18 16,14Z;
              M16,16 Q19,19 21,23 Q23,27 21,32 Q19,34 16,31 Q13,34 11,32 Q9,27 11,23 Q13,19 16,16Z;
              M16,14 Q18,18 20,22 Q22,26 20,32 Q18,34 16,32 Q14,34 12,32 Q10,26 12,22 Q14,18 16,14Z
            "
          />
        )}
      </path>
    </svg>
  );
}

export function StreakDisplay({ days, isActive }: StreakDisplayProps) {
  const tier = getStreakTier(days);
  const motivation = getMotivation(days);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex items-center justify-center">
        <FlameIcon tier={tier} inactive={!isActive} />
      </div>
      <span
        className="text-lg font-bold tabular-nums"
        style={{ color: isActive ? tier.gradient[0] : '#9CA3AF' }}
      >
        {days} {days === 1 ? 'Tag' : 'Tage'}
      </span>
      <span className="text-xs text-gray-500">{motivation}</span>
    </div>
  );
}
