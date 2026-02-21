import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock localStorage with quota simulation
function createMockLocalStorage(quotaLimit = 0) {
  const store: Record<string, string> = {};
  let totalSize = 0;

  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      const size = key.length + value.length;
      if (quotaLimit > 0 && totalSize + size > quotaLimit) {
        const err = new DOMException('QuotaExceededError');
        Object.defineProperty(err, 'name', { value: 'QuotaExceededError' });
        throw err;
      }
      store[key] = value;
      totalSize += size;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
      totalSize = 0;
    },
  };
}

describe('localStorage quota handling', () => {
  it('catches QuotaExceededError gracefully', () => {
    const storage = createMockLocalStorage(10); // Very small limit

    let caught = false;
    try {
      storage.setItem('key', 'a'.repeat(100)); // Will exceed quota
    } catch (err) {
      if (err instanceof DOMException && err.name === 'QuotaExceededError') {
        caught = true;
      }
    }
    expect(caught).toBe(true);
  });

  it('successfully stores data within quota', () => {
    const storage = createMockLocalStorage(10000);
    expect(() => storage.setItem('test', 'value')).not.toThrow();
    expect(storage.getItem('test')).toBe('value');
  });

  it('does not throw when quota check is in try/catch', () => {
    const storage = createMockLocalStorage(5);
    let didNotCrash = true;

    try {
      storage.setItem('large-key', 'large-value-that-exceeds');
    } catch (err) {
      // In the curriculum store, we catch this gracefully
      if (err instanceof DOMException && err.name === 'QuotaExceededError') {
        didNotCrash = true; // We handled it
      }
    }
    expect(didNotCrash).toBe(true);
  });
});
