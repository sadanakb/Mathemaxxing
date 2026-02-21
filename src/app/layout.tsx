import type { Metadata, Viewport } from 'next';
import { DragDropInit } from '@/components/layout/DragDropInit';
import { ServiceWorkerRegistration } from '@/components/layout/ServiceWorkerRegistration';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MatheMeister — Lerne Mathe nach deinem Lehrplan',
  description: 'Interaktives Mathe-Lernprogramm für Klassen 1-7, angepasst an alle deutschen Bundesländer und Schulformen.',
  manifest: '/manifest.json',
  keywords: ['Mathe', 'Lernen', 'Schule', 'Deutschland', 'Bundesland', 'Lehrplan'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF6B35',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/katex.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/katex.min.js"
          crossOrigin="anonymous"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <ThemeProvider>
          <DragDropInit />
          <ServiceWorkerRegistration />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
