'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { ModeSpecificOnboarding } from './ModeSpecificOnboarding';
import { useRouter } from 'next/navigation';

export const LearningModeDetector: React.FC = () => {
  const { userType, hasCompletedOnboarding } = useUserType();
  const { isAuthenticated, isLoading } = useFirebaseAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Don't show onboarding on admin pages
    if (pathname.startsWith('/admin')) {
      return;
    }

    // Only check after auth is loaded and we haven't checked yet
    if (!isLoading && !hasChecked) {
      setHasChecked(true);

      // Show onboarding if:
      // 1. User is authenticated
      // 2. Has completed initial onboarding
      // 3. Has selected a learning mode
      // 4. But hasn't seen the mode-specific onboarding
      if (
        isAuthenticated &&
        hasCompletedOnboarding &&
        userType &&
        !sessionStorage.getItem(`mode-onboarding-${userType}`)
      ) {
        setShowOnboarding(true);
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    hasCompletedOnboarding,
    userType,
    hasChecked,
    pathname,
  ]);

  const handleOnboardingComplete = () => {
    // Mark this mode's onboarding as completed
    if (userType) {
      sessionStorage.setItem(`mode-onboarding-${userType}`, 'completed');
    }

    setShowOnboarding(false);

    // Redirect to appropriate page based on mode
    if (userType === 'guided') {
      router.push('/learn');
    } else if (userType === 'self-directed') {
      router.push('/free-style-roadmap');
    }
  };

  const handleOnboardingSkip = () => {
    // Mark this mode's onboarding as skipped
    if (userType) {
      sessionStorage.setItem(`mode-onboarding-${userType}`, 'skipped');
    }

    setShowOnboarding(false);

    // Redirect to practice page
    router.push('/practice');
  };

  // Don't show onboarding on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  // Don't render anything if we're still loading or haven't checked yet
  if (isLoading || !hasChecked) {
    return null;
  }

  // Show mode-specific onboarding if conditions are met
  if (showOnboarding && userType) {
    return (
      <ModeSpecificOnboarding
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  return null;
};
