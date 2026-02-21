import type { TheoryBlock } from './types';

export const K4_K5_THEORY: Record<string, TheoryBlock> = {
  // ═══════════════════════════════════════════════════════════════
  // KLASSE 4 — Erweiterte Themen
  // ═══════════════════════════════════════════════════════════════

  'k4-zahlen-bis-1million': {
    concepts: [
      'Im Zahlenraum bis 1 Million gibt es diese Stellenwerte: Einer, Zehner, Hunderter, Tausender, Zehntausender, Hunderttausender.',
      'Große Zahlen liest man in Dreiergruppen von rechts: 345.678 → "dreihundertfünfundvierzigtausendsechshundertachtundsiebzig".',
      'Ein Punkt oder Leerzeichen nach je drei Stellen hilft beim Lesen: 1.000.000 = eine Million.',
    ],
    example: {
      question: 'Schreibe die Zahl: zweihundertvierunddreißigtausendfünfhundertsechs',
      steps: [
        'Zerlege das Wort: zweihundertvierunddreißig-tausend-fünfhundertsechs.',
        'Vor "tausend" steht 234 → das sind die Tausender.',
        'Nach "tausend" steht 506 → das sind Hunderter, Zehner, Einer.',
      ],
      answer: '234.506',
    },
    tips: [
      'Stelle dir die Stellenwerttafel vor: HT | ZT | T | H | Z | E. Schreibe jede Ziffer in die richtige Spalte.',
      'Wenn eine Stelle fehlt (z.B. keine Zehner), schreibe dort eine 0.',
    ],
    pitfalls: [
      'Pass auf bei Zahlen wie 506 — die Null in der Mitte darf nicht vergessen werden! "fünfhundertsechs" ist 506, nicht 56.',
    ],
  },

  'k4-runden-ueberschlagen': {
    concepts: [
      'Beim Runden schaust du auf die Ziffer rechts von der Rundungsstelle: Ist sie 0–4, wird abgerundet; ist sie 5–9, wird aufgerundet.',
      'Überschlagen bedeutet, erst zu runden und dann zu rechnen. So bekommst du schnell ein ungefähres Ergebnis.',
      'Überschlagsrechnung hilft dir zu prüfen, ob dein genaues Ergebnis ungefähr stimmt.',
    ],
    example: {
      question: 'Überschlage: 4.837 + 2.195',
      steps: [
        'Runde beide Zahlen auf Tausender: 4.837 ≈ 5.000 und 2.195 ≈ 2.000.',
        'Rechne mit den gerundeten Zahlen: 5.000 + 2.000 = 7.000.',
        'Das genaue Ergebnis liegt also ungefähr bei 7.000.',
      ],
      answer: '4.837 + 2.195 ≈ 7.000 (genau: 7.032)',
    },
    tips: [
      'Überschlage immer zuerst, bevor du genau rechnest — so erkennst du grobe Fehler sofort.',
    ],
    pitfalls: [
      'Beim Runden auf Tausender schaust du auf die Hunderterstelle, nicht auf die Einerstelle! Bei 4.837 ist die Hunderterstelle 8 → aufrunden auf 5.000.',
    ],
  },

  'k4-rechengesetze': {
    concepts: [
      'Kommutativgesetz (Vertauschungsgesetz): Bei Addition und Multiplikation darfst du die Zahlen vertauschen. 3 + 5 = 5 + 3 und 4 × 7 = 7 × 4.',
      'Assoziativgesetz (Verknüpfungsgesetz): Du darfst die Klammern verschieben. (2 + 3) + 4 = 2 + (3 + 4).',
      'Distributivgesetz (Verteilungsgesetz): Du darfst eine Klammer ausmultiplizieren. 3 × (4 + 5) = 3 × 4 + 3 × 5.',
    ],
    example: {
      question: 'Berechne geschickt: 7 × 98',
      steps: [
        'Zerlege 98 in 100 − 2: 7 × 98 = 7 × (100 − 2).',
        'Wende das Distributivgesetz an: 7 × 100 − 7 × 2.',
        '700 − 14 = 686.',
      ],
      answer: '7 × 98 = 686',
    },
    tips: [
      'Mit dem Distributivgesetz kannst du schwierige Aufgaben im Kopf rechnen, indem du auf "glatte" Zahlen zerlegst.',
      'Merke: Bei Subtraktion und Division gelten Kommutativ- und Assoziativgesetz NICHT!',
    ],
    pitfalls: [
      'Das Vertauschungsgesetz gilt nicht für Subtraktion: 5 − 3 = 2, aber 3 − 5 = −2. Das ist nicht das Gleiche!',
    ],
  },

  'k4-sachaufgaben-komplex': {
    concepts: [
      'Bei mehrstufigen Sachaufgaben musst du zuerst herausfinden, welche Schritte nötig sind, und in welcher Reihenfolge du rechnen musst.',
      'Lies die Aufgabe mehrmals durch. Unterstreiche die wichtigen Zahlen und markiere, was gefragt ist.',
      'Schreibe einen Rechenweg auf — Schritt für Schritt, mit Antwortsatz am Ende.',
    ],
    example: {
      question: 'Emma kauft 3 Hefte für je 1,50 € und 2 Stifte für je 2,20 €. Sie bezahlt mit einem 10-€-Schein. Wie viel Rückgeld bekommt sie?',
      steps: [
        'Hefte: 3 × 1,50 € = 4,50 €.',
        'Stifte: 2 × 2,20 € = 4,40 €.',
        'Gesamtpreis: 4,50 € + 4,40 € = 8,90 €.',
        'Rückgeld: 10,00 € − 8,90 € = 1,10 €.',
      ],
      answer: 'Emma bekommt 1,10 € Rückgeld.',
    },
    tips: [
      'Schreibe die Frage der Aufgabe in eigenen Worten auf — so weißt du genau, was du berechnen musst.',
    ],
    pitfalls: [
      'Vergiss nicht den Antwortsatz! Ein Ergebnis ohne Erklärung ist nur die halbe Lösung.',
    ],
  },

  'k4-dezimalzahlen-einfuehrung': {
    concepts: [
      'Dezimalzahlen haben ein Komma. Links vom Komma stehen die Ganzen, rechts die Teile: 3,5 bedeutet 3 Ganze und 5 Zehntel.',
      'Die erste Stelle nach dem Komma sind Zehntel, die zweite Stelle Hundertstel: 2,75 = 2 Ganze, 7 Zehntel, 5 Hundertstel.',
      'Dezimalzahlen kennst du vom Geld: 4,99 € bedeutet 4 Euro und 99 Cent.',
    ],
    example: {
      question: 'Ordne der Größe nach: 3,5 — 3,08 — 3,45',
      steps: [
        'Vergleiche die Ganzen: Alle haben 3 → gleich, also Nachkommastellen vergleichen.',
        'Zehntel vergleichen: 3,08 hat 0 Zehntel, 3,45 hat 4 Zehntel, 3,5 hat 5 Zehntel.',
        '0 < 4 < 5, also: 3,08 < 3,45 < 3,5.',
      ],
      answer: '3,08 < 3,45 < 3,5',
    },
    tips: [
      'Wenn du unsicher bist, fülle mit Nullen auf: 3,5 = 3,50. So kannst du besser vergleichen.',
    ],
    pitfalls: [
      '3,5 ist NICHT kleiner als 3,45, obwohl 5 kleiner als 45 aussieht! 3,5 = 3,50, und 50 Hundertstel sind mehr als 45 Hundertstel.',
    ],
  },

  'k4-geld-rechnen': {
    concepts: [
      '1 Euro = 100 Cent. Du schreibst Geldbeträge mit Komma: 3 Euro und 50 Cent = 3,50 €.',
      'Beim Einkaufen rechnest du: Gesamtpreis = Einzelpreis × Anzahl. Rückgeld = bezahlter Betrag − Gesamtpreis.',
      'Cent-Beträge kannst du in Euro umrechnen, indem du durch 100 teilst: 350 Cent = 3,50 €.',
    ],
    example: {
      question: 'Du kaufst 4 Brötchen für je 0,45 €. Du bezahlst mit 2 €. Wie viel Rückgeld bekommst du?',
      steps: [
        'Gesamtpreis: 4 × 0,45 € = 1,80 €.',
        'Rückgeld: 2,00 € − 1,80 € = 0,20 €.',
        'Du bekommst 20 Cent zurück.',
      ],
      answer: 'Rückgeld: 0,20 € (20 Cent)',
    },
    tips: [
      'Rechne mit Cent statt Euro, wenn das einfacher ist: 4 × 45 Cent = 180 Cent = 1,80 €.',
    ],
    pitfalls: [
      'Vergiss nicht die zwei Nachkommastellen bei Euro-Beträgen: 2 € schreibst du als 2,00 €, nicht als 2,0 €.',
    ],
  },

  'k4-gewichte-tonnen': {
    concepts: [
      'Neben Gramm (g) und Kilogramm (kg) gibt es auch die Tonne (t) für sehr schwere Dinge.',
      '1 Tonne = 1.000 Kilogramm. Ein kleines Auto wiegt ungefähr 1 Tonne.',
      'Beim Umrechnen: t → kg: × 1.000. kg → g: × 1.000. g → kg: ÷ 1.000.',
    ],
    example: {
      question: 'Ein Elefant wiegt 5 t 300 kg. Wie viel ist das in Kilogramm?',
      steps: [
        '5 t in kg umrechnen: 5 × 1.000 = 5.000 kg.',
        'Die 300 kg dazurechnen: 5.000 kg + 300 kg = 5.300 kg.',
      ],
      answer: '5 t 300 kg = 5.300 kg',
    },
    tips: [
      'Merke dir: Eine Tafel Schokolade ≈ 100 g, eine Packung Milch ≈ 1 kg, ein Auto ≈ 1 t.',
    ],
    pitfalls: [
      'Verwechsle nicht die Umrechnungszahlen! Von Tonnen zu Kilogramm sind es × 1.000, nicht × 100.',
    ],
  },

  'k4-vierecke-dreiecke': {
    concepts: [
      'Vierecke haben 4 Ecken und 4 Seiten. Besondere Vierecke sind: Quadrat, Rechteck, Parallelogramm, Raute und Trapez.',
      'Beim Quadrat sind alle 4 Seiten gleich lang und alle Winkel 90°. Beim Rechteck sind gegenüberliegende Seiten gleich lang und alle Winkel 90°.',
      'Dreiecke haben 3 Ecken und 3 Seiten. Es gibt gleichseitige (alle Seiten gleich), gleichschenklige (2 Seiten gleich) und unregelmäßige Dreiecke.',
    ],
    example: {
      question: 'Welches Viereck hat 4 gleich lange Seiten, aber keine rechten Winkel?',
      steps: [
        'Quadrat hat 4 gleich lange Seiten UND rechte Winkel → passt nicht.',
        'Raute (Rhombus) hat 4 gleich lange Seiten, aber die Winkel sind NICHT alle 90°.',
        'Antwort: Es ist eine Raute.',
      ],
      answer: 'Eine Raute hat 4 gleich lange Seiten, aber keine rechten Winkel.',
    },
    tips: [
      'Merke: Ein Quadrat ist immer auch ein Rechteck, eine Raute und ein Parallelogramm. Aber nicht umgekehrt!',
    ],
    pitfalls: [
      'Nicht jedes Viereck mit gleich langen Seiten ist ein Quadrat! Ohne rechte Winkel ist es eine Raute.',
    ],
  },

  'k4-symmetrie': {
    concepts: [
      'Eine Figur ist achsensymmetrisch, wenn du sie an einer Linie (Spiegelachse) falten kannst und beide Hälften genau aufeinanderliegen.',
      'Manche Figuren haben mehrere Spiegelachsen: Ein Quadrat hat 4, ein Rechteck hat 2, ein gleichseitiges Dreieck hat 3.',
      'Um den Spiegelpunkt zu finden, miss den Abstand zur Spiegelachse und trage den gleichen Abstand auf der anderen Seite ab.',
    ],
    example: {
      question: 'Wie viele Spiegelachsen hat ein Rechteck?',
      steps: [
        'Prüfe senkrecht durch die Mitte: Die linke und rechte Hälfte sind gleich → 1 Achse.',
        'Prüfe waagerecht durch die Mitte: Obere und untere Hälfte sind gleich → 2. Achse.',
        'Prüfe diagonal: Die Hälften sind nicht deckungsgleich → keine weitere Achse.',
      ],
      answer: 'Ein Rechteck hat 2 Spiegelachsen.',
    },
    tips: [
      'Falte ein Blatt Papier in der Mitte und schneide eine Form aus — wenn du es aufklappst, ist die Figur symmetrisch!',
    ],
    pitfalls: [
      'Die Diagonale eines Rechtecks ist KEINE Spiegelachse (außer beim Quadrat). Viele denken das, aber die Hälften passen nicht aufeinander.',
    ],
  },

  'k4-koordinaten-gitternetz': {
    concepts: [
      'Ein Gitternetz besteht aus senkrechten und waagerechten Linien, die Kästchen bilden.',
      'Jeder Punkt wird mit zwei Zahlen beschrieben: Erst die Spalte (waagerecht), dann die Zeile (senkrecht).',
      'Beispiel: Der Punkt (3|2) liegt in der 3. Spalte und der 2. Zeile.',
    ],
    example: {
      question: 'Wo liegt der Punkt (4|3) im Gitternetz?',
      steps: [
        'Gehe auf der waagerechten Achse 4 Kästchen nach rechts.',
        'Gehe von dort 3 Kästchen nach oben.',
        'Dort liegt der Punkt (4|3).',
      ],
      answer: 'Der Punkt (4|3) liegt 4 Kästchen nach rechts und 3 Kästchen nach oben.',
    },
    tips: [
      'Merke: Erst der Flur (waagerecht), dann der Fahrstuhl (senkrecht) — also erst nach rechts, dann nach oben.',
    ],
    pitfalls: [
      'Verwechsle nicht die Reihenfolge! (4|3) ist ein anderer Punkt als (3|4).',
    ],
  },

  'k4-tabellen-diagramme': {
    concepts: [
      'Tabellen ordnen Daten in Zeilen und Spalten. So kannst du viele Informationen übersichtlich darstellen.',
      'Ein Säulendiagramm zeigt Werte als Balken. Je höher die Säule, desto größer der Wert.',
      'Um ein Diagramm zu lesen, schau auf die Achsenbeschriftung: Was wird gezählt? Welche Einheiten stehen da?',
    ],
    example: {
      question: 'In einer Klasse haben 8 Kinder ein Haustier, 12 haben keins. Zeichne ein Säulendiagramm.',
      steps: [
        'Zeichne zwei Achsen: unten die Kategorien ("Haustier" und "kein Haustier"), links die Anzahl.',
        'Zeichne eine Säule für "Haustier" bis zur 8.',
        'Zeichne eine Säule für "kein Haustier" bis zur 12.',
      ],
      answer: 'Die Säule "kein Haustier" (12) ist höher als die Säule "Haustier" (8).',
    },
    tips: [
      'Beschrifte immer beide Achsen und gib deinem Diagramm eine Überschrift!',
    ],
    pitfalls: [
      'Achte darauf, dass die Abstände auf der Zahlenachse gleichmäßig sind — sonst sieht das Diagramm verzerrt aus.',
    ],
  },

  'k4-wahrscheinlichkeit-einfuehrung': {
    concepts: [
      '"Sicher" bedeutet: Es passiert auf jeden Fall (z.B. die Sonne geht morgen auf). "Unmöglich" bedeutet: Es kann nicht passieren (z.B. ein Würfel zeigt die 7).',
      '"Möglich" bedeutet: Es kann passieren, muss aber nicht (z.B. beim Würfeln eine 6 werfen).',
      'Wenn alle Ergebnisse gleich wahrscheinlich sind (wie beim fairen Würfel), ist die Wahrscheinlichkeit für jedes Ergebnis gleich groß.',
    ],
    example: {
      question: 'Du wirfst einen normalen Würfel. Ist es sicher, möglich oder unmöglich, eine 3 zu würfeln?',
      steps: [
        'Ein Würfel hat die Zahlen 1 bis 6.',
        'Die 3 ist dabei → es kann passieren.',
        'Aber es muss nicht passieren, denn es gibt auch 1, 2, 4, 5 und 6.',
      ],
      answer: 'Es ist möglich, eine 3 zu würfeln.',
    },
    tips: [
      'Stelle dir immer die Frage: "Kann das Ergebnis eintreten?" Wenn ja → möglich. Wenn immer → sicher. Wenn nie → unmöglich.',
    ],
    pitfalls: [
      'Verwechsle nicht "möglich" und "sicher"! Nur weil etwas oft passiert, ist es noch nicht sicher.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 5 — Erweiterte Themen
  // ═══════════════════════════════════════════════════════════════

  'k5-primzahlen-teilbarkeit': {
    concepts: [
      'Eine Primzahl ist eine Zahl größer als 1, die nur durch 1 und sich selbst teilbar ist. Die ersten Primzahlen sind: 2, 3, 5, 7, 11, 13, 17, 19, 23.',
      'Teilbarkeitsregeln helfen dir, schnell zu prüfen: Durch 2 teilbar → letzte Ziffer ist gerade. Durch 5 teilbar → endet auf 0 oder 5. Durch 3 teilbar → Quersumme ist durch 3 teilbar.',
      'Die 1 ist KEINE Primzahl. Die 2 ist die einzige gerade Primzahl.',
    ],
    example: {
      question: 'Ist 51 eine Primzahl?',
      steps: [
        'Prüfe Teilbarkeit durch 2: 51 ist ungerade → nicht durch 2 teilbar.',
        'Prüfe Teilbarkeit durch 3: Quersumme 5 + 1 = 6, und 6 ist durch 3 teilbar → 51 ist durch 3 teilbar!',
        '51 ÷ 3 = 17. Also ist 51 = 3 × 17 → keine Primzahl.',
      ],
      answer: '51 ist keine Primzahl, denn 51 = 3 × 17.',
    },
    tips: [
      'Merke die Teilbarkeitsregel für 3: Bilde die Quersumme (alle Ziffern zusammenzählen). Ist sie durch 3 teilbar, ist die Zahl durch 3 teilbar.',
      'Du musst nur bis zur Wurzel der Zahl prüfen: Bei 51 ist die Wurzel ca. 7, also teste 2, 3, 5 und 7.',
    ],
    pitfalls: [
      'Die 1 ist KEINE Primzahl! Das vergessen viele. Eine Primzahl muss größer als 1 sein.',
    ],
  },

  'k5-flaechen-koerper': {
    concepts: [
      'Körper sind dreidimensionale Formen: Würfel, Quader, Kugel, Zylinder, Pyramide, Kegel.',
      'Das Netz eines Körpers ist die "aufgeklappte" Oberfläche. Wenn du ein Netz zusammenfaltest, entsteht der Körper.',
      'Die Oberfläche eines Körpers ist die Summe aller Einzelflächen. Beim Quader sind das 6 Rechtecke.',
    ],
    example: {
      question: 'Aus wie vielen Flächen besteht das Netz eines Würfels?',
      steps: [
        'Ein Würfel hat 6 Seiten: oben, unten, vorne, hinten, links, rechts.',
        'Jede Seite ist ein Quadrat.',
        'Das Netz besteht also aus 6 gleich großen Quadraten.',
      ],
      answer: 'Das Netz eines Würfels besteht aus 6 Quadraten.',
    },
    tips: [
      'Bastele Körpernetze aus Papier — so verstehst du besser, wie die Flächen zusammenhängen.',
    ],
    pitfalls: [
      'Nicht jede Anordnung von 6 Quadraten ergibt ein Würfelnetz! Es gibt genau 11 verschiedene Würfelnetze.',
    ],
  },

  'k5-groessen-einheiten': {
    concepts: [
      'Länge: 1 km = 1.000 m, 1 m = 100 cm, 1 cm = 10 mm.',
      'Gewicht: 1 t = 1.000 kg, 1 kg = 1.000 g.',
      'Zeit: 1 h = 60 min, 1 min = 60 s. Achtung: Hier wird NICHT mit 10 oder 100 umgerechnet!',
    ],
    example: {
      question: 'Rechne um: 3 km 450 m = ? m',
      steps: [
        '3 km in Meter umrechnen: 3 × 1.000 = 3.000 m.',
        'Die 450 m dazuaddieren: 3.000 m + 450 m = 3.450 m.',
      ],
      answer: '3 km 450 m = 3.450 m',
    },
    tips: [
      'Merke dir die "Umrechnungskette": km → m → cm → mm. Jeder Schritt ist × 10 oder × 100 oder × 1.000.',
      'Bei Zeit-Einheiten ist es anders: Stunden → Minuten → Sekunden, jeweils × 60!',
    ],
    pitfalls: [
      'Verwechsle nicht die Umrechnungszahlen! Von km zu m sind es × 1.000, von m zu cm nur × 100, und bei Zeit ist es × 60.',
    ],
  },

  'k5-natuerliche-zahlen': {
    concepts: [
      'Natürliche Zahlen sind die Zahlen 0, 1, 2, 3, 4, … — also alle ganzen Zahlen ab null (ohne Komma und ohne Minus).',
      'Jede Stelle hat einen Stellenwert: Einer, Zehner, Hunderter, Tausender usw. In 47.382 hat die 4 den Wert 40.000.',
      'Große Zahlen kannst du am Zahlenstrahl darstellen und mit > (größer) und < (kleiner) vergleichen.',
    ],
    example: {
      question: 'Welchen Wert hat die Ziffer 5 in der Zahl 358.921?',
      steps: [
        'Bestimme die Stelle: 3 steht auf der Hunderttausenderstelle, 5 steht auf der Zehntausenderstelle.',
        'Die Zehntausenderstelle hat den Wert 10.000.',
        'Also hat die 5 den Wert: 5 × 10.000 = 50.000.',
      ],
      answer: 'Die 5 hat den Stellenwert 50.000 (Zehntausender).',
    },
    tips: [
      'Schreibe die Zahl in eine Stellenwerttafel, um den Wert jeder Ziffer schnell zu sehen.',
    ],
    pitfalls: [
      'Die Ziffer 5 hat nicht immer den Wert 5! In 500 ist der Wert 500, in 5.000 ist er 5.000 — der Stellenwert bestimmt den echten Wert.',
    ],
  },

  'k5-rechengesetze': {
    concepts: [
      'Punkt-vor-Strich-Regel: Multiplikation und Division werden immer vor Addition und Subtraktion berechnet.',
      'Klammern gehen vor allem: Rechne immer zuerst das aus, was in der Klammer steht.',
      'Reihenfolge: 1. Klammern → 2. Punkt (×, ÷) → 3. Strich (+, −). Von links nach rechts.',
    ],
    example: {
      question: 'Berechne: 8 + 4 × (3 + 2)',
      steps: [
        'Klammer zuerst: 3 + 2 = 5.',
        'Punkt vor Strich: 4 × 5 = 20.',
        'Zum Schluss Strich: 8 + 20 = 28.',
      ],
      answer: '8 + 4 × (3 + 2) = 28',
    },
    tips: [
      'Merksatz: "KlaPoPuStri" — Klammer, Potenz, Punkt, Strich. Das ist die Reihenfolge!',
    ],
    pitfalls: [
      'Ohne Beachtung von Punkt-vor-Strich bekommt man ein falsches Ergebnis! 8 + 4 × 5 ist 28, NICHT 60.',
    ],
  },

  'k5-achsensymmetrie': {
    concepts: [
      'Eine Figur ist achsensymmetrisch, wenn eine Spiegelachse sie in zwei deckungsgleiche Hälften teilt.',
      'Den Spiegelpunkt findest du so: Miss den Abstand des Punktes zur Achse und trage genau denselben Abstand auf der anderen Seite ab — senkrecht zur Achse.',
      'Symmetrische Figuren erkennst du daran, dass du sie an der Achse falten kannst und beide Hälften exakt übereinanderliegen.',
    ],
    example: {
      question: 'Spiegle den Punkt A(2|4) an der y-Achse.',
      steps: [
        'A liegt 2 Einheiten rechts von der y-Achse.',
        'Der Spiegelpunkt liegt 2 Einheiten links von der y-Achse.',
        'Die y-Koordinate bleibt gleich: A\'(−2|4).',
      ],
      answer: 'Der Spiegelpunkt ist A\'(−2|4).',
    },
    tips: [
      'Bei Spiegelung an der y-Achse ändert sich nur das Vorzeichen der x-Koordinate. Bei Spiegelung an der x-Achse ändert sich nur die y-Koordinate.',
    ],
    pitfalls: [
      'Der Spiegelpunkt hat immer den gleichen Abstand zur Achse wie der Originalpunkt — nicht den doppelten!',
    ],
  },

  'k5-daten-zufall': {
    concepts: [
      'Die relative Häufigkeit gibt an, wie oft ein Ergebnis im Verhältnis zur Gesamtanzahl aufgetreten ist: relative Häufigkeit = Anzahl ÷ Gesamtanzahl.',
      'Bei einem Zufallsexperiment (z.B. Würfeln, Münzwurf) kann man das Ergebnis nicht vorhersagen.',
      'Je öfter du ein Experiment wiederholst, desto näher kommt die relative Häufigkeit an die theoretische Wahrscheinlichkeit heran.',
    ],
    example: {
      question: 'Du wirfst 50-mal einen Würfel. Die 6 fällt 12-mal. Wie groß ist die relative Häufigkeit?',
      steps: [
        'Anzahl der Sechsen: 12.',
        'Gesamtanzahl der Würfe: 50.',
        'Relative Häufigkeit: 12 ÷ 50 = 0,24 = 24 %.',
      ],
      answer: 'Die relative Häufigkeit der 6 beträgt 12/50 = 0,24 (24 %).',
    },
    tips: [
      'Die relative Häufigkeit liegt immer zwischen 0 und 1 (oder 0 % und 100 %). Wenn du eine größere Zahl bekommst, ist etwas falsch.',
    ],
    pitfalls: [
      'Verwechsle nicht absolute und relative Häufigkeit! "12-mal" ist die absolute Häufigkeit, "24 %" ist die relative.',
    ],
  },

  'k5-dezimalzahlen-rechnen': {
    concepts: [
      'Addition und Subtraktion: Schreibe die Kommas genau untereinander und rechne wie bei ganzen Zahlen.',
      'Multiplikation: Rechne zuerst ohne Komma, dann zähle die Nachkommastellen beider Faktoren zusammen und setze das Komma.',
      'Division: Verschiebe das Komma beim Divisor nach rechts (z.B. ÷ 0,5 = ÷ 5 ÷ 10) oder rechne mit der schriftlichen Division.',
    ],
    example: {
      question: '3,4 × 1,2 = ?',
      steps: [
        'Rechne ohne Komma: 34 × 12 = 408.',
        'Zähle die Nachkommastellen: 3,4 hat 1 Stelle, 1,2 hat 1 Stelle → zusammen 2 Stellen.',
        'Setze das Komma 2 Stellen von rechts: 4,08.',
      ],
      answer: '3,4 × 1,2 = 4,08',
    },
    tips: [
      'Bei Addition und Subtraktion: Fülle fehlende Nachkommastellen mit Nullen auf, z.B. 3,5 + 2,14 → 3,50 + 2,14.',
    ],
    pitfalls: [
      'Bei der Multiplikation die Nachkommastellen BEIDER Faktoren zählen! Wenn ein Faktor 1 und der andere 2 Nachkommastellen hat, hat das Ergebnis 3.',
    ],
  },

  'k5-geometrische-grundbegriffe': {
    concepts: [
      'Ein Punkt hat keine Ausdehnung — er markiert nur eine Stelle. Punkte werden mit Großbuchstaben benannt: A, B, C.',
      'Eine Gerade ist unendlich lang in beide Richtungen. Eine Strecke hat einen Anfangs- und Endpunkt. Ein Strahl hat einen Anfangspunkt, geht aber in eine Richtung unendlich weiter.',
      'Parallele Geraden haben überall den gleichen Abstand und schneiden sich nie. Senkrechte Geraden treffen sich im rechten Winkel (90°).',
    ],
    example: {
      question: 'Was ist der Unterschied zwischen einer Strecke und einem Strahl?',
      steps: [
        'Eine Strecke hat zwei Endpunkte, z.B. die Strecke AB. Sie hat eine bestimmte Länge.',
        'Ein Strahl hat nur einen Anfangspunkt und geht in eine Richtung unendlich weiter.',
        'Beide sind Teile einer Geraden, aber die Gerade selbst geht in BEIDE Richtungen unendlich weiter.',
      ],
      answer: 'Eine Strecke hat 2 Endpunkte (endlich), ein Strahl hat 1 Anfangspunkt (unendlich in eine Richtung).',
    },
    tips: [
      'Merke: Strecke = "Stück" einer Geraden (endlich). Strahl = "halbe" Gerade (unendlich in eine Richtung). Gerade = unendlich in beide Richtungen.',
    ],
    pitfalls: [
      'Eine Gerade und eine Strecke sehen auf dem Papier ähnlich aus, sind aber mathematisch verschieden! Eine Gerade hat keine Endpunkte — sie geht immer weiter.',
    ],
  },

  'k5-quader-volumen': {
    concepts: [
      'Das Volumen gibt an, wie viel Platz ein Körper einnimmt — also wie viel hineinpasst.',
      'Beim Quader berechnest du das Volumen mit der Formel: V = Länge × Breite × Höhe.',
      'Die Einheit des Volumens ist cm³ (Kubikzentimeter) oder m³. 1 Liter = 1 dm³ = 1.000 cm³.',
    ],
    example: {
      question: 'Ein Quader ist 5 cm lang, 3 cm breit und 4 cm hoch. Berechne das Volumen.',
      steps: [
        'Formel: V = l × b × h.',
        'Einsetzen: V = 5 cm × 3 cm × 4 cm.',
        'Ausrechnen: V = 60 cm³.',
      ],
      answer: 'Das Volumen beträgt 60 cm³.',
    },
    tips: [
      'Stelle dir das Volumen als "Einheitswürfel" vor: Wie viele kleine 1-cm-Würfel passen in den Quader? Genau so viele wie das Volumen in cm³.',
    ],
    pitfalls: [
      'Verwechsle nicht Fläche (cm²) und Volumen (cm³)! Die Fläche hat 2 Dimensionen (Länge × Breite), das Volumen hat 3 (Länge × Breite × Höhe).',
    ],
  },
};
