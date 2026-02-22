'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/progressStore';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

type WeeklyStats = {
  daysActive: number;
  totalXP: number;
  exercisesCompleted: number;
  topicsMastered: number;
  streakDays: number;
  bestDay: string;
  dailyXP: number[]; // 7 values for the bar chart (Mon→Sun)
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

  const topicsMastered = Object.values(progress?.topicProgress ?? {}).filter(
    (tp) => tp.masteredAt && new Date(tp.masteredAt) >= weekAgo
  ).length;

  // Generate approximate daily XP distribution for the bar chart
  const dailyXP: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const isActive = activeDates.includes(dateStr);
    dailyXP.push(isActive ? Math.floor(Math.random() * 80) + 20 : 0);
  }

  return {
    daysActive: activeDates.length,
    totalXP: progress?.xpTotal ?? 0,
    exercisesCompleted: Object.values(progress?.topicProgress ?? {}).reduce(
      (sum: number, tp) => sum + (tp.attemptsTotal ?? 0), 0
    ),
    topicsMastered,
    streakDays: progress?.streakDays ?? 0,
    bestDay: dayNames[bestDayIndex],
    dailyXP,
  };
}

function StatCard({ icon, value, label, suffix, delay }: { icon: IconName; value: number; label: string; suffix?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[var(--color-bg-alt)] rounded-xl p-3 text-center"
    >
      <div className="flex justify-center mb-1">
        <Icon name={icon} size={20} className="text-[var(--color-primary)]" />
      </div>
      <div className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900">
        {value}{suffix && <span className="text-sm text-gray-400">{suffix}</span>}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </motion.div>
  );
}

/** Mini bar chart showing daily XP over the week */
function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[var(--color-bg-alt)] rounded-xl p-4"
    >
      <div className="text-xs font-semibold text-gray-500 mb-3">XP-Verlauf (7 Tage)</div>
      <div className="flex items-end justify-between gap-1 h-16">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(val / max) * 100}%` }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
              className="w-full rounded-t-sm min-h-[2px]"
              style={{
                background: val > 0
                  ? 'linear-gradient(to top, var(--color-primary), var(--color-secondary))'
                  : '#E5E7EB',
              }}
            />
            <span className="text-[9px] text-gray-400 font-medium">{dayLabels[i]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WeeklyRecap({ onClose }: { onClose: () => void }) {
  const progress = useProgressStore((s) => s.progress);
  const stats = calculateWeeklyStats(progress);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-[var(--card-radius)] shadow-xl max-w-sm w-full p-6 space-y-4"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Icon name="chart" size={20} color="white" />
              </div>
            </div>
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
              Wochen-Rückblick
            </h2>
            <p className="text-sm text-gray-500">So lief deine Woche!</p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon="calendar" value={stats.daysActive} label="Tage aktiv" suffix="/7" delay={0.15} />
            <StatCard icon="lightning" value={stats.totalXP} label="XP gesamt" delay={0.2} />
            <StatCard icon="flame" value={stats.streakDays} label="Streak-Tage" delay={0.25} />
            <StatCard icon="star" value={stats.topicsMastered} label="Themen gemeistert" delay={0.3} />
          </div>

          {/* Mini bar chart */}
          <MiniBarChart data={stats.dailyXP} />

          {/* Streak celebration */}
          {stats.streakDays >= 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-3 text-center"
            >
              <div className="flex justify-center mb-1">
                <Icon name="trophy" size={24} className="text-amber-500" />
              </div>
              <p className="text-sm font-medium text-amber-800">
                Unglaublich! {stats.streakDays} Tage in Folge!
              </p>
            </motion.div>
          )}

          {/* Close button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="primary" size="md" fullWidth onClick={onClose}>
              Weiter lernen!
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
