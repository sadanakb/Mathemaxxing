'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCurriculumStore, useCurrentTheme, useCurrentWorld } from '@/store/curriculumStore';
import { THEMES } from '@/lib/theme/theme-config';
import { WORLDS } from '@/lib/theme/worlds';
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

const WORLD_GREETINGS: Record<string, string> = {
  entdecker: 'Willkommen im Wald!',
  abenteuer: 'Auf zum Jahrmarkt!',
  forscher: 'Labor bereit!',
  weltraum: 'Mission Control meldet sich!',
};

function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

/* ── Hero Scene SVGs (decorative, rendered at low opacity) ──────── */

function HeroSceneEntdecker() {
  return (
    <svg className="absolute right-0 bottom-0 h-full w-1/2" viewBox="0 0 200 150" preserveAspectRatio="xMaxYMax slice">
      {/* Trees */}
      <rect x="150" y="70" width="12" height="60" fill="white" />
      <polygon points="156,20 130,80 182,80" fill="white" />
      <rect x="100" y="90" width="10" height="40" fill="white" />
      <polygon points="105,50 82,100 128,100" fill="white" />
      {/* Gems scattered */}
      <polygon points="40,110 50,95 60,110 50,120" fill="white" />
      <polygon points="180,120 186,110 192,120 186,126" fill="white" />
    </svg>
  );
}

function HeroSceneAbenteuer() {
  return (
    <svg className="absolute right-0 bottom-0 h-full w-1/2" viewBox="0 0 200 150" preserveAspectRatio="xMaxYMax slice">
      {/* Ferris wheel */}
      <circle cx="150" cy="60" r="45" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="150" cy="60" r="4" fill="white" />
      {/* Gondolas */}
      <circle cx="150" cy="15" r="6" fill="white" opacity="0.8" />
      <circle cx="105" cy="60" r="6" fill="white" opacity="0.8" />
      <circle cx="150" cy="105" r="6" fill="white" opacity="0.8" />
      <circle cx="195" cy="60" r="6" fill="white" opacity="0.8" />
      {/* Stand */}
      <rect x="145" y="105" width="10" height="40" fill="white" />
      {/* Balloons */}
      <ellipse cx="40" cy="40" rx="12" ry="15" fill="white" />
      <line x1="40" y1="55" x2="40" y2="80" stroke="white" strokeWidth="1" />
    </svg>
  );
}

function HeroSceneForscher() {
  return (
    <svg className="absolute right-0 bottom-0 h-full w-1/2" viewBox="0 0 200 150" preserveAspectRatio="xMaxYMax slice">
      {/* Flask */}
      <rect x="140" y="40" width="20" height="30" fill="none" stroke="white" strokeWidth="2" />
      <path d="M135,70 L140,70 L140,40 M160,40 L160,70 L165,70 L165,120 Q165,140 150,140 Q135,140 135,120 L135,70" fill="none" stroke="white" strokeWidth="2" />
      {/* Bubbles in flask */}
      <circle cx="148" cy="100" r="4" fill="white" opacity="0.6" />
      <circle cx="155" cy="110" r="3" fill="white" opacity="0.5" />
      <circle cx="145" cy="115" r="2.5" fill="white" opacity="0.4" />
      {/* Atom */}
      <circle cx="60" cy="50" r="4" fill="white" />
      <ellipse cx="60" cy="50" rx="20" ry="8" fill="none" stroke="white" strokeWidth="1.5" />
      <ellipse cx="60" cy="50" rx="20" ry="8" fill="none" stroke="white" strokeWidth="1.5" transform="rotate(60 60 50)" />
      <ellipse cx="60" cy="50" rx="20" ry="8" fill="none" stroke="white" strokeWidth="1.5" transform="rotate(120 60 50)" />
    </svg>
  );
}

function HeroSceneWeltraum() {
  return (
    <svg className="absolute right-0 bottom-0 h-full w-1/2" viewBox="0 0 200 150" preserveAspectRatio="xMaxYMax slice">
      {/* Rocket */}
      <rect x="155" y="30" width="16" height="50" rx="3" fill="white" />
      <polygon points="163,10 155,35 171,35" fill="white" />
      <polygon points="155,70 145,90 155,80" fill="white" opacity="0.8" />
      <polygon points="171,70 181,90 171,80" fill="white" opacity="0.8" />
      <circle cx="163" cy="50" r="5" fill="white" opacity="0.3" />
      {/* Planet */}
      <circle cx="60" cy="40" r="22" fill="white" opacity="0.6" />
      <ellipse cx="60" cy="42" rx="32" ry="8" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
      {/* Stars */}
      <circle cx="30" cy="80" r="2" fill="white" />
      <circle cx="120" cy="20" r="1.5" fill="white" />
      <circle cx="100" cy="120" r="2" fill="white" />
      <circle cx="180" cy="130" r="1.5" fill="white" />
    </svg>
  );
}

/* ── Dashboard Page ─────────────────────────────────────────────── */

export default function DashboardPage() {
  const router = useRouter();
  const { bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const theme = useCurrentTheme();
  const world = useCurrentWorld();
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
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm opacity-60 font-medium">Lade deine Daten...</p>
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
          {/* World-specific decorative SVG behind Finn */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {world === 'entdecker' && <HeroSceneEntdecker />}
            {world === 'abenteuer' && <HeroSceneAbenteuer />}
            {world === 'forscher' && <HeroSceneForscher />}
            {world === 'weltraum' && <HeroSceneWeltraum />}
          </div>
          <div className="relative z-10 p-6 md:p-8 flex items-center gap-5">
            {showMascot && (
              <Finn
                mood={isStreakActive ? 'happy' : 'encouraging'}
                size="lg"
                outfit={world ? WORLDS[world].finnOutfit : undefined}
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-extrabold text-white">
                {world ? WORLD_GREETINGS[world] : 'Hallo!'}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Klasse {klasse} · {schulform}
                {world && WORLDS[world] ? ` · ${WORLDS[world].label}` : ''}
              </p>
              {/* XP Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white/90 flex items-center gap-1">
                    <Icon name="star" size={14} />
                    Level {progress.level}
                  </span>
                  <span className="text-xs text-white/70">{xpInLevel} / {xpNeeded} XP</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
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
          <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/5" />
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
          <Card padding="md" themed>
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-[var(--color-primary)]" />
              Streak-Kalender
            </h3>
            <StreakCalendar activeDates={progress.activeDates ?? []} mode="7d" />
          </Card>
          <Card padding="md" themed className="flex flex-col items-center justify-center">
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Icon name="target" size={16} className="text-[var(--color-primary)]" />
              Tagesziel
            </h3>
            <GoalRing current={progress.todayMinutes ?? 0} goal={progress.dailyGoalMinutes} size={96} />
          </Card>
        </div>

        {/* ── Review Prompt ───────────────────────────────── */}
        {reviewSession.totalDue > 0 && (
          <Card variant="gradient" themed className="mb-6 border-2 border-[var(--color-primary)]/20">
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
        <Card className="mb-6" themed>
          <DailyChallenges />
        </Card>

        {/* ── Topic Grid ─────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-[family-name:var(--font-heading)] font-extrabold">
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
                    themed
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
