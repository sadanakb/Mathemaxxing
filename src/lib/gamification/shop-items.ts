/**
 * Shop Items — Purchasable items with coins
 *
 * Categories: Power-Up, Hair, Outfit, Accessory, Pet
 * Rarity: common, rare, epic, legendary
 */

export type ShopCategory = 'power-up' | 'hair' | 'outfit' | 'accessory' | 'pet';
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ShopCategory;
  cost: number;
  consumable: boolean;
  rarity: ItemRarity;
  /** Reference to SVG component id for avatar preview */
  svgPreview?: string;
};

export const RARITY_COLORS: Record<ItemRarity, { bg: string; text: string; border: string }> = {
  common: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' },
  rare: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
  epic: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
  legendary: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-400' },
};

export const RARITY_LABELS: Record<ItemRarity, string> = {
  common: 'Gewöhnlich',
  rare: 'Selten',
  epic: 'Episch',
  legendary: 'Legendär',
};

export const SHOP_ITEMS: ShopItem[] = [
  // ── Power-Ups ────────────────────────────────────────
  {
    id: 'streak-freeze',
    name: 'Streak-Schutz',
    description: 'Schützt deinen Streak für einen verpassten Tag',
    icon: '🛡️',
    category: 'power-up',
    cost: 50,
    consumable: true,
    rarity: 'rare',
  },
  {
    id: 'double-xp',
    name: 'Doppel-XP',
    description: '30 Minuten lang doppelte XP verdienen',
    icon: '⚡',
    category: 'power-up',
    cost: 75,
    consumable: true,
    rarity: 'rare',
  },
  {
    id: 'extra-hints',
    name: '3 Extra-Hinweise',
    description: 'Erhalte 3 zusätzliche Hinweise für schwierige Aufgaben',
    icon: '💡',
    category: 'power-up',
    cost: 30,
    consumable: true,
    rarity: 'common',
  },

  // ── Hair Styles (5) ──────────────────────────────────
  {
    id: 'hair-spiky',
    name: 'Igel-Frisur',
    description: 'Stachelige Haare nach oben',
    icon: '🦔',
    category: 'hair',
    cost: 20,
    consumable: false,
    rarity: 'common',
    svgPreview: 'spiky',
  },
  {
    id: 'hair-long',
    name: 'Lange Haare',
    description: 'Glatte lange Haare',
    icon: '💇',
    category: 'hair',
    cost: 20,
    consumable: false,
    rarity: 'common',
    svgPreview: 'long',
  },
  {
    id: 'hair-curly',
    name: 'Locken',
    description: 'Lustige Locken',
    icon: '🌀',
    category: 'hair',
    cost: 25,
    consumable: false,
    rarity: 'common',
    svgPreview: 'curly',
  },
  {
    id: 'hair-bob',
    name: 'Bob-Schnitt',
    description: 'Kurzer stylischer Bob',
    icon: '✂️',
    category: 'hair',
    cost: 30,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'bob',
  },
  {
    id: 'hair-mohawk',
    name: 'Irokese',
    description: 'Mutiger Punk-Look',
    icon: '🎸',
    category: 'hair',
    cost: 40,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'mohawk',
  },

  // ── Outfits (6) ──────────────────────────────────────
  {
    id: 'outfit-wizard',
    name: 'Mathe-Zauberer',
    description: 'Magischer Umhang mit Zahlen',
    icon: '🧙',
    category: 'outfit',
    cost: 60,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'wizard',
  },
  {
    id: 'outfit-superhero',
    name: 'Superheld',
    description: 'Cape und Maske',
    icon: '🦸',
    category: 'outfit',
    cost: 80,
    consumable: false,
    rarity: 'epic',
    svgPreview: 'superhero',
  },
  {
    id: 'outfit-astronaut',
    name: 'Astronaut',
    description: 'Raumanzug für Mathe im Weltall',
    icon: '🧑‍🚀',
    category: 'outfit',
    cost: 100,
    consumable: false,
    rarity: 'epic',
    svgPreview: 'astronaut',
  },
  {
    id: 'outfit-pirate',
    name: 'Pirat',
    description: 'Augenklappe und Piratenhut',
    icon: '🏴‍☠️',
    category: 'outfit',
    cost: 50,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'pirate',
  },
  {
    id: 'outfit-scientist',
    name: 'Wissenschaftler',
    description: 'Laborkittel mit Reagenzglas',
    icon: '🔬',
    category: 'outfit',
    cost: 70,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'scientist',
  },
  {
    id: 'outfit-ninja',
    name: 'Ninja',
    description: 'Schnell und geschickt mit Zahlen',
    icon: '🥷',
    category: 'outfit',
    cost: 120,
    consumable: false,
    rarity: 'legendary',
    svgPreview: 'ninja',
  },

  // ── Accessories (5) ──────────────────────────────────
  {
    id: 'acc-glasses',
    name: 'Nerd-Brille',
    description: 'Die Brille der Schlaumeier',
    icon: '🤓',
    category: 'accessory',
    cost: 25,
    consumable: false,
    rarity: 'common',
    svgPreview: 'glasses',
  },
  {
    id: 'acc-crown',
    name: 'Krone',
    description: 'Für Mathe-Könige und -Königinnen',
    icon: '👑',
    category: 'accessory',
    cost: 75,
    consumable: false,
    rarity: 'epic',
    svgPreview: 'crown',
  },
  {
    id: 'acc-headphones',
    name: 'Kopfhörer',
    description: 'Stylische Kopfhörer',
    icon: '🎧',
    category: 'accessory',
    cost: 30,
    consumable: false,
    rarity: 'common',
    svgPreview: 'headphones',
  },
  {
    id: 'acc-hat',
    name: 'Zylinder',
    description: 'Eleganter Hut für elegante Lösungen',
    icon: '🎩',
    category: 'accessory',
    cost: 45,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'hat',
  },
  {
    id: 'acc-scarf',
    name: 'Schal',
    description: 'Kuscheliger Winterschal',
    icon: '🧣',
    category: 'accessory',
    cost: 20,
    consumable: false,
    rarity: 'common',
    svgPreview: 'scarf',
  },

  // ── Pets (4) ─────────────────────────────────────────
  {
    id: 'pet-cat',
    name: 'Mathe-Katze',
    description: 'Eine schlaue Katze als Begleiter',
    icon: '🐱',
    category: 'pet',
    cost: 80,
    consumable: false,
    rarity: 'rare',
    svgPreview: 'cat',
  },
  {
    id: 'pet-owl',
    name: 'Weise Eule',
    description: 'Eine Eule, die dir Tipps gibt',
    icon: '🦉',
    category: 'pet',
    cost: 90,
    consumable: false,
    rarity: 'epic',
    svgPreview: 'owl',
  },
  {
    id: 'pet-dragon',
    name: 'Mini-Drache',
    description: 'Ein kleiner Drache an deiner Seite',
    icon: '🐉',
    category: 'pet',
    cost: 100,
    consumable: false,
    rarity: 'epic',
    svgPreview: 'dragon',
  },
  {
    id: 'pet-bunny',
    name: 'Zahlen-Hase',
    description: 'Ein flinker Hase, der Zahlen liebt',
    icon: '🐰',
    category: 'pet',
    cost: 150,
    consumable: false,
    rarity: 'legendary',
    svgPreview: 'bunny',
  },
];

export function getItemsByCategory(category: ShopCategory): ShopItem[] {
  return SHOP_ITEMS.filter((item) => item.category === category);
}

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === id);
}
