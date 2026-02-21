'use client';

type FractionBarProps = {
  total: number;
  filled: number;
  width?: number;
  showLabel?: boolean;
  color?: string;
};

export function FractionBar({
  total,
  filled,
  width = 280,
  showLabel = false,
  color,
}: FractionBarProps) {
  const safeTotal = Math.max(1, total);
  const safeFilled = Math.max(0, Math.min(filled, safeTotal));
  const barHeight = 40;
  const padding = 8;
  const labelHeight = showLabel ? 28 : 0;
  const viewW = width;
  const viewH = barHeight + padding * 2 + labelHeight;
  const barWidth = viewW - padding * 2;
  const segWidth = barWidth / safeTotal;
  const fillColor = color ?? 'var(--color-primary)';

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: '100%', maxWidth: viewW }}
      role="img"
      aria-label={`Bruchbalken: ${safeFilled} von ${safeTotal} Teilen gefüllt`}
    >
      {/* Background bar */}
      <rect
        x={padding}
        y={padding}
        width={barWidth}
        height={barHeight}
        rx={4}
        fill="#f3f4f6"
        stroke="#d1d5db"
        strokeWidth={1.5}
      />

      {/* Filled segments */}
      {Array.from({ length: safeTotal }, (_, i) => {
        const isFilled = i < safeFilled;
        const x = padding + i * segWidth;
        const isFirst = i === 0;
        const isLast = i === safeTotal - 1;

        return (
          <rect
            key={i}
            x={x + 0.5}
            y={padding + 0.5}
            width={segWidth - 1}
            height={barHeight - 1}
            rx={isFirst || isLast ? 3 : 0}
            fill={isFilled ? fillColor : 'transparent'}
            fillOpacity={isFilled ? 0.7 : 0}
          />
        );
      })}

      {/* Divider lines */}
      {safeTotal > 1 &&
        Array.from({ length: safeTotal - 1 }, (_, i) => {
          const x = padding + (i + 1) * segWidth;
          return (
            <line
              key={`div-${i}`}
              x1={x}
              y1={padding}
              x2={x}
              y2={padding + barHeight}
              stroke="#9ca3af"
              strokeWidth={1}
            />
          );
        })}

      {/* Outer border */}
      <rect
        x={padding}
        y={padding}
        width={barWidth}
        height={barHeight}
        rx={4}
        fill="none"
        stroke="#6b7280"
        strokeWidth={2}
      />

      {/* Label */}
      {showLabel && (
        <text
          x={viewW / 2}
          y={padding + barHeight + 22}
          textAnchor="middle"
          fontSize={15}
          fontWeight="bold"
          fill="#1f2937"
        >
          {safeFilled}/{safeTotal}
        </text>
      )}
    </svg>
  );
}
