'use client';

type Base10BlocksProps = {
  hundreds?: number;
  tens?: number;
  ones?: number;
};

export function Base10Blocks({
  hundreds = 0,
  tens = 0,
  ones = 0,
}: Base10BlocksProps) {
  const unitSize = 8;
  const gap = 3;
  const sectionGap = 16;
  const padding = 12;

  // Hundred plate = 10x10 grid
  const hundredW = unitSize * 10 + gap * 9;
  const hundredH = hundredW;

  // Ten rod = 1x10 vertical bar
  const tenW = unitSize;
  const tenH = unitSize * 10 + gap * 9;

  // One cube = 1x1 unit
  const oneW = unitSize;
  const oneH = unitSize;

  // Calculate total width
  const hundredsBlockWidth = hundreds > 0 ? hundreds * (hundredW + sectionGap) : 0;
  const tensBlockWidth = tens > 0 ? tens * (tenW + gap) + sectionGap : 0;
  const onesPerRow = 5;
  const oneRows = ones > 0 ? Math.ceil(ones / onesPerRow) : 0;
  const onesBlockWidth = ones > 0 ? Math.min(ones, onesPerRow) * (oneW + gap) : 0;

  const totalWidth = padding * 2 + hundredsBlockWidth + tensBlockWidth + onesBlockWidth;
  const totalHeight = padding * 2 + Math.max(hundredH, tenH, oneRows * (oneH + gap));

  let offsetX = padding;

  const renderHundredPlate = (index: number) => {
    const startX = offsetX;
    const elements: React.ReactNode[] = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        elements.push(
          <rect
            key={`h-${index}-${row}-${col}`}
            x={startX + col * (unitSize + gap)}
            y={padding + row * (unitSize + gap)}
            width={unitSize}
            height={unitSize}
            rx={1}
            fill="var(--color-primary)"
            fillOpacity={0.75}
            stroke="var(--color-primary)"
            strokeWidth={0.5}
          />
        );
      }
    }

    // Border around the plate
    elements.push(
      <rect
        key={`h-border-${index}`}
        x={startX - 1}
        y={padding - 1}
        width={hundredW + 2}
        height={hundredH + 2}
        rx={2}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
    );

    return elements;
  };

  const renderTenRod = (index: number, x: number) => {
    const elements: React.ReactNode[] = [];

    for (let row = 0; row < 10; row++) {
      elements.push(
        <rect
          key={`t-${index}-${row}`}
          x={x}
          y={padding + row * (unitSize + gap)}
          width={unitSize}
          height={unitSize}
          rx={1}
          fill="var(--color-secondary)"
          fillOpacity={0.8}
          stroke="var(--color-secondary)"
          strokeWidth={0.5}
        />
      );
    }

    // Border around the rod
    elements.push(
      <rect
        key={`t-border-${index}`}
        x={x - 1}
        y={padding - 1}
        width={tenW + 2}
        height={tenH + 2}
        rx={2}
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth={1}
        strokeOpacity={0.6}
      />
    );

    return elements;
  };

  const renderOneCube = (index: number, x: number, y: number) => (
    <rect
      key={`o-${index}`}
      x={x}
      y={y}
      width={unitSize}
      height={unitSize}
      rx={1}
      fill="var(--color-accent)"
      fillOpacity={0.85}
      stroke="var(--color-accent)"
      strokeWidth={0.5}
    />
  );

  const allElements: React.ReactNode[] = [];

  // Render hundreds
  for (let i = 0; i < hundreds; i++) {
    allElements.push(...renderHundredPlate(i));
    offsetX += hundredW + sectionGap;
  }

  // Render tens
  if (tens > 0 && hundreds > 0) {
    offsetX += sectionGap / 2;
  }
  for (let i = 0; i < tens; i++) {
    allElements.push(...renderTenRod(i, offsetX));
    offsetX += tenW + gap + 2;
  }

  // Render ones
  if (ones > 0 && (tens > 0 || hundreds > 0)) {
    offsetX += sectionGap;
  }
  for (let i = 0; i < ones; i++) {
    const col = i % onesPerRow;
    const row = Math.floor(i / onesPerRow);
    allElements.push(
      renderOneCube(
        i,
        offsetX + col * (oneW + gap),
        padding + row * (oneH + gap)
      )
    );
  }

  const displayValue = hundreds * 100 + tens * 10 + ones;

  return (
    <svg
      viewBox={`0 0 ${Math.max(totalWidth, 60)} ${Math.max(totalHeight, 40)}`}
      style={{ width: '100%', maxWidth: Math.max(totalWidth, 60) }}
      role="img"
      aria-label={`Zehnersystem-Blöcke: ${hundreds} Hunderter, ${tens} Zehner, ${ones} Einer = ${displayValue}`}
    >
      {allElements}
    </svg>
  );
}
