'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type DragOntoGridProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

type PlacedPoint = { x: number; y: number };

const COLORS = [
  'var(--color-primary)',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#ec4899',
];

export function DragOntoGrid({ exercise, onSubmit, disabled }: DragOntoGridProps) {
  const config = exercise.gridConfig;
  const gridWidth = config?.width ?? 10;
  const gridHeight = config?.height ?? 10;
  const pointsToPlace = config?.points ?? [];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [placements, setPlacements] = useState<(PlacedPoint | null)[]>(
    () => Array(pointsToPlace.length).fill(null)
  );

  const allPlaced = placements.every((p) => p !== null);

  // SVG layout
  const padding = 40;
  const cellSize = 30;
  const svgWidth = padding * 2 + gridWidth * cellSize;
  const svgHeight = padding * 2 + gridHeight * cellSize;

  // Grid origin at bottom-left within the padded area
  const originX = padding;
  const originY = svgHeight - padding;

  const gridToSvg = useCallback(
    (gx: number, gy: number) => ({
      sx: originX + gx * cellSize,
      sy: originY - gy * cellSize,
    }),
    [originX, originY]
  );

  const svgToGrid = useCallback(
    (sx: number, sy: number) => ({
      gx: Math.round((sx - originX) / cellSize),
      gy: Math.round((originY - sy) / cellSize),
    }),
    [originX, originY]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (disabled || activeIndex >= pointsToPlace.length) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
      const svgY = ((e.clientY - rect.top) / rect.height) * svgHeight;
      const { gx, gy } = svgToGrid(svgX, svgY);

      // Clamp to grid bounds
      const clampedX = Math.max(0, Math.min(gridWidth, gx));
      const clampedY = Math.max(0, Math.min(gridHeight, gy));

      setPlacements((prev) => {
        const next = [...prev];
        next[activeIndex] = { x: clampedX, y: clampedY };
        return next;
      });

      // Advance to next unplaced
      setActiveIndex((prev) => {
        for (let i = prev + 1; i < pointsToPlace.length; i++) {
          if (placements[i] === null) return i;
        }
        return pointsToPlace.length;
      });
    },
    [disabled, activeIndex, pointsToPlace, placements, svgWidth, svgHeight, svgToGrid, gridWidth, gridHeight]
  );

  const handleReset = () => {
    setPlacements(Array(pointsToPlace.length).fill(null));
    setActiveIndex(0);
  };

  const selectPoint = (index: number) => {
    if (disabled) return;
    setActiveIndex(index);
  };

  const handleSubmit = () => {
    onSubmit(JSON.stringify(placements));
  };

  // Grid lines
  const gridLines = useMemo(() => {
    const lines: React.ReactNode[] = [];
    // Vertical lines
    for (let x = 0; x <= gridWidth; x++) {
      const { sx, sy: sy0 } = gridToSvg(x, 0);
      const { sy: sy1 } = gridToSvg(x, gridHeight);
      lines.push(
        <line key={`v-${x}`} x1={sx} y1={sy0} x2={sx} y2={sy1} stroke="#e5e7eb" strokeWidth={1} />
      );
    }
    // Horizontal lines
    for (let y = 0; y <= gridHeight; y++) {
      const { sx: sx0, sy } = gridToSvg(0, y);
      const { sx: sx1 } = gridToSvg(gridWidth, y);
      lines.push(
        <line key={`h-${y}`} x1={sx0} y1={sy} x2={sx1} y2={sy} stroke="#e5e7eb" strokeWidth={1} />
      );
    }
    return lines;
  }, [gridWidth, gridHeight, gridToSvg]);

  // Axis labels
  const xLabels = useMemo(() => {
    const labels: React.ReactNode[] = [];
    for (let x = 0; x <= gridWidth; x++) {
      const { sx, sy } = gridToSvg(x, 0);
      labels.push(
        <text key={`xl-${x}`} x={sx} y={sy + 16} textAnchor="middle" fontSize={10} fill="#6b7280">{x}</text>
      );
    }
    return labels;
  }, [gridWidth, gridToSvg]);

  const yLabels = useMemo(() => {
    const labels: React.ReactNode[] = [];
    for (let y = 0; y <= gridHeight; y++) {
      const { sx, sy } = gridToSvg(0, y);
      labels.push(
        <text key={`yl-${y}`} x={sx - 10} y={sy + 4} textAnchor="end" fontSize={10} fill="#6b7280">{y}</text>
      );
    }
    return labels;
  }, [gridHeight, gridToSvg]);

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Klicke auf das Koordinatensystem, um die Punkte zu platzieren.
      </p>

      {/* Points to place */}
      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Zu platzierende Punkte">
        {pointsToPlace.map((pt, i) => {
          const placed = placements[i] !== null;
          const isActive = activeIndex === i;
          const label = pt.label ?? `(${pt.x}, ${pt.y})`;
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectPoint(i)}
              disabled={disabled}
              className={[
                'px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all duration-150 min-h-[44px]',
                placed
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
              ].join(' ')}
              role="listitem"
              aria-label={`${label}${placed ? ` – platziert bei (${placements[i]?.x}, ${placements[i]?.y})` : isActive ? ' – aktiv' : ''}`}
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden="true"
              />
              {label}
              {placed && <span className="ml-1 text-emerald-600">&#10003;</span>}
            </button>
          );
        })}
      </div>

      {/* Coordinate grid */}
      <div className="mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ maxWidth: svgWidth, width: '100%' }}
          onClick={handleClick}
          role="img"
          aria-label={`Koordinatensystem ${gridWidth} mal ${gridHeight}`}
          className={disabled ? '' : 'cursor-crosshair'}
        >
          {gridLines}

          {/* Axes */}
          <line
            x1={originX} y1={originY}
            x2={originX + gridWidth * cellSize} y2={originY}
            stroke="#374151" strokeWidth={2}
          />
          <line
            x1={originX} y1={originY}
            x2={originX} y2={originY - gridHeight * cellSize}
            stroke="#374151" strokeWidth={2}
          />

          {/* Axis arrows */}
          <polygon
            points={`${originX + gridWidth * cellSize + 8},${originY} ${originX + gridWidth * cellSize},${originY - 4} ${originX + gridWidth * cellSize},${originY + 4}`}
            fill="#374151"
          />
          <polygon
            points={`${originX},${originY - gridHeight * cellSize - 8} ${originX - 4},${originY - gridHeight * cellSize} ${originX + 4},${originY - gridHeight * cellSize}`}
            fill="#374151"
          />

          {/* Axis labels */}
          <text x={originX + gridWidth * cellSize + 14} y={originY + 5} fontSize={12} fontWeight="bold" fill="#374151">x</text>
          <text x={originX - 5} y={originY - gridHeight * cellSize - 12} fontSize={12} fontWeight="bold" fill="#374151" textAnchor="middle">y</text>

          {xLabels}
          {yLabels}

          {/* Placed points */}
          {placements.map((pt, i) => {
            if (!pt) return null;
            const { sx, sy } = gridToSvg(pt.x, pt.y);
            const label = pointsToPlace[i]?.label ?? `P${i + 1}`;
            return (
              <g key={i}>
                <circle cx={sx} cy={sy} r={7} fill={COLORS[i % COLORS.length]} />
                <text
                  x={sx}
                  y={sy - 12}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="bold"
                  fill={COLORS[i % COLORS.length]}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={handleReset}
          disabled={disabled || placements.every((p) => p === null)}
          size="lg"
        >
          Zuruecksetzen
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={disabled || !allPlaced}
          fullWidth
          size="lg"
        >
          Prüfen
        </Button>
      </div>
    </Card>
  );
}
