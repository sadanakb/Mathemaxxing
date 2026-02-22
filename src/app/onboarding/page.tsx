'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BundeslandPicker } from '@/components/onboarding/BundeslandPicker';
import { KlassenPicker } from '@/components/onboarding/KlassenPicker';
import { SchulformPicker } from '@/components/onboarding/SchulformPicker';
import { KursPicker } from '@/components/onboarding/KursPicker';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Icon } from '@/components/ui/Icon';
import { useCurriculumStore, useCurrentTheme } from '@/store/curriculumStore';
import { useProgressStore } from '@/store/progressStore';
import { requiresKurstyp } from '@/data/curricula/schulformen';
import { THEMES } from '@/lib/theme/theme-config';
import { Finn } from '@/components/gamification/Finn';
import type { Bundesland, Klassenstufe, Schulform, Kurstyp } from '@/lib/curriculum/types';
import { applyTheme } from '@/lib/theme/theme-config';
import { Logo } from '@/components/layout/Logo';

type Step = 'bundesland' | 'klasse' | 'schulform' | 'kurs' | 'done';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const theme = useCurrentTheme();
  const showMascot = THEMES[theme].mascot;

  const { setBundesland, setKlasse, setSchulform, setKurstyp, bundesland, klasse, schulform, kurstyp } = useCurriculumStore();
  const { initFromDB } = useProgressStore();

  const [step, setStep] = useState<Step>('bundesland');
  const [direction, setDirection] = useState(1);
  const [localBundesland, setLocalBundesland] = useState<Bundesland | null>(null);
  const [localKlasse, setLocalKlasse] = useState<Klassenstufe | null>(null);
  const [localSchulform, setLocalSchulform] = useState<Schulform | null>(null);
  const [localKurstyp, setLocalKurstyp] = useState<Kurstyp>('keine');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && bundesland && klasse) {
      setLocalBundesland(bundesland);
      setLocalKlasse(klasse);
      setLocalSchulform(schulform);
      setLocalKurstyp(kurstyp ?? 'keine');
    }
  }, [isEditMode, bundesland, klasse, schulform, kurstyp]);

  useEffect(() => {
    if (bundesland && klasse && !isEditMode) {
      router.replace('/dashboard');
    }
  }, [bundesland, klasse, router, isEditMode]);

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

  const isFinalStep = currentStepIndex >= steps.length - 2;

  const handleNext = async () => {
    setDirection(1);
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= steps.length - 1) {
      setIsLoading(true);
      try {
        setBundesland(localBundesland!);
        setKlasse(localKlasse!);
        setSchulform(localSchulform!);
        setKurstyp(needsKurs ? localKurstyp : 'keine');

        if (!isEditMode) {
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
    setDirection(-1);
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--color-surface)] border-b border-gray-100 px-4 py-4 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="mb-3 flex items-center gap-3">
            <Logo size="md" showText={true} />
          </div>
          <Progress value={progress} variant="gradient" size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Finn greeting (only Grundschule theme) */}
          {showMascot && step === 'bundesland' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Finn mood="happy" size="sm" message="Hi! Lass uns loslegen!" />
            </motion.div>
          )}

          <div className="bg-[var(--color-surface)] rounded-[var(--card-radius)] shadow-lg border border-gray-100 p-6 sm:p-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              <Icon name="chevron-left" size={16} />
              Zurück
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              loading={isLoading}
              size={isFinalStep ? 'lg' : 'md'}
            >
              {isFinalStep
                ? (isEditMode ? 'Speichern' : 'Los geht\'s!')
                : 'Weiter'}
              {!isFinalStep && <Icon name="chevron-right" size={16} />}
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
        <Logo size="lg" showText={false} />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
