'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Exercise } from '@/lib/curriculum/types';

type NumberMachineProps = {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled: boolean;
};

function MachineBox({
  label,
  value,
  isHidden,
  inputValue,
  onInputChange,
  disabled,
  ariaLabel,
}: {
  label: string;
  value: string | number;
  isHidden: boolean;
  inputValue: string;
  onInputChange: (v: string) => void;
  disabled: boolean;
  ariaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <div
        className={[
          'flex items-center justify-center rounded-2xl border-3 font-bold text-xl min-w-[80px] min-h-[64px] px-4',
          isHidden
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
            : 'border-gray-300 bg-gray-50',
        ].join(' ')}
      >
        {isHidden ? (
          <input
            type="text"
            inputMode={label === 'Rechenart' ? 'text' : 'numeric'}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={disabled}
            className="w-20 text-center text-xl font-bold bg-transparent focus:outline-none disabled:opacity-50"
            aria-label={ariaLabel}
            placeholder="?"
            autoComplete="off"
          />
        ) : (
          <span aria-label={ariaLabel}>{value}</span>
        )}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center px-2 pt-5">
      <svg width="40" height="24" viewBox="0 0 40 24" aria-hidden="true">
        <line x1="0" y1="12" x2="30" y2="12" stroke="#9ca3af" strokeWidth={2.5} />
        <polygon points="30,6 40,12 30,18" fill="#9ca3af" />
      </svg>
    </div>
  );
}

export function NumberMachine({ exercise, onSubmit, disabled }: NumberMachineProps) {
  const config = exercise.machineConfig ?? {
    input: 5,
    operation: '+3',
    output: 8,
    hidden: 'output' as const,
  };

  const { input, operation, output, hidden } = config;

  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim() && !disabled) {
      handleSubmit();
    }
  };

  return (
    <Card className="mb-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">
        {exercise.question}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Finde den fehlenden Wert in der Rechenmaschine.
      </p>

      <div
        className="flex items-center justify-center gap-1 mb-6 flex-wrap"
        role="group"
        aria-label="Rechenmaschine"
        onKeyDown={handleKeyDown}
      >
        <MachineBox
          label="Eingabe"
          value={input}
          isHidden={hidden === 'input'}
          inputValue={answer}
          onInputChange={setAnswer}
          disabled={disabled}
          ariaLabel={hidden === 'input' ? 'Eingabewert eingeben' : `Eingabe: ${input}`}
        />

        <Arrow />

        <MachineBox
          label="Rechenart"
          value={operation}
          isHidden={hidden === 'operation'}
          inputValue={answer}
          onInputChange={setAnswer}
          disabled={disabled}
          ariaLabel={hidden === 'operation' ? 'Rechenart eingeben' : `Rechenart: ${operation}`}
        />

        <Arrow />

        <MachineBox
          label="Ausgabe"
          value={output}
          isHidden={hidden === 'output'}
          inputValue={answer}
          onInputChange={setAnswer}
          disabled={disabled}
          ariaLabel={hidden === 'output' ? 'Ausgabewert eingeben' : `Ausgabe: ${output}`}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        fullWidth
        size="lg"
      >
        Prüfen
      </Button>
    </Card>
  );
}
