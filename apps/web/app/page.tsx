'use client';

import React, { memo, useMemo } from 'react';
import { useUserType } from '@/contexts/UserTypeContext';
import { GuidedTour } from '@elzatona/shared/ui/components/GuidedTour';
import { HeroSection } from '@elzatona/shared/ui/components/home/HeroSection';
import { LearningOptionsSection } from '@elzatona/shared/ui/components/home/LearningOptionsSection';
import { AnimatedBackground } from '@elzatona/shared/ui/components/home/AnimatedBackground';
import { useHomepageAnimations } from '@/hooks/useHomepageAnimations';
import { usePersonalizedContent } from '@/hooks/usePersonalizedContent';

const HomePage = memo(function HomePage() {
  const { userType } = useUserType();
  const {
    showAnimation,
    isClient,
    showTour,
    hasSeenTour,
    handleTourComplete,
    handleTourSkip,
    startTour,
  } = useHomepageAnimations();

  const { personalizedContent } = usePersonalizedContent(userType);

  // Function to scroll to learning options section
  const scrollToLearningOptions = () => {
    const learningSection = document.getElementById('learning-options');
    if (learningSection) {
      learningSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Hero Section */}
      <HeroSection
        personalizedContent={personalizedContent}
        showAnimation={showAnimation}
        isClient={isClient}
        isFirstVisit={!hasSeenTour}
        onStartTour={scrollToLearningOptions}
      />

      {/* Learning Options Section */}
      <div id="learning-options">
        <LearningOptionsSection
          showAnimation={showAnimation}
          isClient={isClient}
        />
      </div>

      {/* Guided Tour */}
      <GuidedTour
        isOpen={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </div>
  );
});

export default HomePage;
