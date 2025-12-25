/**
 * Storybook Stories for CTAButton Component
 *
 * Stories for the CTAButton atom component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Play, BookOpen } from "lucide-react";
import { CTAButton } from "./CTAButton";

const meta: Meta<typeof CTAButton> = {
  title: "Atoms/CTAButton",
  component: CTAButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Link destination",
    },
    text: {
      control: "text",
      description: "Button text",
    },
    color: {
      control: "select",
      options: ["indigo", "green", "purple", "blue"],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["gradient", "solid"],
      description: "Button variant",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show animations",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  args: {
    href: "/get-started",
    text: "Get Started",
    color: "indigo",
    showAnimation: true,
  },
};

export const WithIcon: Story = {
  args: {
    href: "/get-started",
    text: "Get Started",
    color: "indigo",
    icon: <ArrowRight />,
    showAnimation: true,
  },
};

export const SolidVariant: Story = {
  args: {
    href: "/get-started",
    text: "Get Started",
    color: "indigo",
    variant: "solid",
    showAnimation: true,
  },
};

export const GreenColor: Story = {
  args: {
    href: "/continue",
    text: "Continue Learning",
    color: "green",
    icon: <Play />,
    showAnimation: true,
  },
};

export const PurpleColor: Story = {
  args: {
    href: "/roadmap",
    text: "View Roadmap",
    color: "purple",
    icon: <BookOpen />,
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    href: "/get-started",
    text: "Get Started",
    color: "indigo",
    showAnimation: false,
  },
};
