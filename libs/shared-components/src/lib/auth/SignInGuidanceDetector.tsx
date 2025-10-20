'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { usePathname } from 'next/navigation';
import { SignInGuidance } from './SignInGuidance';
import { useRouter } from 'next/navigation';

interface SignInGuidanceDetectorProps {
  userId?: string;
}

interface GuidanceContext {
  progress?: {
    completedQuestions: number;
    totalQuestions: number;
    percentage: number;
  };
  roadmap?: {
    topics: string[];
    estimatedTime: string;
  };
  achievements?: {
    badges: string[];
    streak: number;
  };
  deviceSwitch?: {
    fromDevice: string;
    toDevice: string;
  };
  progressCount?: number;
  roadmapSections?: number;
  achievement?: string;
  deviceType?: string;
}

interface WindowWithGuidance extends Window {
  triggerSignInGuidance?: (
    trigger:
      | 'progress'
      | 'roadmap'
      | 'achievement'
      | 'device-switch'
      | 'manual',
    context?: GuidanceContext
  ) => void;
}

export const SignInGuidanceDetector: React.FC<SignInGuidanceDetectorProps> = ({
  userId,
}) => {
  const [showGuidance, setShowGuidance] = useState(false);
  const [guidanceTrigger, setGuidanceTrigger] = useState<
    'progress' | 'roadmap' | 'achievement' | 'device-switch' | 'manual'
  >('manual');
  const [guidanceContext, setGuidanceContext] = useState<GuidanceContext>({});
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is already signed in
  useEffect(() => {
    if (userId) {
      return; // User is signed in, no need to show guidance
    }
  }, [userId]);

  // Track user progress and trigger guidance
  useEffect(() => {
    // Don't show guidance during testing
    if (
      typeof window !== 'undefined' &&
      ((window as any).__DISABLE_GUIDANCE_MODALS__ ||
        (window as any).__TEST_MODE__)
    ) {
      return;
    }

    const trackProgress = () => {
      // Check localStorage for progress
      const progress = localStorage.getItem('userProgress');
      const roadmap = localStorage.getItem('freeStyleRoadmap');
      const achievements = localStorage.getItem('userAchievements');
      const lastGuidanceShown = localStorage.getItem('lastSignInGuidanceShown');
      const lastGuidanceDate = lastGuidanceShown
        ? new Date(lastGuidanceShown)
        : null;
      const now = new Date();

      // Don't show guidance if shown within last 24 hours
      if (
        lastGuidanceDate &&
        now.getTime() - lastGuidanceDate.getTime() < 24 * 60 * 60 * 1000
      ) {
        return;
      }

      // Parse progress data
      let progressCount = 0;
      let roadmapSections = 0;
      let hasAchievements = false;

      if (progress) {
        try {
          const progressData = JSON.parse(progress);
          progressCount = progressData.completedQuestions || 0;
        } catch (e) {
          console.error('Error parsing progress data:', e);
        }
      }

      if (roadmap) {
        try {
          const roadmapData = JSON.parse(roadmap);
          roadmapSections = Array.isArray(roadmapData) ? roadmapData.length : 0;
        } catch (e) {
          console.error('Error parsing roadmap data:', e);
        }
      }

      if (achievements) {
        try {
          const achievementsData = JSON.parse(achievements);
          hasAchievements = achievementsData.length > 0;
        } catch (e) {
          console.error('Error parsing achievements data:', e);
        }
      }

      // Determine trigger based on user activity
      if (progressCount >= 5 && progressCount % 5 === 0) {
        // Show guidance every 5 questions completed
        setGuidanceTrigger('progress');
        setGuidanceContext({ progressCount });
        setShowGuidance(true);
        localStorage.setItem('lastSignInGuidanceShown', now.toISOString());
      } else if (roadmapSections >= 3) {
        // Show guidance when user has selected a substantial roadmap
        setGuidanceTrigger('roadmap');
        setGuidanceContext({ roadmapSections });
        setShowGuidance(true);
        localStorage.setItem('lastSignInGuidanceShown', now.toISOString());
      } else if (hasAchievements) {
        // Show guidance when user has achievements
        setGuidanceTrigger('achievement');
        setGuidanceContext({ achievement: 'Learning Streak!' });
        setShowGuidance(true);
        localStorage.setItem('lastSignInGuidanceShown', now.toISOString());
      }
    };

    // Check for progress on page load
    trackProgress();

    // Set up interval to check progress periodically
    const interval = setInterval(trackProgress, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Detect device switching
  useEffect(() => {
    // Don't show guidance during testing
    if (
      typeof window !== 'undefined' &&
      ((window as any).__DISABLE_GUIDANCE_MODALS__ ||
        (window as any).__TEST_MODE__)
    ) {
      return;
    }

    const detectDeviceSwitch = () => {
      const lastDevice = localStorage.getItem('lastDeviceType');
      const currentDevice = getDeviceType();

      if (lastDevice && lastDevice !== currentDevice) {
        // User switched devices
        const lastGuidanceShown = localStorage.getItem(
          'lastSignInGuidanceShown'
        );
        const lastGuidanceDate = lastGuidanceShown
          ? new Date(lastGuidanceShown)
          : null;
        const now = new Date();

        // Only show if not shown in last 2 hours
        if (
          !lastGuidanceDate ||
          now.getTime() - lastGuidanceDate.getTime() > 2 * 60 * 60 * 1000
        ) {
          setGuidanceTrigger('device-switch');
          setGuidanceContext({ deviceType: lastDevice });
          setShowGuidance(true);
          localStorage.setItem('lastSignInGuidanceShown', now.toISOString());
        }
      }

      localStorage.setItem('lastDeviceType', currentDevice);
    };

    detectDeviceSwitch();
  }, []);

  // Manual trigger for specific actions
  const triggerSignInGuidance = (
    trigger:
      | 'progress'
      | 'roadmap'
      | 'achievement'
      | 'device-switch'
      | 'manual',
    context: GuidanceContext = {}
  ) => {
    // Don't show guidance during testing
    if (
      typeof window !== 'undefined' &&
      ((window as any).__DISABLE_GUIDANCE_MODALS__ ||
        (window as any).__TEST_MODE__)
    ) {
      return;
    }

    setGuidanceTrigger(trigger);
    setGuidanceContext(context);
    setShowGuidance(true);
  };

  // Expose trigger function globally for other components
  useEffect(() => {
    (window as WindowWithGuidance).triggerSignInGuidance =
      triggerSignInGuidance;
    return () => {
      delete (window as WindowWithGuidance).triggerSignInGuidance;
    };
  }, []);

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const handleSignIn = () => {
    // Redirect to sign in page
    router.push('/signin');
  };

  const handleClose = () => {
    setShowGuidance(false);
  };

  // Don't show guidance on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  if (!showGuidance) {
    return null;
  }

  return (
    <SignInGuidance
      trigger={guidanceTrigger}
      onClose={handleClose}
      onSignIn={handleSignIn}
      context={guidanceContext}
    />
  );
};
