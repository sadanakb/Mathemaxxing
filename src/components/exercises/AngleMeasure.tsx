'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type AngleMeasureProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

export function AngleMeasure({ exercise, onSubmit, disabled }: AngleMeasureProps) {
  const targetAngle = exercise.angleTarget ?? 90;
  const tolerance = exercise.tolerance ?? 5;
  const [angle, setAngle] = useState(0);

  const handleSubmit = () => {
    onSubmit(String(angle));
  };

  // SVG dimensions
  const cx = 150;
  const cy = 150;
  const radius = 100;
  const svgSize = 300;

  // Ray endpoints
  const ray1X = cx + radius;
  const ray1Y = cy;
  // Target angle ray (the actual angle displayed)
  const targetRad = (targetAngle * Math.PI) / 180;
  const ray2X = cx + radius * Math.cos(-targetRad);
  const ray2Y = cy + radius * Math.sin(-targetRad);

  // User's angle ray (interactive)
  const userRad = (angle * Math.PI) / 180;
  const userRayX = cx + radius * Math.cos(-userRad);
  const userRayY = cy + radius * Math.sin(-userRad);

  // Arc for the displayed angle (from 0 to target)
  const arcRadius = 40;
  const arcEndX = cx + arcRadius * Math.cos(-targetRad);
  const arcEndY = cy + arcRadius * Math.sin(-targetRad);
  const largeArc = targetAngle > 180 ? 1 : 0;

  // Arc for user's angle
  const userArcEndX = cx + arcRadius * Math.cos(-userRad);
  const userArcEndY = cy + arcRadius * Math.sin(-userRad);
  const userLargeArc = angle > 180 ? 1 : 0;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Miss den Winkel. Toleranz: +/- {tolerance} Grad.
      </p>

      <div className="flex justify-center mb-4">
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ maxWidth: svgSize, width: '100%' }}
          role="img"
          aria-label={`Winkel messen`}
        >
          {/* Grid dots for reference */}
          {Array.from({ length: 7 }, (_, i) =>
            Array.from({ length: 7 }, (_, j) => (
              <circle
                key={`dot-${i}-${j}`}
                cx={25 + i * 42}
                cy={25 + j * 42}
                r={1}
                fill="#e5e7eb"
              />
            ))
          )}

          {/* First ray (horizontal, fixed) */}
          <line
            x1={cx}
            y1={cy}
            x2={ray1X}
            y2={ray1Y}
            stroke="#374151"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Second ray (the target angle) */}
          <line
            x1={cx}
            y1={cy}
            x2={ray2X}
            y2={ray2Y}
            stroke="#374151"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Target angle arc */}
          <path
            d={`M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke="#9ca3af"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />

          {/* User's angle ray (interactive indicator) */}
          <line
            x1={cx}
            y1={cy}
            x2={userRayX}
            y2={userRayY}
            stroke="var(--color-primary)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="6 3"
            opacity={0.8}
          />

          {/* User's angle arc */}
          {angle > 0 && (
            <path
              d={`M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${userLargeArc} 0 ${userArcEndX} ${userArcEndY}`}
              fill="var(--color-primary)"
              fillOpacity={0.15}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          )}

          {/* Vertex point */}
          <circle cx={cx} cy={cy} r={4} fill="#374151" />

          {/* Angle label */}
          <text
            x={cx + 55}
            y={cy - 10}
            fontSize="14"
            fill="var(--color-primary)"
            fontWeight="bold"
            textAnchor="middle"
          >
            {angle}&deg;
          </text>
        </svg>
      </div>

      {/* Slider input */}
      <div className="mb-4">
        <label htmlFor="angle-slider" className="block text-sm font-medium text-gray-600 mb-2">
          Winkel einstellen: {angle} Grad
        </label>
        <input
          id="angle-slider"
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          disabled={disabled}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
          aria-label="Winkel in Grad einstellen"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0&deg;</span>
          <span>90&deg;</span>
          <span>180&deg;</span>
          <span>270&deg;</span>
          <span>360&deg;</span>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={disabled} fullWidth size="lg">
        Prüfen
      </Button>
    </Card>
  );
}
