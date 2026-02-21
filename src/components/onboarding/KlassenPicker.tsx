'use client';

import type { Klassenstufe } from '@/lib/curriculum/types';

type KlassenPickerProps = {
  selected: Klassenstufe | null;
  onSelect: (k: Klassenstufe) => void;
};

const KLASSEN: { value: Klassenstufe; label: string; emoji: string }[] = [
  { value: 1, label: 'Klasse 1', emoji: '1️⃣' },
  { value: 2, label: 'Klasse 2', emoji: '2️⃣' },
  { value: 3, label: 'Klasse 3', emoji: '3️⃣' },
  { value: 4, label: 'Klasse 4', emoji: '4️⃣' },
  { value: 5, label: 'Klasse 5', emoji: '5️⃣' },
  { value: 6, label: 'Klasse 6', emoji: '6️⃣' },
  { value: 7, label: 'Klasse 7', emoji: '7️⃣' },
];

export function KlassenPicker({ selected, onSelect }: KlassenPickerProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">In welche Klasse gehst du?</h2>
      <p className="text-gray-500 mb-6">MatheMeister unterstützt die Klassen 1 bis 7.</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4" role="radiogroup" aria-label="Klasse auswählen">
        {KLASSEN.map((k) => (
          <button
            key={k.value}
            role="radio"
            aria-checked={selected === k.value}
            onClick={() => onSelect(k.value)}
            className={[
              'flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all duration-150',
              'hover:border-[var(--color-primary)] hover:scale-105',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              selected === k.value
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <span className="text-3xl">{k.emoji}</span>
            <span className="text-sm font-semibold text-gray-800">{k.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
