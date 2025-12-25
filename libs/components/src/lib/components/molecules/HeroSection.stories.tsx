// @ts-nocheck - Storybook file, not included in production build
/**
 * Storybook Stories for HeroSection Component
 *
 * Stories for the HeroSection molecule component
 * Co-located with component for easy discovery
 */
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { Play, Map, Compass } from "lucide-react";
import { HeroSection } from "./HeroSection";
import type { PersonalizedContent } from "@elzatona/types";

const meta: Meta<typeof HeroSection> = {
  title: "Molecules/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

const defaultContent: PersonalizedContent = {
  title: "Master Frontend Development",
  subtitle: "The complete platform to ace your frontend interviews",
  cta: "Get Started",
  ctaLink: "/get-started",
  icon: React.createElement(Play),
  color: "indigo",
};

export const Default: Story = {
  args: {
    personalizedContent: defaultContent,
    showAnimation: true,
  },
};

export const GuidedContent: Story = {
  args: {
    personalizedContent: {
      title: "Master Frontend Development",
      subtitle: "The complete platform to ace your frontend interviews",
      cta: "Choose Learning Plan",
      ctaLink: "/features/guided-learning",
      icon: React.createElement(Map),
      color: "indigo",
    },
    showAnimation: true,
  },
};

export const SelfDirectedContent: Story = {
  args: {
    personalizedContent: {
      title: "Build Your Custom Roadmap",
      subtitle: "Create and manage your personalized learning journey",
      cta: "View My Roadmap",
      ctaLink: "/browse-practice-questions",
      icon: React.createElement(Compass),
      color: "purple",
    },
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    personalizedContent: defaultContent,
    showAnimation: false,
  },
};
