import { describe, it, expect } from 'vitest';
import {
  getValidSchulformen,
  assertValidSchulform,
  getGrundschuleMaxKlasse,
  requiresKurstyp,
} from '@/data/curricula/schulformen';
import { BUNDESLAENDER } from '@/data/bundeslaender';
import type { Bundesland, Klassenstufe } from '@/lib/curriculum/types';

describe('Schulform Validation', () => {
  describe('getGrundschuleMaxKlasse', () => {
    it('returns 6 for Berlin', () => {
      expect(getGrundschuleMaxKlasse('Berlin')).toBe(6);
    });
    it('returns 6 for Brandenburg', () => {
      expect(getGrundschuleMaxKlasse('Brandenburg')).toBe(6);
    });
    it('returns 4 for Bayern', () => {
      expect(getGrundschuleMaxKlasse('Bayern')).toBe(4);
    });
    it('returns 4 for all other Bundesländer', () => {
      const others: Bundesland[] = [
        'Baden-Württemberg', 'Bremen', 'Hamburg', 'Hessen',
        'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
        'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt',
        'Schleswig-Holstein', 'Thüringen',
      ];
      others.forEach((bl) => expect(getGrundschuleMaxKlasse(bl)).toBe(4));
    });
  });

  describe('getValidSchulformen', () => {
    it('Grundschule only available in Klassen 1-4 for Bayern', () => {
      for (let k = 1; k <= 4; k++) {
        const valid = getValidSchulformen('Bayern', k as Klassenstufe);
        expect(valid).toContain('Grundschule');
      }
      const k5 = getValidSchulformen('Bayern', 5);
      expect(k5).not.toContain('Grundschule');
    });

    it('Grundschule available in Klasse 5+6 for Berlin', () => {
      const k5 = getValidSchulformen('Berlin', 5);
      expect(k5).toContain('Grundschule');
      const k6 = getValidSchulformen('Berlin', 6);
      expect(k6).toContain('Grundschule');
      const k7 = getValidSchulformen('Berlin', 7);
      expect(k7).not.toContain('Grundschule');
    });

    it('Gymnasium not available in Klasse 1-4 for any Bundesland', () => {
      BUNDESLAENDER.forEach(({ id }) => {
        for (let k = 1; k <= 4; k++) {
          const valid = getValidSchulformen(id, k as Klassenstufe);
          expect(valid).not.toContain('Gymnasium');
        }
      });
    });

    it('Gymnasium available in Klasse 5+ for Bayern', () => {
      const valid = getValidSchulformen('Bayern', 5);
      expect(valid).toContain('Gymnasium');
    });

    it('Werkrealschule only in Baden-Württemberg', () => {
      const bwK5 = getValidSchulformen('Baden-Württemberg', 5);
      expect(bwK5).toContain('Werkrealschule');

      const byK5 = getValidSchulformen('Bayern', 5);
      expect(byK5).not.toContain('Werkrealschule');
    });

    it('Mittelschule only in Bayern', () => {
      const byK5 = getValidSchulformen('Bayern', 5);
      expect(byK5).toContain('Mittelschule');

      const bwK5 = getValidSchulformen('Baden-Württemberg', 5);
      expect(bwK5).not.toContain('Mittelschule');
    });

    it('Stadtteilschule only in Hamburg', () => {
      const hhK5 = getValidSchulformen('Hamburg', 5);
      expect(hhK5).toContain('Stadtteilschule');

      const byK5 = getValidSchulformen('Bayern', 5);
      expect(byK5).not.toContain('Stadtteilschule');
    });
  });

  describe('assertValidSchulform', () => {
    it('does not throw for valid combinations', () => {
      expect(() =>
        assertValidSchulform('Bayern', 5, 'Gymnasium')
      ).not.toThrow();

      expect(() =>
        assertValidSchulform('Baden-Württemberg', 1, 'Grundschule')
      ).not.toThrow();
    });

    it('throws for invalid combination', () => {
      expect(() =>
        assertValidSchulform('Bayern', 5, 'Werkrealschule')
      ).toThrow();
    });

    it('throws when Gymnasium selected for Klasse 1', () => {
      expect(() =>
        assertValidSchulform('Bayern', 1, 'Gymnasium')
      ).toThrow();
    });
  });

  describe('requiresKurstyp', () => {
    it('Gesamtschule requires Kurstyp', () => {
      expect(requiresKurstyp('Gesamtschule')).toBe(true);
    });
    it('Gemeinschaftsschule requires Kurstyp', () => {
      expect(requiresKurstyp('Gemeinschaftsschule')).toBe(true);
    });
    it('Gymnasium does not require Kurstyp', () => {
      expect(requiresKurstyp('Gymnasium')).toBe(false);
    });
    it('Grundschule does not require Kurstyp', () => {
      expect(requiresKurstyp('Grundschule')).toBe(false);
    });
  });
});
