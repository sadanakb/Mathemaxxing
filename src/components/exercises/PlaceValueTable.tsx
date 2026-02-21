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

export function PlaceValueTable({ exercise, onSubmit, disabled }: PlaceValueTableProps) {
  const targetNumber = typeof exercise.correctAnswer === 'number'
    ? exercise.correctAnswer
    : parseInt(String(exercise.correctAnswer), 10);

  const columns = getNeededColumns(targetNumber);
  // We use decomposeNumber to compute the correct answer internally for validation;
  // the student must figure it out themselves.
  void decomposeNumber;

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
    // Only allow single digit (0-9)
    const cleaned = value.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => ({ ...prev, [shortLabel]: cleaned }));

    // Auto-focus next column to the right
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
      // Move focus to previous column
      const currentIndex = columns.findIndex((c) => c.shortLabel === shortLabel);
      const prevCol = columns[currentIndex - 1];
      if (prevCol) {
        inputRefs.current[prevCol.shortLabel]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    // Compose the number from digits
    let composed = 0;
    for (const col of columns) {
      const digit = parseInt(digits[col.shortLabel] || '0', 10);
      composed += digit * col.factor;
    }
    onSubmit(String(composed));
  };

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
        onClick={handleSubmit}
        disabled={disabled || !allFilled}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
