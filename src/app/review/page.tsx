'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';
import { buildReviewSession } from '@/lib/spaced-repetition/scheduler';
import { generateExercise } from '@/lib/math-engine/generators';
import { evaluateAnswer } from '@/lib/exercise/evaluator';
import { advanceCard, resetCard } from '@/lib/spaced-repetition/leitner';
import { calculateXP } from '@/lib/adaptive/mastery-tracker';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { InputExercise } from '@/components/exercises/InputExercise';
import { MCExercise } from '@/components/exercises/MCExercise';
import { CorrectFeedback } from '@/components/feedback/CorrectFeedback';
import { WrongFeedback } from '@/components/feedback/WrongFeedback';
import { findTopicById } from '@/lib/curriculum/merge';
import type { Exercise } from '@/lib/curriculum/types';

export default function ReviewPage() {
  const router = useRouter();
  const { leitnerCards, progress, updateLeitnerCard, addXP, updateTopicProgress } = useProgressStore();

  const [session, setSession] = useState<ReturnType<typeof buildReviewSession> | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    const s = buildReviewSession(leitnerCards);
    setSession(s);

    if (s.dueCards.length > 0) {
      const firstCard = s.dueCards[0];
      const exercise = generateExercise(firstCard.topicId);
      setCurrentExercise(exercise);
    }
  }, [leitnerCards]);

  if (!session || session.totalDue === 0) {
    return (
      <PageWrapper>
        <Card className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Alles wiederholt!</h1>
          <p className="text-gray-500 mb-6">
            Du hast keine fälligen Karten. Komm morgen wieder!
            {session?.nextReviewDate && (
              <> Nächste Wiederholung: <strong>{session.nextReviewDate.toLocaleDateString('de-DE')}</strong></>
            )}
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Zur Übersicht
          </Button>
        </Card>
      </PageWrapper>
    );
  }

  if (done) {
    return (
      <PageWrapper>
        <Card className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Wiederholung abgeschlossen!</h1>
          <p className="text-gray-500 mb-2">
            <strong className="text-emerald-600">{score.correct}</strong> von <strong>{score.total}</strong> richtig
          </p>
          <div className="flex gap-3 mt-6">
            <Button variant="ghost" fullWidth onClick={() => router.push('/daily-mix')}>
              Tagesmix
            </Button>
            <Button fullWidth onClick={() => router.push('/dashboard')}>
              Zur Übersicht
            </Button>
          </div>
        </Card>
      </PageWrapper>
    );
  }

  const currentCard = session.dueCards[currentCardIndex];
  const topic = currentCard ? findTopicById(currentCard.topicId) : null;

  const handleSubmit = (answer: string) => {
    if (!currentExercise || !currentCard) return;

    const isCorrect = evaluateAnswer(answer, currentExercise.correctAnswer, currentExercise.answerType);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));

    const xp = calculateXP({ isCorrect, difficulty: currentExercise.difficulty, hintsUsed: 0, timeSeconds: 15, isFirstAttempt: true });
    if (xp > 0) addXP(xp);

    // Update Leitner card
    const updatedCard = isCorrect ? advanceCard(currentCard) : resetCard(currentCard);
    updateLeitnerCard(updatedCard);

    // Update topic progress
    const tp = progress?.topicProgress[currentCard.topicId];
    updateTopicProgress(currentCard.topicId, {
      attemptsTotal: (tp?.attemptsTotal ?? 0) + 1,
      attemptsCorrect: (tp?.attemptsCorrect ?? 0) + (isCorrect ? 1 : 0),
    });
  };

  const handleNext = () => {
    setFeedback(null);
    setUserAnswer('');

    const nextIndex = currentCardIndex + 1;
    if (nextIndex >= session.dueCards.length) {
      setDone(true);
    } else {
      const nextCard = session.dueCards[nextIndex];
      const nextExercise = generateExercise(nextCard.topicId);
      setCurrentExercise(nextExercise);
      setCurrentCardIndex(nextIndex);
    }
  };

  return (
    <PageWrapper>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Wiederholung</span>
            <Badge variant={currentCard.box <= 2 ? 'warning' : 'success'}>
              Box {currentCard.box}
            </Badge>
          </div>
          <span className="text-sm text-gray-500">
            {currentCardIndex + 1} / {session.dueCards.length}
          </span>
        </div>
        <Progress value={currentCardIndex} max={session.dueCards.length} size="sm" />
      </div>

      {topic && (
        <p className="text-sm text-gray-500 mb-3">Thema: <strong>{topic.title}</strong></p>
      )}

      {currentExercise && (
        <>
          {(currentExercise.answerType === 'multiple-choice' || currentExercise.answerType === 'true-false') ? (
            <MCExercise
              exercise={currentExercise}
              onAnswer={handleSubmit}
              disabled={!!feedback}
              selectedAnswer={userAnswer}
              onSelect={setUserAnswer}
            />
          ) : (
            <InputExercise
              exercise={currentExercise}
              value={userAnswer}
              onChange={setUserAnswer}
              onSubmit={() => handleSubmit(userAnswer)}
              disabled={!!feedback}
            />
          )}

          {feedback === 'correct' && (
            <CorrectFeedback explanation={currentExercise.explanation} onNext={handleNext} />
          )}
          {feedback === 'wrong' && (
            <WrongFeedback
              correctAnswer={String(currentExercise.correctAnswer)}
              explanation={currentExercise.explanation}
              onNext={handleNext}
            />
          )}
        </>
      )}
    </PageWrapper>
  );
}
