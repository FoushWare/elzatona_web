/**
 * TypeScript types and interfaces for homepage components
 */

import { ReactNode } from 'react';

// User types
export type UserType = 'guided' | 'self-directed' | null;

// Personalized content
export interface PersonalizedContent {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  icon: string; // Icon type instead of ReactNode
  color: 'indigo' | 'purple' | 'green';
}

// Active plan for guided users
export interface ActivePlan {
  id: string;
  name: string;
  totalQuestions: number;
  estimatedTime: string;
}

// Animation configuration
export interface AnimationConfig {
  showAnimation: boolean;
  isClient: boolean;
  delay?: string;
}

// Homepage animation hook return type
export interface UseHomepageAnimationsReturn {
  showAnimation: boolean;
  isClient: boolean;
  showTour: boolean;
  hasSeenTour: boolean;
  handleTourComplete: () => void;
  handleTourSkip: () => void;
  startTour: () => void;
}

// Personalized content hook return type
export interface UsePersonalizedContentReturn {
  hasActivePlan: boolean;
  activePlan: ActivePlan | null;
  personalizedContent: PersonalizedContent;
}

// Component props interfaces
export interface HeroSectionProps {
  personalizedContent: PersonalizedContent;
  showAnimation: boolean;
  isClient: boolean;
  isFirstVisit: boolean;
  onStartTour: () => void;
}




// Animation presets
export type AnimationPreset = keyof typeof import('@/utils/animations').animationPresets;

// Animation delays
export type AnimationDelay = keyof typeof import('@/utils/animations').animationDelays;
