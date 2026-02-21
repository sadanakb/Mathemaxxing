'use client';

import { useEffect, useState } from 'react';

type XPPopupProps = {
  amount: number;
  visible: boolean;
  onDone?: () => void;
};

const ANIMATION_DURATION = 1500;

export function XPPopup({ amount, visible, onDone }: XPPopupProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [visible, onDone]);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes xp-float-up {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-40px);
          }
        }
        .xp-popup {
          animation: xp-float-up ${ANIMATION_DURATION}ms ease-out forwards;
        }
      `}</style>
      <div
        className="xp-popup fixed bottom-24 left-1/2 z-50"
        style={{ pointerEvents: 'none' }}
        role="status"
        aria-live="polite"
      >
        <span
          className="inline-block text-2xl font-extrabold whitespace-nowrap"
          style={{
            color: '#FFD700',
            textShadow: '0 0 8px rgba(255, 215, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          +{amount} XP
        </span>
      </div>
    </>
  );
}
