'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type FractionVisualExerciseProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function PieSlice({
  index,
  total,
  radius,
  cx,
  cy,
  selected,
  onClick,
  disabled,
}: {
  index: number;
  total: number;
  radius: number;
  cx: number;
  cy: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  const anglePerSlice = (2 * Math.PI) / total;
  const startAngle = index * anglePerSlice - Math.PI / 2;
  const endAngle = startAngle + anglePerSlice;

  const x1 = cx + radius * Math.cos(startAngle);
  const y1 = cy + radius * Math.sin(startAngle);
  const x2 = cx + radius * Math.cos(endAngle);
  const y2 = cy + radius * Math.sin(endAngle);

  const largeArc = anglePerSlice > Math.PI ? 1 : 0;

  const d = [
    `M ${cx} ${cy}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    'Z',
  ].join(' ');

  return (
    <path
      d={d}
      fill={selected ? 'var(--color-primary)' : 'white'}
      fillOpacity={selected ? 0.6 : 1}
      stroke="#374151"
      strokeWidth={2}
      onClick={disabled ? undefined : onClick}
      className={disabled ? 'cursor-default' : 'cursor-pointer hover:opacity-80'}
      role="button"
      aria-label={`Segment ${index + 1} von ${total}${selected ? ' (markiert)' : ''}`}
      aria-pressed={selected}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
}

function RectangleSegment({
  index,
  total,
  width,
  height,
  selected,
  onClick,
  disabled,
}: {
  index: number;
  total: number;
  width: number;
  height: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  // Arrange in a single row or wrap into a grid
  const cols = Math.min(total, 6);
  const cellWidth = width / cols;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const cellHeight = height / Math.ceil(total / cols);

  return (
    <rect
      x={col * cellWidth}
      y={row * cellHeight}
      width={cellWidth}
      height={cellHeight}
      fill={selected ? 'var(--color-primary)' : 'white'}
      fillOpacity={selected ? 0.6 : 1}
      stroke="#374151"
      strokeWidth={2}
      onClick={disabled ? undefined : onClick}
      className={disabled ? 'cursor-default' : 'cursor-pointer hover:opacity-80'}
      role="button"
      aria-label={`Feld ${index + 1} von ${total}${selected ? ' (markiert)' : ''}`}
      aria-pressed={selected}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
}

export function FractionVisualExercise({ exercise, onSubmit, disabled }: FractionVisualExerciseProps) {
  const config = exercise.fractionConfig ?? { total: 4, target: 1, shape: 'circle' as const };
  const { total, target, shape } = config;

  const [selected, setSelected] = useState<boolean[]>(() => new Array(total).fill(false));

  const toggleSegment = useCallback(
    (index: number) => {
      if (disabled) return;
      setSelected((prev) => {
        const next = [...prev];
        next[index] = !next[index];
        return next;
      });
    },
    [disabled]
  );

  const selectedCount = selected.filter(Boolean).length;

  const handleSubmit = () => {
    onSubmit(String(selectedCount));
  };

  const svgSize = 240;
  const rectWidth = 300;
  const cols = Math.min(total, 6);
  const rows = Math.ceil(total / cols);
  const rectCellHeight = 50;
  const rectHeight = rows * rectCellHeight;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Markiere {target}/{total} der Figur. Klicke auf die Teile, die du markieren willst.
      </p>

      <div className="flex justify-center mb-6" role="group" aria-label="Bruch-Darstellung">
        {shape === 'circle' ? (
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            style={{ maxWidth: svgSize, width: '100%' }}
            role="img"
            aria-label={`Kreis unterteilt in ${total} gleiche Teile`}
          >
            {Array.from({ length: total }, (_, i) => (
              <PieSlice
                key={i}
                index={i}
                total={total}
                radius={svgSize * 0.42}
                cx={svgSize / 2}
                cy={svgSize / 2}
                selected={selected[i]}
                onClick={() => toggleSegment(i)}
                disabled={disabled}
              />
            ))}
          </svg>
        ) : (
          <svg
            viewBox={`0 0 ${rectWidth} ${rectHeight}`}
            style={{ maxWidth: rectWidth, width: '100%' }}
            role="img"
            aria-label={`Rechteck unterteilt in ${total} gleiche Teile`}
          >
            {Array.from({ length: total }, (_, i) => (
              <RectangleSegment
                key={i}
                index={i}
                total={total}
                width={rectWidth}
                height={rectHeight}
                selected={selected[i]}
                onClick={() => toggleSegment(i)}
                disabled={disabled}
              />
            ))}
          </svg>
        )}
      </div>

      <p className="text-center text-sm text-gray-600 mb-4">
        {selectedCount} von {total} Teilen markiert
      </p>

      <Button
        onClick={handleSubmit}
        disabled={disabled}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
