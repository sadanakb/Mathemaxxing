'use client';

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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">In welchem Bundesland gehst du zur Schule?</h2>
      <p className="text-gray-500 mb-6">Wir passen die Aufgaben an deinen Lehrplan an.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Bundesland auswählen">
        {BUNDESLAENDER.map((bl) => (
          <button
            key={bl.id}
            role="radio"
            aria-checked={selected === bl.id}
            onClick={() => onSelect(bl.id)}
            className={[
              'flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all duration-150',
              'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              selected === bl.id
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 font-semibold'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <BundeslandWappen bundesland={bl.id} size="sm" />
            <span className="text-sm font-medium text-gray-900">{bl.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
