'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type RewardType = 'correct' | 'mastered' | 'perfect';

interface EntdeckerRewardProps {
  type: RewardType;
  onDone: () => void;
}

// Inline SVG: gem (diamond shape)
function GemSVG({ size = 48, color = '#4CAF50' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 44,18 24,44 4,18" fill={color} stroke="#2E7D32" strokeWidth="1.5" />
      <polygon points="24,4 44,18 24,22" fill="#A5D6A7" opacity="0.5" />
      <polygon points="24,22 4,18 24,44" fill="#1B5E20" opacity="0.3" />
    </svg>
  );
}

// Inline SVG: fruit (rounded rect with leaf)
function FruitSVG({ size = 36, color = '#FFB74D' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="22" rx="12" ry="11" fill={color} />
      <ellipse cx="18" cy="22" rx="12" ry="11" fill={color} />
      <path d="M18 12 Q22 6 28 8" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="14" cy="19" rx="3" ry="4" fill="white" opacity="0.25" />
    </svg>
  );
}

// Sparkle particle
function Sparkle({ x, y, delay = 0, color = '#FFB74D' }: { x: number; y: number; delay?: number; color?: string }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{ scale: [0, 1.2, 0], opacity: [1, 1, 0], rotate: 180 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill={color} />
      </svg>
    </motion.div>
  );
}

// Falling fruit/gem for perfect mode
function FallingItem({
  x,
  delay,
  isFruit,
}: {
  x: number;
  delay: number;
  isFruit: boolean;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: -60, pointerEvents: 'none' }}
      initial={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{ y: 700, opacity: [1, 1, 0], rotate: isFruit ? 360 : 180 }}
      transition={{ duration: 2.2, delay, ease: 'easeIn' }}
    >
      {isFruit ? (
        <FruitSVG size={28} color="#FFB74D" />
      ) : (
        <GemSVG size={24} color="#4CAF50" />
      )}
    </motion.div>
  );
}

// Confetti piece
function ConfettiPiece({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: '40%',
        width: 10,
        height: 10,
        background: color,
        borderRadius: 2,
        pointerEvents: 'none',
      }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -120, 300],
        x: [0, (x % 2 === 0 ? 60 : -60)],
        opacity: [1, 1, 0],
        rotate: [0, 360, 720],
        scale: [1, 1, 0.5],
      }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
    />
  );
}

const COLORS = ['#4CAF50', '#FFB74D', '#8D6E63', '#A5D6A7', '#FF8A65', '#66BB6A'];

const SPARKLE_POSITIONS = [
  { x: 60, y: 20, delay: 0.1, color: '#FFB74D' },
  { x: 120, y: 40, delay: 0.2, color: '#4CAF50' },
  { x: 20, y: 60, delay: 0.15, color: '#8D6E63' },
  { x: 140, y: 70, delay: 0.25, color: '#FFB74D' },
  { x: 80, y: 10, delay: 0.05, color: '#4CAF50' },
  { x: 30, y: 30, delay: 0.3, color: '#8D6E63' },
];

const FALLING_ITEMS = Array.from({ length: 14 }, (_, i) => ({
  x: Math.round((i / 13) * 340 + 20),
  delay: i * 0.12,
  isFruit: i % 2 === 0,
}));

const CONFETTI_PIECES = Array.from({ length: 18 }, (_, i) => ({
  x: Math.round((i / 17) * 320 + 20),
  color: COLORS[i % COLORS.length],
  delay: i * 0.08,
}));

export default function EntdeckerReward({ type, onDone }: EntdeckerRewardProps) {
  const prefersReduced = useReducedMotion();
  const duration = type === 'correct' ? 1500 : 3000;

  useEffect(() => {
    const timer = setTimeout(onDone, prefersReduced ? 100 : duration);
    return () => clearTimeout(timer);
  }, [onDone, duration, prefersReduced]);

  if (prefersReduced) return null;

  if (type === 'correct') {
    return (
      <AnimatePresence>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
          >
            <GemSVG size={80} color="#4CAF50" />
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  if (type === 'mastered') {
    return (
      <AnimatePresence>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <motion.div
            style={{ position: 'relative' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
          >
            <GemSVG size={100} color="#4CAF50" />
            {SPARKLE_POSITIONS.map((s, i) => (
              <Sparkle key={i} x={s.x - 80} y={s.y - 40} delay={s.delay} color={s.color} />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              marginTop: 16,
              fontSize: 22,
              fontWeight: 700,
              color: '#2E7D32',
              textShadow: '0 2px 8px rgba(0,0,0,0.15)',
              background: 'rgba(255,255,255,0.9)',
              padding: '8px 20px',
              borderRadius: 12,
            }}
          >
            Du hast einen Edelstein gefunden!
          </motion.p>
        </div>
      </AnimatePresence>
    );
  }

  // perfect
  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {CONFETTI_PIECES.map((c, i) => (
          <ConfettiPiece key={i} x={c.x} color={c.color} delay={c.delay} />
        ))}
        {FALLING_ITEMS.map((item, i) => (
          <FallingItem key={i} x={item.x} delay={item.delay} isFruit={item.isFruit} />
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [0, 1.4, 1], rotate: [0, 10, -5, 0] }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <GemSVG size={110} color="#4CAF50" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 16,
              fontSize: 26,
              fontWeight: 800,
              color: '#1B5E20',
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              background: 'rgba(255,255,255,0.92)',
              padding: '10px 24px',
              borderRadius: 14,
            }}
          >
            Perfekt! Edelsteinregen!
          </motion.p>
        </div>
      </div>
    </AnimatePresence>
  );
}
