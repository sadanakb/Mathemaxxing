'use client';

import { generateDailyChallenges, isChallengeCompleted, type DailyChallenge } from '@/lib/gamification/daily-challenges';

function ChallengeCard({ challenge }: { challenge: DailyChallenge }) {
  const completed = isChallengeCompleted(challenge);
  const progress = Math.min(1, challenge.current / challenge.target);

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition ${
      completed
        ? 'bg-emerald-50 border-emerald-200'
        : 'bg-white border-gray-200'
    }`}>
      <span className="text-2xl">{challenge.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${completed ? 'text-emerald-700' : 'text-gray-800'}`}>
            {challenge.title}
          </span>
          <span className="text-xs text-amber-600 font-medium">+{challenge.reward} {"\uD83E\uDE99"}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{challenge.description}</p>
        <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              completed ? 'bg-emerald-500' : 'bg-[var(--color-primary)]'
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
      {completed && <span className="text-emerald-500 text-lg">{"\u2713"}</span>}
    </div>
  );
}

export default function DailyChallenges() {
  const challenges = generateDailyChallenges();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">T&auml;gliche Aufgaben</h3>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
