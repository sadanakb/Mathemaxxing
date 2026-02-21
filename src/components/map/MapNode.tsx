'use client';

import Link from 'next/link';
import type { MapNode as MapNodeType } from '@/lib/curriculum/map-layout';

const MASTERY_STYLES = {
  'not-started': 'bg-gray-200 border-gray-300 text-gray-400',
  introduced: 'bg-blue-100 border-blue-300 text-blue-600',
  practicing: 'bg-amber-100 border-amber-300 text-amber-600',
  mastered: 'bg-emerald-100 border-emerald-300 text-emerald-600',
} as const;

const STAR_DISPLAY = ['', '1', '2', '3'] as const;

export function MapNodeComponent({ node }: { node: MapNodeType }) {
  const style = MASTERY_STYLES[node.mastery];

  if (node.locked) {
    return (
      <div
        className="w-16 h-16 rounded-2xl bg-gray-100 border-2 border-gray-200 flex flex-col items-center justify-center opacity-50 cursor-not-allowed"
        title={node.title}
        aria-label={`${node.title} (gesperrt)`}
      >
        <span className="text-lg text-gray-400" aria-hidden="true">
          🔒
        </span>
        <span className="text-[9px] text-gray-400 mt-0.5 text-center leading-tight line-clamp-2 px-1">
          {node.title}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${node.topicId}`}
      className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-md ${style}`}
      title={node.title}
      aria-label={`${node.title} — ${node.mastery}`}
    >
      {node.mastery === 'mastered' && (
        <span className="text-xs" aria-hidden="true">
          {'*'.repeat(node.stars || 3)}
        </span>
      )}
      <span className="text-[9px] text-center leading-tight line-clamp-2 px-1 font-medium">
        {node.title}
      </span>
      {node.stars > 0 && node.mastery !== 'mastered' && (
        <div className="flex gap-0.5 mt-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`text-[8px] ${i < node.stars ? 'text-amber-400' : 'text-gray-300'}`}
              aria-hidden="true"
            >
              &#9733;
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
