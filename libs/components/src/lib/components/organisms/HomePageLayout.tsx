"use client";

import React from "react";
import { AnimatedBackground } from "../molecules/AnimatedBackground";
import { HeroSection } from "../molecules/HeroSection";
import { LearningStyleSelector } from "../molecules/LearningStyleSelector";
import { PersonalizedContent } from "./PersonalizedContent";
import { FinalCTASection } from "./FinalCTASection";
import type {
  UserType,
  ActivePlan,
  PersonalizedContent as PersonalizedContentType,
} from "@/types/homePage.types";

interface HomePageLayoutProps {
  userType: UserType;
  showAnimation: boolean;
  hasActivePlan: boolean;
  activePlan: ActivePlan | null;
  personalizedContent: PersonalizedContentType;
  onGuidedClick: () => void;
  onFreestyleClick: () => void;
}

/**
 * HomePageLayout Component
 * Overall page layout structure for the home page
 */
export function HomePageLayout({
  userType,
  showAnimation,
  hasActivePlan,
  activePlan,
  personalizedContent,
  onGuidedClick,
  onFreestyleClick,
}: HomePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <AnimatedBackground />

      <HeroSection
        personalizedContent={personalizedContent}
        showAnimation={showAnimation}
      />

      <LearningStyleSelector
        userType={userType}
        onGuidedClick={onGuidedClick}
        onFreestyleClick={onFreestyleClick}
        showAnimation={showAnimation}
      />

      {userType && (
        <PersonalizedContent
          userType={userType}
          showAnimation={showAnimation}
          hasActivePlan={hasActivePlan}
          activePlan={activePlan}
          personalizedContent={personalizedContent}
        />
      )}

      {!userType && <FinalCTASection showAnimation={showAnimation} />}
    </div>
  );
}
