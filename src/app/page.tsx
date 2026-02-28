'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '@/components/layout/Logo';
import { Finn } from '@/components/gamification/Finn';
import { useCurriculumStore } from '@/store/curriculumStore';

export default function SplashPage() {
  const router = useRouter();
  const { bundesland, klasse } = useCurriculumStore();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Existing users go to dashboard, new users go to onboarding
      router.replace(bundesland && klasse ? '/dashboard' : '/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router, bundesland, klasse]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <Logo size="lg" showText={false} />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-extrabold bg-clip-text text-transparent"
          style={{ backgroundImage: 'var(--gradient-hero)' }}
        >
          Mathemaxxing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Finn mood="happy" size="lg" />
        </motion.div>
      </motion.div>
    </div>
  );
}
