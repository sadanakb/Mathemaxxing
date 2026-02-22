'use client';

import { motion } from 'framer-motion';
import { Icon, type IconName } from '@/components/ui/Icon';
import type { Bundesland, Klassenstufe, Schulform } from '@/lib/curriculum/types';
import { getValidSchulformen } from '@/data/curricula/schulformen';

type SchulformPickerProps = {
  bundesland: Bundesland;
  klasse: Klassenstufe;
  selected: Schulform | null;
  onSelect: (sf: Schulform) => void;
};

const SCHULFORM_ICONS: Record<string, IconName> = {
  'Gymnasium': 'star',
  'Realschule': 'book',
  'Realschule plus': 'book',
  'Hauptschule': 'target',
  'Mittelschule': 'target',
  'Werkrealschule': 'target',
  'Gesamtschule': 'users',
  'Gemeinschaftsschule': 'users',
  'Stadtteilschule': 'users',
  'Oberschule': 'users',
  'Grundschule': 'home',
  'Sekundarschule': 'book',
  'Regelschule': 'book',
  'Regionale Schule': 'book',
};

export function SchulformPicker({ bundesland, klasse, selected, onSelect }: SchulformPickerProps) {
  const validForms = getValidSchulformen(bundesland, klasse);

  return (
    <div>
      <h2 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900 mb-2">
        Welche Schulform besuchst du?
      </h2>
      <p className="text-gray-500 mb-6">
        In {bundesland} gibt es für Klasse {klasse} folgende Schulformen:
      </p>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Schulform auswählen">
        {validForms.map((sf, i) => {
          const iconName = SCHULFORM_ICONS[sf] ?? 'book';

          return (
            <motion.button
              key={sf}
              role="radio"
              aria-checked={selected === sf}
              onClick={() => onSelect(sf)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className={[
                'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150',
                'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
                selected === sf
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-md'
                  : 'border-gray-200 bg-white',
              ].join(' ')}
            >
              <div className={[
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                selected === sf
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-400',
              ].join(' ')}>
                <Icon name={iconName} size={20} />
              </div>
              <span className={[
                'font-semibold',
                selected === sf ? 'text-[var(--color-primary)]' : 'text-gray-900',
              ].join(' ')}>
                {sf}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
