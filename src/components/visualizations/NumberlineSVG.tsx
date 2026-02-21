'use client';

type NumberlineSVGProps = {
  min: number;
  max: number;
  step?: number;
  highlights?: number[];
  labels?: boolean;
};

export function NumberlineSVG({
  min,
  max,
  step,
  highlights = [],
  labels = true,
}: NumberlineSVGProps) {
  // Auto-calculate step if not provided
  const range = max - min;
  const autoStep = step ?? (range <= 20 ? 1 : range <= 100 ? 10 : 100);

  // SVG dimensions
  const width = 500;
  const height = 80;
  const padX = 30;
  const lineY = 40;
  const lineStartX = padX;
  const lineEndX = width - padX;
  const lineLength = lineEndX - lineStartX;

  // Convert a value to x-coordinate
  const valToX = (val: number) =>
    lineStartX + ((val - min) / range) * lineLength;

  // Determine major/minor ticks
  // Major ticks get labels, minor ticks are smaller
  const majorInterval = autoStep * (range <= 20 ? 5 : 1);
  const ticks: { val: number; isMajor: boolean }[] = [];
  for (let v = min; v <= max; v += autoStep) {
    // Avoid floating point issues
    const rounded = Math.round(v * 1000) / 1000;
    const isMajor =
      rounded === min ||
      rounded === max ||
      Math.abs(rounded % majorInterval) < 0.001;
    ticks.push({ val: rounded, isMajor });
  }

  const majorTickH = 12;
  const minorTickH = 6;
  const arrowSize = 8;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={`Zahlenstrahl von ${min} bis ${max}${highlights.length > 0 ? `, markierte Zahlen: ${highlights.join(', ')}` : ''}`}
    >
      {/* Arrow definition */}
      <defs>
        <marker
          id="arrowRight"
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize}
          refY={arrowSize / 2}
          orient="auto"
        >
          <path
            d={`M0,0 L${arrowSize},${arrowSize / 2} L0,${arrowSize} Z`}
            fill="var(--color-primary, #3b82f6)"
          />
        </marker>
        <marker
          id="arrowLeft"
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={0}
          refY={arrowSize / 2}
          orient="auto"
        >
          <path
            d={`M${arrowSize},0 L0,${arrowSize / 2} L${arrowSize},${arrowSize} Z`}
            fill="var(--color-primary, #3b82f6)"
          />
        </marker>
      </defs>

      {/* Main line with arrows */}
      <line
        x1={lineStartX - 10}
        y1={lineY}
        x2={lineEndX + 10}
        y2={lineY}
        stroke="var(--color-primary, #3b82f6)"
        strokeWidth={2}
        markerStart="url(#arrowLeft)"
        markerEnd="url(#arrowRight)"
      />

      {/* Tick marks */}
      {ticks.map(({ val, isMajor }) => {
        const x = valToX(val);
        const tickH = isMajor ? majorTickH : minorTickH;
        return (
          <g key={`tick-${val}`}>
            <line
              x1={x}
              y1={lineY - tickH / 2}
              x2={x}
              y2={lineY + tickH / 2}
              stroke="var(--color-primary, #3b82f6)"
              strokeWidth={isMajor ? 2 : 1}
            />
            {/* Labels only on major ticks */}
            {labels && isMajor && (
              <text
                x={x}
                y={lineY + tickH / 2 + 14}
                textAnchor="middle"
                fontSize={11}
                fill="#374151"
                fontFamily="sans-serif"
              >
                {val}
              </text>
            )}
          </g>
        );
      })}

      {/* Highlighted points */}
      {highlights.map((val) => {
        const x = valToX(val);
        return (
          <g key={`hl-${val}`}>
            <circle
              cx={x}
              cy={lineY}
              r={6}
              fill="var(--color-accent, #f59e0b)"
              stroke="#fff"
              strokeWidth={2}
            />
            <text
              x={x}
              y={lineY - 14}
              textAnchor="middle"
              fontSize={12}
              fontWeight="bold"
              fill="var(--color-accent, #f59e0b)"
              fontFamily="sans-serif"
            >
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
