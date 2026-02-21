'use client';

import { useProgressStore } from '@/store/progressStore';

type WeeklyStats = {
  daysActive: number;
  totalXP: number;
  exercisesCompleted: number;
  topicsMastered: number;
  streakDays: number;
  bestDay: string; // Day name
};

function calculateWeeklyStats(progress: ReturnType<typeof useProgressStore.getState>['progress']): WeeklyStats {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const activeDates = (progress?.activeDates ?? []).filter((d: string) => {
    const date = new Date(d);
    return date >= weekAgo && date <= today;
  });

  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const bestDayIndex = activeDates.length > 0
    ? new Date(activeDates[activeDates.length - 1]).getDay()
    : today.getDay();

  // Count topics mastered in last week
  const topicsMastered = Object.values(progress?.topicProgress ?? {}).filter(
    (tp) => tp.masteredAt && new Date(tp.masteredAt) >= weekAgo
  ).length;

  return {
    daysActive: activeDates.length,
    totalXP: progress?.xpTotal ?? 0,
    exercisesCompleted: Object.values(progress?.topicProgress ?? {}).reduce(
      (sum: number, tp) => sum + (tp.attemptsTotal ?? 0), 0
    ),
    topicsMastered,
    streakDays: progress?.streakDays ?? 0,
    bestDay: dayNames[bestDayIndex],
  };
}

function StatCard({ icon, value, label, suffix }: { icon: string; value: number; label: string; suffix?: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <span className="text-xl">{icon}</span>
      <div className="text-lg font-bold mt-1">
        {value}{suffix && <span className="text-sm text-gray-400">{suffix}</span>}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function WeeklyRecap({ onClose }: { onClose: () => void }) {
  const progress = useProgressStore((s) => s.progress);
  const stats = calculateWeeklyStats(progress);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">Wochen-R&uuml;ckblick</h2>
        <p className="text-sm text-gray-500 text-center">So lief deine Woche!</p>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={"\uD83D\uDCC5"} value={stats.daysActive} label="Tage aktiv" suffix="/7" />
          <StatCard icon={"\u26A1"} value={stats.totalXP} label="XP gesamt" />
          <StatCard icon={"\uD83D\uDD25"} value={stats.streakDays} label="Streak-Tage" />
          <StatCard icon={"\u2B50"} value={stats.topicsMastered} label="Themen gemeistert" />
        </div>

        {stats.streakDays >= 7 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <span className="text-2xl">{"\uD83C\uDFC6"}</span>
            <p className="text-sm font-medium text-amber-800 mt-1">
              Unglaublich! {stats.streakDays} Tage in Folge!
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition"
        >
          Weiter lernen!
        </button>
      </div>
    </div>
  );
}
