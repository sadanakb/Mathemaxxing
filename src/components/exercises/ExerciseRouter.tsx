'use client';

import { Suspense, lazy } from 'react';
import type { Exercise } from '@/lib/curriculum/types';
import { resolveExerciseType } from '@/lib/exercise/type-resolver';

// Common types: static import for instant loading
import { InputExercise } from './InputExercise';
import { MCExercise } from './MCExercise';
import { TrueFalseExercise } from './TrueFalseExercise';

// Less common: lazy-loaded for smaller initial bundle
const DragSort = lazy(() => import('./DragSort').then(m => ({ default: m.DragSort })));
const DragMatch = lazy(() => import('./DragMatch').then(m => ({ default: m.DragMatch })));
const DragIntoGaps = lazy(() => import('./DragIntoGaps').then(m => ({ default: m.DragIntoGaps })));
const DragOntoNumberline = lazy(() => import('./DragOntoNumberline').then(m => ({ default: m.DragOntoNumberline })));
const DragOntoGrid = lazy(() => import('./DragOntoGrid').then(m => ({ default: m.DragOntoGrid })));
const Classify = lazy(() => import('./Classify').then(m => ({ default: m.Classify })));
const FractionVisualExercise = lazy(() => import('./FractionVisualExercise').then(m => ({ default: m.FractionVisualExercise })));
const PlaceValueTable = lazy(() => import('./PlaceValueTable').then(m => ({ default: m.PlaceValueTable })));
const CalculationPyramid = lazy(() => import('./CalculationPyramid').then(m => ({ default: m.CalculationPyramid })));
const NumberMachine = lazy(() => import('./NumberMachine').then(m => ({ default: m.NumberMachine })));
const EquationBalance = lazy(() => import('./EquationBalance').then(m => ({ default: m.EquationBalance })));
const ClockDragExercise = lazy(() => import('./ClockDragExercise').then(m => ({ default: m.ClockDragExercise })));
const MirrorDraw = lazy(() => import('./MirrorDraw').then(m => ({ default: m.MirrorDraw })));
const AreaCount = lazy(() => import('./AreaCount').then(m => ({ default: m.AreaCount })));
const AngleMeasure = lazy(() => import('./AngleMeasure').then(m => ({ default: m.AngleMeasure })));
const GraphDraw = lazy(() => import('./GraphDraw').then(m => ({ default: m.GraphDraw })));
const MultipleSelect = lazy(() => import('./MultipleSelect').then(m => ({ default: m.MultipleSelect })));
const SpeedQuiz = lazy(() => import('./SpeedQuiz').then(m => ({ default: m.SpeedQuiz })));
const Estimation = lazy(() => import('./Estimation').then(m => ({ default: m.Estimation })));
const FillTable = lazy(() => import('./FillTable').then(m => ({ default: m.FillTable })));
const MemoryPairs = lazy(() => import('./MemoryPairs').then(m => ({ default: m.MemoryPairs })));
const BarChartRead = lazy(() => import('./BarChartRead').then(m => ({ default: m.BarChartRead })));

function ExerciseFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[var(--color-primary)]/60 font-medium">Lade Aufgabe...</span>
      </div>
    </div>
  );
}

type ExerciseRouterProps = {
  exercise: Exercise;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: (answer: string) => void;
  disabled: boolean;
  showHint: boolean;
  onShowHint: () => void;
};

export function ExerciseRouter(props: ExerciseRouterProps) {
  const type = resolveExerciseType(props.exercise);

  // Common types rendered without Suspense
  switch (type) {
    case 'multiple-choice':
      return (
        <MCExercise
          exercise={props.exercise}
          onAnswer={props.onSubmit}
          disabled={props.disabled}
          selectedAnswer={props.userAnswer}
          onSelect={props.onAnswerChange}
        />
      );

    case 'true-false':
      return <TrueFalseExercise exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;

    case 'number-input':
    case 'text-input':
      return (
        <InputExercise
          exercise={props.exercise}
          value={props.userAnswer}
          onChange={props.onAnswerChange}
          onSubmit={() => props.onSubmit(props.userAnswer)}
          disabled={props.disabled}
          showHint={props.showHint}
          onShowHint={props.onShowHint}
        />
      );
  }

  // Lazy-loaded types wrapped in Suspense
  return (
    <Suspense fallback={<ExerciseFallback />}>
      {renderLazyExercise(type, props)}
    </Suspense>
  );
}

function renderLazyExercise(type: string, props: ExerciseRouterProps) {
  switch (type) {
    case 'drag-sort':
      return <DragSort exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'drag-match':
      return <DragMatch exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'drag-into-gaps':
      return <DragIntoGaps exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'drag-onto-numberline':
      return <DragOntoNumberline exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'drag-onto-grid':
      return <DragOntoGrid exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'classify':
      return <Classify exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'fraction-visual':
      return <FractionVisualExercise exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'place-value-table':
      return <PlaceValueTable exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'calculation-pyramid':
      return <CalculationPyramid exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'number-machine':
      return <NumberMachine exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'equation-balance':
      return <EquationBalance exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'clock-drag':
      return <ClockDragExercise exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'mirror-draw':
      return <MirrorDraw exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'area-count':
      return <AreaCount exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'angle-measure':
      return <AngleMeasure exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'graph-draw':
      return <GraphDraw exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'multiple-select':
      return <MultipleSelect exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'speed-quiz':
      return <SpeedQuiz exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'estimation':
      return <Estimation exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'fill-table':
      return <FillTable exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'memory-pairs':
      return <MemoryPairs exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'bar-chart-read':
      return <BarChartRead exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    default:
      return (
        <InputExercise
          exercise={props.exercise}
          value={props.userAnswer}
          onChange={props.onAnswerChange}
          onSubmit={() => props.onSubmit(props.userAnswer)}
          disabled={props.disabled}
          showHint={props.showHint}
          onShowHint={props.onShowHint}
        />
      );
  }
}
