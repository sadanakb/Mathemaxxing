'use client';

import { type ReactNode } from 'react';

type StatPillProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  color?: string;
  className?: string;
};

export function StatPill({ icon, label, value, color, className = '' }: StatPillProps) {
  return (
    <div
      className={[
        'flex items-center gap-2.5 px-4 py-2.5',
        'bg-white/80 backdrop-blur-sm rounded-full',
        'border border-gray-100 shadow-sm',
        'min-w-fit whitespace-nowrap',
        className,
      ].join(' ')}
    >
      <span className="flex-shrink-0" style={color ? { color } : undefined}>
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
}
