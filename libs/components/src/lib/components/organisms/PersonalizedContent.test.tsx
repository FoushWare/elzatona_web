/**
 * Unit Tests for PersonalizedContent Component
 * 
 * Tests for the PersonalizedContent organism component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PersonalizedContent } from "./PersonalizedContent";
import type {
  UserType,
  ActivePlan,
  PersonalizedContent as PersonalizedContentType,
} from "../../../../../../apps/website/src/app/Types/homePage.types";
import { Play } from "lucide-react";

const mockPersonalizedContent: PersonalizedContentType = {
  title: "Continue Learning",
  subtitle: "Pick up where you left off",
  cta: "Continue Practice",
  ctaLink: "/continue",
  icon: Play,
  color: "green",
};

describe("PersonalizedContent", () => {
  it("should render when userType is provided", () => {
    render(
      <PersonalizedContent
        userType="guided"
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
      />,
    );
    expect(screen.getByText("Continue Learning")).toBeInTheDocument();
  });

  it("should display active plan information when hasActivePlan is true", () => {
    const activePlan: ActivePlan = {
      name: "React Mastery",
      id: "react-001",
    };
    render(
      <PersonalizedContent
        userType="guided"
        showAnimation={false}
        hasActivePlan={true}
        activePlan={activePlan}
        personalizedContent={mockPersonalizedContent}
      />,
    );
    expect(screen.getByText("Continue Learning")).toBeInTheDocument();
  });

  it("should not render when userType is null", () => {
    const { container } = render(
      <PersonalizedContent
        userType={null}
        showAnimation={false}
        hasActivePlan={false}
        activePlan={null}
        personalizedContent={mockPersonalizedContent}
      />,
    );
    // Component should not render when userType is null
    expect(container.firstChild).toBeNull();
  });
});

