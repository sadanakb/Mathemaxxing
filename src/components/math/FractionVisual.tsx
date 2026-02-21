'use client';

type FractionVisualProps = {
  numerator: number;
  denominator: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function FractionVisual({ numerator, denominator, size = 'md', className = '' }: FractionVisualProps) {
  const safeNum = Math.max(0, Math.min(numerator, denominator));
  const size_px = size === 'sm' ? 40 : size === 'md' ? 60 : 80;

  // Arrange as a single row of segments
  const segments = Array.from({ length: denominator }, (_, i) => i < safeNum);

  return (
    <div
      className={['flex gap-1', className].join(' ')}
      role="img"
      aria-label={`${numerator}/${denominator} als Bruchdarstellung`}
    >
      {segments.map((filled, i) => (
        <div
          key={i}
          style={{ width: size_px, height: size_px }}
          className={[
            'rounded border-2',
            filled
              ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
              : 'bg-gray-100 border-gray-300',
          ].join(' ')}
        />
      ))}
    </div>
  );
}

/** Renders a fraction as text: a/b */
export function FractionText({ numerator, denominator }: { numerator: number; denominator: number }) {
  return (
    <span className="inline-flex flex-col items-center text-center leading-none" aria-label={`${numerator} durch ${denominator}`}>
      <span className="border-b border-current px-1">{numerator}</span>
      <span className="px-1">{denominator}</span>
    </span>
  );
}
