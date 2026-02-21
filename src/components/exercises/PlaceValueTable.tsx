'use client';

import { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type PlaceValueTableProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

type PlaceColumn = {
  label: string;
  shortLabel: string;
  factor: number;
};

const PLACE_COLUMNS: PlaceColumn[] = [
  { label: 'Zehntausender', shortLabel: 'ZT', factor: 10000 },
  { label: 'Tausender', shortLabel: 'T', factor: 1000 },
  { label: 'Hunderter', shortLabel: 'H', factor: 100 },
  { label: 'Zehner', shortLabel: 'Z', factor: 10 },
  { label: 'Einer', shortLabel: 'E', factor: 1 },
];

function getNeededColumns(num: number): PlaceColumn[] {
  const absNum = Math.abs(num);
  return PLACE_COLUMNS.filter((col) => absNum >= col.factor || col.factor === 1);
}

function decomposeNumber(num: number, columns: PlaceColumn[]): Record<string, number> {
  const result: Record<string, number> = {};
  let remaining = Math.abs(num);
  for (const col of columns) {
    result[col.shortLabel] = Math.floor(remaining / col.factor);
    remaining = remaining % col.factor;
  }
  return result;
}

function extractNumberFromQuestion(question: string): number | null {
  // Match numbers like 60.521 or 60521 in the question text
  const matches = question.match(/(\d[\d.]*\d|\d+)/g);
  if (!matches) return null;
  // Pick the largest number found (the full number, not small ones)
  let largest = 0;
  for (const m of matches) {
    const num = parseInt(m.replace(/\./g, ''), 10);
    if (num > largest) largest = num;
  }
  return largest > 0 ? largest : null;
}

export function PlaceValueTable({ exercise, onSubmit, disabled }: PlaceValueTableProps) {
  const targetNumber = typeof exercise.correctAnswer === 'number'
    ? exercise.correctAnswer
    : parseInt(String(exercise.correctAnswer), 10);

  // Extract full number from question for digit-query mode
  const fullNumber = extractNumberFromQuestion(exercise.question);

  // Detect digit-query mode: correctAnswer is a single digit (0-9) and the question
  // contains a much larger number
  const isDigitQuery = targetNumber >= 0 && targetNumber <= 9 && fullNumber !== null && fullNumber > 9;

  // Use the full number for columns in digit-query mode
  const displayNumber = isDigitQuery ? fullNumber! : targetNumber;
  const columns = getNeededColumns(displayNumber);
  const decomposed = isDigitQuery ? decomposeNumber(fullNumber!, columns) : null;

  const [answer, setAnswer] = useState('');

  // For composition mode: track all digits
  const [digits, setDigits] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const col of columns) {
      initial[col.shortLabel] = '';
    }
    return initial;
  });

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const setRef = useCallback(
    (label: string) => (el: HTMLInputElement | null) => {
      inputRefs.current[label] = el;
    },
    []
  );

  const handleDigitChange = (shortLabel: string, value: string) => {
    if (disabled) return;
    const cleaned = value.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => ({ ...prev, [shortLabel]: cleaned }));

    if (cleaned.length === 1) {
      const currentIndex = columns.findIndex((c) => c.shortLabel === shortLabel);
      const nextCol = columns[currentIndex + 1];
      if (nextCol) {
        inputRefs.current[nextCol.shortLabel]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, shortLabel: string) => {
    if (e.key === 'Backspace' && digits[shortLabel] === '') {
      const currentIndex = columns.findIndex((c) => c.shortLabel === shortLabel);
      const prevCol = columns[currentIndex - 1];
      if (prevCol) {
        inputRefs.current[prevCol.shortLabel]?.focus();
      }
    }
  };

  const handleSubmitCompose = () => {
    let composed = 0;
    for (const col of columns) {
      const digit = parseInt(digits[col.shortLabel] || '0', 10);
      composed += digit * col.factor;
    }
    onSubmit(String(composed));
  };

  const handleSubmitDigit = () => {
    onSubmit(answer);
  };

  if (isDigitQuery && decomposed) {
    // Digit-query mode: show pre-filled table, single input for the answer
    return (
      <Card className="mb-4">
        <p className="text-xl font-semibold text-gray-900 mb-2">
          {exercise.question}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Schau in die Stellenwerttafel und gib die gesuchte Ziffer ein.
        </p>

        <div className="overflow-x-auto mb-6">
          <table
            className="mx-auto border-collapse"
            role="table"
            aria-label="Stellenwerttafel"
          >
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.shortLabel}
                    className="px-4 py-2 text-center font-bold text-sm border-2 border-gray-300 bg-gray-100 text-gray-700 min-w-[60px]"
                    title={col.label}
                  >
                    {col.shortLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {columns.map((col) => (
                  <td
                    key={col.shortLabel}
                    className="px-2 py-2 text-center border-2 border-gray-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-gray-800 bg-gray-50 rounded-lg mx-auto">
                      {decomposed[col.shortLabel]}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={answer}
            onChange={(e) => {
              if (!disabled) setAnswer(e.target.value.replace(/[^0-9]/g, '').slice(-1));
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' && answer) handleSubmitDigit(); }}
            disabled={disabled}
            className="w-16 h-16 text-center text-3xl font-bold border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 disabled:opacity-50 disabled:bg-gray-50"
            aria-label="Gesuchte Ziffer eingeben"
          />
        </div>

        <Button
          onClick={handleSubmitDigit}
          disabled={disabled || answer === ''}
          fullWidth
          size="lg"
        >
          Prüfen
        </Button>
      </Card>
    );
  }

  // Composition mode: existing behavior
  const allFilled = columns.every((col) => digits[col.shortLabel] !== '');

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Trage die Ziffern in die richtige Stellenwerttafel ein.
      </p>

      <div className="overflow-x-auto mb-6">
        <table
          className="mx-auto border-collapse"
          role="table"
          aria-label="Stellenwerttafel"
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.shortLabel}
                  className="px-4 py-2 text-center font-bold text-sm border-2 border-gray-300 bg-gray-100 text-gray-700 min-w-[60px]"
                  title={col.label}
                >
                  {col.shortLabel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns.map((col) => (
                <td
                  key={col.shortLabel}
                  className="px-2 py-2 text-center border-2 border-gray-300"
                >
                  <input
                    ref={setRef(col.shortLabel)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digits[col.shortLabel]}
                    onChange={(e) => handleDigitChange(col.shortLabel, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, col.shortLabel)}
                    disabled={disabled}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 disabled:opacity-50 disabled:bg-gray-50"
                    aria-label={`${col.label}-Stelle`}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <Button
        onClick={handleSubmitCompose}
        disabled={disabled || !allFilled}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
