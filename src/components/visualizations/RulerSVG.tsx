'use client';

type RulerSVGProps = {
  length: number;
  unit?: 'cm' | 'mm';
  pointer?: number;
  showNumbers?: boolean;
};

export function RulerSVG({
  length,
  unit = 'cm',
  pointer,
  showNumbers = true,
}: RulerSVGProps) {
  const pxPerCm = 40;
  const pxPerMm = pxPerCm / 10;

  // Total length in mm
  const totalMm = unit === 'cm' ? length * 10 : length;
  const totalCm = unit === 'cm' ? length : length / 10;
  const totalPx = totalMm * pxPerMm;

  const padding = 24;
  const rulerHeight = 36;
  const tickAreaTop = 8;

  const cmTickHeight = 22;
  const halfCmTickHeight = 14;
  const mmTickHeight = 8;

  const pointerHeight = 18;
  const viewW = totalPx + padding * 2;
  const viewH = rulerHeight + tickAreaTop + (pointer !== undefined ? pointerHeight + 8 : 0) + (showNumbers ? 18 : 0) + 8;

  const rulerY = tickAreaTop + (pointer !== undefined ? pointerHeight + 4 : 0);

  // Convert pointer position to px
  const pointerMm = pointer !== undefined ? (unit === 'cm' ? pointer * 10 : pointer) : undefined;
  const pointerPx = pointerMm !== undefined ? padding + pointerMm * pxPerMm : undefined;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: '100%', maxWidth: viewW }}
      role="img"
      aria-label={`Lineal: ${totalCm} cm${pointer !== undefined ? `, Zeiger bei ${pointer} ${unit}` : ''}`}
    >
      {/* Ruler body */}
      <rect
        x={padding}
        y={rulerY}
        width={totalPx}
        height={rulerHeight}
        rx={3}
        fill="#fef9c3"
        stroke="#ca8a04"
        strokeWidth={1.5}
      />

      {/* Tick marks */}
      {Array.from({ length: totalMm + 1 }, (_, mm) => {
        const x = padding + mm * pxPerMm;
        const isCm = mm % 10 === 0;
        const isHalfCm = mm % 5 === 0 && !isCm;

        let tickH: number;
        let strokeW: number;
        let color: string;

        if (isCm) {
          tickH = cmTickHeight;
          strokeW = 1.5;
          color = '#78350f';
        } else if (isHalfCm) {
          tickH = halfCmTickHeight;
          strokeW = 1;
          color = '#92400e';
        } else {
          tickH = mmTickHeight;
          strokeW = 0.7;
          color = '#a16207';
        }

        return (
          <line
            key={mm}
            x1={x}
            y1={rulerY}
            x2={x}
            y2={rulerY + tickH}
            stroke={color}
            strokeWidth={strokeW}
          />
        );
      })}

      {/* Numbers under cm marks */}
      {showNumbers &&
        Array.from({ length: Math.floor(totalCm) + 1 }, (_, cm) => {
          const x = padding + cm * pxPerCm;
          return (
            <text
              key={`num-${cm}`}
              x={x}
              y={rulerY + rulerHeight + 14}
              textAnchor="middle"
              fontSize={10}
              fontWeight={cm === 0 ? 'normal' : 'bold'}
              fill="#78350f"
            >
              {cm}
            </text>
          );
        })}

      {/* Unit label */}
      <text
        x={padding + totalPx + 4}
        y={rulerY + rulerHeight + 14}
        fontSize={9}
        fill="#a16207"
      >
        {unit}
      </text>

      {/* Pointer arrow */}
      {pointerPx !== undefined && (
        <g>
          <polygon
            points={`${pointerPx - 6},${rulerY - 4} ${pointerPx + 6},${rulerY - 4} ${pointerPx},${rulerY + 2}`}
            fill="var(--color-accent)"
            stroke="var(--color-accent)"
            strokeWidth={1}
          />
          <line
            x1={pointerPx}
            y1={rulerY - pointerHeight}
            x2={pointerPx}
            y2={rulerY - 4}
            stroke="var(--color-accent)"
            strokeWidth={2}
          />
          <text
            x={pointerPx}
            y={rulerY - pointerHeight - 4}
            textAnchor="middle"
            fontSize={10}
            fontWeight="bold"
            fill="var(--color-accent)"
          >
            {pointer} {unit}
          </text>
        </g>
      )}
    </svg>
  );
}
