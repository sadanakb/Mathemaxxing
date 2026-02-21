'use client';

type CoinsSVGProps = {
  coins: { value: number; count: number }[];
};

type CoinStyle = {
  type: 'coin' | 'bill';
  fill: string;
  stroke: string;
  textColor: string;
  label: string;
};

function getCoinStyle(value: number): CoinStyle {
  // Bills: 5, 10, 20 (euro)
  if (value >= 500) {
    return {
      type: 'bill',
      fill: '#22c55e',
      stroke: '#16a34a',
      textColor: '#ffffff',
      label: `${value / 100}\u202F\u20AC`,
    };
  }
  // Euro coins: 100, 200 (cent values internally)
  if (value >= 100) {
    return {
      type: 'coin',
      fill: '#fbbf24',
      stroke: '#d97706',
      textColor: '#78350f',
      label: `${value / 100}\u202F\u20AC`,
    };
  }
  // Gold cent coins: 10, 20, 50
  if (value >= 10) {
    return {
      type: 'coin',
      fill: '#fcd34d',
      stroke: '#f59e0b',
      textColor: '#78350f',
      label: `${value}\u202Fct`,
    };
  }
  // Copper cent coins: 1, 2, 5
  return {
    type: 'coin',
    fill: '#d97706',
    stroke: '#92400e',
    textColor: '#fef3c7',
    label: `${value}\u202Fct`,
  };
}

function normalizeValue(value: number): number {
  // Handle euro values like 1, 2, 5, 10, 20 and cent values like 0.01, 0.02, etc.
  // Internally work with cents
  if (value >= 1 && Number.isInteger(value)) {
    // Could be euro or cent
    // Values 1, 2 could be 1ct/2ct OR 1EUR/2EUR
    // Use common sense: <=50 cent, >50 euro
    if (value <= 50) return value; // treat as cents
    return value; // treat as cents (100 = 1EUR)
  }
  if (value < 1) {
    return Math.round(value * 100);
  }
  return value;
}

export function CoinsSVG({ coins }: CoinsSVGProps) {
  const padding = 10;
  const coinDiameter = 44;
  const billWidth = 60;
  const billHeight = 34;
  const itemGap = 6;
  const groupGap = 16;

  // Build items list
  type Item = { style: CoinStyle; value: number };
  const items: Item[] = [];
  for (const coin of coins) {
    const normVal = normalizeValue(coin.value);
    const style = getCoinStyle(normVal);
    for (let i = 0; i < coin.count; i++) {
      items.push({ style, value: normVal });
    }
  }

  if (items.length === 0) {
    return (
      <svg
        viewBox="0 0 100 50"
        style={{ width: '100%', maxWidth: 100 }}
        role="img"
        aria-label="Keine Münzen"
      >
        <text x={50} y={30} textAnchor="middle" fontSize={12} fill="#9ca3af">
          Keine Münzen
        </text>
      </svg>
    );
  }

  // Group items by value for layout
  const groups: Item[][] = [];
  let currentGroup: Item[] = [];
  let lastValue = -1;
  for (const item of items) {
    if (item.value !== lastValue && currentGroup.length > 0) {
      groups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(item);
    lastValue = item.value;
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  // Calculate layout
  let totalWidth = padding;
  const rowHeight = Math.max(coinDiameter, billHeight) + 8;

  const groupPositions: { x: number; items: Item[] }[] = [];
  for (const group of groups) {
    const gx = totalWidth;
    groupPositions.push({ x: gx, items: group });
    const isBill = group[0].style.type === 'bill';
    const itemW = isBill ? billWidth : coinDiameter;
    totalWidth += group.length * (itemW + itemGap) - itemGap + groupGap;
  }
  totalWidth += padding - groupGap;

  const viewW = Math.max(totalWidth, 60);
  const viewH = rowHeight + padding * 2;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: '100%', maxWidth: viewW }}
      role="img"
      aria-label={`Münzen und Scheine: ${items.map((i) => i.style.label).join(', ')}`}
    >
      {groupPositions.map((group, gi) =>
        group.items.map((item, ii) => {
          const isBill = item.style.type === 'bill';
          const itemW = isBill ? billWidth : coinDiameter;
          const x = group.x + ii * (itemW + itemGap);
          const cy = viewH / 2;

          if (isBill) {
            const bx = x;
            const by = cy - billHeight / 2;
            return (
              <g key={`${gi}-${ii}`}>
                <rect
                  x={bx}
                  y={by}
                  width={billWidth}
                  height={billHeight}
                  rx={4}
                  fill={item.style.fill}
                  stroke={item.style.stroke}
                  strokeWidth={1.5}
                />
                {/* Inner border */}
                <rect
                  x={bx + 3}
                  y={by + 3}
                  width={billWidth - 6}
                  height={billHeight - 6}
                  rx={2}
                  fill="none"
                  stroke={item.style.textColor}
                  strokeWidth={0.5}
                  strokeOpacity={0.5}
                />
                <text
                  x={bx + billWidth / 2}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={11}
                  fontWeight="bold"
                  fill={item.style.textColor}
                >
                  {item.style.label}
                </text>
              </g>
            );
          }

          // Coin
          const coinCx = x + coinDiameter / 2;
          const coinR = coinDiameter / 2 - 2;
          return (
            <g key={`${gi}-${ii}`}>
              <circle
                cx={coinCx}
                cy={cy}
                r={coinR}
                fill={item.style.fill}
                stroke={item.style.stroke}
                strokeWidth={2}
              />
              {/* Inner ring */}
              <circle
                cx={coinCx}
                cy={cy}
                r={coinR - 4}
                fill="none"
                stroke={item.style.stroke}
                strokeWidth={0.5}
                strokeOpacity={0.4}
              />
              <text
                x={coinCx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={9}
                fontWeight="bold"
                fill={item.style.textColor}
              >
                {item.style.label}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}
