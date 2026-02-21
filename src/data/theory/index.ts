import type { TheoryBlock } from './types';

export const THEORY_CONTENT: Record<string, TheoryBlock> = {
  // ═══════════════════════════════════════════════════════════════
  // KLASSE 1
  // ═══════════════════════════════════════════════════════════════

  'k1-addition-bis-10': {
    concepts: [
      'Addition bedeutet "zusammenzählen". Das Zeichen dafür ist das Plus (+).',
      'Das Ergebnis einer Addition nennt man "Summe".',
      'Du kannst mit den Fingern zählen: Halte die erste Zahl hoch, zähle die zweite dazu.',
    ],
    example: {
      question: '3 + 5 = ?',
      steps: [
        'Halte 3 Finger hoch.',
        'Zähle 5 weitere Finger dazu: 4, 5, 6, 7, 8.',
        'Du hast jetzt 8 Finger oben.',
      ],
      answer: '3 + 5 = 8',
    },
    tips: [
      'Zähle immer von der größeren Zahl weiter — das geht schneller! Bei 2 + 7 startest du bei 7 und zählst 2 dazu.',
    ],
    pitfalls: [
      'Vergiss nicht: 0 + eine Zahl ergibt immer die Zahl selbst. Zum Beispiel: 0 + 6 = 6.',
    ],
  },

  'k1-subtraktion-bis-10': {
    concepts: [
      'Subtraktion bedeutet "wegnehmen" oder "abziehen". Das Zeichen ist das Minus (−).',
      'Das Ergebnis einer Subtraktion nennt man "Differenz".',
      'Stelle dir vor, du hast Äpfel und gibst welche ab. Wie viele bleiben übrig?',
    ],
    example: {
      question: '8 − 3 = ?',
      steps: [
        'Du hast 8 Äpfel.',
        'Du gibst 3 Äpfel weg.',
        'Zähle rückwärts von 8: 7, 6, 5.',
        'Es bleiben 5 Äpfel übrig.',
      ],
      answer: '8 − 3 = 5',
    },
    tips: [
      'Zähle von der kleineren Zahl zur größeren hoch — das ist oft einfacher als rückwärts zählen.',
    ],
    pitfalls: [
      'Pass auf die Reihenfolge auf! 8 − 3 ist nicht das Gleiche wie 3 − 8. Bei Subtraktion ist die Reihenfolge wichtig.',
    ],
  },

  'k1-zahlen-bis-20': {
    concepts: [
      'Die Zahlen von 1 bis 20 kannst du lesen, schreiben und der Größe nach ordnen.',
      'Ab 10 haben wir einen "Zehner". 13 bedeutet: 1 Zehner und 3 Einer.',
      'Mit den Zeichen > (größer) und < (kleiner) kannst du Zahlen vergleichen.',
    ],
    example: {
      question: 'Ordne die Zahlen: 15, 8, 12',
      steps: [
        'Finde die kleinste Zahl: 8.',
        'Dann kommt 12.',
        'Die größte Zahl ist 15.',
      ],
      answer: '8 < 12 < 15',
    },
    tips: [
      'Das Zeichen < sieht aus wie ein Schnabel. Der Schnabel zeigt immer zur größeren Zahl: 3 < 7 (der Schnabel zeigt zur 7).',
    ],
    pitfalls: [
      'Verwechsle nicht die Zehner-Zahlen: 12 (zwölf) hat einen Zehner und 2 Einer, nicht 1 Einer und 2 Zehner.',
    ],
  },

  'k1-verdoppeln-halbieren': {
    concepts: [
      'Verdoppeln heißt: Du nimmst die gleiche Zahl nochmal dazu. Das Doppelte von 4 ist 4 + 4 = 8.',
      'Halbieren heißt: Du teilst gerecht in zwei gleiche Teile. Die Hälfte von 8 ist 4.',
      'Verdoppeln und Halbieren sind Umkehraufgaben — sie gehören zusammen!',
    ],
    example: {
      question: 'Was ist das Doppelte von 6?',
      steps: [
        'Verdoppeln bedeutet: 6 + 6.',
        'Zähle: 6 + 6 = 12.',
        'Das Doppelte von 6 ist 12.',
      ],
      answer: 'Das Doppelte von 6 ist 12.',
    },
    tips: [
      'Merke dir die Verdopplungen als Päärchen: 1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10.',
    ],
    pitfalls: [
      'Halbieren geht nur glatt bei geraden Zahlen! Die Hälfte von 7 ist keine ganze Zahl.',
    ],
  },

  'k1-geometrische-formen': {
    concepts: [
      'Ein Kreis ist rund und hat keine Ecken.',
      'Ein Dreieck hat 3 Ecken und 3 Seiten.',
      'Ein Rechteck hat 4 Ecken und 4 Seiten — die gegenüberliegenden Seiten sind gleich lang. Ein Quadrat ist ein besonderes Rechteck, bei dem alle 4 Seiten gleich lang sind.',
    ],
    example: {
      question: 'Wie viele Ecken hat ein Dreieck?',
      steps: [
        'Schau dir die Form an: Ein Dreieck hat drei Spitzen.',
        'Jede Spitze ist eine Ecke.',
        'Zähle: 1, 2, 3 Ecken.',
      ],
      answer: 'Ein Dreieck hat 3 Ecken.',
    },
    tips: [
      'Der Name verrät dir die Eckenanzahl: "Drei"-eck = 3 Ecken, "Vier"-eck = 4 Ecken.',
    ],
    pitfalls: [
      'Ein Quadrat ist auch ein Rechteck — nur mit gleich langen Seiten. Verwechsle das nicht!',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 2
  // ═══════════════════════════════════════════════════════════════

  'k2-einmaleins': {
    concepts: [
      'Das Einmaleins ist Multiplikation: Mal-Nehmen bedeutet "mehrmals die gleiche Zahl addieren". 3 × 4 = 4 + 4 + 4 = 12.',
      'Das kleine Einmaleins geht von 1×1 bis 10×10.',
      'Jede Einmaleins-Aufgabe hat eine Tauschaufgabe: 3 × 4 = 4 × 3. Das Ergebnis bleibt gleich!',
    ],
    example: {
      question: '6 × 7 = ?',
      steps: [
        '6 × 7 bedeutet: 7 wird 6 Mal genommen.',
        'Du kannst die 5er-Reihe nutzen: 5 × 7 = 35.',
        'Dann addierst du noch einmal 7 dazu: 35 + 7 = 42.',
      ],
      answer: '6 × 7 = 42',
    },
    tips: [
      'Lerne zuerst die einfachen Reihen: 1er, 2er, 5er und 10er. Die anderen kannst du daraus ableiten.',
      'Die 9er-Reihe hat einen Trick: Die Quersumme ist immer 9 (z.B. 9×3=27, 2+7=9).',
    ],
    pitfalls: [
      'Verwechsle nicht 6 × 7 und 6 + 7! Mal (×) und Plus (+) sind verschiedene Rechenarten.',
    ],
  },

  'k2-addition-subtraktion-bis-100': {
    concepts: [
      'Im Zahlenraum bis 100 rechnest du mit Zehnern und Einern.',
      'Beim Kopfrechnen hilft es, zuerst die Zehner und dann die Einer zu addieren: 34 + 23 → 30 + 20 = 50, dann 4 + 3 = 7, also 57.',
      'Bei der Subtraktion gehst du genauso vor: Erst Zehner, dann Einer abziehen.',
    ],
    example: {
      question: '47 + 35 = ?',
      steps: [
        'Zuerst die Zehner addieren: 40 + 30 = 70.',
        'Dann die Einer addieren: 7 + 5 = 12.',
        'Jetzt zusammenzählen: 70 + 12 = 82.',
      ],
      answer: '47 + 35 = 82',
    },
    tips: [
      'Rechne schrittweise: Erst die glatten Zehner, dann den Rest. So machst du weniger Fehler.',
    ],
    pitfalls: [
      'Wenn die Einer zusammen mehr als 10 ergeben (z.B. 7 + 5 = 12), vergiss nicht den neuen Zehner!',
    ],
  },

  'k2-uhrzeiten': {
    concepts: [
      'Die Uhr hat einen kleinen Zeiger (Stundenzeiger) und einen großen Zeiger (Minutenzeiger).',
      'Der kleine Zeiger zeigt die Stunde an. Der große Zeiger zeigt die Minuten an.',
      'Eine Stunde hat 60 Minuten. Wenn der große Zeiger auf der 6 steht, ist es "halb".',
    ],
    example: {
      question: 'Der kleine Zeiger steht auf 3, der große auf 12. Wie spät ist es?',
      steps: [
        'Der kleine Zeiger zeigt auf die 3 → es ist 3 Uhr.',
        'Der große Zeiger zeigt auf die 12 → es sind genau 0 Minuten.',
        'Es ist also eine volle Stunde.',
      ],
      answer: 'Es ist 3:00 Uhr (drei Uhr).',
    },
    tips: [
      'Der große Zeiger auf der 12 = volle Stunde. Auf der 6 = halbe Stunde.',
    ],
    pitfalls: [
      'Verwechsle nicht den großen und den kleinen Zeiger! Der kleine zeigt die Stunde, der große die Minuten.',
    ],
  },

  'k2-laengen': {
    concepts: [
      'Wir messen Längen in Zentimeter (cm) und Meter (m).',
      '1 Meter = 100 Zentimeter. Ein Lineal ist meistens 30 cm lang.',
      'Zum Messen legst du das Lineal an die Null an und liest am Ende der Strecke ab.',
    ],
    example: {
      question: 'Ein Stift ist 15 cm lang. Wie viel ist das in Metern?',
      steps: [
        '1 Meter = 100 Zentimeter.',
        '15 cm sind weniger als 1 Meter.',
        '15 cm = 0,15 m (15 Hundertstel Meter).',
      ],
      answer: '15 cm = 0,15 m',
    },
    tips: [
      'Merke: Dein kleiner Finger ist ungefähr 1 cm breit. Von der Nase bis zur Fingerspitze (Arm gestreckt) ist ungefähr 1 m.',
    ],
    pitfalls: [
      'Beim Messen immer an der 0 anfangen, nicht am Rand des Lineals!',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 3
  // ═══════════════════════════════════════════════════════════════

  'k3-schriftliche-addition': {
    concepts: [
      'Bei der schriftlichen Addition schreibst du die Zahlen untereinander — Einer unter Einer, Zehner unter Zehner.',
      'Du rechnest von rechts nach links: erst die Einer, dann die Zehner, dann die Hunderter.',
      'Wenn eine Spalte mehr als 9 ergibt, schreibst du den Einer auf und merkst dir den Zehner als "Übertrag".',
    ],
    example: {
      question: '347 + 285 = ?',
      steps: [
        'Einer: 7 + 5 = 12. Schreibe 2 hin, merke 1.',
        'Zehner: 4 + 8 = 12, plus 1 (Übertrag) = 13. Schreibe 3 hin, merke 1.',
        'Hunderter: 3 + 2 = 5, plus 1 (Übertrag) = 6. Schreibe 6 hin.',
      ],
      answer: '347 + 285 = 632',
    },
    tips: [
      'Schreibe den Übertrag klein über die nächste Spalte, damit du ihn nicht vergisst.',
    ],
    pitfalls: [
      'Achte darauf, dass die Stellenwerte genau untereinander stehen! Sonst rechnest du Einer mit Zehnern zusammen.',
    ],
  },

  'k3-schriftliche-subtraktion': {
    concepts: [
      'Bei der schriftlichen Subtraktion stehen die Zahlen untereinander. Die größere Zahl steht oben.',
      'Du rechnest wieder von rechts nach links: Einer, Zehner, Hunderter.',
      'Wenn oben die Ziffer kleiner ist als unten, musst du "entbündeln": Leihe dir einen Zehner von der nächsten Stelle.',
    ],
    example: {
      question: '523 − 168 = ?',
      steps: [
        'Einer: 3 − 8 geht nicht. Leihe 1 Zehner → 13 − 8 = 5.',
        'Zehner: 1 (statt 2, weil ausgeliehen) − 6 geht nicht. Leihe 1 Hunderter → 11 − 6 = 5.',
        'Hunderter: 4 (statt 5, weil ausgeliehen) − 1 = 3.',
      ],
      answer: '523 − 168 = 355',
    },
    tips: [
      'Mache die Gegenprobe: 355 + 168 muss wieder 523 ergeben!',
    ],
    pitfalls: [
      'Beim Entbündeln vergessen, dass die nächste Stelle um 1 kleiner wird — das ist der häufigste Fehler.',
    ],
  },

  'k3-einmaleins-vertiefen': {
    concepts: [
      'Das kleine Einmaleins musst du auswendig können — so schnell, dass du nicht mehr nachdenken musst.',
      'Division ist die Umkehrung der Multiplikation: Wenn 7 × 8 = 56, dann ist 56 ÷ 8 = 7.',
      'Teilen heißt: "Wie oft passt die Zahl hinein?" 56 ÷ 8 bedeutet: Wie oft passt 8 in 56?',
    ],
    example: {
      question: '72 ÷ 9 = ?',
      steps: [
        'Frage dich: Welche Zahl mal 9 ergibt 72?',
        'Gehe die 9er-Reihe durch: 9, 18, 27, 36, 45, 54, 63, 72.',
        '9 × 8 = 72, also ist 72 ÷ 9 = 8.',
      ],
      answer: '72 ÷ 9 = 8',
    },
    tips: [
      'Übe jeden Tag ein paar Minuten! Schreibe Aufgaben auf Karteikarten und teste dich selbst.',
    ],
    pitfalls: [
      'Verwechsle nicht Division und Subtraktion. 24 ÷ 6 = 4 (nicht 24 − 6 = 18).',
    ],
  },

  'k3-gewichte': {
    concepts: [
      'Gewicht messen wir in Gramm (g) und Kilogramm (kg).',
      '1 Kilogramm = 1000 Gramm. "Kilo" bedeutet "tausend".',
      'Leichte Dinge wiegen wenige Gramm (eine Feder ≈ 1 g), schwere Dinge wiegen viele Kilogramm (ein Kind ≈ 30 kg).',
    ],
    example: {
      question: 'Ein Apfel wiegt 200 g. Wie viel wiegen 5 Äpfel?',
      steps: [
        '5 Äpfel × 200 g = 1000 g.',
        '1000 g = 1 kg.',
        '5 Äpfel wiegen zusammen 1 kg.',
      ],
      answer: '5 Äpfel wiegen 1000 g = 1 kg.',
    },
    tips: [
      'Merke dir Vergleiche: Ein Liter Wasser wiegt genau 1 kg. Eine Tafel Schokolade wiegt 100 g.',
    ],
    pitfalls: [
      'Pass auf die Einheiten auf! Wenn in der Aufgabe kg und g gemischt werden, rechne erst alles in die gleiche Einheit um.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 4
  // ═══════════════════════════════════════════════════════════════

  'k4-schriftliche-multiplikation': {
    concepts: [
      'Bei der schriftlichen Multiplikation multiplizierst du eine große Zahl stellenweise mit einem Faktor.',
      'Du rechnest von rechts nach links und merkst dir den Übertrag.',
      'Bei einem zweistelligen Faktor rechnest du mit jedem Stellenwert einzeln und addierst die Teilergebnisse (Teilprodukte).',
    ],
    example: {
      question: '234 × 6 = ?',
      steps: [
        'Einer: 4 × 6 = 24. Schreibe 4, merke 2.',
        'Zehner: 3 × 6 = 18, plus 2 (Übertrag) = 20. Schreibe 0, merke 2.',
        'Hunderter: 2 × 6 = 12, plus 2 (Übertrag) = 14. Schreibe 14 hin.',
      ],
      answer: '234 × 6 = 1404',
    },
    tips: [
      'Überschlage vorher das Ergebnis: 234 × 6 ≈ 200 × 6 = 1200. Dein Ergebnis sollte in der Nähe liegen.',
    ],
    pitfalls: [
      'Vergiss den Übertrag nicht! Er muss zur nächsten Stelle addiert werden.',
    ],
  },

  'k4-schriftliche-division': {
    concepts: [
      'Bei der schriftlichen Division teilst du eine große Zahl schrittweise durch den Divisor.',
      'Du arbeitest von links nach rechts: Nimm so viele Stellen, bis die Zahl größer oder gleich dem Divisor ist.',
      'Wenn bei einer Stelle ein Rest bleibt, ziehst du die nächste Ziffer herunter.',
    ],
    example: {
      question: '846 ÷ 3 = ?',
      steps: [
        '8 ÷ 3 = 2 (Rest 2). Schreibe 2 auf. Rest: 8 − 6 = 2.',
        'Ziehe die 4 herunter → 24. 24 ÷ 3 = 8. Schreibe 8 auf.',
        'Ziehe die 6 herunter → 6. 6 ÷ 3 = 2. Schreibe 2 auf. Rest: 0.',
      ],
      answer: '846 ÷ 3 = 282',
    },
    tips: [
      'Mache die Gegenprobe: 282 × 3 muss 846 ergeben!',
    ],
    pitfalls: [
      'Vergiss nicht die Null im Ergebnis! Wenn nach dem Herunterziehen die Zahl kleiner ist als der Divisor, schreibe 0 hin.',
    ],
  },

  'k4-brueche-als-anteil': {
    concepts: [
      'Ein Bruch beschreibt einen Teil eines Ganzen. Wenn du eine Pizza in 4 gleiche Stücke teilst und 1 nimmst, hast du 1/4 (ein Viertel).',
      'Oben steht der Zähler (wie viele Teile du hast), unten steht der Nenner (in wie viele Teile das Ganze geteilt ist).',
      'Je größer der Nenner, desto kleiner die Teile: 1/8 ist kleiner als 1/4.',
    ],
    example: {
      question: 'Eine Tafel Schokolade hat 12 Stücke. Du isst 3 Stücke. Welcher Bruch?',
      steps: [
        'Das Ganze: 12 Stücke → der Nenner ist 12.',
        'Dein Anteil: 3 Stücke → der Zähler ist 3.',
        'Der Bruch ist 3/12. Das kann man kürzen: 3/12 = 1/4.',
      ],
      answer: 'Du hast 3/12 = 1/4 (ein Viertel) gegessen.',
    },
    tips: [
      'Zum Kürzen teilst du Zähler und Nenner durch die gleiche Zahl: 3/12 → beide durch 3 → 1/4.',
    ],
    pitfalls: [
      'Der Nenner darf nie 0 sein! Durch 0 teilen geht nicht.',
    ],
  },

  'k4-flaeche-und-umfang': {
    concepts: [
      'Der Umfang ist die Länge um eine Figur herum — wie ein Zaun um ein Feld.',
      'Die Fläche ist der Platz innerhalb der Figur — wie der Rasen im Feld.',
      'Rechteck: Umfang = 2 × Länge + 2 × Breite. Fläche = Länge × Breite.',
    ],
    example: {
      question: 'Ein Rechteck ist 6 cm lang und 4 cm breit. Berechne Umfang und Fläche.',
      steps: [
        'Umfang = 2 × 6 cm + 2 × 4 cm = 12 cm + 8 cm = 20 cm.',
        'Fläche = 6 cm × 4 cm = 24 cm².',
        'Die Einheit der Fläche ist cm² (Quadratzentimeter).',
      ],
      answer: 'Umfang = 20 cm, Fläche = 24 cm².',
    },
    tips: [
      'Beim Quadrat sind alle Seiten gleich: Umfang = 4 × Seitenlänge, Fläche = Seitenlänge × Seitenlänge.',
    ],
    pitfalls: [
      'Verwechsle nicht Umfang (cm) und Fläche (cm²)! Der Umfang ist eine Länge, die Fläche ein Flächenmaß.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 5
  // ═══════════════════════════════════════════════════════════════

  'k5-dezimalzahlen': {
    concepts: [
      'Dezimalzahlen sind Zahlen mit einem Komma. Die Stellen nach dem Komma sind Zehntel, Hundertstel und Tausendstel.',
      'Beispiel: 3,25 bedeutet 3 Ganze, 2 Zehntel und 5 Hundertstel.',
      'Dezimalzahlen vergleichst du Stelle für Stelle von links: 3,7 > 3,65, weil 7 Zehntel mehr sind als 6 Zehntel.',
    ],
    example: {
      question: 'Runde 4,367 auf eine Nachkommastelle.',
      steps: [
        'Schau auf die zweite Nachkommastelle: 6.',
        '6 ist größer oder gleich 5, also wird aufgerundet.',
        'Die erste Nachkommastelle (3) wird um 1 erhöht: 4,4.',
      ],
      answer: '4,367 ≈ 4,4',
    },
    tips: [
      'Stelle dir Dezimalzahlen wie Geld vor: 3,25 € = 3 Euro und 25 Cent.',
    ],
    pitfalls: [
      '0,5 ist größer als 0,45! Nicht die Anzahl der Nachkommastellen vergleichen, sondern den Wert.',
    ],
  },

  'k5-brueche-einfuehrung': {
    concepts: [
      'Ein Bruch besteht aus Zähler (oben) und Nenner (unten), getrennt durch einen Bruchstrich.',
      'Gleichnamige Brüche haben den gleichen Nenner und können direkt addiert werden: 2/7 + 3/7 = 5/7.',
      'Kürzen: Teile Zähler und Nenner durch den gleichen Wert, z.B. 6/8 = 3/4 (beide durch 2).',
      'Erweitern: Multipliziere Zähler und Nenner mit dem gleichen Wert, z.B. 2/3 = 4/6 (beide mal 2).',
    ],
    example: {
      question: 'Kürze den Bruch 12/18.',
      steps: [
        'Finde den größten gemeinsamen Teiler (ggT) von 12 und 18.',
        'ggT(12, 18) = 6.',
        'Teile Zähler und Nenner durch 6: 12 ÷ 6 = 2, 18 ÷ 6 = 3.',
      ],
      answer: '12/18 = 2/3',
    },
    tips: [
      'Zum Kürzen probiere die Teiler der Reihe nach: durch 2, durch 3, durch 5 ... bis nichts mehr geht.',
    ],
    pitfalls: [
      'Beim Kürzen immer Zähler UND Nenner durch die gleiche Zahl teilen. Nur den Zähler oder nur den Nenner zu kürzen verändert den Wert!',
    ],
  },

  'k5-koordinatensystem': {
    concepts: [
      'Ein Koordinatensystem hat zwei Achsen: die x-Achse (waagerecht) und die y-Achse (senkrecht).',
      'Jeder Punkt hat zwei Koordinaten: P(x|y). Die x-Koordinate kommt zuerst, die y-Koordinate danach.',
      'Der Schnittpunkt beider Achsen heißt Ursprung und hat die Koordinaten O(0|0).',
    ],
    example: {
      question: 'Zeichne den Punkt P(3|5) ein.',
      steps: [
        'Gehe auf der x-Achse 3 Einheiten nach rechts.',
        'Gehe von dort 5 Einheiten nach oben.',
        'Setze dort den Punkt und beschrifte ihn mit P(3|5).',
      ],
      answer: 'P liegt bei x = 3 und y = 5.',
    },
    tips: [
      'Merke dir die Reihenfolge: "Erst in den Flur (x, waagerecht), dann in den Fahrstuhl (y, senkrecht)."',
    ],
    pitfalls: [
      'Verwechsle nicht x und y! P(3|5) ist ein anderer Punkt als P(5|3).',
    ],
  },

  'k5-terme-variablen': {
    concepts: [
      'Ein Term ist ein Rechenausdruck mit Zahlen, Variablen und Rechenzeichen, z.B. 3x + 5.',
      'Variablen sind Platzhalter für Zahlen. Meist nutzen wir Buchstaben wie x, y oder a.',
      'Den Wert eines Terms berechnet man, indem man für die Variable eine Zahl einsetzt.',
    ],
    example: {
      question: 'Berechne den Term 2x + 3 für x = 4.',
      steps: [
        'Setze 4 für x ein: 2 · 4 + 3.',
        'Rechne Punkt vor Strich: 2 · 4 = 8.',
        'Dann Plus: 8 + 3 = 11.',
      ],
      answer: 'Für x = 4 ist 2x + 3 = 11.',
    },
    tips: [
      'Wenn kein Rechenzeichen zwischen Zahl und Variable steht, wird multipliziert: 3x bedeutet 3 · x.',
    ],
    pitfalls: [
      'Vergiss nicht "Punkt vor Strich"! In 2 + 3 · x wird zuerst multipliziert, dann addiert.',
    ],
  },

  'k5-winkel': {
    concepts: [
      'Ein Winkel entsteht, wenn sich zwei Strahlen an einem Punkt treffen. Gemessen wird er in Grad (°).',
      'Winkelarten: spitzer Winkel (< 90°), rechter Winkel (= 90°), stumpfer Winkel (> 90° und < 180°), gestreckter Winkel (= 180°).',
      'Zum Messen benutzt du ein Geodreieck. Die Mitte liegt auf dem Scheitelpunkt des Winkels.',
    ],
    example: {
      question: 'Miss den Winkel und bestimme die Winkelart: 135°.',
      steps: [
        'Lege das Geodreieck an: Mitte auf den Scheitelpunkt, Grundlinie auf einen Schenkel.',
        'Lies den Winkel am anderen Schenkel ab: 135°.',
        '135° ist größer als 90° und kleiner als 180° → stumpfer Winkel.',
      ],
      answer: '135° ist ein stumpfer Winkel.',
    },
    tips: [
      'Der rechte Winkel (90°) ist leicht zu erkennen — er sieht aus wie die Ecke eines Blattes Papier.',
    ],
    pitfalls: [
      'Beim Geodreieck gibt es zwei Skalen! Achte darauf, dass du von 0° am richtigen Schenkel beginnst.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 6
  // ═══════════════════════════════════════════════════════════════

  'k6-bruchrechnung': {
    concepts: [
      'Zum Addieren und Subtrahieren brauchst du gleichnamige Brüche (gleicher Nenner). Finde das kgV der Nenner.',
      'Multiplikation: Zähler mal Zähler, Nenner mal Nenner. Beispiel: 2/3 × 4/5 = 8/15.',
      'Division: Mit dem Kehrwert multiplizieren. Beispiel: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.',
      'Gemischte Zahlen (z.B. 2 1/3) kannst du in unechte Brüche umwandeln: 2 1/3 = 7/3.',
    ],
    example: {
      question: '2/3 + 3/4 = ?',
      steps: [
        'Finde den Hauptnenner: kgV(3, 4) = 12.',
        'Erweitere: 2/3 = 8/12 und 3/4 = 9/12.',
        'Addiere die Zähler: 8/12 + 9/12 = 17/12.',
        'Wandle um: 17/12 = 1 5/12.',
      ],
      answer: '2/3 + 3/4 = 17/12 = 1 5/12',
    },
    tips: [
      'Kürze immer am Ende! Prüfe, ob Zähler und Nenner einen gemeinsamen Teiler haben.',
    ],
    pitfalls: [
      'Bei Addition/Subtraktion NICHT die Nenner addieren! 1/3 + 1/4 ist NICHT 2/7.',
    ],
  },

  'k6-negative-zahlen': {
    concepts: [
      'Negative Zahlen liegen links von der Null auf dem Zahlenstrahl. Sie haben ein Minuszeichen davor: −3, −7, −12.',
      'Je weiter links auf dem Zahlenstrahl, desto kleiner die Zahl: −5 < −2 < 0 < 3.',
      'Addition einer negativen Zahl ist wie Subtraktion: 5 + (−3) = 5 − 3 = 2.',
      'Zwei Minuszeichen ergeben ein Plus: 5 − (−3) = 5 + 3 = 8.',
    ],
    example: {
      question: '(−4) + 7 = ?',
      steps: [
        'Starte bei −4 auf dem Zahlenstrahl.',
        'Gehe 7 Schritte nach rechts (weil +7).',
        '−4 + 7 = 3.',
      ],
      answer: '(−4) + 7 = 3',
    },
    tips: [
      'Denke an ein Thermometer: −5°C ist kälter als +3°C. Wenn es 7 Grad wärmer wird: −5 + 7 = +2°C.',
    ],
    pitfalls: [
      'Minus mal Minus ergibt Plus: (−3) × (−2) = +6. Minus mal Plus ergibt Minus: (−3) × 2 = −6.',
    ],
  },

  'k6-proportionale-zuordnungen': {
    concepts: [
      'Bei einer proportionalen Zuordnung verdoppelt sich der eine Wert, wenn sich der andere verdoppelt.',
      'Das Verhältnis bleibt immer gleich: Wenn 3 Brötchen 1,50 € kosten, kosten 6 Brötchen 3,00 €.',
      'Der Quotient (y ÷ x) ist immer konstant. Diesen Wert nennt man den "Proportionalitätsfaktor".',
    ],
    example: {
      question: '4 Hefte kosten 6 €. Was kosten 10 Hefte?',
      steps: [
        'Berechne den Preis für 1 Heft: 6 € ÷ 4 = 1,50 €.',
        'Multipliziere mit der gewünschten Menge: 1,50 € × 10 = 15 €.',
        '(Oder: Faktor von 4 auf 10 ist 2,5. Also 6 € × 2,5 = 15 €.)',
      ],
      answer: '10 Hefte kosten 15 €.',
    },
    tips: [
      'Dreisatz-Methode: Immer zuerst auf 1 rechnen (÷), dann auf die gesuchte Menge (×).',
    ],
    pitfalls: [
      'Proportional ist nicht dasselbe wie antiproportional! Bei antiproportionalen Zuordnungen wird der eine Wert kleiner, wenn der andere größer wird (z.B. mehr Arbeiter → weniger Zeit).',
    ],
  },

  'k6-gleichungen-einfuehrung': {
    concepts: [
      'Eine Gleichung hat ein Gleichheitszeichen (=) und eine unbekannte Variable (meist x).',
      'Ziel: Die Variable allein auf eine Seite bringen. Dafür nutzt du Umkehroperationen.',
      'Was du auf der einen Seite machst, musst du auch auf der anderen Seite machen — die Waage muss im Gleichgewicht bleiben!',
    ],
    example: {
      question: 'Löse: 3x + 5 = 20',
      steps: [
        'Ziehe 5 auf beiden Seiten ab: 3x + 5 − 5 = 20 − 5 → 3x = 15.',
        'Teile beide Seiten durch 3: 3x ÷ 3 = 15 ÷ 3 → x = 5.',
        'Probe: 3 · 5 + 5 = 15 + 5 = 20. ✓',
      ],
      answer: 'x = 5',
    },
    tips: [
      'Mache IMMER eine Probe! Setze dein Ergebnis in die ursprüngliche Gleichung ein.',
    ],
    pitfalls: [
      'Vergiss nicht, die Umkehroperation auf BEIDEN Seiten durchzuführen! Nur links oder nur rechts ändern macht die Gleichung falsch.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 7
  // ═══════════════════════════════════════════════════════════════

  'k7-prozentrechnung-gym': {
    concepts: [
      'Prozent bedeutet "von Hundert". 25 % = 25/100 = 0,25.',
      'Die drei Grundgrößen: Grundwert (G) = das Ganze, Prozentwert (W) = der Anteil, Prozentsatz (p) = der Anteil in Prozent.',
      'Formeln: W = G × p/100, G = W × 100/p, p = W/G × 100.',
    ],
    example: {
      question: 'Ein Fahrrad kostet 400 €. Du bekommst 15 % Rabatt. Wie viel sparst du?',
      steps: [
        'Grundwert G = 400 €, Prozentsatz p = 15 %.',
        'Prozentwert W = G × p/100 = 400 × 15/100.',
        'W = 400 × 0,15 = 60 €.',
      ],
      answer: 'Du sparst 60 €. Das Fahrrad kostet dann 340 €.',
    },
    tips: [
      'Schnelle Abkürzungen: 50 % = Hälfte, 25 % = Viertel, 10 % = durch 10, 1 % = durch 100.',
    ],
    pitfalls: [
      'Aufpassen bei "um ... % erhöht": 100 € + 20 % = 120 € (nicht 100 × 20 = 2000). Der Prozentsatz bezieht sich immer auf den Grundwert!',
    ],
  },

  'k7-lineare-gleichungen': {
    concepts: [
      'Eine lineare Gleichung enthält die Variable x nur in der 1. Potenz (kein x², kein x³).',
      'Lösung durch Äquivalenzumformungen: Terme zusammenfassen, Klammern auflösen, x isolieren.',
      'Gleichungen mit x auf beiden Seiten: Bringe alle x-Terme auf eine Seite und alle Zahlen auf die andere.',
    ],
    example: {
      question: 'Löse: 5x − 3 = 2x + 9',
      steps: [
        'Bringe x auf eine Seite: 5x − 2x − 3 = 9 → 3x − 3 = 9.',
        'Addiere 3: 3x = 12.',
        'Teile durch 3: x = 4.',
        'Probe: 5·4 − 3 = 17 und 2·4 + 9 = 17. ✓',
      ],
      answer: 'x = 4',
    },
    tips: [
      'Löse Klammern zuerst auf! z.B. 3(x + 2) = 3x + 6.',
    ],
    pitfalls: [
      'Beim Auflösen von Minus-Klammern alle Vorzeichen ändern: −(2x − 5) = −2x + 5, NICHT −2x − 5.',
    ],
  },

  'k7-dreisatz': {
    concepts: [
      'Der Dreisatz ist eine Methode in drei Schritten: Von der gegebenen Menge auf 1, dann auf die gesuchte Menge.',
      'Proportionaler Dreisatz: Mehr von A → mehr von B (z.B. mehr Brötchen → mehr Geld).',
      'Antiproportionaler (umgekehrter) Dreisatz: Mehr von A → weniger von B (z.B. mehr Arbeiter → weniger Zeit).',
    ],
    example: {
      question: '3 Arbeiter brauchen 12 Tage. Wie lange brauchen 4 Arbeiter?',
      steps: [
        'Erkenne: Mehr Arbeiter → weniger Tage → antiproportional!',
        'Berechne für 1 Arbeiter: 12 × 3 = 36 Tage (Achtung: mal, nicht geteilt!).',
        'Berechne für 4 Arbeiter: 36 ÷ 4 = 9 Tage.',
      ],
      answer: '4 Arbeiter brauchen 9 Tage.',
    },
    tips: [
      'Frage dich immer zuerst: Ist es proportional oder antiproportional? Das bestimmt, ob du im zweiten Schritt multiplizierst oder dividierst.',
    ],
    pitfalls: [
      'Beim antiproportionalen Dreisatz wird im Schritt "auf 1" multipliziert (nicht geteilt!) — genau andersherum als beim proportionalen.',
    ],
  },

  'k7-flaechenberechnung': {
    concepts: [
      'Dreieck: A = (g × h) / 2. Die Höhe h steht senkrecht auf der Grundseite g.',
      'Parallelogramm: A = g × h. Wie ein Rechteck, aber die Höhe ist nicht die Seitenlänge!',
      'Zusammengesetzte Figuren zerlegst du in bekannte Grundformen (Rechtecke, Dreiecke) und addierst die Einzelflächen.',
    ],
    example: {
      question: 'Berechne die Fläche eines Dreiecks mit g = 8 cm und h = 5 cm.',
      steps: [
        'Formel: A = (g × h) / 2.',
        'Einsetzen: A = (8 × 5) / 2 = 40 / 2.',
        'Ergebnis: A = 20 cm².',
      ],
      answer: 'Die Fläche beträgt 20 cm².',
    },
    tips: [
      'Die Dreiecksformel ist "das halbe Rechteck" — stell dir vor, du schneidest ein Rechteck diagonal durch.',
    ],
    pitfalls: [
      'Die Höhe ist NICHT die Seitenlänge! Die Höhe steht immer senkrecht (90°) auf der Grundseite. Besonders beim Parallelogramm wird das oft verwechselt.',
    ],
  },
};

/**
 * Gibt den Theorie-Block für ein bestimmtes Topic zurück, oder null falls nicht vorhanden.
 */
export function getTheory(topicId: string): TheoryBlock | null {
  return THEORY_CONTENT[topicId] ?? null;
}
