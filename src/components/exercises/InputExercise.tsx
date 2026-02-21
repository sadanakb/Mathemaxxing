'use client';

import { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MathFormula } from '@/components/math/MathFormula';
import type { Exercise } from '@/lib/curriculum/types';

type InputExerciseProps = {
  exercise: Exercise;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  showHint?: boolean;
  onShowHint?: () => void;
};

export function InputExercise({
  exercise,
  value,
  onChange,
  onSubmit,
  disabled,
  showHint,
  onShowHint,
}: InputExerciseProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [exercise.id, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim() && !disabled) {
      onSubmit();
    }
  };

  return (
    <Card className="mb-4">
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-900 mb-1">{exercise.question}</p>
        {exercise.questionLatex && (
          <MathFormula formula={exercise.questionLatex} display className="mt-2" />
        )}
      </div>

      <div className="mb-4">
        <Input
          ref={inputRef}
          label="Deine Antwort"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={exercise.answerType === 'fraction' ? 'z.B. 3/4 oder 0,75' : 'Antwort eingeben...'}
          type={exercise.answerType === 'number' ? 'text' : 'text'}
          inputMode={exercise.answerType === 'number' ? 'decimal' : 'text'}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <p className="text-xs text-gray-400 mt-1">
          Tipp: Komma als Dezimalzeichen erlaubt (z.B. 3,14)
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          size="md"
        >
          Prüfen ✓
        </Button>

        {exercise.hint && !showHint && !disabled && (
          <Button variant="ghost" size="md" onClick={onShowHint}>
            Tipp 💡
          </Button>
        )}
      </div>

      {showHint && exercise.hint && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Tipp:</strong> {exercise.hint}
          </p>
        </div>
      )}
    </Card>
  );
}
