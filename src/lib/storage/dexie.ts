import Dexie, { type Table } from 'dexie';
import type { UserProgress, LeitnerCard, Attempt } from '@/lib/curriculum/types';

// ─── Schema version — increment on every breaking change ─────
const CURRENT_VERSION = 1;

export class MatheMeisterDB extends Dexie {
  progress!: Table<UserProgress & { id: string }>;
  leitnerCards!: Table<LeitnerCard & { id: string }>;
  attempts!: Table<Attempt>;

  constructor() {
    super('mathemeister-db');

    this.version(CURRENT_VERSION).stores({
      progress: 'id, userId, lastActiveAt',
      leitnerCards: 'id, topicId, box, nextReview',
      attempts: 'id, topicId, timestamp',
    });
  }
}

let _db: MatheMeisterDB | null = null;

export function getDB(): MatheMeisterDB {
  if (!_db) {
    _db = new MatheMeisterDB();
  }
  return _db;
}

// ─── Safe wrappers with error handling ───────────────────────

export async function saveProgress(progress: UserProgress): Promise<void> {
  try {
    const db = getDB();
    await db.progress.put({ ...progress, id: progress.userId });
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to save progress:', err);
    throw err;
  }
}

export async function loadProgress(userId: string): Promise<UserProgress | null> {
  try {
    const db = getDB();
    const record = await db.progress.get(userId);
    if (!record) return null;
    // Deserialize Date fields
    return {
      ...record,
      createdAt: new Date(record.createdAt),
      lastActiveAt: new Date(record.lastActiveAt),
    };
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to load progress:', err);
    return null;
  }
}

export async function saveLeitnerCard(card: LeitnerCard): Promise<void> {
  try {
    const db = getDB();
    const id = `${card.topicId}`;
    await db.leitnerCards.put({ ...card, id, nextReview: card.nextReview });
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to save Leitner card:', err);
    throw err;
  }
}

export async function loadAllLeitnerCards(): Promise<LeitnerCard[]> {
  try {
    const db = getDB();
    const records = await db.leitnerCards.toArray();
    return records.map((r) => ({
      ...r,
      nextReview: new Date(r.nextReview),
      lastReviewed: r.lastReviewed ? new Date(r.lastReviewed) : undefined,
    }));
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to load Leitner cards:', err);
    return [];
  }
}

export async function getDueCards(now: Date = new Date()): Promise<LeitnerCard[]> {
  try {
    const db = getDB();
    const all = await db.leitnerCards.toArray();
    return all
      .filter((c) => new Date(c.nextReview) <= now)
      .map((r) => ({
        ...r,
        nextReview: new Date(r.nextReview),
        lastReviewed: r.lastReviewed ? new Date(r.lastReviewed) : undefined,
      }));
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to get due cards:', err);
    return [];
  }
}

export async function saveAttempt(attempt: Attempt): Promise<void> {
  try {
    const db = getDB();
    await db.attempts.put(attempt);
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to save attempt:', err);
    // Non-critical — don't re-throw
  }
}

export async function getRecentAttempts(limit = 50): Promise<Attempt[]> {
  try {
    const db = getDB();
    const all = await db.attempts.orderBy('timestamp').reverse().limit(limit).toArray();
    return all.map((a) => ({ ...a, timestamp: new Date(a.timestamp) }));
  } catch (err) {
    console.error('[MatheMeisterDB] Failed to get recent attempts:', err);
    return [];
  }
}
