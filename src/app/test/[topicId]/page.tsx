'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { findTopicById } from '@/lib/curriculum/merge';
import { generateExercise } from '@/lib/math-engine/generators';
import { evaluateExerciseAnswer } from '@/lib/exercise/evaluator';
import { useProgressStore } from '@/store/progressStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ExerciseRouter } from '@/components/exercises/ExerciseRouter';
import { ExerciseVisual } from '@/components/exercises/ExerciseVisual';
import { TestTimer } from '@/components/test/TestTimer';
import { TestResults } from '@/components/test/TestResults';
import type { Exercise } from '@/lib/curriculum/types';

const TEST_SIZE = 20;
const PASSING_SCORE = 0.75; // 75%
const TEST_TIME_SECONDS = 25 * 60; // 25 Minuten

// Schwierigkeitsverteilung: 6 leicht + 8 mittel + 6 schwer
const DIFFICULTY_DISTRIBUTION: (1 | 2 | 3)[] = [
  1, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 2, 2, 2, 2,
  3, 3, 3, 3, 3, 3,
];

function generateTestExercises(topicId: string): Exercise[] {
  const exercises: Exercise[] = [];
  for (const diff of DIFFICULTY_DISTRIBUTION) {
    const ex = generateExercise(topicId, diff);
    if (ex) exercises.push(ex);
  }
  return exercises;
}

type TestPhase = 'intro' | 'running' | 'results';

export default function TestPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const { updateTestResult, addXP } = useProgressStore();

  const topic = findTopicById(topicId);

  const [phase, setPhase] = useState<TestPhase>('intro');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timedOut, setTimedOut] = useState(false);
  const startTimeRef = useRef<number>(0);

  const currentExercise = exercises[currentIndex] ?? null;

  function startTest() {
    const exs = generateTestExercises(topicId);
    setExercises(exs);
    setCurrentIndex(0);
    setAnswers([]);
    setUserAnswer('');
    setTimedOut(false);
    startTimeRef.current = Date.now();
    setPhase('running');
  }

  function submitAnswer(answerOverride?: string) {
    if (!currentExercise) return;
    const finalAnswer = answerOverride ?? userAnswer;
    const correct = evaluateExerciseAnswer(finalAnswer, currentExercise);
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    setUserAnswer('');

    if (currentIndex + 1 >= exercises.length) {
      finishTest(newAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleTimeUp() {
    setTimedOut(true);
    finishTest(answers);
  }

  function finishTest(finalAnswers: boolean[]) {
    const correct = finalAnswers.filter(Boolean).length;
    const total = exercises.length;
    const score = total > 0 ? correct / total : 0;
    const passed = score >= PASSING_SCORE;

    updateTestResult(topicId, score, passed);
    if (passed) addXP(50); // Bonus-XP fürs Bestehen

    setPhase('results');
  }

  if (!topic) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-gray-500">Thema nicht gefunden.</p>
          <Button onClick={() => router.push('/dashboard')} variant="ghost" className="mt-4">
            Zurück
          </Button>
        </div>
      </PageWrapper>
    );
  }

  if (phase === 'results') {
    const correct = answers.filter(Boolean).length;
    const timeUsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    return (
      <PageWrapper>
        <TestResults
          topicId={topicId}
          topicTitle={topic.title}
          correct={correct}
          total={exercises.length}
          passingScore={PASSING_SCORE}
          timeUsedSeconds={timeUsed}
          onRetry={startTest}
        />
      </PageWrapper>
    );
  }

  if (phase === 'intro') {
    return (
      <PageWrapper>
        <div className="max-w-lg mx-auto py-8">
          {/* Prüfungs-Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📝</div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Prüfungsmodus</h1>
            <p className="text-gray-500 text-sm">Teste dein Wissen zu:</p>
            <h2 className="text-xl font-bold text-[var(--color-primary)] mt-1">{topic.title}</h2>
          </div>

          <Card className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Prüfungsregeln</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">📋</span>
                <span><strong>{TEST_SIZE} Fragen</strong> (6 leicht · 8 mittel · 6 schwer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">⏱</span>
                <span><strong>25 Minuten</strong> Zeit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">✅</span>
                <span><strong>75%</strong> zum Bestehen (15 von 20 richtig)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">🚫</span>
                <span>Keine Hinweise verfügbar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">🔒</span>
                <span>Antworten können nicht zurückgenommen werden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg leading-none">🏆</span>
                <span>+50 XP Bonus bei Bestehen</span>
              </li>
            </ul>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => router.back()} variant="ghost" className="flex-1">
              Abbrechen
            </Button>
            <Button onClick={startTest} variant="primary" className="flex-1 font-bold">
              Prüfung starten
            </Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Running phase
  const progress = (currentIndex / exercises.length) * 100;
  const correctSoFar = answers.filter(Boolean).length;

  return (
    <PageWrapper>
      {/* Prüfungs-Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning">📝 Prüfung</Badge>
            <span className="text-sm text-gray-500 font-medium">
              Frage {currentIndex + 1} / {exercises.length}
            </span>
          </div>
          <p className="text-xs text-gray-400">{topic.title}</p>
        </div>
        <TestTimer
          startSeconds={TEST_TIME_SECONDS}
          onTimeUp={handleTimeUp}
          paused={phase !== 'running'}
        />
      </div>

      {/* Fortschrittsbalken */}
      <div className="mb-5">
        <Progress value={progress} max={100} size="sm" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{correctSoFar} richtig</span>
          <span>{answers.length - correctSoFar} falsch</span>
        </div>
      </div>

      {timedOut && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-center font-semibold">
          ⏰ Zeit abgelaufen! Prüfung wird ausgewertet...
        </div>
      )}

      {/* Aufgabe */}
      {currentExercise && !timedOut && (
        <Card className="mb-5">
          {/* Schwierigkeits-Indikator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {[1, 2, 3].map((d) => (
                <div
                  key={d}
                  className={[
                    'w-2 h-2 rounded-full',
                    d <= currentExercise.difficulty
                      ? currentExercise.difficulty === 1 ? 'bg-emerald-400' : currentExercise.difficulty === 2 ? 'bg-amber-400' : 'bg-red-400'
                      : 'bg-gray-200',
                  ].join(' ')}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {currentExercise.difficulty === 1 ? 'Leicht' : currentExercise.difficulty === 2 ? 'Mittel' : 'Schwer'}
            </span>
          </div>

          {/* Visual */}
          {currentExercise.visualConfig && (
            <div className="mb-4">
              <ExerciseVisual config={currentExercise.visualConfig} />
            </div>
          )}

          {/* Frage */}
          <p className="text-lg font-semibold text-gray-900 mb-4">
            {currentExercise.question}
          </p>

          {/* Antwort-Eingabe */}
          <ExerciseRouter
            exercise={currentExercise}
            userAnswer={userAnswer}
            onAnswerChange={setUserAnswer}
            onSubmit={(ans) => submitAnswer(ans)}
            disabled={false}
            showHint={false}
            onShowHint={() => {/* Keine Hinweise im Prüfungsmodus */}}
          />

          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => submitAnswer()}
              disabled={!userAnswer.trim()}
              variant="primary"
            >
              {currentIndex + 1 >= exercises.length ? 'Prüfung abgeben' : 'Weiter →'}
            </Button>
          </div>
        </Card>
      )}
    </PageWrapper>
  );
}
