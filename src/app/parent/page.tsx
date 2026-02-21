'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useProgressStore } from '@/store/progressStore';
import {
  generateProgressSummary,
  getTopicDetails,
  getWeeklyActivity,
  getTroubleSpots,
} from '@/lib/analytics/parent-report';
import { generateRecommendations } from '@/lib/analytics/recommendations';

const PARENT_PIN = '1234'; // Default PIN, stored in localStorage in production

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
        <div className="max-w-sm mx-auto py-12 space-y-6">
          <div className="text-center">
            <span className="text-4xl" role="img" aria-label="Familie">&#x1F468;&#x200D;&#x1F469;&#x200D;&#x1F467;&#x200D;&#x1F466;</span>
            <h1 className="text-xl font-bold mt-2">Eltern-Bereich</h1>
            <p className="text-sm text-gray-500 mt-1">Bitte PIN eingeben</p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full text-center text-2xl tracking-[0.5em] py-3 border-2 border-gray-300 rounded-xl focus:border-[var(--color-primary)] focus:outline-none"
              placeholder="____"
              autoFocus
            />
            {pinError && (
              <p className="text-red-500 text-sm text-center">Falsche PIN. Standard: 1234</p>
            )}
            <button
              type="submit"
              disabled={pinInput.length !== 4}
              className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl disabled:opacity-50"
            >
              Entsperren
            </button>
          </form>
        </div>
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Fortschrittsbericht</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sperren
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SummaryCard label="Gemeistert" value={summary.masteredTopics} total={summary.totalTopics} color="text-emerald-600" />
          <SummaryCard label="Genauigkeit" value={`${summary.overallAccuracy}%`} color="text-blue-600" />
          <SummaryCard label="Level" value={summary.level} color="text-purple-600" />
          <SummaryCard label="Streak" value={`${summary.streakDays}d`} color="text-amber-600" />
        </div>

        {/* Weekly activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Aktivit&auml;t diese Woche</h2>
          <div className="flex justify-between gap-1">
            {weekActivity.map((day) => (
              <div key={day.date} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  day.active
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {day.dayName}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-600">Empfehlungen</h2>
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border ${
                  rec.type === 'strength' ? 'bg-emerald-50 border-emerald-200' :
                  rec.type === 'weakness' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{rec.icon}</span>
                  <span className="font-semibold text-sm">{rec.title}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Trouble spots */}
        {troubles.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-red-700 mb-2">Problemthemen (Genauigkeit &lt; 50%)</h2>
            <div className="space-y-1">
              {troubles.map((t) => (
                <div key={t.topicId} className="flex justify-between text-sm">
                  <span className="text-gray-700">{t.topicId}</span>
                  <span className="text-red-600 font-medium">{t.accuracy}% ({t.attempts} Versuche)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topic breakdown table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <h2 className="text-sm font-semibold text-gray-600 p-4 pb-2">Alle Themen</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-xs">
                  <th className="text-left p-3">Thema</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-center p-3">Genauigkeit</th>
                  <th className="text-center p-3">Versuche</th>
                  <th className="text-center p-3">Test</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((t) => (
                  <tr key={t.topicId} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{t.topicId}</td>
                    <td className="p-3 text-center">
                      <MasteryBadge level={t.masteryLevel} />
                    </td>
                    <td className="p-3 text-center font-medium">
                      {t.attempts > 0 ? `${t.accuracy}%` : '\u2014'}
                    </td>
                    <td className="p-3 text-center text-gray-500">{t.attempts}</td>
                    <td className="p-3 text-center">
                      {t.testScore !== null ? `${Math.round(t.testScore * 100)}%` : '\u2014'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export button */}
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Als PDF drucken
          </button>
          <button
            onClick={() => exportCSV(topics)}
            className="flex-1 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            CSV exportieren
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

function SummaryCard({ label, value, total, color }: { label: string; value: string | number; total?: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
      <div className={`text-xl font-bold ${color}`}>
        {value}
        {total !== undefined && <span className="text-sm text-gray-400">/{total}</span>}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function MasteryBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    'not-started': 'bg-gray-100 text-gray-500',
    introduced: 'bg-blue-100 text-blue-700',
    practicing: 'bg-amber-100 text-amber-700',
    mastered: 'bg-emerald-100 text-emerald-700',
  };
  const labels: Record<string, string> = {
    'not-started': 'Neu',
    introduced: 'Begonnen',
    practicing: '\u00DCbend',
    mastered: 'Gemeistert',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[level] ?? styles['not-started']}`}>
      {labels[level] ?? level}
    </span>
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
