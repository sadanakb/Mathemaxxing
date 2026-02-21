'use client';

import { Card } from '@/components/ui/Card';
import type { Exercise } from '@/lib/curriculum/types';

type MCExerciseProps = {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
};

export function MCExercise({ exercise, onAnswer, disabled, selectedAnswer, onSelect }: MCExerciseProps) {
  const options =
    exercise.answerType === 'true-false'
      ? ['Wahr', 'Falsch']
      : [String(exercise.correctAnswer), ...(exercise.distractors?.map(String) ?? [])].sort(
          () => Math.random() - 0.5
        );

  // Deduplicate options for true/false
  const uniqueOptions = Array.from(new Set(options));

  const handleSelect = (option: string) => {
    if (disabled) return;
    onSelect(option);
    onAnswer(option.toLowerCase());
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-6">{exercise.question}</p>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Antwortmöglichkeiten"
      >
        {uniqueOptions.map((option) => {
          const isSelected = selectedAnswer === option.toLowerCase();
          return (
            <button
              key={option}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(option)}
              disabled={disabled}
              className={[
                'p-4 rounded-xl border-2 text-left font-medium transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
                'disabled:cursor-default',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              ].join(' ')}
            >
              {option}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
