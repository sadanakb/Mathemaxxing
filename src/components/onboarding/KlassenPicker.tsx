'use client';

import { motion } from 'framer-motion';
import type { Klassenstufe } from '@/lib/curriculum/types';

type KlassenPickerProps = {
  selected: Klassenstufe | null;
  onSelect: (k: Klassenstufe) => void;
};

const KLASSEN: Klassenstufe[] = [1, 2, 3, 4, 5, 6, 7];

export function KlassenPicker({ selected, onSelect }: KlassenPickerProps) {
  return (
    <div>
      <h2 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900 mb-2">
        In welche Klasse gehst du?
      </h2>
      <p className="text-gray-500 mb-6">Mathemaxxing unterstützt die Klassen 1 bis 7.</p>

      <div className="grid grid-cols-4 gap-4" role="radiogroup" aria-label="Klasse auswählen">
        {KLASSEN.map((k, i) => {
          const isGrundschule = k <= 4;
          const gradientFrom = isGrundschule ? '#FF6B6B' : '#2D3A8C';
          const gradientTo = isGrundschule ? '#FFD93D' : '#00D2FF';

          return (
            <motion.button
              key={k}
              role="radio"
              aria-checked={selected === k}
              onClick={() => onSelect(k)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
              whileTap={{ scale: 0.95 }}
              className={[
                'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200',
                'hover:scale-105 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
                selected === k
                  ? 'border-[var(--color-primary)] shadow-lg'
                  : 'border-gray-200 bg-white',
              ].join(' ')}
            >
              {/* Gradient number circle */}
              <div
                className={[
                  'w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold text-white transition-all duration-200',
                  selected === k ? 'ring-4 ring-[var(--color-primary)]/30' : '',
                ].join(' ')}
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                {k}
              </div>
              <span className={[
                'text-xs font-semibold',
                selected === k ? 'text-[var(--color-primary)]' : 'text-gray-500',
              ].join(' ')}>
                Klasse {k}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Theme indicator */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm text-gray-500"
        >
          {selected <= 4 ? 'Grundschule — warm & verspielt' : 'Unterstufe — fokussiert & modern'}
        </motion.div>
      )}
    </div>
  );
}
