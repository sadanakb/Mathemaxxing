'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type CalculationPyramidProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function buildPyramid(base: number[]): number[][] {
  const pyramid: number[][] = [base];
  let currentRow = base;
  while (currentRow.length > 1) {
    const nextRow: number[] = [];
    for (let i = 0; i < currentRow.length - 1; i++) {
      nextRow.push(currentRow[i] + currentRow[i + 1]);
    }
    pyramid.push(nextRow);
    currentRow = nextRow;
  }
  return pyramid;
}

type CellInfo = {
  row: number;
  col: number;
  value: number;
  prefilled: boolean;
};

export function CalculationPyramid({ exercise, onSubmit, disabled }: CalculationPyramidProps) {
  const base = exercise.pyramidBase ?? [3, 5, 2, 4];

  const { pyramid, cellInfos } = useMemo(() => {
    const pyr = buildPyramid(base);
    const infos: CellInfo[] = [];
    for (let row = 0; row < pyr.length; row++) {
      for (let col = 0; col < pyr[row].length; col++) {
        // Pre-fill: base row (row 0) and top cell
        const isBase = row === 0;
        const isTop = row === pyr.length - 1;
        infos.push({
          row,
          col,
          value: pyr[row][col],
          prefilled: isBase || isTop,
        });
      }
    }
    return { pyramid: pyr, cellInfos: infos };
  }, [base]);

  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const info of cellInfos) {
      if (!info.prefilled) {
        initial[`${info.row}-${info.col}`] = '';
      }
    }
    return initial;
  });

  const handleChange = useCallback(
    (key: string, value: string) => {
      if (disabled) return;
      const cleaned = value.replace(/[^0-9-]/g, '');
      setInputs((prev) => ({ ...prev, [key]: cleaned }));
    },
    [disabled]
  );

  const handleSubmit = () => {
    // Collect all values: prefilled + user inputs
    const result: Record<string, string> = {};
    for (const info of cellInfos) {
      const key = `${info.row}-${info.col}`;
      if (info.prefilled) {
        result[key] = String(info.value);
      } else {
        result[key] = inputs[key] || '0';
      }
    }
    onSubmit(JSON.stringify(result));
  };

  const totalRows = pyramid.length;
  const maxCols = pyramid[0].length;
  const cellWidth = 70;
  const cellHeight = 52;
  const gapX = 8;
  const gapY = 12;

  // Render rows from top (pyramid[totalRows-1]) to bottom (pyramid[0])
  // Visual: top of SVG = top of pyramid
  const renderRows = [...pyramid].reverse();
  const renderInfos = [...cellInfos];

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Zahlenmauer: Jeder Stein ist die Summe der beiden Steine darunter.
      </p>

      <div className="flex justify-center mb-6 overflow-x-auto" role="group" aria-label="Zahlenmauer">
        <div className="flex flex-col items-center gap-3">
          {renderRows.map((row, visualRow) => {
            const actualRow = totalRows - 1 - visualRow;
            const rowWidth = row.length * (cellWidth + gapX) - gapX;
            const maxRowWidth = maxCols * (cellWidth + gapX) - gapX;
            const offsetX = (maxRowWidth - rowWidth) / 2;

            return (
              <div
                key={actualRow}
                className="flex gap-2"
                style={{ marginLeft: offsetX, marginRight: offsetX }}
              >
                {row.map((_, colIdx) => {
                  const info = renderInfos.find(
                    (c) => c.row === actualRow && c.col === colIdx
                  );
                  if (!info) return null;

                  const key = `${info.row}-${info.col}`;

                  return (
                    <div
                      key={key}
                      className={[
                        'flex items-center justify-center rounded-lg border-2 font-bold text-lg',
                        info.prefilled
                          ? 'bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-gray-900'
                          : 'border-gray-300 bg-white',
                      ].join(' ')}
                      style={{ width: cellWidth, height: cellHeight }}
                    >
                      {info.prefilled ? (
                        <span aria-label={`Vorgegeben: ${info.value}`}>
                          {info.value}
                        </span>
                      ) : (
                        <input
                          type="text"
                          inputMode="numeric"
                          value={inputs[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          disabled={disabled}
                          className="w-full h-full text-center text-lg font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 rounded-lg disabled:opacity-50"
                          aria-label={`Stein Reihe ${info.row + 1}, Spalte ${info.col + 1}`}
                          maxLength={5}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
