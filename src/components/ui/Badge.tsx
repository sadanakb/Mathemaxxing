import { type ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gymnasium'
  | 'realschule'
  | 'hauptschule'
  | 'gesamtschule'
  | 'grundschule';

type BadgeProps = {
  variant?: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  gymnasium: 'bg-purple-100 text-purple-800 font-semibold',
  realschule: 'bg-blue-100 text-blue-800 font-semibold',
  hauptschule: 'bg-emerald-100 text-emerald-800 font-semibold',
  gesamtschule: 'bg-teal-100 text-teal-800 font-semibold',
  grundschule: 'bg-orange-100 text-orange-700 font-semibold',
};

export function Badge({ variant = 'default', children, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
