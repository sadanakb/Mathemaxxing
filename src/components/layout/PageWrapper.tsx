import { Navbar } from './Navbar';

type PageWrapperProps = {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
};

export function PageWrapper({ children, showNav = true, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {showNav && <Navbar />}
      <main
        className={['max-w-4xl mx-auto px-4 py-6', className].join(' ')}
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
