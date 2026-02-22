'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '@/lib/curriculum/types';
import { Confetti } from './Confetti';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

type AchievementUnlockModalProps = {
  achievement: Achievement | null;
  onClose: () => void;
};

const AUTO_DISMISS_MS = 4000;

/** SVG badge that replaces the old emoji icon */
function AchievementBadge({ icon }: { icon: string }) {
  return (
    <div className="relative mx-auto mb-4 w-24 h-24">
      {/* Gold glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Badge circle */}
      <svg viewBox="0 0 96 96" className="relative w-24 h-24" aria-hidden="true">
        <defs>
          <linearGradient id="badge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="badge-ring" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="48" cy="48" r="44" fill="none" stroke="url(#badge-ring)" strokeWidth="4" />
        {/* Inner fill */}
        <circle cx="48" cy="48" r="40" fill="url(#badge-grad)" />
        {/* Shield shape */}
        <path
          d="M48 20 L64 28 L64 48 Q64 64 48 72 Q32 64 32 48 L32 28 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Star icon in center */}
        <g transform="translate(48, 46)">
          <polygon
            points="0,-14 4,-5 14,-5 6,2 9,12 0,6 -9,12 -6,2 -14,-5 -4,-5"
            fill="white"
            opacity="0.9"
          />
        </g>
        {/* Ribbon tails */}
        <path d="M32 68 L26 82 L36 76" fill="#D97706" />
        <path d="M64 68 L70 82 L60 76" fill="#D97706" />
      </svg>
      {/* Achievement emoji overlay (small) */}
      <span className="absolute bottom-0 right-0 text-2xl" role="img" aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

export function AchievementUnlockModal({ achievement, onClose }: AchievementUnlockModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (achievement) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, AUTO_DISMISS_MS);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {show && achievement && (
        <>
          <Confetti active={true} duration={3500} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => { setShow(false); onClose(); }}
            role="dialog"
            aria-modal="true"
            aria-label="Achievement freigeschaltet"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="relative mx-4 flex max-w-sm flex-col items-center rounded-[var(--card-radius)] bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Achievement badge */}
              <AchievementBadge icon={achievement.icon} />

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-2 text-center text-sm font-[family-name:var(--font-heading)] font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #FFD93D, #F59E0B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Geschafft!
              </motion.h2>

              {/* Achievement title */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-1 text-center text-xl font-bold text-gray-900"
              >
                {achievement.title}
              </motion.p>

              {/* Achievement description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-6 text-center text-sm text-gray-500"
              >
                {achievement.description}
              </motion.p>

              {/* Close button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => { setShow(false); onClose(); }}
                >
                  <Icon name="sparkle" size={16} className="mr-1" />
                  Weiter
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
