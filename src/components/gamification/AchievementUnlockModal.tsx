'use client';

import { useEffect, useState } from 'react';
import type { Achievement } from '@/lib/curriculum/types';
import { Confetti } from './Confetti';

type AchievementUnlockModalProps = {
  achievement: Achievement | null;
  onClose: () => void;
};

export function AchievementUnlockModal({ achievement, onClose }: AchievementUnlockModalProps) {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      // Trigger slide-up entrance after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true);
        });
      });

      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setEntered(false);
    }
  }, [achievement]);

  function handleClose() {
    setEntered(false);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300);
  }

  if (!visible || !achievement) return null;

  return (
    <>
      <Confetti active={true} duration={3500} />
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          style={{ opacity: entered ? 1 : 0 }}
        />

        {/* Modal content */}
        <div
          className="relative z-10 mx-4 flex max-w-sm flex-col items-center rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-gray-800"
          style={{
            transform: entered ? 'translateY(0)' : 'translateY(80px)',
            opacity: entered ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Achievement icon */}
          <div className="mb-4 text-7xl" role="img" aria-label={achievement.title}>
            {achievement.icon}
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-center text-2xl font-bold text-yellow-500">
            Geschafft!
          </h2>

          {/* Achievement title */}
          <p className="mb-1 text-center text-xl font-semibold text-gray-900 dark:text-white">
            {achievement.title}
          </p>

          {/* Achievement description */}
          <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {achievement.description}
          </p>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-yellow-600 active:bg-yellow-700"
          >
            Weiter
          </button>
        </div>
      </div>
    </>
  );
}
