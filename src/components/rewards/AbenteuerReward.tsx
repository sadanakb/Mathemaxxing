'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type RewardType = 'correct' | 'mastered' | 'perfect';

interface AbenteuerRewardProps {
  type: RewardType;
  onDone: () => void;
}

// Inline SVG: balloon
function BalloonSVG({
  size = 60,
  color = '#E91E63',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* balloon body */}
      <ellipse cx="30" cy="30" rx="22" ry="26" fill={color} />
      {/* highlight */}
      <ellipse cx="22" cy="20" rx="6" ry="8" fill="white" opacity="0.3" />
      {/* knot */}
      <path d="M28 56 Q30 60 32 56" stroke={color} strokeWidth="2" fill="none" />
      {/* string */}
      <path d="M30 58 Q34 68 28 78 Q32 82 30 84" stroke="#8D6E63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Inline SVG: spinning star prize
function StarPrizeSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* outer star */}
      <polygon
        points="40,4 48,28 74,28 54,46 62,70 40,54 18,70 26,46 6,28 32,28"
        fill="#FF9800"
        stroke="#E65100"
        strokeWidth="1.5"
      />
      {/* inner circle */}
      <circle cx="40" cy="40" r="12" fill="#FFD54F" />
      {/* center dot */}
      <circle cx="40" cy="40" r="4" fill="#FF6F00" />
    </svg>
  );
}

// Confetti piece
function ConfettiPiece({
  x,
  color,
  delay,
  shape = 'rect',
}: {
  x: number;
  color: string;
  delay: number;
  shape?: 'rect' | 'circle';
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: '35%',
        width: shape === 'circle' ? 10 : 8,
        height: shape === 'circle' ? 10 : 14,
        background: color,
        borderRadius: shape === 'circle' ? '50%' : 2,
        pointerEvents: 'none',
      }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -140, 340],
        x: [0, x % 2 === 0 ? 50 : -50],
        opacity: [1, 1, 0],
        rotate: [0, 360, 720],
        scale: [1, 1, 0.4],
      }}
      transition={{ duration: 2.2, delay, ease: 'easeOut' }}
    />
  );
}

// Floating balloon
function FloatingBalloon({
  x,
  delay,
  color,
  size = 44,
}: {
  x: number;
  delay: number;
  color: string;
  size?: number;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, bottom: -80, pointerEvents: 'none' }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -900, opacity: [1, 1, 0], x: [0, 20, -20, 10, -10, 0] }}
      transition={{ duration: 2.4, delay, ease: 'easeOut' }}
    >
      <BalloonSVG size={size} color={color} />
    </motion.div>
  );
}

const PALETTE = ['#E91E63', '#FF9800', '#7C4DFF', '#F06292', '#FFB300', '#CE93D8'];

const CONFETTI_DATA = Array.from({ length: 20 }, (_, i) => ({
  x: Math.round((i / 19) * 340 + 20),
  color: PALETTE[i % PALETTE.length],
  delay: i * 0.07,
  shape: (i % 3 === 0 ? 'circle' : 'rect') as 'rect' | 'circle',
}));

const BALLOON_DATA = [
  { x: 60, delay: 0, color: '#E91E63', size: 50 },
  { x: 160, delay: 0.3, color: '#FF9800', size: 44 },
  { x: 260, delay: 0.15, color: '#7C4DFF', size: 56 },
  { x: 110, delay: 0.45, color: '#F06292', size: 40 },
  { x: 210, delay: 0.6, color: '#FFB300', size: 48 },
];

export default function AbenteuerReward({ type, onDone }: AbenteuerRewardProps) {
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
            initial={{ y: 80, opacity: 0, scale: 0.6 }}
            animate={{ y: [80, -30, -300], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.9] }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <BalloonSVG size={80} color="#E91E63" />
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
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], rotate: [0, 360], opacity: 1 }}
            transition={{ duration: 1, ease: 'backOut' }}
          >
            <StarPrizeSVG size={100} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 20,
              fontSize: 22,
              fontWeight: 700,
              color: '#880E4F',
              background: 'rgba(255,255,255,0.92)',
              padding: '10px 24px',
              borderRadius: 14,
              textShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            Karnevalspreis gewonnen!
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
        {CONFETTI_DATA.map((c, i) => (
          <ConfettiPiece key={i} x={c.x} color={c.color} delay={c.delay} shape={c.shape} />
        ))}
        {BALLOON_DATA.map((b, i) => (
          <FloatingBalloon key={i} x={b.x} delay={b.delay} color={b.color} size={b.size} />
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
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.4, 1], rotate: [0, 360, 360] }}
            transition={{ duration: 1, ease: 'backOut' }}
          >
            <StarPrizeSVG size={110} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              marginTop: 18,
              fontSize: 26,
              fontWeight: 800,
              color: '#6A1B9A',
              background: 'rgba(255,255,255,0.94)',
              padding: '10px 28px',
              borderRadius: 16,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
          >
            Ballonparade! Perfekt!
          </motion.p>
        </div>
      </div>
    </AnimatePresence>
  );
}
