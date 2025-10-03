'use client';

import { useState, useEffect } from 'react';
import { UseHomepageAnimationsReturn } from '@/types/homepage';

export function useHomepageAnimations(): UseHomepageAnimationsReturn {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user has seen the tour
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTourValue = localStorage.getItem('hasSeenHomepageTour');
      setHasSeenTour(!!hasSeenTourValue);
    }
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

  // Tour is now manually triggered, no automatic showing

  const handleTourComplete = () => {
    setShowTour(false);
    setHasSeenTour(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenHomepageTour', 'true');
    }
  };

  const handleTourSkip = () => {
    setShowTour(false);
    setHasSeenTour(true);
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
    hasSeenTour,
    handleTourComplete,
    handleTourSkip,
    startTour,
  };
}
