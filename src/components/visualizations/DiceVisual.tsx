'use client';

type DiceVisualProps = {
  values: number[];
  size?: number;
};

// Standard dice dot positions (relative to die center, normalized to -1..1 range)
const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [
    [-0.5, -0.5],
    [0.5, 0.5],
  ],
  3: [
    [-0.5, -0.5],
    [0, 0],
    [0.5, 0.5],
  ],
  4: [
    [-0.5, -0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [0.5, 0.5],
  ],
  5: [
    [-0.5, -0.5],
    [0.5, -0.5],
    [0, 0],
    [-0.5, 0.5],
    [0.5, 0.5],
  ],
  6: [
    [-0.5, -0.5],
    [0.5, -0.5],
    [-0.5, 0],
    [0.5, 0],
    [-0.5, 0.5],
    [0.5, 0.5],
  ],
};

export function DiceVisual({ values, size = 56 }: DiceVisualProps) {
  const gap = 10;
  const padding = 6;
  const dieSize = size;
  const dotRadius = dieSize * 0.08;
  const cornerRadius = dieSize * 0.14;

  const totalWidth = padding * 2 + values.length * dieSize + (values.length - 1) * gap;
  const totalHeight = padding * 2 + dieSize;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      style={{ width: '100%', maxWidth: totalWidth }}
      role="img"
      aria-label={`Würfel: ${values.join(', ')}`}
    >
      <defs>
        <filter id="dice-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#00000020" />
        </filter>
      </defs>

      {values.map((value, i) => {
        const safeValue = Math.max(1, Math.min(6, value));
        const dieX = padding + i * (dieSize + gap);
        const dieY = padding;
        const dieCx = dieX + dieSize / 2;
        const dieCy = dieY + dieSize / 2;
        const dotArea = dieSize * 0.32;

        const dots = DOT_POSITIONS[safeValue] ?? [];

        return (
          <g key={i}>
            {/* Die background */}
            <rect
              x={dieX}
              y={dieY}
              width={dieSize}
              height={dieSize}
              rx={cornerRadius}
              fill="#ffffff"
              stroke="#d1d5db"
              strokeWidth={1.5}
              filter="url(#dice-shadow)"
            />

            {/* Inner border for depth */}
            <rect
              x={dieX + 2}
              y={dieY + 2}
              width={dieSize - 4}
              height={dieSize - 4}
              rx={cornerRadius - 1}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={1}
            />

            {/* Dots */}
            {dots.map(([dx, dy], di) => (
              <circle
                key={`d-${i}-${di}`}
                cx={dieCx + dx * dotArea}
                cy={dieCy + dy * dotArea}
                r={dotRadius}
                fill="#1f2937"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
