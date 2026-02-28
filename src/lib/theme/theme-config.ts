export type Theme = 'grundschule' | 'unterstufe';

export { type WorldId, type WorldConfig, WORLDS, getWorldForKlasse, applyWorld } from './worlds';

export const THEMES = {
  grundschule: {
    name: 'Grundschule',
    description: 'Klassen 1–4 — warm und verspielt',
    primaryColor: '#FF6B6B',
    primaryDarkColor: '#E85D5D',
    primaryLightColor: '#FF8E8E',
    secondaryColor: '#FFD93D',
    accentColor: '#6BCB77',
    bgColor: '#FFF8F0',
    bgAltColor: '#FFF0E8',
    mascot: true,
    cardRadius: '1.25rem',
    btnRadius: '0.875rem',
  },
  unterstufe: {
    name: 'Unterstufe',
    description: 'Klassen 5–7 — fokussiert und modern',
    primaryColor: '#2D3A8C',
    primaryDarkColor: '#1E2A6E',
    primaryLightColor: '#4A5BC7',
    secondaryColor: '#00D2FF',
    accentColor: '#A855F7',
    bgColor: '#F5F7FF',
    bgAltColor: '#EEEEFF',
    mascot: false,
    cardRadius: '0.875rem',
    btnRadius: '0.625rem',
  },
} as const;

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}
