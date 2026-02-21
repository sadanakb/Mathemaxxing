'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurriculumStore } from '@/store/curriculumStore';

export function Navbar() {
  const pathname = usePathname();
  const { klasse, schulform } = useCurriculumStore();

  const navItems = [
    { href: '/dashboard', label: 'Übersicht', icon: '🏠' },
    { href: '/review', label: 'Wiederholen', icon: '🔄' },
    { href: '/daily-mix', label: 'Tagesmix', icon: '✨' },
    { href: '/tutor', label: 'Tutor', icon: '🤖' },
    { href: '/settings', label: 'Einstellungen', icon: '⚙️' },
  ];

  return (
    <nav className="bg-[var(--color-surface)] border-b border-gray-200 sticky top-0 z-40 shadow-[var(--nav-shadow)]" aria-label="Hauptnavigation">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-[var(--color-primary)]">
          <span aria-hidden="true">📐</span>
          <span>MatheMeister</span>
        </Link>

        {klasse && (
          <span className="text-sm text-gray-500 hidden sm:block">
            Klasse {klasse} · {schulform}
          </span>
        )}

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-1.5 px-3 py-2 rounded-[var(--btn-radius)] text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-[var(--primary-light)] text-[var(--color-primary)]'
                  : 'text-gray-600 hover:bg-gray-100',
              ].join(' ')}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
