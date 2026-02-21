'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCurriculumStore, useCurrentTheme } from '@/store/curriculumStore';
import { THEMES } from '@/lib/theme/theme-config';
import { useProgressStore } from '@/store/progressStore';
import { getCurriculum } from '@/lib/curriculum/merge';
import { buildReviewSession } from '@/lib/spaced-repetition/scheduler';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BundeslandWappen } from '@/components/wappen/BundeslandWappen';
import { Logo } from '@/components/layout/Logo';
import { GamificationOverlay } from '@/components/gamification/GamificationOverlay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { StreakCalendar } from '@/components/gamification/StreakCalendar';
import { GoalRing } from '@/components/gamification/GoalRing';
import { Stars } from '@/components/gamification/Stars';
import { Finn } from '@/components/gamification/Finn';
import DailyChallenges from '@/components/gamification/DailyChallenges';
import type { MasteryLevel } from '@/lib/curriculum/types';

const MASTERY_COLORS: Record<MasteryLevel, string> = {
  'not-started': 'border-gray-200 bg-gray-50',
  'introduced': 'border-amber-200 bg-amber-50',
  'practicing': 'border-blue-200 bg-blue-100',
  'mastered': 'border-emerald-300 bg-emerald-50',
};

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  'not-started': 'Neu',
  'introduced': 'Kennengelernt',
  'practicing': 'In Übung',
  'mastered': 'Gemeistert ✓',
};

function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export default function DashboardPage() {
  const router = useRouter();
  const { bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const theme = useCurrentTheme();
  const showMascot = THEMES[theme].mascot;
  const { progress, leitnerCards, isLoaded, initFromDB } = useProgressStore();

  useEffect(() => {
    if (!bundesland || !klasse) {
      router.replace('/onboarding');
      return;
    }
    if (!isLoaded) {
      const userId = typeof window !== 'undefined'
        ? localStorage.getItem('mathemeister-user-id') ?? crypto.randomUUID()
        : crypto.randomUUID();
      if (typeof window !== 'undefined') {
        localStorage.setItem('mathemeister-user-id', userId);
      }
      initFromDB(userId);
    }
  }, [bundesland, klasse, isLoaded, initFromDB, router]);

  if (!bundesland || !klasse || !schulform || !isLoaded || !progress) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="mb-3 animate-pulse"><Logo size="lg" showText={false} /></div>
            <p className="text-gray-500">Lade deine Daten...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const curriculum = getCurriculum({ bundesland, klasse, schulform, kurstyp });
  const reviewSession = buildReviewSession(leitnerCards);
  const currentLevelXP = xpForLevel(progress.level);
  const nextLevelXP = xpForLevel(progress.level + 1);
  const xpInLevel = progress.xpTotal - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  const today = new Date().toISOString().slice(0, 10);
  const isStreakActive = progress.lastStreakDate === today;
  const unlockedAchievements = progress.achievements.filter((a) => a.unlockedAt);

  return (
    <PageWrapper>
      <GamificationOverlay />

      {/* Welcome Header */}
      <div className="mb-6 flex items-center gap-4">
        {showMascot && (
          <Finn
            mood={isStreakActive ? 'happy' : 'encouraging'}
            size="md"
          />
        )}
        <div>
          <h1 className="text-3xl font-[var(--heading-weight)] text-gray-900">
            Hallo! 👋
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5">
            Klasse {klasse} · {schulform} · <BundeslandWappen bundesland={bundesland} size="sm" /> {bundesland}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)]">{progress.xpTotal}</div>
          <div className="text-xs text-gray-500 mt-1">XP</div>
        </Card>
        <Card padding="sm" className="text-center">
          <StreakDisplay days={progress.streakDays} isActive={isStreakActive} />
        </Card>
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-amber-500">{progress.coins ?? 0}</div>
          <div className="text-xs text-gray-500 mt-1">Münzen</div>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {Object.values(progress.topicProgress).filter((p) => p.masteryLevel === 'mastered').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Gemeistert</div>
        </Card>
      </div>

      {/* Streak-Kalender + Tagesziel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card padding="md">
          <h3 className="font-bold text-gray-800 text-sm mb-3">🔥 Streak-Kalender</h3>
          <StreakCalendar activeDates={progress.activeDates ?? []} mode="7d" />
        </Card>
        <Card padding="md" className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-gray-800 text-sm mb-3">🎯 Tagesziel</h3>
          <GoalRing current={progress.todayMinutes ?? 0} goal={progress.dailyGoalMinutes} size={96} />
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-700">Level {progress.level}</span>
          <span className="text-sm text-gray-500">{xpInLevel} / {xpNeeded} XP</span>
        </div>
        <Progress value={xpInLevel} max={xpNeeded} variant="default" />
      </Card>

      {/* Achievements */}
      {unlockedAchievements.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Erfolge</h2>
          <div className="flex flex-wrap gap-2">
            {unlockedAchievements.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5"
                title={a.description}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-xs font-medium text-amber-900">{a.title}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Review Section */}
      {reviewSession.totalDue > 0 && (
        <Card className="mb-6 border-2 border-amber-300 bg-amber-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-amber-900">
                🔄 {reviewSession.totalDue} Karte{reviewSession.totalDue !== 1 ? 'n' : ''} zur Wiederholung
              </h2>
              <p className="text-sm text-amber-700 mt-1">
                Leitner-System: Heute fällig!
              </p>
            </div>
            <Link href="/review">
              <Button size="sm">Jetzt üben</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Daily Challenges */}
      <Card className="mb-6">
        <DailyChallenges />
      </Card>

      {/* Topic Grid */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-[var(--heading-weight)] text-gray-900">Deine Themen</h2>
        <Badge variant="info">{curriculum.length} Themen</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {curriculum.map((topic) => {
          const tp = progress.topicProgress[topic.id];
          const mastery: MasteryLevel = tp?.masteryLevel ?? 'not-started';
          const accuracy = tp && tp.attemptsTotal > 0
            ? Math.round((tp.attemptsCorrect / tp.attemptsTotal) * 100)
            : null;
          const canTest = mastery === 'practicing' || mastery === 'mastered';
          const testPassed = tp?.testPassedAt != null;

          return (
            <div key={topic.id} className="relative">
              <Link href={`/learn/${topic.id}`}>
                <Card
                  padding="md"
                  className={[
                    'border-2 hover:shadow-md transition-all duration-200 cursor-pointer h-full',
                    MASTERY_COLORS[mastery],
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                      {topic.title}
                    </h3>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {testPassed && (
                        <Badge variant="success">✓ Bestanden</Badge>
                      )}
                      <Badge
                        variant={mastery === 'mastered' ? 'success' : mastery === 'practicing' ? 'info' : 'default'}
                      >
                        {MASTERY_LABELS[mastery]}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    {tp && tp.attemptsTotal > 0 ? (
                      <div className="flex-1 mr-2">
                        <Progress
                          value={accuracy ?? 0}
                          max={100}
                          size="sm"
                          variant={mastery === 'mastered' ? 'success' : 'default'}
                        />
                      </div>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <div className="flex items-center gap-2">
                      {tp?.testScore != null && (
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                          tp.testScore >= 0.8 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {Math.round(tp.testScore * 100)}%
                        </span>
                      )}
                      {tp?.stars != null && tp.stars > 0 && (
                        <Stars count={tp.stars} size="sm" />
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
              {canTest && (
                <div className="mt-1.5">
                  <Link href={`/test/${topic.id}`}>
                    <Button
                      size="sm"
                      variant={testPassed ? 'ghost' : 'secondary'}
                      className="w-full text-xs"
                    >
                      {testPassed ? '🔄 Nochmal prüfen' : '📝 Test ablegen'}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
