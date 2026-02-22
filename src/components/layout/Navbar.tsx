'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurriculumStore } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { Logo } from './Logo';
import { Badge } from '@/components/ui/Badge';
import { Icon, type IconName } from '@/components/ui/Icon';
import type { BadgeVariant } from '@/components/ui/Badge';
import type { Schulform } from '@/lib/curriculum/types';

function schulformBadgeVariant(sf: Schulform | null): BadgeVariant {
  if (!sf) return 'default';
  if (sf === 'Gymnasium') return 'gymnasium';
  if (sf === 'Realschule' || sf === 'Realschule plus') return 'realschule';
  if (sf === 'Hauptschule' || sf === 'Mittelschule' || sf === 'Werkrealschule') return 'hauptschule';
  if (sf === 'Grundschule') return 'grundschule';
  return 'gesamtschule';
}

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
};

const primaryNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'home' },
  { href: '/map', label: 'Lernpfad', icon: 'map' },
  { href: '/daily-mix', label: 'Tagesmix', icon: 'sparkle' },
  { href: '/leaderboard', label: 'Liga', icon: 'trophy' },
];

const secondaryNavItems: NavItem[] = [
  { href: '/review', label: 'Wiederholen', icon: 'refresh' },
  { href: '/shop', label: 'Shop', icon: 'shop' },
  { href: '/tutor', label: 'Tutor', icon: 'brain' },
  { href: '/settings', label: 'Einstellungen', icon: 'settings' },
  { href: '/parent', label: 'Eltern', icon: 'parent' },
];

export function Navbar() {
  const pathname = usePathname();
  const { klasse, schulform } = useCurriculumStore();
  const level = useProgressStore((s) => s.progress?.level ?? 1);
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const isMoreActive = secondaryNavItems.some((item) => isActive(item.href));

  return (
    <>
      {/* ── Desktop: Left Sidebar (≥ md) ─────────────────────── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-[var(--color-surface)] border-r border-gray-100 flex-col z-40 shadow-sm"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center">
            <Logo size="md" showText={true} />
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {[...primaryNavItems, ...secondaryNavItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
                isActive(item.href)
                  ? 'bg-[var(--primary-light)] text-[var(--color-primary)]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <Icon
                name={item.icon}
                size={20}
                className={isActive(item.href) ? 'text-[var(--color-primary)]' : 'text-gray-400'}
              />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-sm">
              {level}
            </div>
            <div className="flex flex-col">
              {klasse && (
                <span className="text-sm font-medium text-gray-700">
                  Klasse {klasse}
                </span>
              )}
              {schulform && (
                <Badge variant={schulformBadgeVariant(schulform)} className="mt-0.5">
                  {schulform}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile: Bottom Tab Bar (< md) ────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-gray-100 z-40 shadow-[var(--nav-shadow)]"
        aria-label="Hauptnavigation"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around px-2 py-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 min-w-[56px]"
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {isActive(item.href) && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[var(--color-primary)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                name={item.icon}
                size={22}
                className={
                  isActive(item.href)
                    ? 'text-[var(--color-primary)]'
                    : 'text-gray-400'
                }
              />
              <span
                className={[
                  'text-[10px] font-medium',
                  isActive(item.href)
                    ? 'text-[var(--color-primary)]'
                    : 'text-gray-400',
                ].join(' ')}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {/* More Tab */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-2 min-w-[56px]"
            aria-expanded={moreOpen}
            aria-label="Mehr Optionen"
          >
            {isMoreActive && !moreOpen && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[var(--color-primary)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              name="more"
              size={22}
              className={
                moreOpen || isMoreActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-gray-400'
              }
            />
            <span
              className={[
                'text-[10px] font-medium',
                moreOpen || isMoreActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-gray-400',
              ].join(' ')}
            >
              Mehr
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile: "More" Sheet ─────────────────────────────── */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] rounded-t-3xl z-50 pb-24 shadow-2xl"
              style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom, 0px))` }}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
              <div className="px-4 space-y-1">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={[
                      'flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-colors',
                      isActive(item.href)
                        ? 'bg-[var(--primary-light)] text-[var(--color-primary)]'
                        : 'text-gray-700 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    <Icon
                      name={item.icon}
                      size={22}
                      className={isActive(item.href) ? 'text-[var(--color-primary)]' : 'text-gray-400'}
                    />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
