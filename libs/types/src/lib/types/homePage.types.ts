/**
 * Home Page Types
 * Type definitions for home page components and data
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
  icon: React.ReactNode;
  color: ContentColor;
}
