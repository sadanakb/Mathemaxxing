'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type EquationBalanceProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function BalanceScale({
  leftLabel,
  rightLabel,
  tilt,
}: {
  leftLabel: string;
  rightLabel: string;
  tilt: 'left' | 'right' | 'level' | 'neutral';
}) {
  const width = 360;
  const height = 220;
  const cx = width / 2;

  // Tilt angle in degrees
  const tiltAngle =
    tilt === 'left' ? -8 : tilt === 'right' ? 8 : 0;

  // Base / fulcrum
  const baseY = 190;
  const fulcrumY = 140;

  // Beam endpoints (before rotation)
  const beamHalfWidth = 130;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: width, width: '100%' }}
      role="img"
      aria-label={`Waage: links ${leftLabel}, rechts ${rightLabel}`}
    >
      {/* Base triangle */}
      <polygon
        points={`${cx - 20},${baseY} ${cx + 20},${baseY} ${cx},${fulcrumY}`}
        fill="#6b7280"
        stroke="#374151"
        strokeWidth={1.5}
      />

      {/* Beam group - rotates around fulcrum */}
      <g
        transform={`rotate(${tiltAngle}, ${cx}, ${fulcrumY})`}
        style={{ transition: 'transform 0.5s ease' }}
      >
        {/* Beam */}
        <line
          x1={cx - beamHalfWidth}
          y1={fulcrumY}
          x2={cx + beamHalfWidth}
          y2={fulcrumY}
          stroke="#374151"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Left pan strings */}
        <line
          x1={cx - beamHalfWidth}
          y1={fulcrumY}
          x2={cx - beamHalfWidth - 10}
          y2={fulcrumY + 30}
          stroke="#9ca3af"
          strokeWidth={1.5}
        />
        <line
          x1={cx - beamHalfWidth}
          y1={fulcrumY}
          x2={cx - beamHalfWidth + 10}
          y2={fulcrumY + 30}
          stroke="#9ca3af"
          strokeWidth={1.5}
        />

        {/* Left pan */}
        <ellipse
          cx={cx - beamHalfWidth}
          cy={fulcrumY + 35}
          rx={35}
          ry={8}
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth={1}
        />

        {/* Left label */}
        <text
          x={cx - beamHalfWidth}
          y={fulcrumY + 38}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="#1f2937"
          dominantBaseline="middle"
        >
          {leftLabel}
        </text>

        {/* Right pan strings */}
        <line
          x1={cx + beamHalfWidth}
          y1={fulcrumY}
          x2={cx + beamHalfWidth - 10}
          y2={fulcrumY + 30}
          stroke="#9ca3af"
          strokeWidth={1.5}
        />
        <line
          x1={cx + beamHalfWidth}
          y1={fulcrumY}
          x2={cx + beamHalfWidth + 10}
          y2={fulcrumY + 30}
          stroke="#9ca3af"
          strokeWidth={1.5}
        />

        {/* Right pan */}
        <ellipse
          cx={cx + beamHalfWidth}
          cy={fulcrumY + 35}
          rx={35}
          ry={8}
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth={1}
        />

        {/* Right label */}
        <text
          x={cx + beamHalfWidth}
          y={fulcrumY + 38}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="#1f2937"
          dominantBaseline="middle"
        >
          {rightLabel}
        </text>
      </g>

      {/* Fulcrum dot */}
      <circle cx={cx} cy={fulcrumY} r={5} fill="#374151" />
    </svg>
  );
}

export function EquationBalance({ exercise, onSubmit, disabled }: EquationBalanceProps) {
  const config = exercise.equationConfig ?? {
    left: 'x + 3',
    right: '7',
    variable: 'x',
    target: 4,
  };

  const { left, right, variable, target } = config;

  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const parsedAnswer = parseFloat(answer.replace(',', '.'));
  const isCorrect = !isNaN(parsedAnswer) && parsedAnswer === target;

  // Determine tilt based on whether student has submitted
  let tilt: 'left' | 'right' | 'level' | 'neutral' = 'neutral';
  if (submitted) {
    if (isCorrect) {
      tilt = 'level';
    } else if (!isNaN(parsedAnswer)) {
      tilt = parsedAnswer < target ? 'right' : 'left';
    }
  }

  // Highlight the variable in the expression labels
  const highlightVariable = (expr: string) => {
    return expr.replace(
      new RegExp(`\\b${variable}\\b`, 'g'),
      `[${variable}]`
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(answer.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim() && !disabled) {
      handleSubmit();
    }
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Finde den Wert von <strong>{variable}</strong>, damit die Waage im Gleichgewicht ist.
      </p>
      <p className="text-center text-lg font-mono font-semibold text-gray-700 mb-4">
        {highlightVariable(left)} = {highlightVariable(right)}
      </p>

      <div className="flex justify-center mb-6">
        <BalanceScale
          leftLabel={left}
          rightLabel={right}
          tilt={tilt}
        />
      </div>

      {submitted && tilt !== 'neutral' && (
        <p
          className={[
            'text-center text-sm font-medium mb-3',
            isCorrect ? 'text-emerald-600' : 'text-red-500',
          ].join(' ')}
          role="status"
        >
          {isCorrect
            ? 'Die Waage ist im Gleichgewicht!'
            : 'Die Waage ist nicht im Gleichgewicht. Versuche es nochmal.'}
        </p>
      )}

      <div className="flex items-center gap-3 justify-center mb-6">
        <label htmlFor="equation-answer" className="font-semibold text-gray-700">
          {variable} =
        </label>
        <input
          id="equation-answer"
          type="text"
          inputMode="decimal"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setSubmitted(false);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-24 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 disabled:opacity-50 disabled:bg-gray-50"
          placeholder="?"
          autoComplete="off"
          aria-label={`Wert fuer ${variable} eingeben`}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
