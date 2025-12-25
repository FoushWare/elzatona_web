/**
 * Storybook Stories for AnimatedTitle Component
 * 
 * Stories for the AnimatedTitle atom component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedTitle } from "./AnimatedTitle";

const meta: Meta<typeof AnimatedTitle> = {
  title: "Atoms/AnimatedTitle",
  component: AnimatedTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The main title text",
    },
    highlightText: {
      control: "text",
      description: "Text to highlight with gradient",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedTitle>;

export const Default: Story = {
  args: {
    title: "Master Frontend Development",
    highlightText: "Interviews",
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    title: "Master Frontend Development",
    highlightText: "Interviews",
    showAnimation: false,
  },
};

export const NoHighlight: Story = {
  args: {
    title: "Simple Title",
    showAnimation: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: "Master Frontend Development and Ace Your Technical Interviews",
    highlightText: "Technical Interviews",
    showAnimation: true,
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Learn",
    highlightText: "Code",
    showAnimation: true,
  },
};

