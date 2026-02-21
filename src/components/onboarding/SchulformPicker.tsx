'use client';

import type { Bundesland, Klassenstufe, Schulform } from '@/lib/curriculum/types';
import { getValidSchulformen } from '@/data/curricula/schulformen';

type SchulformPickerProps = {
  bundesland: Bundesland;
  klasse: Klassenstufe;
  selected: Schulform | null;
  onSelect: (sf: Schulform) => void;
};

export function SchulformPicker({ bundesland, klasse, selected, onSelect }: SchulformPickerProps) {
  const validForms = getValidSchulformen(bundesland, klasse);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welche Schulform besuchst du?</h2>
      <p className="text-gray-500 mb-6">
        In {bundesland} gibt es für Klasse {klasse} folgende Schulformen:
      </p>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Schulform auswählen">
        {validForms.map((sf) => (
          <button
            key={sf}
            role="radio"
            aria-checked={selected === sf}
            onClick={() => onSelect(sf)}
            className={[
              'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150',
              'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              selected === sf
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <div
              className={[
                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                selected === sf ? 'border-[var(--color-primary)]' : 'border-gray-300',
              ].join(' ')}
            >
              {selected === sf && (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
              )}
            </div>
            <span className="font-medium text-gray-900">{sf}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
