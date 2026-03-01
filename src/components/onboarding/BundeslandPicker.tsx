'use client';

import { motion } from 'framer-motion';
import { BUNDESLAENDER } from '@/data/bundeslaender';
import type { Bundesland } from '@/lib/curriculum/types';
import { BundeslandWappen } from '@/components/wappen/BundeslandWappen';

type BundeslandPickerProps = {
  selected: Bundesland | null;
  onSelect: (bl: Bundesland) => void;
};

export function BundeslandPicker({ selected, onSelect }: BundeslandPickerProps) {
  return (
    <div>
      <h2 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900 mb-2">
        In welchem Bundesland gehst du zur Schule?
      </h2>
      <p className="text-gray-500 mb-6">Wir passen die Aufgaben an deinen Lehrplan an.</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="radiogroup" aria-label="Bundesland auswählen">
        {BUNDESLAENDER.map((bl, i) => (
          <motion.button
            key={bl.id}
            role="radio"
            aria-checked={selected === bl.id}
            onClick={() => onSelect(bl.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            whileTap={{ scale: 0.97 }}
            className={[
              'flex flex-col items-center justify-center gap-1.5 py-3 px-1.5 rounded-xl border-2 text-center transition-all duration-150',
              'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
              selected === bl.id
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-md'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <div className={[
              'flex-shrink-0 transition-transform duration-200',
              selected === bl.id ? 'scale-110' : '',
            ].join(' ')}>
              <BundeslandWappen bundesland={bl.id} size="md" />
            </div>
            <span className={[
              'text-[11px] font-medium leading-tight w-full',
              selected === bl.id ? 'text-[var(--color-primary)] font-bold' : 'text-gray-700',
            ].join(' ')}>
              {bl.id}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
