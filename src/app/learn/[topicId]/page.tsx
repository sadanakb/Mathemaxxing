'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { findTopicById } from '@/lib/curriculum/merge';
import { generateExercise } from '@/lib/math-engine/generators';
import { evaluateExerciseAnswer } from '@/lib/exercise/evaluator';
import { useProgressStore } from '@/store/progressStore';
import { useCurrentTheme } from '@/store/curriculumStore';
import { THEMES } from '@/lib/theme/theme-config';
import { createCard, advanceCard, resetCard } from '@/lib/spaced-repetition/leitner';
import { calculateXP, adaptDifficulty } from '@/lib/adaptive/mastery-tracker';
import { calculateStars } from '@/lib/gamification/stars';
import { getTheory } from '@/data/theory';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ExerciseRouter } from '@/components/exercises/ExerciseRouter';
import { CorrectFeedback } from '@/components/feedback/CorrectFeedback';
import { WrongFeedback } from '@/components/feedback/WrongFeedback';
import { GamificationOverlay } from '@/components/gamification/GamificationOverlay';
import { Stars } from '@/components/gamification/Stars';
import { Finn } from '@/components/gamification/Finn';
import { Confetti } from '@/components/gamification/Confetti';
import { ExerciseVisual } from '@/components/exercises/ExerciseVisual';
import { useSessionStore } from '@/store/sessionStore';
import type { Exercise } from '@/lib/curriculum/types';

const QUIZ_SIZE = 10;

type Phase = 'theory' | 'quiz' | 'results';

export default function LearnTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const { updateTopicProgress, addXP, updateStreak, updateLeitnerCard, leitnerCards, progress, addMinutesToday } = useProgressStore();
  const { startSession, recordExerciseCompleted, exercisesCompletedThisSession, xpEarnedThisSession, sessionStartTime } = useSessionStore();

  const topic = findTopicById(topicId);
  const theme = useCurrentTheme();
  const showMascot = THEMES[theme].mascot;
  const [phase, setPhase] = useState<Phase>('theory');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [recentResults, setRecentResults] = useState<boolean[]>([]);

  useEffect(() => {
    if (phase === 'quiz') {
      startSession(topicId);
      const first = generateExercise(topicId, 1);
      setExercises(first ? [first] : []);
      setCurrentIndex(0);
      setScore({ correct: 0, total: 0 });
      setDifficulty(1);
      setRecentResults([]);
    }
  }, [phase, topicId, startSession]);

  // Track minutes for daily goal during quiz
  useEffect(() => {
    if (phase !== 'quiz') return;
    const interval = setInterval(() => {
      addMinutesToday(1);
    }, 60_000);
    return () => clearInterval(interval);
  }, [phase, addMinutesToday]);

  if (!topic) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-gray-500">Thema nicht gefunden.</p>
          <Link href="/dashboard" className="text-[var(--color-primary)] mt-4 inline-block">
            ← Zurück zur Übersicht
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const currentExercise = exercises[currentIndex];

  const handleSubmit = (answer: string) => {
    if (!currentExercise) return;

    const isCorrect = evaluateExerciseAnswer(answer, currentExercise);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    const xp = calculateXP({
      isCorrect,
      difficulty: currentExercise.difficulty,
      hintsUsed,
      timeSeconds: 20,
      isFirstAttempt: hintsUsed === 0,
    });

    // Update progress
    const tp = progress?.topicProgress[topicId];
    updateTopicProgress(topicId, {
      attemptsTotal: (tp?.attemptsTotal ?? 0) + 1,
      attemptsCorrect: (tp?.attemptsCorrect ?? 0) + (isCorrect ? 1 : 0),
    });

    if (xp > 0) addXP(xp);
    recordExerciseCompleted(xp);

    // Update Leitner card
    const existingCard = leitnerCards.find((c) => c.topicId === topicId);
    const card = existingCard ?? createCard(topicId);
    updateLeitnerCard(isCorrect ? advanceCard(card) : resetCard(card));

    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));

    // Track recent results for adaptive difficulty (last 5)
    setRecentResults((prev) => [...prev.slice(-4), isCorrect]);
  };

  const handleNext = () => {
    setFeedback(null);
    setUserAnswer('');
    setShowHint(false);
    setHintsUsed(0);

    if (currentIndex + 1 >= QUIZ_SIZE) {
      // Quiz complete
      const finalScore = score.correct / QUIZ_SIZE;
      const stars = calculateStars(finalScore);
      if (finalScore >= 0.8) {
        updateTopicProgress(topicId, {
          masteryLevel: 'mastered',
          postQuizScore: finalScore,
          stars,
        });
      } else {
        updateTopicProgress(topicId, {
          masteryLevel: 'practicing',
          postQuizScore: finalScore,
          stars,
        });
      }
      updateStreak();
      setPhase('results');
    } else {
      // Adapt difficulty based on recent performance
      const recentRate = recentResults.length > 0
        ? recentResults.filter(Boolean).length / recentResults.length
        : 0.5;
      const nextDifficulty = adaptDifficulty(difficulty, recentRate);
      setDifficulty(nextDifficulty);

      // Generate next exercise with adapted difficulty
      const next = generateExercise(topicId, nextDifficulty);
      if (next) {
        setExercises((prev) => [...prev, next]);
      }
      setCurrentIndex((i) => i + 1);
    }
  };

  // ── Theory Phase ──────────────────────────────────────────
  if (phase === 'theory') {
    const theory = getTheory(topicId);

    return (
      <PageWrapper>
        <div className="mb-4">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Zurück
          </Link>
        </div>

        <Card className="mb-4">
          <h1 className="text-2xl font-[var(--heading-weight)] text-gray-900 mb-2">{topic.title}</h1>
          <p className="text-gray-600 mb-2">{topic.description}</p>
          <p className="text-sm text-gray-500">
            Lernbereich: <strong>{topic.lernbereich}</strong> ·
            Geschätzte Zeit: <strong>~{topic.estimatedMinutes} Minuten</strong>
          </p>
        </Card>

        {theory ? (
          <>
            {/* Concepts */}
            <Card className="mb-4">
              <h2 className="font-[var(--heading-weight)] text-gray-900 mb-3">📚 Das Wichtigste</h2>
              <ul className="space-y-2">
                {theory.concepts.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-[var(--color-primary)] font-bold mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Worked Example */}
            {theory.example && (
              <Card className="mb-4 bg-[var(--primary-lighter)] border border-[var(--color-primary)]/15">
                <h2 className="font-[var(--heading-weight)] text-gray-900 mb-3">✏️ Beispielaufgabe</h2>
                <p className="font-semibold text-gray-800 mb-3">{theory.example.question}</p>
                <ol className="space-y-2 mb-3">
                  {theory.example.steps.map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="bg-[var(--color-primary)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="bg-[var(--color-surface)] rounded-[var(--btn-radius)] p-3 border border-[var(--color-primary)]/20">
                  <p className="font-semibold text-[var(--color-primary)]">{theory.example.answer}</p>
                </div>
              </Card>
            )}

            {/* Tips & Pitfalls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {theory.tips && theory.tips.length > 0 && (
                <Card className="bg-emerald-50 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-800 mb-2">💡 Tipps</h3>
                  {theory.tips.map((tip, i) => (
                    <p key={i} className="text-sm text-emerald-700">{tip}</p>
                  ))}
                </Card>
              )}
              {theory.pitfalls && theory.pitfalls.length > 0 && (
                <Card className="bg-amber-50 border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">⚠️ Typische Fehler</h3>
                  {theory.pitfalls.map((p, i) => (
                    <p key={i} className="text-sm text-amber-700">{p}</p>
                  ))}
                </Card>
              )}
            </div>
          </>
        ) : (
          <Card className="mb-4 bg-[var(--primary-lighter)] border border-[var(--color-primary)]/15">
            <h2 className="font-semibold text-[var(--color-primary)] mb-2">📚 Was lernst du hier?</h2>
            <p className="text-gray-700 text-sm">{topic.description}</p>
          </Card>
        )}

        <Button fullWidth onClick={() => setPhase('quiz')} size="lg">
          Quiz starten (10 Fragen) 🎯
        </Button>
      </PageWrapper>
    );
  }

  // ── Results Phase ─────────────────────────────────────────
  if (phase === 'results') {
    const pct = Math.round((score.correct / QUIZ_SIZE) * 100);
    const passed = pct >= 80;
    const resultStars = calculateStars(score.correct / QUIZ_SIZE);

    return (
      <PageWrapper>
        <GamificationOverlay />
        <Confetti active={passed} duration={4000} />

        <Card className="text-center relative">
          {/* Finn Mascot (Grundschule only) */}
          {showMascot && (
            <div className="flex justify-center mb-4">
              <Finn
                mood={passed ? 'celebrating' : resultStars >= 1 ? 'encouraging' : 'sad'}
                size="lg"
                message={passed ? 'Super gemacht!' : resultStars >= 1 ? 'Weiter so!' : 'Versuch es nochmal!'}
              />
            </div>
          )}

          <h1 className="text-2xl font-[var(--heading-weight)] text-gray-900 mb-2">
            {passed ? 'Gemeistert!' : 'Weiter üben!'}
          </h1>

          {/* Stars */}
          <div className="flex justify-center mb-4">
            <Stars count={resultStars} size="lg" showEmpty />
          </div>

          <p className="text-gray-600 mb-4">
            Du hast <strong>{score.correct} von {QUIZ_SIZE}</strong> Aufgaben richtig beantwortet.
          </p>

          <Progress
            value={pct}
            label="Quiz-Ergebnis"
            showLabel
            variant={passed ? 'success' : 'warning'}
            size="lg"
          />

          {/* Session-Statistik */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold text-[var(--color-primary)]">{exercisesCompletedThisSession}</div>
              <div className="text-xs text-gray-500">Aufgaben</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold text-amber-500">+{xpEarnedThisSession}</div>
              <div className="text-xs text-gray-500">XP verdient</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold text-emerald-600">
                {sessionStartTime ? Math.round((Date.now() - new Date(sessionStartTime).getTime()) / 60000) : 0} min
              </div>
              <div className="text-xs text-gray-500">Dauer</div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="ghost" fullWidth onClick={() => setPhase('quiz')}>
              Nochmal üben
            </Button>
            <Button fullWidth onClick={() => router.push('/dashboard')}>
              Zur Übersicht
            </Button>
          </div>
        </Card>
      </PageWrapper>
    );
  }

  // ── Quiz Phase ────────────────────────────────────────────
  return (
    <PageWrapper>
      <GamificationOverlay />
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">
            {topic.title} — Frage {currentIndex + 1} / {QUIZ_SIZE}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {'⬟'.repeat(difficulty)}{'⬡'.repeat(3 - difficulty)}
            </span>
            <span className="text-sm font-semibold text-emerald-600">
              ✓ {score.correct} richtig
            </span>
          </div>
        </div>
        <Progress value={currentIndex} max={QUIZ_SIZE} size="sm" />
      </div>

      {currentExercise && (
        <div>
          {/* Visual (if configured) */}
          {currentExercise.visualConfig && (
            <ExerciseVisual config={currentExercise.visualConfig} />
          )}

          {/* Exercise Card */}
          <ExerciseRouter
            exercise={currentExercise}
            userAnswer={userAnswer}
            onAnswerChange={setUserAnswer}
            onSubmit={handleSubmit}
            disabled={!!feedback}
            showHint={showHint}
            onShowHint={() => { setShowHint(true); setHintsUsed((h) => h + 1); }}
          />

          {/* Feedback */}
          {feedback === 'correct' && (
            <CorrectFeedback
              explanation={currentExercise.explanation}
              onNext={handleNext}
            />
          )}
          {feedback === 'wrong' && (
            <WrongFeedback
              correctAnswer={String(currentExercise.correctAnswer)}
              correctAnswerLatex={currentExercise.correctAnswerLatex}
              explanation={currentExercise.explanation}
              onNext={handleNext}
            />
          )}
        </div>
      )}
    </PageWrapper>
  );
}
