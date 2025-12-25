/**
 * Unit Tests for AnimatedTitle Component
 * 
 * Tests for the AnimatedTitle atom component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedTitle } from "./AnimatedTitle";

describe("AnimatedTitle", () => {
  it("should render title text", () => {
    render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render highlight text when provided", () => {
    render(
      <AnimatedTitle
        title="Master"
        highlightText="Frontend"
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Master")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={true}
      />,
    );
    const title = container.querySelector("h1");
    expect(title).toHaveClass("opacity-100", "translate-y-0");
  });

  it("should apply no-animation classes when showAnimation is false", () => {
    const { container } = render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={false}
      />,
    );
    const title = container.querySelector("h1");
    expect(title).toHaveClass("opacity-0", "translate-y-8");
  });

  it("should render sparkles when showAnimation is true", () => {
    const { container } = render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={true}
      />,
    );
    // Sparkles should be rendered (check for icon elements)
    const sparkles = container.querySelectorAll("svg");
    expect(sparkles.length).toBeGreaterThan(0);
  });

  it("should not render sparkles when showAnimation is false", () => {
    const { container } = render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={false}
      />,
    );
    // No sparkles should be rendered
    const sparkles = container.querySelectorAll("svg");
    expect(sparkles.length).toBe(0);
  });

  it("should apply custom className", () => {
    const { container } = render(
      <AnimatedTitle
        title="Test Title"
        showAnimation={false}
        className="custom-class"
      />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });
});

