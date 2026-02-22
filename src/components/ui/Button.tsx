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
  primary: [
    'bg-[var(--color-primary)] text-white',
    'shadow-[0_4px_0_var(--color-primary-dark)]',
    'hover:brightness-110',
    'active:translate-y-[2px] active:shadow-[0_2px_0_var(--color-primary-dark)]',
    'focus-visible:ring-2 ring-[var(--color-primary)] ring-offset-2',
  ].join(' '),
  secondary: [
    'bg-[var(--color-secondary)] text-gray-900',
    'shadow-[0_4px_0_var(--color-secondary-dark)]',
    'hover:brightness-110',
    'active:translate-y-[2px] active:shadow-[0_2px_0_var(--color-secondary-dark)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--color-primary)]',
    'border-2 border-[var(--color-primary)]',
    'hover:bg-[var(--color-primary)]/10',
    'active:bg-[var(--color-primary)]/20',
  ].join(' '),
  danger: [
    'bg-red-500 text-white',
    'shadow-[0_4px_0_#dc2626]',
    'hover:bg-red-600',
    'active:translate-y-[2px] active:shadow-[0_2px_0_#dc2626]',
  ].join(' '),
  success: [
    'bg-emerald-500 text-white',
    'shadow-[0_4px_0_#059669]',
    'hover:bg-emerald-600',
    'active:translate-y-[2px] active:shadow-[0_2px_0_#059669]',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-[var(--btn-radius)]',
  md: 'px-6 py-3 text-base rounded-[var(--btn-radius)]',
  lg: 'px-8 py-4 text-lg rounded-[var(--btn-radius)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center gap-2',
          'font-[family-name:var(--font-heading)] font-bold',
          'transition-all duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0',
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
