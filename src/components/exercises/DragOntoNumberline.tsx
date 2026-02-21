'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NumberlineBase } from '@/components/exercises/svg/NumberlineBase';
import type { Exercise } from '@/lib/curriculum/types';

type DragOntoNumberlineProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

const COLORS = [
  'var(--color-primary)',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#ec4899',
];

export function DragOntoNumberline({ exercise, onSubmit, disabled }: DragOntoNumberlineProps) {
  const config = exercise.numberlineConfig;
  const min = config?.min ?? 0;
  const max = config?.max ?? 10;
  const step = config?.step ?? 1;
  const targets = config?.targets ?? [];

  // Track which target we're placing and placed positions
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [placements, setPlacements] = useState<(number | null)[]>(
    () => Array(targets.length).fill(null)
  );

  const allPlaced = placements.every((p) => p !== null);

  const markers = useMemo(
    () =>
      placements
        .map((value, i) =>
          value !== null
            ? { value, label: String(targets[i]), color: COLORS[i % COLORS.length] }
            : null
        )
        .filter((m): m is NonNullable<typeof m> => m !== null),
    [placements, targets]
  );

  const handlePositionClick = useCallback(
    (value: number) => {
      if (disabled) return;
      if (activeIndex >= targets.length) return;

      setPlacements((prev) => {
        const next = [...prev];
        next[activeIndex] = value;
        return next;
      });

      // Move to next unplaced target
      setActiveIndex((prev) => {
        for (let i = prev + 1; i < targets.length; i++) {
          if (placements[i] === null) return i;
        }
        // All placed after this one
        return targets.length;
      });
    },
    [disabled, activeIndex, targets, placements]
  );

  const handleReset = () => {
    setPlacements(Array(targets.length).fill(null));
    setActiveIndex(0);
  };

  const selectTarget = (index: number) => {
    if (disabled) return;
    setActiveIndex(index);
  };

  const handleSubmit = () => {
    onSubmit(JSON.stringify(placements));
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Klicke auf den Zahlenstrahl, um jede Zahl zu platzieren.
      </p>

      {/* Targets list */}
      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Zu platzierende Zahlen">
        {targets.map((target, i) => {
          const placed = placements[i] !== null;
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectTarget(i)}
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
              aria-label={`${target}${placed ? ` – platziert bei ${placements[i]}` : isActive ? ' – aktiv' : ''}`}
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden="true"
              />
              {target}
              {placed && <span className="ml-1 text-emerald-600">&#10003;</span>}
            </button>
          );
        })}
      </div>

      {/* Number line */}
      <div className="mb-4 overflow-x-auto">
        <NumberlineBase
          min={min}
          max={max}
          step={step}
          markers={markers}
          onPositionClick={disabled ? undefined : handlePositionClick}
          className={disabled ? '' : 'cursor-crosshair'}
        />
      </div>

      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={handleReset}
          disabled={disabled || placements.every((p) => p === null)}
          size="lg"
        >
          Zurücksetzen
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
