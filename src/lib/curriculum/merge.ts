import type { Bundesland, Klassenstufe, Schulform, CurriculumTopic, Kurstyp } from './types';
import { KLASSE1_TOPICS } from '@/data/curricula/base/klasse1';
import { KLASSE2_TOPICS } from '@/data/curricula/base/klasse2';
import { KLASSE3_TOPICS } from '@/data/curricula/base/klasse3';
import { KLASSE4_TOPICS } from '@/data/curricula/base/klasse4';
import { KLASSE5_TOPICS } from '@/data/curricula/base/klasse5';
import { KLASSE6_TOPICS } from '@/data/curricula/base/klasse6';
import { KLASSE7_TOPICS } from '@/data/curricula/base/klasse7';
import { getOverrides } from '@/data/curricula/overrides';
import { getGrundschuleMaxKlasse, EXTENDED_GRUNDSCHULE_BUNDESLAENDER } from '@/data/curricula/schulformen';

const BASE_CURRICULA: Record<Klassenstufe, CurriculumTopic[]> = {
  1: KLASSE1_TOPICS,
  2: KLASSE2_TOPICS,
  3: KLASSE3_TOPICS,
  4: KLASSE4_TOPICS,
  5: KLASSE5_TOPICS,
  6: KLASSE6_TOPICS,
  7: KLASSE7_TOPICS,
};

export type GetCurriculumOptions = {
  bundesland: Bundesland;
  klasse: Klassenstufe;
  schulform: Schulform;
  kurstyp?: Kurstyp;
};

/**
 * Returns the merged curriculum topics for a given context.
 * Applies Bundesland-specific overrides on top of the KMK baseline.
 * Filters by Schulform and optional Kurstyp.
 */
export function getCurriculum(options: GetCurriculumOptions): CurriculumTopic[] {
  const { bundesland, klasse, schulform, kurstyp = 'keine' } = options;

  // Berlin/Brandenburg: Grundschule extends to Klasse 6
  if (schulform === 'Grundschule') {
    const maxKlasse = getGrundschuleMaxKlasse(bundesland);
    if (klasse > maxKlasse) {
      return [];
    }
  }

  // Start with KMK baseline for this Klasse
  let topics: CurriculumTopic[] = [...(BASE_CURRICULA[klasse] ?? [])];

  // Apply Bundesland overrides
  const overrides = getOverrides(bundesland, klasse);
  for (const delta of overrides) {
    if (delta.action === 'add' && delta.topic) {
      // Add new topic (not in KMK baseline)
      const full: CurriculumTopic = {
        id: delta.topic.id ?? `${bundesland.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
        title: delta.topic.title ?? 'Unbenanntes Thema',
        lernbereich: delta.topic.lernbereich ?? 'Arithmetik',
        klasse,
        schulformen: delta.topic.schulformen ?? [schulform],
        kmkStandard: false,
        prerequisites: delta.topic.prerequisites ?? [],
        estimatedMinutes: delta.topic.estimatedMinutes ?? 60,
        description: delta.topic.description ?? '',
        ...delta.topic,
      };
      topics.push(full);
    } else if (delta.action === 'remove' && delta.topicId) {
      topics = topics.filter((t) => t.id !== delta.topicId);
    } else if (delta.action === 'modify' && delta.topicId && delta.topic) {
      topics = topics.map((t) =>
        t.id === delta.topicId ? { ...t, ...delta.topic } : t
      );
    }
  }

  // Filter by Schulform
  // Special case: Berlin/Brandenburg Grundschule (Klasse 5-6) uses the Sekundarstufe curriculum
  // since no separate Grundschule curriculum exists for those grades.
  // Treat their Grundschule as compatible with any Sekundarstufe topic for that Klasse.
  const isExtendedGrundschule =
    schulform === 'Grundschule' &&
    klasse >= 5 &&
    EXTENDED_GRUNDSCHULE_BUNDESLAENDER.includes(bundesland);

  if (isExtendedGrundschule) {
    // Accept any topic that's available to at least one Sekundarstufe Schulform
    topics = topics.filter((t) =>
      t.schulformen.some((sf) => sf !== 'Grundschule')
    );
  } else {
    topics = topics.filter((t) => t.schulformen.includes(schulform));
  }

  // Filter by Kurstyp (for Gesamtschule / Gemeinschaftsschule)
  if (kurstyp !== 'keine') {
    topics = topics.filter((t) => {
      if (!t.kurse || t.kurse.length === 0) return true; // no restriction
      return t.kurse.includes(kurstyp) || t.kurse.includes('keine');
    });
  }

  return topics;
}

/**
 * Returns topic IDs that are due for the given context.
 * Excludes already-mastered topics.
 */
export function getAvailableTopics(
  options: GetCurriculumOptions,
  masteredTopicIds: Set<string>
): CurriculumTopic[] {
  const curriculum = getCurriculum(options);
  return curriculum.filter((t) => !masteredTopicIds.has(t.id));
}

/**
 * Finds a single topic by ID across ALL grade levels.
 */
export function findTopicById(topicId: string): CurriculumTopic | undefined {
  for (const topics of Object.values(BASE_CURRICULA)) {
    const found = topics.find((t) => t.id === topicId);
    if (found) return found;
  }
  return undefined;
}
