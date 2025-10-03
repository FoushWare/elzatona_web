'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Play, Map } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';
import { rtlClass } from '@/utils/rtl';
import { AnimatedSection } from '@/components/ui/AnimatedElement';
import { UserContentSectionProps } from '@/types/homepage';

export const UserContentSection = memo(function UserContentSection({
  userType,
  hasActivePlan,
  activePlan,
  personalizedContent,
  showAnimation,
}: UserContentSectionProps) {
  const { isRTL } = useRTL();

  if (!userType) return null;

  const animationConfig = useMemo(() => ({ showAnimation, isClient: true }), [showAnimation]);

  // Render icon based on icon type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'play':
        return <Play className="w-6 h-6" />;
      case 'map':
        return <Map className="w-6 h-6" />;
      case 'compass':
        return <Compass className="w-6 h-6" />;
      default:
        return <Play className="w-6 h-6" />;
    }
  };

  return (
    <AnimatedSection
      delay="delay-1400"
      {...animationConfig}
    >
      <div className="max-w-7xl mx-auto">
        {userType === 'guided' ? (
          <div
            className={`bg-gradient-to-r ${
              hasActivePlan
                ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                : 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
            } rounded-2xl p-8 relative overflow-hidden`}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-8 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
            </div>

            <div className="text-center relative z-10">
                <div
                  className={`w-16 h-16 ${
                    hasActivePlan ? 'bg-green-600' : 'bg-indigo-600'
                  } rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}
                >
                  {renderIcon(personalizedContent.icon)}
                </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {personalizedContent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {personalizedContent.subtitle}
              </p>
              {hasActivePlan && activePlan && (
                <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Current Plan:{' '}
                    <span className="font-semibold">{activePlan.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {activePlan.totalQuestions} questions • {activePlan.estimatedTime}
                  </div>
                </div>
              )}
              <Link
                href={personalizedContent.ctaLink}
                className={`inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-6 py-3 ${
                  hasActivePlan
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              >
                <span>{personalizedContent.cta}</span>
                <ArrowRight
                  className={`w-4 h-4 ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 left-6 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-6 left-12 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 right-6 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
            </div>

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Self-Directed Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You&apos;re creating your own roadmap. Explore content freely and
                build your personalized learning journey.
              </p>
              <Link
                href="/free-style-roadmap"
                className={`inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              >
                <span>View My Roadmap</span>
                <ArrowRight
                  className={`w-4 h-4 ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
});
