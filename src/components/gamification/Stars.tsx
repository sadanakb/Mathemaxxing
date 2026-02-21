'use client';

type StarsProps = {
  count: 0 | 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg';
  showEmpty?: boolean;
};

const SIZE_MAP = {
  sm: 14,
  md: 20,
  lg: 28,
} as const;

export function Stars({ count, size = 'md', showEmpty = true }: StarsProps) {
  const px = SIZE_MAP[size];
  const totalStars = 3;

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${count} von 3 Sternen`}
    >
      {Array.from({ length: totalStars }, (_, i) => {
        const isFilled = i < count;

        if (!isFilled && !showEmpty) return null;

        return (
          <span
            key={i}
            style={{
              fontSize: `${px}px`,
              lineHeight: 1,
              color: isFilled ? '#FFD700' : '#D1D5DB',
            }}
            aria-hidden="true"
          >
            {isFilled ? '\u2605' : '\u2606'}
          </span>
        );
      })}
    </span>
  );
}
