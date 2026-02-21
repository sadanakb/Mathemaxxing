/**
 * Shop Items — Purchasable items with coins
 *
 * Categories:
 * - Power-Ups: Streak Freeze, Double XP, Extra Hints
 * - Avatar: Hair, Outfit, Accessory, Pet
 */

export type ShopCategory = 'power-up' | 'hair' | 'outfit' | 'accessory' | 'pet';

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ShopCategory;
  cost: number;
  /** If true, item is consumed on use (power-ups). If false, permanent unlock. */
  consumable: boolean;
};

export const SHOP_ITEMS: ShopItem[] = [
  // Power-Ups
  {
    id: 'streak-freeze',
    name: 'Streak-Schutz',
    description: 'Schützt deinen Streak für einen verpassten Tag',
    icon: '🛡️',
    category: 'power-up',
    cost: 50,
    consumable: true,
  },
  {
    id: 'double-xp',
    name: 'Doppel-XP',
    description: '30 Minuten lang doppelte XP verdienen',
    icon: '⚡',
    category: 'power-up',
    cost: 75,
    consumable: true,
  },
  {
    id: 'extra-hints',
    name: '3 Extra-Hinweise',
    description: 'Erhalte 3 zusätzliche Hinweise für schwierige Aufgaben',
    icon: '💡',
    category: 'power-up',
    cost: 30,
    consumable: true,
  },

  // Hair Styles
  {
    id: 'hair-spiky',
    name: 'Igel-Frisur',
    description: 'Stachelige Haare nach oben',
    icon: '🦔',
    category: 'hair',
    cost: 20,
    consumable: false,
  },
  {
    id: 'hair-long',
    name: 'Lange Haare',
    description: 'Glatte lange Haare',
    icon: '💇',
    category: 'hair',
    cost: 20,
    consumable: false,
  },
  {
    id: 'hair-curly',
    name: 'Locken',
    description: 'Lustige Locken',
    icon: '🌀',
    category: 'hair',
    cost: 25,
    consumable: false,
  },

  // Outfits
  {
    id: 'outfit-wizard',
    name: 'Mathe-Zauberer',
    description: 'Magischer Umhang mit Zahlen',
    icon: '🧙',
    category: 'outfit',
    cost: 60,
    consumable: false,
  },
  {
    id: 'outfit-superhero',
    name: 'Superheld',
    description: 'Cape und Maske',
    icon: '🦸',
    category: 'outfit',
    cost: 80,
    consumable: false,
  },
  {
    id: 'outfit-astronaut',
    name: 'Astronaut',
    description: 'Raumanzug für Mathe im Weltall',
    icon: '🧑‍🚀',
    category: 'outfit',
    cost: 100,
    consumable: false,
  },
  {
    id: 'outfit-pirate',
    name: 'Pirat',
    description: 'Augenklappe und Piratenhut',
    icon: '🏴‍☠️',
    category: 'outfit',
    cost: 50,
    consumable: false,
  },

  // Accessories
  {
    id: 'acc-glasses',
    name: 'Nerd-Brille',
    description: 'Die Brille der Schlaumeier',
    icon: '🤓',
    category: 'accessory',
    cost: 25,
    consumable: false,
  },
  {
    id: 'acc-crown',
    name: 'Krone',
    description: 'Für Mathe-Könige und -Königinnen',
    icon: '👑',
    category: 'accessory',
    cost: 75,
    consumable: false,
  },
  {
    id: 'acc-headphones',
    name: 'Kopfhörer',
    description: 'Stylische Kopfhörer',
    icon: '🎧',
    category: 'accessory',
    cost: 30,
    consumable: false,
  },

  // Pets
  {
    id: 'pet-cat',
    name: 'Mathe-Katze',
    description: 'Eine schlaue Katze als Begleiter',
    icon: '🐱',
    category: 'pet',
    cost: 80,
    consumable: false,
  },
  {
    id: 'pet-owl',
    name: 'Weise Eule',
    description: 'Eine Eule, die dir Tipps gibt',
    icon: '🦉',
    category: 'pet',
    cost: 90,
    consumable: false,
  },
  {
    id: 'pet-dragon',
    name: 'Mini-Drache',
    description: 'Ein kleiner Drache an deiner Seite',
    icon: '🐉',
    category: 'pet',
    cost: 100,
    consumable: false,
  },
];

/**
 * Get items by category.
 */
export function getItemsByCategory(category: ShopCategory): ShopItem[] {
  return SHOP_ITEMS.filter((item) => item.category === category);
}

/**
 * Get a shop item by ID.
 */
export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === id);
}
