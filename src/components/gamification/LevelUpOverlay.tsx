'use client';

import { useEffect, useState } from 'react';
import { Confetti } from './Confetti';
import { Button } from '@/components/ui/Button';

type LevelUpOverlayProps = {
  level: number;
  visible: boolean;
  onClose: () => void;
};

const AUTO_DISMISS_MS = 5000;

export function LevelUpOverlay({ level, visible, onClose }: LevelUpOverlayProps) {
  const [show, setShow] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShow(false);
      setConfettiActive(false);
      return;
    }

    setShow(true);
    setConfettiActive(true);

    const timer = setTimeout(() => {
      setShow(false);
      setConfettiActive(false);
      onClose();
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes level-up-entrance {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          60% {
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes level-glow {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(255, 215, 0, 0.6),
              0 0 40px rgba(255, 215, 0, 0.3);
          }
          50% {
            text-shadow:
              0 0 30px rgba(255, 215, 0, 0.9),
              0 0 60px rgba(255, 215, 0, 0.5),
              0 0 80px rgba(255, 215, 0, 0.2);
          }
        }
        .level-up-card {
          animation: level-up-entrance 0.5s ease-out forwards;
        }
        .level-number-glow {
          animation: level-glow 2s ease-in-out infinite;
        }
      `}</style>

      <Confetti active={confettiActive} duration={AUTO_DISMISS_MS} />

      <div
        className="fixed inset-0 z-50 bg-black/60"
        role="dialog"
        aria-modal="true"
        aria-label="Level Up"
      >
        <div
          className="level-up-card fixed top-1/2 left-1/2 w-[90vw] max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <h2
            className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500"
          >
            Level Up!
          </h2>

          <div
            className="level-number-glow my-6 text-7xl font-black text-yellow-400"
          >
            {level}
          </div>

          <p className="mb-6 text-lg font-medium text-gray-700">
            Du bist jetzt Level {level}!
          </p>

          <Button variant="primary" onClick={onClose} size="md">
            Weiter
          </Button>
        </div>
      </div>
    </>
  );
}
