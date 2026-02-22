'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/progressStore';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
import { Icon } from '@/components/ui/Icon';
import {
  generateCompetitors,
  getUserRank,
  LEAGUE_CONFIG,
  type League,
} from '@/lib/gamification/league-simulator';

/** Color palette for initials circles — deterministic by name */
const AVATAR_COLORS = [
  ['#FF6B6B', '#E85D5D'], // coral
  ['#4A5BC7', '#2D3A8C'], // indigo
  ['#6BCB77', '#3DAF52'], // green
  ['#FFD93D', '#F0C830'], // yellow
  ['#A855F7', '#7C3AED'], // violet
  ['#00D2FF', '#00B8E0'], // cyan
  ['#F97316', '#EA580C'], // orange
  ['#EC4899', '#DB2777'], // pink
];

function getColorForName(name: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const pair = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  return [pair[0], pair[1]];
}

function getInitials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** League icon as SVG instead of emoji */
function LeagueIcon({ league, size = 48 }: { league: League; size?: number }) {
  const colors: Record<League, { primary: string; secondary: string }> = {
    bronze: { primary: '#CD7F32', secondary: '#A0522D' },
    silber: { primary: '#C0C0C0', secondary: '#808080' },
    gold: { primary: '#FFD700', secondary: '#DAA520' },
    diamant: { primary: '#00D2FF', secondary: '#4A5BC7' },
    rubin: { primary: '#E11D48', secondary: '#9F1239' },
  };
  const c = colors[league];

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`league-${league}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.primary} />
          <stop offset="100%" stopColor={c.secondary} />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M24 4 L40 12 L40 28 Q40 40 24 46 Q8 40 8 28 L8 12 Z"
        fill={`url(#league-${league})`}
      />
      {/* Inner shield */}
      <path
        d="M24 10 L34 16 L34 28 Q34 36 24 41 Q14 36 14 28 L14 16 Z"
        fill="white"
        opacity="0.2"
      />
      {/* Star */}
      <g transform="translate(24, 24)">
        <polygon
          points="0,-9 3,-3 9,-3 4,1 6,8 0,4 -6,8 -4,1 -9,-3 -3,-3"
          fill="white"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

/** Colored initials circle for player avatars */
function PlayerAvatar({ name, isUser, size = 36 }: { name: string; isUser: boolean; size?: number }) {
  const [bg, bgDark] = isUser ? ['var(--color-primary)', 'var(--color-primary-dark)'] : getColorForName(name);
  const initials = getInitials(name);

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white font-[family-name:var(--font-heading)] shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${bg}, ${bgDark})`,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}

/** Podium for top 3 players */
function Podium({ players }: { players: { name: string; weeklyXP: number; isUser: boolean; rank: number }[] }) {
  const top3 = players.slice(0, 3);
  if (top3.length < 3) return null;

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const heights = [80, 104, 64];
  const medals = ['', '', ''];
  const medalColors = [
    ['#C0C0C0', '#808080'], // silver
    ['#FFD700', '#DAA520'], // gold
    ['#CD7F32', '#A0522D'], // bronze
  ];

  return (
    <div className="flex items-end justify-center gap-2 mb-6">
      {podiumOrder.map((player, i) => (
        <motion.div
          key={player.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center"
        >
          {/* Avatar */}
          <div className="relative mb-2">
            <PlayerAvatar name={player.name} isUser={player.isUser} size={i === 1 ? 48 : 40} />
            {player.isUser && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 12px var(--color-primary)' }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <span className="text-xs font-semibold text-gray-700 truncate max-w-[72px] text-center mb-1">
            {player.name}
          </span>
          <span className="text-[10px] text-gray-500 mb-1">{player.weeklyXP} XP</span>

          {/* Podium bar */}
          <div
            className="rounded-t-lg w-20 flex items-start justify-center pt-2"
            style={{
              height: heights[i],
              background: `linear-gradient(to bottom, ${medalColors[i][0]}, ${medalColors[i][1]})`,
            }}
          >
            <span className="text-white font-bold text-lg font-[family-name:var(--font-heading)]">
              {medals[i]}{player.rank}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  const progress = useProgressStore((s) => s.progress);
  const [league] = useState<League>('bronze');

  const weeklyXP = progress?.xpTotal ?? 0;
  const competitors = generateCompetitors(league, weeklyXP);
  const userRank = getUserRank(weeklyXP, competitors);
  const config = LEAGUE_CONFIG[league];

  const allPlayers = [
    ...competitors.map((c) => ({ ...c, isUser: false, rank: 0 })),
    { name: 'Du', weeklyXP, avatar: '', isUser: true, rank: 0 },
  ]
    .sort((a, b) => b.weeklyXP - a.weeklyXP)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  return (
    <PageWrapper>
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* League header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <div className="flex justify-center">
              <LeagueIcon league={league} size={56} />
            </div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
              {config.name}
            </h1>
            <p className="text-sm text-gray-500">
              Top {config.topN} steigen auf &bull; Letzte {config.bottomN} steigen ab
            </p>
          </motion.div>

          {/* User rank highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-[var(--card-radius)] p-4 text-center border-2 border-[var(--color-primary)]"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
              boxShadow: '0 4px 20px var(--color-primary)',
            }}
          >
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
              Platz {userRank}
            </div>
            <div className="text-sm text-white/80">{weeklyXP} XP diese Woche</div>
          </motion.div>

          {/* Top 3 Podium */}
          <Podium players={allPlayers} />

          {/* Full leaderboard list (skip top 3, they're in podium) */}
          <div className="space-y-1.5">
            {allPlayers.slice(3).map((player, i) => (
              <motion.div
                key={player.name + player.rank}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  player.isUser
                    ? 'bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] shadow-md'
                    : player.rank <= config.topN
                      ? 'bg-emerald-50/80'
                      : player.rank > allPlayers.length - config.bottomN
                        ? 'bg-red-50/80'
                        : 'bg-white'
                }`}
                style={player.isUser ? { boxShadow: '0 0 12px var(--color-primary)' } : undefined}
              >
                {/* Rank number */}
                <span className="w-6 text-center font-bold text-sm font-[family-name:var(--font-heading)] text-gray-400">
                  {player.rank}
                </span>

                {/* Colored initials avatar */}
                <PlayerAvatar name={player.name} isUser={player.isUser} size={32} />

                {/* Name */}
                <span
                  className={`flex-1 text-sm font-medium ${
                    player.isUser
                      ? 'text-[var(--color-primary)] font-bold'
                      : 'text-gray-800'
                  }`}
                >
                  {player.name}
                </span>

                {/* Zone indicators */}
                {player.rank <= config.topN && (
                  <Icon name="arrow-up" size={14} className="text-emerald-500" />
                )}
                {player.rank > allPlayers.length - config.bottomN && (
                  <Icon name="arrow-down" size={14} className="text-red-400" />
                )}

                {/* XP */}
                <span className="text-sm font-semibold text-gray-600 tabular-nums">
                  {player.weeklyXP} XP
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </PageWrapper>
  );
}
