'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type RewardType = 'correct' | 'mastered' | 'perfect';

interface ForscherRewardProps {
  type: RewardType;
  onDone: () => void;
}

// Inline SVG: test tube
function TestTubeSVG({ size = 60, glowing = false }: { size?: number; glowing?: boolean }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 60 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* tube body */}
      <rect x="20" y="10" width="20" height="60" rx="3" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
      {/* bottom rounded cap */}
      <ellipse cx="30" cy="70" rx="10" ry="10" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
      {/* liquid */}
      <rect x="21" y="40" width="18" height="30" fill="#26A69A" opacity="0.7" />
      <ellipse cx="30" cy="40" rx="9" ry="4" fill="#26A69A" opacity="0.7" />
      {/* highlight */}
      <rect x="23" y="12" width="5" height="40" rx="2" fill="white" opacity="0.35" />
      {/* rim */}
      <rect x="16" y="7" width="28" height="6" rx="2" fill="#00ACC1" />
      {/* glow */}
      {glowing && (
        <ellipse cx="30" cy="55" rx="14" ry="14" fill="#AB47BC" opacity="0.22" />
      )}
    </svg>
  );
}

// Inline SVG: flask
function FlaskSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* neck */}
      <rect x="30" y="4" width="20" height="24" rx="3" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      {/* rim */}
      <rect x="24" y="2" width="32" height="8" rx="3" fill="#00ACC1" />
      {/* body */}
      <path d="M30 28 L10 80 Q10 90 40 90 Q70 90 70 80 L50 28 Z" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
      {/* liquid */}
      <path d="M32 54 L14 80 Q14 88 40 88 Q66 88 66 80 L48 54 Z" fill="#26A69A" opacity="0.75" />
      {/* bubbles */}
      <circle cx="25" cy="72" r="4" fill="#00ACC1" opacity="0.6" />
      <circle cx="38" cy="65" r="3" fill="#AB47BC" opacity="0.55" />
      <circle cx="52" cy="74" r="5" fill="#00ACC1" opacity="0.5" />
      {/* highlight */}
      <rect x="33" y="6" width="5" height="20" rx="2" fill="white" opacity="0.3" />
    </svg>
  );
}

// Bubble particle
function Bubble({ x, y, delay, size, color }: { x: number; y: number; delay: number; size: number; color: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity: 0.7,
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 1.1, 0], opacity: [0, 0.7, 0.5, 0], y: -60 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.5 }}
    />
  );
}

// Smoke particle
function SmokeParticle({ x, delay, color }: { x: number; delay: number; color: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        bottom: '35%',
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        filter: 'blur(6px)',
      }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{ y: -180, opacity: [0, 0.6, 0.4, 0], scale: [0.5, 2, 3, 4] }}
      transition={{ duration: 1.8, delay, ease: 'easeOut' }}
    />
  );
}

// Spark
function Spark({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 6,
        height: 6,
        background: color,
        borderRadius: '50%',
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
        x: [0, (x % 2 === 0 ? 40 : -40)],
        y: [0, -60],
      }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
    />
  );
}

const BUBBLE_DATA = [
  { x: 120, y: 200, delay: 0, size: 12, color: '#00ACC1' },
  { x: 180, y: 220, delay: 0.3, size: 8, color: '#26A69A' },
  { x: 200, y: 190, delay: 0.6, size: 14, color: '#AB47BC' },
  { x: 140, y: 240, delay: 0.9, size: 10, color: '#00ACC1' },
  { x: 160, y: 210, delay: 1.2, size: 7, color: '#26A69A' },
];

const SMOKE_DATA = Array.from({ length: 10 }, (_, i) => ({
  x: Math.round((i / 9) * 300 + 40),
  delay: i * 0.18,
  color: i % 2 === 0 ? 'rgba(0,172,193,0.5)' : 'rgba(171,71,188,0.45)',
}));

const SPARK_DATA = [
  { x: 160, y: 150, delay: 0, color: '#FFD54F' },
  { x: 200, y: 170, delay: 0.1, color: '#26A69A' },
  { x: 140, y: 180, delay: 0.2, color: '#AB47BC' },
  { x: 220, y: 160, delay: 0.15, color: '#00ACC1' },
  { x: 170, y: 140, delay: 0.25, color: '#FFD54F' },
  { x: 130, y: 165, delay: 0.3, color: '#26A69A' },
];

export default function ForscherReward({ type, onDone }: ForscherRewardProps) {
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
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
            >
              <TestTubeSVG size={70} glowing />
            </motion.div>
            {BUBBLE_DATA.slice(0, 3).map((b, i) => (
              <Bubble key={i} x={b.x - 140} y={b.y - 180} delay={b.delay} size={b.size} color={b.color} />
            ))}
          </div>
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
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
            >
              <FlaskSVG size={100} />
            </motion.div>
            {SPARK_DATA.map((s, i) => (
              <Spark key={i} x={s.x - 160} y={s.y - 150} delay={s.delay + 0.3} color={s.color} />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 18,
              fontSize: 22,
              fontWeight: 700,
              color: '#00695C',
              background: 'rgba(255,255,255,0.92)',
              padding: '10px 24px',
              borderRadius: 14,
              textShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            Experiment gelungen!
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
        {SMOKE_DATA.map((s, i) => (
          <SmokeParticle key={i} x={s.x} delay={s.delay} color={s.color} />
        ))}
        {BUBBLE_DATA.map((b, i) => (
          <Bubble key={i} x={b.x} y={b.y} delay={b.delay} size={b.size} color={b.color} />
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
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            style={{ position: 'relative' }}
          >
            <FlaskSVG size={110} />
            {SPARK_DATA.map((s, i) => (
              <Spark key={i} x={s.x - 170} y={s.y - 170} delay={s.delay + 0.4} color={s.color} />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              marginTop: 18,
              fontSize: 26,
              fontWeight: 800,
              color: '#4A148C',
              background: 'rgba(255,255,255,0.94)',
              padding: '10px 28px',
              borderRadius: 16,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
          >
            Mega-Reaktion! Perfekt!
          </motion.p>
        </div>
      </div>
    </AnimatePresence>
  );
}
