'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type FillTableProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function FillTable({ exercise, onSubmit, disabled }: FillTableProps) {
  const config = exercise.tableConfig ?? { headers: [], rows: [], correctRows: [] };
  const { headers, rows } = config;

  // Initialize cell values: pre-filled strings stay, nulls become empty strings
  const [cells, setCells] = useState<string[][]>(() =>
    rows.map((row) => row.map((cell) => cell ?? ''))
  );

  const updateCell = useCallback(
    (rowIdx: number, colIdx: number, value: string) => {
      if (disabled) return;
      setCells((prev) => {
        const next = prev.map((row) => [...row]);
        next[rowIdx][colIdx] = value;
        return next;
      });
    },
    [disabled]
  );

  const handleSubmit = () => {
    onSubmit(JSON.stringify(cells));
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Fuelle die leeren Felder in der Tabelle aus.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse" role="table" aria-label="Tabelle zum Ausfuellen">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((originalValue, cIdx) => {
                  const isEditable = originalValue === null;
                  return (
                    <td
                      key={cIdx}
                      className={[
                        'px-4 py-2 border border-gray-200',
                        isEditable ? 'bg-[var(--color-primary)]/5' : 'bg-white',
                      ].join(' ')}
                    >
                      {isEditable ? (
                        <input
                          type="text"
                          value={cells[rIdx]?.[cIdx] ?? ''}
                          onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                          disabled={disabled}
                          className={[
                            'w-full px-2 py-1 text-center font-medium rounded border-2 transition-colors',
                            'focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30',
                            'disabled:bg-gray-100 disabled:cursor-not-allowed',
                            'border-[var(--color-primary)]/30 bg-white',
                          ].join(' ')}
                          aria-label={`${headers[cIdx] ?? 'Spalte'} Zeile ${rIdx + 1}`}
                        />
                      ) : (
                        <span className="font-medium text-gray-800">
                          {originalValue}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={handleSubmit} disabled={disabled} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
