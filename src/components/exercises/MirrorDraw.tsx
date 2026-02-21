'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type MirrorDrawProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function MirrorDraw({ exercise, onSubmit, disabled }: MirrorDrawProps) {
  const config = exercise.mirrorConfig ?? { axis: 'vertical' as const, grid: [[false]] };
  const { axis, grid: sourceGrid } = config;

  const rows = sourceGrid.length;
  const cols = sourceGrid[0]?.length ?? 1;
  const cellSize = 40;

  // For vertical axis: source is left, target is right (same grid dimensions)
  // For horizontal axis: source is top, target is bottom
  const [userGrid, setUserGrid] = useState<boolean[][]>(() =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
  );

  const toggleCell = useCallback(
    (r: number, c: number) => {
      if (disabled) return;
      setUserGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = !next[r][c];
        return next;
      });
    },
    [disabled]
  );

  const handleSubmit = () => {
    onSubmit(JSON.stringify(userGrid));
  };

  // Full SVG dimensions
  const isVertical = axis === 'vertical';
  const svgWidth = isVertical ? cols * cellSize * 2 + cellSize : cols * cellSize;
  const svgHeight = isVertical ? rows * cellSize : rows * cellSize * 2 + cellSize;

  // Offsets for source and target grids
  const sourceOffsetX = 0;
  const sourceOffsetY = 0;
  const targetOffsetX = isVertical ? cols * cellSize + cellSize : 0;
  const targetOffsetY = isVertical ? 0 : rows * cellSize + cellSize;

  // Mirror axis position
  const axisX1 = isVertical ? cols * cellSize + cellSize / 2 : 0;
  const axisY1 = isVertical ? 0 : rows * cellSize + cellSize / 2;
  const axisX2 = isVertical ? cols * cellSize + cellSize / 2 : cols * cellSize;
  const axisY2 = isVertical ? rows * cellSize : rows * cellSize + cellSize / 2;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Spiegle das Muster auf die andere Seite der Achse.
      </p>

      <div className="flex justify-center mb-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ maxWidth: svgWidth, width: '100%' }}
          role="img"
          aria-label="Spiegelgitter"
        >
          {/* Source grid (read-only) */}
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => (
              <rect
                key={`src-${r}-${c}`}
                x={sourceOffsetX + c * cellSize}
                y={sourceOffsetY + r * cellSize}
                width={cellSize}
                height={cellSize}
                fill={sourceGrid[r]?.[c] ? 'var(--color-primary)' : 'white'}
                fillOpacity={sourceGrid[r]?.[c] ? 0.4 : 1}
                stroke="#d1d5db"
                strokeWidth={1}
              />
            ))
          )}

          {/* Mirror axis */}
          <line
            x1={axisX1}
            y1={axisY1}
            x2={axisX2}
            y2={axisY2}
            stroke="#ef4444"
            strokeWidth={3}
            strokeDasharray="8 4"
          />

          {/* Target grid (clickable) */}
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => (
              <rect
                key={`tgt-${r}-${c}`}
                x={targetOffsetX + c * cellSize}
                y={targetOffsetY + r * cellSize}
                width={cellSize}
                height={cellSize}
                fill={userGrid[r]?.[c] ? 'var(--color-primary)' : 'white'}
                fillOpacity={userGrid[r]?.[c] ? 0.4 : 1}
                stroke="#d1d5db"
                strokeWidth={1}
                onClick={() => toggleCell(r, c)}
                className={disabled ? '' : 'cursor-pointer hover:fill-[var(--color-primary)] hover:fill-opacity-20'}
                role="gridcell"
                aria-label={`Zielzelle Reihe ${r + 1}, Spalte ${c + 1}${userGrid[r]?.[c] ? ' (ausgefuellt)' : ''}`}
              />
            ))
          )}
        </svg>
      </div>

      <Button onClick={handleSubmit} disabled={disabled} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
