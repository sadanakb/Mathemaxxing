'use client';

import type { Kurstyp } from '@/lib/curriculum/types';

type KursPickerProps = {
  selected: Kurstyp;
  onSelect: (kt: Kurstyp) => void;
};

const KURSE: { value: Kurstyp; label: string; description: string; emoji: string }[] = [
  {
    value: 'G-Kurs',
    label: 'Grundkurs (G)',
    description: 'Grundlegende Anforderungen, praktischer Fokus',
    emoji: '🌱',
  },
  {
    value: 'E-Kurs',
    label: 'Erweiterungskurs (E)',
    description: 'Erweiterte Anforderungen, mehr Tiefe und Theorie',
    emoji: '🚀',
  },
];

export function KursPicker({ selected, onSelect }: KursPickerProps) {
  return (
    <div>
      <h2 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900 mb-2">In welchem Kurs bist du?</h2>
      <p className="text-gray-500 mb-6">
        Deine Schule unterscheidet zwischen Grundkurs und Erweiterungskurs.
      </p>

      <div className="flex flex-col gap-4" role="radiogroup" aria-label="Kurstyp auswählen">
        {KURSE.map((kurs) => (
          <button
            key={kurs.value}
            role="radio"
            aria-checked={selected === kurs.value}
            onClick={() => onSelect(kurs.value)}
            className={[
              'flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-150',
              'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              selected === kurs.value
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <span className="text-3xl" aria-hidden="true">{kurs.emoji}</span>
            <div>
              <p className="font-bold text-gray-900">{kurs.label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{kurs.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
