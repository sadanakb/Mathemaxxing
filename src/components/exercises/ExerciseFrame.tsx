'use client';

import type { ReactNode } from 'react';
import { useCurrentWorld } from '@/store/curriculumStore';

type ExerciseFrameProps = {
  children: ReactNode;
};

export function ExerciseFrame({ children }: ExerciseFrameProps) {
  const worldId = useCurrentWorld();

  // Frame styles per world
  const frameStyles: Record<string, { className: string; cornerSvg?: ReactNode }> = {
    entdecker: {
      className: 'bg-[var(--color-surface)] rounded-2xl border-2 border-[#4CAF50]/30 shadow-[0_4px_24px_rgba(76,175,80,0.12)] relative overflow-hidden',
      cornerSvg: (
        <>
          {/* Top-left leaf corner */}
          <svg className="absolute top-0 left-0 w-12 h-12 text-[#4CAF50]/20" viewBox="0 0 48 48">
            <path d="M0 0 C0 0, 20 5, 30 15 C20 12, 10 20, 5 30 C3 20, 0 10, 0 0Z" fill="currentColor" />
          </svg>
          {/* Bottom-right leaf corner */}
          <svg className="absolute bottom-0 right-0 w-12 h-12 text-[#4CAF50]/20 rotate-180" viewBox="0 0 48 48">
            <path d="M0 0 C0 0, 20 5, 30 15 C20 12, 10 20, 5 30 C3 20, 0 10, 0 0Z" fill="currentColor" />
          </svg>
          {/* Wood texture gradient on border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(145deg, rgba(139,90,43,0.05) 0%, transparent 30%, transparent 70%, rgba(139,90,43,0.05) 100%)' }}
          />
        </>
      ),
    },
    abenteuer: {
      className: 'bg-[var(--color-surface)] rounded-xl border-[3px] border-dashed border-[#E91E63]/30 shadow-[0_4px_20px_rgba(233,30,99,0.10)] relative overflow-hidden',
      cornerSvg: (
        <>
          {/* Ticket-style notches */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[var(--color-bg)]" />
          <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[var(--color-bg)]" />
          {/* Confetti accent on top */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
            style={{ background: 'linear-gradient(90deg, #E91E63, #FF9800, #7C4DFF, #E91E63)' }}
          />
        </>
      ),
    },
    forscher: {
      className: 'bg-[var(--color-surface)] rounded-lg border border-[#00ACC1]/25 shadow-[0_2px_16px_rgba(0,172,193,0.10)] relative overflow-hidden',
      cornerSvg: (
        <>
          {/* Grid pattern overlay (clipboard/whiteboard) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,172,193,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,172,193,1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Clipboard clip at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#00838F]/20 rounded-b-lg" />
        </>
      ),
    },
    weltraum: {
      className: 'bg-[rgba(30,30,70,0.85)] backdrop-blur-md rounded-lg border border-[#9FA8DA]/20 shadow-[0_0_20px_rgba(92,107,192,0.15),0_0_40px_rgba(92,107,192,0.05)] relative overflow-hidden',
      cornerSvg: (
        <>
          {/* Holographic scan line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(159,168,218,0.5), transparent)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(159,168,218,0.3), transparent)' }}
          />
          {/* Corner brackets */}
          <svg className="absolute top-2 left-2 w-4 h-4 text-[#9FA8DA]/40" viewBox="0 0 16 16">
            <path d="M0 4 L0 0 L4 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <svg className="absolute top-2 right-2 w-4 h-4 text-[#9FA8DA]/40" viewBox="0 0 16 16">
            <path d="M12 0 L16 0 L16 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <svg className="absolute bottom-2 left-2 w-4 h-4 text-[#9FA8DA]/40" viewBox="0 0 16 16">
            <path d="M0 12 L0 16 L4 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <svg className="absolute bottom-2 right-2 w-4 h-4 text-[#9FA8DA]/40" viewBox="0 0 16 16">
            <path d="M12 16 L16 16 L16 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </>
      ),
    },
  };

  const frame = worldId ? frameStyles[worldId] : null;

  if (!frame) {
    // No world — plain card
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)] border border-[var(--card-border)] p-6">
        {children}
      </div>
    );
  }

  return (
    <div className={frame.className}>
      {frame.cornerSvg}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
