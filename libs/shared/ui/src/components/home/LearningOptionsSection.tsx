'use client';

import React, { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Compass,
  Target,
  Zap,
  Users,
  Settings,
  Check,
} from 'lucide-react';
import { useRTL } from '@elzatona/shared/contexts/RTLContext';
import { getPositionClass, rtlClass } from '@elzatona/shared/utils/rtl';
import { AnimatedElement } from '@elzatona/shared/ui/components/ui/AnimatedElement';
import { useUserType } from '@elzatona/shared/contexts/UserTypeContext';

interface LearningOptionsSectionProps {
  showAnimation: boolean;
  isClient: boolean;
}

export const LearningOptionsSection = memo(function LearningOptionsSection({
  showAnimation,
  isClient,
}: LearningOptionsSectionProps) {
  const { isRTL } = useRTL();
  const { setUserType, setHasCompletedOnboarding } = useUserType();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const animationConfig = {
    showAnimation,
    isClient,
  };

  const handleLearningModeSelection = (mode: 'guided' | 'freestyle') => {
    // Set the user type in context
    setUserType(mode);

    // Mark onboarding as completed
    setHasCompletedOnboarding(true);

    // Redirect to the appropriate learning page
    if (mode === 'guided') {
      router.push('/guided-learning');
    } else {
      router.push('/freestyle-learning');
    }
  };

  const learningOptions = [
    {
      id: 'guided',
      title: 'Guided Learning',
      description:
        'Structured learning paths with expert-curated content and step-by-step guidance.',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      features: [
        'Expert-curated content',
        'Step-by-step guidance',
        'Progress tracking',
        'Personalized recommendations',
      ],
    },
    {
      id: 'freestyle',
      title: 'Free Style Learning',
      description:
        'Create your own custom learning plans and explore at your own pace.',
      icon: Compass,
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      features: [
        'Custom learning plans',
        'Flexible scheduling',
        'Self-paced learning',
        'Personalized curriculum',
      ],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedElement
          as="div"
          className="text-center mb-16"
          delay="delay-200"
          {...animationConfig}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you prefer structured guidance or complete freedom, we have
            the perfect learning path for you.
          </p>
        </AnimatedElement>

        {/* Learning Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {learningOptions.map((option, index) => {
            const IconComponent = option.icon;
            const delay = `delay-${300 + index * 200}`;
            const isSelected = selectedOption === option.id;

            return (
              <AnimatedElement
                key={option.id}
                as="div"
                className="group"
                delay={delay}
                {...animationConfig}
              >
                <div
                  onClick={() => {
                    setSelectedOption(option.id);
                    handleLearningModeSelection(
                      option.id as 'guided' | 'freestyle'
                    );
                  }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 cursor-pointer h-full flex flex-col ${
                    isSelected
                      ? 'border-indigo-500 dark:border-indigo-400 shadow-xl ring-2 ring-indigo-500/20 dark:ring-indigo-400/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-8 h-8 bg-indigo-500 dark:bg-indigo-400 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Content Area - Flexible */}
                  <div className="flex-1">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-4 rounded-xl ${option.iconBg} mb-6`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${option.iconColor}`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {option.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={`flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-3', 'space-x-3')}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${option.iconColor.replace('text-', 'bg-')}`}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button - Always active */}
                  <button
                    onClick={() =>
                      handleLearningModeSelection(
                        option.id as 'guided' | 'freestyle'
                      )
                    }
                    className={`group/btn inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r ${option.color} ${option.hoverColor} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isSelected ? 'animate-pulse' : ''
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>Get Started</span>
                      <Zap className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                    </span>
                  </button>
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        {/* Selection Message */}
        {!selectedOption && (
          <AnimatedElement
            as="div"
            className="text-center mt-8"
            delay="delay-900"
            {...animationConfig}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              👆 Click on a learning option above to highlight your choice
            </p>
          </AnimatedElement>
        )}

        {/* Additional Info */}
        <AnimatedElement
          as="div"
          className="text-center mt-16"
          delay="delay-700"
          {...animationConfig}
        >
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Custom Plans Available
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Free Style learners can create completely custom learning plans
              tailored to their specific needs, schedule, and learning
              preferences. Mix and match topics, set your own pace, and track
              your progress.
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
});
