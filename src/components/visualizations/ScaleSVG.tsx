'use client';

type ScaleItem = {
  label: string;
  weight: number;
};

type ScaleSVGProps = {
  leftItems: ScaleItem[];
  rightItems: ScaleItem[];
  showWeights?: boolean;
};

export function ScaleSVG({
  leftItems,
  rightItems,
  showWeights = false,
}: ScaleSVGProps) {
  const width = 320;
  const height = 220;
  const cx = width / 2;

  const leftTotal = leftItems.reduce((s, i) => s + i.weight, 0);
  const rightTotal = rightItems.reduce((s, i) => s + i.weight, 0);

  // Tilt angle based on weight difference (max 15 degrees)
  const diff = leftTotal - rightTotal;
  const maxTilt = 15;
  const maxDiff = Math.max(leftTotal, rightTotal, 1);
  const tiltDeg = Math.max(-maxTilt, Math.min(maxTilt, (diff / maxDiff) * maxTilt));
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // Fulcrum position
  const fulcrumTop = 100;
  const fulcrumBase = 180;
  const fulcrumWidth = 30;

  // Beam
  const beamLength = 240;
  const beamHalfLen = beamLength / 2;
  const beamY = fulcrumTop;

  // Pan dimensions
  const panWidth = 80;
  const panHeight = 12;
  const chainLength = 30;

  // Calculate beam endpoints with tilt
  const leftEndX = cx - beamHalfLen * Math.cos(tiltRad);
  const leftEndY = beamY - beamHalfLen * Math.sin(tiltRad);
  const rightEndX = cx + beamHalfLen * Math.cos(tiltRad);
  const rightEndY = beamY + beamHalfLen * Math.sin(tiltRad);

  // Pan positions (hanging below beam ends)
  const leftPanY = leftEndY + chainLength;
  const rightPanY = rightEndY + chainLength;

  const renderItems = (
    items: ScaleItem[],
    panCx: number,
    panTopY: number,
    prefix: string
  ) => {
    const boxW = Math.min(32, (panWidth - 4) / Math.max(items.length, 1));
    const boxH = 20;
    const startX = panCx - (items.length * boxW) / 2;

    return items.map((item, i) => (
      <g key={`${prefix}-${i}`}>
        <rect
          x={startX + i * boxW + 1}
          y={panTopY - boxH - 2}
          width={boxW - 2}
          height={boxH}
          rx={3}
          fill="var(--color-primary)"
          fillOpacity={0.2}
          stroke="var(--color-primary)"
          strokeWidth={1}
        />
        <text
          x={startX + i * boxW + boxW / 2}
          y={panTopY - boxH / 2 - 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={8}
          fontWeight="bold"
          fill="#1f2937"
        >
          {item.label}
        </text>
        {showWeights && (
          <text
            x={startX + i * boxW + boxW / 2}
            y={panTopY - boxH - 6}
            textAnchor="middle"
            fontSize={7}
            fill="#6b7280"
          >
            {item.weight}g
          </text>
        )}
      </g>
    ));
  };

  const balanced = Math.abs(diff) < 0.01;
  const statusLabel = balanced
    ? 'ausgeglichen'
    : diff > 0
      ? 'links schwerer'
      : 'rechts schwerer';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={`Balkenwaage: links ${leftTotal}g, rechts ${rightTotal}g — ${statusLabel}`}
    >
      {/* Base stand */}
      <rect
        x={cx - 20}
        y={fulcrumBase}
        width={40}
        height={8}
        rx={3}
        fill="#6b7280"
      />
      <rect
        x={cx - 4}
        y={fulcrumTop + 8}
        width={8}
        height={fulcrumBase - fulcrumTop - 8}
        fill="#9ca3af"
      />

      {/* Fulcrum triangle */}
      <polygon
        points={`${cx},${fulcrumTop - 2} ${cx - fulcrumWidth / 2},${fulcrumTop + 12} ${cx + fulcrumWidth / 2},${fulcrumTop + 12}`}
        fill="#374151"
        stroke="#1f2937"
        strokeWidth={1}
      />

      {/* Beam */}
      <line
        x1={leftEndX}
        y1={leftEndY}
        x2={rightEndX}
        y2={rightEndY}
        stroke="#4b5563"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Center pivot dot */}
      <circle cx={cx} cy={beamY} r={4} fill="#374151" />

      {/* Left chains */}
      <line
        x1={leftEndX}
        y1={leftEndY}
        x2={leftEndX - panWidth / 2 + 8}
        y2={leftPanY}
        stroke="#9ca3af"
        strokeWidth={1}
      />
      <line
        x1={leftEndX}
        y1={leftEndY}
        x2={leftEndX + panWidth / 2 - 8}
        y2={leftPanY}
        stroke="#9ca3af"
        strokeWidth={1}
      />

      {/* Left pan */}
      <rect
        x={leftEndX - panWidth / 2}
        y={leftPanY}
        width={panWidth}
        height={panHeight}
        rx={3}
        fill="#d1d5db"
        stroke="#9ca3af"
        strokeWidth={1}
      />

      {/* Left items */}
      {renderItems(leftItems, leftEndX, leftPanY, 'left')}

      {/* Right chains */}
      <line
        x1={rightEndX}
        y1={rightEndY}
        x2={rightEndX - panWidth / 2 + 8}
        y2={rightPanY}
        stroke="#9ca3af"
        strokeWidth={1}
      />
      <line
        x1={rightEndX}
        y1={rightEndY}
        x2={rightEndX + panWidth / 2 - 8}
        y2={rightPanY}
        stroke="#9ca3af"
        strokeWidth={1}
      />

      {/* Right pan */}
      <rect
        x={rightEndX - panWidth / 2}
        y={rightPanY}
        width={panWidth}
        height={panHeight}
        rx={3}
        fill="#d1d5db"
        stroke="#9ca3af"
        strokeWidth={1}
      />

      {/* Right items */}
      {renderItems(rightItems, rightEndX, rightPanY, 'right')}

      {/* Weight totals */}
      {showWeights && (
        <>
          <text
            x={leftEndX}
            y={leftPanY + panHeight + 14}
            textAnchor="middle"
            fontSize={10}
            fontWeight="bold"
            fill="#374151"
          >
            {leftTotal}g
          </text>
          <text
            x={rightEndX}
            y={rightPanY + panHeight + 14}
            textAnchor="middle"
            fontSize={10}
            fontWeight="bold"
            fill="#374151"
          >
            {rightTotal}g
          </text>
        </>
      )}
    </svg>
  );
}
