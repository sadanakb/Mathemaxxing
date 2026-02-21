import { type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg' | 'none';
};

const variantClasses = {
  default: 'bg-[var(--color-surface)] shadow-[var(--card-shadow)] border-[var(--card-border)]',
  elevated: 'bg-[var(--color-surface)] shadow-lg',
  outlined: 'bg-[var(--color-surface)] border border-gray-200',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ variant = 'default', padding = 'md', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-[var(--card-radius)]',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
