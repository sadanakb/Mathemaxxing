'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import type { Exercise } from '@/lib/curriculum/types';

type SpeedQuizProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function SpeedQuiz({ exercise, onSubmit, disabled }: SpeedQuizProps) {
  const timeLimit = exercise.timeLimit ?? 15;
  const [remaining, setRemaining] = useState(timeLimit);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const doSubmit = useCallback(
    (value: string) => {
      if (submitted) return;
      setSubmitted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onSubmit(value);
    },
    [submitted, onSubmit]
  );

  // Start timer
  useEffect(() => {
    if (disabled || submitted) return;

    inputRef.current?.focus();

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 0.1;
        if (next <= 0) {
          return 0;
        }
        return Math.round(next * 10) / 10;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [disabled, submitted]);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (remaining <= 0 && !submitted) {
      doSubmit(answer);
    }
  }, [remaining, answer, submitted, doSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitted) {
      doSubmit(answer);
    }
  };

  // Progress bar color
  const fraction = remaining / timeLimit;
  const barColor =
    fraction > 0.5 ? 'bg-emerald-500' : fraction > 0.25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <Card className="mb-4">
      {/* Timer bar */}
      <div className="mb-4" role="timer" aria-label={`${Math.ceil(remaining)} Sekunden verbleibend`}>
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
          <span>Zeit</span>
          <span>{Math.ceil(remaining)}s</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-100 ${barColor}`}
            style={{ width: `${fraction * 100}%` }}
          />
        </div>
      </div>

      <p className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        {exercise.question}
      </p>

      <div className="flex justify-center mb-4">
        <input
          ref={inputRef}
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || submitted}
          placeholder="Antwort"
          className={[
            'w-40 text-center text-2xl font-bold p-3 rounded-xl border-2 transition-colors',
            'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'border-gray-300',
          ].join(' ')}
          aria-label="Schnellantwort eingeben"
        />
      </div>

      <p className="text-center text-sm text-gray-500">
        Drücke Enter zum Abgeben
      </p>
    </Card>
  );
}
