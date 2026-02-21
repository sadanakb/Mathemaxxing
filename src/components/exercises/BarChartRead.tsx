'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type BarChartReadProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function BarChartRead({ exercise, onSubmit, disabled }: BarChartReadProps) {
  const chartData = exercise.chartData ?? [];
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Chart dimensions
  const barWidth = 50;
  const barGap = 30;
  const chartPaddingLeft = 50;
  const chartPaddingRight = 20;
  const chartPaddingTop = 20;
  const chartPaddingBottom = 40;
  const chartHeight = 250;

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);
  // Round up to nice number
  const niceMax = Math.ceil(maxValue / 5) * 5 || 10;
  const barAreaHeight = chartHeight - chartPaddingTop - chartPaddingBottom;
  const totalWidth =
    chartPaddingLeft + chartData.length * (barWidth + barGap) - barGap + chartPaddingRight;

  // Y-axis gridlines (5 steps)
  const ySteps = 5;
  const yStepValue = niceMax / ySteps;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Lies den Wert aus dem Diagramm ab und gib ihn ein.
      </p>

      <div className="flex justify-center mb-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalWidth} ${chartHeight}`}
          style={{ maxWidth: totalWidth, width: '100%', minWidth: 280 }}
          role="img"
          aria-label="Balkendiagramm"
        >
          {/* Y-axis gridlines and labels */}
          {Array.from({ length: ySteps + 1 }, (_, i) => {
            const value = i * yStepValue;
            const y = chartPaddingTop + barAreaHeight - (value / niceMax) * barAreaHeight;
            return (
              <g key={`y-${i}`}>
                <line
                  x1={chartPaddingLeft}
                  y1={y}
                  x2={totalWidth - chartPaddingRight}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
                <text
                  x={chartPaddingLeft - 8}
                  y={y + 4}
                  fontSize="11"
                  fill="#6b7280"
                  textAnchor="end"
                >
                  {Math.round(value)}
                </text>
              </g>
            );
          })}

          {/* Y-axis line */}
          <line
            x1={chartPaddingLeft}
            y1={chartPaddingTop}
            x2={chartPaddingLeft}
            y2={chartPaddingTop + barAreaHeight}
            stroke="#374151"
            strokeWidth={2}
          />

          {/* X-axis line */}
          <line
            x1={chartPaddingLeft}
            y1={chartPaddingTop + barAreaHeight}
            x2={totalWidth - chartPaddingRight}
            y2={chartPaddingTop + barAreaHeight}
            stroke="#374151"
            strokeWidth={2}
          />

          {/* Bars */}
          {chartData.map((d, i) => {
            const barH = (d.value / niceMax) * barAreaHeight;
            const x = chartPaddingLeft + i * (barWidth + barGap) + barGap / 2;
            const y = chartPaddingTop + barAreaHeight - barH;

            return (
              <g key={`bar-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  fill="var(--color-primary)"
                  rx={3}
                  ry={3}
                />
                {/* Value on top of bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  fontSize="11"
                  fill="var(--color-primary)"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {d.value}
                </text>
                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={chartPaddingTop + barAreaHeight + 18}
                  fontSize="11"
                  fill="#374151"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Answer input */}
      <div className="flex justify-center gap-3 mb-4">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Wert eingeben"
          className={[
            'w-40 text-center text-xl font-bold p-3 rounded-xl border-2 transition-colors',
            'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'border-gray-300',
          ].join(' ')}
          aria-label="Abgelesenen Wert eingeben"
        />
      </div>

      <Button onClick={handleSubmit} disabled={disabled || answer === ''} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
