import type { TheoryBlock } from './types';

/**
 * Theorie-Inhalte fuer Klasse 1 bis 3.
 * Altersgerechte, einfache Sprache fuer Grundschulkinder.
 */
export const K1_K3_THEORY: Record<string, TheoryBlock> = {
  // ═══════════════════════════════════════════════════════════════
  // KLASSE 1
  // ═══════════════════════════════════════════════════════════════

  'k1-zahlen-bis-10': {
    concepts: [
      'Die Zahlen von 1 bis 10 kannst du zaehlen, lesen und schreiben. Jede Zahl hat ihren festen Platz.',
      'Mit den Zeichen > (groesser) und < (kleiner) vergleichst du Zahlen: 3 < 7 bedeutet "3 ist kleiner als 7".',
      'Ordnen heisst: Du legst die Zahlen der Reihe nach hin, zum Beispiel von der kleinsten zur groessten.',
    ],
    example: {
      question: 'Ordne die Zahlen: 5, 2, 8, 1',
      steps: [
        'Finde die kleinste Zahl: 1.',
        'Dann kommt die 2, dann die 5.',
        'Die groesste Zahl ist die 8.',
      ],
      answer: '1 < 2 < 5 < 8',
    },
    tips: [
      'Denke an deine Finger: Du hast 10 Finger — fuer jede Zahl bis 10 einen!',
      'Das Zeichen < sieht aus wie ein Schnabel. Der Schnabel zeigt immer zur groesseren Zahl.',
    ],
    pitfalls: [
      'Verwechsle nicht < und >! Der offene Teil zeigt immer zur groesseren Zahl: 3 < 7, aber 7 > 3.',
    ],
  },

  'k1-addition-bis-20': {
    concepts: [
      'Addition bedeutet "zusammenzaehlen". Das Plus-Zeichen (+) zeigt dir, dass du Zahlen zusammenrechnen sollst.',
      'Im Zahlenraum bis 20 kannst du zum Beispiel 9 + 7 oder 14 + 3 rechnen.',
      'Das Ergebnis einer Addition heisst "Summe".',
    ],
    example: {
      question: '7 + 6 = ?',
      steps: [
        'Starte bei der groesseren Zahl: 7.',
        'Zaehle 6 weiter: 8, 9, 10, 11, 12, 13.',
        'Du landest bei 13.',
      ],
      answer: '7 + 6 = 13',
    },
    tips: [
      'Faenge immer bei der groesseren Zahl an zu zaehlen — das spart Schritte!',
    ],
    pitfalls: [
      'Vergiss nicht: Das Ergebnis darf bei diesen Aufgaben hoechstens 20 sein.',
    ],
  },

  'k1-addition-bis-20-ohne-uebergang': {
    concepts: [
      'Addition ohne Zehneruebergang heisst: Du ueberschreitest die 10 nicht. Zum Beispiel 12 + 5 = 17.',
      'Die Einer werden einfach zusammengezaehlt. Die Zehner bleiben gleich.',
      'Du bleibst im gleichen Zehner: 11 + 3 = 14, beides liegt zwischen 10 und 20.',
    ],
    example: {
      question: '12 + 5 = ?',
      steps: [
        'Der Zehner bleibt: 1 Zehner (= 10).',
        'Die Einer zusammenzaehlen: 2 + 5 = 7.',
        'Zusammen: 10 + 7 = 17.',
      ],
      answer: '12 + 5 = 17',
    },
    tips: [
      'Pruefe: Ergeben die Einer zusammen weniger als 10? Dann ist es ohne Uebergang.',
    ],
    pitfalls: [
      'Wenn die Einer zusammen 10 oder mehr ergeben, ist es ein Zehneruebergang — dann brauchst du eine andere Strategie!',
    ],
  },

  'k1-addition-bis-20-mit-uebergang': {
    concepts: [
      'Beim Zehneruebergang ueberschreitest du die 10. Zum Beispiel: 8 + 5 = 13.',
      'Trick: Zerlege die zweite Zahl so, dass du zuerst auf 10 kommst. 8 + 5 → 8 + 2 + 3 → 10 + 3 = 13.',
      'Diesen Trick nennt man "ueber die 10 rechnen" oder "Zehnerfreund nutzen".',
    ],
    example: {
      question: '8 + 5 = ?',
      steps: [
        'Wie viel fehlt von 8 bis 10? Es fehlen 2.',
        'Zerlege die 5 in 2 + 3.',
        '8 + 2 = 10, dann 10 + 3 = 13.',
      ],
      answer: '8 + 5 = 13',
    },
    tips: [
      'Merke dir die Zehnerfreunde: 1+9, 2+8, 3+7, 4+6, 5+5 — sie ergeben immer 10!',
      'Rechne immer erst bis zur 10, dann den Rest dazu.',
    ],
    pitfalls: [
      'Vergiss nicht den Rest! Wenn du die 5 in 2 + 3 zerlegst, musst du die 3 noch dazurechnen.',
    ],
  },

  'k1-subtraktion-bis-20': {
    concepts: [
      'Subtraktion heisst "wegnehmen" oder "abziehen". Das Minus-Zeichen (−) zeigt dir das an.',
      'Im Zahlenraum bis 20 rechnest du zum Beispiel 15 − 8 oder 20 − 7.',
      'Das Ergebnis einer Subtraktion heisst "Differenz".',
    ],
    example: {
      question: '15 − 8 = ?',
      steps: [
        'Du hast 15 und nimmst 8 weg.',
        'Trick: Rechne erst bis zur 10 zurueck: 15 − 5 = 10.',
        'Dann noch 3 abziehen (weil 8 = 5 + 3): 10 − 3 = 7.',
      ],
      answer: '15 − 8 = 7',
    },
    tips: [
      'Auch beim Minus hilft der Umweg ueber die 10!',
    ],
    pitfalls: [
      'Bei der Subtraktion ist die Reihenfolge wichtig! 15 − 8 ist nicht das Gleiche wie 8 − 15.',
    ],
  },

  'k1-tausch-umkehraufgaben': {
    concepts: [
      'Tauschaufgaben: Du kannst beim Plus die Zahlen tauschen und das Ergebnis bleibt gleich. 3 + 4 = 4 + 3 = 7.',
      'Umkehraufgaben: Plus und Minus gehoeren zusammen. Wenn 3 + 4 = 7, dann ist auch 7 − 4 = 3 und 7 − 3 = 4.',
      'Jede Plus-Aufgabe hat also zwei passende Minus-Aufgaben!',
    ],
    example: {
      question: 'Finde die Umkehraufgaben zu 5 + 3 = 8.',
      steps: [
        'Die Tauschaufgabe ist: 3 + 5 = 8.',
        'Die erste Umkehraufgabe: 8 − 3 = 5.',
        'Die zweite Umkehraufgabe: 8 − 5 = 3.',
      ],
      answer: '3 + 5 = 8, 8 − 3 = 5, 8 − 5 = 3',
    },
    tips: [
      'Mit Umkehraufgaben kannst du dein Ergebnis ueberpruefen: Wenn 6 + 3 = 9, dann muss 9 − 3 = 6 sein.',
    ],
    pitfalls: [
      'Tauschen geht nur bei Plus! Bei Minus darfst du NICHT tauschen: 8 − 3 ist nicht das Gleiche wie 3 − 8.',
    ],
  },

  'k1-rechengeschichten': {
    concepts: [
      'Rechengeschichten sind kleine Geschichten, in denen eine Aufgabe versteckt ist.',
      'Lies genau: "dazubekommen", "geschenkt", "mehr" bedeutet Plus (+). "Verloren", "weggegeben", "weniger" bedeutet Minus (−).',
      'Schreibe zuerst die Rechenaufgabe auf, dann rechne sie aus.',
    ],
    example: {
      question: 'Tim hat 6 Aepfel. Er bekommt von Lena 5 dazu. Wie viele Aepfel hat Tim jetzt?',
      steps: [
        'Tim hat am Anfang 6 Aepfel.',
        '"dazubekommen" heisst Plus: 6 + 5.',
        '6 + 5 = 11.',
      ],
      answer: 'Tim hat jetzt 11 Aepfel.',
    },
    tips: [
      'Unterstreiche die wichtigen Woerter in der Geschichte: die Zahlen und ob es Plus oder Minus ist.',
    ],
    pitfalls: [
      'Lies die Aufgabe bis zum Ende! Manchmal stecken zwei Schritte in einer Geschichte.',
    ],
  },

  'k1-lagebeziehungen': {
    concepts: [
      'Lagebeziehungen beschreiben, wo etwas ist: oben/unten, links/rechts, vor/hinter, neben.',
      'Links ist die Seite, auf der bei den meisten die Hand ist, mit der sie NICHT schreiben.',
      'Wichtig: Die Lage haengt davon ab, von wo du schaust! Was fuer dich links ist, kann fuer jemand anderes rechts sein.',
    ],
    example: {
      question: 'Wo liegt der Ball? Er liegt unter dem Tisch, rechts neben dem Stuhl.',
      steps: [
        'Zuerst: "unter dem Tisch" — der Ball ist tiefer als der Tisch.',
        'Dann: "rechts neben dem Stuhl" — der Ball ist auf der rechten Seite vom Stuhl.',
        'Du weisst jetzt genau, wo der Ball liegt!',
      ],
      answer: 'Der Ball liegt unter dem Tisch und rechts neben dem Stuhl.',
    },
    tips: [
      'Hebe deine Schreibhand hoch — das ist rechts (bei den meisten Kindern). Die andere Seite ist links.',
    ],
    pitfalls: [
      'Wenn du jemanden anschaust: Sein rechts ist DEIN links! Achte darauf, von welcher Seite du schaust.',
    ],
  },

  'k1-muster-und-strukturen': {
    concepts: [
      'Ein Muster ist etwas, das sich wiederholt. Zum Beispiel: rot, blau, rot, blau, rot, blau.',
      'Du kannst Muster erkennen und weiterfuehren: Was kommt als Naechstes?',
      'Muster gibt es ueberall: bei Farben, Formen, Zahlen oder Bewegungen.',
    ],
    example: {
      question: 'Wie geht das Muster weiter? Kreis, Dreieck, Kreis, Dreieck, Kreis, ...',
      steps: [
        'Schau dir an, was sich wiederholt: Kreis, Dreieck.',
        'Das Muster hat immer 2 Teile, die sich abwechseln.',
        'Nach dem Kreis kommt wieder ein Dreieck.',
      ],
      answer: 'Das naechste ist ein Dreieck.',
    },
    tips: [
      'Klatsche oder sprich das Muster laut — so faellt es leichter, die Wiederholung zu hoeren.',
    ],
    pitfalls: [
      'Manchmal wiederholen sich 3 oder mehr Dinge, nicht nur 2. Schau genau hin, wie lang der sich wiederholende Teil ist!',
    ],
  },

  'k1-geld-euro-cent': {
    concepts: [
      'Wir bezahlen mit Euro und Cent. 1 Euro = 100 Cent.',
      'Es gibt Muenzen: 1 ct, 2 ct, 5 ct, 10 ct, 20 ct, 50 ct, 1 EUR, 2 EUR. Und Scheine: 5 EUR, 10 EUR, 20 EUR und mehr.',
      'Beim Bezahlen zaehle zuerst die Euro, dann die Cent zusammen.',
    ],
    example: {
      question: 'Du hast eine 2-Euro-Muenze und drei 10-Cent-Muenzen. Wie viel Geld hast du?',
      steps: [
        'Euro zaehlen: 2 EUR.',
        'Cent zaehlen: 3 x 10 ct = 30 ct.',
        'Zusammen: 2 EUR und 30 ct = 2,30 EUR.',
      ],
      answer: 'Du hast 2,30 EUR.',
    },
    tips: [
      'Sortiere die Muenzen nach Wert — erst die grossen, dann die kleinen. So zaehlt es sich leichter.',
    ],
    pitfalls: [
      'Verwechsle nicht Euro und Cent! 2 Euro sind viel mehr als 2 Cent. Achte auf die Einheit.',
    ],
  },

  'k1-uhrzeit-volle-stunden': {
    concepts: [
      'Die Uhr hat zwei Zeiger: Der kurze Zeiger zeigt die Stunde, der lange Zeiger zeigt die Minuten.',
      'Wenn der lange Zeiger auf der 12 steht, ist es eine volle Stunde.',
      'Der kurze Zeiger zeigt dann genau auf eine Zahl — das ist die Uhrzeit. Zum Beispiel: kurzer Zeiger auf 3, langer Zeiger auf 12 = 3 Uhr.',
    ],
    example: {
      question: 'Der kurze Zeiger zeigt auf die 8, der lange auf die 12. Wie spaet ist es?',
      steps: [
        'Der lange Zeiger auf der 12 = volle Stunde.',
        'Der kurze Zeiger zeigt auf die 8.',
        'Es ist 8 Uhr.',
      ],
      answer: 'Es ist 8 Uhr.',
    },
    tips: [
      'Merke: Der KURZE Zeiger zeigt die Stunde, der LANGE die Minuten. Lang fuer die laengere Einteilung (60 Minuten).',
    ],
    pitfalls: [
      'Verwechsle nicht den kurzen und den langen Zeiger! Der kurze ist der Stundenzeiger.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 2
  // ═══════════════════════════════════════════════════════════════

  'k2-zahlen-bis-100': {
    concepts: [
      'Im Zahlenraum bis 100 gibt es Zehner (Z) und Einer (E). Die Zahl 54 hat 5 Zehner und 4 Einer.',
      'Stellenwerte helfen dir: Die erste Stelle (links) sind die Zehner, die zweite Stelle (rechts) die Einer.',
      'Du kannst alle Zahlen bis 100 auf dem Zahlenstrahl einordnen, vergleichen und der Groesse nach sortieren.',
    ],
    example: {
      question: 'Welche Zahl hat 7 Zehner und 3 Einer?',
      steps: [
        '7 Zehner = 70.',
        '3 Einer = 3.',
        'Zusammen: 70 + 3 = 73.',
      ],
      answer: 'Die Zahl ist 73.',
    },
    tips: [
      'Lege Zehnerstangen und Einerwuerfel — so kannst du die Stellenwerte anfassen und besser verstehen.',
    ],
    pitfalls: [
      'Bei der Zahl 30 steht die 3 fuer Zehner, nicht fuer Einer! 30 hat 3 Zehner und 0 Einer.',
    ],
  },

  'k2-zahlenstrahl-bis-100': {
    concepts: [
      'Der Zahlenstrahl ist eine Linie, auf der die Zahlen der Reihe nach stehen.',
      'Links stehen die kleinen Zahlen, rechts die grossen. Die Abstaende zwischen den Zahlen sind immer gleich.',
      'Du kannst jede Zahl auf dem Zahlenstrahl finden, indem du die Striche abzaehlst.',
    ],
    example: {
      question: 'Wo liegt die 65 auf dem Zahlenstrahl?',
      steps: [
        'Finde die 60 auf dem Zahlenstrahl.',
        'Zaehle 5 Striche weiter nach rechts.',
        'Dort liegt die 65.',
      ],
      answer: 'Die 65 liegt 5 Striche rechts von der 60.',
    },
    tips: [
      'Schaue zuerst auf die Zehner-Markierungen (10, 20, 30, ...), dann zaehle die Einer ab.',
    ],
    pitfalls: [
      'Achte auf die Einteilung! Manchmal steht nicht jede Zahl am Zahlenstrahl. Zaehle die Striche genau.',
    ],
  },

  'k2-addition-mit-uebergang': {
    concepts: [
      'Bei der Addition mit Zehneruebergang ergeben die Einer zusammen mehr als 9. Dann entsteht ein neuer Zehner.',
      'Trick: Zerlege eine Zahl so, dass du zuerst auf den naechsten Zehner kommst. 47 + 36 → 47 + 3 + 33 → 50 + 33 = 83.',
      'Du kannst auch schrittweise rechnen: Erst die Zehner addieren, dann die Einer, und den neuen Zehner nicht vergessen.',
    ],
    example: {
      question: '47 + 36 = ?',
      steps: [
        'Zehner addieren: 40 + 30 = 70.',
        'Einer addieren: 7 + 6 = 13.',
        '70 + 13 = 83.',
      ],
      answer: '47 + 36 = 83',
    },
    tips: [
      'Wenn die Einer zusammen 10 oder mehr ergeben, vergiss nicht den Extra-Zehner!',
    ],
    pitfalls: [
      'Haeufiger Fehler: 47 + 36 = 73 — die 1 aus 7 + 6 = 13 wurde vergessen. Pruefe immer die Einer!',
    ],
  },

  'k2-subtraktion-bis-100': {
    concepts: [
      'Bei der Subtraktion im Zahlenraum bis 100 nimmst du Zehner und Einer getrennt weg.',
      'Wenn die Einer nicht reichen (z.B. 53 − 28: 3 − 8 geht nicht), musst du einen Zehner "aufbrechen".',
      'Schrittweise rechnen: Erst die Zehner abziehen, dann die Einer.',
    ],
    example: {
      question: '53 − 28 = ?',
      steps: [
        'Erst den Zehner abziehen: 53 − 20 = 33.',
        'Dann die Einer abziehen: 33 − 8 = 25.',
        'Oder anders: 53 − 28 → 53 − 3 = 50, dann 50 − 25 = 25.',
      ],
      answer: '53 − 28 = 25',
    },
    tips: [
      'Rechne schrittweise und schreibe die Zwischenergebnisse auf, dann machst du weniger Fehler.',
    ],
    pitfalls: [
      'Wenn die Einer nicht reichen, darfst du nicht einfach umgekehrt rechnen: 3 − 8 ist nicht 5!',
    ],
  },

  'k2-einmaleins-2-5-10': {
    concepts: [
      'Das Einmaleins bedeutet: eine Zahl wird mehrmals genommen. 3 x 5 = 5 + 5 + 5 = 15.',
      'Die 2er-Reihe: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 — immer 2 dazu.',
      'Die 5er-Reihe endet immer auf 0 oder 5. Die 10er-Reihe: haenge einfach eine 0 an!',
    ],
    example: {
      question: '4 x 5 = ?',
      steps: [
        '4 x 5 bedeutet: 5 wird 4 Mal genommen.',
        '5 + 5 + 5 + 5 = 20.',
        'Oder zaehle in 5er-Schritten: 5, 10, 15, 20.',
      ],
      answer: '4 x 5 = 20',
    },
    tips: [
      'Die 5er-Reihe ist einfach: Zaehle in 5er-Schritten — immer abwechselnd auf 5 und auf 0.',
      'Die 10er-Reihe: 3 x 10 = 30. Haenge einfach eine Null an die Zahl!',
    ],
    pitfalls: [
      'Verwechsle nicht Mal (x) und Plus (+)! 4 x 5 = 20, aber 4 + 5 = 9.',
    ],
  },

  'k2-einmaleins-3-4': {
    concepts: [
      'Die 3er-Reihe: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30 — immer 3 dazu.',
      'Die 4er-Reihe: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 — immer 4 dazu.',
      'Tipp: Die 4er-Reihe ist das Doppelte der 2er-Reihe! 4 x 6 = 2 x 6 + 2 x 6 = 12 + 12 = 24.',
    ],
    example: {
      question: '7 x 3 = ?',
      steps: [
        'Zaehle in 3er-Schritten: 3, 6, 9, 12, 15, 18, 21.',
        'Das siebte Ergebnis ist 21.',
        'Oder: 7 x 3 = 5 x 3 + 2 x 3 = 15 + 6 = 21.',
      ],
      answer: '7 x 3 = 21',
    },
    tips: [
      'Du kannst schwierige Aufgaben in einfache zerlegen: 8 x 4 = 8 x 2 + 8 x 2 = 16 + 16 = 32.',
    ],
    pitfalls: [
      'Verzaehle dich nicht beim Aufsagen der Reihe! Nutze lieber den Zerlegungs-Trick, das ist sicherer.',
    ],
  },

  'k2-division-einfuehrung': {
    concepts: [
      'Division (Teilen) bedeutet: Du verteilst gerecht auf gleich grosse Gruppen.',
      '12 : 3 = 4 heisst: Wenn du 12 Dinge auf 3 Kinder verteilst, bekommt jedes Kind 4 Stueck.',
      'Division ist die Umkehrung der Multiplikation: 3 x 4 = 12, also 12 : 3 = 4.',
    ],
    example: {
      question: '15 : 5 = ?',
      steps: [
        'Stelle dir vor: 15 Gummibaerchen auf 5 Kinder verteilen.',
        'Jedes Kind bekommt gleich viele.',
        '5 x 3 = 15, also bekommt jedes Kind 3 Stueck.',
      ],
      answer: '15 : 5 = 3',
    },
    tips: [
      'Wenn du nicht weiter weisst, denke an die Einmaleins-Aufgabe! 15 : 5 = ? → Welche Zahl mal 5 ergibt 15?',
    ],
    pitfalls: [
      'Durch 0 teilen geht nicht! 10 : 0 hat kein Ergebnis.',
    ],
  },

  'k2-sachaufgaben': {
    concepts: [
      'Sachaufgaben sind Geschichten, in denen eine Rechenaufgabe steckt. Du musst herausfinden, welche Rechenart passt.',
      '"Zusammen", "insgesamt", "dazu" = Plus (+). "Weniger", "uebrig", "weg" = Minus (−).',
      '"Jeder gleich viel", "aufteilen" = Geteilt (:). "Mal so viel", "je 3 Stueck" = Mal (x).',
    ],
    example: {
      question: 'In einer Klasse sind 24 Kinder. Sie bilden 6 gleich grosse Gruppen. Wie viele Kinder sind in jeder Gruppe?',
      steps: [
        'Lies genau: 24 Kinder, 6 gleiche Gruppen.',
        '"Gleich grosse Gruppen" bedeutet Teilen: 24 : 6.',
        '24 : 6 = 4.',
      ],
      answer: 'In jeder Gruppe sind 4 Kinder.',
    },
    tips: [
      'Unterstreiche die Zahlen und die Signalwoerter. Schreibe dann erst die Rechnung auf, bevor du rechnest.',
    ],
    pitfalls: [
      'Lies die Frage genau! Manchmal wird nicht nach dem Ergebnis, sondern nach dem Rest oder der Differenz gefragt.',
    ],
  },

  'k2-gerade-ungerade': {
    concepts: [
      'Gerade Zahlen kannst du gerecht auf 2 aufteilen: 2, 4, 6, 8, 10, 12, ...',
      'Ungerade Zahlen lassen sich NICHT gerecht auf 2 aufteilen: 1, 3, 5, 7, 9, 11, ...',
      'Tipp: Schau auf die letzte Ziffer! Endet die Zahl auf 0, 2, 4, 6 oder 8, ist sie gerade.',
    ],
    example: {
      question: 'Ist 36 gerade oder ungerade?',
      steps: [
        'Schau auf die letzte Ziffer: 6.',
        '6 ist eine gerade Zahl (0, 2, 4, 6, 8).',
        'Also ist auch 36 gerade.',
      ],
      answer: '36 ist eine gerade Zahl.',
    },
    tips: [
      'Gerade Zahlen enden immer auf 0, 2, 4, 6 oder 8. Das ist der schnellste Check!',
    ],
    pitfalls: [
      'Die 0 ist auch gerade! Viele vergessen das. 10, 20, 30 — alle gerade.',
    ],
  },

  'k2-geometrie-ebene-figuren': {
    concepts: [
      'Ebene Figuren sind flach — du kannst sie auf Papier zeichnen.',
      'Der Kreis ist rund und hat keine Ecken und keine geraden Seiten.',
      'Das Dreieck hat 3 Ecken und 3 Seiten. Das Viereck hat 4 Ecken und 4 Seiten (Quadrat, Rechteck, Raute ...).',
    ],
    example: {
      question: 'Wie viele Ecken und Seiten hat ein Rechteck?',
      steps: [
        'Zaehle die Ecken: oben links, oben rechts, unten rechts, unten links = 4 Ecken.',
        'Zaehle die Seiten: oben, rechts, unten, links = 4 Seiten.',
        'Gegenueberliegende Seiten sind gleich lang.',
      ],
      answer: 'Ein Rechteck hat 4 Ecken und 4 Seiten.',
    },
    tips: [
      'Der Name verraet oft die Eckenanzahl: Drei-eck = 3 Ecken, Vier-eck = 4 Ecken.',
    ],
    pitfalls: [
      'Ein Quadrat ist auch ein Rechteck — nur mit gleich langen Seiten. Jedes Quadrat ist ein Viereck!',
    ],
  },

  'k2-symmetrie-erkennen': {
    concepts: [
      'Symmetrie bedeutet: Wenn du eine Figur in der Mitte faltest, liegen beide Haelften genau aufeinander.',
      'Die Linie, an der du faltest, heisst Symmetrieachse.',
      'Viele Dinge sind symmetrisch: ein Schmetterling, ein Herz, der Buchstabe A.',
    ],
    example: {
      question: 'Hat ein Quadrat eine Symmetrieachse?',
      steps: [
        'Falte das Quadrat von oben nach unten — beide Haelften passen aufeinander.',
        'Falte es von links nach rechts — passt auch!',
        'Ein Quadrat hat sogar 4 Symmetrieachsen (auch diagonal).',
      ],
      answer: 'Ja, ein Quadrat hat 4 Symmetrieachsen.',
    },
    tips: [
      'Falte das Papier wirklich oder benutze einen Spiegel an der Mitte der Figur!',
    ],
    pitfalls: [
      'Nicht jede Figur, die "huebsch" aussieht, ist symmetrisch. Pruefe es immer durch Falten!',
    ],
  },

  'k2-geld-euro-cent': {
    concepts: [
      '1 Euro = 100 Cent. Wenn du 100 Cent zusammen hast, kannst du sie gegen 1 Euro tauschen.',
      'Beim Bezahlen kannst du mit verschiedenen Muenzen den gleichen Betrag zusammenstellen: 50ct + 20ct + 20ct + 10ct = 1 EUR.',
      'Rueckgeld berechnen: Bezahlter Betrag minus Preis = Rueckgeld.',
    ],
    example: {
      question: 'Ein Eis kostet 1,30 EUR. Du bezahlst mit 2 EUR. Wie viel Rueckgeld bekommst du?',
      steps: [
        'Du bezahlst: 2,00 EUR.',
        'Das Eis kostet: 1,30 EUR.',
        'Rueckgeld: 2,00 − 1,30 = 0,70 EUR.',
      ],
      answer: 'Du bekommst 70 Cent Rueckgeld.',
    },
    tips: [
      'Zaehle vom Preis bis zum bezahlten Betrag hoch: 1,30 + 0,70 = 2,00. So findest du das Rueckgeld.',
    ],
    pitfalls: [
      'Vergiss nicht: 1 EUR und 30 ct = 1,30 EUR. Das Komma trennt Euro und Cent!',
    ],
  },

  'k2-daten-sammeln': {
    concepts: [
      'Daten sammeln heisst: Du zaehle etwas und schreibst es auf, zum Beispiel Lieblingsfarben der Klasse.',
      'Eine Strichliste hilft beim Zaehlen: Fuer jede Stimme machst du einen Strich. Bei 5 machst du einen Querstrich.',
      'Die Ergebnisse kannst du in einer Tabelle oder einem Balkendiagramm zeigen.',
    ],
    example: {
      question: '8 Kinder moegen Rot, 5 Blau und 3 Gruen. Wie zeigst du das?',
      steps: [
        'Mache eine Strichliste: Rot: |||| ||| (8), Blau: |||| (5), Gruen: ||| (3).',
        'Trage es in eine Tabelle ein: Farbe | Anzahl.',
        'Male ein Balkendiagramm: Jeder Balken ist so lang wie die Anzahl.',
      ],
      answer: 'Rot hat den laengsten Balken (8), dann Blau (5), dann Gruen (3).',
    },
    tips: [
      'Bei der Strichliste: Immer beim fuenften Strich einen Querstrich machen, dann kannst du schneller zaehlen!',
    ],
    pitfalls: [
      'Vergiss keine Antwort beim Zaehlen! Zaehle am Ende nochmal alle zusammen und pruefe, ob die Summe stimmt.',
    ],
  },

  'k2-zahlenfolgen': {
    concepts: [
      'Eine Zahlenfolge ist eine Reihe von Zahlen, die nach einer Regel aufgebaut ist.',
      'Finde die Regel: Wird immer die gleiche Zahl addiert? Subtrahiert? Oder verdoppelt?',
      'Beispiel: 2, 5, 8, 11, 14 — hier wird immer 3 dazugezaehlt.',
    ],
    example: {
      question: 'Wie geht die Zahlenfolge weiter? 4, 8, 12, 16, ...',
      steps: [
        'Finde die Regel: 8 − 4 = 4, 12 − 8 = 4, 16 − 12 = 4.',
        'Es wird immer 4 dazugezaehlt.',
        'Naechste Zahl: 16 + 4 = 20.',
      ],
      answer: 'Die naechste Zahl ist 20.',
    },
    tips: [
      'Berechne die Abstaende zwischen den Zahlen. Wenn sie immer gleich sind, hast du die Regel!',
    ],
    pitfalls: [
      'Nicht jede Zahlenfolge hat die gleichen Abstaende! Manchmal verdoppelt sich die Zahl oder die Abstaende werden groesser.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // KLASSE 3
  // ═══════════════════════════════════════════════════════════════

  'k3-zahlen-bis-1000': {
    concepts: [
      'Im Zahlenraum bis 1000 gibt es drei Stellenwerte: Hunderter (H), Zehner (Z) und Einer (E).',
      'Die Zahl 538 hat 5 Hunderter, 3 Zehner und 8 Einer: 500 + 30 + 8 = 538.',
      'Du kannst grosse Zahlen vergleichen: Schau zuerst auf die Hunderter, dann die Zehner, dann die Einer.',
    ],
    example: {
      question: 'Welche Zahl ist groesser: 482 oder 478?',
      steps: [
        'Hunderter vergleichen: Beide haben 4 Hunderter — gleich.',
        'Zehner vergleichen: 8 Zehner vs. 7 Zehner — 8 ist mehr.',
        '482 > 478.',
      ],
      answer: '482 ist groesser als 478.',
    },
    tips: [
      'Vergleiche Stelle fuer Stelle von links nach rechts. Sobald eine Stelle groesser ist, ist die ganze Zahl groesser.',
    ],
    pitfalls: [
      'Schau nicht nur auf die Einer! 389 ist KLEINER als 401, obwohl 9 groesser als 1 ist — die Hunderter entscheiden.',
    ],
  },

  'k3-zahlenstrahl-bis-1000': {
    concepts: [
      'Der Zahlenstrahl bis 1000 hat grosse Markierungen bei den Hundertern (100, 200, 300, ...).',
      'Zwischen zwei Hundertern liegen die Zehner. Zum Beispiel zwischen 300 und 400: 310, 320, 330, ...',
      'Du kannst jede Zahl einordnen, indem du zuerst den Hunderter findest, dann den Zehner, dann den Einer.',
    ],
    example: {
      question: 'Wo liegt die 750 auf dem Zahlenstrahl?',
      steps: [
        'Finde die 700 (Hunderter-Markierung).',
        'Zaehle 5 Zehner weiter: 710, 720, 730, 740, 750.',
        'Die 750 liegt genau in der Mitte zwischen 700 und 800.',
      ],
      answer: 'Die 750 liegt genau zwischen 700 und 800.',
    },
    tips: [
      'Halbierungstrick: Die Mitte zwischen 700 und 800 ist 750, die Mitte zwischen 400 und 500 ist 450.',
    ],
    pitfalls: [
      'Achte auf die Skalierung! Manchmal sind nur die Hunderter markiert, und du musst die Zehner selber abschaetzen.',
    ],
  },

  'k3-multiplikation-schriftlich': {
    concepts: [
      'Bei der schriftlichen Multiplikation multiplizierst du jede Stelle einzeln mit dem Faktor.',
      'Du rechnest von rechts nach links: Erst die Einer, dann die Zehner, dann die Hunderter.',
      'Wenn ein Ergebnis groesser als 9 ist, schreibst du den Einer hin und merkst dir den Uebertrag.',
    ],
    example: {
      question: '143 x 5 = ?',
      steps: [
        'Einer: 3 x 5 = 15. Schreibe 5, merke 1.',
        'Zehner: 4 x 5 = 20, plus 1 (Uebertrag) = 21. Schreibe 1, merke 2.',
        'Hunderter: 1 x 5 = 5, plus 2 (Uebertrag) = 7. Schreibe 7.',
      ],
      answer: '143 x 5 = 715',
    },
    tips: [
      'Mache einen Ueberschlag vorher: 143 x 5 ist ungefaehr 150 x 5 = 750. Dein Ergebnis sollte in der Naehe liegen.',
    ],
    pitfalls: [
      'Vergiss den Uebertrag nicht! Er muss zur naechsten Stelle addiert werden. Schreibe ihn klein dazu.',
    ],
  },

  'k3-halbschriftliche-division': {
    concepts: [
      'Bei der halbschriftlichen Division zerlegst du die grosse Zahl in einfachere Teile.',
      'Beispiel: 84 : 4 → Zerlege 84 in 80 + 4. Dann: 80 : 4 = 20, und 4 : 4 = 1. Zusammen: 21.',
      'Du nutzt dein Einmaleins-Wissen, um die Teilaufgaben zu loesen.',
    ],
    example: {
      question: '96 : 8 = ?',
      steps: [
        'Zerlege 96 in einen einfacheren Teil: 80 + 16.',
        '80 : 8 = 10.',
        '16 : 8 = 2.',
        '10 + 2 = 12.',
      ],
      answer: '96 : 8 = 12',
    },
    tips: [
      'Suche dir Teile, die du leicht durch den Divisor teilen kannst. Vielfache des Divisors sind gut!',
    ],
    pitfalls: [
      'Beide Teile muessen durch die Zahl teilbar sein! 96 in 90 + 6 zerlegen ist schlecht, weil 90 : 8 nicht glatt geht.',
    ],
  },

  'k3-einmaleins-meister': {
    concepts: [
      'Das kleine Einmaleins (alle Reihen von 1 bis 10) musst du schnell und sicher koennen.',
      'Nutze die Tauschaufgaben: Wenn du 7 x 8 = 56 weisst, weisst du auch 8 x 7 = 56.',
      'Schwierige Aufgaben kannst du ableiten: 7 x 6 = 7 x 5 + 7 x 1 = 35 + 7 = 42.',
    ],
    example: {
      question: '8 x 9 = ?',
      steps: [
        'Trick: 8 x 9 = 8 x 10 − 8 x 1.',
        '8 x 10 = 80.',
        '80 − 8 = 72.',
      ],
      answer: '8 x 9 = 72',
    },
    tips: [
      'Die schwersten Aufgaben sind oft: 6x7, 6x8, 7x8, 7x9, 8x9. Uebe diese besonders oft!',
      '9er-Trick: Die Quersumme ist immer 9. 9 x 8 = 72, und 7 + 2 = 9.',
    ],
    pitfalls: [
      'Raten hilft nicht! Wenn du unsicher bist, leite die Aufgabe ab, statt einfach zu raten.',
    ],
  },

  'k3-sachaufgaben-alle-ops': {
    concepts: [
      'In Klasse 3 koennen Sachaufgaben alle vier Grundrechenarten enthalten: +, −, x, :.',
      'Lies genau und ueberleg: Was ist gegeben? Was wird gesucht? Welche Rechenart passt?',
      'Manche Aufgaben brauchen zwei Rechenschritte hintereinander.',
    ],
    example: {
      question: '3 Kinder kaufen je 4 Aepfel fuer 2 EUR pro Stueck. Was kostet alles zusammen?',
      steps: [
        'Schritt 1: Wie viele Aepfel insgesamt? 3 x 4 = 12 Aepfel.',
        'Schritt 2: Was kosten 12 Aepfel? 12 x 2 = 24 EUR.',
        'Antwort als ganzen Satz formulieren!',
      ],
      answer: 'Alle Aepfel kosten zusammen 24 EUR.',
    },
    tips: [
      'Schreibe einen Antwortsatz! Nicht nur die Zahl, sondern auch die Einheit (EUR, Stueck, kg, ...).',
    ],
    pitfalls: [
      'Bei Aufgaben mit zwei Schritten: Vergiss den zweiten Schritt nicht! Lies die Frage nochmal genau.',
    ],
  },

  'k3-liter-milliliter': {
    concepts: [
      'Fluessigkeiten messen wir in Liter (l) und Milliliter (ml).',
      '1 Liter = 1000 Milliliter. "Milli" bedeutet "tausendstel".',
      'Ein Glas Wasser hat ungefaehr 200 ml. Eine volle Flasche Wasser hat 1 Liter (1000 ml).',
    ],
    example: {
      question: 'Du hast 3 Glaeser mit je 250 ml Saft. Wie viel Liter ist das?',
      steps: [
        '3 x 250 ml = 750 ml.',
        '1 Liter = 1000 ml.',
        '750 ml sind weniger als 1 Liter. Es sind 0,75 Liter.',
      ],
      answer: 'Das sind 750 ml oder 0,75 Liter.',
    },
    tips: [
      'Merke: 500 ml = ein halber Liter. 250 ml = ein viertel Liter.',
    ],
    pitfalls: [
      'Achte auf die Einheit! Wenn in der Aufgabe ml und l gemischt werden, rechne erst alles in ml oder alles in l um.',
    ],
  },

  'k3-zeitspannen': {
    concepts: [
      'Eine Stunde hat 60 Minuten. Ein Tag hat 24 Stunden.',
      'Zeitspannen berechnest du: Endzeit minus Startzeit = Dauer.',
      'Wenn du ueber eine volle Stunde rechnest, zaehle erst bis zur vollen Stunde, dann weiter.',
    ],
    example: {
      question: 'Die Schule beginnt um 8:15 Uhr und endet um 12:45 Uhr. Wie lange dauert der Schultag?',
      steps: [
        'Von 8:15 bis 12:15 sind es 4 Stunden.',
        'Von 12:15 bis 12:45 sind es 30 Minuten.',
        'Zusammen: 4 Stunden und 30 Minuten.',
      ],
      answer: 'Der Schultag dauert 4 Stunden und 30 Minuten.',
    },
    tips: [
      'Rechne in Schritten: Erst bis zur naechsten vollen Stunde, dann ganze Stunden, dann die restlichen Minuten.',
    ],
    pitfalls: [
      'Eine Stunde hat 60 Minuten, nicht 100! Du darfst Minuten nicht wie normale Zahlen rechnen.',
    ],
  },

  'k3-geometrische-koerper': {
    concepts: [
      'Koerper sind raeumliche Formen — sie sind nicht flach, sondern haben eine Tiefe.',
      'Wichtige Koerper: Wuerfel (alle Seiten gleich), Quader (Seiten koennen verschieden sein), Kugel (rund wie ein Ball), Zylinder (rund mit flachen Deckeln).',
      'Koerper haben Flaechen, Kanten und Ecken. Ein Wuerfel hat 6 Flaechen, 12 Kanten und 8 Ecken.',
    ],
    example: {
      question: 'Wie viele Flaechen, Kanten und Ecken hat ein Quader?',
      steps: [
        'Zaehle die Flaechen: oben, unten, vorne, hinten, links, rechts = 6 Flaechen.',
        'Zaehle die Kanten: 4 oben + 4 unten + 4 seitlich = 12 Kanten.',
        'Zaehle die Ecken: 4 oben + 4 unten = 8 Ecken.',
      ],
      answer: 'Ein Quader hat 6 Flaechen, 12 Kanten und 8 Ecken.',
    },
    tips: [
      'Nimm einen Schuhkarton — das ist ein Quader! Zaehle seine Flaechen, Kanten und Ecken ab.',
    ],
    pitfalls: [
      'Eine Kugel hat keine Ecken und keine Kanten! Sie ist rundherum rund. Verwechsle Koerper nicht mit ebenen Figuren.',
    ],
  },

  'k3-flaeche-umfang-einfach': {
    concepts: [
      'Der Umfang ist die Laenge rund um eine Figur herum. Beim Rechteck: Umfang = 2 x Laenge + 2 x Breite.',
      'Die Flaeche ist der Platz innerhalb der Figur. Beim Rechteck: Flaeche = Laenge x Breite.',
      'Umfang wird in cm oder m gemessen. Flaeche wird in cm² oder m² gemessen.',
    ],
    example: {
      question: 'Ein Rechteck ist 5 cm lang und 3 cm breit. Berechne Umfang und Flaeche.',
      steps: [
        'Umfang = 2 x 5 + 2 x 3 = 10 + 6 = 16 cm.',
        'Flaeche = 5 x 3 = 15 cm².',
        'Denke daran: Umfang in cm, Flaeche in cm²!',
      ],
      answer: 'Umfang = 16 cm, Flaeche = 15 cm².',
    },
    tips: [
      'Stelle dir den Umfang wie einen Zaun vor und die Flaeche wie den Rasen dahinter.',
    ],
    pitfalls: [
      'Verwechsle nicht Umfang und Flaeche! Der Umfang ist eine Laenge (cm), die Flaeche ist ein Flaechenmass (cm²).',
    ],
  },

  'k3-spiegeln-verschieben': {
    concepts: [
      'Beim Spiegeln entsteht ein Spiegelbild: Die Figur wird an einer Linie (Spiegelachse) gespiegelt.',
      'Das Spiegelbild ist genau so gross wie das Original, aber seitenverkehrt.',
      'Beim Verschieben rutscht die ganze Figur in eine Richtung (nach oben, unten, links oder rechts), ohne sich zu drehen.',
    ],
    example: {
      question: 'Spiegle das Dreieck an der senkrechten Linie.',
      steps: [
        'Miss den Abstand jeder Ecke zur Spiegellinie.',
        'Trage den gleichen Abstand auf der anderen Seite der Linie ab.',
        'Verbinde die neuen Punkte — das ist das Spiegelbild.',
      ],
      answer: 'Das gespiegelte Dreieck liegt genau gleich weit auf der anderen Seite der Spiegellinie.',
    },
    tips: [
      'Lege einen Spiegel auf die Achse — so siehst du sofort, wie das Spiegelbild aussehen muss!',
    ],
    pitfalls: [
      'Beim Spiegeln aendert sich die Richtung (links wird rechts), aber die Groesse bleibt gleich! Zeichne nicht groesser oder kleiner.',
    ],
  },

  'k3-diagramme': {
    concepts: [
      'Ein Balkendiagramm zeigt Zahlen als Balken. Je laenger der Balken, desto groesser die Zahl.',
      'Ein Streifendiagramm ist aehnlich — die Streifen koennen waagerecht oder senkrecht sein.',
      'Zum Lesen: Schau, bis wohin der Balken reicht, und lies den Wert an der Achse ab.',
    ],
    example: {
      question: 'Im Diagramm hat "Fussball" einen Balken bis 12 und "Schwimmen" bis 7. Was liest du ab?',
      steps: [
        'Fussball: Der Balken reicht bis 12 — also 12 Kinder.',
        'Schwimmen: Der Balken reicht bis 7 — also 7 Kinder.',
        'Fussball ist beliebter: 12 − 7 = 5 Kinder mehr.',
      ],
      answer: '12 Kinder moegen Fussball, 7 moegen Schwimmen. Fussball ist um 5 beliebter.',
    },
    tips: [
      'Lies immer zuerst die Achsenbeschriftung! Sie sagt dir, was gezaehlt wird und in welcher Einheit.',
    ],
    pitfalls: [
      'Achte auf die Skalierung der Achse! Wenn die Achse in 2er-Schritten geht (2, 4, 6, ...), steht ein Strich nicht fuer 1, sondern fuer 2.',
    ],
  },
};
