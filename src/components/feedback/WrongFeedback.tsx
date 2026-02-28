'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MathFormula } from '@/components/math/MathFormula';

type WrongFeedbackProps = {
  correctAnswer: string;
  correctAnswerLatex?: string;
  explanation?: string;
  onNext: () => void;
};

function displayAnswer(answer: string): string {
  const lower = answer.toLowerCase();
  if (lower === 'true' || lower === 'wahr') return 'Wahr';
  if (lower === 'false' || lower === 'falsch') return 'Falsch';
  return answer;
}

export function WrongFeedback({ correctAnswer, correctAnswerLatex, explanation, onNext }: WrongFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="mt-4 p-5 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-red-300/60 rounded-[var(--card-radius)]"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0">
          <Icon name="x" size={18} color="white" />
        </div>
        <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold text-red-800">
          Nicht ganz!
        </h3>
      </div>
      <p className="text-sm text-red-700 mb-1 ml-11">
        Die richtige Antwort ist:{' '}
        {correctAnswerLatex ? (
          <MathFormula formula={correctAnswerLatex} className="text-red-900 font-bold" />
        ) : (
          <strong className="text-red-900">{displayAnswer(correctAnswer)}</strong>
        )}
      </p>
      {explanation && (
        <p className="text-sm text-red-600 mb-4 ml-11">{explanation}</p>
      )}
      <Button variant="danger" onClick={onNext} size="sm">
        Weiter
        <Icon name="chevron-right" size={16} />
      </Button>
    </motion.div>
  );
}
