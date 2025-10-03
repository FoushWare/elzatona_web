'use client';

import { useState, useEffect } from 'react';
import { 
  UserType, 
  PersonalizedContent, 
  ActivePlan, 
  UsePersonalizedContentReturn 
} from '@/types/homepage';

export function usePersonalizedContent(userType: UserType): UsePersonalizedContentReturn {
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);

  // Check for active guided learning plan
  useEffect(() => {
    if (userType === 'guided' && typeof window !== 'undefined') {
      const activePlanData = localStorage.getItem('active-guided-plan');
      if (activePlanData) {
        try {
          const plan = JSON.parse(activePlanData);
          setActivePlan(plan);
          setHasActivePlan(true);
        } catch (error) {
          console.error('Error parsing active plan:', error);
          localStorage.removeItem('active-guided-plan');
        }
      }
    }
  }, [userType]);

  const getPersonalizedContent = (): PersonalizedContent => {
    if (userType === 'guided') {
      if (hasActivePlan && activePlan) {
        return {
          title: `Continue ${activePlan.name}`,
          subtitle: `Pick up where you left off with your ${activePlan.name.toLowerCase()}`,
          cta: 'Continue Practice',
          ctaLink: `/guided-practice?plan=${activePlan.id}`,
          icon: 'play', // Icon type instead of JSX
          color: 'green',
        };
      } else {
        return {
          title: 'Start Your Learning Path',
          subtitle: 'Choose a structured learning plan to begin your journey',
          cta: 'Choose Learning Plan',
          ctaLink: '/guided-learning',
          icon: 'map', // Icon type instead of JSX
          color: 'indigo',
        };
      }
    } else if (userType === 'self-directed') {
      return {
        title: 'Build Your Custom Roadmap',
        subtitle: 'Create and manage your personalized learning journey',
        cta: 'View My Roadmap',
        ctaLink: '/free-style-roadmap',
        icon: 'compass', // Icon type instead of JSX
        color: 'purple',
      };
    } else {
      return {
        title: 'Master Frontend Development',
        subtitle: 'The complete platform to ace your frontend interviews',
        cta: 'Get Started',
        ctaLink: '/get-started',
        icon: 'play', // Icon type instead of JSX
        color: 'indigo',
      };
    }
  };

  return {
    hasActivePlan,
    activePlan,
    personalizedContent: getPersonalizedContent(),
  };
}
