'use client';

import { motion } from 'framer-motion';
import type { Klassenstufe } from '@/lib/curriculum/types';
import { getWorldForKlasse, WORLDS } from '@/lib/theme/worlds';
import type { WorldId } from '@/lib/theme/worlds';

type KlassenPickerProps = {
  selected: Klassenstufe | null;
  onSelect: (k: Klassenstufe) => void;
};

const WORLD_PREVIEWS: Record<WorldId, { icon: string; tagline: string; gradient: string }> = {
  entdecker: { icon: '🌳', tagline: 'Erkunde den magischen Wald!', gradient: 'linear-gradient(135deg, #4CAF50, #81C784)' },
  abenteuer: { icon: '🎪', tagline: 'Jahrmarkt voller Überraschungen!', gradient: 'linear-gradient(135deg, #E91E63, #FF9800)' },
  forscher: { icon: '🔬', tagline: 'Entdecke das Labor!', gradient: 'linear-gradient(135deg, #00ACC1, #26A69A)' },
  weltraum: { icon: '🚀', tagline: 'Reise zu den Sternen!', gradient: 'linear-gradient(135deg, #3949AB, #5C6BC0)' },
};

const grundschuleKlassen: Klassenstufe[] = [1, 2, 3, 4];
const unterstufenKlassen: Klassenstufe[] = [5, 6, 7];

export function KlassenPicker({ selected, onSelect }: KlassenPickerProps) {
  return (
    <div>
      <h2 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900 mb-2">
        In welche Klasse gehst du?
      </h2>
      <p className="text-gray-500 mb-6">Mathemaxxing unterstützt die Klassen 1 bis 7.</p>

      {/* K1-K4: World preview cards in 2-column grid */}
      <div className="grid grid-cols-2 gap-4 mb-4" role="radiogroup" aria-label="Klasse auswählen">
        {grundschuleKlassen.map((k, i) => {
          const worldId = getWorldForKlasse(k)!;
          const worldPreview = WORLD_PREVIEWS[worldId];
          const world = WORLDS[worldId];

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
                'flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200',
                'hover:scale-105 hover:shadow-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2',
                selected === k
                  ? 'border-white/50 shadow-xl ring-4 ring-white/30'
                  : 'border-white/20',
              ].join(' ')}
              style={{ background: worldPreview.gradient }}
            >
              <span className="text-3xl">{worldPreview.icon}</span>
              <span className="text-2xl font-extrabold text-white">{k}</span>
              <span className="text-xs font-bold text-white/80">
                {world.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* K5-K7: Smaller gradient circles in a row */}
      <div className="flex justify-center gap-4">
        {unterstufenKlassen.map((k, i) => {
          const gradientFrom = '#2D3A8C';
          const gradientTo = '#00D2FF';

          return (
            <motion.button
              key={k}
              role="radio"
              aria-checked={selected === k}
              onClick={() => onSelect(k)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i + 4) * 0.05, type: 'spring', stiffness: 300 }}
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

      {/* World preview message for K1-K4 */}
      {selected && selected <= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl text-center"
          style={{ background: WORLD_PREVIEWS[getWorldForKlasse(selected)!].gradient, opacity: 0.9 }}
        >
          <p className="text-white font-bold text-sm">
            {WORLDS[getWorldForKlasse(selected)!].label} — {WORLD_PREVIEWS[getWorldForKlasse(selected)!].tagline}
          </p>
        </motion.div>
      )}

      {/* Theme indicator for K5-K7 */}
      {selected && selected > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm text-gray-500"
        >
          Unterstufe — fokussiert & modern
        </motion.div>
      )}
    </div>
  );
}
