'use client';

import { Button } from '@/components/ui/Button';
import { MathFormula } from '@/components/math/MathFormula';

type WrongFeedbackProps = {
  correctAnswer: string;
  correctAnswerLatex?: string;
  explanation?: string;
  onNext: () => void;
};

export function WrongFeedback({ correctAnswer, correctAnswerLatex, explanation, onNext }: WrongFeedbackProps) {
  return (
    <div
      className="mt-4 p-5 bg-red-50 border-2 border-red-300 rounded-[var(--card-radius)]"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl" aria-hidden="true">❌</span>
        <h3 className="text-lg font-bold text-red-800">Nicht ganz!</h3>
      </div>
      <p className="text-sm text-red-700 mb-1">
        Die richtige Antwort ist:{' '}
        {correctAnswerLatex ? (
          <MathFormula formula={correctAnswerLatex} className="text-red-900 font-bold" />
        ) : (
          <strong className="text-red-900">{correctAnswer}</strong>
        )}
      </p>
      {explanation && (
        <p className="text-sm text-red-700 mb-4">{explanation}</p>
      )}
      <Button variant="danger" onClick={onNext} size="sm">
        Weiter →
      </Button>
    </div>
  );
}
