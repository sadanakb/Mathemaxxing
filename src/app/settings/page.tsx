'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCurriculumStore } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { THEMES } from '@/lib/theme/theme-config';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BundeslandWappen } from '@/components/wappen/BundeslandWappen';

const DAILY_GOAL_PRESETS = [10, 15, 20, 30] as const;

export default function SettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { bundesland, klasse, schulform, themePreference, setTheme } = useCurriculumStore();
  const { progress, isLoaded, initFromDB, updateDailyGoal, exportData, importFromFile, resetProgress } =
    useProgressStore();

  // Redirect to onboarding if not set up
  useEffect(() => {
    if (!bundesland || !klasse) {
      router.replace('/onboarding');
      return;
    }
    if (!isLoaded) {
      const userId =
        typeof window !== 'undefined'
          ? localStorage.getItem('mathemeister-user-id') ?? crypto.randomUUID()
          : crypto.randomUUID();
      if (typeof window !== 'undefined') {
        localStorage.setItem('mathemeister-user-id', userId);
      }
      initFromDB(userId);
    }
  }, [bundesland, klasse, isLoaded, initFromDB, router]);

  if (!bundesland || !klasse || !schulform || !isLoaded || !progress) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-4xl mb-3 animate-bounce">⚙️</div>
            <p className="text-gray-500">Lade Einstellungen...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await importFromFile(file);
    if (result.success) {
      alert('Daten erfolgreich importiert!');
    } else {
      alert(`Fehler beim Import: ${result.error ?? 'Unbekannter Fehler'}`);
    }
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Bist du sicher? Dein gesamter Fortschritt (XP, Streak, gemeisterte Themen) wird unwiderruflich geloescht.'
    );
    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-[var(--heading-weight)] text-gray-900 mb-6">
        Einstellungen
      </h1>

      {/* A. Profile Section */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Profil</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Bundesland</span>
            <span className="font-medium text-gray-900 flex items-center gap-2">
              <BundeslandWappen bundesland={bundesland} size="sm" />
              {bundesland}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Klasse</span>
            <span className="font-medium text-gray-900">{klasse}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Schulform</span>
            <span className="font-medium text-gray-900">{schulform}</span>
          </div>
        </div>
        <Link href="/onboarding?edit=true">
          <Button variant="ghost" size="sm">
            Profil aendern
          </Button>
        </Link>
      </Card>

      {/* B. Theme Preference */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Design</h2>
        <div className="space-y-3">
          {(
            [
              { value: 'auto', label: 'Auto (nach Klasse)', description: 'Automatisch basierend auf deiner Klassenstufe' },
              { value: 'grundschule', label: THEMES.grundschule.name, description: THEMES.grundschule.description },
              { value: 'unterstufe', label: THEMES.unterstufe.name, description: THEMES.unterstufe.description },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={[
                'flex items-start gap-3 p-3 rounded-[var(--card-radius)] border-2 cursor-pointer transition-colors',
                themePreference === option.value
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              <input
                type="radio"
                name="theme"
                value={option.value}
                checked={themePreference === option.value}
                onChange={() => setTheme(option.value)}
                className="mt-1 accent-[var(--color-primary)]"
              />
              <div>
                <div className="font-medium text-gray-900 text-sm">{option.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* C. Daily Goal */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Tagesziel</h2>
        <p className="text-sm text-gray-500 mb-4">
          Aktuell: <span className="font-semibold text-gray-900">{progress.dailyGoalMinutes} Minuten</span> pro Tag
        </p>
        <div className="flex flex-wrap gap-2">
          {DAILY_GOAL_PRESETS.map((minutes) => (
            <Button
              key={minutes}
              variant={progress.dailyGoalMinutes === minutes ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => updateDailyGoal(minutes)}
            >
              {minutes} Min
            </Button>
          ))}
        </div>
      </Card>

      {/* D. Data Management */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Daten verwalten</h2>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => exportData()}>
              Daten exportieren
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Daten importieren
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
          </div>
          <hr className="border-gray-200" />
          <div>
            <Button variant="danger" size="sm" onClick={handleReset}>
              Fortschritt zuruecksetzen
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              Setzt XP, Streak und alle Themenfortschritte zurueck. Diese Aktion kann nicht rueckgaengig gemacht werden.
            </p>
          </div>
        </div>
      </Card>

      {/* E. App Info */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Ueber die App</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Version</span>
            <span className="font-medium text-gray-900">3.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fehler melden</span>
            <a
              href="https://github.com/aki-sadan/Mathemaxxing/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              GitHub Issues
            </a>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
