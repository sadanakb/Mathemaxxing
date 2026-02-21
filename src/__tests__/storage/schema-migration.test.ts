import { describe, it, expect } from 'vitest';

// Test schema migration logic without actual Dexie (browser API)

type OldProgressV0 = {
  userId: string;
  xpTotal: number;
  level: number;
};

type NewProgressV1 = {
  schemaVersion: number;
  userId: string;
  xpTotal: number;
  level: number;
  streakDays: number;
  lastStreakDate: string | null;
  badges: unknown[];
};

function migrateV0toV1(old: OldProgressV0): NewProgressV1 {
  return {
    schemaVersion: 1,
    userId: old.userId,
    xpTotal: old.xpTotal,
    level: old.level,
    streakDays: 0,               // New field — default to 0
    lastStreakDate: null,         // New field — default to null
    badges: [],                  // New field — default to empty
  };
}

describe('Schema Migration', () => {
  it('migrates v0 to v1 correctly', () => {
    const oldData: OldProgressV0 = {
      userId: 'user-123',
      xpTotal: 500,
      level: 3,
    };

    const migrated = migrateV0toV1(oldData);

    expect(migrated.schemaVersion).toBe(1);
    expect(migrated.userId).toBe('user-123');
    expect(migrated.xpTotal).toBe(500);
    expect(migrated.level).toBe(3);
    expect(migrated.streakDays).toBe(0);
    expect(migrated.lastStreakDate).toBeNull();
    expect(migrated.badges).toEqual([]);
  });

  it('preserves all existing data during migration', () => {
    const old: OldProgressV0 = { userId: 'abc', xpTotal: 1000, level: 5 };
    const migrated = migrateV0toV1(old);
    expect(migrated.xpTotal).toBe(old.xpTotal);
    expect(migrated.level).toBe(old.level);
    expect(migrated.userId).toBe(old.userId);
  });

  it('schema version is always correct after migration', () => {
    const old: OldProgressV0 = { userId: 'x', xpTotal: 0, level: 1 };
    const migrated = migrateV0toV1(old);
    expect(migrated.schemaVersion).toBe(1);
  });
});
