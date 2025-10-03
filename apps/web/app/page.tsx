'use client';

import React, { memo, useMemo } from 'react';
import { useUserType } from '@/contexts/UserTypeContext';
import { UserStatistics } from '@/components/UserStatistics';
import { GuidedTour } from '@/components/GuidedTour';
import { FloatingRTLToggle, RTLIndicator } from '@/components/RTLToggle';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickActionsSection } from '@/components/home/QuickActionsSection';
import { UserContentSection } from '@/components/home/UserContentSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';
import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import { useHomepageAnimations } from '@/hooks/useHomepageAnimations';
import { usePersonalizedContent } from '@/hooks/usePersonalizedContent';
import { UserType } from '@/types/homepage';

const HomePage = memo(function HomePage() {
  const { userType } = useUserType();
  const {
    showAnimation,
    isClient,
    showTour,
    handleTourComplete,
    handleTourSkip,
    startTour,
  } = useHomepageAnimations();

  const { hasActivePlan, activePlan, personalizedContent } =
    usePersonalizedContent(userType);

  // Memoize expensive calculations
  const shouldShowUserContent = useMemo(() => !!userType, [userType]);
  const shouldShowCTA = useMemo(() => !userType, [userType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Hero Section */}
      <HeroSection
        personalizedContent={personalizedContent}
        showAnimation={showAnimation}
        isClient={isClient}
        onStartTour={startTour}
      />

      {/* Animated stats */}
      <div
        className={`transition-all duration-1000 delay-700 ${
          showAnimation
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <UserStatistics />
      </div>

      {/* Quick Actions Section */}
      <QuickActionsSection showAnimation={showAnimation} />

      {/* User Type Specific Content */}
      {shouldShowUserContent && (
        <UserContentSection
          userType={userType}
          hasActivePlan={hasActivePlan}
          activePlan={activePlan}
          personalizedContent={personalizedContent}
          showAnimation={showAnimation}
        />
      )}

      {/* Call-to-Action Section (only for users without userType) */}
      {shouldShowCTA && <CallToActionSection showAnimation={showAnimation} />}

      {/* Guided Tour */}
      <GuidedTour
        isOpen={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />

      {/* RTL Development Tools */}
      <FloatingRTLToggle />
      <RTLIndicator />
    </div>
  );
});

export default HomePage;
