'use client';

export type IconName =
  | 'home' | 'map' | 'flame' | 'star' | 'coin' | 'trophy'
  | 'book' | 'check' | 'x' | 'chevron-right' | 'chevron-left'
  | 'lock' | 'unlock' | 'settings' | 'user' | 'users'
  | 'lightning' | 'target' | 'gift' | 'crown' | 'shield'
  | 'sparkle' | 'heart' | 'clock' | 'calendar' | 'chart'
  | 'refresh' | 'plus' | 'minus' | 'arrow-up' | 'arrow-down'
  | 'menu' | 'more' | 'shop' | 'brain' | 'parent';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

const iconPaths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  map: (
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  flame: (
    <path d="M12 2c.5 3.5-1 6-3 8 1.5.5 3 .5 4-1 0 4-2.5 7-6 8.5C10 18 12 15 12 12c-2.5 2-4 4-4 7-2-1.5-3.5-4-3.5-7 0-4 3.5-7 7.5-10z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5S9.5 8 9.5 9.5 11 11.5 12 12s2.5 1 2.5 2.5S13.5 16.5 12 16.5 9.5 16 9.5 15M12 7v1.5M12 15.5V17" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3h12v7a6 6 0 01-12 0V3zM9 21h6M12 16v5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  book: (
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V5a2 2 0 012-2h14v14H6.5A2.5 2.5 0 004 19.5z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  x: (
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-right': (
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-left': (
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  unlock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11V7a5 5 0 019.9-1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  lightning: (
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  gift: (
    <>
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  crown: (
    <path d="M2 20h20L19 8l-4.5 5L12 4l-2.5 9L5 8l-3 12z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  sparkle: (
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chart: (
    <>
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  refresh: (
    <>
      <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  plus: (
    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
  ),
  minus: (
    <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'arrow-up': (
    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'arrow-down': (
    <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  menu: (
    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
  ),
  more: (
    <>
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
    </>
  ),
  shop: (
    <>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  brain: (
    <>
      <path d="M12 2a5 5 0 014.5 2.8A4 4 0 0120 9c0 1.5-.8 2.8-2 3.5.3.6.5 1.3.5 2 0 2.5-2 4.5-4.5 4.5H10c-2.5 0-4.5-2-4.5-4.5 0-.7.2-1.4.5-2A4 4 0 014 9a4 4 0 013.5-4.2A5 5 0 0112 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v20" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  parent: (
    <>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function Icon({ name, size = 24, color, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? 'currentColor'}
      strokeWidth={2}
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
