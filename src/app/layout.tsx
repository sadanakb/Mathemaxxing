import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Source_Sans_3 } from 'next/font/google';
import { DragDropInit } from '@/components/layout/DragDropInit';
import { ServiceWorkerRegistration } from '@/components/layout/ServiceWorkerRegistration';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

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
      <body className={`${plusJakarta.variable} ${sourceSans.variable}`}>
        <ThemeProvider>
          <DragDropInit />
          <ServiceWorkerRegistration />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
