import type { Bundesland, Klassenstufe, CurriculumDelta } from '@/lib/curriculum/types';

// Note: OVERRIDE_REGISTRY intentionally removed — all overrides loaded statically

// Import all overrides statically (tree-shaken at build time)
import { OVERRIDES as BW } from './Baden-Württemberg';
import { OVERRIDES as BY } from './Bayern';
import { OVERRIDES as BE } from './Berlin';
import { OVERRIDES as BB } from './Brandenburg';
import { OVERRIDES as HB } from './Bremen';
import { OVERRIDES as HH } from './Hamburg';
import { OVERRIDES as HE } from './Hessen';
import { OVERRIDES as MV } from './Mecklenburg-Vorpommern';
import { OVERRIDES as NI } from './Niedersachsen';
import { OVERRIDES as NW } from './Nordrhein-Westfalen';
import { OVERRIDES as RP } from './Rheinland-Pfalz';
import { OVERRIDES as SL } from './Saarland';
import { OVERRIDES as SN } from './Sachsen';
import { OVERRIDES as ST } from './Sachsen-Anhalt';
import { OVERRIDES as SH } from './Schleswig-Holstein';
import { OVERRIDES as TH } from './Thüringen';

const ALL_OVERRIDES: Record<Bundesland, CurriculumDelta[]> = {
  'Baden-Württemberg': BW,
  'Bayern': BY,
  'Berlin': BE,
  'Brandenburg': BB,
  'Bremen': HB,
  'Hamburg': HH,
  'Hessen': HE,
  'Mecklenburg-Vorpommern': MV,
  'Niedersachsen': NI,
  'Nordrhein-Westfalen': NW,
  'Rheinland-Pfalz': RP,
  'Saarland': SL,
  'Sachsen': SN,
  'Sachsen-Anhalt': ST,
  'Schleswig-Holstein': SH,
  'Thüringen': TH,
};

export function getOverrides(bundesland: Bundesland, klasse?: Klassenstufe): CurriculumDelta[] {
  const all = ALL_OVERRIDES[bundesland] ?? [];
  if (klasse === undefined) return all;
  return all.filter((d) => d.klasse === undefined || d.klasse === klasse);
}
