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
        {/* Gradient Definitions — Brand-unabhängig (Sunset Pink → Gold) */}
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#FF8E53" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>
          <linearGradient id="logo-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
        </defs>

        {/* Hintergrund-Kreis mit Gradient */}
        <circle cx="24" cy="24" r="22" fill="url(#logo-grad)" opacity="0.12" />

        {/* Sigma-Symbol */}
        <path
          d="M14 10 L34 10 L24 24 L34 38 L14 38"
          stroke="url(#logo-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Blitz / Aufwärtspfeil */}
        <path
          d="M30 19 L36 24 L30 29"
          stroke="url(#logo-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span
          className={`font-[family-name:var(--font-heading)] font-extrabold tracking-tight ${textSizes[size]}`}
        >
          <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent">
            Mathe
          </span>
          <span className="bg-gradient-to-r from-[#FFD93D] to-[#FF6B6B] bg-clip-text text-transparent">
            maxxing
          </span>
        </span>
      )}
    </span>
  );
}
