'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserGuidanceSystem } from './UserGuidanceSystem';
import { useUserType } from '@/contexts/UserTypeContextSafe';

interface WindowWithTestFlags extends Window {
  __DISABLE_GUIDANCE_MODALS__?: boolean;
  __TEST_MODE__?: boolean;
}

export const ComprehensiveGuidanceDetector: React.FC = () => {
  const {
    isFirstVisit,
    setIsFirstVisit,
    userType,
    setUserType,
    setHasCompletedOnboarding,
  } = useUserType();
  const [showGuidance, setShowGuidance] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show guidance on admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Don't show guidance during testing
    if (
      typeof window !== 'undefined' &&
      ((window as WindowWithTestFlags).__DISABLE_GUIDANCE_MODALS__ ||
        (window as WindowWithTestFlags).__TEST_MODE__)
    ) {
      return;
    }

    // Check if this is truly a first visit
    if (typeof window !== 'undefined') {
      const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

      if (!hasVisitedBefore && !userType) {
        // This is a first visit and no user type is set
        setShowGuidance(true);
        setIsFirstVisit(true);
        localStorage.setItem('hasVisitedBefore', 'true');
      }
    }
  }, [userType, setIsFirstVisit, pathname]);

  const handleGuidanceComplete = () => {
    setShowGuidance(false);
    setIsFirstVisit(false);
    setHasCompletedOnboarding(true);
  };

  const handleGuidanceClose = () => {
    setShowGuidance(false);
    setIsFirstVisit(false);
    setHasCompletedOnboarding(true);
  };

  // Don't show guidance on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <UserGuidanceSystem
      isOpen={showGuidance && !userType}
      onClose={handleGuidanceClose}
      onComplete={handleGuidanceComplete}
    />
  );
};
