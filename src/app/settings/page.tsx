'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCurriculumStore } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { THEMES } from '@/lib/theme/theme-config';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
import { BundeslandWappen } from '@/components/wappen/BundeslandWappen';
import Avatar from '@/components/gamification/Avatar';
import { useAvatarStore } from '@/store/avatarStore';

const DAILY_GOAL_PRESETS = [10, 15, 20, 30] as const;

type SettingsSectionProps = {
  title: string;
  icon: IconName;
  borderColor: string;
  children: React.ReactNode;
  delay?: number;
};

function SettingsSection({ title, icon, borderColor, children, delay = 0 }: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card themed className={`mb-4 border-l-4 overflow-hidden`} style={{ borderLeftColor: borderColor }}>
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${borderColor}20` }}
          >
            <Icon name={icon} size={16} color={borderColor} />
          </div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">{title}</h2>
        </div>
        {children}
      </Card>
    </motion.div>
  );
}

/** Visual daily goal selector with slider-like appearance */
function DailyGoalSelector({ current, onChange }: { current: number; onChange: (val: number) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Aktuell: <span className="font-semibold">{current} Minuten</span> pro Tag
      </p>
      <div className="flex gap-2">
        {DAILY_GOAL_PRESETS.map((minutes) => {
          const isActive = current === minutes;
          return (
            <button
              key={minutes}
              onClick={() => onChange(minutes)}
              className={`relative flex-1 py-3 rounded-xl border-2 font-bold text-sm font-[family-name:var(--font-heading)] transition-all ${
                isActive
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-lg scale-105'
                  : 'border-[var(--card-border)] bg-[var(--primary-lighter)] text-gray-600 hover:border-gray-300 hover:bg-[var(--color-surface)]'
              }`}
            >
              {minutes}
              <span className="block text-[10px] font-normal mt-0.5">
                {isActive ? 'Min' : 'Min'}
              </span>
              {isActive && (
                <motion.div
                  layoutId="goal-indicator"
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center"
                >
                  <Icon name="check" size={10} color="white" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
      {/* Visual intensity bar */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400">
        <span>Locker</span>
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-xp)' }}
            animate={{ width: `${((DAILY_GOAL_PRESETS.indexOf(current as typeof DAILY_GOAL_PRESETS[number]) + 1) / DAILY_GOAL_PRESETS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>
        <span>Intensiv</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { bundesland, klasse, schulform, themePreference, setTheme } = useCurriculumStore();
  const { progress, isLoaded, initFromDB, updateDailyGoal, exportData, importFromFile, resetProgress } =
    useProgressStore();
  const avatar = useAvatarStore();

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
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--primary-lighter)] flex items-center justify-center animate-pulse">
              <Icon name="settings" size={24} className="text-gray-400" />
            </div>
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Bist du sicher? Dein gesamter Fortschritt (XP, Streak, gemeisterte Themen) wird unwiderruflich gelöscht.'
    );
    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <PageWrapper>
      <PageTransition>
        <div className="max-w-lg mx-auto">
          {/* Header with Avatar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <Avatar size="lg" />
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)]">
                Einstellungen
              </h1>
              <p className="text-sm text-gray-500">
                Level {progress.level} &bull; {progress.xpTotal} XP
              </p>
            </div>
          </motion.div>

          {/* Profile */}
          <SettingsSection title="Profil" icon="user" borderColor="#FF6B6B" delay={0.05}>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bundesland</span>
                <span className="font-medium flex items-center gap-2">
                  <BundeslandWappen bundesland={bundesland} size="sm" />
                  {bundesland}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Klasse</span>
                <span className="font-medium">{klasse}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Schulform</span>
                <span className="font-medium">{schulform}</span>
              </div>
            </div>
            <Link href="/onboarding?edit=true">
              <Button variant="ghost" size="sm">
                <Icon name="settings" size={14} className="mr-1" />
                Profil ändern
              </Button>
            </Link>
          </SettingsSection>

          {/* Theme */}
          <SettingsSection title="Design" icon="sparkle" borderColor="#A855F7" delay={0.1}>
            <div className="space-y-3">
              {(
                [
                  { value: 'auto', label: 'Auto (nach Klasse)', description: 'Automatisch basierend auf deiner Klassenstufe', icon: 'lightning' as IconName },
                  { value: 'grundschule', label: THEMES.grundschule.name, description: THEMES.grundschule.description, icon: 'heart' as IconName },
                  { value: 'unterstufe', label: THEMES.unterstufe.name, description: THEMES.unterstufe.description, icon: 'shield' as IconName },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={[
                    'flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all',
                    themePreference === option.value
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm'
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
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <Icon name={option.icon} size={14} className="text-gray-600" />
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </SettingsSection>

          {/* Daily Goal */}
          <SettingsSection title="Tagesziel" icon="target" borderColor="#FFD93D" delay={0.15}>
            <DailyGoalSelector
              current={progress.dailyGoalMinutes}
              onChange={(val) => updateDailyGoal(val)}
            />
          </SettingsSection>

          {/* Data Management */}
          <SettingsSection title="Daten verwalten" icon="settings" borderColor="#6BCB77" delay={0.2}>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => exportData()}>
                  <Icon name="arrow-down" size={14} className="mr-1" />
                  Exportieren
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="arrow-up" size={14} className="mr-1" />
                  Importieren
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </div>
              <hr className="border-gray-100" />
              <div>
                <Button variant="danger" size="sm" onClick={handleReset}>
                  Fortschritt zurücksetzen
                </Button>
                <p className="text-xs text-gray-400 mt-2">
                  Setzt XP, Streak und alle Themenfortschritte zurück. Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
              </div>
            </div>
          </SettingsSection>

          {/* App Info */}
          <SettingsSection title="Über die App" icon="book" borderColor="#00D2FF" delay={0.25}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Version</span>
                <span className="font-medium">3.0.0</span>
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
          </SettingsSection>
        </div>
      </PageTransition>
    </PageWrapper>
  );
}
