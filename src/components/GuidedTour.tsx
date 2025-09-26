'use client';

import React, { useState, useCallback } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import { ArrowRight, Play, BookOpen, Target, Award } from 'lucide-react';

interface GuidedTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const steps = [
  {
    selector: '.hero-title',
    content: (
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Elzatona! 🚀
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Master frontend development interviews with our comprehensive
          platform. Let me show you around!
        </p>
      </div>
    ),
  },
  {
    selector: '.main-cta-button',
    content: (
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Start Your Journey! 🎯
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Click here to choose your learning path - guided or self-directed.
          This is where your interview preparation begins!
        </p>
      </div>
    ),
  },
  {
    selector: '.quick-actions-section',
    content: (
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Actions ⚡
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Explore these popular features to jump into learning immediately. Each
          option is designed to help you succeed!
        </p>
      </div>
    ),
  },
  {
    selector: '.get-started-card',
    content: (
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Get Started Card 🌟
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This highlighted card is your gateway to the platform. It will guide
          you through choosing your learning style!
        </p>
      </div>
    ),
  },
  {
    selector: '.final-cta-section',
    content: (
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to Begin? 🎉
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          You're all set! Click "Start Learning Now" to begin your journey or
          explore the learning paths to see what's available.
        </p>
      </div>
    ),
  },
];

const TourContent: React.FC<GuidedTourProps> = ({
  isOpen,
  onComplete,
  onSkip,
}) => {
  const { setIsOpen, isOpen: tourIsOpen } = useTour();

  React.useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onComplete();
  }, [setIsOpen, onComplete]);

  return null; // The tour is handled by TourProvider
};

export const GuidedTour: React.FC<GuidedTourProps> = props => {
  return (
    <TourProvider
      steps={steps}
      isOpen={props.isOpen}
      onRequestClose={props.onComplete}
      onAfterOpen={() => {
        // Optional: Add any logic when tour opens
      }}
      onAfterClose={() => {
        // Optional: Add any logic when tour closes
      }}
      styles={{
        popover: base => ({
          ...base,
          '--reactour-accent': '#6366f1',
          borderRadius: 12,
          padding: 20,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backgroundColor: '#ffffff',
          color: '#1f2937',
        }),
        maskArea: base => ({ ...base, rx: 12 }),
        maskWrapper: base => ({ ...base, color: 'rgba(0, 0, 0, 0.4)' }),
        badge: base => ({
          ...base,
          left: 'auto',
          right: '-0.8125em',
          backgroundColor: '#6366f1',
          color: '#ffffff',
        }),
        controls: base => ({
          ...base,
          marginTop: 20,
        }),
        close: base => ({
          ...base,
          right: 'auto',
          left: 8,
          top: 8,
          color: '#6b7280',
        }),
      }}
      padding={10}
      className="tour-container"
    >
      <TourContent {...props} />
    </TourProvider>
  );
};
