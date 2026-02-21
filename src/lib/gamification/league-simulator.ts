export type League = 'bronze' | 'silber' | 'gold' | 'diamant' | 'rubin';

export type LeagueConfig = {
  name: string;
  icon: string;
  color: string;          // Tailwind class
  minXPToAdvance: number; // Weekly XP needed to advance
  topN: number;           // Top N advance to next league
  bottomN: number;        // Bottom N demote
};

export const LEAGUE_CONFIG: Record<League, LeagueConfig> = {
  bronze: {
    name: 'Bronze-Liga',
    icon: '\u{1F949}',
    color: 'text-amber-700',
    minXPToAdvance: 100,
    topN: 5,
    bottomN: 3,
  },
  silber: {
    name: 'Silber-Liga',
    icon: '\u{1F948}',
    color: 'text-gray-400',
    minXPToAdvance: 200,
    topN: 5,
    bottomN: 3,
  },
  gold: {
    name: 'Gold-Liga',
    icon: '\u{1F947}',
    color: 'text-yellow-500',
    minXPToAdvance: 350,
    topN: 5,
    bottomN: 3,
  },
  diamant: {
    name: 'Diamant-Liga',
    icon: '\u{1F48E}',
    color: 'text-cyan-400',
    minXPToAdvance: 500,
    topN: 3,
    bottomN: 3,
  },
  rubin: {
    name: 'Rubin-Liga',
    icon: '\u{1F534}',
    color: 'text-red-500',
    minXPToAdvance: 0, // Can't advance further
    topN: 0,
    bottomN: 5,
  },
};

export type SimulatedPlayer = {
  name: string;
  weeklyXP: number;
  avatar: string; // emoji
};

const GERMAN_NAMES = [
  'Max M.', 'Sophie K.', 'Leon H.', 'Emma W.', 'Lukas B.',
  'Mia F.', 'Noah S.', 'Hannah R.', 'Elias D.', 'Lena T.',
  'Felix J.', 'Marie L.', 'Paul G.', 'Anna C.', 'Ben A.',
  'Lara P.', 'Tim N.', 'Julia V.', 'David E.', 'Laura Z.',
];

const AVATARS = [
  '\u{1F9D2}', '\u{1F467}', '\u{1F9D1}', '\u{1F466}',
  '\u{1F469}', '\u{1F9D1}\u200D\u{1F393}', '\u{1F468}\u200D\u{1F393}', '\u{1F469}\u200D\u{1F393}',
];

/**
 * Generate simulated competitors for a league.
 * Uses date-based seed so results are consistent within a week.
 */
export function generateCompetitors(
  league: League,
  _userWeeklyXP: number,
  count = 15
): SimulatedPlayer[] {
  const config = LEAGUE_CONFIG[league];
  const weekSeed = getWeekSeed();

  const competitors: SimulatedPlayer[] = [];
  for (let i = 0; i < count; i++) {
    const seed = hashSeed(weekSeed + i);
    const nameIndex = seed % GERMAN_NAMES.length;
    const avatarIndex = (seed >> 4) % AVATARS.length;

    // XP range relative to league advancement threshold
    const baseXP = config.minXPToAdvance;
    const variance = baseXP * 0.8;
    const xpRaw = baseXP + (seededRandom(seed) - 0.5) * 2 * variance;
    const weeklyXP = Math.max(10, Math.round(xpRaw));

    competitors.push({
      name: GERMAN_NAMES[nameIndex],
      weeklyXP,
      avatar: AVATARS[avatarIndex],
    });
  }

  return competitors.sort((a, b) => b.weeklyXP - a.weeklyXP);
}

/**
 * Get the user's rank among competitors.
 */
export function getUserRank(userXP: number, competitors: SimulatedPlayer[]): number {
  const rank = competitors.filter(c => c.weeklyXP > userXP).length + 1;
  return rank;
}

/**
 * Get next league (for promotion).
 */
export function getNextLeague(current: League): League | null {
  const order: League[] = ['bronze', 'silber', 'gold', 'diamant', 'rubin'];
  const idx = order.indexOf(current);
  return idx < order.length - 1 ? order[idx + 1] : null;
}

/**
 * Get previous league (for demotion).
 */
export function getPrevLeague(current: League): League | null {
  const order: League[] = ['bronze', 'silber', 'gold', 'diamant', 'rubin'];
  const idx = order.indexOf(current);
  return idx > 0 ? order[idx - 1] : null;
}

/**
 * Determine if user should be promoted/demoted.
 */
export function getLeagueResult(
  userRank: number,
  league: League,
  totalPlayers: number
): 'promote' | 'demote' | 'stay' {
  const config = LEAGUE_CONFIG[league];
  if (userRank <= config.topN && league !== 'rubin') return 'promote';
  if (userRank > totalPlayers - config.bottomN) return 'demote';
  return 'stay';
}

// --- Utility functions ---

function getWeekSeed(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
  );
  return now.getFullYear() * 100 + weekNumber;
}

function hashSeed(seed: number): number {
  let h = seed;
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  h = (h >> 16) ^ h;
  return Math.abs(h);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
