'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type DragMatchProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function DragMatch({ exercise, onSubmit, disabled }: DragMatchProps) {
  const pairs = exercise.pairs ?? [];
  const leftItems = useMemo(() => pairs.map((p) => p[0]), [pairs]);
  const rightItems = useMemo(
    () => shuffleArray(pairs.map((p) => p[1])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [matches, setMatches] = useState<Record<string, string>>({});
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [overSlot, setOverSlot] = useState<string | null>(null);

  // Which right items are already used
  const usedRight = useMemo(
    () => new Set(Object.values(matches)),
    [matches]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, item: string) => {
      if (disabled) return;
      setDragItem(item);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item);
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, leftKey: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverSlot(leftKey);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setOverSlot(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, leftKey: string) => {
      e.preventDefault();
      if (disabled || !dragItem) {
        setDragItem(null);
        setOverSlot(null);
        return;
      }

      setMatches((prev) => {
        const next = { ...prev };
        // Remove any previous assignment of this right item
        for (const key of Object.keys(next)) {
          if (next[key] === dragItem) {
            delete next[key];
          }
        }
        next[leftKey] = dragItem;
        return next;
      });
      setDragItem(null);
      setOverSlot(null);
    },
    [dragItem, disabled]
  );

  const handleDragEnd = useCallback(() => {
    setDragItem(null);
    setOverSlot(null);
  }, []);

  // Remove a match by clicking it
  const removeMatch = (leftKey: string) => {
    if (disabled) return;
    setMatches((prev) => {
      const next = { ...prev };
      delete next[leftKey];
      return next;
    });
  };

  const allMatched = Object.keys(matches).length === pairs.length;

  const handleSubmit = () => {
    onSubmit(JSON.stringify(matches));
  };

  // Tap-to-assign for mobile: select a right item, then tap a left slot
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const handleRightTap = (item: string) => {
    if (disabled) return;
    if (usedRight.has(item)) return;
    setSelectedRight((prev) => (prev === item ? null : item));
  };

  const handleLeftTap = (leftKey: string) => {
    if (disabled || !selectedRight) return;
    setMatches((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[key] === selectedRight) {
          delete next[key];
        }
      }
      next[leftKey] = selectedRight;
      return next;
    });
    setSelectedRight(null);
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Ziehe die Begriffe rechts auf die passende Stelle links.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6" role="group" aria-label="Zuordnungsaufgabe">
        {/* Left column: slots */}
        <div className="space-y-3" aria-label="Begriffe">
          {leftItems.map((leftKey) => {
            const matched = matches[leftKey];
            return (
              <div
                key={leftKey}
                onDragOver={(e) => handleDragOver(e, leftKey)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, leftKey)}
                onClick={() => handleLeftTap(leftKey)}
                className={[
                  'p-4 rounded-xl border-2 min-h-[56px] transition-all duration-150',
                  matched
                    ? 'border-emerald-400 bg-emerald-50'
                    : overSlot === leftKey
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : selectedRight && !disabled
                        ? 'border-dashed border-[var(--color-primary)] cursor-pointer'
                        : 'border-dashed border-gray-300',
                ].join(' ')}
                role="region"
                aria-label={`Zuordnung fuer ${leftKey}`}
              >
                <span className="font-semibold text-gray-900">{leftKey}</span>
                {matched && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <span className="text-emerald-700 font-medium">{matched}</span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMatch(leftKey);
                        }}
                        className="ml-1 w-5 h-5 text-xs rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-600"
                        aria-label={`Zuordnung ${matched} entfernen`}
                      >
                        x
                      </button>
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column: draggable items */}
        <div className="space-y-3" aria-label="Zuordnungsoptionen">
          {rightItems.map((item) => {
            const used = usedRight.has(item);
            return (
              <div
                key={item}
                draggable={!disabled && !used}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                onClick={() => handleRightTap(item)}
                className={[
                  'p-4 rounded-xl border-2 font-medium transition-all duration-150 select-none',
                  used
                    ? 'opacity-40 cursor-default border-gray-200 bg-gray-50'
                    : selectedRight === item
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 cursor-pointer'
                      : disabled
                        ? 'cursor-default border-gray-200 bg-white'
                        : 'cursor-grab active:cursor-grabbing border-gray-200 bg-white hover:border-[var(--color-primary)]',
                ].join(' ')}
                role="option"
                aria-selected={selectedRight === item}
                aria-disabled={used || disabled}
                aria-label={item}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || !allMatched}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
