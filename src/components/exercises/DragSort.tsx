'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type DragSortProps = {
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

export function DragSort({ exercise, onSubmit, disabled }: DragSortProps) {
  const [items, setItems] = useState<string[]>(() =>
    shuffleArray(exercise.items ?? [])
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      if (disabled) return;
      setDragIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverIndex(index);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      if (disabled) return;
      const sourceIndex = dragIndex;
      if (sourceIndex === null || sourceIndex === targetIndex) {
        setDragIndex(null);
        setOverIndex(null);
        return;
      }
      setItems((prev) => {
        const next = [...prev];
        const [removed] = next.splice(sourceIndex, 1);
        next.splice(targetIndex, 0, removed);
        return next;
      });
      setDragIndex(null);
      setOverIndex(null);
    },
    [dragIndex, disabled]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  const handleSubmit = () => {
    onSubmit(JSON.stringify(items));
  };

  // Touch-based reorder: move item up/down
  const moveItem = (index: number, direction: -1 | 1) => {
    if (disabled) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Ziehe die Elemente in die richtige Reihenfolge.
      </p>

      <ol
        className="space-y-2 mb-6"
        role="list"
        aria-label="Sortierbare Elemente"
      >
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            draggable={!disabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={[
              'flex items-center gap-3 p-4 rounded-xl border-2 font-medium transition-all duration-150',
              'select-none',
              disabled ? 'cursor-default opacity-70' : 'cursor-grab active:cursor-grabbing',
              dragIndex === index
                ? 'opacity-50 border-gray-300 bg-gray-50'
                : overIndex === index
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-gray-200 bg-white',
            ].join(' ')}
            role="listitem"
            aria-label={`Position ${index + 1}: ${item}`}
            aria-grabbed={dragIndex === index}
          >
            {/* Drag handle */}
            <span
              className="flex flex-col gap-0.5 text-gray-400 shrink-0"
              aria-hidden="true"
            >
              <span className="w-4 h-0.5 bg-gray-400 rounded" />
              <span className="w-4 h-0.5 bg-gray-400 rounded" />
              <span className="w-4 h-0.5 bg-gray-400 rounded" />
            </span>

            {/* Position number */}
            <span className="text-sm text-gray-400 font-bold w-6 text-center shrink-0">
              {index + 1}
            </span>

            {/* Item text */}
            <span className="flex-1">{item}</span>

            {/* Touch-friendly move buttons */}
            {!disabled && (
              <span className="flex flex-col gap-1 shrink-0 sm:hidden">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 disabled:opacity-30"
                  aria-label={`${item} nach oben verschieben`}
                >
                  &#x25B2;
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 disabled:opacity-30"
                  aria-label={`${item} nach unten verschieben`}
                >
                  &#x25BC;
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>

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
