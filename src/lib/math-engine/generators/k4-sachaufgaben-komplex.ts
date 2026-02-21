import type { Exercise, ExerciseTemplate } from '@/lib/curriculum/types';

let counter = 0;
function genId(prefix: string) { return `${prefix}-${++counter}-${Date.now()}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const namen = ['Lisa', 'Tom', 'Emma', 'Paul', 'Mia', 'Leon', 'Anna', 'Ben', 'Sophie', 'Max'];

/**
 * k4-sachaufgaben-komplex — Komplexere Sachaufgaben
 *
 * Difficulty 1: zweischrittige Aufgabe (number-input)
 * Difficulty 2: dreischrittige Aufgabe (number-input)
 * Difficulty 3: komplexe Alltagsaufgabe mit mehreren Schritten (number-input)
 */
export const template: ExerciseTemplate = {
  topicId: 'k4-sachaufgaben-komplex',
  generate(difficulty = 1): Exercise {
    const name = namen[randInt(0, namen.length - 1)];

    if (difficulty === 1) {
      // Zweischrittig: Einkaufen + Rückgeld oder Verteilen
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Kaufen und Rückgeld
        const preis = randInt(3, 12);
        const anzahl = randInt(2, 5);
        const gesamt = preis * anzahl;
        const bezahlt = Math.ceil(gesamt / 10) * 10 + (randInt(0, 1) === 0 ? 0 : 10);
        const rueckgeld = bezahlt - gesamt;

        return {
          id: genId('k4-sach'),
          topicId: 'k4-sachaufgaben-komplex',
          question: `${name} kauft ${anzahl} Hefte. Jedes Heft kostet ${preis} Euro. ${name} bezahlt mit einem ${bezahlt}-Euro-Schein. Wie viel Rückgeld bekommt ${name}?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: rueckgeld,
          hint: `Schritt 1: Berechne den Gesamtpreis (${anzahl} × ${preis}). Schritt 2: Ziehe den Preis vom bezahlten Betrag ab.`,
          explanation: `${anzahl} × ${preis} = ${gesamt} Euro. Rückgeld: ${bezahlt} − ${gesamt} = ${rueckgeld} Euro.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 40,
        };
      }

      // Verteilen
      const gesamt = randInt(24, 96);
      const gruppen = randInt(3, 6);
      const proGruppe = Math.floor(gesamt / gruppen);
      const rest = gesamt % gruppen;

      return {
        id: genId('k4-sach'),
        topicId: 'k4-sachaufgaben-komplex',
        question: `${name} hat ${gesamt} Aufkleber und verteilt sie gleichmäßig auf ${gruppen} Freunde. Wie viele Aufkleber bekommt jeder Freund?${rest > 0 ? ' (Ganze Aufkleber, ohne Rest)' : ''}`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: proGruppe,
        hint: `Teile ${gesamt} durch ${gruppen}.`,
        explanation: `${gesamt} ÷ ${gruppen} = ${proGruppe}${rest > 0 ? ` Rest ${rest}` : ''}. Jeder bekommt ${proGruppe} Aufkleber.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 35,
      };
    }

    if (difficulty === 2) {
      // Dreischrittig
      const variant = randInt(0, 1);

      if (variant === 0) {
        // Klassenfahrt: Kosten für Bus + Eintritt + Essen
        const schueler = randInt(20, 30);
        const busKosten = randInt(150, 300);
        const eintrittProPerson = randInt(5, 12);
        const essenProPerson = randInt(4, 8);
        const gesamtProPerson = eintrittProPerson + essenProPerson;
        const gesamtSchueler = schueler * gesamtProPerson;
        const gesamt = busKosten + gesamtSchueler;

        return {
          id: genId('k4-sach'),
          topicId: 'k4-sachaufgaben-komplex',
          question: `Die Klasse macht einen Ausflug. Der Bus kostet ${busKosten} Euro. Eintritt kostet ${eintrittProPerson} Euro pro Person und Essen ${essenProPerson} Euro pro Person. Es fahren ${schueler} Schüler mit. Wie viel kostet der Ausflug insgesamt?`,
          answerType: 'number',
          exerciseType: 'number-input',
          correctAnswer: gesamt,
          hint: `Schritt 1: Kosten pro Person (Eintritt + Essen). Schritt 2: Kosten für alle Schüler. Schritt 3: Bus dazurechnen.`,
          explanation: `Pro Person: ${eintrittProPerson} + ${essenProPerson} = ${gesamtProPerson} Euro. Alle Schüler: ${schueler} × ${gesamtProPerson} = ${gesamtSchueler} Euro. Gesamt: ${gesamtSchueler} + ${busKosten} = ${gesamt} Euro.`,
          difficulty,
          category: 'Abstrakt',
          estimatedSeconds: 60,
        };
      }

      // Garten-Aufgabe
      const reihen = randInt(4, 8);
      const proReihe = randInt(6, 12);
      const gesamtPflanzen = reihen * proReihe;
      const schonGepflanzt = randInt(10, Math.floor(gesamtPflanzen / 2));
      const nochZuPflanzen = gesamtPflanzen - schonGepflanzt;

      return {
        id: genId('k4-sach'),
        topicId: 'k4-sachaufgaben-komplex',
        question: `${name} möchte einen Garten mit ${reihen} Reihen anlegen. In jede Reihe passen ${proReihe} Pflanzen. ${name} hat schon ${schonGepflanzt} Pflanzen gesetzt. Wie viele Pflanzen fehlen noch?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: nochZuPflanzen,
        hint: `Schritt 1: Wie viele Pflanzen insgesamt? Schritt 2: Schon gepflanzte abziehen.`,
        explanation: `Insgesamt: ${reihen} × ${proReihe} = ${gesamtPflanzen}. Noch zu pflanzen: ${gesamtPflanzen} − ${schonGepflanzt} = ${nochZuPflanzen}.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 50,
      };
    }

    // difficulty === 3: Komplexe Alltagsaufgabe
    const variant = randInt(0, 1);

    if (variant === 0) {
      // Verkauf auf dem Flohmarkt
      const buecher = randInt(8, 20);
      const preisBuch = randInt(2, 5);
      const spiele = randInt(3, 8);
      const preisSpiel = randInt(4, 10);
      const einnahmen = buecher * preisBuch + spiele * preisSpiel;
      const standGebuehr = randInt(10, 25);
      const gewinn = einnahmen - standGebuehr;

      return {
        id: genId('k4-sach'),
        topicId: 'k4-sachaufgaben-komplex',
        question: `${name} verkauft auf dem Flohmarkt ${buecher} Bücher für je ${preisBuch} Euro und ${spiele} Spiele für je ${preisSpiel} Euro. Die Standgebühr beträgt ${standGebuehr} Euro. Wie viel Gewinn macht ${name}?`,
        answerType: 'number',
        exerciseType: 'number-input',
        correctAnswer: gewinn,
        hint: `Berechne zuerst die Einnahmen (Bücher + Spiele), dann ziehe die Standgebühr ab.`,
        explanation: `Bücher: ${buecher} × ${preisBuch} = ${buecher * preisBuch} Euro. Spiele: ${spiele} × ${preisSpiel} = ${spiele * preisSpiel} Euro. Einnahmen: ${einnahmen} Euro. Gewinn: ${einnahmen} − ${standGebuehr} = ${gewinn} Euro.`,
        difficulty,
        category: 'Abstrakt',
        estimatedSeconds: 75,
      };
    }

    // Streckenberechnung mit Geschwindigkeit (vereinfacht)
    const stundenHin = randInt(2, 4);
    const kmProStunde = randInt(40, 80);
    const streckeHin = stundenHin * kmProStunde;
    const streckeRueck = streckeHin; // gleiche Strecke
    const gesamtStrecke = streckeHin + streckeRueck;
    const tankLiter = randInt(30, 50);
    const verbrauchPro100 = randInt(6, 10);
    const verbrauchGesamt = Math.round((gesamtStrecke / 100) * verbrauchPro100);

    return {
      id: genId('k4-sach'),
      topicId: 'k4-sachaufgaben-komplex',
      question: `Eine Familie fährt ${stundenHin} Stunden mit ${kmProStunde} km/h in den Urlaub und fährt die gleiche Strecke zurück. Das Auto verbraucht ${verbrauchPro100} Liter pro 100 km. Wie viele Liter Benzin braucht die Familie für Hin- und Rückfahrt?`,
      answerType: 'number',
      exerciseType: 'number-input',
      correctAnswer: verbrauchGesamt,
      hint: `Schritt 1: Strecke berechnen (Hin + Rück). Schritt 2: Verbrauch berechnen.`,
      explanation: `Hinstrecke: ${stundenHin} × ${kmProStunde} = ${streckeHin} km. Gesamtstrecke: ${streckeHin} + ${streckeRueck} = ${gesamtStrecke} km. Verbrauch: ${gesamtStrecke} ÷ 100 × ${verbrauchPro100} = ${verbrauchGesamt} Liter.`,
      difficulty,
      category: 'Abstrakt',
      estimatedSeconds: 90,
    };
  },
};
