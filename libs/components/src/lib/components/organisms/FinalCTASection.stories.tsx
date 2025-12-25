/**
 * Storybook Stories for FinalCTASection Component
 * 
 * Stories for the FinalCTASection organism component
 * Co-located with component for easy discovery
 */

// Storybook file, not included in build
import * as React from "react";
// @ts-expect-error - Storybook types not available in build
import type { Meta, StoryObj } from "@storybook/react";
import { FinalCTASection } from "./FinalCTASection";

const meta: Meta<typeof FinalCTASection> = {
  title: "Organisms/FinalCTASection",
  component: FinalCTASection,
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
type Story = StoryObj<typeof FinalCTASection>;

export const Default: Story = {
  args: {
    showAnimation: true,
  },
};

export const NoAnimation: Story = {
  args: {
    showAnimation: false,
  },
};

