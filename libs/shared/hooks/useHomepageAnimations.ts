'use client';

import { useState, useEffect } from 'react';
import { UseHomepageAnimationsReturn } from '@/types/homepage';

export function useHomepageAnimations(): UseHomepageAnimationsReturn {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Trigger animation on mount
  useEffect(() => {
    if (!isClient) return;

    // Ensure DOM is ready and hydration is complete
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100); // Reduced delay for faster animation

    // Fallback to ensure animation shows even if timer fails
    const fallbackTimer = setTimeout(() => {
      setShowAnimation(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isClient]);

  // Check if user should see the tour (first visit)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('hasSeenHomepageTour');
      if (!hasSeenTour) {
        // Show tour after animations complete
        const tourTimer = setTimeout(() => {
          setShowTour(true);
        }, 2000);
        return () => clearTimeout(tourTimer);
      }
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenHomepageTour', 'true');
    }
  };

  const handleTourSkip = () => {
    setShowTour(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenHomepageTour', 'true');
    }
  };

  const startTour = () => {
    setShowTour(true);
  };

  return {
    showAnimation,
    isClient,
    showTour,
    handleTourComplete,
    handleTourSkip,
    startTour,
  };
}
