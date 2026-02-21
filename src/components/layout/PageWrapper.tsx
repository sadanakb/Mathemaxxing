import { Navbar } from './Navbar';

type PageWrapperProps = {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
};

export function PageWrapper({ children, showNav = true, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Skip-Link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Zum Hauptinhalt springen
      </a>
      {showNav && <Navbar />}
      <main
        className={['max-w-4xl mx-auto px-4 py-6', className].join(' ')}
        id="main-content"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
