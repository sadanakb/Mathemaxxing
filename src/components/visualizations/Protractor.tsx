'use client';

type ProtractorProps = {
  angle?: number;
  showAngle?: boolean;
  size?: number;
};

export function Protractor({
  angle,
  showAngle = false,
  size = 260,
}: ProtractorProps) {
  const cx = size / 2;
  const baseY = size * 0.82;
  const r = size * 0.38;
  const padding = 20;
  const viewW = size;
  const viewH = size * 0.6;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Protractor is a half-circle. 0 degrees at right, 180 at left.
  // For display: 0 on the right baseline, going counterclockwise to 180 on the left baseline.
  const degToXY = (deg: number, radius: number): [number, number] => {
    const rad = toRad(180 - deg); // Flip so 0 is on the right
    return [cx + radius * Math.cos(rad), baseY - radius * Math.sin(rad)];
  };

  // Clamp angle
  const safeAngle = angle !== undefined ? Math.max(0, Math.min(180, angle)) : undefined;

  // Generate arc path for the highlighted angle
  const angleArcPath = () => {
    if (safeAngle === undefined) return '';
    const arcR = r * 0.3;
    const startX = cx + arcR;
    const startY = baseY;
    const [endX, endY] = degToXY(safeAngle, arcR);
    const largeArc = safeAngle > 180 ? 1 : 0;
    return `M ${startX} ${startY} A ${arcR} ${arcR} 0 ${largeArc} 1 ${endX} ${endY}`;
  };

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: '100%', maxWidth: viewW }}
      role="img"
      aria-label={`Winkelmesser${safeAngle !== undefined ? `: ${safeAngle}°` : ''}`}
    >
      {/* Protractor body - half circle */}
      <path
        d={`M ${cx - r} ${baseY} A ${r} ${r} 0 0 1 ${cx + r} ${baseY} Z`}
        fill="#fefce8"
        fillOpacity={0.8}
        stroke="#ca8a04"
        strokeWidth={1.5}
      />

      {/* Inner half circle */}
      <path
        d={`M ${cx - r + 6} ${baseY} A ${r - 6} ${r - 6} 0 0 1 ${cx + r - 6} ${baseY} Z`}
        fill="none"
        stroke="#d4a706"
        strokeWidth={0.5}
        strokeOpacity={0.4}
      />

      {/* Degree tick marks */}
      {Array.from({ length: 181 }, (_, deg) => {
        const isMajor = deg % 10 === 0;
        const isMedium = deg % 5 === 0 && !isMajor;

        let tickLen: number;
        let strokeW: number;
        let color: string;

        if (isMajor) {
          tickLen = 14;
          strokeW = 1.2;
          color = '#78350f';
        } else if (isMedium) {
          tickLen = 8;
          strokeW = 0.8;
          color = '#92400e';
        } else {
          tickLen = 4;
          strokeW = 0.4;
          color = '#a16207';
        }

        const [outerX, outerY] = degToXY(deg, r - 2);
        const [innerX, innerY] = degToXY(deg, r - 2 - tickLen);

        return (
          <line
            key={deg}
            x1={outerX}
            y1={outerY}
            x2={innerX}
            y2={innerY}
            stroke={color}
            strokeWidth={strokeW}
          />
        );
      })}

      {/* Degree numbers */}
      {Array.from({ length: 19 }, (_, i) => {
        const deg = i * 10;
        const [x, y] = degToXY(deg, r - 22);

        return (
          <text
            key={`num-${deg}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={8}
            fontWeight="bold"
            fill="#78350f"
          >
            {deg}
          </text>
        );
      })}

      {/* Baseline */}
      <line
        x1={cx - r - 8}
        y1={baseY}
        x2={cx + r + 8}
        y2={baseY}
        stroke="#374151"
        strokeWidth={1}
      />

      {/* Center point */}
      <circle cx={cx} cy={baseY} r={3} fill="#374151" />

      {/* Highlighted angle */}
      {safeAngle !== undefined && (
        <>
          {/* Angle arc */}
          <path
            d={angleArcPath()}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Angle ray line */}
          {(() => {
            const [endX, endY] = degToXY(safeAngle, r - 4);
            return (
              <line
                x1={cx}
                y1={baseY}
                x2={endX}
                y2={endY}
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />
            );
          })()}

          {/* Base ray line */}
          <line
            x1={cx}
            y1={baseY}
            x2={cx + r - 4}
            y2={baseY}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />

          {/* Angle label */}
          {showAngle && (() => {
            const labelR = r * 0.3 + 14;
            const [lx, ly] = degToXY(safeAngle / 2, labelR);
            return (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
                fill="var(--color-accent)"
              >
                {safeAngle}°
              </text>
            );
          })()}
        </>
      )}
    </svg>
  );
}
