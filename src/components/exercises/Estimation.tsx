'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type EstimationProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function Estimation({ exercise, onSubmit, disabled }: EstimationProps) {
  const correctAnswer = Number(exercise.correctAnswer) || 0;
  const tolerance = exercise.tolerance ?? 10;

  // Calculate reasonable slider range
  const { min, max, step } = useMemo(() => {
    const range = Math.max(Math.abs(correctAnswer) * 0.5, tolerance * 3, 10);
    const rawMin = Math.floor(correctAnswer - range);
    const rawMax = Math.ceil(correctAnswer + range);
    // Use nice round numbers
    const s = range > 100 ? 5 : range > 50 ? 2 : 1;
    const m = Math.floor(rawMin / s) * s;
    const x = Math.ceil(rawMax / s) * s;
    return { min: m, max: x, step: s };
  }, [correctAnswer, tolerance]);

  const midpoint = Math.round((min + max) / 2);
  const [value, setValue] = useState(midpoint);

  const handleSubmit = () => {
    onSubmit(String(value));
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Schaetze den Wert mit dem Schieberegler.
        {exercise.hint ? ` Hinweis: ${exercise.hint}` : ''}
      </p>

      {/* Large value display */}
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-[var(--color-primary)]">
          {value}
        </span>
      </div>

      {/* Slider */}
      <div className="mb-6 px-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          disabled={disabled}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
          aria-label={`Schaetzung: ${value}`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{min}</span>
          <span>{Math.round((min + max) / 2)}</span>
          <span>{max}</span>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={disabled} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
