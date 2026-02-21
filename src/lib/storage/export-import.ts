import type { UserProgress, LeitnerCard } from '@/lib/curriculum/types';
import { z } from 'zod';

// ─── Export format ────────────────────────────────────────────

export type ExportData = {
  exportVersion: 1;
  exportedAt: string;
  progress: UserProgress;
  leitnerCards: LeitnerCard[];
};

export function exportToJSON(progress: UserProgress, leitnerCards: LeitnerCard[]): string {
  const data: ExportData = {
    exportVersion: 1,
    exportedAt: new Date().toISOString(),
    progress,
    leitnerCards,
  };
  return JSON.stringify(data, null, 2);
}

export function downloadExport(progress: UserProgress, leitnerCards: LeitnerCard[]): void {
  const json = exportToJSON(progress, leitnerCards);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mathemeister-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Import validation ────────────────────────────────────────

const ExportDataSchema = z.object({
  exportVersion: z.literal(1),
  exportedAt: z.string(),
  progress: z.object({
    schemaVersion: z.number(),
    userId: z.string(),
    createdAt: z.union([z.string(), z.date()]),
    lastActiveAt: z.union([z.string(), z.date()]),
    bundesland: z.string().nullable(),
    klasse: z.number().nullable(),
    schulform: z.string().nullable(),
    kurstyp: z.string(),
    topicProgress: z.record(z.any()),
    leitnerCards: z.array(z.any()),
    xpTotal: z.number(),
    level: z.number(),
    streakDays: z.number(),
    lastStreakDate: z.string().nullable(),
    achievements: z.array(z.any()),
    badges: z.array(z.any()),
    dailyGoalMinutes: z.number(),
  }),
  leitnerCards: z.array(z.any()),
});

export type ImportResult =
  | { success: true; data: ExportData }
  | { success: false; error: string };

export function parseImport(json: string): ImportResult {
  try {
    const raw = JSON.parse(json);
    const validated = ExportDataSchema.safeParse(raw);
    if (!validated.success) {
      return { success: false, error: `Ungültiges Dateiformat: ${validated.error.message}` };
    }
    return { success: true, data: raw as ExportData };
  } catch {
    return { success: false, error: 'Datei konnte nicht gelesen werden. Ist es eine gültige JSON-Datei?' };
  }
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden.'));
    reader.readAsText(file);
  });
}
