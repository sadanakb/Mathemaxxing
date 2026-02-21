'use client';

type GeometricShapeProps = {
  shape: 'triangle' | 'rectangle' | 'circle' | 'square' | 'pentagon' | 'hexagon';
  labels?: { sides?: string[]; angles?: string[] };
  width?: number;
  height?: number;
  highlighted?: boolean;
  color?: string;
};

function regularPolygonPoints(
  cx: number,
  cy: number,
  r: number,
  sides: number,
  rotationOffset = -Math.PI / 2
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = rotationOffset + (2 * Math.PI * i) / sides;
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return pts;
}

function midpoint(a: [number, number], b: [number, number]): [number, number] {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function offsetFromCenter(
  point: [number, number],
  center: [number, number],
  dist: number
): [number, number] {
  const dx = point[0] - center[0];
  const dy = point[1] - center[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return [point[0] + (dx / len) * dist, point[1] + (dy / len) * dist];
}

export function GeometricShape({
  shape,
  labels,
  width = 200,
  height = 200,
  highlighted = false,
  color,
}: GeometricShapeProps) {
  const fillColor = color ?? 'var(--color-primary)';
  const fillOpacity = highlighted ? 0.35 : 0.15;
  const strokeColor = color ?? 'var(--color-primary)';
  const pad = 30;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - pad;

  const vertexLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  const renderPolygon = (sides: number) => {
    const pts = regularPolygonPoints(cx, cy, r, sides);
    const pointsStr = pts.map((p) => p.join(',')).join(' ');

    return (
      <>
        <polygon
          points={pointsStr}
          fill={fillColor}
          fillOpacity={fillOpacity}
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {/* Vertex labels */}
        {pts.map((pt, i) => {
          const label = vertexLabels[i] ?? '';
          const offset = offsetFromCenter(pt, [cx, cy], 14);
          return (
            <text
              key={`v-${i}`}
              x={offset[0]}
              y={offset[1]}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight="bold"
              fill="#1f2937"
            >
              {label}
            </text>
          );
        })}
        {/* Side labels */}
        {labels?.sides &&
          pts.map((pt, i) => {
            const next = pts[(i + 1) % sides];
            const mid = midpoint(pt, next);
            const offset = offsetFromCenter(mid, [cx, cy], 16);
            const sideLabel = labels.sides?.[i];
            if (!sideLabel) return null;
            return (
              <text
                key={`s-${i}`}
                x={offset[0]}
                y={offset[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11}
                fill="#374151"
              >
                {sideLabel}
              </text>
            );
          })}
        {/* Angle labels */}
        {labels?.angles &&
          pts.map((pt, i) => {
            const inward: [number, number] = [
              pt[0] + (cx - pt[0]) * 0.25,
              pt[1] + (cy - pt[1]) * 0.25,
            ];
            const angleLabel = labels.angles?.[i];
            if (!angleLabel) return null;
            return (
              <text
                key={`a-${i}`}
                x={inward[0]}
                y={inward[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fill="var(--color-secondary)"
                fontWeight="600"
              >
                {angleLabel}
              </text>
            );
          })}
      </>
    );
  };

  const renderCircle = () => (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fillColor}
        fillOpacity={fillOpacity}
        stroke={strokeColor}
        strokeWidth={2.5}
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill={strokeColor} />
      {/* Radius line */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r}
        y2={cy}
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeDasharray="4,3"
      />
      {/* Radius label */}
      <text
        x={cx + r / 2}
        y={cy - 8}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
      >
        {labels?.sides?.[0] ?? 'r'}
      </text>
      {/* Center label */}
      <text
        x={cx - 10}
        y={cy - 8}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
        fill="#1f2937"
      >
        M
      </text>
    </>
  );

  const renderRectangle = (isSquare: boolean) => {
    const w = isSquare ? r * 1.4 : r * 1.8;
    const h = isSquare ? r * 1.4 : r * 1.1;
    const x = cx - w / 2;
    const y = cy - h / 2;
    const corners: [number, number][] = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ];

    return (
      <>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={fillColor}
          fillOpacity={fillOpacity}
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {/* Right angle markers */}
        {corners.map((corner, i) => {
          const sz = 8;
          const dx = i === 1 || i === 2 ? -sz : sz;
          const dy = i === 2 || i === 3 ? -sz : sz;
          return (
            <path
              key={`ra-${i}`}
              d={`M${corner[0] + dx},${corner[1]} L${corner[0] + dx},${corner[1] + dy} L${corner[0]},${corner[1] + dy}`}
              fill="none"
              stroke="#9ca3af"
              strokeWidth={1}
            />
          );
        })}
        {/* Vertex labels */}
        {corners.map((pt, i) => {
          const label = vertexLabels[i];
          const ox = i === 0 || i === 3 ? -12 : 12;
          const oy = i < 2 ? -10 : 12;
          return (
            <text
              key={`v-${i}`}
              x={pt[0] + ox}
              y={pt[1] + oy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight="bold"
              fill="#1f2937"
            >
              {label}
            </text>
          );
        })}
        {/* Width label (bottom) */}
        <text
          x={cx}
          y={y + h + 20}
          textAnchor="middle"
          fontSize={11}
          fill="#374151"
        >
          {labels?.sides?.[0] ?? (isSquare ? 'a' : 'b')}
        </text>
        {/* Height label (right) */}
        <text
          x={x + w + 18}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fill="#374151"
        >
          {labels?.sides?.[1] ?? 'a'}
        </text>
      </>
    );
  };

  const shapeName: Record<string, string> = {
    triangle: 'Dreieck',
    rectangle: 'Rechteck',
    circle: 'Kreis',
    square: 'Quadrat',
    pentagon: 'Fünfeck',
    hexagon: 'Sechseck',
  };

  let content: React.ReactNode;
  switch (shape) {
    case 'triangle':
      content = renderPolygon(3);
      break;
    case 'square':
      content = renderRectangle(true);
      break;
    case 'rectangle':
      content = renderRectangle(false);
      break;
    case 'circle':
      content = renderCircle();
      break;
    case 'pentagon':
      content = renderPolygon(5);
      break;
    case 'hexagon':
      content = renderPolygon(6);
      break;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={`Geometrische Form: ${shapeName[shape] ?? shape}`}
    >
      {content}
    </svg>
  );
}
