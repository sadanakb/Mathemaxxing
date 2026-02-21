'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type AreaCountProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function AreaCount({ exercise, onSubmit, disabled }: AreaCountProps) {
  const areaGrid = exercise.areaGrid ?? [[false]];
  const rows = areaGrid.length;
  const cols = areaGrid[0]?.length ?? 1;
  const cellSize = 40;

  const [selected, setSelected] = useState<boolean[][]>(() =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
  );

  const selectedCount = selected.reduce(
    (sum, row) => sum + row.filter(Boolean).length,
    0
  );

  const toggleCell = useCallback(
    (r: number, c: number) => {
      if (disabled) return;
      setSelected((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = !next[r][c];
        return next;
      });
    },
    [disabled]
  );

  const handleSubmit = () => {
    onSubmit(String(selectedCount));
  };

  const width = cols * cellSize;
  const height = rows * cellSize;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Klicke auf die Kaestchen, die zur Flaeche gehoeren.
      </p>

      <div className="flex justify-center mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ maxWidth: width, width: '100%' }}
          role="grid"
          aria-label="Flaechenraster"
        >
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              const isShape = areaGrid[r]?.[c] ?? false;
              const isSelected = selected[r]?.[c] ?? false;

              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={c * cellSize}
                    y={r * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={isSelected ? 'var(--color-primary)' : 'white'}
                    fillOpacity={isSelected ? 0.4 : 1}
                    stroke={isShape ? 'var(--color-primary)' : '#d1d5db'}
                    strokeWidth={isShape ? 2.5 : 1}
                    onClick={() => toggleCell(r, c)}
                    className={disabled ? '' : 'cursor-pointer hover:fill-[var(--color-primary)] hover:fill-opacity-10'}
                    role="gridcell"
                    aria-label={`Zelle Reihe ${r + 1}, Spalte ${c + 1}${isShape ? ' (Teil der Form)' : ''}${isSelected ? ' (ausgewaehlt)' : ''}`}
                  />
                </g>
              );
            })
          )}
        </svg>
      </div>

      <p className="text-center text-lg font-medium text-gray-700 mb-4">
        {selectedCount} Kaestchen ausgewaehlt
      </p>

      <Button onClick={handleSubmit} disabled={disabled} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
