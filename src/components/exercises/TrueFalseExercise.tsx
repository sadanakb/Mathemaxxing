'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { Exercise } from '@/lib/curriculum/types';

type TrueFalseExerciseProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function TrueFalseExercise({ exercise, onSubmit, disabled }: TrueFalseExerciseProps) {
  const [selected, setSelected] = useState<'wahr' | 'falsch' | null>(null);

  const handleSelect = (value: 'wahr' | 'falsch') => {
    if (disabled) return;
    setSelected(value);
    onSubmit(value);
  };

  return (
    <Card className="mb-4">
      <p className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        {exercise.question}
      </p>

      <div
        className="flex gap-4"
        role="radiogroup"
        aria-label="Wahr oder Falsch"
      >
        {/* Wahr button */}
        <button
          type="button"
          role="radio"
          aria-checked={selected === 'wahr'}
          onClick={() => handleSelect('wahr')}
          disabled={disabled}
          className={[
            'flex-1 py-6 rounded-xl border-2 text-xl font-bold transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
            'disabled:cursor-default',
            selected === 'wahr'
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100',
          ].join(' ')}
        >
          Wahr
        </button>

        {/* Falsch button */}
        <button
          type="button"
          role="radio"
          aria-checked={selected === 'falsch'}
          onClick={() => handleSelect('falsch')}
          disabled={disabled}
          className={[
            'flex-1 py-6 rounded-xl border-2 text-xl font-bold transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
            'disabled:cursor-default',
            selected === 'falsch'
              ? 'border-red-500 bg-red-500 text-white'
              : 'border-red-200 bg-red-50 text-red-700 hover:border-red-400 hover:bg-red-100',
          ].join(' ')}
        >
          Falsch
        </button>
      </div>
    </Card>
  );
}
