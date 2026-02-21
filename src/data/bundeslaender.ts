import type { Bundesland } from '@/lib/curriculum/types';

export type BundeslandMeta = {
  id: Bundesland;
  kuerzel: string;
  capital: string;
  emoji: string;
};

export const BUNDESLAENDER: BundeslandMeta[] = [
  { id: 'Baden-Württemberg',       kuerzel: 'BW', capital: 'Stuttgart',    emoji: '🟢' },
  { id: 'Bayern',                  kuerzel: 'BY', capital: 'München',      emoji: '🔵' },
  { id: 'Berlin',                  kuerzel: 'BE', capital: 'Berlin',       emoji: '🔴' },
  { id: 'Brandenburg',             kuerzel: 'BB', capital: 'Potsdam',      emoji: '🟡' },
  { id: 'Bremen',                  kuerzel: 'HB', capital: 'Bremen',       emoji: '🟠' },
  { id: 'Hamburg',                 kuerzel: 'HH', capital: 'Hamburg',      emoji: '🔴' },
  { id: 'Hessen',                  kuerzel: 'HE', capital: 'Wiesbaden',   emoji: '🟣' },
  { id: 'Mecklenburg-Vorpommern',  kuerzel: 'MV', capital: 'Schwerin',     emoji: '🔵' },
  { id: 'Niedersachsen',           kuerzel: 'NI', capital: 'Hannover',     emoji: '🟡' },
  { id: 'Nordrhein-Westfalen',     kuerzel: 'NW', capital: 'Düsseldorf',   emoji: '🟢' },
  { id: 'Rheinland-Pfalz',        kuerzel: 'RP', capital: 'Mainz',        emoji: '🔴' },
  { id: 'Saarland',               kuerzel: 'SL', capital: 'Saarbrücken', emoji: '🔵' },
  { id: 'Sachsen',                 kuerzel: 'SN', capital: 'Dresden',      emoji: '🟡' },
  { id: 'Sachsen-Anhalt',          kuerzel: 'ST', capital: 'Magdeburg',    emoji: '🟠' },
  { id: 'Schleswig-Holstein',      kuerzel: 'SH', capital: 'Kiel',         emoji: '🔵' },
  { id: 'Thüringen',              kuerzel: 'TH', capital: 'Erfurt',       emoji: '🟢' },
];

export const BUNDESLAND_BY_ID = Object.fromEntries(
  BUNDESLAENDER.map((b) => [b.id, b])
) as Record<Bundesland, BundeslandMeta>;
