'use client';

type SetData = {
  label: string;
  elements: (string | number)[];
};

type SetDiagramSVGProps = {
  sets: [SetData, SetData];
  intersection?: (string | number)[];
};

export function SetDiagramSVG({ sets, intersection = [] }: SetDiagramSVGProps) {
  const width = 440;
  const height = 300;

  // Circle geometry
  const r = 110;
  const overlap = 50; // how much circles overlap
  const cx1 = width / 2 - overlap;
  const cx2 = width / 2 + overlap;
  const cy = height / 2 + 10;

  // Determine elements for each region
  const intersectionSet = new Set(intersection.map(String));

  const leftOnly = sets[0].elements.filter(
    (el) => !intersectionSet.has(String(el))
  );
  const rightOnly = sets[1].elements.filter(
    (el) => !intersectionSet.has(String(el))
  );

  // Layout elements within regions
  const layoutElements = (
    elements: (string | number)[],
    centerX: number,
    centerY: number,
    maxWidth: number
  ) => {
    if (elements.length === 0) return [];

    const fontSize = elements.length > 6 ? 10 : 12;
    const lineHeight = fontSize + 4;
    const totalHeight = elements.length * lineHeight;
    const startY = centerY - totalHeight / 2 + lineHeight / 2;

    return elements.map((el, i) => ({
      text: String(el),
      x: centerX,
      y: startY + i * lineHeight,
      fontSize,
      maxWidth,
    }));
  };

  // Position elements in left-only region (shifted left from center of left circle)
  const leftElements = layoutElements(leftOnly, cx1 - 35, cy, r - 20);
  // Position elements in right-only region (shifted right from center of right circle)
  const rightElements = layoutElements(rightOnly, cx2 + 35, cy, r - 20);
  // Position elements in intersection (center between both circles)
  const intersectionElements = layoutElements(
    intersection,
    (cx1 + cx2) / 2,
    cy,
    overlap * 2 - 20
  );

  const ariaDescription = `Mengendiagramm: Menge ${sets[0].label} mit Elementen {${sets[0].elements.join(', ')}} und Menge ${sets[1].label} mit Elementen {${sets[1].elements.join(', ')}}${intersection.length > 0 ? `. Schnittmenge: {${intersection.join(', ')}}` : ''}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={ariaDescription}
    >
      {/* Left circle */}
      <circle
        cx={cx1}
        cy={cy}
        r={r}
        fill="var(--color-primary, #3b82f6)"
        fillOpacity={0.15}
        stroke="var(--color-primary, #3b82f6)"
        strokeWidth={2.5}
      />

      {/* Right circle */}
      <circle
        cx={cx2}
        cy={cy}
        r={r}
        fill="var(--color-accent, #f59e0b)"
        fillOpacity={0.15}
        stroke="var(--color-accent, #f59e0b)"
        strokeWidth={2.5}
      />

      {/* Intersection highlight — drawn as overlapping region using clip path */}
      {intersection.length > 0 && (
        <>
          <defs>
            <clipPath id="clipLeft">
              <circle cx={cx1} cy={cy} r={r} />
            </clipPath>
          </defs>
          <circle
            cx={cx2}
            cy={cy}
            r={r}
            fill="var(--color-primary, #3b82f6)"
            fillOpacity={0.12}
            clipPath="url(#clipLeft)"
            stroke="none"
          />
        </>
      )}

      {/* Set labels (above circles) */}
      <text
        x={cx1 - 30}
        y={cy - r - 10}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill="var(--color-primary, #3b82f6)"
        fontFamily="sans-serif"
      >
        {sets[0].label}
      </text>
      <text
        x={cx2 + 30}
        y={cy - r - 10}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill="var(--color-accent, #f59e0b)"
        fontFamily="sans-serif"
      >
        {sets[1].label}
      </text>

      {/* Left-only elements */}
      {leftElements.map((el, i) => (
        <text
          key={`left-${i}`}
          x={el.x}
          y={el.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={el.fontSize}
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          {el.text}
        </text>
      ))}

      {/* Right-only elements */}
      {rightElements.map((el, i) => (
        <text
          key={`right-${i}`}
          x={el.x}
          y={el.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={el.fontSize}
          fill="#1f2937"
          fontFamily="sans-serif"
        >
          {el.text}
        </text>
      ))}

      {/* Intersection elements */}
      {intersectionElements.map((el, i) => (
        <text
          key={`inter-${i}`}
          x={el.x}
          y={el.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={el.fontSize}
          fontWeight="600"
          fill="#4b5563"
          fontFamily="sans-serif"
        >
          {el.text}
        </text>
      ))}
    </svg>
  );
}
