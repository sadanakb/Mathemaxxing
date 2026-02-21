'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type DragIntoGapsProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

type Segment = { type: 'text'; value: string } | { type: 'gap'; index: number };

function parseQuestion(question: string): Segment[] {
  const parts = question.split('___');
  const segments: Segment[] = [];
  let gapIndex = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      segments.push({ type: 'text', value: parts[i] });
    }
    if (i < parts.length - 1) {
      segments.push({ type: 'gap', index: gapIndex++ });
    }
  }
  return segments;
}

export function DragIntoGaps({ exercise, onSubmit, disabled }: DragIntoGapsProps) {
  const segments = useMemo(() => parseQuestion(exercise.question), [exercise.question]);
  const gapCount = segments.filter((s) => s.type === 'gap').length;
  const wordBank = exercise.items ?? [];

  const [filledGaps, setFilledGaps] = useState<(string | null)[]>(
    () => Array(gapCount).fill(null)
  );
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [overGap, setOverGap] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const usedWords = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const w of filledGaps) {
      if (w !== null) {
        counts[w] = (counts[w] ?? 0) + 1;
      }
    }
    return counts;
  }, [filledGaps]);

  const isWordUsed = (word: string): boolean => {
    const available = wordBank.filter((w) => w === word).length;
    const used = usedWords[word] ?? 0;
    return used >= available;
  };

  const handleDragStart = useCallback(
    (e: React.DragEvent, word: string) => {
      if (disabled) return;
      setDragItem(word);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', word);
    },
    [disabled]
  );

  const handleDragOverGap = useCallback(
    (e: React.DragEvent, gapIndex: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverGap(gapIndex);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setOverGap(null);
  }, []);

  const handleDropOnGap = useCallback(
    (e: React.DragEvent, gapIndex: number) => {
      e.preventDefault();
      if (disabled || !dragItem) {
        setDragItem(null);
        setOverGap(null);
        return;
      }
      setFilledGaps((prev) => {
        const next = [...prev];
        next[gapIndex] = dragItem;
        return next;
      });
      setDragItem(null);
      setOverGap(null);
    },
    [dragItem, disabled]
  );

  const handleDragEnd = useCallback(() => {
    setDragItem(null);
    setOverGap(null);
  }, []);

  // Tap-to-fill for mobile
  const handleWordTap = (word: string) => {
    if (disabled || isWordUsed(word)) return;
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleGapTap = (gapIndex: number) => {
    if (disabled) return;
    if (selectedWord) {
      setFilledGaps((prev) => {
        const next = [...prev];
        next[gapIndex] = selectedWord;
        return next;
      });
      setSelectedWord(null);
    } else if (filledGaps[gapIndex] !== null) {
      // Clear the gap
      setFilledGaps((prev) => {
        const next = [...prev];
        next[gapIndex] = null;
        return next;
      });
    }
  };

  const allFilled = filledGaps.every((g) => g !== null);

  const handleSubmit = () => {
    onSubmit(JSON.stringify(filledGaps));
  };

  return (
    <Card className="mb-4">
      <p className="text-sm text-gray-500 mb-4">
        Ziehe die Woerter in die Luecken oder tippe zum Einsetzen.
      </p>

      {/* Sentence with gaps */}
      <div
        className="text-lg leading-relaxed mb-6 flex flex-wrap items-center gap-1"
        role="group"
        aria-label="Lueckentext"
      >
        {segments.map((seg, i) => {
          if (seg.type === 'text') {
            return (
              <span key={i} className="text-gray-900">
                {seg.value}
              </span>
            );
          }

          const gapIdx = seg.index;
          const filled = filledGaps[gapIdx];
          return (
            <span
              key={i}
              onDragOver={(e) => handleDragOverGap(e, gapIdx)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDropOnGap(e, gapIdx)}
              onClick={() => handleGapTap(gapIdx)}
              className={[
                'inline-flex items-center justify-center min-w-[80px] min-h-[44px] px-3 py-1 rounded-lg border-2 transition-all duration-150',
                filled
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold cursor-pointer'
                  : overGap === gapIdx
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : selectedWord
                      ? 'border-dashed border-[var(--color-primary)] cursor-pointer'
                      : 'border-dashed border-gray-300 bg-gray-50',
              ].join(' ')}
              role="textbox"
              aria-label={`Luecke ${gapIdx + 1}${filled ? `: ${filled}` : ''}`}
            >
              {filled ?? ''}
            </span>
          );
        })}
      </div>

      {/* Word bank */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-600 mb-2">Wortbank:</p>
        <div
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-label="Verfuegbare Woerter"
        >
          {wordBank.map((word, i) => {
            const used = isWordUsed(word);
            return (
              <span
                key={`${word}-${i}`}
                draggable={!disabled && !used}
                onDragStart={(e) => handleDragStart(e, word)}
                onDragEnd={handleDragEnd}
                onClick={() => handleWordTap(word)}
                className={[
                  'px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all duration-150 select-none',
                  'min-h-[44px] inline-flex items-center',
                  used
                    ? 'opacity-40 cursor-default border-gray-200 bg-gray-100 text-gray-400'
                    : selectedWord === word
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] cursor-pointer'
                      : disabled
                        ? 'cursor-default border-gray-200 bg-white'
                        : 'cursor-grab active:cursor-grabbing border-gray-200 bg-white hover:border-[var(--color-primary)]',
                ].join(' ')}
                role="option"
                aria-selected={selectedWord === word}
                aria-disabled={used || disabled}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || !allFilled}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
