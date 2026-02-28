'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Beat {
  id: string;
  title: string;
  text: string;
  illustrationPath?: string;
  finnMood?: 'happy' | 'celebrating' | 'encouraging';
}

interface StoryBeatOverlayProps {
  beat: Beat;
  onClose: () => void;
}

export const StoryBeatOverlay: React.FC<StoryBeatOverlayProps> = ({
  beat,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus on close button for accessibility
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        type: 'spring' as const,
        stiffness: 120,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`beat-title-${beat.id}`}
      >
        <motion.div
          className="relative w-full max-w-2xl mx-4 rounded-[var(--card-radius)] bg-white shadow-2xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient accent bar at top */}
          <div
            className="h-1 w-full"
            style={{ background: 'var(--gradient-hero)' }}
          />

          {/* Content container */}
          <div className="p-8 md:p-12">
            {/* Illustration */}
            {beat.illustrationPath && (
              <motion.div
                className="mb-6 relative w-full h-64 md:h-80 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.1,
                }}
              >
                <Image
                  src={beat.illustrationPath}
                  alt={beat.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              id={`beat-title-${beat.id}`}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-primary)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.15,
              }}
            >
              {beat.title}
            </motion.h2>

            {/* Story text */}
            <motion.p
              className="text-base md:text-lg text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.2,
              }}
            >
              {beat.text}
            </motion.p>

            {/* Weiter button */}
            <motion.button
              ref={closeButtonRef}
              onClick={onClose}
              className="w-full py-3 px-6 rounded-lg font-semibold text-white text-center transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
              style={{
                background: 'var(--color-primary)',
                '--tw-ring-color': 'var(--color-primary)',
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.25,
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              aria-label="Story weiterführen"
            >
              Weiter
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
