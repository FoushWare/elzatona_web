/**
 * Unit Tests for HomePageLayout Component
 *
 * Tests for the HomePageLayout organism component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HomePageLayout } from "./HomePageLayout";
import type {
  UserType,
  ActivePlan,
  PersonalizedContent,
} from "@elzatona/types";
import { Play } from "lucide-react";

const mockPersonalizedContent: PersonalizedContent = {
  title: "Master Frontend Development",
  subtitle: "The complete platform to ace your frontend interviews",
  cta: "Get Started",
  ctaLink: "/get-started",
  icon: Play,
  color: "indigo",
};

describe("HomePageLayout", () => {
  it("should render all main sections", () => {
    render(
      <HomePageLayout
        userType={null}
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
        onGuidedClick={() => {}}
        onFreestyleClick={() => {}}
      />,
    );
    expect(screen.getByText("Master Frontend Development")).toBeInTheDocument();
    expect(
      screen.getByText(/How would you like to learn\?/i),
    ).toBeInTheDocument();
  });

  it("should render PersonalizedContent when userType is provided", () => {
    render(
      <HomePageLayout
        userType="guided"
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
        onGuidedClick={() => {}}
        onFreestyleClick={() => {}}
      />,
    );
    expect(screen.getByText("Master Frontend Development")).toBeInTheDocument();
  });

  it("should render FinalCTASection when userType is null", () => {
    render(
      <HomePageLayout
        userType={null}
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
        onGuidedClick={() => {}}
        onFreestyleClick={() => {}}
      />,
    );
    expect(
      screen.getByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).toBeInTheDocument();
  });

  it("should not render FinalCTASection when userType is provided", () => {
    render(
      <HomePageLayout
        userType="guided"
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
        onGuidedClick={() => {}}
        onFreestyleClick={() => {}}
      />,
    );
    expect(
      screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).not.toBeInTheDocument();
  });
});
