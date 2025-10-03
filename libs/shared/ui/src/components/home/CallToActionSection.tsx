'use client';

import React, { memo, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, BookOpen, Compass } from 'lucide-react';
import { useRTL } from '@elzatona/shared/contexts/RTLContext';
import { rtlClass } from '@elzatona/shared/utils/rtl';
import { AnimatedSection } from '@elzatona/shared/ui/components/ui/AnimatedElement';
import { CallToActionSectionProps } from '@elzatona/shared/types/homepage';

export const CallToActionSection = memo(function CallToActionSection({
  showAnimation,
  onStartTour,
}: CallToActionSectionProps) {
  const { isRTL } = useRTL();
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const animationConfig = useMemo(
    () => ({ showAnimation, isClient: true }),
    [showAnimation]
  );

  // Check if this is the user's first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('hasSeenHomepageTour');
      setIsFirstVisit(!hasSeenTour);
    }
  }, []);

  return (
    <AnimatedSection
      className="final-cta-section"
      delay="delay-1500"
      {...animationConfig}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 left-8 w-6 h-6 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-4 w-3 h-3 bg-white rounded-full animate-ping"></div>
          </div>

          <div className="relative z-10">
            {isFirstVisit ? (
              <>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to Elzatona! 🎉
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Let us show you around our platform with a quick guided tour.
                  You'll learn about all the amazing features we have to offer!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={onStartTour}
                    className={`group inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <Compass className="w-5 h-5" />
                    <span>Take a Tour</span>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${rtlClass(isRTL, 'group-hover:-translate-x-1 rtl-mirror-icon', 'group-hover:translate-x-1')}`}
                    />
                  </button>
                  <Link
                    href="/get-started"
                    className={`inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105`}
                  >
                    <Play className="w-5 h-5" />
                    <span>Skip Tour & Start</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Ace Your Interviews? 🚀
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who have mastered frontend
                  interviews with our comprehensive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/get-started"
                    className={`group inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Learning Now</span>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${rtlClass(isRTL, 'group-hover:-translate-x-1 rtl-mirror-icon', 'group-hover:translate-x-1')}`}
                    />
                  </Link>
                  <Link
                    href="/learn"
                    className={`inline-flex items-center ${rtlClass(isRTL, 'space-x-reverse space-x-2', 'space-x-2')} px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Explore Learning Paths</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
});
