import type { Exercise, ExerciseType, AnswerType } from '@/lib/curriculum/types';

const ANSWER_TYPE_TO_EXERCISE_TYPE: Record<AnswerType, ExerciseType> = {
  'number': 'number-input',
  'fraction': 'number-input',
  'text': 'text-input',
  'multiple-choice': 'multiple-choice',
  'true-false': 'true-false',
  'drag-drop': 'drag-sort',
  'matching': 'drag-match',
};

export function resolveExerciseType(exercise: Exercise): ExerciseType {
  if (exercise.exerciseType) return exercise.exerciseType;
  return ANSWER_TYPE_TO_EXERCISE_TYPE[exercise.answerType] ?? 'number-input';
}
