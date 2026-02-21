import type { Bundesland, Schulform, Klassenstufe } from '@/lib/curriculum/types';

// ─── Bundesland → available Schulformen mapping ──────────────

export const SCHULFORMEN_BY_BUNDESLAND: Record<Bundesland, Schulform[]> = {
  'Baden-Württemberg':      ['Grundschule', 'Werkrealschule', 'Hauptschule', 'Realschule', 'Gemeinschaftsschule', 'Gymnasium'],
  'Bayern':                 ['Grundschule', 'Mittelschule', 'Realschule', 'Gymnasium'],
  'Berlin':                 ['Grundschule', 'Integrierte Sekundarschule', 'Gymnasium'],
  'Brandenburg':            ['Grundschule', 'Oberschule', 'Gymnasium'],
  'Bremen':                 ['Grundschule', 'Oberschule', 'Gymnasium'],
  'Hamburg':                ['Grundschule', 'Stadtteilschule', 'Gymnasium'],
  'Hessen':                 ['Grundschule', 'Hauptschule', 'Realschule', 'Gesamtschule', 'Gymnasium'],
  'Mecklenburg-Vorpommern': ['Grundschule', 'Regionale Schule', 'Gymnasium'],
  'Niedersachsen':          ['Grundschule', 'Hauptschule', 'Realschule', 'Oberschule', 'Gesamtschule', 'Gymnasium'],
  'Nordrhein-Westfalen':    ['Grundschule', 'Hauptschule', 'Realschule', 'Gesamtschule', 'Gymnasium'],
  'Rheinland-Pfalz':       ['Grundschule', 'Realschule plus', 'Gymnasium'],
  'Saarland':              ['Grundschule', 'Gemeinschaftsschule', 'Gymnasium'],
  'Sachsen':               ['Grundschule', 'Oberschule', 'Gymnasium'],
  'Sachsen-Anhalt':        ['Grundschule', 'Sekundarschule', 'Gemeinschaftsschule', 'Gymnasium'],
  'Schleswig-Holstein':    ['Grundschule', 'Gemeinschaftsschule', 'Gymnasium'],
  'Thüringen':             ['Grundschule', 'Regelschule', 'Gemeinschaftsschule', 'Gymnasium'],
};

// ─── Special Rules ───────────────────────────────────────────

/**
 * Berlin & Brandenburg: Grundschule goes up to grade 6 (not 4).
 */
export const EXTENDED_GRUNDSCHULE_BUNDESLAENDER: Bundesland[] = ['Berlin', 'Brandenburg'];

export function getGrundschuleMaxKlasse(bundesland: Bundesland): Klassenstufe {
  return EXTENDED_GRUNDSCHULE_BUNDESLAENDER.includes(bundesland) ? 6 : 4;
}

/**
 * Schulformen that require a Kurstyp selection (G-Kurs / E-Kurs).
 */
export const SCHULFORMEN_MIT_KURS: Schulform[] = ['Gesamtschule', 'Gemeinschaftsschule'];

/**
 * Returns valid Schulformen for a given Bundesland + Klassenstufe combination.
 */
export function getValidSchulformen(bundesland: Bundesland, klasse: Klassenstufe): Schulform[] {
  const all = SCHULFORMEN_BY_BUNDESLAND[bundesland];
  const grundschuleMax = getGrundschuleMaxKlasse(bundesland);

  return all.filter((sf) => {
    if (sf === 'Grundschule') {
      return klasse <= grundschuleMax;
    }
    // Non-Grundschule forms: only available from 5th grade onward
    // (or 7th grade onward for Berlin/Brandenburg because their Grundschule ends at 6)
    const minKlasse = EXTENDED_GRUNDSCHULE_BUNDESLAENDER.includes(bundesland) ? 7 : 5;
    return klasse >= minKlasse;
  });
}

/**
 * Validates that a Schulform is valid for the given Bundesland + Klassenstufe.
 * Throws with a human-readable German error message if invalid.
 */
export function assertValidSchulform(
  bundesland: Bundesland,
  klasse: Klassenstufe,
  schulform: Schulform
): void {
  const valid = getValidSchulformen(bundesland, klasse);
  if (!valid.includes(schulform)) {
    throw new Error(
      `Die Schulform "${schulform}" ist in ${bundesland} für Klasse ${klasse} nicht verfügbar. ` +
      `Verfügbare Schulformen: ${valid.join(', ')}.`
    );
  }
}

/**
 * Returns true if this Schulform needs a Kurstyp selection.
 */
export function requiresKurstyp(schulform: Schulform): boolean {
  return SCHULFORMEN_MIT_KURS.includes(schulform);
}
