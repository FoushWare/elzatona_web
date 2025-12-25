/**
 * HomePageLayout Storybook Stories
 *
 * Stories for the HomePageLayout component
 * Following refactoring plans and Storybook best practices
 */

import type { Meta, StoryObj } from "@storybook/react";
import { HomePageLayout } from "./HomePageLayout";
import { Play, Map, Compass } from "lucide-react";
import type {
  UserType,
  ActivePlan,
  PersonalizedContent,
} from "@elzatona/types";

const meta: Meta<typeof HomePageLayout> = {
  title: "Organisms/HomePageLayout",
  component: HomePageLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main layout component for the home page. Displays personalized content based on user type and learning plan status.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HomePageLayout>;

// Default content for stories
const defaultPersonalizedContent: PersonalizedContent = {
  title: "Master Frontend Development",
  subtitle: "The complete platform to ace your frontend interviews",
  cta: "Get Started",
  ctaLink: "/get-started",
  icon: Play,
  color: "indigo",
};

// Default story - unauthenticated user
export const Default: Story = {
  args: {
    userType: null,
    showAnimation: true,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: defaultPersonalizedContent,
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
  },
};

// Guided user without active plan
export const GuidedUserNoPlan: Story = {
  args: {
    userType: "guided" as UserType,
    showAnimation: true,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: {
      title: "Master Frontend Development",
      subtitle: "The complete platform to ace your frontend interviews",
      cta: "View Learning Plans",
      ctaLink: "/features/guided-learning",
      icon: Map,
      color: "indigo",
    },
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
  },
};

// Guided user with active plan
export const GuidedUserWithPlan: Story = {
  args: {
    userType: "guided" as UserType,
    showAnimation: true,
    hasActivePlan: true,
    activePlan: {
      name: "React Mastery",
      id: "react-mastery-001",
    } as ActivePlan,
    personalizedContent: {
      title: "Continue React Mastery",
      subtitle: "Pick up where you left off with your react mastery",
      cta: "Continue Practice",
      ctaLink: "/guided-practice?plan=react-mastery-001",
      icon: Play,
      color: "green",
    },
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
  },
};

// Self-directed user
export const SelfDirectedUser: Story = {
  args: {
    userType: "self-directed" as UserType,
    showAnimation: true,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: {
      title: "Build Your Custom Roadmap",
      subtitle: "Create and manage your personalized learning journey",
      cta: "View My Roadmap",
      ctaLink: "/browse-practice-questions",
      icon: Compass,
      color: "purple",
    },
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
  },
};

// Without animation
export const NoAnimation: Story = {
  args: {
    userType: null,
    showAnimation: false,
    hasActivePlan: false,
    activePlan: null,
    personalizedContent: defaultPersonalizedContent,
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
  },
};

// Dark mode variant (if theme support exists)
export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

