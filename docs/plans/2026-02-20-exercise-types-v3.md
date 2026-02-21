# Exercise Types v3 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 23 missing interactive exercise-type components (Drag&Drop, SVG-interactive, quiz variants, games) to transform MatheMeister from a text-input/MC app into a rich interactive learning platform.

**Architecture:** Each exercise type is a standalone React component under `src/components/exercises/`. An `ExerciseRouter` maps `exercise.exerciseType` to the correct component. The existing `Exercise` type is extended with optional type-specific data fields (backward compatible — all 27 existing generators keep working). SVG-based interactive exercises share reusable primitives from `src/components/exercises/svg/`.

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, SVG + React for interactive graphics, native HTML5 Drag API + `mobile-drag-drop` polyfill for touch, Framer Motion for animations.

---

## Task 1: Extend Exercise Type System

**Files:**
- Modify: `src/lib/curriculum/types.ts`

**Step 1: Add ExerciseType union**

Add after the existing `AnswerType` (line 91):

```typescript
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
```

**Step 2: Extend Exercise type with optional fields**

Add these fields to the existing `Exercise` type (after `imagePath`):

```typescript
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
  mirrorConfig?: { axis: 'vertical' | 'horizontal'; grid: boolean[][]; };
  areaGrid?: boolean[][];
  chartData?: { label: string; value: number }[];
  equationConfig?: { left: string; right: string; variable: string; target: number };
  angleTarget?: number;
  options?: string[];
  correctOptions?: string[];
```

**Step 3: Add type resolver helper**

Create `src/lib/exercise/type-resolver.ts`:

```typescript
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
```

**Step 4: Run type check**

Run: `cd /Users/sadanakb/Mathemaxxing && npx tsc --noEmit`
Expected: PASS (all changes are additive/optional)

**Step 5: Commit**

```bash
git add src/lib/curriculum/types.ts src/lib/exercise/type-resolver.ts
git commit -m "feat: extend Exercise type with ExerciseType union and type-specific data fields"
```

---

## Task 2: Install touch polyfill and create ExerciseRouter

**Files:**
- Modify: `package.json`
- Create: `src/components/exercises/ExerciseRouter.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Install mobile-drag-drop**

Run: `cd /Users/sadanakb/Mathemaxxing && npm install mobile-drag-drop`

**Step 2: Initialize polyfill in layout**

In `src/app/layout.tsx`, add a client component that initializes the polyfill. Create `src/components/layout/DragDropInit.tsx`:

```typescript
'use client';

import { useEffect } from 'react';

export function DragDropInit() {
  useEffect(() => {
    import('mobile-drag-drop').then((mod) => {
      mod.polyfill({ holdToDrag: 300 });
    });
  }, []);
  return null;
}
```

Add `<DragDropInit />` inside `<body>` in layout.tsx.

**Step 3: Create ExerciseRouter**

```typescript
'use client';

import type { Exercise } from '@/lib/curriculum/types';
import { resolveExerciseType } from '@/lib/exercise/type-resolver';
import { InputExercise } from './InputExercise';
import { MCExercise } from './MCExercise';

type ExerciseRouterProps = {
  exercise: Exercise;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: (answer: any) => void;
  disabled: boolean;
  showHint: boolean;
  onShowHint: () => void;
};

export function ExerciseRouter(props: ExerciseRouterProps) {
  const type = resolveExerciseType(props.exercise);

  switch (type) {
    case 'multiple-choice':
    case 'true-false':
      return (
        <MCExercise
          exercise={props.exercise}
          onAnswer={props.onSubmit}
          disabled={props.disabled}
          selectedAnswer={props.userAnswer}
          onSelect={props.onAnswerChange}
        />
      );

    // All new types will be added here as they are built
    // case 'drag-sort': return <DragSort ... />;

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
```

**Step 4: Update learn page to use ExerciseRouter**

In `src/app/learn/[topicId]/page.tsx`, replace the inline MC/Input conditional (lines 211-232) with:

```typescript
<ExerciseRouter
  exercise={currentExercise}
  userAnswer={userAnswer}
  onAnswerChange={setUserAnswer}
  onSubmit={handleSubmit}
  disabled={!!feedback}
  showHint={showHint}
  onShowHint={() => { setShowHint(true); setHintsUsed(h => h + 1); }}
/>
```

**Step 5: Build and verify**

Run: `cd /Users/sadanakb/Mathemaxxing && npm run build`
Expected: PASS — existing behavior preserved, router delegates correctly.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add ExerciseRouter, touch polyfill, and DragDropInit"
```

---

## Task 3: SVG Primitives — Grid, NumberlineBase, ClockFace

**Files:**
- Create: `src/components/exercises/svg/Grid.tsx`
- Create: `src/components/exercises/svg/NumberlineBase.tsx`
- Create: `src/components/exercises/svg/ClockFace.tsx`

**Step 1: Grid component**

```typescript
'use client';

type GridProps = {
  rows: number;
  cols: number;
  cellSize?: number;
  highlighted?: boolean[][];
  onCellClick?: (row: number, col: number) => void;
  className?: string;
};

export function Grid({ rows, cols, cellSize = 40, highlighted, onCellClick, className }: GridProps) {
  const width = cols * cellSize;
  const height = rows * cellSize;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ maxWidth: width, width: '100%' }}
      role="grid"
      aria-label={`${rows} mal ${cols} Gitter`}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const isHighlighted = highlighted?.[r]?.[c] ?? false;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill={isHighlighted ? 'var(--color-primary)' : 'white'}
              fillOpacity={isHighlighted ? 0.3 : 1}
              stroke="#d1d5db"
              strokeWidth={1}
              onClick={() => onCellClick?.(r, c)}
              className={onCellClick ? 'cursor-pointer hover:fill-[var(--color-primary)] hover:fill-opacity-20' : ''}
              role={onCellClick ? 'gridcell' : undefined}
              aria-label={onCellClick ? `Zelle Reihe ${r + 1}, Spalte ${c + 1}` : undefined}
            />
          );
        })
      )}
    </svg>
  );
}
```

**Step 2: NumberlineBase component**

```typescript
'use client';

type NumberlineBaseProps = {
  min: number;
  max: number;
  step: number;
  markers?: { value: number; label?: string; color?: string }[];
  onPositionClick?: (value: number) => void;
  width?: number;
  height?: number;
  className?: string;
};

export function NumberlineBase({
  min, max, step, markers = [], onPositionClick, width = 600, height = 80, className,
}: NumberlineBaseProps) {
  const padding = 30;
  const lineY = height / 2;
  const usableWidth = width - padding * 2;

  const valueToX = (v: number) => padding + ((v - min) / (max - min)) * usableWidth;
  const xToValue = (x: number) => {
    const raw = min + ((x - padding) / usableWidth) * (max - min);
    return Math.round(raw / step) * step;
  };

  const ticks: number[] = [];
  for (let v = min; v <= max; v += step) {
    ticks.push(v);
  }

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onPositionClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const val = xToValue(svgX);
    if (val >= min && val <= max) onPositionClick(val);
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ maxWidth: width, width: '100%' }}
      onClick={handleClick}
      role="img"
      aria-label={`Zahlenstrahl von ${min} bis ${max}`}
    >
      {/* Main line */}
      <line x1={padding} y1={lineY} x2={width - padding} y2={lineY} stroke="#374151" strokeWidth={2} />
      {/* Arrows */}
      <polygon points={`${padding - 8},${lineY} ${padding},${lineY - 5} ${padding},${lineY + 5}`} fill="#374151" />
      <polygon points={`${width - padding + 8},${lineY} ${width - padding},${lineY - 5} ${width - padding},${lineY + 5}`} fill="#374151" />

      {/* Ticks */}
      {ticks.map((v) => {
        const x = valueToX(v);
        return (
          <g key={v}>
            <line x1={x} y1={lineY - 8} x2={x} y2={lineY + 8} stroke="#374151" strokeWidth={1.5} />
            <text x={x} y={lineY + 22} textAnchor="middle" fontSize={12} fill="#6b7280">{v}</text>
          </g>
        );
      })}

      {/* Markers */}
      {markers.map((m, i) => {
        const x = valueToX(m.value);
        return (
          <g key={i}>
            <circle cx={x} cy={lineY} r={8} fill={m.color ?? 'var(--color-primary)'} />
            {m.label && (
              <text x={x} y={lineY - 14} textAnchor="middle" fontSize={11} fontWeight="bold" fill={m.color ?? 'var(--color-primary)'}>{m.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
```

**Step 3: ClockFace component**

```typescript
'use client';

type ClockFaceProps = {
  hours: number;
  minutes: number;
  interactive?: boolean;
  onTimeChange?: (hours: number, minutes: number) => void;
  size?: number;
  className?: string;
};

export function ClockFace({ hours, minutes, interactive, onTimeChange, size = 200, className }: ClockFaceProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;

  const minuteAngle = (minutes / 60) * 360 - 90;
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90;

  const minuteHandLength = radius * 0.8;
  const hourHandLength = radius * 0.55;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const minuteEnd = {
    x: cx + minuteHandLength * Math.cos(toRad(minuteAngle)),
    y: cy + minuteHandLength * Math.sin(toRad(minuteAngle)),
  };
  const hourEnd = {
    x: cx + hourHandLength * Math.cos(toRad(hourAngle)),
    y: cy + hourHandLength * Math.sin(toRad(hourAngle)),
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onTimeChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * size - cx;
    const svgY = ((e.clientY - rect.top) / rect.height) * size - cy;
    const angle = Math.atan2(svgY, svgX) * (180 / Math.PI) + 90;
    const normalised = ((angle % 360) + 360) % 360;
    const newMinutes = Math.round((normalised / 360) * 12) * 5;
    onTimeChange(hours, newMinutes % 60);
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ maxWidth: size, width: '100%' }}
      onClick={handleClick}
      role="img"
      aria-label={`Uhr zeigt ${hours}:${String(minutes).padStart(2, '0')}`}
    >
      {/* Face */}
      <circle cx={cx} cy={cy} r={radius + 5} fill="white" stroke="#374151" strokeWidth={3} />

      {/* Hour numbers */}
      {Array.from({ length: 12 }, (_, i) => {
        const num = i + 1;
        const a = toRad((num / 12) * 360 - 90);
        const nr = radius * 0.82;
        return (
          <text key={num} x={cx + nr * Math.cos(a)} y={cy + nr * Math.sin(a) + 5}
            textAnchor="middle" fontSize={size * 0.08} fontWeight="bold" fill="#1f2937">
            {num}
          </text>
        );
      })}

      {/* Minute ticks */}
      {Array.from({ length: 60 }, (_, i) => {
        const a = toRad((i / 60) * 360 - 90);
        const isMajor = i % 5 === 0;
        const r1 = radius * (isMajor ? 0.88 : 0.93);
        const r2 = radius * 0.97;
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
            stroke="#9ca3af" strokeWidth={isMajor ? 2 : 1}
          />
        );
      })}

      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hourEnd.x} y2={hourEnd.y}
        stroke="#1f2937" strokeWidth={4} strokeLinecap="round" />
      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={minuteEnd.x} y2={minuteEnd.y}
        stroke="#374151" strokeWidth={2.5} strokeLinecap="round" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={4} fill="#1f2937" />
    </svg>
  );
}
```

**Step 4: Build check**

Run: `cd /Users/sadanakb/Mathemaxxing && npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/exercises/svg/
git commit -m "feat: add SVG primitives — Grid, NumberlineBase, ClockFace"
```

---

## Task 4: Drag & Drop — DragSort

**Files:**
- Create: `src/components/exercises/DragSort.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

**Step 1: Create DragSort component**

A sortable list where users drag items into the correct order. Uses native HTML drag events.

```typescript
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type DragSortProps = {
  exercise: Exercise;
  onSubmit: (answer: string[]) => void;
  disabled: boolean;
};

export function DragSort({ exercise, disabled, onSubmit }: DragSortProps) {
  const [items, setItems] = useState<string[]>(() => {
    const original = exercise.items ?? [];
    return [...original].sort(() => Math.random() - 0.5);
  });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    if (disabled) return;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === targetIndex) return;
    const updated = [...items];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setItems(updated);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-6">{exercise.question}</p>
      <div className="space-y-2 mb-4" role="list" aria-label="Sortierbare Elemente">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            draggable={!disabled}
            onDragStart={handleDragStart(i)}
            onDragOver={handleDragOver(i)}
            onDrop={handleDrop(i)}
            onDragEnd={handleDragEnd}
            className={[
              'p-4 rounded-xl border-2 font-medium transition-all select-none',
              disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
              dragIndex === i ? 'opacity-50 border-dashed border-gray-300' : '',
              dragOverIndex === i && dragIndex !== i ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 bg-white',
            ].join(' ')}
            role="listitem"
            aria-label={`${item}, Position ${i + 1}`}
          >
            <span className="text-gray-400 mr-3 text-sm">{i + 1}.</span>
            {item}
          </div>
        ))}
      </div>
      <Button onClick={() => onSubmit(items)} disabled={disabled}>
        Prüfen
      </Button>
    </Card>
  );
}
```

**Step 2: Register in ExerciseRouter**

Add import and case:
```typescript
import { DragSort } from './DragSort';

// in switch:
case 'drag-sort':
  return <DragSort exercise={props.exercise} onSubmit={props.onSubmit} disabled={props.disabled} />;
```

**Step 3: Build check**

Run: `cd /Users/sadanakb/Mathemaxxing && npm run build`

**Step 4: Commit**

```bash
git add src/components/exercises/DragSort.tsx src/components/exercises/ExerciseRouter.tsx
git commit -m "feat: add DragSort exercise component"
```

---

## Task 5: Drag & Drop — DragMatch

**Files:**
- Create: `src/components/exercises/DragMatch.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Pairs matching: left column fixed, right column items draggable to match. Uses `exercise.pairs` as `[string, string][]`.

**Step 1: Create DragMatch component**

Users see shuffled right-side items and drag them to match left-side items. When an item is dropped on a left-side slot, it snaps into place.

**Step 2: Register in ExerciseRouter, build, commit**

---

## Task 6: Drag & Drop — DragIntoGaps

**Files:**
- Create: `src/components/exercises/DragIntoGaps.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Text with `___` gaps. Word bank at bottom. Drag words into gaps. Uses `exercise.question` with `___` placeholders and `exercise.items` as the word bank.

---

## Task 7: Drag & Drop — DragOntoNumberline

**Files:**
- Create: `src/components/exercises/DragOntoNumberline.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Uses `NumberlineBase` SVG. Students click/tap on the numberline to place markers. Uses `exercise.numberlineConfig`.

---

## Task 8: Drag & Drop — DragOntoGrid

**Files:**
- Create: `src/components/exercises/DragOntoGrid.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG coordinate system. Students click to place points. Uses `exercise.gridConfig`.

---

## Task 9: Drag & Drop — Classify

**Files:**
- Create: `src/components/exercises/Classify.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

2-3 category buckets at top. Items at bottom to drag into correct bucket. Uses `exercise.categories` (Record<string, string[]>) and `exercise.items`.

---

## Task 10: Interactive Math — FractionVisual

**Files:**
- Create: `src/components/exercises/FractionVisualExercise.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG circle or rectangle divided into `exercise.fractionConfig.total` parts. Student clicks parts to shade `exercise.fractionConfig.target` segments.

---

## Task 11: Interactive Math — PlaceValueTable

**Files:**
- Create: `src/components/exercises/PlaceValueTable.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Table with H | Z | E (or T | H | Z | E for larger numbers). Student fills in digit fields. Uses `exercise.correctAnswer` as the number to decompose.

---

## Task 12: Interactive Math — CalculationPyramid

**Files:**
- Create: `src/components/exercises/CalculationPyramid.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Zahlenmauer: base row given via `exercise.pyramidBase`. Each cell above = sum of two below. Some cells are pre-filled, student fills the rest.

---

## Task 13: Interactive Math — NumberMachine

**Files:**
- Create: `src/components/exercises/NumberMachine.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Visual: Input → [Operation Box] → Output. One of three values is hidden (via `exercise.machineConfig.hidden`). Student enters the hidden value.

---

## Task 14: Interactive Math — EquationBalance

**Files:**
- Create: `src/components/exercises/EquationBalance.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG balance/scale. Left side shows expression, right side shows expression. Student adjusts variable value to balance. Uses `exercise.equationConfig`.

---

## Task 15: Interactive Math — ClockDrag

**Files:**
- Create: `src/components/exercises/ClockDragExercise.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Uses `ClockFace` SVG in interactive mode. Student clicks around the clock face to set the time. Uses `exercise.clockTarget`.

---

## Task 16: Visual/Geometry — MirrorDraw

**Files:**
- Create: `src/components/exercises/MirrorDraw.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG grid with a mirror axis (vertical or horizontal). Left/top side shows a pattern. Student clicks cells on the right/bottom side to create the mirror image. Uses `exercise.mirrorConfig`.

---

## Task 17: Visual/Geometry — AreaCount

**Files:**
- Create: `src/components/exercises/AreaCount.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG grid with a shape outlined. Student clicks cells inside the shape to count/mark them. Answer = number of marked cells. Uses `Grid` SVG primitive.

---

## Task 18: Visual/Geometry — AngleMeasure

**Files:**
- Create: `src/components/exercises/AngleMeasure.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG protractor overlay on an angle. Student drags/clicks to set the measurement. Uses `exercise.angleTarget` with tolerance.

---

## Task 19: Visual/Geometry — GraphDraw

**Files:**
- Create: `src/components/exercises/GraphDraw.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG coordinate system with axes. Student clicks to place points that form a function graph. For Klasse 7 linear functions. Uses `exercise.gridConfig`.

---

## Task 20: Quiz Variants — MultipleSelect

**Files:**
- Create: `src/components/exercises/MultipleSelect.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Like MC but with checkboxes. Multiple correct answers. Uses `exercise.options` and `exercise.correctOptions`.

---

## Task 21: Quiz Variants — TrueFalse

**Files:**
- Create: `src/components/exercises/TrueFalseExercise.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Two large buttons: "Wahr" and "Falsch". Cleaner dedicated UI instead of reusing MC. Statement displayed prominently.

---

## Task 22: Quiz Variants — SpeedQuiz

**Files:**
- Create: `src/components/exercises/SpeedQuiz.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Countdown timer (uses `exercise.timeLimit` seconds). Quick number-input. Timer bar shrinks. Auto-submits when time runs out.

---

## Task 23: Quiz Variants — Estimation

**Files:**
- Create: `src/components/exercises/Estimation.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Range slider + number display. Student slides to estimate. Uses `exercise.tolerance` for acceptable range. Green zone visualization.

---

## Task 24: Tables & Games — FillTable

**Files:**
- Create: `src/components/exercises/FillTable.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

HTML table with `exercise.tableConfig.headers` and `exercise.tableConfig.rows`. Cells with `null` are editable inputs. Student fills in missing values.

---

## Task 25: Tables & Games — MemoryPairs

**Files:**
- Create: `src/components/exercises/MemoryPairs.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Classic memory game. Cards face-down in a grid. Pairs are from `exercise.pairs`. Flip two cards — if they match (e.g. "3 x 4" and "12"), they stay. All pairs found = complete.

---

## Task 26: Tables & Games — BarChartRead

**Files:**
- Create: `src/components/exercises/BarChartRead.tsx`
- Modify: `src/components/exercises/ExerciseRouter.tsx`

SVG bar chart rendered from `exercise.chartData`. Question asks about a specific value. Student enters the number they read from the chart.

---

## Task 27: Update Evaluator for New Types

**Files:**
- Modify: `src/lib/exercise/evaluator.ts`

Add evaluation logic for array-based answers (drag-sort, classify, memory), tolerance-based (estimation, angle), and grid-based (mirror, area, graph) comparisons.

```typescript
// Add to evaluateAnswer switch:
case 'drag-sort':
case 'classify':
  // Compare arrays
  return JSON.stringify(userInput) === JSON.stringify(correctAnswer);

case 'estimation':
case 'angle-measure':
  // Tolerance comparison
  const tolerance = exercise.tolerance ?? 5;
  return Math.abs(Number(userInput) - Number(correctAnswer)) <= tolerance;

case 'area-count':
case 'mirror-draw':
  // Grid comparison (2D boolean array)
  return JSON.stringify(userInput) === JSON.stringify(correctAnswer);
```

**Step: Build, test, commit**

---

## Task 28: Final Integration — Wire All Components into ExerciseRouter

**Files:**
- Modify: `src/components/exercises/ExerciseRouter.tsx`

Ensure ALL 23 new types are imported and mapped in the switch statement. Verify with `npm run build`.

**Step: Full build verification**

Run: `cd /Users/sadanakb/Mathemaxxing && npm run build`
Expected: PASS with zero errors.

**Step: Commit**

```bash
git add -A
git commit -m "feat: complete 25 exercise types — full interactive learning platform"
```

---

## Implementation Order Summary

| # | Task | Component | Group |
|---|------|-----------|-------|
| 1 | Extend types | Types + resolver | Foundation |
| 2 | ExerciseRouter + polyfill | Router + DragDropInit | Foundation |
| 3 | SVG Primitives | Grid, Numberline, Clock | Foundation |
| 4 | DragSort | Sortierung | Drag & Drop |
| 5 | DragMatch | Paare zuordnen | Drag & Drop |
| 6 | DragIntoGaps | Lückentext | Drag & Drop |
| 7 | DragOntoNumberline | Zahlenstrahl | Drag & Drop |
| 8 | DragOntoGrid | Koordinatensystem | Drag & Drop |
| 9 | Classify | Kategorien | Drag & Drop |
| 10 | FractionVisual | Bruchteile | Interaktive Mathe |
| 11 | PlaceValueTable | Stellenwert | Interaktive Mathe |
| 12 | CalculationPyramid | Zahlenmauer | Interaktive Mathe |
| 13 | NumberMachine | Rechenmaschine | Interaktive Mathe |
| 14 | EquationBalance | Waage | Interaktive Mathe |
| 15 | ClockDrag | Uhr | Interaktive Mathe |
| 16 | MirrorDraw | Spiegeln | Geometrie |
| 17 | AreaCount | Fläche | Geometrie |
| 18 | AngleMeasure | Winkel | Geometrie |
| 19 | GraphDraw | Funktionsgraph | Geometrie |
| 20 | MultipleSelect | Mehrfachauswahl | Quiz |
| 21 | TrueFalse | Wahr/Falsch | Quiz |
| 22 | SpeedQuiz | Schnellrunde | Quiz |
| 23 | Estimation | Schätzfrage | Quiz |
| 24 | FillTable | Tabelle | Tabellen & Spiel |
| 25 | MemoryPairs | Memory | Tabellen & Spiel |
| 26 | BarChartRead | Diagramm | Tabellen & Spiel |
| 27 | Update evaluator | Bewertung | Integration |
| 28 | Final wiring | Router complete | Integration |
