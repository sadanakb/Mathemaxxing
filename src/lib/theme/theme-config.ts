export type Theme = 'grundschule' | 'unterstufe';

export const THEMES = {
  grundschule: {
    name: 'Grundschule',
    description: 'Klassen 1–4 — bunt und spielerisch',
    primaryColor: '#FF6B35',
    secondaryColor: '#FFD166',
    accentColor: '#06D6A0',
    bgColor: '#FFF9F0',
    mascot: true,
  },
  unterstufe: {
    name: 'Unterstufe',
    description: 'Klassen 5–7 — fokussiert und übersichtlich',
    primaryColor: '#4361EE',
    secondaryColor: '#7209B7',
    accentColor: '#4CC9F0',
    bgColor: '#F8F9FF',
    mascot: false,
  },
} as const;

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}
