'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type MultipleSelectProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function MultipleSelect({ exercise, onSubmit, disabled }: MultipleSelectProps) {
  const options = exercise.options ?? [];
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleOption = useCallback(
    (option: string) => {
      if (disabled) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(option)) {
          next.delete(option);
        } else {
          next.add(option);
        }
        return next;
      });
    },
    [disabled]
  );

  const handleSubmit = () => {
    onSubmit(JSON.stringify(Array.from(selected)));
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Waehle alle richtigen Antworten aus.
      </p>

      <div
        className="space-y-3 mb-6"
        role="group"
        aria-label="Antwortmoeglichkeiten (Mehrfachauswahl)"
      >
        {options.map((option) => {
          const isSelected = selected.has(option);
          return (
            <button
              key={option}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleOption(option)}
              disabled={disabled}
              className={[
                'w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left font-medium transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
                'disabled:cursor-default',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              ].join(' ')}
            >
              {/* Checkbox indicator */}
              <span
                className={[
                  'w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                  isSelected
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'bg-white border-gray-300',
                ].join(' ')}
                aria-hidden="true"
              >
                {isSelected && (
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path
                      d="M3 8.5L6.5 12L13 4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || selected.size === 0}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
