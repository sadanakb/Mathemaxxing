'use client';

import { useEffect, useState } from 'react';

type TestTimerProps = {
  startSeconds: number;
  onTimeUp?: () => void;
  paused?: boolean;
};

export function TestTimer({ startSeconds, onTimeUp, paused = false }: TestTimerProps) {
  const [remaining, setRemaining] = useState(startSeconds);

  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) {
      onTimeUp?.();
      return;
    }
    const id = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(id);
          onTimeUp?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, onTimeUp, remaining]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isUrgent = remaining <= 60;

  return (
    <div
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-lg',
        isUrgent
          ? 'bg-red-100 text-red-700 animate-pulse'
          : 'bg-gray-100 text-gray-700',
      ].join(' ')}
      aria-live="polite"
      aria-label={`Restzeit: ${minutes} Minuten ${seconds} Sekunden`}
    >
      <span aria-hidden="true">⏱</span>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
