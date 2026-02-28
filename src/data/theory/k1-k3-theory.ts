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
      'Die Zahlen von 1 bis 10 kannst du zählen, lesen und schreiben. Jede Zahl hat ihren festen Platz.',
      'Du hast 10 Finger — für jede Zahl bis 10 einen Finger!',
      'Mit den Zeichen > (größer) und < (kleiner) vergleichst du Zahlen: 3 < 7 bedeutet "3 ist kleiner als 7".',
      'Ordnen heißt: Du legst die Zahlen der Reihe nach hin — von der kleinsten zur größten.',
    ],
    example: {
      question: 'Ordne die Zahlen: 5, 2, 8, 1',
      steps: [
        'Finde die kleinste Zahl: das ist die 1.',
        'Dann kommt die 2, dann die 5.',
        'Die größte Zahl ist die 8.',
      ],
      answer: '1 < 2 < 5 < 8',
    },
    tips: [
      'Zähle mit den Fingern! Klappe für jede Zahl einen Finger auf.',
      'Das Zeichen < sieht aus wie ein Schnabel. Der Schnabel zeigt immer zur größeren Zahl: 3 < 7.',
    ],
    pitfalls: [
      'Verwechsle nicht < und >! Der offene Teil zeigt zur größeren Zahl: 3 < 7, aber 7 > 3.',
      'Die Null (0) ist auch eine Zahl! Sie steht ganz links und bedeutet "nichts".',
    ],
  },

  'k1-addition-bis-20': {
    concepts: [
      'Addition bedeutet "zusammenzählen". Das Zeichen dafür ist das Plus (+).',
      'Im Zahlenraum bis 20 kannst du zum Beispiel 9 + 7 oder 14 + 3 rechnen.',
      'Das Ergebnis einer Addition heißt "Summe".',
    ],
    example: {
      question: '7 + 6 = ?',
      steps: [
        'Starte bei der größeren Zahl: 7.',
        'Zähle 6 Schritte weiter: 8, 9, 10, 11, 12, 13.',
        'Du landest bei 13!',
      ],
      answer: '7 + 6 = 13',
    },
    tips: [
      'Fange immer bei der größeren Zahl an zu zählen — das ist viel schneller!',
      'Du kannst auch den Zahlenstrahl benutzen und Schritte nach rechts hüpfen.',
    ],
    pitfalls: [
      'Vergiss nicht: Das Ergebnis darf bei diesen Aufgaben höchstens 20 sein.',
      'Zähle sorgfältig — verzehl dich nicht beim Weiterzählen!',
    ],
  },

  'k1-addition-bis-20-ohne-uebergang': {
    concepts: [
      'Hier rechnest du Plus, ohne die 10 zu überschreiten. Zum Beispiel: 12 + 5 = 17.',
      'Schau auf die Einer: 2 + 5 = 7. Das ist weniger als 10 — kein Übergang!',
      'Der Zehner bleibt gleich. Nur die Einer ändern sich.',
    ],
    example: {
      question: '12 + 5 = ?',
      steps: [
        'Der Zehner bleibt: 1 Zehner (das ist 10).',
        'Die Einer zusammenzählen: 2 + 5 = 7.',
        'Zusammen: 10 + 7 = 17.',
      ],
      answer: '12 + 5 = 17',
    },
    tips: [
      'Prüfe die Einer zuerst: Ergeben sie zusammen weniger als 10? Dann ist es einfach!',
      'Stell dir vor, du hast einen Zehnerturm (10) und zählst einzelne Würfel dazu.',
    ],
    pitfalls: [
      'Wenn die Einer zusammen 10 oder mehr ergeben, ist es ein Zehnerübergang — dann brauchst du einen anderen Trick!',
      'Vergiss nicht, den Zehner (10) am Ende dazuzurechnen.',
    ],
  },

  'k1-addition-bis-20-mit-uebergang': {
    concepts: [
      'Hier springst du beim Rechnen über die 10 — das ist der Zehnerübergang! Zum Beispiel: 8 + 5 = 13.',
      'Der Trick: Zerlege die zweite Zahl, damit du zuerst genau auf die 10 kommst.',
      '8 + 5 → erst 8 + 2 = 10, dann 10 + 3 = 13. So wird es einfacher!',
      'Zehnerfreunde sind Paare, die zusammen 10 ergeben: 1+9, 2+8, 3+7, 4+6, 5+5.',
    ],
    example: {
      question: '8 + 5 = ?',
      steps: [
        'Wie viel fehlt von 8 bis 10? Es fehlen 2.',
        'Zerlege die 5 in 2 und 3.',
        '8 + 2 = 10, dann noch 3 dazu: 10 + 3 = 13.',
      ],
      answer: '8 + 5 = 13',
    },
    tips: [
      'Lerne die Zehnerfreunde auswendig: 1+9, 2+8, 3+7, 4+6, 5+5 — sie ergeben immer 10!',
      'Stell dir die 10 wie eine Brücke vor. Erst zur Brücke, dann weiter.',
    ],
    pitfalls: [
      'Vergiss den Rest nicht! Wenn du 5 in 2+3 zerlegst, musst du die 3 am Ende noch dazurechnen.',
      'Übe zuerst die Zehnerfreunde gut — dann klappt der Übergang viel leichter!',
    ],
  },

  'k1-subtraktion-bis-20': {
    concepts: [
      'Subtraktion heißt "wegnehmen" oder "abziehen". Das Zeichen dafür ist das Minus (−).',
      'Stell dir vor, du hast Äpfel im Korb und nimmst einige heraus. Wie viele bleiben übrig?',
      'Das Ergebnis einer Subtraktion heißt "Differenz".',
    ],
    example: {
      question: '15 − 8 = ?',
      steps: [
        'Du hast 15 und nimmst 8 weg.',
        'Trick: Rechne erst bis zur 10 zurück: 15 − 5 = 10.',
        'Jetzt noch 3 abziehen (weil 8 = 5 + 3): 10 − 3 = 7.',
      ],
      answer: '15 − 8 = 7',
    },
    tips: [
      'Auch beim Minus hilft der Umweg über die 10!',
      'Du kannst auch von der kleineren zur größeren Zahl hochzählen: Von 8 bis 15 sind es 7 Schritte.',
    ],
    pitfalls: [
      'Die Reihenfolge ist wichtig! 15 − 8 ist nicht das Gleiche wie 8 − 15.',
      'Zähle beim Rückwärtszählen sorgfältig — verzehl dich nicht!',
    ],
  },

  'k1-tausch-umkehraufgaben': {
    concepts: [
      'Tauschaufgabe: Beim Plus kannst du die Zahlen tauschen — das Ergebnis bleibt gleich! 3 + 4 = 4 + 3 = 7.',
      'Umkehraufgabe: Plus und Minus gehören zusammen wie Geschwister.',
      'Wenn du 3 + 4 = 7 kennst, weißt du auch: 7 − 4 = 3 und 7 − 3 = 4.',
      'Jede Plus-Aufgabe hat zwei passende Minus-Aufgaben!',
    ],
    example: {
      question: 'Finde alle Aufgaben, die zu 5 + 3 = 8 gehören.',
      steps: [
        'Die Tauschaufgabe: 3 + 5 = 8.',
        'Die erste Umkehraufgabe: 8 − 3 = 5.',
        'Die zweite Umkehraufgabe: 8 − 5 = 3.',
      ],
      answer: '3 + 5 = 8, 8 − 3 = 5, 8 − 5 = 3',
    },
    tips: [
      'Nutze Umkehraufgaben zum Überprüfen: Wenn 6 + 3 = 9, dann muss 9 − 3 = 6 sein!',
      'Aus einer Plus-Aufgabe bekommst du immer 3 weitere Aufgaben — das ist praktisch!',
    ],
    pitfalls: [
      'Tauschen geht nur bei Plus! Bei Minus darfst du NICHT tauschen: 8 − 3 ist nicht das Gleiche wie 3 − 8.',
    ],
  },

  'k1-rechengeschichten': {
    concepts: [
      'In Rechengeschichten ist eine Matheaufgabe in einer kleinen Geschichte versteckt!',
      'Wörter wie "dazubekommen", "mehr" oder "geschenkt" bedeuten Plus (+).',
      'Wörter wie "verloren", "weggegeben" oder "weniger" bedeuten Minus (−).',
      'Schreibe zuerst die Rechenaufgabe auf, dann rechne sie aus.',
    ],
    example: {
      question: 'Tim hat 6 Äpfel. Er bekommt von Lena 5 dazu. Wie viele Äpfel hat Tim jetzt?',
      steps: [
        'Tim hat am Anfang 6 Äpfel.',
        '"Dazubekommen" heißt Plus: 6 + 5.',
        '6 + 5 = 11.',
      ],
      answer: 'Tim hat jetzt 11 Äpfel.',
    },
    tips: [
      'Unterstreiche die Zahlen und die wichtigen Wörter in der Geschichte.',
      'Schreibe einen Antwortsatz: "Tim hat jetzt 11 Äpfel."',
    ],
    pitfalls: [
      'Lies die Aufgabe bis zum Ende durch — manchmal gibt es zwei Rechenschritte!',
      'Vergiss den Antwortsatz nicht!',
    ],
  },

  'k1-lagebeziehungen': {
    concepts: [
      'Lagebeziehungen beschreiben, wo etwas ist: oben/unten, links/rechts, vor/hinter, neben.',
      'Links ist die Seite, wo die meisten Kinder NICHT schreiben.',
      'Rechts ist die Seite, wo die meisten Kinder schreiben.',
      'Ob etwas links oder rechts ist, hängt davon ab, wo du stehst und hinschaust!',
    ],
    example: {
      question: 'Wo liegt der Ball? Er liegt unter dem Tisch, rechts neben dem Stuhl.',
      steps: [
        '"Unter dem Tisch" — der Ball ist tiefer als der Tisch.',
        '"Rechts neben dem Stuhl" — der Ball ist auf der rechten Seite vom Stuhl.',
        'Jetzt weißt du genau, wo der Ball liegt!',
      ],
      answer: 'Der Ball liegt unter dem Tisch und rechts neben dem Stuhl.',
    },
    tips: [
      'Hebe deine Schreibhand hoch — das ist rechts! Die andere Seite ist links.',
      'Benutze Wörter wie "neben", "zwischen", "über" und "unter", um Lagen genau zu beschreiben.',
    ],
    pitfalls: [
      'Wenn du jemandem gegenüberstehst, ist sein Rechts dein Links! Achte darauf, von wo du schaust.',
    ],
  },

  'k1-muster-und-strukturen': {
    concepts: [
      'Ein Muster ist etwas, das sich immer wieder wiederholt. Zum Beispiel: rot, blau, rot, blau, rot, blau.',
      'Muster erkennst du und führst sie weiter: Was kommt als Nächstes?',
      'Muster gibt es überall: bei Farben, Formen, Zahlen oder Klatschen.',
    ],
    example: {
      question: 'Wie geht das Muster weiter? Kreis, Dreieck, Kreis, Dreieck, Kreis, ...',
      steps: [
        'Schau: Was wiederholt sich? Kreis und Dreieck wechseln sich ab.',
        'Das Muster hat 2 Teile: Kreis, Dreieck.',
        'Nach dem Kreis kommt wieder ein Dreieck!',
      ],
      answer: 'Das Nächste ist ein Dreieck.',
    },
    tips: [
      'Sprich das Muster laut oder klatsche dazu — so hörst du die Wiederholung gut.',
      'Schreibe das Muster auf und umrahme den Teil, der sich wiederholt.',
    ],
    pitfalls: [
      'Manchmal wiederholen sich 3 oder mehr Dinge! Schau genau, wie lang der Teil ist, der sich wiederholt.',
    ],
  },

  'k1-geld-euro-cent': {
    concepts: [
      'Wir bezahlen mit Euro (€) und Cent (ct). 1 Euro = 100 Cent.',
      'Münzen: 1 ct, 2 ct, 5 ct, 10 ct, 20 ct, 50 ct, 1 € und 2 €.',
      'Scheine: 5 €, 10 €, 20 € und mehr.',
      'Beim Bezahlen zähle zuerst die Euro, dann die Cent zusammen.',
    ],
    example: {
      question: 'Du hast eine 2-Euro-Münze und drei 10-Cent-Münzen. Wie viel Geld hast du?',
      steps: [
        'Euro zählen: 2 €.',
        'Cent zählen: 3 × 10 ct = 30 ct.',
        'Zusammen: 2 € und 30 ct = 2,30 €.',
      ],
      answer: 'Du hast 2,30 €.',
    },
    tips: [
      'Sortiere die Münzen: erst die großen, dann die kleinen. So kannst du leichter zählen.',
      'Lege die Münzen in eine Reihe und zähle sie der Reihe nach zusammen.',
    ],
    pitfalls: [
      'Verwechsle nicht Euro und Cent! 2 Euro (= 200 Cent) ist viel mehr als 2 Cent.',
      'Ein Komma trennt Euro und Cent: 1,50 € heißt 1 Euro und 50 Cent.',
    ],
  },

  'k1-uhrzeit-volle-stunden': {
    concepts: [
      'Die Uhr hat zwei Zeiger: Der kurze Zeiger zeigt die Stunde, der lange Zeiger zeigt die Minuten.',
      'Wenn der lange Zeiger oben auf der 12 steht, ist es genau eine volle Stunde.',
      'Dann schaust du, wo der kurze Zeiger steht — das ist die Uhrzeit!',
    ],
    example: {
      question: 'Der kurze Zeiger zeigt auf die 8, der lange auf die 12. Wie spät ist es?',
      steps: [
        'Der lange Zeiger steht auf der 12 — das bedeutet: volle Stunde!',
        'Der kurze Zeiger zeigt auf die 8.',
        'Es ist 8 Uhr.',
      ],
      answer: 'Es ist 8 Uhr.',
    },
    tips: [
      'Merke: Der KURZE Zeiger zeigt die Stunde — so wie ein kurzes Wort "Uhr".',
      'Übe mit einer echten Uhr oder einer Basteluhre, die du selbst drehen kannst.',
    ],
    pitfalls: [
      'Verwechsle nicht kurz und lang! Der kurze Zeiger = Stunden, der lange Zeiger = Minuten.',
      'Bei vollen Stunden steht der lange Zeiger immer genau auf der 12.',
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

  'k2-addition-subtraktion-bis-100': {
    concepts: [
      'Im Zahlenraum bis 100 kannst du Plus und Minus rechnen — mit Zehnern und Einern.',
      'Schrittweise rechnen: Erst die Zehner, dann die Einer. 34 + 25 = 34 + 20 + 5 = 54 + 5 = 59.',
      'Beim Minus mit Zehneruebergang hilft der Umweg: 62 − 37 → 62 − 30 = 32, dann 32 − 7 = 25.',
      'Plus und Minus sind Umkehrungen voneinander. Mit Plus kannst du ein Minus pruefen: 25 + 37 = 62.',
    ],
    example: {
      question: '63 − 28 = ?',
      steps: [
        'Erst die Zehner abziehen: 63 − 20 = 43.',
        'Dann die Einer abziehen: 43 − 8 = 35.',
        'Probe mit Plus: 35 + 28 = 63. Stimmt!',
      ],
      answer: '63 − 28 = 35',
    },
    tips: [
      'Rechne schrittweise und schreibe die Zwischenergebnisse auf — dann machst du weniger Fehler.',
      'Pruefe dein Ergebnis mit der Umkehraufgabe: Minus pruefen mit Plus!',
    ],
    pitfalls: [
      'Wenn die Einer nicht reichen (z.B. 3 − 8), darfst du nicht einfach 8 − 3 rechnen! Du musst einen Zehner aufbrechen.',
      'Vergiss nicht: 63 − 28 ist nicht dasselbe wie 28 − 63. Die Reihenfolge ist wichtig!',
    ],
  },

  'k2-einmaleins': {
    concepts: [
      'Das Einmaleins bedeutet: eine Zahl wird mehrmals hinzugezaehlt. 3 × 4 = 4 + 4 + 4 = 12.',
      'Du lernst alle Reihen von 1 bis 10. Jede Reihe hat ein Muster — entdecke es!',
      'Tauschaufgaben: 3 × 4 = 4 × 3. Die Reihenfolge der Faktoren aendert das Ergebnis nicht.',
      'Wenn du eine Aufgabe nicht weisst, leite sie ab: 7 × 6 = 7 × 5 + 7 × 1 = 35 + 7 = 42.',
    ],
    example: {
      question: '8 × 7 = ?',
      steps: [
        'Du kennst 8 × 5 = 40 (5er-Reihe).',
        'Rechne noch 8 × 2 dazu: 8 × 2 = 16.',
        '40 + 16 = 56.',
      ],
      answer: '8 × 7 = 56',
    },
    tips: [
      'Lerne die Einmaleins-Reihen in kleinen Gruppen. Fange mit 2, 5 und 10 an — die sind am einfachsten!',
      'Bastle Einmaleins-Karten und uebt taeglich ein paar Minuten. Wiederholung macht den Meister!',
    ],
    pitfalls: [
      'Verwechsle nicht Mal und Plus: 4 × 3 = 12, aber 4 + 3 = 7. Das ist ein grosser Unterschied!',
      'Nicht schummeln und raten — lieber langsam ableiten als schnell falsch raten.',
    ],
  },

  'k2-uhrzeiten': {
    concepts: [
      'Die Uhr hat einen kurzen Stundenzeiger und einen langen Minutenzeiger.',
      'Der lange Zeiger auf der 3 bedeutet 15 Minuten (Viertel nach). Auf der 6 bedeutet er 30 Minuten (halb). Auf der 9 bedeutet er 45 Minuten (Viertel vor).',
      'Viertel nach 8 = 8:15 Uhr. Halb neun = 8:30 Uhr. Viertel vor neun = 8:45 Uhr.',
      'Der kurze Zeiger wandert langsam. Bei "halb" steht er zwischen zwei Zahlen.',
    ],
    example: {
      question: 'Der kurze Zeiger steht zwischen 3 und 4, der lange auf der 6. Wie spät ist es?',
      steps: [
        'Der lange Zeiger auf der 6 bedeutet: 30 Minuten (halb).',
        'Der kurze Zeiger ist zwischen 3 und 4 — er hat die 3 schon passiert.',
        'Es ist halb vier = 3:30 Uhr.',
      ],
      answer: 'Es ist halb vier (3:30 Uhr).',
    },
    tips: [
      'Merke die vier Positionen des langen Zeigers: oben (12) = volle Stunde, rechts (3) = Viertel nach, unten (6) = halb, links (9) = Viertel vor.',
      'Uebt mit einer echten Uhr zuhause — das macht am meisten Spass!',
    ],
    pitfalls: [
      'Bei "halb" schaust du auf die Stunde, die ALS NAECHSTES kommt — nicht die, die gerade war! Halb vier = 3:30, nicht 4:30.',
      'Verwechsle nicht den kurzen und den langen Zeiger! Kurz = Stunden, lang = Minuten.',
    ],
  },

  'k2-laengen': {
    concepts: [
      'Laengen messen wir mit einem Lineal oder Meterstab. Die wichtigsten Einheiten sind Zentimeter (cm) und Meter (m).',
      '1 Meter = 100 Zentimeter. Ein Meterstab ist genau 1 Meter lang.',
      'Ein Finger ist ungefaehr 1 cm breit. Die Schultuer ist ungefaehr 2 m hoch.',
      'Beim Messen legst du das Lineal genau an den Anfang des Gegenstands — Null muss genau am Rand sein!',
    ],
    example: {
      question: 'Ein Bleistift ist 14 cm lang, ein Radiergummi ist 45 mm lang. Was ist laenger?',
      steps: [
        'Rechne alles in cm um: 45 mm = 4,5 cm (10 mm = 1 cm).',
        'Vergleiche: 14 cm und 4,5 cm.',
        '14 cm > 4,5 cm — der Bleistift ist laenger.',
      ],
      answer: 'Der Bleistift ist laenger (14 cm > 4,5 cm).',
    },
    tips: [
      'Schaetze zuerst! Ist der Gegenstand kuerzer oder laenger als dein kleiner Finger? Das sind ungefaehr 5 cm.',
      'Beim Addieren von Laengen: Immer zuerst in die gleiche Einheit umrechnen!',
    ],
    pitfalls: [
      'Lege das Lineal immer bei der 0 an — nicht beim Rand des Lineals! Manche Lineale haben einen kleinen Abstand vor der 0.',
      'Verwechsle nicht cm und mm! 10 mm = 1 cm. Ein Millimeter ist sehr klein.',
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
