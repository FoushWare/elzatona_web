'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { usePathname } from 'next/navigation';
import { OnboardingSystem } from './OnboardingSystem';
import { useOnboarding } from '@elzatona/shared-contexts';

interface WindowWithTestFlags extends Window {
  __DISABLE_GUIDANCE_MODALS__?: boolean;
  __TEST_MODE__?: boolean;
}

export const FirstTimeVisitorDetector: React.FC = () => {
  const { showOnboarding, startOnboarding, completeOnboarding } =
    useOnboarding();
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show onboarding on admin pages
    if (pathname?.startsWith('/admin')) {
      return undefined;
    }

    // Don't show onboarding during testing
    if (
      typeof window !== 'undefined' &&
      ((window as WindowWithTestFlags).__DISABLE_GUIDANCE_MODALS__ ||
        (window as WindowWithTestFlags).__TEST_MODE__)
    ) {
      return undefined;
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
    return undefined;
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
