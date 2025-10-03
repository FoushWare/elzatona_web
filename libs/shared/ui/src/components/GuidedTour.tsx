'use client';

import React, { useState, useCallback } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import { ArrowRight, Play, BookOpen, Target, Award } from 'lucide-react';
import { useRTLDetection } from '@elzatona/shared/contexts/RTLContext';
import { rtlClass } from '@elzatona/shared/utils/rtl';

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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--tour-text)' }}
        >
          Welcome to Elzatona! 🚀
        </h3>
        <p style={{ color: 'var(--tour-text)', opacity: 0.8 }}>
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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--tour-text)' }}
        >
          Start Your Journey! 🎯
        </h3>
        <p style={{ color: 'var(--tour-text)', opacity: 0.8 }}>
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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--tour-text)' }}
        >
          Quick Actions ⚡
        </h3>
        <p style={{ color: 'var(--tour-text)', opacity: 0.8 }}>
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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--tour-text)' }}
        >
          Get Started Card 🌟
        </h3>
        <p style={{ color: 'var(--tour-text)', opacity: 0.8 }}>
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
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: 'var(--tour-text)' }}
        >
          Ready to Begin? 🎉
        </h3>
        <p style={{ color: 'var(--tour-text)', opacity: 0.8 }}>
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
  const isRTL = useRTLDetection();

  return (
    <>
      <style jsx global>{`
        :root {
          --tour-bg: #ffffff;
          --tour-text: #1f2937;
          --tour-border: #e5e7eb;
          --tour-mask: rgba(0, 0, 0, 0.4);
          --tour-close: #6b7280;
          --tour-accent: #6366f1;
          --tour-accent-hover: #4f46e5;
          --tour-disabled: #9ca3af;
        }

        .dark {
          --tour-bg: #1f2937;
          --tour-text: #f9fafb;
          --tour-border: #374151;
          --tour-mask: rgba(0, 0, 0, 0.6);
          --tour-close: #9ca3af;
          --tour-accent: #6366f1;
          --tour-accent-hover: #4f46e5;
          --tour-disabled: #6b7280;
        }

        .tour-container .reactour__popover {
          background-color: var(--tour-bg) !important;
          color: var(--tour-text) !important;
          border: 1px solid var(--tour-border) !important;
        }

        .tour-container .reactour__mask {
          color: var(--tour-mask) !important;
        }

        .tour-container .reactour__close {
          color: var(--tour-close) !important;
        }

        .tour-container .reactour__controls button {
          background-color: var(--tour-accent, #6366f1) !important;
          color: white !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 8px 16px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }

        .tour-container .reactour__controls button:hover {
          background-color: var(--tour-accent-hover, #4f46e5) !important;
          transform: translateY(-1px) !important;
        }

        .tour-container .reactour__controls button:disabled {
          background-color: var(--tour-disabled, #9ca3af) !important;
          cursor: not-allowed !important;
        }

        /* RTL-specific tour styles */
        [dir='rtl'] .tour-container .reactour__popover {
          text-align: right !important;
        }

        [dir='rtl'] .tour-container .reactour__controls {
          flex-direction: row-reverse !important;
        }

        [dir='rtl'] .tour-container .reactour__controls button {
          margin-left: 8px !important;
          margin-right: 0 !important;
        }

        [dir='rtl'] .tour-container .reactour__controls button:first-child {
          margin-left: 0 !important;
        }

        [dir='rtl'] .tour-container .reactour__badge {
          left: -0.8125em !important;
          right: auto !important;
        }

        [dir='rtl'] .tour-container .reactour__close {
          left: auto !important;
          right: 8px !important;
        }

        /* Arrow styles for light and dark modes */
        .tour-container .reactour__arrow {
          border-color: var(--tour-bg) !important;
        }

        .tour-container .reactour__arrow::before {
          border-color: var(--tour-bg) !important;
        }

        .tour-container .reactour__arrow::after {
          border-color: var(--tour-bg) !important;
        }

        /* Ensure arrow is visible in both light and dark modes */
        .tour-container .reactour__arrow[data-placement*='top'] {
          border-top-color: var(--tour-bg) !important;
        }

        .tour-container .reactour__arrow[data-placement*='bottom'] {
          border-bottom-color: var(--tour-bg) !important;
        }

        .tour-container .reactour__arrow[data-placement*='left'] {
          border-left-color: var(--tour-bg) !important;
        }

        .tour-container .reactour__arrow[data-placement*='right'] {
          border-right-color: var(--tour-bg) !important;
        }

        /* Dark mode specific arrow styling - white arrows */
        .dark .tour-container .reactour__arrow {
          border-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow::before {
          border-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow::after {
          border-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow[data-placement*='top'] {
          border-top-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow[data-placement*='bottom'] {
          border-bottom-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow[data-placement*='left'] {
          border-left-color: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow[data-placement*='right'] {
          border-right-color: #ffffff !important;
          color: #ffffff !important;
        }

        /* Override inline styles with higher specificity */
        .dark .tour-container .reactour__arrow[style*='color'] {
          color: #ffffff !important;
        }

        .dark .tour-container .reactour__arrow[style*='border-color'] {
          border-color: #ffffff !important;
        }

        /* Force white color for all arrow elements in dark mode */
        .dark .tour-container .reactour__arrow,
        .dark .tour-container .reactour__arrow * {
          color: #ffffff !important;
          border-color: #ffffff !important;
        }

        /* SVG Arrow styling for dark mode */
        .dark .tour-container svg {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container svg path {
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        .dark .tour-container svg polygon {
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        .dark .tour-container svg line {
          stroke: #ffffff !important;
        }

        /* Target all possible arrow selectors */
        .dark .tour-container [class*='arrow'] {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container [class*='arrow'] svg {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container [class*='arrow'] svg path {
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        /* Additional selectors for reactour arrows */
        .dark [data-tour-elem='arrow'] {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark [data-tour-elem='arrow'] svg {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark [data-tour-elem='arrow'] svg path {
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        /* Target any arrow-like elements */
        .dark .tour-container [class*='arrow'],
        .dark .tour-container [data-tour-elem='arrow'] {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .dark .tour-container [class*='arrow'] *,
        .dark .tour-container [data-tour-elem='arrow'] * {
          fill: #ffffff !important;
          color: #ffffff !important;
        }
      `}</style>
      <TourProvider
        steps={steps}
        styles={{
          popover: base => ({
            ...base,
            '--reactour-accent': '#6366f1',
            borderRadius: 12,
            padding: 20,
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            backgroundColor: 'var(--tour-bg, #ffffff)',
            color: 'var(--tour-text, #1f2937)',
            border: '1px solid var(--tour-border, #e5e7eb)',
            textAlign: isRTL ? 'right' : 'left',
          }),
          maskArea: base => ({ ...base, rx: 12 }),
          maskWrapper: base => ({
            ...base,
            color: 'var(--tour-mask, rgba(0, 0, 0, 0.4))',
          }),
          badge: base => ({
            ...base,
            left: isRTL ? '-0.8125em' : 'auto',
            right: isRTL ? 'auto' : '-0.8125em',
            backgroundColor: '#6366f1',
            color: '#ffffff',
          }),
          controls: base => ({
            ...base,
            marginTop: 20,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }),
          close: base => ({
            ...base,
            right: isRTL ? 8 : 'auto',
            left: isRTL ? 'auto' : 8,
            top: 8,
            color: 'var(--tour-close, #6b7280)',
          }),
        }}
        padding={10}
        className="tour-container"
      >
        <TourContent {...props} />
      </TourProvider>
    </>
  );
};
