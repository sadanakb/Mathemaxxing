'use client';

import { useEffect } from 'react';
import { useCurrentTheme, useCurrentWorld } from '@/store/curriculumStore';
import { applyTheme } from '@/lib/theme/theme-config';
import { applyWorld } from '@/lib/theme/worlds';

/**
 * Reads the current theme and world from the curriculum store and applies them
 * to the document root via data-theme and data-world attributes.
 *
 * Place once in the root layout — it renders no visible output.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useCurrentTheme();
  const world = useCurrentWorld();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyWorld(world);
  }, [world]);

  return <>{children}</>;
}
