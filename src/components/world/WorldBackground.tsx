'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

type WorldId = 'entdecker' | 'abenteuer' | 'forscher' | 'weltraum';

interface WorldBackgroundProps {
  worldId: WorldId | null;
}

// ─── Layer 1: Sky gradients per world ────────────────────────

const SKY_GRADIENTS: Record<WorldId, string> = {
  entdecker:
    'linear-gradient(180deg, #87CEEB 0%, #C8E6C9 50%, #4CAF50 100%)',
  abenteuer:
    'linear-gradient(180deg, #FF6B6B 0%, #FFD93D 50%, #FF9800 100%)',
  forscher:
    'linear-gradient(180deg, #E0F7FA 0%, #80DEEA 50%, #26A69A 100%)',
  weltraum:
    'linear-gradient(180deg, #0d1b2a 0%, #1a1a3e 50%, #2d1b69 100%)',
};

// ─── Layer 2: Terrain clip-paths per world ───────────────────

const TERRAIN_CONFIG: Record<WorldId, { color: string; clipPath: string }> = {
  entdecker: {
    color: '#2E7D32',
    // Rolling hills with tree-like bumps
    clipPath:
      'polygon(0% 70%, 5% 55%, 10% 60%, 15% 45%, 20% 50%, 25% 40%, 30% 48%, 35% 42%, 40% 50%, 45% 44%, 50% 55%, 55% 42%, 60% 48%, 65% 40%, 70% 50%, 75% 45%, 80% 55%, 85% 48%, 90% 58%, 95% 52%, 100% 65%, 100% 100%, 0% 100%)',
  },
  abenteuer: {
    color: '#C2185B',
    // Tent silhouettes / carnival triangular peaks
    clipPath:
      'polygon(0% 85%, 5% 80%, 10% 50%, 15% 80%, 20% 75%, 25% 45%, 30% 75%, 35% 80%, 40% 55%, 45% 80%, 50% 78%, 55% 40%, 60% 78%, 65% 82%, 70% 55%, 75% 80%, 80% 76%, 85% 48%, 90% 78%, 95% 82%, 100% 80%, 100% 100%, 0% 100%)',
  },
  forscher: {
    color: '#00838F',
    // City skyline with rectangular buildings of varying heights
    clipPath:
      'polygon(0% 80%, 0% 60%, 5% 60%, 5% 70%, 8% 70%, 8% 45%, 14% 45%, 14% 70%, 17% 70%, 17% 55%, 22% 55%, 22% 65%, 25% 65%, 25% 40%, 30% 40%, 30% 65%, 33% 65%, 33% 75%, 38% 75%, 38% 50%, 43% 50%, 43% 60%, 46% 60%, 46% 35%, 52% 35%, 52% 60%, 55% 60%, 55% 70%, 60% 70%, 60% 45%, 65% 45%, 65% 65%, 68% 65%, 68% 55%, 73% 55%, 73% 70%, 78% 70%, 78% 42%, 83% 42%, 83% 65%, 86% 65%, 86% 75%, 90% 75%, 90% 50%, 95% 50%, 95% 68%, 100% 68%, 100% 100%, 0% 100%)',
  },
  weltraum: {
    color: '#1a0a30',
    // Planet horizon — gentle arc
    clipPath:
      'polygon(0% 92%, 5% 90%, 10% 88%, 15% 87%, 20% 86%, 25% 85.5%, 30% 85%, 35% 84.8%, 40% 84.6%, 45% 84.5%, 50% 84.5%, 55% 84.5%, 60% 84.6%, 65% 84.8%, 70% 85%, 75% 85.5%, 80% 86%, 85% 87%, 90% 88%, 95% 90%, 100% 92%, 100% 100%, 0% 100%)',
  },
};

// ─── Float animation factory ─────────────────────────────────

function floatVariants(
  yRange: [number, number],
  rotateRange: [number, number],
  duration: number
) {
  return {
    animate: {
      y: [yRange[0], yRange[1], yRange[0]],
      rotate: [rotateRange[0], rotateRange[1], rotateRange[0]],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };
}

// ─── Layer 4: Particle component ─────────────────────────────

interface ParticleConfig {
  count: number;
  type: 'leaf' | 'confetti' | 'bubble' | 'shootingStar';
  colors: string[];
}

const PARTICLE_CONFIGS: Record<WorldId, ParticleConfig> = {
  entdecker: {
    count: 7,
    type: 'leaf',
    colors: ['#4caf50', '#66bb6a', '#81c784', '#388e3c', '#2e7d32', '#a5d6a7', '#43a047'],
  },
  abenteuer: {
    count: 8,
    type: 'confetti',
    colors: ['#f06292', '#ffb74d', '#ff7043', '#ba68c8', '#4fc3f7', '#81c784', '#fff176', '#e57373'],
  },
  forscher: {
    count: 7,
    type: 'bubble',
    colors: ['#4db6ac', '#80cbc4', '#b2dfdb', '#7e57c2', '#9575cd', '#4dd0e1', '#26c6da'],
  },
  weltraum: {
    count: 8,
    type: 'shootingStar',
    colors: ['#ffffff', '#ffe082', '#e0e0e0', '#fff9c4', '#b3e5fc', '#ce93d8', '#ffffff', '#ffe082'],
  },
};

// Stable seed-based pseudo-random for particle positioning
function seededValues(worldId: WorldId): number[] {
  const seeds: Record<WorldId, number[]> = {
    entdecker: [0.12, 0.87, 0.34, 0.65, 0.48, 0.91, 0.23, 0.56],
    abenteuer: [0.78, 0.15, 0.62, 0.39, 0.84, 0.27, 0.51, 0.93],
    forscher:  [0.45, 0.72, 0.18, 0.56, 0.33, 0.89, 0.64, 0.07],
    weltraum:  [0.91, 0.28, 0.53, 0.76, 0.14, 0.67, 0.42, 0.85],
  };
  return seeds[worldId];
}

function Particles({ worldId }: { worldId: WorldId }) {
  const config = PARTICLE_CONFIGS[worldId];
  const randoms = seededValues(worldId);

  const particles = useMemo(() => {
    return Array.from({ length: config.count }, (_, i) => {
      const r = randoms[i % randoms.length];
      const left = (r * 100);
      const delay = r * 6;
      const duration = 8 + (r * 7);
      const size = 4 + (r * 6);
      const color = config.colors[i % config.colors.length];

      return { i, left, delay, duration, size, color };
    });
  }, [config, randoms]);

  if (config.type === 'leaf') {
    // Falling leaves: small green ovals drifting down
    const keyframes = `
      @keyframes particle-leaf {
        0% { transform: translateY(-20px) rotate(0deg) translateX(0px); opacity: 0; }
        10% { opacity: 0.7; }
        90% { opacity: 0.7; }
        100% { transform: translateY(105vh) rotate(360deg) translateX(40px); opacity: 0; }
      }
    `;
    return (
      <>
        <style>{keyframes}</style>
        {particles.map(({ i, left, delay, duration, size, color }) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size * 1.4}px`,
              borderRadius: '50% 50% 50% 0%',
              backgroundColor: color,
              opacity: 0,
              animation: `particle-leaf ${duration}s ${delay}s linear infinite`,
            }}
          />
        ))}
      </>
    );
  }

  if (config.type === 'confetti') {
    // Confetti: small colored squares fluttering down
    const keyframes = `
      @keyframes particle-confetti {
        0% { transform: translateY(-10px) rotate(0deg) translateX(0px); opacity: 0; }
        10% { opacity: 0.8; }
        50% { transform: translateY(50vh) rotate(180deg) translateX(30px); opacity: 0.8; }
        90% { opacity: 0.6; }
        100% { transform: translateY(105vh) rotate(360deg) translateX(-20px); opacity: 0; }
      }
    `;
    return (
      <>
        <style>{keyframes}</style>
        {particles.map(({ i, left, delay, duration, size, color }) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-10px',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '1px',
              backgroundColor: color,
              opacity: 0,
              animation: `particle-confetti ${duration}s ${delay}s linear infinite`,
            }}
          />
        ))}
      </>
    );
  }

  if (config.type === 'bubble') {
    // Bubbles: small circles rising up
    const keyframes = `
      @keyframes particle-bubble {
        0% { transform: translateY(0px) translateX(0px) scale(0.5); opacity: 0; }
        10% { opacity: 0.6; }
        50% { transform: translateY(-50vh) translateX(15px) scale(1); opacity: 0.7; }
        90% { opacity: 0.3; }
        100% { transform: translateY(-105vh) translateX(-10px) scale(1.2); opacity: 0; }
      }
    `;
    return (
      <>
        <style>{keyframes}</style>
        {particles.map(({ i, left, delay, duration, size, color }) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              bottom: '-10px',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              border: `1.5px solid ${color}`,
              backgroundColor: 'transparent',
              opacity: 0,
              animation: `particle-bubble ${duration}s ${delay}s linear infinite`,
            }}
          />
        ))}
      </>
    );
  }

  if (config.type === 'shootingStar') {
    // Shooting stars: small white lines streaking diagonally
    const keyframes = `
      @keyframes particle-star {
        0% { transform: translate(0px, 0px) rotate(-45deg); opacity: 0; }
        5% { opacity: 1; }
        15% { opacity: 0.9; }
        20% { transform: translate(200px, 200px) rotate(-45deg); opacity: 0; }
        100% { opacity: 0; }
      }
    `;
    return (
      <>
        <style>{keyframes}</style>
        {particles.map(({ i, left, delay, duration, color }) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${(i * 12) % 60}%`,
              width: '2px',
              height: '10px',
              borderRadius: '1px',
              backgroundColor: color,
              boxShadow: `0 0 4px ${color}`,
              opacity: 0,
              animation: `particle-star ${duration * 0.6}s ${delay}s linear infinite`,
            }}
          />
        ))}
      </>
    );
  }

  return null;
}

// ─── Layer 3: Entdecker decorations (leaves, gems, acorns) ───

function EntdeckerDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Leaf 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '6%', left: '4%', opacity: 0.8 }}
        width="100"
        height="100"
        viewBox="0 0 60 60"
        variants={floatVariants([-8, 8], [-12, 12], 5.2)}
        animate={reduced ? undefined : 'animate'}
      >
        <path
          d="M30 5 C10 5, 5 30, 30 55 C55 30, 50 5, 30 5 Z"
          fill="#4caf50"
          opacity="0.8"
        />
        <line x1="30" y1="10" x2="30" y2="52" stroke="#2e7d32" strokeWidth="1.5" />
        <line x1="30" y1="28" x2="18" y2="20" stroke="#2e7d32" strokeWidth="1" />
        <line x1="30" y1="36" x2="42" y2="28" stroke="#2e7d32" strokeWidth="1" />
      </motion.svg>

      {/* Gem — top right */}
      <motion.svg
        className="absolute"
        style={{ top: '10%', right: '6%', opacity: 0.8 }}
        width="90"
        height="108"
        viewBox="0 0 40 48"
        variants={floatVariants([-10, 6], [-6, 6], 6.8)}
        animate={reduced ? undefined : 'animate'}
      >
        <polygon points="20,2 36,14 30,46 10,46 4,14" fill="#66bb6a" opacity="0.85" />
        <polygon points="20,2 36,14 20,10" fill="#a5d6a7" opacity="0.7" />
        <polygon points="4,14 20,10 10,46" fill="#388e3c" opacity="0.6" />
      </motion.svg>

      {/* Leaf 2 — lower left */}
      <motion.svg
        className="absolute"
        style={{ bottom: '20%', left: '8%', opacity: 0.7 }}
        width="120"
        height="120"
        viewBox="0 0 80 80"
        variants={floatVariants([-6, 10], [8, -8], 7.4)}
        animate={reduced ? undefined : 'animate'}
      >
        <path
          d="M40 8 C15 8, 8 45, 40 72 C72 45, 65 8, 40 8 Z"
          fill="#81c784"
          opacity="0.7"
        />
        <line x1="40" y1="14" x2="40" y2="68" stroke="#43a047" strokeWidth="2" />
        <line x1="40" y1="38" x2="22" y2="28" stroke="#43a047" strokeWidth="1.2" />
        <line x1="40" y1="50" x2="58" y2="40" stroke="#43a047" strokeWidth="1.2" />
      </motion.svg>

      {/* Acorn — lower right */}
      <motion.svg
        className="absolute"
        style={{ bottom: '22%', right: '10%', opacity: 0.75 }}
        width="88"
        height="104"
        viewBox="0 0 44 52"
        variants={floatVariants([-7, 9], [-10, 5], 8.1)}
        animate={reduced ? undefined : 'animate'}
      >
        {/* Cap */}
        <ellipse cx="22" cy="16" rx="18" ry="10" fill="#6d4c41" opacity="0.9" />
        {/* Stem */}
        <rect x="20" y="4" width="4" height="12" rx="2" fill="#4e342e" />
        {/* Body */}
        <ellipse cx="22" cy="32" rx="14" ry="18" fill="#a1887f" opacity="0.85" />
        <ellipse cx="22" cy="30" rx="10" ry="5" fill="#bcaaa4" opacity="0.4" />
      </motion.svg>

      {/* Extra leaf — mid right */}
      <motion.svg
        className="absolute"
        style={{ top: '40%', right: '3%', opacity: 0.72 }}
        width="80"
        height="80"
        viewBox="0 0 60 60"
        variants={floatVariants([-9, 7], [10, -10], 6.0)}
        animate={reduced ? undefined : 'animate'}
      >
        <path
          d="M30 5 C10 5, 5 30, 30 55 C55 30, 50 5, 30 5 Z"
          fill="#66bb6a"
          opacity="0.75"
        />
        <line x1="30" y1="10" x2="30" y2="52" stroke="#388e3c" strokeWidth="1.5" />
        <line x1="30" y1="30" x2="20" y2="22" stroke="#388e3c" strokeWidth="1" />
        <line x1="30" y1="40" x2="40" y2="32" stroke="#388e3c" strokeWidth="1" />
      </motion.svg>
    </>
  );
}

// ─── Layer 3: Abenteuer decorations (balloons, stars, streamers) ─

function AbenteuerDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Balloon 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '5%', left: '5%', opacity: 0.8 }}
        width="100"
        height="140"
        viewBox="0 0 50 70"
        variants={floatVariants([-12, 8], [-5, 5], 4.8)}
        animate={reduced ? undefined : 'animate'}
      >
        <ellipse cx="25" cy="24" rx="20" ry="22" fill="#f06292" opacity="0.85" />
        <ellipse cx="19" cy="16" rx="6" ry="8" fill="#f48fb1" opacity="0.5" />
        <path d="M25 46 Q24 54 26 62" stroke="#c2185b" strokeWidth="1.5" fill="none" />
        <circle cx="26" cy="63" r="2" fill="#c2185b" />
      </motion.svg>

      {/* Star — top right */}
      <motion.svg
        className="absolute"
        style={{ top: '8%', right: '5%', opacity: 0.85 }}
        width="96"
        height="96"
        viewBox="0 0 48 48"
        variants={floatVariants([-8, 10], [-15, 15], 5.6)}
        animate={reduced ? undefined : 'animate'}
      >
        <polygon
          points="24,4 29,18 44,18 32,27 37,42 24,33 11,42 16,27 4,18 19,18"
          fill="#ffb74d"
          opacity="0.9"
        />
        <polygon
          points="24,10 27,20 36,20 29,25 32,36 24,30 16,36 19,25 12,20 21,20"
          fill="#ffe082"
          opacity="0.6"
        />
      </motion.svg>

      {/* Balloon 2 — mid right */}
      <motion.svg
        className="absolute"
        style={{ top: '32%', right: '3%', opacity: 0.78 }}
        width="84"
        height="120"
        viewBox="0 0 42 60"
        variants={floatVariants([-10, 6], [6, -6], 6.3)}
        animate={reduced ? undefined : 'animate'}
      >
        <ellipse cx="21" cy="20" rx="17" ry="19" fill="#ff8a65" opacity="0.85" />
        <ellipse cx="16" cy="13" rx="5" ry="7" fill="#ffccbc" opacity="0.5" />
        <path d="M21 39 Q20 46 22 53" stroke="#e64a19" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="54" r="2" fill="#e64a19" />
      </motion.svg>

      {/* Streamer — lower left */}
      <motion.svg
        className="absolute"
        style={{ bottom: '18%', left: '4%', opacity: 0.75 }}
        width="120"
        height="86"
        viewBox="0 0 70 50"
        variants={floatVariants([-5, 8], [-8, 8], 7.9)}
        animate={reduced ? undefined : 'animate'}
      >
        <path
          d="M5 45 Q20 10, 35 25 Q50 40, 65 5"
          stroke="#f06292"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M5 38 Q20 3, 35 18 Q50 33, 65 -2"
          stroke="#ffb74d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </motion.svg>

      {/* Extra star — mid left */}
      <motion.svg
        className="absolute"
        style={{ top: '45%', left: '3%', opacity: 0.7 }}
        width="80"
        height="80"
        viewBox="0 0 48 48"
        variants={floatVariants([-6, 10], [-10, 10], 7.2)}
        animate={reduced ? undefined : 'animate'}
      >
        <polygon
          points="24,4 29,18 44,18 32,27 37,42 24,33 11,42 16,27 4,18 19,18"
          fill="#ba68c8"
          opacity="0.85"
        />
        <polygon
          points="24,10 27,20 36,20 29,25 32,36 24,30 16,36 19,25 12,20 21,20"
          fill="#ce93d8"
          opacity="0.5"
        />
      </motion.svg>
    </>
  );
}

// ─── Layer 3: Forscher decorations (bubbles, atoms, molecules) ─

function ForscherDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Bubble 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '6%', left: '5%', opacity: 0.75 }}
        width="96"
        height="96"
        viewBox="0 0 56 56"
        variants={floatVariants([-10, 8], [-5, 5], 5.5)}
        animate={reduced ? undefined : 'animate'}
      >
        <circle cx="28" cy="28" r="24" fill="none" stroke="#4db6ac" strokeWidth="2" />
        <ellipse cx="20" cy="20" rx="6" ry="4" fill="white" opacity="0.35" transform="rotate(-30 20 20)" />
      </motion.svg>

      {/* Atom — top right */}
      <motion.svg
        className="absolute"
        style={{ top: '4%', right: '5%', opacity: 0.8 }}
        width="110"
        height="110"
        viewBox="0 0 70 70"
        variants={floatVariants([-8, 10], [-20, 20], 6.2)}
        animate={reduced ? undefined : 'animate'}
      >
        <ellipse cx="35" cy="35" rx="30" ry="12" fill="none" stroke="#7e57c2" strokeWidth="2" />
        <ellipse cx="35" cy="35" rx="30" ry="12" fill="none" stroke="#7e57c2" strokeWidth="2" transform="rotate(60 35 35)" />
        <ellipse cx="35" cy="35" rx="30" ry="12" fill="none" stroke="#7e57c2" strokeWidth="2" transform="rotate(120 35 35)" />
        <circle cx="35" cy="35" r="5" fill="#7e57c2" opacity="0.8" />
      </motion.svg>

      {/* Bubble 2 — mid left */}
      <motion.svg
        className="absolute"
        style={{ top: '38%', left: '3%', opacity: 0.7 }}
        width="80"
        height="80"
        viewBox="0 0 38 38"
        variants={floatVariants([-12, 6], [5, -5], 7.1)}
        animate={reduced ? undefined : 'animate'}
      >
        <circle cx="19" cy="19" r="16" fill="none" stroke="#80cbc4" strokeWidth="2" />
        <ellipse cx="13" cy="13" rx="4" ry="3" fill="white" opacity="0.35" transform="rotate(-30 13 13)" />
      </motion.svg>

      {/* Molecule — lower right */}
      <motion.svg
        className="absolute"
        style={{ bottom: '18%', right: '6%', opacity: 0.78 }}
        width="120"
        height="105"
        viewBox="0 0 80 70"
        variants={floatVariants([-7, 9], [-10, 10], 8.4)}
        animate={reduced ? undefined : 'animate'}
      >
        {/* Central atom */}
        <circle cx="40" cy="35" r="8" fill="#4db6ac" opacity="0.85" />
        {/* Bonds */}
        <line x1="40" y1="35" x2="14" y2="18" stroke="#80cbc4" strokeWidth="2" />
        <line x1="40" y1="35" x2="66" y2="18" stroke="#80cbc4" strokeWidth="2" />
        <line x1="40" y1="35" x2="40" y2="62" stroke="#80cbc4" strokeWidth="2" />
        {/* Satellite atoms */}
        <circle cx="14" cy="18" r="6" fill="#7e57c2" opacity="0.8" />
        <circle cx="66" cy="18" r="6" fill="#7e57c2" opacity="0.8" />
        <circle cx="40" cy="62" r="6" fill="#7e57c2" opacity="0.8" />
      </motion.svg>

      {/* Extra bubble — mid right */}
      <motion.svg
        className="absolute"
        style={{ top: '30%', right: '4%', opacity: 0.72 }}
        width="84"
        height="84"
        viewBox="0 0 56 56"
        variants={floatVariants([-9, 7], [-6, 6], 6.6)}
        animate={reduced ? undefined : 'animate'}
      >
        <circle cx="28" cy="28" r="22" fill="none" stroke="#4dd0e1" strokeWidth="2" />
        <ellipse cx="21" cy="21" rx="5" ry="3.5" fill="white" opacity="0.3" transform="rotate(-25 21 21)" />
      </motion.svg>
    </>
  );
}

// ─── Layer 3: Weltraum decorations (stars, planets, rockets) ─

function WeltraumDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Star cluster — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '5%', left: '6%', opacity: 0.85 }}
        width="100"
        height="100"
        viewBox="0 0 60 60"
        variants={floatVariants([-6, 8], [-8, 8], 6.0)}
        animate={reduced ? undefined : 'animate'}
      >
        <circle cx="30" cy="30" r="3" fill="white" />
        <circle cx="15" cy="18" r="2" fill="#ffe082" />
        <circle cx="45" cy="14" r="1.5" fill="white" opacity="0.8" />
        <circle cx="10" cy="40" r="1.5" fill="#ffe082" opacity="0.7" />
        <circle cx="50" cy="42" r="2.5" fill="white" />
        <circle cx="35" cy="8" r="1" fill="white" opacity="0.6" />
        <circle cx="52" cy="28" r="1" fill="#ffe082" opacity="0.8" />
      </motion.svg>

      {/* Planet — top right */}
      <motion.svg
        className="absolute"
        style={{ top: '4%', right: '5%', opacity: 0.8 }}
        width="120"
        height="103"
        viewBox="0 0 70 60"
        variants={floatVariants([-10, 8], [-5, 5], 7.3)}
        animate={reduced ? undefined : 'animate'}
      >
        {/* Ring */}
        <ellipse cx="35" cy="32" rx="32" ry="10" fill="none" stroke="#ff7043" strokeWidth="3" opacity="0.7" />
        {/* Planet body */}
        <circle cx="35" cy="30" r="18" fill="#5c6bc0" opacity="0.9" />
        <circle cx="28" cy="23" r="6" fill="#7986cb" opacity="0.5" />
        <circle cx="40" cy="36" r="4" fill="#3949ab" opacity="0.4" />
      </motion.svg>

      {/* Rocket — mid left */}
      <motion.svg
        className="absolute"
        style={{ top: '35%', left: '4%', opacity: 0.8 }}
        width="80"
        height="140"
        viewBox="0 0 40 70"
        variants={floatVariants([-12, 8], [-6, 6], 5.8)}
        animate={reduced ? undefined : 'animate'}
      >
        {/* Body */}
        <rect x="14" y="20" width="12" height="30" rx="2" fill="#ff7043" opacity="0.9" />
        {/* Nose */}
        <polygon points="20,2 14,22 26,22" fill="#ff7043" opacity="0.9" />
        {/* Window */}
        <circle cx="20" cy="32" r="4" fill="#b3e5fc" opacity="0.85" />
        {/* Fins */}
        <polygon points="14,42 6,56 14,52" fill="#e64a19" opacity="0.85" />
        <polygon points="26,42 34,56 26,52" fill="#e64a19" opacity="0.85" />
        {/* Flame */}
        <ellipse cx="20" cy="53" rx="5" ry="8" fill="#ffb74d" opacity="0.8" />
        <ellipse cx="20" cy="55" rx="3" ry="5" fill="#fff176" opacity="0.7" />
      </motion.svg>

      {/* Small stars — lower right */}
      <motion.svg
        className="absolute"
        style={{ bottom: '18%', right: '7%', opacity: 0.78 }}
        width="110"
        height="80"
        viewBox="0 0 70 50"
        variants={floatVariants([-8, 6], [-12, 12], 9.1)}
        animate={reduced ? undefined : 'animate'}
      >
        <polygon points="20,5 23,14 32,14 25,20 27,29 20,23 13,29 15,20 8,14 17,14" fill="#ffb74d" opacity="0.9" />
        <circle cx="54" cy="12" r="3" fill="white" opacity="0.8" />
        <circle cx="60" cy="34" r="2" fill="#ffe082" opacity="0.7" />
        <circle cx="44" cy="40" r="1.5" fill="white" opacity="0.6" />
      </motion.svg>

      {/* Extra planet — mid right */}
      <motion.svg
        className="absolute"
        style={{ top: '42%', right: '3%', opacity: 0.72 }}
        width="80"
        height="80"
        viewBox="0 0 50 50"
        variants={floatVariants([-8, 10], [5, -5], 7.8)}
        animate={reduced ? undefined : 'animate'}
      >
        <circle cx="25" cy="25" r="16" fill="#ab47bc" opacity="0.85" />
        <circle cx="20" cy="20" r="5" fill="#ce93d8" opacity="0.5" />
        <circle cx="30" cy="30" r="3" fill="#7b1fa2" opacity="0.4" />
      </motion.svg>
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────

export function WorldBackground({ worldId }: WorldBackgroundProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  if (!worldId) return null;

  const skyGradient = SKY_GRADIENTS[worldId];
  const terrain = TERRAIN_CONFIG[worldId];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Sky gradient */}
      <div
        className="absolute inset-0"
        style={{ background: skyGradient }}
      />

      {/* Layer 2: Terrain silhouette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: terrain.color,
          clipPath: terrain.clipPath,
        }}
      />

      {/* Layer 3: Decorative SVGs */}
      {worldId === 'entdecker' && (
        <EntdeckerDecorations reduced={prefersReducedMotion} />
      )}
      {worldId === 'abenteuer' && (
        <AbenteuerDecorations reduced={prefersReducedMotion} />
      )}
      {worldId === 'forscher' && (
        <ForscherDecorations reduced={prefersReducedMotion} />
      )}
      {worldId === 'weltraum' && (
        <WeltraumDecorations reduced={prefersReducedMotion} />
      )}

      {/* Layer 4: CSS-animated particles (skip for reduced motion) */}
      {!prefersReducedMotion && <Particles worldId={worldId} />}
    </div>
  );
}
