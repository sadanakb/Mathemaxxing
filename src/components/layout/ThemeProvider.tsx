'use client';

import { useEffect } from 'react';
import { useCurrentTheme } from '@/store/curriculumStore';
import { applyTheme } from '@/lib/theme/theme-config';

/**
 * Reads the current theme from the curriculum store and applies it
 * to the document root via data-theme attribute.
 *
 * Place once in the root layout — it renders no visible output.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useCurrentTheme();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <>{children}</>;
}
