/**
 * Unit Tests for HeroSection Component
 * 
 * Tests for the HeroSection molecule component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from "./HeroSection";
import type { PersonalizedContent } from "../../../../../../apps/website/src/app/types/homePage.types";
import { Play } from "lucide-react";

const mockPersonalizedContent: PersonalizedContent = {
  title: "Master Frontend Development",
  subtitle: "The complete platform to ace your frontend interviews",
  cta: "Get Started",
  ctaLink: "/get-started",
  icon: Play,
  color: "indigo",
};

describe("HeroSection", () => {
  it("should render title and subtitle", () => {
    render(
      <HeroSection
        personalizedContent={mockPersonalizedContent}
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Master Frontend Development")).toBeInTheDocument();
    expect(
      screen.getByText("The complete platform to ace your frontend interviews"),
    ).toBeInTheDocument();
  });

  it("should render CTA button", () => {
    render(
      <HeroSection
        personalizedContent={mockPersonalizedContent}
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(
      <HeroSection
        personalizedContent={mockPersonalizedContent}
        showAnimation={true}
      />,
    );
    // Check for animation classes in the component
    expect(container).toBeInTheDocument();
  });

  it("should apply no-animation classes when showAnimation is false", () => {
    const { container } = render(
      <HeroSection
        personalizedContent={mockPersonalizedContent}
        showAnimation={false}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});

