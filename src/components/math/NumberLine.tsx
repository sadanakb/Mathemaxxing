'use client';

type NumberLineProps = {
  min: number;
  max: number;
  highlighted?: number[];
  step?: number;
  className?: string;
};

export function NumberLine({ min, max, highlighted = [], step = 1, className = '' }: NumberLineProps) {
  const range = max - min;
  const ticks = Array.from({ length: Math.floor(range / step) + 1 }, (_, i) => min + i * step);

  function pct(val: number) {
    return ((val - min) / range) * 100;
  }

  return (
    <div className={['w-full py-6', className].join(' ')} role="img" aria-label={`Zahlenstrahl von ${min} bis ${max}`}>
      <div className="relative h-2 bg-gray-300 rounded-full mx-4">
        {/* Highlighted points */}
        {highlighted.map((val) => (
          <div
            key={val}
            className="absolute w-4 h-4 bg-[var(--color-primary)] rounded-full -top-1 -translate-x-1/2"
            style={{ left: `${pct(val)}%` }}
            aria-label={`Markierung bei ${val}`}
          />
        ))}

        {/* Tick marks */}
        {ticks.map((tick) => (
          <div key={tick} className="absolute" style={{ left: `${pct(tick)}%` }}>
            <div className="absolute w-0.5 h-3 bg-gray-400 top-0 -translate-x-1/2" />
            <div className="absolute top-4 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              {tick}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
