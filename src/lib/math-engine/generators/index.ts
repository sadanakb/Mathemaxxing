import type { ExerciseTemplate } from '@/lib/curriculum/types';

// ── Klasse 1 ──────────────────────────────────────────────
import { template as zahlenBis10 } from './k1-zahlen-bis-10';
import { template as addBis10 } from './k1-addition-bis-10';
import { template as subBis10 } from './k1-subtraktion-bis-10';
import { template as zahlenBis20 } from './k1-zahlen-bis-20';
import { template as addBis20 } from './k1-addition-bis-20';
import { template as addBis20OhneUebergang } from './k1-addition-bis-20-ohne-uebergang';
import { template as addBis20MitUebergang } from './k1-addition-bis-20-mit-uebergang';
import { template as subBis20 } from './k1-subtraktion-bis-20';
import { template as verdoppelnHalbieren } from './k1-verdoppeln-halbieren';
import { template as tauschUmkehr } from './k1-tausch-umkehraufgaben';
import { template as rechengeschichten } from './k1-rechengeschichten';
import { template as geomFormen } from './k1-geometrische-formen';
import { template as lagebeziehungen } from './k1-lagebeziehungen';
import { template as musterStrukturen } from './k1-muster-und-strukturen';
import { template as geldEuroCent } from './k1-geld-euro-cent';
import { template as uhrzeitVolleStunden } from './k1-uhrzeit-volle-stunden';

// ── Klasse 2 ──────────────────────────────────────────────
import { template as zahlenBis100 } from './k2-zahlen-bis-100';
import { template as zahlenstrahl100 } from './k2-zahlenstrahl-bis-100';
import { template as addSubBis100 } from './k2-addition-subtraktion-bis-100';
import { template as addMitUebergang } from './k2-addition-mit-uebergang';
import { template as subBis100 } from './k2-subtraktion-bis-100';
import { template as einmaleins } from './k2-einmaleins';
import { template as einmaleins2510 } from './k2-einmaleins-2-5-10';
import { template as einmaleins34 } from './k2-einmaleins-3-4';
import { template as divisionEinfuehrung } from './k2-division-einfuehrung';
import { template as sachaufgabenK2 } from './k2-sachaufgaben';
import { template as geradeUngerade } from './k2-gerade-ungerade';
import { template as uhrzeiten } from './k2-uhrzeiten';
import { template as laengen } from './k2-laengen';
import { template as geometrieEbene } from './k2-geometrie-ebene-figuren';
import { template as symmetrieErkennen } from './k2-symmetrie-erkennen';
import { template as geldEuroCentK2 } from './k2-geld-euro-cent';
import { template as datenSammeln } from './k2-daten-sammeln';
import { template as zahlenfolgen } from './k2-zahlenfolgen';

// ── Klasse 3 ──────────────────────────────────────────────
import { template as zahlenBis1000 } from './k3-zahlen-bis-1000';
import { template as zahlenstrahl1000 } from './k3-zahlenstrahl-bis-1000';
import { template as schriftlicheAddition } from './k3-schriftliche-addition';
import { template as schriftlicheSubtraktion } from './k3-schriftliche-subtraktion';
import { template as multiplikationSchriftlich } from './k3-multiplikation-schriftlich';
import { template as halbschriftlicheDivision } from './k3-halbschriftliche-division';
import { template as einmaleinsVertiefen } from './k3-einmaleins-vertiefen';
import { template as einmaleinsMeister } from './k3-einmaleins-meister';
import { template as sachaufgabenAlleOps } from './k3-sachaufgaben-alle-ops';
import { template as gewichte } from './k3-gewichte';
import { template as literMilliliter } from './k3-liter-milliliter';
import { template as zeitspannen } from './k3-zeitspannen';
import { template as geometrischeKoerper } from './k3-geometrische-koerper';
import { template as flaecheUmfangEinfach } from './k3-flaeche-umfang-einfach';
import { template as spiegelnVerschieben } from './k3-spiegeln-verschieben';
import { template as diagrammeK3 } from './k3-diagramme';

// ── Klasse 4 ──────────────────────────────────────────────
import { template as zahlenBis1Million } from './k4-zahlen-bis-1million';
import { template as rundenUeberschlagen } from './k4-runden-ueberschlagen';
import { template as schriftlicheMultiplikation } from './k4-schriftliche-multiplikation';
import { template as schriftlicheDivision } from './k4-schriftliche-division';
import { template as rechengesetze } from './k4-rechengesetze';
import { template as sachaufgabenKomplex } from './k4-sachaufgaben-komplex';
import { template as brucheAlsAnteil } from './k4-brueche-als-anteil';
import { template as dezimalzahlenEinfuehrung } from './k4-dezimalzahlen-einfuehrung';
import { template as geldRechnen } from './k4-geld-rechnen';
import { template as gewichteTonnen } from './k4-gewichte-tonnen';
import { template as flaecheUndUmfang } from './k4-flaeche-und-umfang';
import { template as viereckeDreiecke } from './k4-vierecke-dreiecke';
import { template as symmetrie } from './k4-symmetrie';
import { template as koordinatenGitternetz } from './k4-koordinaten-gitternetz';
import { template as tabellenDiagramme } from './k4-tabellen-diagramme';
import { template as wahrscheinlichkeitEinfuehrung } from './k4-wahrscheinlichkeit-einfuehrung';

// ── Klasse 5 ──────────────────────────────────────────────
import { template as primzahlen } from './k5-primzahlen-teilbarkeit';
import { template as dezimalzahlen } from './k5-dezimalzahlen';
import { template as koordinatensystem } from './k5-koordinatensystem';
import { template as bruecheEinfuehrung } from './k5-brueche-einfuehrung';
import { template as flaechenKoerper } from './k5-flaechen-koerper';
import { template as groessenEinheiten } from './k5-groessen-einheiten';
import { template as natuerlicheZahlen } from './k5-natuerliche-zahlen';
import { template as rechengesetzeK5 } from './k5-rechengesetze';
import { template as termeVariablen } from './k5-terme-variablen';
import { template as winkel } from './k5-winkel';
import { template as achsensymmetrie } from './k5-achsensymmetrie';
import { template as datenZufall } from './k5-daten-zufall';
import { template as dezimalzahlenRechnen } from './k5-dezimalzahlen-rechnen';
import { template as geometrischeGrundbegriffe } from './k5-geometrische-grundbegriffe';
import { template as quaderVolumen } from './k5-quader-volumen';

// ── Klasse 6 ──────────────────────────────────────────────
import { template as bruchrechnung } from './k6-bruchrechnung';
import { template as negativeZahlen } from './k6-negative-zahlen';
import { template as wahrscheinlichkeit } from './k6-wahrscheinlichkeit';
import { template as verhaeltnisse } from './k6-verhaeltnisse';
import { template as koordinaten4Q } from './k6-koordinatensystem-4-quadranten';
import { template as dezimalbrueche } from './k6-dezimalbrueche';
import { template as rationaleZahlen } from './k6-rationale-zahlen';
import { template as proportionaleZuordnungen } from './k6-proportionale-zuordnungen';
import { template as kreiseWinkel } from './k6-kreise-winkel';
import { template as symmetrieKongruenz } from './k6-symmetrie-kongruenz';
import { template as statistikK6 } from './k6-statistik';
import { template as termeUmformen } from './k6-terme-umformen';
import { template as gleichungenEinfuehrung } from './k6-gleichungen-einfuehrung';
import { template as volumenOberflaeche } from './k6-volumen-oberflaeche';
import { template as winkelberechnung } from './k6-winkelberechnung';

// ── Klasse 7 ──────────────────────────────────────────────
import { template as prozentGym } from './k7-prozentrechnung-gym';
import { template as lineareGleichungen } from './k7-lineare-gleichungen';
import { template as dreieckeKonstruieren } from './k7-dreiecke-konstruieren';
import { template as prozentReal } from './k7-prozentrechnung-real';
import { template as dreisatz } from './k7-dreisatz';
import { template as flaechenberechnung } from './k7-flaechenberechnung';
import { template as prozentRabatt } from './k7-prozent-rabatt-mwst';
import { template as dreisatzIntensiv } from './k7-dreisatz-intensiv';
import { template as diagrammeLesen } from './k7-diagramme-lesen';
import { template as termeTermumformungen } from './k7-terme-termumformungen';
import { template as zuordnungenGym } from './k7-zuordnungen-gym';
import { template as kongruenz } from './k7-kongruenz';
import { template as rationaleZahlenVertieft } from './k7-rationale-zahlen-vertieft';
import { template as zinsrechnung } from './k7-zinsrechnung';
import { template as gleichungenReal } from './k7-gleichungen-real';
import { template as volumenReal } from './k7-volumen-real';
import { template as zuordnungenReal } from './k7-zuordnungen-real';
import { template as grundrechenartenFestigen } from './k7-grundrechenarten-festigen';
import { template as masstab } from './k7-masstab';
import { template as sachaufgabenGeld } from './k7-sachaufgaben-geld';
import { template as geometrieGrundlagen } from './k7-geometrie-grundlagen';

const GENERATORS: Record<string, ExerciseTemplate> = {
  // ── Klasse 1 ──
  'k1-zahlen-bis-10': zahlenBis10,
  'k1-addition-bis-10': addBis10,
  'k1-subtraktion-bis-10': subBis10,
  'k1-zahlen-bis-20': zahlenBis20,
  'k1-addition-bis-20': addBis20,
  'k1-addition-bis-20-ohne-uebergang': addBis20OhneUebergang,
  'k1-addition-bis-20-mit-uebergang': addBis20MitUebergang,
  'k1-subtraktion-bis-20': subBis20,
  'k1-verdoppeln-halbieren': verdoppelnHalbieren,
  'k1-tausch-umkehraufgaben': tauschUmkehr,
  'k1-rechengeschichten': rechengeschichten,
  'k1-geometrische-formen': geomFormen,
  'k1-lagebeziehungen': lagebeziehungen,
  'k1-muster-und-strukturen': musterStrukturen,
  'k1-geld-euro-cent': geldEuroCent,
  'k1-uhrzeit-volle-stunden': uhrzeitVolleStunden,

  // ── Klasse 2 ──
  'k2-zahlen-bis-100': zahlenBis100,
  'k2-zahlenstrahl-bis-100': zahlenstrahl100,
  'k2-addition-subtraktion-bis-100': addSubBis100,
  'k2-addition-mit-uebergang': addMitUebergang,
  'k2-subtraktion-bis-100': subBis100,
  'k2-einmaleins': einmaleins,
  'k2-einmaleins-2-5-10': einmaleins2510,
  'k2-einmaleins-3-4': einmaleins34,
  'k2-division-einfuehrung': divisionEinfuehrung,
  'k2-sachaufgaben': sachaufgabenK2,
  'k2-gerade-ungerade': geradeUngerade,
  'k2-uhrzeiten': uhrzeiten,
  'k2-laengen': laengen,
  'k2-geometrie-ebene-figuren': geometrieEbene,
  'k2-symmetrie-erkennen': symmetrieErkennen,
  'k2-geld-euro-cent': geldEuroCentK2,
  'k2-daten-sammeln': datenSammeln,
  'k2-zahlenfolgen': zahlenfolgen,

  // ── Klasse 3 ──
  'k3-zahlen-bis-1000': zahlenBis1000,
  'k3-zahlenstrahl-bis-1000': zahlenstrahl1000,
  'k3-schriftliche-addition': schriftlicheAddition,
  'k3-schriftliche-subtraktion': schriftlicheSubtraktion,
  'k3-multiplikation-schriftlich': multiplikationSchriftlich,
  'k3-halbschriftliche-division': halbschriftlicheDivision,
  'k3-einmaleins-vertiefen': einmaleinsVertiefen,
  'k3-einmaleins-meister': einmaleinsMeister,
  'k3-sachaufgaben-alle-ops': sachaufgabenAlleOps,
  'k3-gewichte': gewichte,
  'k3-liter-milliliter': literMilliliter,
  'k3-zeitspannen': zeitspannen,
  'k3-geometrische-koerper': geometrischeKoerper,
  'k3-flaeche-umfang-einfach': flaecheUmfangEinfach,
  'k3-spiegeln-verschieben': spiegelnVerschieben,
  'k3-diagramme': diagrammeK3,

  // ── Klasse 4 ──
  'k4-zahlen-bis-1million': zahlenBis1Million,
  'k4-runden-ueberschlagen': rundenUeberschlagen,
  'k4-schriftliche-multiplikation': schriftlicheMultiplikation,
  'k4-schriftliche-division': schriftlicheDivision,
  'k4-rechengesetze': rechengesetze,
  'k4-sachaufgaben-komplex': sachaufgabenKomplex,
  'k4-brueche-als-anteil': brucheAlsAnteil,
  'k4-dezimalzahlen-einfuehrung': dezimalzahlenEinfuehrung,
  'k4-geld-rechnen': geldRechnen,
  'k4-gewichte-tonnen': gewichteTonnen,
  'k4-flaeche-und-umfang': flaecheUndUmfang,
  'k4-vierecke-dreiecke': viereckeDreiecke,
  'k4-symmetrie': symmetrie,
  'k4-koordinaten-gitternetz': koordinatenGitternetz,
  'k4-tabellen-diagramme': tabellenDiagramme,
  'k4-wahrscheinlichkeit-einfuehrung': wahrscheinlichkeitEinfuehrung,

  // ── Klasse 5 ──
  'k5-primzahlen-teilbarkeit': primzahlen,
  'k5-dezimalzahlen': dezimalzahlen,
  'k5-koordinatensystem': koordinatensystem,
  'k5-brueche-einfuehrung': bruecheEinfuehrung,
  'k5-flaechen-koerper': flaechenKoerper,
  'k5-groessen-einheiten': groessenEinheiten,
  'k5-natuerliche-zahlen': natuerlicheZahlen,
  'k5-rechengesetze': rechengesetzeK5,
  'k5-terme-variablen': termeVariablen,
  'k5-winkel': winkel,
  'k5-achsensymmetrie': achsensymmetrie,
  'k5-daten-zufall': datenZufall,
  'k5-dezimalzahlen-rechnen': dezimalzahlenRechnen,
  'k5-geometrische-grundbegriffe': geometrischeGrundbegriffe,
  'k5-quader-volumen': quaderVolumen,

  // ── Klasse 6 ──
  'k6-bruchrechnung': bruchrechnung,
  'k6-negative-zahlen': negativeZahlen,
  'k6-wahrscheinlichkeit': wahrscheinlichkeit,
  'k6-verhaeltnisse': verhaeltnisse,
  'k6-koordinatensystem-4-quadranten': koordinaten4Q,
  'k6-dezimalbrueche': dezimalbrueche,
  'k6-rationale-zahlen': rationaleZahlen,
  'k6-proportionale-zuordnungen': proportionaleZuordnungen,
  'k6-kreise-winkel': kreiseWinkel,
  'k6-symmetrie-kongruenz': symmetrieKongruenz,
  'k6-statistik': statistikK6,
  'k6-terme-umformen': termeUmformen,
  'k6-gleichungen-einfuehrung': gleichungenEinfuehrung,
  'k6-volumen-oberflaeche': volumenOberflaeche,
  'k6-winkelberechnung': winkelberechnung,

  // ── Klasse 7 ──
  'k7-prozentrechnung-gym': prozentGym,
  'k7-lineare-gleichungen': lineareGleichungen,
  'k7-dreiecke-konstruieren': dreieckeKonstruieren,
  'k7-prozentrechnung-real': prozentReal,
  'k7-dreisatz': dreisatz,
  'k7-flaechenberechnung': flaechenberechnung,
  'k7-prozent-rabatt-mwst': prozentRabatt,
  'k7-dreisatz-intensiv': dreisatzIntensiv,
  'k7-diagramme-lesen': diagrammeLesen,
  'k7-terme-termumformungen': termeTermumformungen,
  'k7-zuordnungen-gym': zuordnungenGym,
  'k7-kongruenz': kongruenz,
  'k7-rationale-zahlen-vertieft': rationaleZahlenVertieft,
  'k7-zinsrechnung': zinsrechnung,
  'k7-gleichungen-real': gleichungenReal,
  'k7-volumen-real': volumenReal,
  'k7-zuordnungen-real': zuordnungenReal,
  'k7-grundrechenarten-festigen': grundrechenartenFestigen,
  'k7-masstab': masstab,
  'k7-sachaufgaben-geld': sachaufgabenGeld,
  'k7-geometrie-grundlagen': geometrieGrundlagen,
};

export function getGenerator(topicId: string): ExerciseTemplate | null {
  return GENERATORS[topicId] ?? null;
}

export function generateExercise(topicId: string, difficulty?: 1 | 2 | 3) {
  const gen = getGenerator(topicId);
  if (!gen) return null;
  return gen.generate(difficulty);
}

export function generateExercises(topicId: string, count: number, difficulty?: 1 | 2 | 3) {
  const gen = getGenerator(topicId);
  if (!gen) return [];
  return Array.from({ length: count }, () => gen.generate(difficulty));
}
