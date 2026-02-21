'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { BundeslandPicker } from '@/components/onboarding/BundeslandPicker';
import { KlassenPicker } from '@/components/onboarding/KlassenPicker';
import { SchulformPicker } from '@/components/onboarding/SchulformPicker';
import { KursPicker } from '@/components/onboarding/KursPicker';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { useCurriculumStore } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { requiresKurstyp } from '@/data/curricula/schulformen';
import type { Bundesland, Klassenstufe, Schulform, Kurstyp } from '@/lib/curriculum/types';
import { applyTheme } from '@/lib/theme/theme-config';
import { Logo } from '@/components/layout/Logo';

type Step = 'bundesland' | 'klasse' | 'schulform' | 'kurs' | 'done';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  const { setBundesland, setKlasse, setSchulform, setKurstyp, bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const { initFromDB } = useProgressStore();

  const [step, setStep] = useState<Step>('bundesland');
  const [localBundesland, setLocalBundesland] = useState<Bundesland | null>(null);
  const [localKlasse, setLocalKlasse] = useState<Klassenstufe | null>(null);
  const [localSchulform, setLocalSchulform] = useState<Schulform | null>(null);
  const [localKurstyp, setLocalKurstyp] = useState<Kurstyp>('keine');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill existing values in edit mode
  useEffect(() => {
    if (isEditMode && bundesland && klasse) {
      setLocalBundesland(bundesland);
      setLocalKlasse(klasse);
      setLocalSchulform(schulform);
      setLocalKurstyp(kurstyp ?? 'keine');
    }
  }, [isEditMode, bundesland, klasse, schulform, kurstyp]);

  // If already onboarded and NOT in edit mode, redirect to dashboard
  useEffect(() => {
    if (bundesland && klasse && !isEditMode) {
      router.replace('/dashboard');
    }
  }, [bundesland, klasse, router, isEditMode]);

  // Apply theme preview
  useEffect(() => {
    applyTheme((localKlasse ?? 1) <= 4 ? 'grundschule' : 'unterstufe');
  }, [localKlasse]);

  const needsKurs = localSchulform ? requiresKurstyp(localSchulform) : false;
  const steps: Step[] = needsKurs
    ? ['bundesland', 'klasse', 'schulform', 'kurs', 'done']
    : ['bundesland', 'klasse', 'schulform', 'done'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (step) {
      case 'bundesland': return !!localBundesland;
      case 'klasse': return !!localKlasse;
      case 'schulform': return !!localSchulform;
      case 'kurs': return localKurstyp !== 'keine';
      default: return false;
    }
  };

  const handleNext = async () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= steps.length - 1) {
      // Final step — persist and navigate
      setIsLoading(true);
      try {
        setBundesland(localBundesland!);
        setKlasse(localKlasse!);
        setSchulform(localSchulform!);
        setKurstyp(needsKurs ? localKurstyp : 'keine');

        if (!isEditMode) {
          // Only create new user on initial onboarding
          const userId = crypto.randomUUID();
          await initFromDB(userId);
        }

        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep(steps[nextStepIndex]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="mb-3">
            <Logo size="md" showText={true} />
          </div>
          <Progress value={progress} label="Einrichtung" showLabel />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {step === 'bundesland' && (
              <BundeslandPicker
                selected={localBundesland}
                onSelect={setLocalBundesland}
              />
            )}
            {step === 'klasse' && (
              <KlassenPicker
                selected={localKlasse}
                onSelect={setLocalKlasse}
              />
            )}
            {step === 'schulform' && localBundesland && localKlasse && (
              <SchulformPicker
                bundesland={localBundesland}
                klasse={localKlasse}
                selected={localSchulform}
                onSelect={setLocalSchulform}
              />
            )}
            {step === 'kurs' && (
              <KursPicker
                selected={localKurstyp}
                onSelect={setLocalKurstyp}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              ← Zurück
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              loading={isLoading}
            >
              {currentStepIndex >= steps.length - 2
                ? (isEditMode ? 'Speichern ✓' : 'Los geht\'s! 🎉')
                : 'Weiter →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl animate-bounce">📐</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
