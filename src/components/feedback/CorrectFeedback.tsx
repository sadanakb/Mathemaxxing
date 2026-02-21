'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

type CorrectFeedbackProps = {
  explanation?: string;
  onNext: () => void;
};

export function CorrectFeedback({ explanation, onNext }: CorrectFeedbackProps) {
  useEffect(() => {
    // Auto-advance after 2s if no explanation
    if (!explanation) {
      const t = setTimeout(onNext, 1500);
      return () => clearTimeout(t);
    }
  }, [explanation, onNext]);

  return (
    <div
      className="mt-4 p-5 bg-emerald-50 border-2 border-emerald-300 rounded-[var(--card-radius)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl" aria-hidden="true">✅</span>
        <h3 className="text-lg font-bold text-emerald-800">Richtig!</h3>
      </div>
      {explanation && (
        <p className="text-sm text-emerald-700 mb-4">{explanation}</p>
      )}
      <Button variant="success" onClick={onNext} size="sm">
        Weiter →
      </Button>
    </div>
  );
}
