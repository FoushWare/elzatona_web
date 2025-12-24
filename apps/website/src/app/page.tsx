"use client";

import React from "react";
import { useUserType } from "@elzatona/contexts";
import { ErrorBoundary } from "@elzatona/components";
import { useRouter } from "next/navigation";
import { useLearningType } from "../../context/LearningTypeContext";
import { HomePageLayout } from "../components/home/organisms/HomePageLayout";
import { useHomePageState } from "../components/home/hooks/useHomePageState";
import { getPersonalizedContent } from "../../lib/utils/homePageHelpers";
import { ROUTES } from "../../lib/constants/homePage.constants";

/**
 * HomePageContent Component
 * Main content component for the home page
 */
function HomePageContent() {
  const { userType, setUserType } = useUserType();
  const router = useRouter();
  const { setLearningType } = useLearningType();
  const { hasActivePlan, activePlan, showAnimation } =
    useHomePageState(userType);

  const personalizedContent = getPersonalizedContent(
    userType,
    hasActivePlan,
    activePlan,
  );

  const handleGuidedClick = () => {
    setUserType("guided");
    setLearningType("guided");
    router.push(ROUTES.GUIDED_LEARNING);
  };

  const handleFreestyleClick = () => {
    setUserType("self-directed");
    setLearningType("free-style");
    router.push(ROUTES.BROWSE_QUESTIONS);
  };

  return (
    <HomePageLayout
      userType={userType}
      showAnimation={showAnimation}
      hasActivePlan={hasActivePlan}
      activePlan={activePlan}
      personalizedContent={personalizedContent}
      onGuidedClick={handleGuidedClick}
      onFreestyleClick={handleFreestyleClick}
    />
  );
}

/**
 * HomePage Component
 * Main page component with error boundary
 */
export default function HomePage() {
  return (
    <ErrorBoundary>
      <HomePageContent />
    </ErrorBoundary>
  );
}
