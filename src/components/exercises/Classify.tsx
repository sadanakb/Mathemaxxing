'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type ClassifyProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const BUCKET_COLORS = [
  { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-800', chip: 'bg-blue-100' },
  { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-800', chip: 'bg-amber-100' },
  { border: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-800', chip: 'bg-emerald-100' },
];

export function Classify({ exercise, onSubmit, disabled }: ClassifyProps) {
  const categoryNames = useMemo(
    () => Object.keys(exercise.categories ?? {}),
    [exercise.categories]
  );
  const allItems = useMemo(
    () => shuffleArray(exercise.items ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // classification[item] = categoryName | undefined
  const [classification, setClassification] = useState<Record<string, string>>({});
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [overCategory, setOverCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const classifiedItems = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const cat of categoryNames) {
      result[cat] = [];
    }
    for (const [item, cat] of Object.entries(classification)) {
      if (result[cat]) {
        result[cat].push(item);
      }
    }
    return result;
  }, [classification, categoryNames]);

  const unclassifiedItems = useMemo(
    () => allItems.filter((item) => !classification[item]),
    [allItems, classification]
  );

  const allClassified = unclassifiedItems.length === 0;

  // Drag handlers for items
  const handleDragStart = useCallback(
    (e: React.DragEvent, item: string) => {
      if (disabled) return;
      setDragItem(item);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item);
    },
    [disabled]
  );

  const handleDragOverCategory = useCallback(
    (e: React.DragEvent, category: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverCategory(category);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setOverCategory(null);
  }, []);

  const handleDropOnCategory = useCallback(
    (e: React.DragEvent, category: string) => {
      e.preventDefault();
      if (disabled || !dragItem) {
        setDragItem(null);
        setOverCategory(null);
        return;
      }
      setClassification((prev) => ({ ...prev, [dragItem]: category }));
      setDragItem(null);
      setOverCategory(null);
    },
    [dragItem, disabled]
  );

  const handleDragEnd = useCallback(() => {
    setDragItem(null);
    setOverCategory(null);
  }, []);

  // Tap-to-assign: select item, then tap category
  const handleItemTap = (item: string) => {
    if (disabled) return;
    setSelectedItem((prev) => (prev === item ? null : item));
  };

  const handleCategoryTap = (category: string) => {
    if (disabled || !selectedItem) return;
    setClassification((prev) => ({ ...prev, [selectedItem]: category }));
    setSelectedItem(null);
  };

  // Remove item from category
  const removeFromCategory = (item: string) => {
    if (disabled) return;
    setClassification((prev) => {
      const next = { ...prev };
      delete next[item];
      return next;
    });
  };

  // Cycle category on click (for already-classified items)
  const cycleCategory = (item: string) => {
    if (disabled) return;
    const currentCat = classification[item];
    if (!currentCat) return;
    const idx = categoryNames.indexOf(currentCat);
    const nextIdx = (idx + 1) % categoryNames.length;
    setClassification((prev) => ({ ...prev, [item]: categoryNames[nextIdx] }));
  };

  const handleSubmit = () => {
    onSubmit(JSON.stringify(classifiedItems));
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Ordne die Begriffe den richtigen Kategorien zu.
      </p>

      {/* Category buckets */}
      <div
        className={`grid gap-4 mb-6 ${categoryNames.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}
        role="group"
        aria-label="Kategorien"
      >
        {categoryNames.map((cat, catIndex) => {
          const colors = BUCKET_COLORS[catIndex % BUCKET_COLORS.length];
          const isOver = overCategory === cat;
          return (
            <div
              key={cat}
              onDragOver={(e) => handleDragOverCategory(e, cat)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDropOnCategory(e, cat)}
              onClick={() => handleCategoryTap(cat)}
              className={[
                'rounded-xl border-2 p-4 min-h-[120px] transition-all duration-150',
                colors.bg,
                isOver
                  ? `${colors.border} ring-2 ring-offset-1`
                  : selectedItem
                    ? `${colors.border} border-dashed cursor-pointer`
                    : colors.border,
              ].join(' ')}
              role="region"
              aria-label={`Kategorie: ${cat}`}
            >
              <h3 className={`font-bold text-sm mb-3 ${colors.text}`}>{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {classifiedItems[cat]?.map((item) => (
                  <span
                    key={item}
                    draggable={!disabled}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => {
                      e.stopPropagation();
                      cycleCategory(item);
                    }}
                    className={[
                      'px-3 py-1.5 rounded-lg text-sm font-medium select-none min-h-[36px] inline-flex items-center gap-1',
                      colors.chip, colors.text,
                      disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                    ].join(' ')}
                  >
                    {item}
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCategory(item);
                        }}
                        className="ml-1 w-4 h-4 text-xs rounded-full bg-white/60 hover:bg-red-100 hover:text-red-600 inline-flex items-center justify-center"
                        aria-label={`${item} aus Kategorie entfernen`}
                      >
                        x
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unclassified items */}
      {unclassifiedItems.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-2">Noch einzuordnen:</p>
          <div
            className="flex flex-wrap gap-2"
            role="listbox"
            aria-label="Nicht zugeordnete Elemente"
          >
            {unclassifiedItems.map((item) => (
              <span
                key={item}
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                onClick={() => handleItemTap(item)}
                className={[
                  'px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all duration-150 select-none',
                  'min-h-[44px] inline-flex items-center',
                  selectedItem === item
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] cursor-pointer'
                    : disabled
                      ? 'cursor-default border-gray-200 bg-white'
                      : 'cursor-grab active:cursor-grabbing border-gray-200 bg-white hover:border-[var(--color-primary)]',
                ].join(' ')}
                role="option"
                aria-selected={selectedItem === item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={disabled || !allClassified}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
