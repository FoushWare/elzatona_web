import type { ReactNode } from "react";

/**
 * Home Page Types
 * Type definitions for the home page refactoring
 */

export type UserType = "guided" | "self-directed" | null;

export type ContentColor = "indigo" | "purple" | "green";

export interface ActivePlan {
  id: string;
  name: string;
  totalQuestions: number;
  estimatedTime: string;
}

export interface PersonalizedContent {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  icon: ReactNode;
  color: ContentColor;
}

export interface HomePageState {
  userType: UserType;
  isAuthenticated: boolean;
  activePlan: ActivePlan | null;
  hasActivePlan: boolean;
  animations: {
    showAnimation: boolean;
    heroVisible: boolean;
    contentVisible: boolean;
  };
}

export interface UserTypeContentSectionProps {
  userType: string;
  showAnimation: boolean;
  hasActivePlan: boolean;
  activePlan: ActivePlan | null;
  personalizedContent: PersonalizedContent;
}
