'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type Point = { x: number; y: number };

type GraphDrawProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function GraphDraw({ exercise, onSubmit, disabled }: GraphDrawProps) {
  const config = exercise.gridConfig ?? { width: 10, height: 10 };
  const gridW = config.width;
  const gridH = config.height;
  const maxPoints = config.points?.length ?? 5;

  const [points, setPoints] = useState<Point[]>([]);

  const cellSize = 40;
  const padding = 40;
  const halfW = Math.floor(gridW / 2);
  const halfH = Math.floor(gridH / 2);
  const svgWidth = gridW * cellSize + padding * 2;
  const svgHeight = gridH * cellSize + padding * 2;

  // Convert grid coords to SVG coords
  const toSvgX = (x: number) => padding + (x + halfW) * cellSize;
  const toSvgY = (y: number) => padding + (halfH - y) * cellSize;

  // Convert SVG coords to grid coords (snapped to integer)
  const toGridX = (svgX: number) => Math.round((svgX - padding) / cellSize - halfW);
  const toGridY = (svgY: number) => Math.round(halfH - (svgY - padding) / cellSize);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (disabled) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const scaleX = svgWidth / rect.width;
      const scaleY = svgHeight / rect.height;
      const svgX = (e.clientX - rect.left) * scaleX;
      const svgY = (e.clientY - rect.top) * scaleY;

      const gx = toGridX(svgX);
      const gy = toGridY(svgY);

      // Check if within bounds
      if (gx < -halfW || gx > halfW || gy < -halfH || gy > halfH) return;

      // Check if clicking on existing point -> remove it
      const existingIdx = points.findIndex((p) => p.x === gx && p.y === gy);
      if (existingIdx !== -1) {
        setPoints((prev) => prev.filter((_, i) => i !== existingIdx));
        return;
      }

      // Add point if not at max
      if (points.length >= maxPoints) return;
      setPoints((prev) => [...prev, { x: gx, y: gy }]);
    },
    [disabled, points, maxPoints, halfW, halfH, svgWidth, svgHeight]
  );

  const handleSubmit = () => {
    onSubmit(JSON.stringify(points));
  };

  // Sort points by x for line drawing
  const sortedPoints = [...points].sort((a, b) => a.x - b.x);

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Klicke auf das Koordinatensystem, um Punkte zu setzen ({points.length}/{maxPoints}).
      </p>

      <div className="flex justify-center mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ maxWidth: svgWidth, width: '100%' }}
          onClick={handleClick}
          className={disabled ? '' : 'cursor-crosshair'}
          role="img"
          aria-label="Koordinatensystem"
        >
          {/* Grid lines */}
          {Array.from({ length: gridW + 1 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={padding + i * cellSize}
              y1={padding}
              x2={padding + i * cellSize}
              y2={padding + gridH * cellSize}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: gridH + 1 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={padding}
              y1={padding + i * cellSize}
              x2={padding + gridW * cellSize}
              y2={padding + i * cellSize}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}

          {/* X-axis */}
          <line
            x1={padding}
            y1={toSvgY(0)}
            x2={padding + gridW * cellSize}
            y2={toSvgY(0)}
            stroke="#374151"
            strokeWidth={2}
          />
          {/* Y-axis */}
          <line
            x1={toSvgX(0)}
            y1={padding}
            x2={toSvgX(0)}
            y2={padding + gridH * cellSize}
            stroke="#374151"
            strokeWidth={2}
          />

          {/* X-axis labels */}
          {Array.from({ length: gridW + 1 }, (_, i) => {
            const val = i - halfW;
            if (val === 0) return null;
            return (
              <text
                key={`xl-${i}`}
                x={padding + i * cellSize}
                y={toSvgY(0) + 18}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
              >
                {val}
              </text>
            );
          })}

          {/* Y-axis labels */}
          {Array.from({ length: gridH + 1 }, (_, i) => {
            const val = halfH - i;
            if (val === 0) return null;
            return (
              <text
                key={`yl-${i}`}
                x={toSvgX(0) - 12}
                y={padding + i * cellSize + 4}
                fontSize="11"
                fill="#6b7280"
                textAnchor="end"
              >
                {val}
              </text>
            );
          })}

          {/* Origin label */}
          <text
            x={toSvgX(0) - 10}
            y={toSvgY(0) + 16}
            fontSize="11"
            fill="#6b7280"
            textAnchor="end"
          >
            0
          </text>

          {/* Lines connecting sorted points */}
          {sortedPoints.length > 1 &&
            sortedPoints.map((p, i) => {
              if (i === 0) return null;
              const prev = sortedPoints[i - 1];
              return (
                <line
                  key={`line-${i}`}
                  x1={toSvgX(prev.x)}
                  y1={toSvgY(prev.y)}
                  x2={toSvgX(p.x)}
                  y2={toSvgY(p.y)}
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              );
            })}

          {/* User points */}
          {points.map((p, i) => (
            <g key={`pt-${i}`}>
              <circle
                cx={toSvgX(p.x)}
                cy={toSvgY(p.y)}
                r={7}
                fill="var(--color-primary)"
                stroke="white"
                strokeWidth={2}
              />
              <text
                x={toSvgX(p.x)}
                y={toSvgY(p.y) - 12}
                fontSize="10"
                fill="var(--color-primary)"
                textAnchor="middle"
                fontWeight="bold"
              >
                ({p.x}|{p.y})
              </text>
            </g>
          ))}
        </svg>
      </div>

      <Button onClick={handleSubmit} disabled={disabled || points.length === 0} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
