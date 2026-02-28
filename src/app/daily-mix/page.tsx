'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCurriculumStore } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { buildDailyMixSession } from '@/lib/spaced-repetition/scheduler';
import { getCurriculum } from '@/lib/curriculum/merge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { findTopicById } from '@/lib/curriculum/merge';

export default function DailyMixPage() {
  const router = useRouter();
  const { bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const { leitnerCards, progress } = useProgressStore();

  if (!bundesland || !klasse || !schulform) {
    router.replace('/onboarding');
    return null;
  }

  const curriculum = getCurriculum({ bundesland, klasse, schulform, kurstyp });
  const availableTopicIds = curriculum.map((t) => t.id);
  const masteredIds = new Set(
    Object.entries(progress?.topicProgress ?? {})
      .filter(([, v]) => v.masteryLevel === 'mastered')
      .map(([k]) => k)
  );
  const notMasteredIds = availableTopicIds.filter((id) => !masteredIds.has(id));

  const mix = buildDailyMixSession(leitnerCards, notMasteredIds, progress?.dailyGoalMinutes ?? 20);

  const reviewTopics = mix.reviewTopicIds
    .map((id) => findTopicById(id))
    .filter(Boolean);
  const newTopics = mix.newTopicIds
    .map((id) => findTopicById(id))
    .filter(Boolean);

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2">✨ Tagesmix</h1>
      <p className="text-gray-500 mb-6">
        Dein persönlicher Plan für heute — Wiederholung + neues Lernen.
      </p>

      {reviewTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-2">
            🔄 Wiederholen <Badge variant="warning">{reviewTopics.length}</Badge>
          </h2>
          <div className="flex flex-col gap-3">
            {reviewTopics.map((topic) => topic && (
              <Link key={topic.id} href={`/learn/${topic.id}`}>
                <Card themed padding="sm" className="hover:shadow-md transition-shadow cursor-pointer border-2 border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{topic.title}</p>
                      <p className="text-xs text-gray-500">Klasse {topic.klasse}</p>
                    </div>
                    <Badge variant="warning">Wiederholen</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {newTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-2">
            🆕 Neu lernen <Badge variant="info">{newTopics.length}</Badge>
          </h2>
          <div className="flex flex-col gap-3">
            {newTopics.map((topic) => topic && (
              <Link key={topic.id} href={`/learn/${topic.id}`}>
                <Card themed padding="sm" className="hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{topic.title}</p>
                      <p className="text-xs text-gray-500">{topic.lernbereich} · ~{topic.estimatedMinutes} Min.</p>
                    </div>
                    <Badge variant="info">Neu</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {reviewTopics.length === 0 && newTopics.length === 0 && (
        <Card themed className="text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="font-bold">Alles für heute erledigt!</h2>
          <p className="text-gray-500 mt-2">Komm morgen wieder für neue Aufgaben.</p>
          <Button className="mt-4" onClick={() => router.push('/dashboard')}>
            Zur Übersicht
          </Button>
        </Card>
      )}
    </PageWrapper>
  );
}
