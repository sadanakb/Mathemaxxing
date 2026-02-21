// ============================================================
// MatheMeister — Core Domain Types
// ALL domain types live here. Import from '@/lib/curriculum/types'
// ============================================================

// ─── Geo / School System ────────────────────────────────────

export type Bundesland =
  | 'Baden-Württemberg'
  | 'Bayern'
  | 'Berlin'
  | 'Brandenburg'
  | 'Bremen'
  | 'Hamburg'
  | 'Hessen'
  | 'Mecklenburg-Vorpommern'
  | 'Niedersachsen'
  | 'Nordrhein-Westfalen'
  | 'Rheinland-Pfalz'
  | 'Saarland'
  | 'Sachsen'
  | 'Sachsen-Anhalt'
  | 'Schleswig-Holstein'
  | 'Thüringen';

export type Schulform =
  | 'Grundschule'
  | 'Mittelschule'              // Bayern
  | 'Hauptschule'               // BW, Hessen, NL, NRW
  | 'Realschule'                // BW, Bayern, Hessen, NL
  | 'Gymnasium'
  | 'Gesamtschule'              // generic, Kurs-Auswahl needed
  | 'Werkrealschule'            // Baden-Württemberg
  | 'Gemeinschaftsschule'       // BW, Saarland, SH, Sachsen-Anhalt, Thüringen
  | 'Stadtteilschule'           // Hamburg
  | 'Oberschule'                // Brandenburg, Niedersachsen, Bremen, Sachsen
  | 'Sekundarschule'            // Sachsen-Anhalt
  | 'Regelschule'               // Thüringen
  | 'Realschule plus'           // Rheinland-Pfalz
  | 'Integrierte Sekundarschule' // Berlin
  | 'Regionale Schule';         // Mecklenburg-Vorpommern

export type Kurstyp = 'G-Kurs' | 'E-Kurs' | 'keine';

export type Klassenstufe = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// ─── Curriculum Structure ────────────────────────────────────

export type Lernbereich =
  | 'Arithmetik'
  | 'Geometrie'
  | 'Algebra'
  | 'Statistik'
  | 'Wahrscheinlichkeit'
  | 'Sachrechnen'
  | 'Stochastik';

export type Niveaustufe = 'G' | 'M' | 'E'; // Grundlegend / Mittel / Erweitert

export type CurriculumTopic = {
  id: string;
  title: string;
  lernbereich: Lernbereich;
  klasse: Klassenstufe;
  schulformen: Schulform[];          // Which Schulformen include this topic
  kurse?: Kurstyp[];                 // Required if Gesamtschule/Gemeinschaftsschule
  niveaustufe?: Niveaustufe;
  kmkStandard: boolean;              // True = part of KMK baseline
  prerequisites: string[];           // Topic IDs that must be mastered first
  estimatedMinutes: number;
  description: string;
};

export type CurriculumDelta = {
  bundesland: Bundesland;
  topicId?: string;                  // If undefined, applies to all topics of the klasse
  klasse?: Klassenstufe;
  action: 'add' | 'remove' | 'modify';
  topic?: Partial<CurriculumTopic>;  // For 'add' and 'modify'
};

// ─── Exercise System ─────────────────────────────────────────

export type AnswerType =
  | 'number'
  | 'fraction'
  | 'text'
  | 'multiple-choice'
  | 'drag-drop'
  | 'matching'
  | 'true-false';

export type ExerciseType =
  | 'number-input'
  | 'text-input'
  | 'multiple-choice'
  | 'multiple-select'
  | 'true-false'
  | 'drag-sort'
  | 'drag-match'
  | 'drag-into-gaps'
  | 'drag-onto-numberline'
  | 'drag-onto-grid'
  | 'classify'
  | 'fill-table'
  | 'step-by-step'
  | 'estimation'
  | 'clock-drag'
  | 'fraction-visual'
  | 'place-value-table'
  | 'calculation-pyramid'
  | 'number-machine'
  | 'mirror-draw'
  | 'area-count'
  | 'equation-balance'
  | 'speed-quiz'
  | 'memory-pairs'
  | 'bar-chart-read'
  | 'graph-draw'
  | 'angle-measure';

export type ExerciseCategory = 'Konkret' | 'Repräsentational' | 'Abstrakt';

export type VisualType =
  | 'geometric-shape'
  | 'fraction-circle'
  | 'fraction-bar'
  | 'base10-blocks'
  | 'ruler'
  | 'scale'
  | 'thermometer'
  | 'coins'
  | 'pie-chart'
  | 'tally'
  | 'dice'
  | 'protractor'
  | 'cuboid-3d'
  | 'numberline'
  | 'coordinate-system'
  | 'set-diagram';

export type VisualConfig = {
  type: VisualType;
  props: Record<string, unknown>;
};

export type Exercise = {
  id: string;
  topicId: string;
  question: string;
  questionLatex?: string;            // KaTeX representation
  answerType: AnswerType;
  correctAnswer: string | number;
  correctAnswerLatex?: string;
  distractors?: (string | number)[];
  hint?: string;
  explanation?: string;
  difficulty: 1 | 2 | 3;
  category: ExerciseCategory;
  estimatedSeconds: number;
  imagePath?: string;
  visualConfig?: VisualConfig;       // Optional visualization to show with the exercise

  // v3: Exercise type (if not set, inferred from answerType)
  exerciseType?: ExerciseType;

  // Type-specific data (all optional for backward compat)
  items?: string[];
  slots?: string[];
  pairs?: [string, string][];
  categories?: Record<string, string[]>;
  numberlineConfig?: { min: number; max: number; step: number; targets: number[] };
  gridConfig?: { width: number; height: number; points?: { x: number; y: number; label?: string }[] };
  tableConfig?: { headers: string[]; rows: (string | null)[][]; correctRows: string[][] };
  pyramidBase?: number[];
  machineConfig?: { input: number; operation: string; output: number; hidden: 'input' | 'operation' | 'output' };
  timeLimit?: number;
  tolerance?: number;
  clockTarget?: { hours: number; minutes: number };
  fractionConfig?: { total: number; target: number; shape: 'circle' | 'rectangle' };
  mirrorConfig?: { axis: 'vertical' | 'horizontal'; grid: boolean[][] };
  areaGrid?: boolean[][];
  chartData?: { label: string; value: number }[];
  equationConfig?: { left: string; right: string; variable: string; target: number };
  angleTarget?: number;
  options?: string[];
  correctOptions?: string[];
};

export type ExerciseTemplate = {
  topicId: string;
  generate: (difficulty?: 1 | 2 | 3) => Exercise;
};

export type Attempt = {
  id: string;
  exerciseId: string;
  topicId: string;
  userAnswer: string;
  isCorrect: boolean;
  hintsUsed: number;
  timeSeconds: number;
  timestamp: Date;
};

// ─── Spaced Repetition (Leitner) ─────────────────────────────

export type LeitnerCard = {
  topicId: string;
  box: 1 | 2 | 3 | 4 | 5;
  nextReview: Date;
  lastReviewed?: Date;
  consecutiveCorrect: number;
  totalAttempts: number;
  totalCorrect: number;
};

// ─── User Progress ───────────────────────────────────────────

export type MasteryLevel = 'not-started' | 'introduced' | 'practicing' | 'mastered';

export type TopicProgress = {
  topicId: string;
  masteryLevel: MasteryLevel;
  xpEarned: number;
  attemptsTotal: number;
  attemptsCorrect: number;
  lastAttemptDate?: Date;
  preAssessmentScore?: number;
  postQuizScore?: number;
  masteredAt?: Date;
  stars?: 0 | 1 | 2 | 3;
  testScore?: number;        // 0–1 (Anteil richtig)
  testPassedAt?: Date;       // Zeitpunkt des Bestehs
  testAttempts?: number;     // Anzahl Prüfungsversuche
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  condition: AchievementCondition;
};

export type AchievementCondition =
  | { type: 'topics-mastered'; count: number }
  | { type: 'streak-days'; count: number }
  | { type: 'xp-total'; amount: number }
  | { type: 'perfect-quiz'; topicId?: string }
  | { type: 'level-reached'; level: number };

export type Badge = {
  id: string;
  title: string;
  icon: string;
  earnedAt: Date;
};

export type UserProgress = {
  // Schema version — MUST be incremented on breaking changes
  schemaVersion: number;

  // Identity
  userId: string;                    // Random UUID, no auth needed
  createdAt: Date;
  lastActiveAt: Date;

  // Curriculum context (also in curriculumStore, duplicated for export)
  bundesland: Bundesland | null;
  klasse: Klassenstufe | null;
  schulform: Schulform | null;
  kurstyp: Kurstyp;

  // Progress
  topicProgress: Record<string, TopicProgress>;
  leitnerCards: LeitnerCard[];

  // Gamification
  xpTotal: number;
  level: number;
  streakDays: number;
  lastStreakDate: string | null;     // ISO date string (YYYY-MM-DD)
  achievements: Achievement[];
  badges: Badge[];

  // Münz-Economy
  coins: number;
  totalCoinsEarned: number;

  // Settings
  dailyGoalMinutes: number;

  // Aktivitäts-Tracking
  activeDates: string[];          // ISO-Datum-Strings (YYYY-MM-DD), dedupliziert
  todayMinutes: number;           // Heute gelernte Minuten (für GoalRing)
};

// ─── Session (ephemeral, never persisted) ────────────────────

export type SessionState = {
  currentExercise: Exercise | null;
  currentTopicId: string | null;
  sessionStartTime: Date | null;
  exercisesCompletedThisSession: number;
  xpEarnedThisSession: number;
  showHint: boolean;
  animationState: 'idle' | 'correct' | 'incorrect' | 'loading';
};
