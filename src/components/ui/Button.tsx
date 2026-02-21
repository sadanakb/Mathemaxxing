'use client';

import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:brightness-110 active:brightness-90 focus-visible:ring-2 ring-[var(--color-primary)]',
  secondary:
    'bg-[var(--color-secondary)] text-gray-900 hover:brightness-110 active:brightness-90',
  ghost:
    'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)]',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  success:
    'bg-emerald-500 text-white hover:bg-emerald-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-[var(--btn-radius)]',
  md: 'px-5 py-2.5 text-base rounded-[var(--btn-radius)]',
  lg: 'px-8 py-3.5 text-lg rounded-[var(--btn-radius)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
