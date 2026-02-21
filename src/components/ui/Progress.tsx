type ProgressProps = {
  value: number;     // 0–100
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
};

const variantColors = {
  default: 'bg-[var(--color-primary)]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function Progress({ value, max = 100, label, variant = 'default', size = 'md', showLabel }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="flex justify-between mb-1 text-sm text-gray-600">
          {label && <span>{label}</span>}
          {showLabel && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={['w-full bg-gray-200 rounded-[var(--btn-radius)] overflow-hidden', sizeClasses[size]].join(' ')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Fortschritt'}
      >
        <div
          className={['rounded-[var(--btn-radius)] transition-all duration-500 ease-out', variantColors[variant], sizeClasses[size]].join(' ')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
