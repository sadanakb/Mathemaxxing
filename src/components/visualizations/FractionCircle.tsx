'use client';

type FractionCircleProps = {
  total: number;
  filled: number;
  size?: number;
  showLabel?: boolean;
  color?: string;
};

export function FractionCircle({
  total,
  filled,
  size = 160,
  showLabel = false,
  color,
}: FractionCircleProps) {
  const safeTotal = Math.max(1, total);
  const safeFilled = Math.max(0, Math.min(filled, safeTotal));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const labelHeight = showLabel ? 28 : 0;
  const viewH = size + labelHeight;

  const fillColor = color ?? 'var(--color-primary)';

  function describeArc(startAngle: number, endAngle: number): string {
    const start = {
      x: cx + r * Math.cos(startAngle),
      y: cy + r * Math.sin(startAngle),
    };
    const end = {
      x: cx + r * Math.cos(endAngle),
      y: cy + r * Math.sin(endAngle),
    };
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  }

  const sliceAngle = (2 * Math.PI) / safeTotal;
  const offset = -Math.PI / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${viewH}`}
      style={{ width: '100%', maxWidth: size }}
      role="img"
      aria-label={`Bruchkreis: ${safeFilled} von ${safeTotal} Teilen gefüllt`}
    >
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill="#f3f4f6" stroke="#d1d5db" strokeWidth={1.5} />

      {/* Filled segments */}
      {Array.from({ length: safeTotal }, (_, i) => {
        const startAngle = offset + i * sliceAngle;
        const endAngle = offset + (i + 1) * sliceAngle;
        const isFilled = i < safeFilled;

        if (safeTotal === 1 && isFilled) {
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={fillColor}
              fillOpacity={0.7}
            />
          );
        }

        return (
          <path
            key={i}
            d={describeArc(startAngle, endAngle)}
            fill={isFilled ? fillColor : 'transparent'}
            fillOpacity={isFilled ? 0.7 : 0}
            stroke="none"
          />
        );
      })}

      {/* Divider lines between segments */}
      {safeTotal > 1 &&
        Array.from({ length: safeTotal }, (_, i) => {
          const angle = offset + i * sliceAngle;
          return (
            <line
              key={`div-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + r * Math.cos(angle)}
              y2={cy + r * Math.sin(angle)}
              stroke="#9ca3af"
              strokeWidth={1.5}
            />
          );
        })}

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#6b7280" strokeWidth={2} />

      {/* Label */}
      {showLabel && (
        <text
          x={cx}
          y={size + 20}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#1f2937"
        >
          {safeFilled}/{safeTotal}
        </text>
      )}
    </svg>
  );
}
