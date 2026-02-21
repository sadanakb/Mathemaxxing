'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type TestResultsProps = {
  topicId: string;
  topicTitle: string;
  correct: number;
  total: number;
  passingScore: number; // 0–1
  timeUsedSeconds: number;
  onRetry: () => void;
};

export function TestResults({
  topicId,
  topicTitle,
  correct,
  total,
  passingScore,
  timeUsedSeconds,
  onRetry,
}: TestResultsProps) {
  const score = correct / total;
  const passed = score >= passingScore;
  const percent = Math.round(score * 100);
  const passingPercent = Math.round(passingScore * 100);

  const minutes = Math.floor(timeUsedSeconds / 60);
  const seconds = timeUsedSeconds % 60;

  return (
    <div className="flex flex-col items-center text-center px-4 py-8">
      {/* Zertifikat-Karte */}
      <div
        className={[
          'w-full max-w-sm rounded-2xl border-2 p-6 mb-6 shadow-lg',
          passed
            ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-100'
            : 'border-red-300 bg-gradient-to-br from-red-50 to-orange-50',
        ].join(' ')}
      >
        <div className="text-5xl mb-3">{passed ? '🏆' : '📚'}</div>
        <h2
          className={[
            'text-2xl font-extrabold mb-1',
            passed ? 'text-emerald-800' : 'text-red-700',
          ].join(' ')}
        >
          {passed ? 'Bestanden!' : 'Nicht bestanden'}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{topicTitle}</p>

        {/* Score-Anzeige */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div
            className={[
              'text-4xl font-black mb-1',
              passed ? 'text-emerald-600' : 'text-red-500',
            ].join(' ')}
          >
            {percent}%
          </div>
          <div className="text-sm text-gray-500">
            {correct} von {total} richtig
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Bestehensgrenze: {passingPercent}%
          </div>
        </div>

        {/* Detail-Stats */}
        <div className="flex justify-around text-sm">
          <div>
            <div className="font-bold text-gray-700">{correct}</div>
            <div className="text-gray-400 text-xs">Richtig</div>
          </div>
          <div>
            <div className="font-bold text-gray-700">{total - correct}</div>
            <div className="text-gray-400 text-xs">Falsch</div>
          </div>
          <div>
            <div className="font-bold text-gray-700">
              {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
            </div>
            <div className="text-gray-400 text-xs">Zeit</div>
          </div>
        </div>
      </div>

      {/* Feedback-Text */}
      <p className="text-gray-600 mb-6 max-w-xs">
        {passed
          ? 'Ausgezeichnet! Du hast das Thema gemeistert. Weiter so! 🌟'
          : `Noch nicht ganz — du brauchst ${passingPercent}% zum Bestehen. Übe noch etwas und versuche es wieder!`}
      </p>

      {/* Aktionen */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {!passed && (
          <Button onClick={onRetry} variant="primary" className="w-full">
            Nochmal versuchen
          </Button>
        )}
        <Link href={`/learn/${topicId}`} className="w-full">
          <Button variant="secondary" className="w-full">
            Thema üben
          </Button>
        </Link>
        <Link href="/dashboard" className="w-full">
          <Button variant="ghost" className="w-full">
            Zurück zur Übersicht
          </Button>
        </Link>
      </div>
    </div>
  );
}
