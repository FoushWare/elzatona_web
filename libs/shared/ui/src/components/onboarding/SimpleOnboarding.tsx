'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  Code,
  Layers,
  Brain,
  Network,
  Star,
  Zap,
} from 'lucide-react';
import {
  OnboardingData,
  PlanCategory,
} from '@elzatona/shared/types/learning-plans';

interface SimpleOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const planCategories: {
  key: PlanCategory;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
}[] = [
  {
    key: 'questions',
    title: 'Practice Questions',
    description: 'HTML, CSS, JavaScript fundamentals',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  },
  {
    key: 'framework',
    title: 'Framework Mastery',
    description: 'React, Next.js, Vue, Svelte, Angular',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
  {
    key: 'problem-solving',
    title: 'Problem Solving',
    description: 'Frontend algorithms and data structures',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  {
    key: 'system-design',
    title: 'System Design',
    description: 'Design Facebook feeds, Twitter clone, etc.',
    icon: Network,
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
  },
];

const experienceLevels = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'New to frontend development',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Some experience with frontend',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'Experienced frontend developer',
  },
];

export const SimpleOnboarding: React.FC<SimpleOnboardingProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMode, setSelectedMode] = useState<
    'guided' | 'freestyle' | null
  >(null);
  const [selectedCategories, setSelectedCategories] = useState<PlanCategory[]>(
    []
  );
  const [experienceLevel, setExperienceLevel] = useState<
    'beginner' | 'intermediate' | 'advanced'
  >('intermediate');
  const [interviewDate, setInterviewDate] = useState<string>('');

  const handleCategoryToggle = (category: PlanCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedMode) {
      setCurrentStep(1);
    } else if (currentStep === 1 && selectedCategories.length > 0) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const onboardingData: OnboardingData = {
        selectedMode: selectedMode!,
        experienceLevel,
        interviewDate: interviewDate ? new Date(interviewDate) : undefined,
        preferredTopics: selectedCategories as any[],
      };
      onComplete(onboardingData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedMode !== null;
      case 1:
        return selectedCategories.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to Elzatona! 🚀
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Let's set up your learning journey
              </p>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Skip for now
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {[0, 1, 2].map(step => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-blue-500'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Step {currentStep + 1} of 3
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Learning Mode Selection */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Choose Your Learning Style
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  How would you like to approach your frontend interview
                  preparation?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Guided Learning */}
                <div
                  onClick={() => setSelectedMode('guided')}
                  className={`group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 ${
                    selectedMode === 'guided'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        selectedMode === 'guided'
                          ? 'bg-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Target
                        className={`w-8 h-8 ${
                          selectedMode === 'guided'
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Guided Learning
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Structured plans with admin-managed content. Perfect for
                      systematic preparation.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Structured curriculum</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>Time-based plans</span>
                    </div>
                  </div>
                </div>

                {/* Free Style Learning */}
                <div
                  onClick={() => setSelectedMode('freestyle')}
                  className={`group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 ${
                    selectedMode === 'freestyle'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        selectedMode === 'freestyle'
                          ? 'bg-purple-500'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Compass
                        className={`w-8 h-8 ${
                          selectedMode === 'freestyle'
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Free Style Learning
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Learn at your own pace with custom roadmaps and flexible
                      scheduling.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                      <Star className="w-4 h-4" />
                      <span>Custom roadmaps</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 dark:text-purple-400 mt-1">
                      <Zap className="w-4 h-4" />
                      <span>Flexible timing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Category Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Select Your Focus Areas
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Choose the topics you want to focus on for your interview
                  preparation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {planCategories.map(category => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.key);

                  return (
                    <div
                      key={category.key}
                      onClick={() => handleCategoryToggle(category.key)}
                      className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? category.gradient
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isSelected
                                ? 'text-white'
                                : 'text-gray-600 dark:text-gray-300'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {category.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {category.description}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Experience Level & Interview Date */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Tell Us About Yourself
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Help us personalize your learning experience
                </p>
              </div>

              <div className="space-y-8">
                {/* Experience Level */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    What's your experience level?
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {experienceLevels.map(level => (
                      <div
                        key={level.value}
                        onClick={() => setExperienceLevel(level.value as any)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                          experienceLevel === level.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                        }`}
                      >
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {level.label}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {level.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Date (Optional) */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    When is your interview? (Optional)
                  </h4>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={e => setInterviewDate(e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Select interview date"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    This helps us create a personalized timeline for your
                    preparation
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-8 py-6 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>{currentStep === 2 ? 'Complete Setup' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
