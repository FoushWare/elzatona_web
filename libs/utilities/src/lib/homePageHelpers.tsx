import React, { type ReactNode } from "react";
import { Play, Map, Compass, type LucideIcon } from "lucide-react";
import type {
  UserType,
  ContentColor,
  ActivePlan,
  PersonalizedContent,
} from "@elzatona/types";

/**
 * Home Page Helper Functions
 * Utility functions for home page content generation
 */

/**
 * Create icon element from Lucide icon component
 */
function createIcon(Icon: LucideIcon, className = "w-6 h-6"): ReactNode {
  return <Icon className={className} />;
}

/**
 * Get guided learning content based on active plan status
 */
export function getGuidedContent(
  hasActivePlan: boolean,
  activePlan: { name: string; id: string } | null,
): PersonalizedContent {
  if (hasActivePlan && activePlan) {
    return {
      title: `Continue ${activePlan.name}`,
      subtitle: `Pick up where you left off with your ${activePlan.name.toLowerCase()}`,
      cta: "Continue Practice",
      ctaLink: `/guided-practice?plan=${activePlan.id}`,
      icon: createIcon(Play),
      color: "green",
    };
  }
  return {
    title: "Master Frontend Development",
    subtitle: "The complete platform to ace your frontend interviews",
    cta: "View Learning Plans",
    ctaLink: "/features/guided-learning",
    icon: createIcon(Map),
    color: "indigo",
  };
}

/**
 * Get default content for unauthenticated users
 */
export function getDefaultContent(): PersonalizedContent {
  return {
    title: "Master Frontend Development",
    subtitle: "The complete platform to ace your frontend interviews",
    cta: "Get Started",
    ctaLink: "/get-started",
    icon: createIcon(Play),
    color: "indigo",
  };
}

/**
 * Get self-directed learning content
 */
export function getSelfDirectedContent(): PersonalizedContent {
  return {
    title: "Build Your Custom Roadmap",
    subtitle: "Create and manage your personalized learning journey",
    cta: "View My Roadmap",
    ctaLink: "/browse-practice-questions",
    icon: createIcon(Compass),
    color: "purple",
  };
}

/**
 * Get personalized content based on user type and plan status
 */
export function getPersonalizedContent(
  userType: UserType,
  hasActivePlan: boolean,
  activePlan: { name: string; id: string } | null,
): PersonalizedContent {
  if (userType === "guided") {
    return getGuidedContent(hasActivePlan, activePlan);
  }
  if (userType === "self-directed") {
    return getSelfDirectedContent();
  }
  return getDefaultContent();
}

/**
 * Parse and validate active plan from localStorage
 */
export function parseActivePlan(planData: string | null): ActivePlan | null {
  if (!planData) {
    return null;
  }

  try {
    const plan = JSON.parse(planData);
    // Validate plan structure
    if (
      plan &&
      typeof plan.id === "string" &&
      typeof plan.name === "string" &&
      typeof plan.totalQuestions === "number" &&
      typeof plan.estimatedTime === "string"
    ) {
      return plan as ActivePlan;
    }
    return null;
  } catch (error) {
    console.error("Error parsing active plan:", error);
    return null;
  }
}
