'use client';

type NumberlineBaseProps = {
  min: number;
  max: number;
  step: number;
  markers?: { value: number; label?: string; color?: string }[];
  onPositionClick?: (value: number) => void;
  width?: number;
  height?: number;
  className?: string;
};

export function NumberlineBase({
  min, max, step, markers = [], onPositionClick, width = 600, height = 80, className,
}: NumberlineBaseProps) {
  const padding = 30;
  const lineY = height / 2;
  const usableWidth = width - padding * 2;

  const valueToX = (v: number) => padding + ((v - min) / (max - min)) * usableWidth;
  const xToValue = (x: number) => {
    const raw = min + ((x - padding) / usableWidth) * (max - min);
    return Math.round(raw / step) * step;
  };

  const ticks: number[] = [];
  for (let v = min; v <= max; v += step) {
    ticks.push(v);
  }

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onPositionClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const val = xToValue(svgX);
    if (val >= min && val <= max) onPositionClick(val);
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ maxWidth: width, width: '100%' }}
      onClick={handleClick}
      role="img"
      aria-label={`Zahlenstrahl von ${min} bis ${max}`}
    >
      <line x1={padding} y1={lineY} x2={width - padding} y2={lineY} stroke="#374151" strokeWidth={2} />
      <polygon points={`${padding - 8},${lineY} ${padding},${lineY - 5} ${padding},${lineY + 5}`} fill="#374151" />
      <polygon points={`${width - padding + 8},${lineY} ${width - padding},${lineY - 5} ${width - padding},${lineY + 5}`} fill="#374151" />

      {ticks.map((v) => {
        const x = valueToX(v);
        return (
          <g key={v}>
            <line x1={x} y1={lineY - 8} x2={x} y2={lineY + 8} stroke="#374151" strokeWidth={1.5} />
            <text x={x} y={lineY + 22} textAnchor="middle" fontSize={12} fill="#6b7280">{v}</text>
          </g>
        );
      })}

      {markers.map((m, i) => {
        const x = valueToX(m.value);
        return (
          <g key={i}>
            <circle cx={x} cy={lineY} r={8} fill={m.color ?? 'var(--color-primary)'} />
            {m.label && (
              <text x={x} y={lineY - 14} textAnchor="middle" fontSize={11} fontWeight="bold" fill={m.color ?? 'var(--color-primary)'}>{m.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
