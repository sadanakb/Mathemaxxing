'use client';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
};

const sizes = {
  sm: 24,
  md: 32,
  lg: 48,
};

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const px = sizes[size];
  const textSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' };

  return (
    <span className="flex items-center gap-2">
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        {/* Hintergrund-Kreis */}
        <circle cx="24" cy="24" r="22" fill="var(--color-primary)" opacity="0.12" />

        {/* Sigma-Symbol als Dreieck (Summe) */}
        <path
          d="M14 10 L34 10 L24 24 L34 38 L14 38"
          stroke="var(--color-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Kleiner Blitz / Aufwärtspfeil rechts */}
        <path
          d="M30 19 L36 24 L30 29"
          stroke="var(--color-secondary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span
          className={`font-extrabold tracking-tight text-[var(--color-primary)] ${textSizes[size]}`}
        >
          Mathe<span className="text-[var(--color-secondary)]" style={{ color: 'var(--color-secondary)' }}>maxxing</span>
        </span>
      )}
    </span>
  );
}
