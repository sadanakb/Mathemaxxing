'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

type CorrectFeedbackProps = {
  explanation?: string;
  onNext: () => void;
};

export function CorrectFeedback({ explanation, onNext }: CorrectFeedbackProps) {
  useEffect(() => {
    if (!explanation) {
      const t = setTimeout(onNext, 1500);
      return () => clearTimeout(t);
    }
  }, [explanation, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="mt-4 p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 rounded-[var(--card-radius)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Icon name="check" size={18} color="white" />
        </div>
        <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold text-emerald-800">
          Richtig!
        </h3>
      </div>
      {explanation && (
        <p className="text-sm text-emerald-700 mb-4 ml-11">{explanation}</p>
      )}
      <Button variant="success" onClick={onNext} size="sm">
        Weiter
        <Icon name="chevron-right" size={16} />
      </Button>
    </motion.div>
  );
}
