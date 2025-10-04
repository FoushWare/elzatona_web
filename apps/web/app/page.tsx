'use client';

import React, { memo, useState, useEffect } from 'react';
import { useUserType } from '@/contexts/UserTypeContext';
import { HeroSection } from '@elzatona/shared/ui/components/home/HeroSection';
import { LearningOptionsSection } from '@elzatona/shared/ui/components/home/LearningOptionsSection';
import { AnimatedBackground } from '@elzatona/shared/ui/components/home/AnimatedBackground';
import { useHomepageAnimations } from '@/hooks/useHomepageAnimations';
import { usePersonalizedContent } from '@/hooks/usePersonalizedContent';
import { SimpleOnboarding } from '@elzatona/shared/ui/components/onboarding/SimpleOnboarding';
import { OnboardingData } from '@elzatona/shared/types/learning-plans';

const HomePage = memo(function HomePage() {
  const { userType, setUserType, setHasCompletedOnboarding } = useUserType();
  const { showAnimation, isClient, hasSeenTour } = useHomepageAnimations();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { personalizedContent } = usePersonalizedContent(userType);

  // Check if user needs onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompletedOnboarding = localStorage.getItem(
        'hasCompletedOnboarding'
      );
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  // Handle onboarding completion
  const handleOnboardingComplete = (data: OnboardingData) => {
    setShowOnboarding(false);

    // Set user type and onboarding status
    setUserType(data.selectedMode === 'guided' ? 'guided' : 'self-directed');
    setHasCompletedOnboarding(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('onboardingData', JSON.stringify(data));
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  };

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
      {/* Onboarding Modal */}
      {showOnboarding && (
        <SimpleOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

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
    </div>
  );
});

export default HomePage;
