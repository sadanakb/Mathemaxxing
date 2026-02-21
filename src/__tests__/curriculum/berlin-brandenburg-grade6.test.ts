import { describe, it, expect } from 'vitest';
import { getCurriculum } from '@/lib/curriculum/merge';
import { getGrundschuleMaxKlasse, getValidSchulformen } from '@/data/curricula/schulformen';

describe('Berlin & Brandenburg — Extended Grundschule (Klasse 1-6)', () => {
  const EXTENDED = ['Berlin', 'Brandenburg'] as const;

  EXTENDED.forEach((bl) => {
    describe(bl, () => {
      it('Grundschule Klasse 1-6 returns topics', () => {
        for (let k = 1; k <= 6; k++) {
          const topics = getCurriculum({ bundesland: bl, klasse: k as 1|2|3|4|5|6, schulform: 'Grundschule' });
          expect(topics.length).toBeGreaterThan(0);
        }
      });

      it('Grundschule Klasse 7 returns empty', () => {
        const topics = getCurriculum({ bundesland: bl, klasse: 7, schulform: 'Grundschule' });
        expect(topics).toHaveLength(0);
      });

      it('getGrundschuleMaxKlasse returns 6', () => {
        expect(getGrundschuleMaxKlasse(bl)).toBe(6);
      });

      it('Grundschule is in valid Schulformen for Klasse 5', () => {
        const valid = getValidSchulformen(bl, 5);
        expect(valid).toContain('Grundschule');
      });

      it('Gymnasium is not available in Klasse 5 (only from 7)', () => {
        const valid = getValidSchulformen(bl, 5);
        // Berlin/Brandenburg: non-Grundschule forms only from Klasse 7
        expect(valid).not.toContain('Gymnasium');
      });

      it('Gymnasium available in Klasse 7', () => {
        const valid = getValidSchulformen(bl, 7);
        expect(valid).toContain('Gymnasium');
      });
    });
  });

  describe('Bayern (contrast — standard Grundschule ends at 4)', () => {
    it('Grundschule Klasse 4 valid, Klasse 5 invalid', () => {
      const k4 = getValidSchulformen('Bayern', 4);
      expect(k4).toContain('Grundschule');

      const k5 = getValidSchulformen('Bayern', 5);
      expect(k5).not.toContain('Grundschule');
    });

    it('Gymnasium available in Klasse 5', () => {
      const valid = getValidSchulformen('Bayern', 5);
      expect(valid).toContain('Gymnasium');
    });
  });
});
