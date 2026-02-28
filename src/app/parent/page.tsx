'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
import { StatPill } from '@/components/ui/StatPill';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Card';
import { useProgressStore } from '@/store/progressStore';
import {
  generateProgressSummary,
  getTopicDetails,
  getWeeklyActivity,
  getTroubleSpots,
} from '@/lib/analytics/parent-report';
import { generateRecommendations } from '@/lib/analytics/recommendations';

const PARENT_PIN = '1234';

/** Weekly activity bar chart */
function WeeklyActivityChart({ data }: { data: { date: string; dayName: string; active: boolean }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card themed className="border-l-4" style={{ borderLeftColor: '#4A5BC7' }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="calendar" size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold font-[family-name:var(--font-heading)]">
            Aktivität diese Woche
          </h2>
        </div>
        <div className="flex justify-between gap-1.5">
          {data.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1.5 flex-1">
              {/* Activity bar */}
              <div className="w-full h-10 rounded-lg bg-gray-100 flex items-end overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: day.active ? '100%' : '8%' }}
                  transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                  className="w-full rounded-lg"
                  style={{
                    background: day.active
                      ? 'linear-gradient(to top, var(--color-primary), var(--color-secondary))'
                      : '#E5E7EB',
                  }}
                />
              </div>
              <span className={`text-[10px] font-medium ${day.active ? 'text-gray-700' : 'text-gray-400'}`}>
                {day.dayName}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

/** Colored mastery dot indicator */
function MasteryDot({ level }: { level: string }) {
  const colors: Record<string, string> = {
    'not-started': '#D1D5DB',
    introduced: '#93C5FD',
    practicing: '#FBBF24',
    mastered: '#6EE7B7',
  };
  const labels: Record<string, string> = {
    'not-started': 'Neu',
    introduced: 'Begonnen',
    practicing: 'Übend',
    mastered: 'Gemeistert',
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
      <span
        className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
        style={{ backgroundColor: colors[level] ?? '#D1D5DB' }}
      />
      {labels[level] ?? level}
    </span>
  );
}

/** Recommendation card with icon */
function RecommendationCard({ rec, delay }: { rec: { type: string; icon: string; title: string; description: string }; delay: number }) {
  const config: Record<string, { border: string; bg: string; iconName: IconName }> = {
    strength: { border: '#6BCB77', bg: 'bg-emerald-50', iconName: 'check' },
    weakness: { border: '#EF4444', bg: 'bg-red-50', iconName: 'target' },
    suggestion: { border: '#4A5BC7', bg: 'bg-blue-50', iconName: 'lightning' },
  };
  const c = config[rec.type] ?? config.suggestion;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`${c.bg} rounded-xl border-l-4 p-3`}
      style={{ borderLeftColor: c.border }}
    >
      <div className="flex items-center gap-2">
        <Icon name={c.iconName} size={14} color={c.border} />
        <span className="font-semibold text-sm text-gray-800">{rec.title}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1 ml-5">{rec.description}</p>
    </motion.div>
  );
}

export default function ParentPage() {
  const [pinInput, setPinInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const progress = useProgressStore((s) => s.progress);

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    const storedPin = localStorage.getItem('mathemaxxing-parent-pin') ?? PARENT_PIN;
    if (pinInput === storedPin) {
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  }

  if (!authenticated) {
    return (
      <PageWrapper>
        <PageTransition>
          <div className="max-w-sm mx-auto py-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                <Icon name="parent" size={32} color="white" />
              </div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-heading)]">Eltern-Bereich</h1>
              <p className="text-sm text-gray-500 mt-1">Bitte PIN eingeben</p>
            </motion.div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full text-center text-2xl tracking-[0.5em] py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:outline-none transition"
                placeholder="____"
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-sm text-center">Falsche PIN. Standard: 1234</p>
              )}
              <Button variant="primary" size="md" fullWidth type="submit" disabled={pinInput.length !== 4}>
                <Icon name="lock" size={16} className="mr-1" />
                Entsperren
              </Button>
            </form>
          </div>
        </PageTransition>
      </PageWrapper>
    );
  }

  if (!progress) {
    return (
      <PageWrapper>
        <div className="text-center py-12 text-gray-500">Keine Daten vorhanden.</div>
      </PageWrapper>
    );
  }

  const summary = generateProgressSummary(progress);
  const topics = getTopicDetails(progress);
  const weekActivity = getWeeklyActivity(progress);
  const troubles = getTroubleSpots(progress);
  const recommendations = generateRecommendations(progress);

  return (
    <PageWrapper>
      <PageTransition>
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                <Icon name="chart" size={20} color="white" />
              </div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)]">
                Fortschrittsbericht
              </h1>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <Icon name="lock" size={14} />
              Sperren
            </button>
          </motion.div>

          {/* Summary stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide"
          >
            <StatPill icon={<Icon name="star" size={16} className="text-emerald-500" />} label="Gemeistert" value={`${summary.masteredTopics}/${summary.totalTopics}`} />
            <StatPill icon={<Icon name="target" size={16} className="text-blue-500" />} label="Genauigkeit" value={`${summary.overallAccuracy}%`} />
            <StatPill icon={<Icon name="crown" size={16} className="text-purple-500" />} label="Level" value={String(summary.level)} />
            <StatPill icon={<Icon name="flame" size={16} className="text-amber-500" />} label="Streak" value={`${summary.streakDays}d`} />
          </motion.div>

          {/* Weekly activity chart */}
          <WeeklyActivityChart data={weekActivity} />

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-gray-600 flex items-center gap-1.5">
                <Icon name="lightning" size={14} className="text-indigo-500" />
                Empfehlungen
              </h2>
              {recommendations.map((rec, i) => (
                <RecommendationCard key={i} rec={rec} delay={0.3 + i * 0.05} />
              ))}
            </div>
          )}

          {/* Trouble spots */}
          {troubles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card themed className="border-l-4" style={{ borderLeftColor: '#EF4444' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="target" size={16} className="text-red-500" />
                  <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-red-700">
                    Problemthemen (Genauigkeit &lt; 50%)
                  </h2>
                </div>
                <div className="space-y-1.5">
                  {troubles.map((t) => (
                    <div key={t.topicId} className="flex justify-between text-sm">
                      <span className="text-gray-700">{t.topicId}</span>
                      <span className="text-red-600 font-medium tabular-nums">{t.accuracy}% ({t.attempts} Versuche)</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Topic breakdown table */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card themed>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="book" size={16} className="text-gray-500" />
                <h2 className="text-sm font-bold font-[family-name:var(--font-heading)]">Alle Themen</h2>
              </div>
              <div className="overflow-x-auto -mx-4">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-xs">
                      <th className="text-left p-3 pl-4">Thema</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Genauigkeit</th>
                      <th className="text-center p-3">Versuche</th>
                      <th className="text-center p-3 pr-4">Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topics.map((t) => (
                      <tr key={t.topicId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-3 pl-4 text-gray-700 font-medium">{t.topicId}</td>
                        <td className="p-3 text-center">
                          <MasteryDot level={t.masteryLevel} />
                        </td>
                        <td className="p-3 text-center font-medium tabular-nums">
                          {t.attempts > 0 ? `${t.accuracy}%` : '\u2014'}
                        </td>
                        <td className="p-3 text-center text-gray-500 tabular-nums">{t.attempts}</td>
                        <td className="p-3 text-center pr-4 tabular-nums">
                          {t.testScore !== null ? `${Math.round(t.testScore * 100)}%` : '\u2014'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Export buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex gap-3"
          >
            <Button variant="secondary" size="md" fullWidth onClick={() => window.print()}>
              <Icon name="book" size={16} className="mr-1" />
              Als PDF drucken
            </Button>
            <Button variant="primary" size="md" fullWidth onClick={() => exportCSV(topics)}>
              <Icon name="arrow-down" size={16} className="mr-1" />
              CSV exportieren
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </PageWrapper>
  );
}

function exportCSV(topics: { topicId: string; masteryLevel: string; accuracy: number; attempts: number; testScore: number | null }[]) {
  const header = 'Thema,Status,Genauigkeit,Versuche,Testergebnis\n';
  const rows = topics.map(t =>
    `${t.topicId},${t.masteryLevel},${t.accuracy}%,${t.attempts},${t.testScore !== null ? Math.round(t.testScore * 100) + '%' : ''}`
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mathemaxxing-bericht-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
