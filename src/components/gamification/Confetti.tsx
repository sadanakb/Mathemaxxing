'use client';

import { useEffect, useState } from 'react';

type ConfettiProps = {
  active: boolean;
  duration?: number;
};

const COLORS = ['#FFD700', '#10B981', '#3B82F6', '#EC4899', '#F97316'];
const PARTICLE_COUNT = 50;

type Particle = {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  drift: number;
  rotation: number;
};

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 6,
    drift: -50 + Math.random() * 100,
    rotation: Math.random() * 360,
  }));
}

export function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    setParticles(generateParticles());
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) translateX(0px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift)) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-particle {
          position: absolute;
          top: -10px;
          border-radius: 2px;
          animation: confetti-fall var(--fall-duration) ease-in forwards;
          animation-delay: var(--delay);
          opacity: 0;
          animation-fill-mode: both;
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--fall-duration': `${1.5 + Math.random() * 1.5}s`,
            transform: `rotate(${p.rotation}deg)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
