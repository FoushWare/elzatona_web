/**
 * Storybook Stories for PersonalizedContent Component
 *
 * Stories for the PersonalizedContent organism component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
// @ts-expect-error - Storybook types not available in build
// @ts-nocheck - Storybook file, not included in production build
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Play, Map } from "lucide-react";
import { PersonalizedContent } from "./PersonalizedContent";
import type {
  ActivePlan,
  PersonalizedContent as PersonalizedContentType,
} from "@elzatona/types";

const meta: Meta<typeof PersonalizedContent> = {
  title: "Organisms/PersonalizedContent",
  component: PersonalizedContent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    userType: {
      control: "select",
      options: ["guided", "self-directed"],
      description: "User type",
    },
    hasActivePlan: {
      control: "boolean",
      description: "Whether user has an active plan",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PersonalizedContent>;

const defaultContent: PersonalizedContentType = {
  title: "Continue Learning",
  subtitle: "Pick up where you left off",
  cta: "Continue Practice",
  ctaLink: "/continue",
  icon: React.createElement(Play),
  color: "green",
};

export const GuidedWithPlan: Story = {
  args: {
    userType: "guided",
    showAnimation: true,
    hasActivePlan: true,
    activePlan: {
      name: "React Mastery",
      id: "react-001",
    } as ActivePlan,
    personalizedContent: defaultContent,
  },
};

export const GuidedWithoutPlan: Story = {
  args: {
    userType: "guided",
    showAnimation: true,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: {
      title: "Master Frontend Development",
      subtitle: "The complete platform to ace your frontend interviews",
      cta: "Choose Learning Plan",
      ctaLink: "/features/guided-learning",
      icon: React.createElement(Map),
      color: "indigo",
    },
  },
};

export const SelfDirected: Story = {
  args: {
    userType: "self-directed",
    showAnimation: true,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: {
      title: "Build Your Custom Roadmap",
      subtitle: "Create and manage your personalized learning journey",
      cta: "View My Roadmap",
      ctaLink: "/browse-practice-questions",
      icon: React.createElement(Play),
      color: "purple",
    },
  },
};

export const NoAnimation: Story = {
  args: {
    userType: "guided",
    showAnimation: false,
    hasActivePlan: true,
    activePlan: {
      name: "React Mastery",
      id: "react-001",
    } as ActivePlan,
    personalizedContent: defaultContent,
  },
};
