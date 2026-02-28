// ============================================================
// World System — Visual themes per Klassenstufe (K1-K4)
// Each world adds a unique color palette, assets, and personality
// on top of the base "grundschule" theme.
// ============================================================

export type WorldId = 'entdecker' | 'abenteuer' | 'forscher' | 'weltraum';

export type WorldConfig = {
  id: WorldId;
  label: string;
  description: string;
  klasse: 1 | 2 | 3 | 4;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    bg: string;
    bgAlt: string;
  };
  gradientHero: string;
  gradientXp: string;
  assetPath: string;
  finnOutfit: 'explorer' | 'fairground' | 'scientist' | 'astronaut';
};

export const WORLDS: Record<WorldId, WorldConfig> = {
  entdecker: {
    id: 'entdecker',
    label: 'Entdecker-Reise',
    description: 'Natur, Wald, Edelsteine und Früchte',
    klasse: 1,
    colors: {
      primary: '#4CAF50',
      primaryDark: '#388E3C',
      primaryLight: '#81C784',
      secondary: '#FFB74D',
      accent: '#8D6E63',
      bg: '#F1F8E9',
      bgAlt: '#E8F5E9',
    },
    gradientHero: 'linear-gradient(135deg, #4CAF50, #81C784, #FFB74D)',
    gradientXp: 'linear-gradient(90deg, #FFB74D, #4CAF50)',
    assetPath: '/worlds/entdecker',
    finnOutfit: 'explorer',
  },
  abenteuer: {
    id: 'abenteuer',
    label: 'Abenteuer-Jahrmarkt',
    description: 'Karussell, Luftballons und Jahrmarkt',
    klasse: 2,
    colors: {
      primary: '#E91E63',
      primaryDark: '#C2185B',
      primaryLight: '#F48FB1',
      secondary: '#FF9800',
      accent: '#7C4DFF',
      bg: '#FFF3E0',
      bgAlt: '#FCE4EC',
    },
    gradientHero: 'linear-gradient(135deg, #E91E63, #FF9800, #7C4DFF)',
    gradientXp: 'linear-gradient(90deg, #FF9800, #E91E63)',
    assetPath: '/worlds/abenteuer',
    finnOutfit: 'fairground',
  },
  forscher: {
    id: 'forscher',
    label: 'Forscher-Station',
    description: 'Labor, Reagenzgläser und Mikroskope',
    klasse: 3,
    colors: {
      primary: '#00ACC1',
      primaryDark: '#00838F',
      primaryLight: '#4DD0E1',
      secondary: '#26A69A',
      accent: '#AB47BC',
      bg: '#E0F7FA',
      bgAlt: '#E0F2F1',
    },
    gradientHero: 'linear-gradient(135deg, #00ACC1, #26A69A, #AB47BC)',
    gradientXp: 'linear-gradient(90deg, #26A69A, #00ACC1)',
    assetPath: '/worlds/forscher',
    finnOutfit: 'scientist',
  },
  weltraum: {
    id: 'weltraum',
    label: 'Weltraum-Expedition',
    description: 'Planeten, Raketen und Sterne',
    klasse: 4,
    colors: {
      primary: '#5C6BC0',
      primaryDark: '#3949AB',
      primaryLight: '#9FA8DA',
      secondary: '#FF7043',
      accent: '#FFD54F',
      bg: '#E8EAF6',
      bgAlt: '#EDE7F6',
    },
    gradientHero: 'linear-gradient(135deg, #3949AB, #5C6BC0, #FF7043)',
    gradientXp: 'linear-gradient(90deg, #FF7043, #5C6BC0)',
    assetPath: '/worlds/weltraum',
    finnOutfit: 'astronaut',
  },
} as const;

/** Get WorldId from Klassenstufe. Returns null for K5+. */
export function getWorldForKlasse(klasse: number): WorldId | null {
  switch (klasse) {
    case 1: return 'entdecker';
    case 2: return 'abenteuer';
    case 3: return 'forscher';
    case 4: return 'weltraum';
    default: return null;
  }
}

/** Apply world-specific data attribute to <html>. */
export function applyWorld(worldId: WorldId | null): void {
  if (typeof document === 'undefined') return;
  if (worldId) {
    document.documentElement.dataset.world = worldId;
  } else {
    delete document.documentElement.dataset.world;
  }
}
