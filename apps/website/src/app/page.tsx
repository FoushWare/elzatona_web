"use client";

import React from "react";
import { useUserType } from "@elzatona/contexts";
import { ErrorBoundary } from "@elzatona/common-ui";
import { useRouter } from "next/navigation";
import { useLearningType } from "../context/LearningTypeContext";
import { HomePageLayout } from "@elzatona/common-ui";
import { useHomePageState } from "./lib/hooks/useHomePageState";
import { getPersonalizedContent } from "@elzatona/utilities/client";
import { ROUTES } from "@elzatona/types";

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
