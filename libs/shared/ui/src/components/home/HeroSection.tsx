'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Play,
  Map,
  Compass,
} from 'lucide-react';
import { useRTL } from '@elzatona/shared/contexts/RTLContext';
import { getPositionClass, rtlClass } from '@elzatona/shared/utils/rtl';
import { AnimatedElement } from '@elzatona/shared/ui/components/ui/AnimatedElement';
import { HeroSectionProps } from '@elzatona/shared/types/homepage';

export const HeroSection = memo(function HeroSection({
  personalizedContent,
  showAnimation,
  isClient,
  isFirstVisit,
  onStartTour,
}: HeroSectionProps) {
  const { isRTL } = useRTL();

  const animationConfig = useMemo(
    () => ({ showAnimation, isClient }),
    [showAnimation, isClient]
  );

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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          {/* Animated title with sparkles */}
          <div className="relative inline-block">
            <AnimatedElement
              as="h1"
              className="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              {...animationConfig}
            >
              {personalizedContent.title}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Interviews
              </span>
            </AnimatedElement>

            {/* Animated sparkles around title */}
            {showAnimation && (
              <>
                <Sparkles
                  className={`absolute -top-4 w-8 h-8 text-yellow-400 animate-pulse ${getPositionClass(isRTL, 'right', '4')}`}
                />
                <Zap
                  className={`absolute -bottom-2 w-6 h-6 text-blue-400 animate-bounce ${getPositionClass(isRTL, 'left', '4')}`}
                  style={{ animationDelay: '0.5s' }}
                />
                <Star
                  className={`absolute top-1/2 w-5 h-5 text-purple-400 animate-ping ${getPositionClass(isRTL, 'right', '8')}`}
                  style={{ animationDelay: '1s' }}
                />
              </>
            )}
          </div>

          {/* Animated subtitle */}
          <AnimatedElement
            as="p"
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            delay="delay-300"
            {...animationConfig}
          >
            {personalizedContent.subtitle}
          </AnimatedElement>
        </div>

        {/* Animated CTA Button */}
        <AnimatedElement
          className="mb-12"
          delay="delay-500"
          {...animationConfig}
        >
          <div className="relative inline-block">
            {isFirstVisit ? (
              // First-time visitor: Show Explore Options button
              <button
                onClick={onStartTour}
                className="main-cta-button group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span
                  className={`relative z-10 flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')}`}
                >
                  <Compass className="w-6 h-6" />
                  <span>Explore Options</span>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${rtlClass(isRTL, 'group-hover:-translate-x-1 rtl-mirror-icon', 'group-hover:translate-x-1')}`}
                  />
                </span>
              </button>
            ) : (
              // Returning visitor: Show personalized content
              <Link
                href={personalizedContent.ctaLink}
                className={`main-cta-button group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r ${
                  personalizedContent.color === 'indigo'
                    ? 'from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    : personalizedContent.color === 'purple'
                      ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                } text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span
                  className={`relative z-10 flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')}`}
                >
                  {renderIcon(personalizedContent.icon)}
                  <span>{personalizedContent.cta}</span>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${rtlClass(isRTL, 'group-hover:-translate-x-1 rtl-mirror-icon', 'group-hover:translate-x-1')}`}
                  />
                </span>
              </Link>
            )}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
});
