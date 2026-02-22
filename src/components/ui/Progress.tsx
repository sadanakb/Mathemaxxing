'use client';

import { motion } from 'framer-motion';

type ProgressProps = {
  value: number;
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
};

const variantColors = {
  default: 'bg-[var(--color-primary)]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  gradient: 'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]',
};

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function Progress({
  value,
  max = 100,
  label,
  variant = 'default',
  size = 'md',
  showLabel,
  animated = true,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="flex justify-between mb-1.5 text-sm text-gray-600">
          {label && <span className="font-medium">{label}</span>}
          {showLabel && <span className="font-semibold">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={[
          'w-full bg-gray-100 rounded-full overflow-hidden',
          sizeClasses[size],
        ].join(' ')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Fortschritt'}
      >
        {animated ? (
          <motion.div
            className={[
              'rounded-full h-full',
              variantColors[variant],
            ].join(' ')}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={[
              'rounded-full transition-all duration-500 ease-out h-full',
              variantColors[variant],
            ].join(' ')}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
}
