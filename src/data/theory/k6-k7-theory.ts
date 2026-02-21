import type { TheoryBlock } from './types';

/**
 * Theorie-Inhalte fuer Klasse 6 und Klasse 7 (fehlende Topics).
 * Sprache: Deutsch, altersgerecht fuer 11–13-Jaehrige.
 */
export const K6_K7_THEORY: Record<string, TheoryBlock> = {
  // ═══════════════════════════════════════════════════════════════
  // KLASSE 6 — Fehlende Topics (11)
  // ═══════════════════════════════════════════════════════════════

  'k6-wahrscheinlichkeit': {
    concepts: [
      'Wahrscheinlichkeit sagt dir, wie sicher ein Ereignis eintritt. Sie liegt immer zwischen 0 (unmoeglich) und 1 (sicher), oder zwischen 0 % und 100 %.',
      'Laplace-Wahrscheinlichkeit: Wenn alle Ergebnisse gleich wahrscheinlich sind, gilt: P = Anzahl guenstige Ergebnisse / Anzahl aller moeglichen Ergebnisse.',
      'Ein Baumdiagramm zeigt dir alle moeglichen Ergebnisse Schritt fuer Schritt. An jedem Ast steht die Wahrscheinlichkeit.',
    ],
    example: {
      question: 'Du wirfst einen normalen Wuerfel. Wie gross ist die Wahrscheinlichkeit, eine Zahl groesser als 4 zu wuerfeln?',
      steps: [
        'Alle moeglichen Ergebnisse: 1, 2, 3, 4, 5, 6 — das sind 6 Stueck.',
        'Guenstige Ergebnisse (groesser als 4): 5 und 6 — das sind 2 Stueck.',
        'P = 2/6 = 1/3 (ungefaehr 33 %).',
      ],
      answer: 'Die Wahrscheinlichkeit betraegt 1/3 oder etwa 33,3 %.',
    },
    tips: [
      'Zaehle immer zuerst ALLE moeglichen Ergebnisse, dann die guenstigen. Das hilft gegen Denkfehler.',
      'Im Baumdiagramm multiplizierst du die Wahrscheinlichkeiten entlang eines Pfades.',
    ],
    pitfalls: [
      'Die Laplace-Formel gilt nur, wenn alle Ergebnisse gleich wahrscheinlich sind! Bei einem gezinkten Wuerfel funktioniert sie nicht.',
    ],
  },

  'k6-verhaeltnisse': {
    concepts: [
      'Ein Verhaeltnis vergleicht zwei Groessen miteinander, z.B. 3 : 5 bedeutet "3 zu 5".',
      'Verhaeltnisse kannst du kuerzen und erweitern, genau wie Brueche: 6 : 10 = 3 : 5 (beide durch 2).',
      'Proportionen sind Gleichungen aus zwei gleichen Verhaeltnissen: 2 : 3 = 4 : 6.',
    ],
    example: {
      question: 'In einer Klasse sind 12 Maedchen und 18 Jungen. Wie ist das Verhaeltnis Maedchen zu Jungen (gekuerzt)?',
      steps: [
        'Schreibe das Verhaeltnis auf: 12 : 18.',
        'Finde den ggT von 12 und 18: ggT = 6.',
        'Kuerze: 12 ÷ 6 : 18 ÷ 6 = 2 : 3.',
      ],
      answer: 'Das Verhaeltnis Maedchen zu Jungen ist 2 : 3.',
    },
    tips: [
      'Achte auf die Reihenfolge! "Maedchen zu Jungen" ist 2 : 3, "Jungen zu Maedchen" waere 3 : 2.',
    ],
    pitfalls: [
      'Ein Verhaeltnis ist nicht das Gleiche wie ein Bruch: 2 : 3 bedeutet "2 Teile zu 3 Teile" (zusammen 5 Teile), waehrend 2/3 ein Anteil vom Ganzen ist.',
    ],
  },

  'k6-koordinatensystem-4-quadranten': {
    concepts: [
      'Das Koordinatensystem mit 4 Quadranten hat auch negative Werte. Die x-Achse geht nach links ins Negative, die y-Achse nach unten ins Negative.',
      'Die 4 Quadranten: I (+|+) oben rechts, II (−|+) oben links, III (−|−) unten links, IV (+|−) unten rechts.',
      'Punkte liest du immer so ab: Erst x-Wert (waagerecht), dann y-Wert (senkrecht). Beispiel: P(−3|2) liegt im II. Quadranten.',
    ],
    example: {
      question: 'In welchem Quadranten liegt der Punkt A(−4|−2)?',
      steps: [
        'x-Koordinate ist −4 (negativ, also links).',
        'y-Koordinate ist −2 (negativ, also unten).',
        'Beide Koordinaten negativ → III. Quadrant (unten links).',
      ],
      answer: 'Der Punkt A(−4|−2) liegt im III. Quadranten.',
    },
    tips: [
      'Merke dir: "Erst Flur, dann Fahrstuhl" — erst x (waagerecht), dann y (senkrecht). Das gilt auch bei negativen Zahlen!',
    ],
    pitfalls: [
      'Vergiss die Vorzeichen nicht! P(3|−2) ist ein ganz anderer Punkt als P(3|2). Schau immer genau auf Plus und Minus.',
    ],
  },

  'k6-dezimalbrueche': {
    concepts: [
      'Jeder Bruch laesst sich als Dezimalzahl schreiben: 3/4 = 3 ÷ 4 = 0,75. Umgekehrt ist 0,5 = 5/10 = 1/2.',
      'Umwandlung Bruch → Dezimal: Teile den Zaehler durch den Nenner (schriftliche Division).',
      'Umwandlung Dezimal → Bruch: Schreibe die Nachkommastellen als Bruch (z.B. 0,35 = 35/100 = 7/20) und kuerze.',
    ],
    example: {
      question: 'Wandle 3/8 in eine Dezimalzahl um.',
      steps: [
        'Rechne 3 ÷ 8 mit schriftlicher Division.',
        '3 ÷ 8 = 0,375.',
        'Kontrolle: 0,375 × 8 = 3. Stimmt!',
      ],
      answer: '3/8 = 0,375',
    },
    tips: [
      'Manche Brueche ergeben periodische Dezimalzahlen: 1/3 = 0,333... Man schreibt 0,3̄ mit einem Strich ueber der 3.',
    ],
    pitfalls: [
      'Beim Umwandeln von Dezimal zu Bruch nicht vergessen zu kuerzen! 0,4 = 4/10 = 2/5 (nicht bei 4/10 stehen bleiben).',
    ],
  },

  'k6-rationale-zahlen': {
    concepts: [
      'Die rationalen Zahlen (Menge Q) umfassen alle Zahlen, die man als Bruch schreiben kann — positive, negative und die Null.',
      'Auf dem Zahlenstrahl liegen die rationalen Zahlen links und rechts von der Null: ... −2, −1,5, −1, −0,5, 0, 0,5, 1, 1,5, 2 ...',
      'Jede ganze Zahl ist auch eine rationale Zahl, z.B. 3 = 3/1. Aber nicht jede rationale Zahl ist ganzzahlig, z.B. 1/3.',
    ],
    example: {
      question: 'Ordne die Zahlen −2,5 ; 1/2 ; −1 ; 0,75 der Groesse nach.',
      steps: [
        'Wandle alle in Dezimalzahlen um: −2,5 ; 0,5 ; −1 ; 0,75.',
        'Ordne von klein nach gross: −2,5 < −1 < 0,5 < 0,75.',
        'In der urspruenglichen Schreibweise: −2,5 < −1 < 1/2 < 0,75.',
      ],
      answer: '−2,5 < −1 < 1/2 < 0,75',
    },
    tips: [
      'Um rationale Zahlen zu vergleichen, bringe alle auf die gleiche Form (am besten Dezimalzahlen). Dann ist es einfach!',
    ],
    pitfalls: [
      'Bei negativen Zahlen gilt: Je groesser die Zahl hinter dem Minus, desto kleiner ist sie! −5 ist kleiner als −2.',
    ],
  },

  'k6-kreise-winkel': {
    concepts: [
      'Ein Kreis hat einen Mittelpunkt M, einen Radius r (Abstand Mittelpunkt zum Rand) und einen Durchmesser d = 2r.',
      'Der Kreisumfang berechnet sich mit: U = 2 × π × r (oder U = π × d). Die Zahl π (Pi) ist ungefaehr 3,14.',
      'Ein Vollwinkel hat 360°. Ein Halbkreis entspricht 180°, ein Viertelkreis 90°.',
    ],
    example: {
      question: 'Ein Kreis hat den Radius r = 5 cm. Berechne den Umfang.',
      steps: [
        'Formel: U = 2 × π × r.',
        'Einsetzen: U = 2 × 3,14 × 5 cm.',
        'Rechnen: U = 31,4 cm.',
      ],
      answer: 'Der Kreisumfang betraegt ungefaehr 31,4 cm.',
    },
    tips: [
      'Merke dir π ≈ 3,14. Fuer genauere Rechnungen nimm 3,1416 oder die π-Taste am Taschenrechner.',
    ],
    pitfalls: [
      'Verwechsle nicht Radius und Durchmesser! Der Durchmesser ist doppelt so lang wie der Radius. Wenn d = 10 cm, dann r = 5 cm.',
    ],
  },

  'k6-symmetrie-kongruenz': {
    concepts: [
      'Achsensymmetrie: Eine Figur ist achsensymmetrisch, wenn man sie entlang einer Linie (Spiegelachse) falten kann und beide Haelften genau uebereinander liegen.',
      'Punktsymmetrie: Eine Figur ist punktsymmetrisch, wenn sie nach einer Drehung um 180° um einen Punkt gleich aussieht.',
      'Kongruente Figuren sind deckungsgleich — sie haben die gleiche Form UND die gleiche Groesse. Man kann sie durch Verschieben, Drehen oder Spiegeln aufeinander legen.',
    ],
    example: {
      question: 'Ist das Wort "OTTO" achsensymmetrisch?',
      steps: [
        'Zeichne das Wort OTTO und suche eine moegliche Spiegelachse.',
        'Lege eine senkrechte Achse in die Mitte zwischen die beiden T.',
        'Links: OT, rechts (gespiegelt): TO → Das Spiegelbild von OT ist TO. Stimmt ueberein!',
      ],
      answer: 'Ja, OTTO ist achsensymmetrisch mit einer senkrechten Spiegelachse in der Mitte.',
    },
    tips: [
      'Nimm ein Blatt Papier und falte es — wenn beide Haelften genau uebereinander liegen, hast du eine Symmetrieachse gefunden.',
    ],
    pitfalls: [
      'Aehnliche Figuren sind NICHT dasselbe wie kongruente Figuren! Aehnliche Figuren haben die gleiche Form, aber koennen unterschiedlich gross sein.',
    ],
  },

  'k6-statistik': {
    concepts: [
      'Der Mittelwert (Durchschnitt) ist die Summe aller Werte geteilt durch die Anzahl der Werte.',
      'Der Median ist der mittlere Wert, wenn du alle Werte der Groesse nach sortierst. Bei gerader Anzahl nimmst du den Durchschnitt der beiden mittleren Werte.',
      'Die Spannweite ist der Unterschied zwischen dem groessten und dem kleinsten Wert: Spannweite = Maximum − Minimum.',
    ],
    example: {
      question: 'Noten einer Klassenarbeit: 2, 3, 1, 4, 3, 2, 5, 3. Berechne den Mittelwert.',
      steps: [
        'Summe: 2 + 3 + 1 + 4 + 3 + 2 + 5 + 3 = 23.',
        'Anzahl der Werte: 8.',
        'Mittelwert = 23 ÷ 8 = 2,875.',
      ],
      answer: 'Der Mittelwert betraegt 2,875 (also ungefaehr Note 2,9).',
    },
    tips: [
      'Sortiere die Werte zuerst der Groesse nach — dann findest du Median, Minimum und Maximum viel leichter.',
    ],
    pitfalls: [
      'Der Mittelwert kann durch extreme Ausreisser verfaelscht werden! Wenn fast alle eine 2 haben, aber einer eine 6, steigt der Schnitt deutlich. Der Median ist dann oft aussagekraeftiger.',
    ],
  },

  'k6-terme-umformen': {
    concepts: [
      'Gleichartige Terme (gleiche Variable, gleiche Potenz) kannst du zusammenfassen: 3x + 5x = 8x.',
      'Ausmultiplizieren: Einen Faktor vor der Klammer mit jedem Term in der Klammer multiplizieren: 3 × (x + 4) = 3x + 12.',
      'Ausklammern ist die Umkehrung: 6x + 12 = 6 × (x + 2). Du ziehst den gemeinsamen Faktor heraus.',
    ],
    example: {
      question: 'Vereinfache: 4x + 3 − 2x + 7',
      steps: [
        'Ordne nach Variablen und Zahlen: 4x − 2x + 3 + 7.',
        'Fasse die x-Terme zusammen: 4x − 2x = 2x.',
        'Fasse die Zahlen zusammen: 3 + 7 = 10.',
      ],
      answer: '4x + 3 − 2x + 7 = 2x + 10',
    },
    tips: [
      'Unterstreiche gleichartige Terme mit der gleichen Farbe — so siehst du sofort, was zusammengehoert.',
    ],
    pitfalls: [
      'Du darfst nur gleichartige Terme zusammenfassen! 3x + 5y laesst sich NICHT weiter vereinfachen, weil x und y verschiedene Variablen sind.',
    ],
  },

  'k6-volumen-oberflaeche': {
    concepts: [
      'Das Volumen gibt an, wie viel Platz ein Koerper einnimmt. Die Einheit ist cm³ oder m³.',
      'Wuerfel: V = a × a × a = a³. Quader: V = Laenge × Breite × Hoehe.',
      'Die Oberflaeche ist die gesamte Aussen-Flaeche eines Koerpers. Beim Quader: O = 2 × (l × b + l × h + b × h).',
    ],
    example: {
      question: 'Ein Quader ist 5 cm lang, 3 cm breit und 4 cm hoch. Berechne das Volumen.',
      steps: [
        'Formel: V = l × b × h.',
        'Einsetzen: V = 5 × 3 × 4.',
        'Rechnen: V = 60 cm³.',
      ],
      answer: 'Das Volumen des Quaders betraegt 60 cm³.',
    },
    tips: [
      'Stelle dir das Volumen wie Einheitswuerfel vor: Wie viele 1 cm³-Wuerfelchen passen in den Koerper?',
    ],
    pitfalls: [
      'Verwechsle nicht Volumen (cm³) und Oberflaeche (cm²)! Das Volumen misst den Inhalt, die Oberflaeche die Huellflaeche.',
    ],
  },

  'k6-winkelberechnung': {
    concepts: [
      'Nebenwinkel liegen an einer Geraden nebeneinander und ergeben zusammen 180°: α + β = 180°.',
      'Scheitelwinkel liegen sich an einer Kreuzung gegenueber und sind immer gleich gross.',
      'Im Dreieck betraegt die Winkelsumme immer 180°: α + β + γ = 180°.',
    ],
    example: {
      question: 'In einem Dreieck sind α = 65° und β = 48°. Wie gross ist γ?',
      steps: [
        'Die Winkelsumme im Dreieck ist 180°.',
        'γ = 180° − α − β = 180° − 65° − 48°.',
        'γ = 67°.',
      ],
      answer: 'Der Winkel γ betraegt 67°.',
    },
    tips: [
      'Mache immer eine Plausibilitaetspruefung: Addiere alle drei Winkel — das Ergebnis muss genau 180° ergeben.',
    ],
    pitfalls: [
      'Nebenwinkel und Scheitelwinkel nicht verwechseln! Nebenwinkel ergaenzen sich zu 180°, Scheitelwinkel sind gleich gross.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 7 — Fehlende Topics (17)
  // ═══════════════════════════════════════════════════════════════

  'k7-dreiecke-konstruieren': {
    concepts: [
      'Es gibt drei Konstruktionsverfahren: SSS (drei Seiten gegeben), SWS (zwei Seiten und der eingeschlossene Winkel) und WSW (zwei Winkel und die eingeschlossene Seite).',
      'Du brauchst Zirkel, Geodreieck und Bleistift. Beginne immer mit einer Seite als Grundseite.',
      'Nach der Konstruktion pruefen: Stimmen alle gegebenen Laengen und Winkel mit deiner Zeichnung ueberein?',
    ],
    example: {
      question: 'Konstruiere ein Dreieck mit a = 6 cm, b = 4 cm, c = 5 cm (SSS).',
      steps: [
        'Zeichne die Seite c = 5 cm als Grundseite. Markiere die Endpunkte A und B.',
        'Schlage einen Kreis um A mit Radius b = 4 cm (Zirkel).',
        'Schlage einen Kreis um B mit Radius a = 6 cm. Der Schnittpunkt der Kreise ist Punkt C.',
        'Verbinde A mit C und B mit C — fertig ist das Dreieck.',
      ],
      answer: 'Das Dreieck ABC mit a = 6 cm, b = 4 cm und c = 5 cm ist konstruiert.',
    },
    tips: [
      'Zeichne die laengste Seite als Grundseite — dann liegt das Dreieck stabiler auf dem Papier.',
    ],
    pitfalls: [
      'Die Dreiecksungleichung muss gelten: Jede Seite muss kuerzer sein als die Summe der beiden anderen. Sonst laesst sich kein Dreieck konstruieren!',
    ],
  },

  'k7-prozentrechnung-real': {
    concepts: [
      'Grundwert (G) = das Ganze (100 %). Prozentwert (W) = der berechnete Anteil. Prozentsatz (p %) = der Anteil in Prozent.',
      'Die drei Grundformeln: W = G × p / 100, G = W × 100 / p, p = W / G × 100.',
      'Im Alltag brauchst du Prozentrechnung beim Einkaufen, bei Rabatten und bei Ergebnissen in der Schule.',
    ],
    example: {
      question: 'In einer Klasse mit 25 Schuelern haben 6 eine Eins geschrieben. Wie viel Prozent sind das?',
      steps: [
        'Grundwert G = 25 (alle Schueler).',
        'Prozentwert W = 6 (Schueler mit Eins).',
        'p = W / G × 100 = 6 / 25 × 100 = 24 %.',
      ],
      answer: '24 % der Schueler haben eine Eins geschrieben.',
    },
    tips: [
      'Uebe die drei Formeln mit dem "Prozent-Dreieck": W oben, G und p/100 unten. Decke ab, was du suchst!',
    ],
    pitfalls: [
      'Verwechsle nicht Grundwert und Prozentwert! Der Grundwert ist immer das Ganze (100 %), der Prozentwert ist der Anteil.',
    ],
  },

  'k7-prozent-rabatt-mwst': {
    concepts: [
      'Rabatt bedeutet einen Preisnachlass. Den Rabattbetrag berechnest du mit: Rabatt = Preis × Rabattsatz / 100.',
      'Die Mehrwertsteuer (MwSt) wird auf den Nettopreis aufgeschlagen. In Deutschland meist 19 % (normal) oder 7 % (ermaessigt).',
      'Skonto ist ein Preisnachlass fuer schnelle Zahlung, z.B. "2 % Skonto bei Zahlung innerhalb von 10 Tagen".',
    ],
    example: {
      question: 'Eine Jacke kostet 80 €. Du bekommst 25 % Rabatt. Was zahlst du?',
      steps: [
        'Rabattbetrag = 80 € × 25 / 100 = 20 €.',
        'Neuer Preis = 80 € − 20 € = 60 €.',
        'Oder direkt: 80 € × 0,75 = 60 € (du zahlst 75 % des Preises).',
      ],
      answer: 'Du zahlst 60 € fuer die Jacke.',
    },
    tips: [
      'Schneller Trick: Bei x % Rabatt zahlst du (100 − x) % des Preises. Bei 25 % Rabatt zahlst du 75 %.',
    ],
    pitfalls: [
      'Aufpassen: Wenn zuerst Rabatt und dann MwSt berechnet wird, kommt ein anderes Ergebnis heraus als andersherum. Lies die Aufgabe genau!',
    ],
  },

  'k7-dreisatz-intensiv': {
    concepts: [
      'Beim zusammengesetzten Dreisatz haengt eine Groesse von ZWEI anderen ab, z.B. Arbeiter UND Tage bestimmen die Menge.',
      'Du rechnest den Dreisatz in mehreren Schritten: Erst fuer die eine Groesse, dann fuer die andere.',
      'Pruefe bei jeder Groesse einzeln: Ist sie proportional oder antiproportional zur gesuchten Groesse?',
    ],
    example: {
      question: '4 Maschinen produzieren in 6 Stunden 480 Teile. Wie viele Teile schaffen 6 Maschinen in 8 Stunden?',
      steps: [
        'Schritt 1: Von 4 auf 1 Maschine (÷ 4): 480 ÷ 4 = 120 Teile.',
        'Schritt 2: Von 1 auf 6 Maschinen (× 6): 120 × 6 = 720 Teile.',
        'Schritt 3: Von 6 auf 8 Stunden (× 8/6): 720 ÷ 6 × 8 = 960 Teile.',
      ],
      answer: '6 Maschinen schaffen in 8 Stunden 960 Teile.',
    },
    tips: [
      'Schreibe dir eine kleine Tabelle: Was ist gegeben, was ist gesucht? Rechne Schritt fuer Schritt — kein Schritt ueberspringen!',
    ],
    pitfalls: [
      'Pruefe bei JEDEM Schritt: Wird es mehr oder weniger? Mehr Maschinen → mehr Teile (proportional). Mehr Zeit → mehr Teile (proportional). Nicht alles ist antiproportional!',
    ],
  },

  'k7-diagramme-lesen': {
    concepts: [
      'Saeulendiagramme zeigen Werte als Balken — je hoeherer der Balken, desto groesser der Wert.',
      'Kreisdiagramme zeigen Anteile am Ganzen (360° = 100 %). Ein Viertel des Kreises entspricht 25 %.',
      'Liniendiagramme zeigen Veraenderungen ueber die Zeit — von links nach rechts liest du den Verlauf ab.',
    ],
    example: {
      question: 'In einem Kreisdiagramm nimmt "Sport" einen Winkel von 90° ein. Wie viel Prozent sind das?',
      steps: [
        'Der ganze Kreis hat 360°.',
        'Anteil in Prozent = 90 / 360 × 100.',
        '= 25 %.',
      ],
      answer: 'Sport macht 25 % aus.',
    },
    tips: [
      'Lies immer zuerst die Achsenbeschriftung und die Legende! Ohne sie weisst du nicht, was die Zahlen bedeuten.',
    ],
    pitfalls: [
      'Achtung bei Saeulendiagrammen: Wenn die y-Achse nicht bei 0 anfaengt, wirken Unterschiede viel groesser als sie sind!',
    ],
  },

  'k7-terme-termumformungen': {
    concepts: [
      'Terme vereinfachen: Fasse gleichartige Terme zusammen, z.B. 5a + 3b − 2a = 3a + 3b.',
      'Klammern ausmultiplizieren: a × (b + c) = a × b + a × c. Das nennt man das Distributivgesetz.',
      'Mehrere Klammern: Loesche Klammern Schritt fuer Schritt auf. Minus vor der Klammer aendert alle Vorzeichen: −(3x − 5) = −3x + 5.',
    ],
    example: {
      question: 'Vereinfache: 2(3x + 4) − (x − 5)',
      steps: [
        'Erste Klammer ausmultiplizieren: 2 × 3x + 2 × 4 = 6x + 8.',
        'Zweite Klammer aufloesen (Minus beachten!): −x + 5.',
        'Zusammenfassen: 6x − x + 8 + 5 = 5x + 13.',
      ],
      answer: '2(3x + 4) − (x − 5) = 5x + 13',
    },
    tips: [
      'Schreibe Zwischenschritte auf! Besonders bei Minus vor einer Klammer passieren sonst schnell Vorzeichenfehler.',
    ],
    pitfalls: [
      'Minus vor der Klammer aendert ALLE Vorzeichen in der Klammer: −(a − b + c) = −a + b − c. Nicht nur das erste!',
    ],
  },

  'k7-zuordnungen-gym': {
    concepts: [
      'Proportionale Zuordnung: y = k × x (k ist der Proportionalitaetsfaktor). Der Graph ist eine Gerade durch den Ursprung.',
      'Antiproportionale Zuordnung: y = k / x. Der Graph ist eine Kurve (Hyperbel). Das Produkt x × y ist immer gleich.',
      'Am Graphen erkennst du den Typ: Gerade durch (0|0) = proportional. Kurve, die nie die Achsen beruehrt = antiproportional.',
    ],
    example: {
      question: 'Ein Auto faehrt mit konstanter Geschwindigkeit. Nach 2 Stunden hat es 120 km zurueckgelegt. Wie weit nach 5 Stunden?',
      steps: [
        'Proportionale Zuordnung: Mehr Zeit → mehr Strecke.',
        'Proportionalitaetsfaktor k = 120 / 2 = 60 km/h.',
        'Nach 5 Stunden: y = 60 × 5 = 300 km.',
      ],
      answer: 'Nach 5 Stunden hat das Auto 300 km zurueckgelegt.',
    },
    tips: [
      'Pruefe: Geht der Graph durch den Ursprung (0|0)? Wenn ja, ist es proportional. Wenn nein, ist es eine andere Zuordnung.',
    ],
    pitfalls: [
      'Nicht jede Gerade ist proportional! Eine Gerade, die NICHT durch den Ursprung geht (z.B. y = 2x + 3), ist eine lineare Funktion, aber keine proportionale Zuordnung.',
    ],
  },

  'k7-kongruenz': {
    concepts: [
      'Zwei Figuren sind kongruent (deckungsgleich), wenn sie in Form und Groesse uebereinstimmen.',
      'Die vier Kongruenzsaetze fuer Dreiecke: SSS (drei Seiten), SWS (zwei Seiten und eingeschlossener Winkel), WSW (zwei Winkel und eingeschlossene Seite), SsW (zwei Seiten und gegenueberliegender Winkel der groesseren Seite).',
      'Mit einem Kongruenzsatz kannst du beweisen, dass zwei Dreiecke gleich sind, ohne alle Seiten und Winkel messen zu muessen.',
    ],
    example: {
      question: 'Dreieck 1 hat: a = 5 cm, b = 7 cm, γ = 60°. Dreieck 2 hat: a = 5 cm, b = 7 cm, γ = 60°. Sind sie kongruent?',
      steps: [
        'Vergleiche: Zwei Seiten (a = 5, b = 7) und der eingeschlossene Winkel (γ = 60°) stimmen ueberein.',
        'Das ist der Kongruenzsatz SWS: Zwei Seiten und der eingeschlossene Winkel sind gleich.',
        'Also sind die Dreiecke kongruent.',
      ],
      answer: 'Ja, die Dreiecke sind kongruent nach dem Kongruenzsatz SWS.',
    },
    tips: [
      'Zeichne dir die Dreiecke auf und beschrifte alle bekannten Stuecke. So siehst du sofort, welcher Kongruenzsatz passt.',
    ],
    pitfalls: [
      'Bei SsW muss der gegebene Winkel dem LAENGEREN der beiden Seiten gegenueber liegen. Sonst kann es zwei verschiedene Dreiecke geben!',
    ],
  },

  'k7-rationale-zahlen-vertieft': {
    concepts: [
      'Rationale Zahlen addieren: Gleiche Vorzeichen → addiere die Betraege, Vorzeichen bleibt. Verschiedene Vorzeichen → subtrahiere die Betraege, Vorzeichen der groesseren Zahl.',
      'Multiplikation und Division: Plus × Plus = Plus, Minus × Minus = Plus, Plus × Minus = Minus.',
      'Brueche mit negativen Zahlen: −2/3 = (−2)/3 = 2/(−3). Das Minus kann oben, unten oder vor dem Bruch stehen.',
    ],
    example: {
      question: 'Rechne: (−3/4) × (−2/5) = ?',
      steps: [
        'Vorzeichen bestimmen: Minus × Minus = Plus → Ergebnis positiv.',
        'Zaehler × Zaehler: 3 × 2 = 6. Nenner × Nenner: 4 × 5 = 20.',
        'Ergebnis: +6/20 = 3/10 (gekuerzt durch 2).',
      ],
      answer: '(−3/4) × (−2/5) = 3/10',
    },
    tips: [
      'Bestimme immer ZUERST das Vorzeichen, dann rechne mit den Betraegen. So vermeidest du Vorzeichenfehler.',
    ],
    pitfalls: [
      'Minus mal Minus = Plus, aber Minus plus Minus = groesseres Minus! Verwechsle nicht Multiplikation und Addition: (−3) × (−2) = +6, aber (−3) + (−2) = −5.',
    ],
  },

  'k7-zinsrechnung': {
    concepts: [
      'Kapital (K) ist das angelegte Geld. Der Zinssatz (p) gibt an, wie viel Prozent Zinsen du pro Jahr bekommst.',
      'Zinsen fuer ein Jahr: Z = K × p / 100. Fuer mehrere Monate: Z = K × p × m / (100 × 12).',
      'Bei Zinseszins werden die Zinsen zum Kapital addiert und im naechsten Jahr mitverzinst: K_neu = K × (1 + p/100).',
    ],
    example: {
      question: 'Du legst 500 € fuer 1 Jahr zu 3 % Zinsen an. Wie viel Zinsen bekommst du?',
      steps: [
        'Formel: Z = K × p / 100.',
        'Einsetzen: Z = 500 × 3 / 100.',
        'Rechnen: Z = 15 €.',
      ],
      answer: 'Du bekommst 15 € Zinsen. Dein Guthaben betraegt nach einem Jahr 515 €.',
    },
    tips: [
      'Die Zinsformel ist fast gleich wie die Prozentformel — Kapital ist der Grundwert, Zinsen sind der Prozentwert.',
    ],
    pitfalls: [
      'Bei Monaten nicht vergessen durch 12 zu teilen! Zinsen fuer 3 Monate = K × p × 3 / (100 × 12), NICHT K × p × 3 / 100.',
    ],
  },

  'k7-gleichungen-real': {
    concepts: [
      'Textaufgaben in Gleichungen uebersetzen: Lies den Text, finde die unbekannte Groesse (= x) und stelle die Gleichung auf.',
      'Typische Signalwoerter: "ist gleich" (=), "mehr als" (+), "weniger als" (−), "das Doppelte" (2×), "ein Drittel" (÷ 3).',
      'Nach dem Loesen: Pruefe, ob die Antwort zur Aufgabe passt! Eine negative Anzahl von Aepfeln ergibt keinen Sinn.',
    ],
    example: {
      question: 'Lisa ist 3 Jahre aelter als Tom. Zusammen sind sie 25 Jahre alt. Wie alt sind sie?',
      steps: [
        'Toms Alter = x. Lisa ist 3 Jahre aelter → Lisas Alter = x + 3.',
        'Gleichung: x + (x + 3) = 25 → 2x + 3 = 25.',
        'Loesen: 2x = 22 → x = 11. Tom ist 11, Lisa ist 14.',
      ],
      answer: 'Tom ist 11 Jahre alt, Lisa ist 14 Jahre alt.',
    },
    tips: [
      'Schreibe zuerst auf, was x bedeutet! Dann kannst du den Rest der Aufgabe in Abhaengigkeit von x ausdruecken.',
    ],
    pitfalls: [
      'Lies die Aufgabe ZWEIMAL. Oft uebersieht man beim ersten Lesen eine wichtige Information (z.B. "jeder", "insgesamt", "doppelt so viel").',
    ],
  },

  'k7-volumen-real': {
    concepts: [
      'Prismen haben zwei gleiche Grundflaechen und eine bestimmte Hoehe. Volumen: V = Grundflaeche × Hoehe.',
      'Die Grundflaeche kann verschiedene Formen haben: Dreieck, Trapez, Fuenfeck usw. Berechne zuerst die Grundflaeche!',
      'Zusammengesetzte Koerper zerlegst du in einzelne einfache Koerper und addierst deren Volumen.',
    ],
    example: {
      question: 'Ein dreieckiges Prisma hat eine Grundflaeche mit g = 6 cm und h_Dreieck = 4 cm. Die Hoehe des Prismas ist 10 cm. Berechne V.',
      steps: [
        'Grundflaeche (Dreieck): A = (6 × 4) / 2 = 12 cm².',
        'Volumen: V = A × h_Prisma = 12 × 10.',
        'V = 120 cm³.',
      ],
      answer: 'Das Volumen des Prismas betraegt 120 cm³.',
    },
    tips: [
      'Merke dir den Grundsatz: Volumen = Grundflaeche × Hoehe. Das gilt fuer ALLE Prismen, egal welche Grundflaeche.',
    ],
    pitfalls: [
      'Verwechsle nicht die Hoehe des Dreiecks (in der Grundflaeche) mit der Hoehe des Prismas (die Tiefe des Koerpers)! Das sind zwei verschiedene Hoehen.',
    ],
  },

  'k7-zuordnungen-real': {
    concepts: [
      'In einer Wertetabelle stehen zusammengehoerige x- und y-Werte. Du erkennst den Zusammenhang, wenn du die Paare vergleichst.',
      'Im Graphen siehst du die Zuordnung als Bild: Proportional → Gerade durch (0|0). Antiproportional → Kurve.',
      'Aus der Tabelle kannst du eine Formel ableiten: Pruefe, ob y/x immer gleich ist (proportional) oder x × y immer gleich ist (antiproportional).',
    ],
    example: {
      question: 'Tabelle: x: 2, 4, 6, 8 und y: 12, 6, 4, 3. Welche Zuordnung liegt vor?',
      steps: [
        'Pruefe proportional: y/x = 12/2 = 6, y/x = 6/4 = 1,5 → nicht gleich → NICHT proportional.',
        'Pruefe antiproportional: x × y = 2 × 12 = 24, x × y = 4 × 6 = 24, x × y = 6 × 4 = 24, x × y = 8 × 3 = 24 → immer 24!',
        'Also: antiproportionale Zuordnung mit x × y = 24.',
      ],
      answer: 'Es liegt eine antiproportionale Zuordnung vor. Die Formel ist y = 24 / x.',
    },
    tips: [
      'Berechne fuer jedes Paar sowohl y/x als auch x × y. Wenn eines davon konstant ist, hast du den Typ gefunden.',
    ],
    pitfalls: [
      'Nicht jede Tabelle zeigt eine proportionale oder antiproportionale Zuordnung! Manchmal ist der Zusammenhang ganz anders (z.B. linear mit y-Achsenabschnitt).',
    ],
  },

  'k7-grundrechenarten-festigen': {
    concepts: [
      'Punkt vor Strich: Multiplikation und Division werden IMMER vor Addition und Subtraktion ausgefuehrt.',
      'Klammern zuerst: Alles in Klammern wird als Erstes berechnet, dann Punkt vor Strich.',
      'Reihenfolge insgesamt: 1. Klammern, 2. Potenzen, 3. Punkt (× und ÷), 4. Strich (+ und −). Von links nach rechts.',
    ],
    example: {
      question: 'Berechne: 12 + 4 × (8 − 3) = ?',
      steps: [
        'Klammer zuerst: 8 − 3 = 5.',
        'Dann Punkt: 4 × 5 = 20.',
        'Dann Strich: 12 + 20 = 32.',
      ],
      answer: '12 + 4 × (8 − 3) = 32',
    },
    tips: [
      'Wenn du unsicher bist, setze eigene Klammern: Markiere, was zuerst gerechnet werden muss. Das hilft enorm!',
    ],
    pitfalls: [
      'NICHT einfach von links nach rechts rechnen! 2 + 3 × 4 = 14 (nicht 20). Die Multiplikation kommt zuerst.',
    ],
  },

  'k7-masstab': {
    concepts: [
      'Der Massstab gibt das Verhaeltnis zwischen Zeichnung und Wirklichkeit an. 1 : 100 bedeutet: 1 cm auf der Karte = 100 cm (= 1 m) in echt.',
      'Wirkliche Groesse berechnen: Strecke auf der Karte × Massstab. Beispiel: 3 cm auf der Karte bei 1 : 50.000 = 3 × 50.000 cm = 150.000 cm = 1,5 km.',
      'Kartengroesse berechnen: Wirkliche Groesse ÷ Massstab.',
    ],
    example: {
      question: 'Auf einer Karte im Massstab 1 : 25.000 misst du 4 cm. Wie weit ist die Strecke in Wirklichkeit?',
      steps: [
        'Wirkliche Laenge = Kartenlaenge × Massstab.',
        '4 cm × 25.000 = 100.000 cm.',
        'Umrechnen: 100.000 cm = 1.000 m = 1 km.',
      ],
      answer: 'Die Strecke ist in Wirklichkeit 1 km lang.',
    },
    tips: [
      'Merke dir die Umrechnung: 100 cm = 1 m, 1.000 m = 1 km. Also 100.000 cm = 1 km.',
    ],
    pitfalls: [
      'Beim Massstab die Richtung nicht verwechseln! Um von der Karte zur Realitaet zu kommen, multiplizierst du. Um von der Realitaet zur Karte zu kommen, dividierst du.',
    ],
  },

  'k7-sachaufgaben-geld': {
    concepts: [
      'Bei Geldaufgaben rechnest du immer in Euro und Cent. 1 € = 100 Cent. Schreibe Betraege mit zwei Nachkommastellen: 3,50 €.',
      'Rabatt abziehen: Neuer Preis = Alter Preis − Rabattbetrag. Oder direkt: Neuer Preis = Alter Preis × (100 − Rabatt%) / 100.',
      'Rueckgeld berechnen: Rueckgeld = Bezahlter Betrag − Gesamtpreis.',
    ],
    example: {
      question: 'Du kaufst 3 Hefte zu je 1,80 € und 2 Stifte zu je 2,50 €. Du bezahlst mit einem 20-€-Schein. Wie viel Rueckgeld bekommst du?',
      steps: [
        'Hefte: 3 × 1,80 € = 5,40 €.',
        'Stifte: 2 × 2,50 € = 5,00 €.',
        'Gesamt: 5,40 € + 5,00 € = 10,40 €. Rueckgeld: 20,00 € − 10,40 € = 9,60 €.',
      ],
      answer: 'Du bekommst 9,60 € Rueckgeld.',
    },
    tips: [
      'Rechne immer in der gleichen Einheit! Am besten alles in Euro (mit Komma), nicht manche in Cent und manche in Euro.',
    ],
    pitfalls: [
      'Vergiss nicht, den Preis pro Stueck mit der Anzahl zu multiplizieren! 3 Hefte zu 1,80 € sind 5,40 €, NICHT 1,80 €.',
    ],
  },

  'k7-geometrie-grundlagen': {
    concepts: [
      'Parallele Geraden haben ueberall den gleichen Abstand und schneiden sich nie. Zeichen: g ∥ h.',
      'Senkrechte Geraden (Lot) stehen im rechten Winkel (90°) zueinander. Zeichen: g ⊥ h.',
      'Stufenwinkel (an parallelen Geraden mit Querlinie) sind gleich gross. Wechselwinkel sind ebenfalls gleich gross.',
    ],
    example: {
      question: 'Zwei parallele Geraden werden von einer Querlinie geschnitten. Ein Winkel betraegt 65°. Wie gross ist der Stufenwinkel?',
      steps: [
        'Stufenwinkel liegen an parallelen Geraden auf der gleichen Seite der Querlinie.',
        'Stufenwinkel an parallelen Geraden sind immer gleich gross.',
        'Also ist der Stufenwinkel ebenfalls 65°.',
      ],
      answer: 'Der Stufenwinkel betraegt 65°.',
    },
    tips: [
      'Zeichne dir die Situation auf! Parallele Geraden mit einer Querlinie (Transversale) — dann kannst du die Winkelpaare direkt sehen.',
    ],
    pitfalls: [
      'Stufen- und Wechselwinkel gelten NUR bei parallelen Geraden! Wenn die Geraden nicht parallel sind, sind die Winkel verschieden.',
    ],
  },
};
