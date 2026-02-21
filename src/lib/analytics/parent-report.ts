import type { UserProgress, TopicProgress } from '@/lib/curriculum/types';

export type ProgressSummary = {
  totalTopics: number;
  masteredTopics: number;
  inProgressTopics: number;
  notStartedTopics: number;
  overallAccuracy: number;   // 0-100
  totalXP: number;
  level: number;
  streakDays: number;
  totalMinutes: number;
  activeDaysCount: number;
};

export type TopicDetail = {
  topicId: string;
  masteryLevel: string;
  accuracy: number;
  attempts: number;
  stars: number;
  testScore: number | null;
};

export type WeeklyActivityData = {
  date: string;       // ISO date
  dayName: string;    // German day name
  active: boolean;
};

export function generateProgressSummary(progress: UserProgress): ProgressSummary {
  const topics = Object.values(progress.topicProgress);
  const masteredTopics = topics.filter(t => t.masteryLevel === 'mastered').length;
  const inProgressTopics = topics.filter(t => t.masteryLevel === 'practicing' || t.masteryLevel === 'introduced').length;
  const totalAttempts = topics.reduce((sum, t) => sum + t.attemptsTotal, 0);
  const totalCorrect = topics.reduce((sum, t) => sum + t.attemptsCorrect, 0);

  return {
    totalTopics: topics.length,
    masteredTopics,
    inProgressTopics,
    notStartedTopics: topics.length > 0 ? topics.filter(t => t.masteryLevel === 'not-started').length : 0,
    overallAccuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
    totalXP: progress.xpTotal,
    level: progress.level,
    streakDays: progress.streakDays,
    totalMinutes: progress.todayMinutes,
    activeDaysCount: (progress.activeDates ?? []).length,
  };
}

export function getTopicDetails(progress: UserProgress): TopicDetail[] {
  return Object.entries(progress.topicProgress).map(([topicId, tp]) => ({
    topicId,
    masteryLevel: tp.masteryLevel,
    accuracy: tp.attemptsTotal > 0 ? Math.round((tp.attemptsCorrect / tp.attemptsTotal) * 100) : 0,
    attempts: tp.attemptsTotal,
    stars: tp.stars ?? 0,
    testScore: tp.testScore ?? null,
  }));
}

export function getWeeklyActivity(progress: UserProgress): WeeklyActivityData[] {
  const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const result: WeeklyActivityData[] = [];
  const activeDatesSet = new Set(progress.activeDates ?? []);

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    result.push({
      date: dateStr,
      dayName: dayNames[date.getDay()],
      active: activeDatesSet.has(dateStr),
    });
  }

  return result;
}

export function getTroubleSpots(progress: UserProgress): TopicDetail[] {
  return getTopicDetails(progress)
    .filter(t => t.attempts >= 3 && t.accuracy < 50)
    .sort((a, b) => a.accuracy - b.accuracy);
}
