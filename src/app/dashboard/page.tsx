'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCurriculumStore, useCurrentTheme } from '@/store/curriculumStore';
import { THEMES } from '@/lib/theme/theme-config';
import { useProgressStore } from '@/store/progressStore';
import { getCurriculum } from '@/lib/curriculum/merge';
import { buildReviewSession } from '@/lib/spaced-repetition/scheduler';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StatPill } from '@/components/ui/StatPill';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
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
  'not-started': 'border-l-gray-300',
  'introduced': 'border-l-amber-400',
  'practicing': 'border-l-blue-400',
  'mastered': 'border-l-emerald-500',
};

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  'not-started': 'Neu',
  'introduced': 'Kennengelernt',
  'practicing': 'In Übung',
  'mastered': 'Gemeistert',
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
  const masteredCount = Object.values(progress.topicProgress).filter((p) => p.masteryLevel === 'mastered').length;

  return (
    <PageWrapper>
      <GamificationOverlay />
      <PageTransition>
        {/* ── Hero Section ────────────────────────────────── */}
        <div className="relative rounded-[var(--card-radius)] overflow-hidden mb-6"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className="relative z-10 p-6 flex items-center gap-4">
            {showMascot && (
              <Finn
                mood={isStreakActive ? 'happy' : 'encouraging'}
                size="md"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-extrabold text-white">
                Hallo!
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Klasse {klasse} · {schulform}
              </p>
              {/* XP Bar inside hero */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white/90">Level {progress.level}</span>
                  <span className="text-xs text-white/70">{xpInLevel} / {xpNeeded} XP</span>
                </div>
                <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--gradient-xp)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (xpInLevel / xpNeeded) * 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
        </div>

        {/* ── Stat Pills ─────────────────────────────────── */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <StatPill
            icon={<Icon name="flame" size={18} />}
            label="Streak"
            value={`${progress.streakDays} Tage`}
            color="#EF4444"
          />
          <StatPill
            icon={<Icon name="coin" size={18} />}
            label="Münzen"
            value={progress.coins ?? 0}
            color="#F59E0B"
          />
          <StatPill
            icon={<Icon name="check" size={18} />}
            label="Gemeistert"
            value={masteredCount}
            color="#10B981"
          />
        </div>

        {/* ── Streak-Kalender + Tagesziel ─────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Card padding="md">
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-[var(--color-primary)]" />
              Streak-Kalender
            </h3>
            <StreakCalendar activeDates={progress.activeDates ?? []} mode="7d" />
          </Card>
          <Card padding="md" className="flex flex-col items-center justify-center">
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Icon name="target" size={16} className="text-[var(--color-primary)]" />
              Tagesziel
            </h3>
            <GoalRing current={progress.todayMinutes ?? 0} goal={progress.dailyGoalMinutes} size={96} />
          </Card>
        </div>

        {/* ── Review Prompt ───────────────────────────────── */}
        {reviewSession.totalDue > 0 && (
          <Card variant="gradient" className="mb-6 border-2 border-[var(--color-primary)]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon name="refresh" size={20} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] font-bold text-gray-900">
                    {reviewSession.totalDue} Karte{reviewSession.totalDue !== 1 ? 'n' : ''} fällig
                  </h2>
                  <p className="text-sm text-gray-500">
                    Leitner-System: Wiederholung stärkt dein Wissen!
                  </p>
                </div>
              </div>
              <Link href="/review">
                <Button size="sm">Jetzt üben</Button>
              </Link>
            </div>
          </Card>
        )}

        {/* ── Daily Challenges ────────────────────────────── */}
        <Card className="mb-6">
          <DailyChallenges />
        </Card>

        {/* ── Topic Grid ─────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-[family-name:var(--font-heading)] font-extrabold text-gray-900">
            Deine Themen
          </h2>
          <Badge variant="info">{curriculum.length} Themen</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {curriculum.map((topic, i) => {
            const tp = progress.topicProgress[topic.id];
            const mastery: MasteryLevel = tp?.masteryLevel ?? 'not-started';
            const accuracy = tp && tp.attemptsTotal > 0
              ? Math.round((tp.attemptsCorrect / tp.attemptsTotal) * 100)
              : null;
            const canTest = mastery === 'practicing' || mastery === 'mastered';
            const testPassed = tp?.testPassedAt != null;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
              >
                <Link href={`/learn/${topic.id}`}>
                  <Card
                    variant="interactive"
                    padding="md"
                    className={[
                      'border-l-4 h-full',
                      MASTERY_COLORS[mastery],
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-[family-name:var(--font-heading)] font-bold text-gray-900 text-sm leading-snug">
                        {topic.title}
                      </h3>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {testPassed && (
                          <Badge variant="success" icon={<Icon name="check" size={12} />}>
                            Bestanden
                          </Badge>
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
                            animated={false}
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
                        <Icon name={testPassed ? 'refresh' : 'book'} size={14} />
                        {testPassed ? 'Nochmal prüfen' : 'Test ablegen'}
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </PageTransition>
    </PageWrapper>
  );
}
