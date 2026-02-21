'use client';

import type { Exercise } from '@/lib/curriculum/types';
import { resolveExerciseType } from '@/lib/exercise/type-resolver';
import { InputExercise } from './InputExercise';
import { MCExercise } from './MCExercise';
import { DragSort } from './DragSort';
import { DragMatch } from './DragMatch';
import { DragIntoGaps } from './DragIntoGaps';
import { DragOntoNumberline } from './DragOntoNumberline';
import { DragOntoGrid } from './DragOntoGrid';
import { Classify } from './Classify';
import { FractionVisualExercise } from './FractionVisualExercise';
import { PlaceValueTable } from './PlaceValueTable';
import { CalculationPyramid } from './CalculationPyramid';
import { NumberMachine } from './NumberMachine';
import { EquationBalance } from './EquationBalance';
import { ClockDragExercise } from './ClockDragExercise';
import { MirrorDraw } from './MirrorDraw';
import { AreaCount } from './AreaCount';
import { AngleMeasure } from './AngleMeasure';
import { GraphDraw } from './GraphDraw';
import { MultipleSelect } from './MultipleSelect';
import { TrueFalseExercise } from './TrueFalseExercise';
import { SpeedQuiz } from './SpeedQuiz';
import { Estimation } from './Estimation';
import { FillTable } from './FillTable';
import { MemoryPairs } from './MemoryPairs';
import { BarChartRead } from './BarChartRead';

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

    // Visual/Geometry components
    case 'mirror-draw':
      return <MirrorDraw exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'area-count':
      return <AreaCount exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'angle-measure':
      return <AngleMeasure exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'graph-draw':
      return <GraphDraw exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;

    // Quiz variants
    case 'multiple-select':
      return <MultipleSelect exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'speed-quiz':
      return <SpeedQuiz exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
    case 'estimation':
      return <Estimation exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;

    // Tables & Games
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
