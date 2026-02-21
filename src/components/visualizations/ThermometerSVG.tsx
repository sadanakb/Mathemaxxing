'use client';

type ThermometerSVGProps = {
  temperature: number;
  min?: number;
  max?: number;
  unit?: '\u00B0C' | '\u00B0F';
};

export function ThermometerSVG({
  temperature,
  min = -20,
  max = 50,
  unit = '\u00B0C',
}: ThermometerSVGProps) {
  const width = 100;
  const height = 280;
  const padding = 20;

  // Thermometer body dimensions
  const tubeX = 36;
  const tubeWidth = 16;
  const bulbR = 16;
  const tubeTop = padding + 10;
  const tubeBottom = height - padding - bulbR - 6;
  const tubeHeight = tubeBottom - tubeTop;
  const bulbCy = tubeBottom + bulbR / 2 + 4;

  // Mercury dimensions (inside tube)
  const mercuryPad = 3;
  const mercuryX = tubeX + mercuryPad;
  const mercuryWidth = tubeWidth - mercuryPad * 2;
  const mercuryTop = tubeTop + mercuryPad;
  const mercuryMaxHeight = tubeHeight - mercuryPad * 2;

  // Clamp temperature
  const safeTemp = Math.max(min, Math.min(max, temperature));
  const fraction = (safeTemp - min) / (max - min);
  const mercuryHeight = fraction * mercuryMaxHeight;
  const mercuryY = mercuryTop + mercuryMaxHeight - mercuryHeight;

  // Temperature color gradient
  function tempColor(t: number): string {
    const normalised = (t - min) / (max - min);
    if (normalised <= 0.3) {
      // Blue range
      const g = Math.round(100 + normalised * 400);
      return `rgb(50, ${Math.min(g, 180)}, 255)`;
    }
    if (normalised <= 0.6) {
      // Yellow/orange range
      const r = Math.round(200 + (normalised - 0.3) * 180);
      const g = Math.round(200 - (normalised - 0.3) * 200);
      return `rgb(${Math.min(r, 255)}, ${Math.max(g, 100)}, 50)`;
    }
    // Red range
    const r = 255;
    const g = Math.round(100 - (normalised - 0.6) * 200);
    return `rgb(${r}, ${Math.max(g, 20)}, 30)`;
  }

  const mercuryColor = tempColor(safeTemp);

  // Scale ticks
  const range = max - min;
  const majorStep = range <= 30 ? 5 : 10;
  const minorStep = range <= 30 ? 1 : 5;

  const ticks: { temp: number; major: boolean }[] = [];
  for (let t = min; t <= max; t += minorStep) {
    ticks.push({ temp: t, major: t % majorStep === 0 });
  }

  const tempToY = (t: number): number => {
    const f = (t - min) / (max - min);
    return mercuryTop + mercuryMaxHeight - f * mercuryMaxHeight;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: width }}
      role="img"
      aria-label={`Thermometer: ${temperature}${unit}`}
    >
      <defs>
        <linearGradient id="therm-tube-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="50%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
        <linearGradient id="therm-mercury-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={mercuryColor} />
          <stop offset="100%" stopColor={mercuryColor} stopOpacity={0.8} />
        </linearGradient>
      </defs>

      {/* Tube body */}
      <rect
        x={tubeX}
        y={tubeTop}
        width={tubeWidth}
        height={tubeHeight}
        rx={tubeWidth / 2}
        fill="url(#therm-tube-grad)"
        stroke="#9ca3af"
        strokeWidth={1.5}
      />

      {/* Bulb */}
      <circle
        cx={tubeX + tubeWidth / 2}
        cy={bulbCy}
        r={bulbR}
        fill="url(#therm-tube-grad)"
        stroke="#9ca3af"
        strokeWidth={1.5}
      />

      {/* Mercury in bulb */}
      <circle
        cx={tubeX + tubeWidth / 2}
        cy={bulbCy}
        r={bulbR - 3}
        fill={mercuryColor}
      />

      {/* Mercury in tube */}
      {mercuryHeight > 0 && (
        <rect
          x={mercuryX}
          y={mercuryY}
          width={mercuryWidth}
          height={mercuryHeight + (bulbCy - tubeBottom)}
          rx={mercuryWidth / 2}
          fill="url(#therm-mercury-grad)"
        />
      )}

      {/* Scale tick marks */}
      {ticks.map((tick) => {
        const y = tempToY(tick.temp);
        const tickLen = tick.major ? 12 : 6;
        const x1 = tubeX + tubeWidth + 4;
        const x2 = x1 + tickLen;

        return (
          <g key={`tick-${tick.temp}`}>
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#6b7280"
              strokeWidth={tick.major ? 1.2 : 0.7}
            />
            {tick.major && (
              <text
                x={x2 + 4}
                y={y}
                dominantBaseline="central"
                fontSize={9}
                fill="#374151"
              >
                {tick.temp}
              </text>
            )}
          </g>
        );
      })}

      {/* Current temperature indicator */}
      <g>
        <line
          x1={tubeX - 2}
          y1={tempToY(safeTemp)}
          x2={tubeX - 10}
          y2={tempToY(safeTemp)}
          stroke={mercuryColor}
          strokeWidth={2}
        />
        <text
          x={tubeX - 12}
          y={tempToY(safeTemp)}
          textAnchor="end"
          dominantBaseline="central"
          fontSize={11}
          fontWeight="bold"
          fill={mercuryColor}
        >
          {temperature}{unit}
        </text>
      </g>

      {/* Unit label at top */}
      <text
        x={tubeX + tubeWidth / 2}
        y={tubeTop - 4}
        textAnchor="middle"
        fontSize={9}
        fill="#6b7280"
      >
        {unit}
      </text>
    </svg>
  );
}
