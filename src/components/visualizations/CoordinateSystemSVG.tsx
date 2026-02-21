'use client';

type Point = { x: number; y: number; label?: string };
type Line = { from: Point; to: Point; color?: string };

type CoordinateSystemSVGProps = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  points?: Point[];
  lines?: Line[];
  showGrid?: boolean;
};

export function CoordinateSystemSVG({
  xMin = -5,
  xMax = 5,
  yMin = -5,
  yMax = 5,
  points = [],
  lines = [],
  showGrid = true,
}: CoordinateSystemSVGProps) {
  const width = 400;
  const height = 400;
  const pad = 40;

  const plotW = width - 2 * pad;
  const plotH = height - 2 * pad;

  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  // Convert data coordinates to SVG coordinates
  const toSvgX = (val: number) => pad + ((val - xMin) / xRange) * plotW;
  const toSvgY = (val: number) => pad + ((yMax - val) / yRange) * plotH;

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  const arrowSize = 8;

  // Generate grid lines
  const gridLines: { x1: number; y1: number; x2: number; y2: number; isAxis: boolean }[] = [];

  if (showGrid) {
    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      gridLines.push({
        x1: toSvgX(x),
        y1: pad,
        x2: toSvgX(x),
        y2: height - pad,
        isAxis: x === 0,
      });
    }
    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      gridLines.push({
        x1: pad,
        y1: toSvgY(y),
        x2: width - pad,
        y2: toSvgY(y),
        isAxis: y === 0,
      });
    }
  }

  // Tick values for labels
  const xTicks: number[] = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x !== 0) xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    if (y !== 0) yTicks.push(y);
  }

  const pointsDescription = points
    .map((p) => `${p.label ?? 'Punkt'} bei (${p.x}|${p.y})`)
    .join(', ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={`Koordinatensystem von x=${xMin} bis x=${xMax}, y=${yMin} bis y=${yMax}${points.length > 0 ? `. Punkte: ${pointsDescription}` : ''}`}
    >
      <defs>
        <marker
          id="coordArrow"
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize - 1}
          refY={arrowSize / 2}
          orient="auto"
        >
          <path
            d={`M0,0 L${arrowSize},${arrowSize / 2} L0,${arrowSize} Z`}
            fill="var(--color-primary, #3b82f6)"
          />
        </marker>
      </defs>

      {/* Grid lines */}
      {showGrid &&
        gridLines.map((line, i) =>
          line.isAxis ? null : (
            <line
              key={`grid-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          )
        )}

      {/* X-axis */}
      <line
        x1={pad - 5}
        y1={originY}
        x2={width - pad + 15}
        y2={originY}
        stroke="var(--color-primary, #3b82f6)"
        strokeWidth={2}
        markerEnd="url(#coordArrow)"
      />

      {/* Y-axis */}
      <line
        x1={originX}
        y1={height - pad + 5}
        x2={originX}
        y2={pad - 15}
        stroke="var(--color-primary, #3b82f6)"
        strokeWidth={2}
        markerEnd="url(#coordArrow)"
      />

      {/* Axis labels */}
      <text
        x={width - pad + 20}
        y={originY + 4}
        fontSize={13}
        fontWeight="bold"
        fill="var(--color-primary, #3b82f6)"
        fontFamily="sans-serif"
      >
        x
      </text>
      <text
        x={originX + 8}
        y={pad - 18}
        fontSize={13}
        fontWeight="bold"
        fill="var(--color-primary, #3b82f6)"
        fontFamily="sans-serif"
      >
        y
      </text>

      {/* Origin label */}
      <text
        x={originX - 12}
        y={originY + 16}
        fontSize={10}
        fill="#6b7280"
        fontFamily="sans-serif"
      >
        0
      </text>

      {/* X-axis tick marks and labels */}
      {xTicks.map((val) => {
        const x = toSvgX(val);
        return (
          <g key={`xtick-${val}`}>
            <line
              x1={x}
              y1={originY - 4}
              x2={x}
              y2={originY + 4}
              stroke="var(--color-primary, #3b82f6)"
              strokeWidth={1.5}
            />
            <text
              x={x}
              y={originY + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#6b7280"
              fontFamily="sans-serif"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Y-axis tick marks and labels */}
      {yTicks.map((val) => {
        const y = toSvgY(val);
        return (
          <g key={`ytick-${val}`}>
            <line
              x1={originX - 4}
              y1={y}
              x2={originX + 4}
              y2={y}
              stroke="var(--color-primary, #3b82f6)"
              strokeWidth={1.5}
            />
            <text
              x={originX - 12}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="#6b7280"
              fontFamily="sans-serif"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Lines between points */}
      {lines.map((line, i) => (
        <line
          key={`line-${i}`}
          x1={toSvgX(line.from.x)}
          y1={toSvgY(line.from.y)}
          x2={toSvgX(line.to.x)}
          y2={toSvgY(line.to.y)}
          stroke={line.color ?? 'var(--color-accent, #f59e0b)'}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}

      {/* Points */}
      {points.map((pt, i) => {
        const sx = toSvgX(pt.x);
        const sy = toSvgY(pt.y);
        return (
          <g key={`pt-${i}`}>
            <circle
              cx={sx}
              cy={sy}
              r={5}
              fill="var(--color-accent, #f59e0b)"
              stroke="#fff"
              strokeWidth={2}
            />
            {pt.label && (
              <text
                x={sx + 10}
                y={sy - 8}
                fontSize={12}
                fontWeight="bold"
                fill="#1f2937"
                fontFamily="sans-serif"
              >
                {pt.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
