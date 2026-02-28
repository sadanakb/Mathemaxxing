'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { MapNode as MapNodeType } from '@/lib/curriculum/map-layout';

const MASTERY_STYLES = {
  'not-started': 'bg-gray-100 border-gray-200 text-gray-400',
  introduced: 'bg-blue-50 border-blue-200 text-blue-600',
  practicing: 'bg-amber-50 border-amber-200 text-amber-600',
  mastered: 'bg-emerald-50 border-emerald-300 text-emerald-600',
} as const;

const MASTERY_RING_COLORS = {
  'not-started': '#D1D5DB',
  introduced: '#93C5FD',
  practicing: '#FCD34D',
  mastered: 'var(--color-primary)',
} as const;

function MasteryRing({ mastery, stars }: { mastery: string; stars: number }) {
  const ringColor = MASTERY_RING_COLORS[mastery as keyof typeof MASTERY_RING_COLORS] ?? '#D1D5DB';
  const progress = mastery === 'mastered' ? 1 : mastery === 'practicing' ? 0.66 : mastery === 'introduced' ? 0.33 : 0;
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0" aria-hidden="true">
      {/* Background ring */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="3" />
      {/* Progress ring */}
      <circle
        cx="32" cy="32" r="28"
        fill="none"
        stroke={ringColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 32 32)"
        className="transition-all duration-500"
      />
      {/* Stars */}
      {stars > 0 && (
        <g>
          {Array.from({ length: 3 }).map((_, i) => (
            <circle
              key={i}
              cx={24 + i * 8}
              cy="56"
              r="3"
              fill={i < stars ? '#FBBF24' : '#E5E7EB'}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

export function MapNodeComponent({ node }: { node: MapNodeType }) {
  const style = MASTERY_STYLES[node.mastery];
  const isNext = !node.locked && node.mastery === 'not-started';

  if (node.locked) {
    return (
      <div
        className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center opacity-40 cursor-not-allowed"
        title={node.title}
        aria-label={`${node.title} (gesperrt)`}
      >
        <Icon name="lock" size={18} className="text-gray-400" />
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${node.topicId}`}
      className="relative w-16 h-16 rounded-full flex items-center justify-center transition hover:scale-110 hover:shadow-lg group"
      style={!node.locked && node.mastery !== 'not-started' ? { boxShadow: 'var(--world-glow)' } : undefined}
      title={node.title}
      aria-label={`${node.title} — ${node.mastery}`}
    >
      <MasteryRing mastery={node.mastery} stars={node.stars} />

      {/* Inner circle */}
      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${style}`}>
        {node.mastery === 'mastered' ? (
          <Icon name="check" size={16} className="text-emerald-600" />
        ) : (
          <span className="text-[8px] font-bold text-center leading-tight line-clamp-2 px-0.5">
            {node.title.split(' ').slice(0, 2).join(' ')}
          </span>
        )}
      </div>

      {/* Pulse animation for next unlocked node */}
      {isNext && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Tooltip on hover */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
        {node.title}
      </div>
    </Link>
  );
}
