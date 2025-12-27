/**
 * Storybook Stories for LearningTypeCard Component
 *
 * Stories for the LearningTypeCard atom component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { Map, Compass } from "lucide-react";
import { LearningTypeCard } from "./LearningTypeCard";

const meta: Meta<typeof LearningTypeCard> = {
  title: "Atoms/LearningTypeCard",
  component: LearningTypeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card description",
    },
    colorVariant: {
      control: "select",
      options: ["indigo", "green"],
      description: "Color variant",
    },
    isSelected: {
      control: "boolean",
      description: "Whether card is selected",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LearningTypeCard>;

export const GuidedLearning: Story = {
  args: {
    title: "Guided Learning",
    description: "Follow structured learning paths designed by experts",
    icon: Map,
    onClick: () => console.log("Guided clicked"),
    colorVariant: "indigo",
    showAnimation: true,
  },
};

export const FreeStyleLearning: Story = {
  args: {
    title: "Free Style Learning",
    description:
      "Create your own learning roadmap and explore topics at your own pace",
    icon: Compass,
    onClick: () => console.log("Freestyle clicked"),
    colorVariant: "green",
    showAnimation: true,
  },
};

export const Selected: Story = {
  args: {
    title: "Guided Learning",
    description: "Follow structured learning paths designed by experts",
    icon: Map,
    onClick: () => console.log("Guided clicked"),
    isSelected: true,
    colorVariant: "indigo",
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    title: "Guided Learning",
    description: "Follow structured learning paths designed by experts",
    icon: Map,
    onClick: () => console.log("Guided clicked"),
    colorVariant: "indigo",
    showAnimation: false,
  },
};
