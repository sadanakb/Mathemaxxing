'use client';

import { create } from 'zustand';
import type {
  UserProgress,
  TopicProgress,
  LeitnerCard,
  MasteryLevel,
  Achievement,
  Bundesland,
  Klassenstufe,
  Schulform,
  Kurstyp,
} from '@/lib/curriculum/types';
import { saveProgress, loadProgress, saveLeitnerCard, loadAllLeitnerCards } from '@/lib/storage/dexie';
import { downloadExport, parseImport, readFileAsText } from '@/lib/storage/export-import';
import { useGamificationStore } from './gamificationStore';

const SCHEMA_VERSION = 1;

function createDefaultProgress(userId: string): UserProgress {
  return {
    schemaVersion: SCHEMA_VERSION,
    userId,
    createdAt: new Date(),
    lastActiveAt: new Date(),
    bundesland: null,
    klasse: null,
    schulform: null,
    kurstyp: 'keine',
    topicProgress: {},
    leitnerCards: [],
    xpTotal: 0,
    level: 1,
    streakDays: 0,
    lastStreakDate: null,
    achievements: [],
    badges: [],
    coins: 0,
    totalCoinsEarned: 0,
    dailyGoalMinutes: 20,
    activeDates: [],
    todayMinutes: 0,
  };
}

function migrateProgress(raw: unknown, _fromVersion: number): UserProgress {
  // Future migrations added here
  // v1 → v2: ...
  return raw as UserProgress;
}

type ProgressActions = {
  // Lifecycle
  initFromDB: (userId: string) => Promise<void>;
  persistToDB: () => Promise<void>;

  // Topic progress
  updateTopicProgress: (topicId: string, updates: Partial<TopicProgress>) => void;
  setMastery: (topicId: string, level: MasteryLevel) => void;

  // XP & Gamification
  addXP: (amount: number) => void;
  checkAndUnlockAchievements: () => void;
  updateStreak: () => void;

  // Coins
  earnCoins: (amount: number, reason: string) => void;
  spendCoins: (amount: number) => boolean;

  // Leitner
  updateLeitnerCard: (card: LeitnerCard) => void;

  // Export / Import
  exportData: () => Promise<void>;
  importFromFile: (file: File) => Promise<{ success: boolean; error?: string }>;

  // Test
  updateTestResult: (topicId: string, score: number, passed: boolean) => void;

  // Aktivitäts-Tracking
  addMinutesToday: (minutes: number) => void;

  // Settings
  updateDailyGoal: (minutes: number) => void;
  resetProgress: () => Promise<void>;

  // Setup
  setCurriculumContext: (bl: Bundesland, k: Klassenstufe, sf: Schulform, kt: Kurstyp) => void;
};

type ProgressStore = {
  progress: UserProgress | null;
  leitnerCards: LeitnerCard[];
  isLoaded: boolean;
} & ProgressActions;

function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export const useProgressStore = create<ProgressStore>()((set, get) => ({
  progress: null,
  leitnerCards: [],
  isLoaded: false,

  initFromDB: async (userId: string) => {
    let progress = await loadProgress(userId);

    if (!progress) {
      progress = createDefaultProgress(userId);
      await saveProgress(progress);
    } else if (progress.schemaVersion !== SCHEMA_VERSION) {
      progress = migrateProgress(progress, progress.schemaVersion);
      progress.schemaVersion = SCHEMA_VERSION;
      await saveProgress(progress);
    }

    const leitnerCards = await loadAllLeitnerCards();
    set({ progress, leitnerCards, isLoaded: true });
  },

  persistToDB: async () => {
    const { progress } = get();
    if (!progress) return;
    progress.lastActiveAt = new Date();
    await saveProgress(progress);
  },

  updateTopicProgress: (topicId, updates) => {
    set((state) => {
      if (!state.progress) return state;
      const existing: TopicProgress = state.progress.topicProgress[topicId] ?? {
        topicId,
        masteryLevel: 'not-started',
        xpEarned: 0,
        attemptsTotal: 0,
        attemptsCorrect: 0,
      };
      return {
        progress: {
          ...state.progress,
          topicProgress: {
            ...state.progress.topicProgress,
            [topicId]: { ...existing, ...updates, lastAttemptDate: new Date() },
          },
        },
      };
    });
    get().persistToDB();
  },

  setMastery: (topicId, level) => {
    get().updateTopicProgress(topicId, {
      masteryLevel: level,
      masteredAt: level === 'mastered' ? new Date() : undefined,
    });
  },

  addXP: (amount) => {
    const prevLevel = get().progress?.level ?? 1;
    set((state) => {
      if (!state.progress) return state;
      const newXP = state.progress.xpTotal + amount;
      let level = state.progress.level;
      while (newXP >= xpForLevel(level + 1)) level++;
      return {
        progress: {
          ...state.progress,
          xpTotal: newXP,
          level,
        },
      };
    });
    const newLevel = get().progress?.level ?? 1;
    const gamification = useGamificationStore.getState();
    gamification.pushEvent({ type: 'xp', amount });
    if (newLevel > prevLevel) {
      gamification.pushEvent({ type: 'level-up', level: newLevel });
    }
    get().checkAndUnlockAchievements();
    get().persistToDB();
  },

  updateStreak: () => {
    const prevStreak = get().progress?.streakDays ?? 0;
    set((state) => {
      if (!state.progress) return state;
      const today = new Date().toISOString().slice(0, 10);
      const last = state.progress.lastStreakDate;

      let streakDays = state.progress.streakDays;
      if (last === today) return state; // already counted today
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (last === yesterday) {
        streakDays += 1;
      } else if (last !== today) {
        streakDays = 1; // streak broken
      }

      const existing = state.progress.activeDates ?? [];
      const activeDates = existing.includes(today) ? existing : [...existing, today];

      return {
        progress: {
          ...state.progress,
          streakDays,
          lastStreakDate: today,
          activeDates,
          // todayMinutes zurücksetzen wenn neuer Tag
          todayMinutes: last !== today ? 0 : (state.progress.todayMinutes ?? 0),
        },
      };
    });
    const newStreak = get().progress?.streakDays ?? 0;
    if (newStreak > prevStreak) {
      useGamificationStore.getState().pushEvent({ type: 'streak', days: newStreak });
    }
    get().persistToDB();
  },

  earnCoins: (amount, _reason) => {
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          coins: state.progress.coins + amount,
          totalCoinsEarned: state.progress.totalCoinsEarned + amount,
        },
      };
    });
    useGamificationStore.getState().pushEvent({ type: 'xp', amount }); // reuse xp animation for coins
    get().persistToDB();
  },

  spendCoins: (amount) => {
    const { progress } = get();
    if (!progress || progress.coins < amount) return false;
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          coins: state.progress.coins - amount,
        },
      };
    });
    get().persistToDB();
    return true;
  },

  addMinutesToday: (minutes) => {
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          todayMinutes: (state.progress.todayMinutes ?? 0) + minutes,
        },
      };
    });
    get().persistToDB();
  },

  checkAndUnlockAchievements: () => {
    const { progress } = get();
    if (!progress) return;

    const newAchievements: Achievement[] = [];
    const existingIds = new Set(progress.achievements.filter((a) => a.unlockedAt).map((a) => a.id));

    const masteredCount = Object.values(progress.topicProgress).filter(
      (p) => p.masteryLevel === 'mastered'
    ).length;

    const hasPerfectQuiz = Object.values(progress.topicProgress).some(
      (p) => p.postQuizScore === 1
    );

    // ── Topics Mastered ───────────────────────────────────────
    if (masteredCount >= 1 && !existingIds.has('first-mastery')) {
      newAchievements.push({
        id: 'first-mastery',
        title: 'Erste Meisterschaft!',
        description: 'Du hast dein erstes Thema gemeistert.',
        icon: '⭐',
        unlockedAt: new Date(),
        condition: { type: 'topics-mastered', count: 1 },
      });
    }
    if (masteredCount >= 5 && !existingIds.has('five-masteries')) {
      newAchievements.push({
        id: 'five-masteries',
        title: 'Fünf Themen gemeistert!',
        description: 'Du hast 5 Themen gemeistert.',
        icon: '🏆',
        unlockedAt: new Date(),
        condition: { type: 'topics-mastered', count: 5 },
      });
    }
    if (masteredCount >= 10 && !existingIds.has('ten-masteries')) {
      newAchievements.push({
        id: 'ten-masteries',
        title: 'Zehn Themen!',
        description: 'Du hast 10 Themen gemeistert.',
        icon: '🌟',
        unlockedAt: new Date(),
        condition: { type: 'topics-mastered', count: 10 },
      });
    }
    if (masteredCount >= 20 && !existingIds.has('twenty-masteries')) {
      newAchievements.push({
        id: 'twenty-masteries',
        title: 'Zwanzig Themen!',
        description: 'Du hast 20 Themen gemeistert.',
        icon: '💎',
        unlockedAt: new Date(),
        condition: { type: 'topics-mastered', count: 20 },
      });
    }
    if (masteredCount >= 50 && !existingIds.has('fifty-masteries')) {
      newAchievements.push({
        id: 'fifty-masteries',
        title: 'Fünfzig Themen!',
        description: 'Du hast 50 Themen gemeistert.',
        icon: '👑',
        unlockedAt: new Date(),
        condition: { type: 'topics-mastered', count: 50 },
      });
    }

    // ── Streak ────────────────────────────────────────────────
    if (progress.streakDays >= 3 && !existingIds.has('streak-3')) {
      newAchievements.push({
        id: 'streak-3',
        title: '3-Tages-Streak!',
        description: '3 Tage in Folge gelernt.',
        icon: '🔥',
        unlockedAt: new Date(),
        condition: { type: 'streak-days', count: 3 },
      });
    }
    if (progress.streakDays >= 7 && !existingIds.has('streak-7')) {
      newAchievements.push({
        id: 'streak-7',
        title: 'Wochen-Streak!',
        description: '7 Tage in Folge gelernt.',
        icon: '🔥',
        unlockedAt: new Date(),
        condition: { type: 'streak-days', count: 7 },
      });
    }
    if (progress.streakDays >= 14 && !existingIds.has('streak-14')) {
      newAchievements.push({
        id: 'streak-14',
        title: 'Zwei-Wochen-Streak!',
        description: '14 Tage in Folge gelernt.',
        icon: '💪',
        unlockedAt: new Date(),
        condition: { type: 'streak-days', count: 14 },
      });
    }
    if (progress.streakDays >= 30 && !existingIds.has('streak-30')) {
      newAchievements.push({
        id: 'streak-30',
        title: 'Monats-Streak!',
        description: '30 Tage in Folge gelernt.',
        icon: '🌟',
        unlockedAt: new Date(),
        condition: { type: 'streak-days', count: 30 },
      });
    }

    // ── XP ────────────────────────────────────────────────────
    if (progress.xpTotal >= 500 && !existingIds.has('xp-500')) {
      newAchievements.push({
        id: 'xp-500',
        title: '500 XP!',
        description: 'Du hast 500 XP gesammelt.',
        icon: '⚡',
        unlockedAt: new Date(),
        condition: { type: 'xp-total', amount: 500 },
      });
    }
    if (progress.xpTotal >= 2000 && !existingIds.has('xp-2000')) {
      newAchievements.push({
        id: 'xp-2000',
        title: '2000 XP!',
        description: 'Du hast 2000 XP gesammelt.',
        icon: '💫',
        unlockedAt: new Date(),
        condition: { type: 'xp-total', amount: 2000 },
      });
    }
    if (progress.xpTotal >= 5000 && !existingIds.has('xp-5000')) {
      newAchievements.push({
        id: 'xp-5000',
        title: '5000 XP!',
        description: 'Du hast 5000 XP gesammelt.',
        icon: '🚀',
        unlockedAt: new Date(),
        condition: { type: 'xp-total', amount: 5000 },
      });
    }

    // ── Level ─────────────────────────────────────────────────
    if (progress.level >= 5 && !existingIds.has('level-5')) {
      newAchievements.push({
        id: 'level-5',
        title: 'Level 5!',
        description: 'Du hast Level 5 erreicht.',
        icon: '🎯',
        unlockedAt: new Date(),
        condition: { type: 'level-reached', level: 5 },
      });
    }
    if (progress.level >= 10 && !existingIds.has('level-10')) {
      newAchievements.push({
        id: 'level-10',
        title: 'Level 10!',
        description: 'Du hast Level 10 erreicht.',
        icon: '🏅',
        unlockedAt: new Date(),
        condition: { type: 'level-reached', level: 10 },
      });
    }

    // ── Perfect Quiz ──────────────────────────────────────────
    if (hasPerfectQuiz && !existingIds.has('first-perfect')) {
      newAchievements.push({
        id: 'first-perfect',
        title: 'Perfektes Quiz!',
        description: 'Du hast ein Quiz mit 100% abgeschlossen.',
        icon: '💯',
        unlockedAt: new Date(),
        condition: { type: 'perfect-quiz' },
      });
    }

    if (newAchievements.length > 0) {
      const gamification = useGamificationStore.getState();
      for (const achievement of newAchievements) {
        gamification.pushEvent({ type: 'achievement', achievement });
      }
      set((state) => ({
        progress: state.progress
          ? {
              ...state.progress,
              achievements: [...state.progress.achievements, ...newAchievements],
            }
          : null,
      }));
    }
  },

  updateLeitnerCard: (card) => {
    set((state) => {
      const existing = state.leitnerCards.filter((c) => c.topicId !== card.topicId);
      return { leitnerCards: [...existing, card] };
    });
    saveLeitnerCard(card);
  },

  exportData: async () => {
    const { progress, leitnerCards } = get();
    if (!progress) return;
    downloadExport(progress, leitnerCards);
  },

  importFromFile: async (file) => {
    try {
      const text = await readFileAsText(file);
      const result = parseImport(text);
      if (!result.success) return result;

      const { data } = result;
      const progress = {
        ...data.progress,
        createdAt: new Date(data.progress.createdAt),
        lastActiveAt: new Date(data.progress.lastActiveAt),
      } as UserProgress;

      await saveProgress(progress);
      set({ progress, leitnerCards: data.leitnerCards, isLoaded: true });
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  },

  updateTestResult: (topicId, score, passed) => {
    set((state) => {
      if (!state.progress) return state;
      const existing: TopicProgress = state.progress.topicProgress[topicId] ?? {
        topicId,
        masteryLevel: 'not-started',
        xpEarned: 0,
        attemptsTotal: 0,
        attemptsCorrect: 0,
      };
      const prevAttempts = existing.testAttempts ?? 0;
      return {
        progress: {
          ...state.progress,
          topicProgress: {
            ...state.progress.topicProgress,
            [topicId]: {
              ...existing,
              testScore: score,
              testAttempts: prevAttempts + 1,
              ...(passed && !existing.testPassedAt ? { testPassedAt: new Date() } : {}),
            },
          },
        },
      };
    });
    get().persistToDB();
  },

  updateDailyGoal: (minutes) => {
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, dailyGoalMinutes: minutes }
        : null,
    }));
    get().persistToDB();
  },

  resetProgress: async () => {
    const { progress } = get();
    if (!progress) return;
    const fresh = createDefaultProgress(progress.userId);
    fresh.bundesland = progress.bundesland;
    fresh.klasse = progress.klasse;
    fresh.schulform = progress.schulform;
    fresh.kurstyp = progress.kurstyp;
    await saveProgress(fresh);
    set({ progress: fresh, leitnerCards: [] });
  },

  setCurriculumContext: (bl, k, sf, kt) => {
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, bundesland: bl, klasse: k, schulform: sf, kurstyp: kt }
        : null,
    }));
    get().persistToDB();
  },
}));
