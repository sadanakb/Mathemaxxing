'use client';

import { useState, useEffect } from 'react';

// We load KaTeX via CDN in layout.tsx
// This component renders KaTeX formulas as HTML

type MathFormulaProps = {
  formula: string;
  display?: boolean; // false = inline, true = block
  className?: string;
};

export function MathFormula({ formula, display = false, className = '' }: MathFormulaProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    function tryRender(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const katex = (window as any).katex;
      if (typeof katex !== 'undefined') {
        try {
          const rendered = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: display,
            output: 'htmlAndMathml', // MathML for screen readers
          }) as string;
          setHtml(rendered);
          return true;
        } catch {
          // Fallback to plain text
        }
      }
      return false;
    }

    // Try immediately
    if (tryRender()) return;

    // Retry every 100ms until KaTeX is loaded (max 5s)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryRender() || attempts >= 50) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [formula, display]);

  if (!html) {
    // Fallback for SSR or if KaTeX not loaded
    return (
      <span
        className={['font-mono text-gray-800', display ? 'block text-center py-2' : 'inline', className].join(' ')}
        aria-label={formula}
      >
        {formula}
      </span>
    );
  }

  const Tag = display ? 'div' : 'span';
  return (
    <Tag
      className={['math-display', display ? 'overflow-x-auto' : '', className].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={formula}
    />
  );
}
