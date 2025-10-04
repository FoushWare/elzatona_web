'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, BookOpen, Target, Award } from 'lucide-react';
import { useRTL } from '@elzatona/shared/contexts';
import { getPositionClass, rtlClass } from '@elzatona/shared/utils';
import { AnimatedElement, AnimatedSection } from '@elzatona/shared/ui';
import {
  QuickActionsSectionProps,
  QuickAction,
} from '@elzatona/shared/types/homepage';

const quickActions: QuickAction[] = [
  {
    href: '/practice',
    icon: <Code className="w-6 h-6 text-white" />,
    title: 'Practice Challenges',
    description: 'Solve real interview questions with our interactive editor',
    color:
      'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
    iconBg: 'bg-indigo-600',
    delay: 1000,
  },
  {
    href: '/learn',
    icon: <BookOpen className="w-6 h-6 text-white" />,
    title: 'Learning Paths',
    description: 'Follow structured paths or create your own roadmap',
    color:
      'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    iconBg: 'bg-purple-600',
    delay: 1100,
  },
  {
    href: '/progress',
    icon: <Target className="w-6 h-6 text-white" />,
    title: 'Track Progress',
    description: 'Monitor your learning journey and celebrate achievements',
    color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    iconBg: 'bg-blue-600',
    delay: 1200,
  },
  {
    href: '/',
    icon: <Award className="w-6 h-6 text-white" />,
    title: 'Get Started',
    description: 'Take our interactive tour and choose your learning style',
    color:
      'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    iconBg: 'bg-green-600',
    delay: 1300,
    isHighlighted: true,
  },
];

export const QuickActionsSection = memo(function QuickActionsSection({
  showAnimation,
}: QuickActionsSectionProps) {
  const { isRTL } = useRTL();
  const animationConfig = useMemo(
    () => ({ showAnimation, isClient: true }),
    [showAnimation]
  );

  return (
    <AnimatedSection
      className="quick-actions-section bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      {...animationConfig}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedElement
            as="h2"
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            delay="delay-800"
            {...animationConfig}
          >
            Quick Actions
          </AnimatedElement>
          <AnimatedElement
            as="p"
            className="text-xl text-gray-600 dark:text-gray-300"
            delay="delay-900"
            {...animationConfig}
          >
            Jump into learning with these popular options
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((item, index) => (
            <div key={index} className="relative">
              <Link
                href={item.href}
                className={`group bg-gradient-to-br ${item.color} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  showAnimation
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${item.isHighlighted ? 'ring-2 ring-green-400 ring-opacity-50 shadow-lg get-started-card' : ''}`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div
                  className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    item.isHighlighted ? 'animate-pulse' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {item.description}
                </p>
              </Link>

              {/* Animated arrow for Get Started card */}
              {item.isHighlighted && showAnimation && (
                <div
                  className={`absolute -top-4 z-10 ${getPositionClass(isRTL, 'right', '4')}`}
                >
                  <div className="relative">
                    <ArrowRight
                      className={`w-6 h-6 text-green-500 animate-bounce ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
                    />
                    <div className="absolute inset-0">
                      <ArrowRight
                        className={`w-6 h-6 text-green-500 animate-ping opacity-75 ${rtlClass(isRTL, 'rtl-mirror-icon', '')}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pulsing border for Get Started card */}
              {item.isHighlighted && showAnimation && (
                <div className="absolute inset-0 rounded-2xl border-2 border-green-400 animate-ping opacity-20 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
});
