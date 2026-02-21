import { describe, it, expect } from 'vitest';
import { getCurriculum, findTopicById } from '@/lib/curriculum/merge';

describe('getCurriculum — merge & filter', () => {
  describe('Bayern', () => {
    it('Klasse 1 Grundschule returns basic topics', () => {
      const topics = getCurriculum({ bundesland: 'Bayern', klasse: 1, schulform: 'Grundschule' });
      expect(topics.length).toBeGreaterThan(0);
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k1-addition-bis-20');
      expect(ids).toContain('k1-geometrische-formen');
      expect(ids).toContain('k1-geld-euro-cent');
    });

    it('Klasse 5 Gymnasium returns Sekundarstufe topics', () => {
      const topics = getCurriculum({ bundesland: 'Bayern', klasse: 5, schulform: 'Gymnasium' });
      expect(topics.length).toBeGreaterThan(0);
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k5-primzahlen-teilbarkeit');
      expect(ids).toContain('k5-dezimalzahlen');
    });

    it('Klasse 7 Gymnasium returns only Gymnasium topics', () => {
      const topics = getCurriculum({ bundesland: 'Bayern', klasse: 7, schulform: 'Gymnasium' });
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k7-prozentrechnung-gym');
      expect(ids).toContain('k7-lineare-gleichungen');
      expect(ids).not.toContain('k7-dreisatz-intensiv'); // Hauptschule only
    });

    it('Klasse 7 Mittelschule returns Hauptschule-track topics', () => {
      const topics = getCurriculum({ bundesland: 'Bayern', klasse: 7, schulform: 'Mittelschule' });
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k7-prozent-rabatt-mwst');
      expect(ids).toContain('k7-dreisatz-intensiv');
      expect(ids).not.toContain('k7-lineare-gleichungen'); // Gymnasium only
    });
  });

  describe('Berlin/Brandenburg — extended Grundschule', () => {
    it('Berlin Grundschule Klasse 5 returns topics', () => {
      const topics = getCurriculum({ bundesland: 'Berlin', klasse: 5, schulform: 'Grundschule' });
      expect(topics.length).toBeGreaterThan(0);
    });

    it('Berlin Grundschule Klasse 6 returns topics', () => {
      const topics = getCurriculum({ bundesland: 'Berlin', klasse: 6, schulform: 'Grundschule' });
      expect(topics.length).toBeGreaterThan(0);
    });

    it('Berlin Grundschule Klasse 7 returns empty (Grundschule ends at 6)', () => {
      const topics = getCurriculum({ bundesland: 'Berlin', klasse: 7, schulform: 'Grundschule' });
      expect(topics).toHaveLength(0);
    });

    it('Brandenburg Grundschule Klasse 6 returns topics', () => {
      const topics = getCurriculum({ bundesland: 'Brandenburg', klasse: 6, schulform: 'Grundschule' });
      expect(topics.length).toBeGreaterThan(0);
    });
  });

  describe('NRW', () => {
    it('Klasse 7 Gymnasium returns Gymnasium topics', () => {
      const topics = getCurriculum({ bundesland: 'Nordrhein-Westfalen', klasse: 7, schulform: 'Gymnasium' });
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k7-prozentrechnung-gym');
    });

    it('Klasse 7 Hauptschule returns G-Kurs topics', () => {
      const topics = getCurriculum({ bundesland: 'Nordrhein-Westfalen', klasse: 7, schulform: 'Hauptschule' });
      const ids = topics.map((t) => t.id);
      expect(ids).toContain('k7-prozent-rabatt-mwst');
    });
  });

  describe('Kurstyp filtering', () => {
    it('Gesamtschule with G-Kurs returns G-Kurs topics', () => {
      const topics = getCurriculum({
        bundesland: 'Nordrhein-Westfalen',
        klasse: 7,
        schulform: 'Gesamtschule',
        kurstyp: 'G-Kurs',
      });
      const ids = topics.map((t) => t.id);
      // G-Kurs topics should include practical percent topics
      expect(ids.some((id) => id.includes('k7-'))).toBe(true);
    });
  });

  describe('findTopicById', () => {
    it('finds a known topic by ID', () => {
      const topic = findTopicById('k1-addition-bis-20');
      expect(topic).toBeDefined();
      expect(topic?.title).toBe('Addition bis 20');
    });

    it('returns undefined for unknown ID', () => {
      const topic = findTopicById('does-not-exist');
      expect(topic).toBeUndefined();
    });
  });
});
