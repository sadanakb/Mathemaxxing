'use client';

import { useState } from 'react';
import { useProgressStore } from '@/store/progressStore';
import { PageWrapper } from '@/components/layout/PageWrapper';
import {
  generateCompetitors,
  getUserRank,
  LEAGUE_CONFIG,
  type League,
} from '@/lib/gamification/league-simulator';

export default function LeaderboardPage() {
  const progress = useProgressStore((s) => s.progress);
  const [league] = useState<League>('bronze'); // TODO: persist in store

  const weeklyXP = progress?.xpTotal ?? 0; // Simplified: use total XP for now
  const competitors = generateCompetitors(league, weeklyXP);
  const userRank = getUserRank(weeklyXP, competitors);
  const config = LEAGUE_CONFIG[league];

  // Insert user into sorted list
  const allPlayers = [
    ...competitors.map((c) => ({ ...c, isUser: false, rank: 0 })),
    { name: 'Du', weeklyXP, avatar: '\u{1F31F}', isUser: true, rank: 0 },
  ]
    .sort((a, b) => b.weeklyXP - a.weeklyXP)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* League header */}
        <div className="text-center space-y-1">
          <span className="text-4xl">{config.icon}</span>
          <h1 className={`text-xl font-bold ${config.color}`}>{config.name}</h1>
          <p className="text-sm text-gray-500">
            Top {config.topN} steigen auf &bull; Letzte {config.bottomN} steigen ab
          </p>
        </div>

        {/* User rank highlight */}
        <div className="bg-[var(--color-primary)]/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)]">
            Platz {userRank}
          </div>
          <div className="text-sm text-gray-600">{weeklyXP} XP diese Woche</div>
        </div>

        {/* Leaderboard list */}
        <div className="space-y-1">
          {allPlayers.map((player) => (
            <div
              key={player.name + player.rank}
              className={`flex items-center gap-3 p-3 rounded-xl transition ${
                player.isUser
                  ? 'bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]'
                  : player.rank <= config.topN
                    ? 'bg-emerald-50'
                    : player.rank > allPlayers.length - config.bottomN
                      ? 'bg-red-50'
                      : 'bg-white'
              }`}
            >
              <span
                className={`w-6 text-center font-bold text-sm ${
                  player.rank <= 3 ? 'text-amber-500' : 'text-gray-400'
                }`}
              >
                {player.rank}
              </span>
              <span className="text-xl">{player.avatar}</span>
              <span
                className={`flex-1 text-sm font-medium ${
                  player.isUser
                    ? 'text-[var(--color-primary)] font-bold'
                    : 'text-gray-800'
                }`}
              >
                {player.name}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {player.weeklyXP} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
