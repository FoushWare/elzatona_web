'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Play,
  Code,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Users,
  Award,
  Map,
  Compass,
  ExternalLink,
} from 'lucide-react';
import { UserTypeSelector } from '@/components/UserTypeSelector';
import { OnboardingTour } from '@/components/OnboardingTour';
import { useUserType } from '@/contexts/UserTypeContext';

type UserType = 'guided' | 'self-directed' | null;
type OnboardingState =
  | 'selection'
  | 'guided-flow'
  | 'self-directed-flow'
  | 'complete';

export default function GetStartedPage() {
  const router = useRouter();
  const {
    userType,
    setUserType,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
  } = useUserType();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    hasCompletedOnboarding ? 'complete' : 'selection'
  );
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    if (type === 'guided') {
      setOnboardingState('guided-flow');
    } else {
      setOnboardingState('self-directed-flow');
    }
  };

  const handleTourComplete = () => {
    setOnboardingState('complete');
    setShowTour(false);
    setHasCompletedOnboarding(true);
  };

  const handleTourClose = () => {
    setOnboardingState('complete');
    setShowTour(false);
    setHasCompletedOnboarding(true);
  };

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Guided Flow Steps
  const guidedSteps = [
    {
      title: 'Welcome to Guided Learning!',
      description:
        "Let's start with your first practice challenge to see how our platform works.",
      action: 'Start Your First Challenge',
      icon: <Code className="w-8 h-8" />,
      path: '/practice',
      color: 'indigo',
    },
    {
      title: 'Explore Learning Paths',
      description:
        "Now let's check out our structured learning paths designed for guided learners.",
      action: 'View Learning Paths',
      icon: <Map className="w-8 h-8" />,
      path: '/learn',
      color: 'purple',
    },
    {
      title: 'Track Your Progress',
      description:
        'See how you can monitor your learning journey and celebrate achievements.',
      action: 'View Progress Dashboard',
      icon: <Target className="w-8 h-8" />,
      path: '/progress',
      color: 'blue',
    },
    {
      title: "You're All Set!",
      description:
        "You've seen the key features. Ready to start your guided learning journey?",
      action: 'Continue Learning',
      icon: <CheckCircle className="w-8 h-8" />,
      path: '/learn',
      color: 'green',
    },
  ];

  // Self-Directed Flow Steps
  const selfDirectedSteps = [
    {
      title: 'Welcome to Self-Directed Learning!',
      description:
        "Let's explore our practice challenges and see what interests you most.",
      action: 'Browse Practice Questions',
      icon: <Code className="w-8 h-8" />,
      path: '/practice',
      color: 'indigo',
    },
    {
      title: 'Create Your Roadmap',
      description:
        'Build your own custom learning path with flexible scheduling.',
      action: 'Create Custom Roadmap',
      icon: <Compass className="w-8 h-8" />,
      path: '/learn',
      color: 'purple',
    },
    {
      title: 'Monitor Your Journey',
      description:
        'Track your progress and see your achievements as you learn at your own pace.',
      action: 'View Progress Dashboard',
      icon: <Target className="w-8 h-8" />,
      path: '/progress',
      color: 'blue',
    },
    {
      title: 'Ready to Explore!',
      description:
        "You've seen the platform. Start exploring and learning at your own pace!",
      action: 'Start Exploring',
      icon: <CheckCircle className="w-8 h-8" />,
      path: '/practice',
      color: 'green',
    },
  ];

  const currentSteps = userType === 'guided' ? guidedSteps : selfDirectedSteps;
  const currentStepData = currentSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* User Type Selection */}
      {onboardingState === 'selection' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Elzatona web!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Let's personalize your learning experience. Choose how you'd
                like to learn and we'll guide you through the platform.
              </p>
            </div>
            <UserTypeSelector onSelectUserType={handleUserTypeSelect} />
          </div>
        </div>
      )}

      {/* Guided/Self-Directed Flow */}
      {(onboardingState === 'guided-flow' ||
        onboardingState === 'self-directed-flow') && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Step {currentStep + 1} of {currentSteps.length}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {userType === 'guided'
                    ? 'Guided Learning'
                    : 'Self-Directed Learning'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    currentStepData.color === 'indigo'
                      ? 'from-indigo-500 to-indigo-600'
                      : currentStepData.color === 'purple'
                        ? 'from-purple-500 to-purple-600'
                        : currentStepData.color === 'blue'
                          ? 'from-blue-500 to-blue-600'
                          : 'from-green-500 to-green-600'
                  } transition-all duration-500`}
                  style={{
                    width: `${((currentStep + 1) / currentSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Current Step Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  currentStepData.color === 'indigo'
                    ? 'bg-indigo-100 dark:bg-indigo-900/20'
                    : currentStepData.color === 'purple'
                      ? 'bg-purple-100 dark:bg-purple-900/20'
                      : currentStepData.color === 'blue'
                        ? 'bg-blue-100 dark:bg-blue-900/20'
                        : 'bg-green-100 dark:bg-green-900/20'
                }`}
              >
                <div
                  className={`${
                    currentStepData.color === 'indigo'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : currentStepData.color === 'purple'
                        ? 'text-purple-600 dark:text-purple-400'
                        : currentStepData.color === 'blue'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {currentStepData.icon}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {currentStepData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigateToPage(currentStepData.path)}
                  className={`px-8 py-4 bg-gradient-to-r ${
                    currentStepData.color === 'indigo'
                      ? 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                      : currentStepData.color === 'purple'
                        ? 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                        : currentStepData.color === 'blue'
                          ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          : 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                  } text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <span>{currentStepData.action}</span>
                  <ExternalLink className="w-5 h-5" />
                </button>

                {currentStep < currentSteps.length - 1 && (
                  <button
                    onClick={nextStep}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Skip This Step</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  ← Previous
                </button>

                {currentStep === currentSteps.length - 1 ? (
                  <button
                    onClick={() => {
                      setOnboardingState('complete');
                      setHasCompletedOnboarding(true);
                    }}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Complete Setup ✓
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Quick Access Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigateToPage('/practice')}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Practice
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Solve challenges
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigateToPage('/learn')}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Learn
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Learning paths
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigateToPage('/progress')}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Track journey
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion State */}
      {onboardingState === 'complete' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Elzatona web!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                You're all set up and ready to start your{' '}
                {userType === 'guided' ? 'guided' : 'self-directed'} learning
                journey!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigateToPage('/practice')}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Code className="w-5 h-5" />
                  <span>Start Practicing</span>
                </button>
                <button
                  onClick={() => navigateToPage('/learn')}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Learning</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour
          isOpen={showTour}
          onClose={handleTourClose}
          onComplete={handleTourComplete}
        />
      )}
    </div>
  );
}
