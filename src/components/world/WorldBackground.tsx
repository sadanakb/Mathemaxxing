'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';

type WorldId = 'entdecker' | 'abenteuer' | 'forscher' | 'weltraum';

interface WorldBackgroundProps {
  worldId: WorldId | null;
}

// ─── World gradient definitions ──────────────────────────────

const WORLD_GRADIENTS: Record<WorldId, string> = {
  entdecker:
    'linear-gradient(135deg, #d4edda 0%, #a8d5b5 30%, #c8e6c9 60%, #e8f5e9 100%)',
  abenteuer:
    'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #ffe0b2 60%, #fff3e0 100%)',
  forscher:
    'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 30%, #e8eaf6 60%, #ede7f6 100%)',
  weltraum:
    'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 30%, #1e3a5f 60%, #0d1b2a 100%)',
};

// ─── Float animation factory ──────────────────────────────────

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

// ─── Entdecker decorations (leaves, gems, acorns) ─────────────

function EntdeckerDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Leaf 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '8%', left: '5%', opacity: 0.55 }}
        width="60"
        height="60"
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
        style={{ top: '12%', right: '8%', opacity: 0.6 }}
        width="40"
        height="48"
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
        style={{ bottom: '15%', left: '10%', opacity: 0.45 }}
        width="80"
        height="80"
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
        style={{ bottom: '20%', right: '12%', opacity: 0.5 }}
        width="44"
        height="52"
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
    </>
  );
}

// ─── Abenteuer decorations (balloons, stars, streamers) ───────

function AbenteuerDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Balloon 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '6%', left: '7%', opacity: 0.65 }}
        width="50"
        height="70"
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
        style={{ top: '10%', right: '6%', opacity: 0.7 }}
        width="48"
        height="48"
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
        style={{ top: '35%', right: '4%', opacity: 0.55 }}
        width="42"
        height="60"
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
        style={{ bottom: '10%', left: '6%', opacity: 0.5 }}
        width="70"
        height="50"
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
    </>
  );
}

// ─── Forscher decorations (bubbles, atoms, molecules) ─────────

function ForscherDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Bubble 1 — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '8%', left: '6%', opacity: 0.5 }}
        width="56"
        height="56"
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
        style={{ top: '5%', right: '7%', opacity: 0.6 }}
        width="70"
        height="70"
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
        style={{ top: '40%', left: '4%', opacity: 0.4 }}
        width="38"
        height="38"
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
        style={{ bottom: '12%', right: '8%', opacity: 0.55 }}
        width="80"
        height="70"
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
    </>
  );
}

// ─── Weltraum decorations (stars, planets, rockets) ───────────

function WeltraumDecorations({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Star cluster — top left */}
      <motion.svg
        className="absolute"
        style={{ top: '7%', left: '8%', opacity: 0.7 }}
        width="60"
        height="60"
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
        style={{ top: '5%', right: '6%', opacity: 0.65 }}
        width="70"
        height="60"
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
        style={{ top: '38%', left: '5%', opacity: 0.6 }}
        width="40"
        height="70"
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
        style={{ bottom: '14%', right: '9%', opacity: 0.6 }}
        width="70"
        height="50"
        viewBox="0 0 70 50"
        variants={floatVariants([-8, 6], [-12, 12], 9.1)}
        animate={reduced ? undefined : 'animate'}
      >
        <polygon points="20,5 23,14 32,14 25,20 27,29 20,23 13,29 15,20 8,14 17,14" fill="#ffb74d" opacity="0.9" />
        <circle cx="54" cy="12" r="3" fill="white" opacity="0.8" />
        <circle cx="60" cy="34" r="2" fill="#ffe082" opacity="0.7" />
        <circle cx="44" cy="40" r="1.5" fill="white" opacity="0.6" />
      </motion.svg>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────

export function WorldBackground({ worldId }: WorldBackgroundProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  if (!worldId) return null;

  const gradient = WORLD_GRADIENTS[worldId];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{ background: gradient }}
      />

      {/* World-specific decorations */}
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
    </div>
  );
}
