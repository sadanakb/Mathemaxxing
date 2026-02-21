'use client';

import type { Bundesland } from '@/lib/curriculum/types';
import {
  BadenWuerttemberg,
  Bayern,
  Berlin,
  Brandenburg,
  Bremen,
  Hamburg,
  Hessen,
  MecklenburgVorpommern,
  Niedersachsen,
  NordrheinWestfalen,
  RheinlandPfalz,
  Saarland,
  Sachsen,
  SachsenAnhalt,
  SchleswigHolstein,
  Thueringen,
} from './wappen-svgs';

const SIZE_MAP = {
  sm: 24,
  md: 40,
  lg: 64,
} as const;

type BundeslandWappenProps = {
  bundesland: Bundesland;
  size?: 'sm' | 'md' | 'lg';
};

const WAPPEN_MAP: Record<Bundesland, React.ComponentType<{ size: number }>> = {
  'Baden-Württemberg': BadenWuerttemberg,
  'Bayern': Bayern,
  'Berlin': Berlin,
  'Brandenburg': Brandenburg,
  'Bremen': Bremen,
  'Hamburg': Hamburg,
  'Hessen': Hessen,
  'Mecklenburg-Vorpommern': MecklenburgVorpommern,
  'Niedersachsen': Niedersachsen,
  'Nordrhein-Westfalen': NordrheinWestfalen,
  'Rheinland-Pfalz': RheinlandPfalz,
  'Saarland': Saarland,
  'Sachsen': Sachsen,
  'Sachsen-Anhalt': SachsenAnhalt,
  'Schleswig-Holstein': SchleswigHolstein,
  'Thüringen': Thueringen,
};

export function BundeslandWappen({ bundesland, size = 'md' }: BundeslandWappenProps) {
  const WappenComponent = WAPPEN_MAP[bundesland];
  const px = SIZE_MAP[size];

  if (!WappenComponent) {
    return null;
  }

  return (
    <span className="inline-flex items-center justify-center flex-shrink-0" aria-label={`Wappen ${bundesland}`} role="img">
      <WappenComponent size={px} />
    </span>
  );
}
