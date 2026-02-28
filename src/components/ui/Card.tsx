'use client';

import { type HTMLAttributes, type CSSProperties } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'interactive' | 'world';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  themed?: boolean;
};

const variantClasses = {
  default: 'bg-[var(--color-surface)] shadow-[var(--card-shadow)] border border-[var(--card-border)]',
  elevated: 'bg-[var(--color-surface)] shadow-lg border border-gray-100',
  outlined: 'bg-[var(--color-surface)] border-2 border-gray-200',
  glass: 'bg-white/70 backdrop-blur-md border border-white/50 shadow-lg',
  gradient: 'bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 border border-[var(--color-primary)]/10',
  interactive: [
    'bg-[var(--color-surface)] shadow-[var(--card-shadow)] border border-[var(--card-border)]',
    'hover:-translate-y-1 hover:shadow-lg',
    'transition-all duration-200 cursor-pointer',
  ].join(' '),
  world: 'bg-[var(--color-surface)] shadow-[var(--card-shadow)] border-[length:var(--world-border-width)] border-[var(--world-border-color)]',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ variant = 'default', padding = 'md', themed = false, className = '', style, children, ...props }: CardProps) {
  const themedStyle: CSSProperties | undefined = themed
    ? {
        backgroundImage: 'var(--world-card-bg)',
        boxShadow: variant === 'interactive' ? 'var(--card-shadow), var(--world-glow)' : undefined,
        borderColor: 'var(--world-border-color)',
        ...style,
      }
    : style;

  return (
    <div
      className={[
        'rounded-[var(--card-radius)]',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      style={themedStyle}
      {...props}
    >
      {children}
    </div>
  );
}
