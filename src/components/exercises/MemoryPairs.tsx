'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import type { Exercise } from '@/lib/curriculum/types';

type MemoryPairsProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

type MemoryCard = {
  id: number;
  pairIndex: number;
  text: string;
  flipped: boolean;
  matched: boolean;
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MemoryPairs({ exercise, onSubmit, disabled }: MemoryPairsProps) {
  const pairs = exercise.pairs ?? [];

  const cards = useMemo<MemoryCard[]>(() => {
    const raw: MemoryCard[] = [];
    pairs.forEach(([a, b], pairIdx) => {
      raw.push({ id: pairIdx * 2, pairIndex: pairIdx, text: a, flipped: false, matched: false });
      raw.push({ id: pairIdx * 2 + 1, pairIndex: pairIdx, text: b, flipped: false, matched: false });
    });
    return shuffleArray(raw);
  }, [pairs]);

  const [state, setState] = useState<MemoryCard[]>(cards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [complete, setComplete] = useState(false);
  const lockRef = useRef(false);

  const matchedCount = state.filter((c) => c.matched).length;
  const totalCards = state.length;

  // Check for game completion
  useEffect(() => {
    if (matchedCount === totalCards && totalCards > 0 && !complete) {
      setComplete(true);
      onSubmit(String(attempts));
    }
  }, [matchedCount, totalCards, complete, attempts, onSubmit]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (disabled || lockRef.current) return;

      const card = state.find((c) => c.id === cardId);
      if (!card || card.flipped || card.matched) return;

      if (flippedIds.length === 0) {
        // First card flipped
        setState((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c))
        );
        setFlippedIds([cardId]);
      } else if (flippedIds.length === 1) {
        // Second card flipped
        const firstId = flippedIds[0];
        setState((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c))
        );
        setFlippedIds([firstId, cardId]);
        setAttempts((prev) => prev + 1);
        lockRef.current = true;

        const firstCard = state.find((c) => c.id === firstId);
        if (firstCard && firstCard.pairIndex === card.pairIndex) {
          // Match!
          setTimeout(() => {
            setState((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === cardId ? { ...c, matched: true } : c
              )
            );
            setFlippedIds([]);
            lockRef.current = false;
          }, 500);
        } else {
          // No match — flip back
          setTimeout(() => {
            setState((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === cardId ? { ...c, flipped: false } : c
              )
            );
            setFlippedIds([]);
            lockRef.current = false;
          }, 1000);
        }
      }
    },
    [disabled, state, flippedIds]
  );

  // Determine grid columns based on card count
  const gridCols = totalCards <= 8 ? 4 : totalCards <= 12 ? 4 : 4;

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Finde die zusammengehörigen Paare. Versuche: {attempts}
      </p>

      <div
        className={`grid gap-3 mb-4`}
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        role="grid"
        aria-label="Memory-Spielfeld"
      >
        {state.map((card) => {
          const showFace = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={disabled || card.matched}
              className={[
                'aspect-square rounded-xl border-2 flex items-center justify-center p-2',
                'text-sm font-bold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
                'min-h-[64px]',
                card.matched
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700 cursor-default'
                  : showFace
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'border-gray-300 bg-gray-100 text-transparent hover:border-[var(--color-primary)] hover:bg-gray-200 cursor-pointer',
              ].join(' ')}
              role="gridcell"
              aria-label={showFace ? card.text : 'Verdeckte Karte'}
            >
              {showFace ? card.text : '?'}
            </button>
          );
        })}
      </div>

      {complete && (
        <p className="text-center text-lg font-semibold text-emerald-600">
          Alle Paare gefunden! ({attempts} Versuche)
        </p>
      )}
    </Card>
  );
}
