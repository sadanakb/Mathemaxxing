'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type RewardType = 'correct' | 'mastered' | 'perfect';

interface WeltraumRewardProps {
  type: RewardType;
  onDone: () => void;
}

// Inline SVG: star
function StarSVG({ size = 48, color = '#FFD54F' }: { size?: number; color?: string }) {
  const half = size / 2;
  const points = Array.from({ length: 5 }, (_, i) => {
    const outerAngle = (i * 72 - 90) * (Math.PI / 180);
    const innerAngle = ((i * 72 + 36) - 90) * (Math.PI / 180);
    const ox = half + half * 0.95 * Math.cos(outerAngle);
    const oy = half + half * 0.95 * Math.sin(outerAngle);
    const ix = half + half * 0.4 * Math.cos(innerAngle);
    const iy = half + half * 0.4 * Math.sin(innerAngle);
    return `${ox.toFixed(1)},${oy.toFixed(1)} ${ix.toFixed(1)},${iy.toFixed(1)}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={points} fill={color} stroke="#E65100" strokeWidth="0.8" />
      <polygon points={points} fill="white" opacity="0.15" />
    </svg>
  );
}

// Inline SVG: planet
function PlanetSVG({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* orbit ring */}
      <ellipse cx="50" cy="50" rx="46" ry="14" stroke="#FFD54F" strokeWidth="3" fill="none" opacity="0.6" />
      {/* planet body */}
      <circle cx="50" cy="50" r="26" fill="#5C6BC0" />
      {/* highlight */}
      <ellipse cx="40" cy="40" rx="8" ry="10" fill="white" opacity="0.18" />
      {/* surface detail */}
      <ellipse cx="58" cy="58" rx="6" ry="4" fill="#3949AB" opacity="0.6" />
      <ellipse cx="44" cy="56" rx="4" ry="3" fill="#7986CB" opacity="0.5" />
      {/* moon on orbit */}
      <circle cx="88" cy="50" r="6" fill="#FFD54F" />
    </svg>
  );
}

// Inline SVG: rocket
function RocketSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <rect x="28" y="30" width="24" height="55" rx="6" fill="#5C6BC0" />
      {/* nose cone */}
      <path d="M28 36 Q40 4 52 36 Z" fill="#FF7043" />
      {/* wings */}
      <path d="M28 70 L10 90 L28 82 Z" fill="#FF7043" />
      <path d="M52 70 L70 90 L52 82 Z" fill="#FF7043" />
      {/* window */}
      <circle cx="40" cy="52" r="7" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1.5" />
      {/* exhaust */}
      <ellipse cx="40" cy="85" rx="8" ry="6" fill="#FF7043" opacity="0.8" />
      <ellipse cx="40" cy="92" rx="5" ry="8" fill="#FFD54F" opacity="0.7" />
      <ellipse cx="40" cy="100" rx="3" ry="6" fill="white" opacity="0.5" />
    </svg>
  );
}

// Twinkling star
function TwinkleStar({
  x,
  y,
  delay,
  size,
  color,
}: {
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.3, 0.8, 1.1, 0], opacity: [0, 1, 0.7, 1, 0] }}
      transition={{ duration: 1.4, delay, ease: 'easeInOut' }}
    >
      <StarSVG size={size} color={color} />
    </motion.div>
  );
}

// Exploding star
function ExplosionStar({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
        rotate: [0, 180],
        x: [0, (x % 2 === 0 ? 80 : -80)],
        y: [0, (y % 2 === 0 ? -60 : 60)],
      }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <StarSVG size={24} color={color} />
    </motion.div>
  );
}

// Orbiting moon dot
function OrbitDot({ angle, radius, orbitDuration }: { angle: number; radius: number; orbitDuration: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 12,
        height: 12,
        marginLeft: -6,
        marginTop: -6,
        borderRadius: '50%',
        background: '#FFD54F',
        pointerEvents: 'none',
      }}
      animate={{
        x: [
          Math.cos(angle) * radius,
          Math.cos(angle + Math.PI) * radius,
          Math.cos(angle + 2 * Math.PI) * radius,
        ],
        y: [
          Math.sin(angle) * radius * 0.35,
          Math.sin(angle + Math.PI) * radius * 0.35,
          Math.sin(angle + 2 * Math.PI) * radius * 0.35,
        ],
      }}
      transition={{ duration: orbitDuration, ease: 'linear', repeat: Infinity }}
    />
  );
}

const STAR_POSITIONS = [
  { x: 50, y: 50, delay: 0, size: 20, color: '#FFD54F' },
  { x: 280, y: 60, delay: 0.1, size: 16, color: '#FF7043' },
  { x: 150, y: 30, delay: 0.2, size: 18, color: '#FFD54F' },
  { x: 320, y: 200, delay: 0.05, size: 14, color: '#5C6BC0' },
  { x: 40, y: 230, delay: 0.15, size: 22, color: '#FF7043' },
  { x: 220, y: 250, delay: 0.25, size: 16, color: '#FFD54F' },
];

const EXPLOSION_STARS = Array.from({ length: 14 }, (_, i) => ({
  x: 160 + Math.round(Math.cos((i / 14) * Math.PI * 2) * 80),
  y: 160 + Math.round(Math.sin((i / 14) * Math.PI * 2) * 60),
  delay: i * 0.06,
  color: i % 3 === 0 ? '#FF7043' : i % 3 === 1 ? '#FFD54F' : '#5C6BC0',
}));

export default function WeltraumReward({ type, onDone }: WeltraumRewardProps) {
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
            animate={{
              scale: [0, 1.4, 0.9, 1.2, 1],
              opacity: [0, 1, 1, 1, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <StarSVG size={90} color="#FFD54F" />
          </motion.div>
          {/* pulse ring */}
          <motion.div
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '4px solid #FFD54F',
              pointerEvents: 'none',
            }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
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
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
              style={{ position: 'absolute', left: 10, top: 10 }}
            >
              <PlanetSVG size={100} />
            </motion.div>
            <OrbitDot angle={0} radius={56} orbitDuration={3} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 24,
              fontSize: 22,
              fontWeight: 700,
              color: '#283593',
              background: 'rgba(255,255,255,0.92)',
              padding: '10px 24px',
              borderRadius: 14,
              textShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            Planet entdeckt!
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
        {STAR_POSITIONS.map((s, i) => (
          <TwinkleStar key={i} x={s.x} y={s.y} delay={s.delay} size={s.size} color={s.color} />
        ))}
        {EXPLOSION_STARS.map((s, i) => (
          <ExplosionStar key={i} x={s.x} y={s.y} delay={s.delay + 0.5} color={s.color} />
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
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: [300, 0, -20, 0], opacity: [0, 1, 1, 1] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <RocketSVG size={90} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              marginTop: 16,
              fontSize: 26,
              fontWeight: 800,
              color: '#1A237E',
              background: 'rgba(255,255,255,0.94)',
              padding: '10px 28px',
              borderRadius: 16,
              textShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
          >
            Raketenstart! Perfekt!
          </motion.p>
        </div>
      </div>
    </AnimatePresence>
  );
}
