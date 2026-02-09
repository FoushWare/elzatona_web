/**
 * Storybook Stories for LearningStyleSelector Component
 *
 * Stories for the LearningStyleSelector molecule component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { LearningStyleSelector } from "./LearningStyleSelector";

const meta: Meta<typeof LearningStyleSelector> = {
  title: "Molecules/LearningStyleSelector",
  component: LearningStyleSelector,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    userType: {
      control: "select",
      options: [null, "guided", "self-directed"],
      description: "Current user type",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LearningStyleSelector>;

export const Default: Story = {
  args: {
    userType: null,
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
    showAnimation: true,
  },
};

export const GuidedUser: Story = {
  args: {
    userType: "guided",
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
    showAnimation: true,
  },
};

export const SelfDirectedUser: Story = {
  args: {
    userType: "self-directed",
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    userType: null,
    onGuidedClick: () => console.log("Guided clicked"),
    onFreestyleClick: () => console.log("Freestyle clicked"),
    showAnimation: false,
  },
};
