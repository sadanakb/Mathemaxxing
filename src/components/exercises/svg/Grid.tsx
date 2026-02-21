'use client';

type GridProps = {
  rows: number;
  cols: number;
  cellSize?: number;
  highlighted?: boolean[][];
  onCellClick?: (row: number, col: number) => void;
  className?: string;
};

export function Grid({ rows, cols, cellSize = 40, highlighted, onCellClick, className }: GridProps) {
  const width = cols * cellSize;
  const height = rows * cellSize;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ maxWidth: width, width: '100%' }}
      role="grid"
      aria-label={`${rows} mal ${cols} Gitter`}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const isHighlighted = highlighted?.[r]?.[c] ?? false;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill={isHighlighted ? 'var(--color-primary)' : 'white'}
              fillOpacity={isHighlighted ? 0.3 : 1}
              stroke="#d1d5db"
              strokeWidth={1}
              onClick={() => onCellClick?.(r, c)}
              className={onCellClick ? 'cursor-pointer hover:fill-[var(--color-primary)] hover:fill-opacity-20' : ''}
              role={onCellClick ? 'gridcell' : undefined}
              aria-label={onCellClick ? `Zelle Reihe ${r + 1}, Spalte ${c + 1}` : undefined}
            />
          );
        })
      )}
    </svg>
  );
}
