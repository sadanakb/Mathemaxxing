export type Theme = 'grundschule' | 'unterstufe';

export const THEMES = {
  grundschule: {
    name: 'Grundschule',
    description: 'Klassen 1–4 — bunt und spielerisch',
    primaryColor: '#58CC02',
    secondaryColor: '#FFC800',
    accentColor: '#FF9600',
    bgColor: '#F7FFF0',
    mascot: true,
  },
  unterstufe: {
    name: 'Unterstufe',
    description: 'Klassen 5–7 — fokussiert und übersichtlich',
    primaryColor: '#1CB0F6',
    secondaryColor: '#8549BA',
    accentColor: '#FF4B4B',
    bgColor: '#F7FAFF',
    mascot: false,
  },
} as const;

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}
