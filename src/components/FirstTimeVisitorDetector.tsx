'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { OnboardingSystem } from './OnboardingSystem';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const FirstTimeVisitorDetector: React.FC = () => {
  const { showOnboarding, startOnboarding, completeOnboarding } =
    useOnboarding();
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show onboarding on admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Don't show onboarding during testing
    if (
      typeof window !== 'undefined' &&
      ((window as any).__DISABLE_GUIDANCE_MODALS__ ||
        (window as any).__TEST_MODE__)
    ) {
      return;
    }

    // Check if this is a first-time visitor
    // We'll use sessionStorage to track the current session
    if (typeof window !== 'undefined') {
      const hasVisitedThisSession = sessionStorage.getItem(
        'hasVisitedThisSession'
      );

      if (!hasVisitedThisSession) {
        setIsFirstVisit(true);
        sessionStorage.setItem('hasVisitedThisSession', 'true');

        // Show onboarding after a short delay to let the page load
        const timer = setTimeout(() => {
          startOnboarding();
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [startOnboarding, pathname]);

  // Don't show onboarding if user has already seen it in this session or on admin pages
  if (!isFirstVisit || pathname?.startsWith('/admin')) return null;

  return (
    <OnboardingSystem
      isOpen={showOnboarding}
      onClose={completeOnboarding}
      onComplete={completeOnboarding}
    />
  );
};
