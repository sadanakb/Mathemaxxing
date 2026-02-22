'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti } from './Confetti';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

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

  return (
    <AnimatePresence>
      {show && (
        <>
          <Confetti active={confettiActive} duration={AUTO_DISMISS_MS} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Level Up"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="fixed top-1/2 left-1/2 w-[90vw] max-w-sm rounded-[var(--card-radius)] bg-white p-8 text-center shadow-2xl"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Icon name="arrow-up" size={24} color="white" />
                </div>
              </div>

              <h2 className="mb-2 text-sm font-[family-name:var(--font-heading)] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Level Up!
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="my-6 text-7xl font-black"
                style={{
                  background: 'var(--gradient-levelup)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {level}
              </motion.div>

              <p className="mb-6 text-lg font-medium text-gray-700">
                Du bist jetzt Level {level}!
              </p>

              <Button variant="primary" onClick={onClose} size="md" fullWidth>
                Weiter
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
