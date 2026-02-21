'use client';

type TallyChartProps = {
  items: { label: string; count: number }[];
};

export function TallyChart({ items }: TallyChartProps) {
  if (items.length === 0) {
    return (
      <svg
        viewBox="0 0 300 40"
        style={{ width: '100%', maxWidth: 300 }}
        role="img"
        aria-label="Leere Strichliste"
      >
        <text x={150} y={24} textAnchor="middle" fontSize={12} fill="#9ca3af">
          Keine Daten
        </text>
      </svg>
    );
  }

  const labelColWidth = 80;
  const countColWidth = 40;
  const tallyAreaStart = labelColWidth + 8;
  const rowHeight = 32;
  const padding = 8;
  const stickWidth = 3;
  const stickHeight = 18;
  const stickGap = 5;
  const groupGap = 10;

  // Calculate width needed for tallies
  const maxCount = Math.max(...items.map((i) => i.count), 0);
  const maxGroups = Math.ceil(maxCount / 5);
  const tallyWidth = maxGroups * (stickWidth * 5 + stickGap * 4 + groupGap) + 20;
  const totalWidth = tallyAreaStart + tallyWidth + countColWidth + padding;
  const totalHeight = padding + items.length * rowHeight + padding;

  const renderTallyMarks = (count: number, x: number, y: number) => {
    const marks: React.ReactNode[] = [];
    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;

    let currentX = x;
    const markCy = y + rowHeight / 2;

    for (let g = 0; g < fullGroups; g++) {
      // Draw 4 vertical sticks
      for (let s = 0; s < 4; s++) {
        marks.push(
          <line
            key={`g${g}-s${s}`}
            x1={currentX + s * (stickWidth + stickGap)}
            y1={markCy - stickHeight / 2}
            x2={currentX + s * (stickWidth + stickGap)}
            y2={markCy + stickHeight / 2}
            stroke="var(--color-primary)"
            strokeWidth={stickWidth}
            strokeLinecap="round"
          />
        );
      }

      // Diagonal slash through all 4
      const slashX1 = currentX - 2;
      const slashX2 = currentX + 3 * (stickWidth + stickGap) + stickWidth + 2;
      marks.push(
        <line
          key={`g${g}-slash`}
          x1={slashX1}
          y1={markCy + stickHeight / 2 - 2}
          x2={slashX2}
          y2={markCy - stickHeight / 2 + 2}
          stroke="var(--color-primary)"
          strokeWidth={stickWidth}
          strokeLinecap="round"
        />
      );

      currentX += 4 * (stickWidth + stickGap) + groupGap;
    }

    // Remaining individual sticks
    for (let s = 0; s < remainder; s++) {
      marks.push(
        <line
          key={`r-${s}`}
          x1={currentX + s * (stickWidth + stickGap)}
          y1={markCy - stickHeight / 2}
          x2={currentX + s * (stickWidth + stickGap)}
          y2={markCy + stickHeight / 2}
          stroke="var(--color-primary)"
          strokeWidth={stickWidth}
          strokeLinecap="round"
        />
      );
    }

    return marks;
  };

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      style={{ width: '100%', maxWidth: totalWidth }}
      role="img"
      aria-label={`Strichliste mit ${items.length} Einträgen`}
    >
      {/* Header row */}
      <line
        x1={padding}
        y1={padding}
        x2={totalWidth - padding}
        y2={padding}
        stroke="#d1d5db"
        strokeWidth={1}
      />

      {items.map((item, i) => {
        const y = padding + i * rowHeight;

        return (
          <g key={i}>
            {/* Row separator */}
            <line
              x1={padding}
              y1={y + rowHeight}
              x2={totalWidth - padding}
              y2={y + rowHeight}
              stroke="#e5e7eb"
              strokeWidth={0.8}
            />

            {/* Row background (alternating) */}
            {i % 2 === 0 && (
              <rect
                x={padding}
                y={y}
                width={totalWidth - padding * 2}
                height={rowHeight}
                fill="var(--color-primary)"
                fillOpacity={0.03}
              />
            )}

            {/* Label */}
            <text
              x={padding + 4}
              y={y + rowHeight / 2}
              dominantBaseline="central"
              fontSize={12}
              fontWeight="600"
              fill="#1f2937"
            >
              {item.label}
            </text>

            {/* Column separator */}
            <line
              x1={tallyAreaStart - 4}
              y1={y}
              x2={tallyAreaStart - 4}
              y2={y + rowHeight}
              stroke="#d1d5db"
              strokeWidth={0.8}
            />

            {/* Tally marks */}
            {renderTallyMarks(item.count, tallyAreaStart, y)}

            {/* Count column separator */}
            <line
              x1={totalWidth - countColWidth - padding}
              y1={y}
              x2={totalWidth - countColWidth - padding}
              y2={y + rowHeight}
              stroke="#d1d5db"
              strokeWidth={0.8}
            />

            {/* Numeric count */}
            <text
              x={totalWidth - padding - countColWidth / 2}
              y={y + rowHeight / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={13}
              fontWeight="bold"
              fill="#374151"
            >
              {item.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
