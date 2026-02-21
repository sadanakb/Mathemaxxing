'use client';

type ClockFaceProps = {
  hours: number;
  minutes: number;
  interactive?: boolean;
  onTimeChange?: (hours: number, minutes: number) => void;
  size?: number;
  className?: string;
};

export function ClockFace({ hours, minutes, interactive, onTimeChange, size = 200, className }: ClockFaceProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;

  const minuteAngle = (minutes / 60) * 360 - 90;
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90;

  const minuteHandLength = radius * 0.8;
  const hourHandLength = radius * 0.55;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const minuteEnd = {
    x: cx + minuteHandLength * Math.cos(toRad(minuteAngle)),
    y: cy + minuteHandLength * Math.sin(toRad(minuteAngle)),
  };
  const hourEnd = {
    x: cx + hourHandLength * Math.cos(toRad(hourAngle)),
    y: cy + hourHandLength * Math.sin(toRad(hourAngle)),
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onTimeChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * size - cx;
    const svgY = ((e.clientY - rect.top) / rect.height) * size - cy;
    const angle = Math.atan2(svgY, svgX) * (180 / Math.PI) + 90;
    const normalised = ((angle % 360) + 360) % 360;
    const newMinutes = Math.round((normalised / 360) * 12) * 5;
    onTimeChange(hours, newMinutes % 60);
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ maxWidth: size, width: '100%' }}
      onClick={handleClick}
      role="img"
      aria-label={`Uhr zeigt ${hours}:${String(minutes).padStart(2, '0')}`}
    >
      <circle cx={cx} cy={cy} r={radius + 5} fill="white" stroke="#374151" strokeWidth={3} />

      {Array.from({ length: 12 }, (_, i) => {
        const num = i + 1;
        const a = toRad((num / 12) * 360 - 90);
        const nr = radius * 0.82;
        return (
          <text key={num} x={cx + nr * Math.cos(a)} y={cy + nr * Math.sin(a) + 5}
            textAnchor="middle" fontSize={size * 0.08} fontWeight="bold" fill="#1f2937">
            {num}
          </text>
        );
      })}

      {Array.from({ length: 60 }, (_, i) => {
        const a = toRad((i / 60) * 360 - 90);
        const isMajor = i % 5 === 0;
        const r1 = radius * (isMajor ? 0.88 : 0.93);
        const r2 = radius * 0.97;
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
            stroke="#9ca3af" strokeWidth={isMajor ? 2 : 1}
          />
        );
      })}

      <line x1={cx} y1={cy} x2={hourEnd.x} y2={hourEnd.y}
        stroke="#1f2937" strokeWidth={4} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={minuteEnd.x} y2={minuteEnd.y}
        stroke="#374151" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={4} fill="#1f2937" />
    </svg>
  );
}
