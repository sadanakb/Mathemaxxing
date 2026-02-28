'use client';

import { useMemo } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useProgressStore } from '@/store/progressStore';
import { useCurriculumStore, useCurrentWorld } from '@/store/curriculumStore';
import { getCurriculum } from '@/lib/curriculum/merge';
import { computeMapLayout } from '@/lib/curriculum/map-layout';
import { LearningMap } from '@/components/map/LearningMap';
import { WorldBackground } from '@/components/world/WorldBackground';
import { WORLDS } from '@/lib/theme/worlds';

export default function MapPage() {
  const progress = useProgressStore((s) => s.progress);
  const { bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const world = useCurrentWorld();

  const layout = useMemo(() => {
    if (!bundesland || !klasse || !schulform) return null;

    const topics = getCurriculum({ bundesland, klasse, schulform, kurstyp });
    return computeMapLayout(topics, progress?.topicProgress ?? {});
  }, [bundesland, klasse, schulform, kurstyp, progress?.topicProgress]);

  if (!bundesland || !klasse || !schulform) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-gray-500">
            Bitte wähle zuerst Bundesland, Klasse und Schulform in den Einstellungen.
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (!layout || layout.nodes.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-gray-500">Keine Themen gefunden.</p>
        </div>
      </PageWrapper>
    );
  }

  const masteredCount = layout.nodes.filter((n) => n.mastery === 'mastered').length;
  const totalCount = layout.nodes.length;

  return (
    <PageWrapper>
      <WorldBackground worldId={world} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)]">Lernpfad</h1>
            <p className="text-sm text-gray-500">
              Klasse {klasse} — {schulform}
              {world && WORLDS[world] ? ` · ${WORLDS[world].label}` : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[var(--color-primary)]">
              {masteredCount}/{totalCount}
            </div>
            <div className="text-xs text-gray-500">gemeistert</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ backgroundColor: 'var(--color-primary)', width: `${totalCount > 0 ? (masteredCount / totalCount) * 100 : 0}%` }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-gray-200 border border-gray-300" /> Nicht gestartet
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300" /> Eingeführt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" /> Übend
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Gemeistert
          </span>
        </div>

        {/* Map */}
        <LearningMap layout={layout} />
      </div>
    </PageWrapper>
  );
}
