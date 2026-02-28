'use client';

type GoalRingProps = {
  current: number;    // Heutige Minuten
  goal: number;       // Tagesziel in Minuten
  size?: number;      // SVG-Größe in px
};

export function GoalRing({ current, goal, size = 96 }: GoalRingProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, goal > 0 ? current / goal : 0);
  const dashOffset = circumference * (1 - progress);
  const center = size / 2;

  const completed = current >= goal;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Tagesziel: ${current} von ${goal} Minuten`}
          className="-rotate-90"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Hintergrunds-Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--primary-lighter, #E5E7EB)"
            strokeWidth="8"
          />
          {/* Fortschritts-Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={completed ? 'var(--color-correct, #10B981)' : 'var(--color-primary)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Mitte: Minuten-Zahl */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-xl font-extrabold leading-none">
            {current}
          </span>
          <span className="text-xs opacity-60">min</span>
        </div>
      </div>

      <div className="text-xs opacity-60">
        {completed ? (
          <span className="text-emerald-600 font-semibold">🎯 Ziel erreicht!</span>
        ) : (
          <span>Ziel: {goal} min</span>
        )}
      </div>
    </div>
  );
}
