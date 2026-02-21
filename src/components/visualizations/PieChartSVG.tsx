'use client';

type PieSegment = {
  label: string;
  value: number;
  color?: string;
};

type PieChartSVGProps = {
  segments: PieSegment[];
  size?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
};

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-accent)',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
];

export function PieChartSVG({
  segments,
  size = 240,
  showLabels = false,
  showPercentages = false,
}: PieChartSVGProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.32;
  const labelR = r + 28;

  const total = segments.reduce((s, seg) => s + seg.value, 0);

  if (total === 0 || segments.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', maxWidth: size }}
        role="img"
        aria-label="Leeres Kreisdiagramm"
      >
        <circle cx={cx} cy={cy} r={r} fill="#f3f4f6" stroke="#d1d5db" strokeWidth={2} />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={12} fill="#9ca3af">
          Keine Daten
        </text>
      </svg>
    );
  }

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  type ArcData = {
    startAngle: number;
    endAngle: number;
    color: string;
    label: string;
    value: number;
    percentage: number;
  };

  const arcs: ArcData[] = [];
  let currentAngle = -90; // Start from top

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const percentage = (seg.value / total) * 100;
    const sweepDeg = (seg.value / total) * 360;
    arcs.push({
      startAngle: currentAngle,
      endAngle: currentAngle + sweepDeg,
      color: seg.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      label: seg.label,
      value: seg.value,
      percentage,
    });
    currentAngle += sweepDeg;
  }

  function describeArc(startDeg: number, endDeg: number): string {
    // Handle full circle case
    if (endDeg - startDeg >= 359.99) {
      return [
        `M ${cx + r * Math.cos(toRad(startDeg))} ${cy + r * Math.sin(toRad(startDeg))}`,
        `A ${r} ${r} 0 1 1 ${cx + r * Math.cos(toRad(startDeg + 180))} ${cy + r * Math.sin(toRad(startDeg + 180))}`,
        `A ${r} ${r} 0 1 1 ${cx + r * Math.cos(toRad(startDeg))} ${cy + r * Math.sin(toRad(startDeg))}`,
        'Z',
      ].join(' ');
    }

    const startR = toRad(startDeg);
    const endR = toRad(endDeg);
    const start = { x: cx + r * Math.cos(startR), y: cy + r * Math.sin(startR) };
    const end = { x: cx + r * Math.cos(endR), y: cy + r * Math.sin(endR) };
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;

    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: '100%', maxWidth: size }}
      role="img"
      aria-label={`Kreisdiagramm mit ${segments.length} Segmenten`}
    >
      {/* Segments */}
      {arcs.map((arc, i) => (
        <path
          key={i}
          d={describeArc(arc.startAngle, arc.endAngle)}
          fill={arc.color}
          fillOpacity={0.8}
          stroke="white"
          strokeWidth={2}
        />
      ))}

      {/* Labels and percentages */}
      {(showLabels || showPercentages) &&
        arcs.map((arc, i) => {
          const midAngle = toRad((arc.startAngle + arc.endAngle) / 2);
          const lx = cx + labelR * Math.cos(midAngle);
          const ly = cy + labelR * Math.sin(midAngle);
          const innerX = cx + (r + 4) * Math.cos(midAngle);
          const innerY = cy + (r + 4) * Math.sin(midAngle);

          const textAnchor = lx > cx ? 'start' : 'end';
          const parts: string[] = [];
          if (showLabels) parts.push(arc.label);
          if (showPercentages) parts.push(`${Math.round(arc.percentage)}%`);
          const text = parts.join(' ');

          // Skip very small segments to avoid label clutter
          if (arc.percentage < 3) return null;

          return (
            <g key={`label-${i}`}>
              {/* Connector line */}
              <line
                x1={innerX}
                y1={innerY}
                x2={lx}
                y2={ly}
                stroke="#6b7280"
                strokeWidth={0.8}
              />
              {/* Dot at connection point */}
              <circle cx={innerX} cy={innerY} r={2} fill="#6b7280" />
              {/* Label text */}
              <text
                x={lx + (lx > cx ? 4 : -4)}
                y={ly}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fontSize={10}
                fill="#374151"
                fontWeight="500"
              >
                {text}
              </text>
            </g>
          );
        })}

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth={1} />
    </svg>
  );
}
