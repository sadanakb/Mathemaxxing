'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ClockFace } from '@/components/exercises/svg/ClockFace';
import type { Exercise } from '@/lib/curriculum/types';

type ClockDragExerciseProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function ClockDragExercise({ exercise, onSubmit, disabled }: ClockDragExerciseProps) {
  const target = exercise.clockTarget ?? { hours: 3, minutes: 30 };

  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const handleTimeChange = useCallback(
    (newHours: number, newMinutes: number) => {
      if (disabled) return;
      setHours(newHours);
      setMinutes(newMinutes);
    },
    [disabled]
  );

  const incrementHour = () => {
    if (disabled) return;
    setHours((prev) => (prev % 12) + 1);
  };

  const decrementHour = () => {
    if (disabled) return;
    setHours((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const incrementMinute = () => {
    if (disabled) return;
    setMinutes((prev) => (prev + 5) % 60);
  };

  const decrementMinute = () => {
    if (disabled) return;
    setMinutes((prev) => (prev - 5 + 60) % 60);
  };

  const handleSubmit = () => {
    const formatted = `${hours}:${String(minutes).padStart(2, '0')}`;
    onSubmit(formatted);
  };

  const displayTime = `${hours}:${String(minutes).padStart(2, '0')}`;
  const targetTime = `${target.hours}:${String(target.minutes).padStart(2, '0')}`;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Stelle die Uhr auf <strong>{targetTime}</strong>. Klicke auf die Uhr oder benutze die Tasten.
      </p>

      <div className="flex justify-center mb-4">
        <ClockFace
          hours={hours}
          minutes={minutes}
          interactive={!disabled}
          onTimeChange={handleTimeChange}
          size={240}
          className={disabled ? 'opacity-70' : 'cursor-pointer'}
        />
      </div>

      {/* Current time display */}
      <p className="text-center text-2xl font-bold text-gray-900 mb-4" aria-live="polite">
        {displayTime}
      </p>

      {/* Hour and minute controls */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-gray-500 uppercase">Stunden</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decrementHour}
              disabled={disabled}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Stunde verringern"
            >
              -
            </button>
            <span className="w-10 text-center text-xl font-bold text-gray-900">
              {hours}
            </span>
            <button
              type="button"
              onClick={incrementHour}
              disabled={disabled}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Stunde erhoehen"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-gray-500 uppercase">Minuten</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decrementMinute}
              disabled={disabled}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Minuten verringern"
            >
              -
            </button>
            <span className="w-10 text-center text-xl font-bold text-gray-900">
              {String(minutes).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={incrementMinute}
              disabled={disabled}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Minuten erhoehen"
            >
              +
            </button>
          </div>
        </div>
      </div>

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
