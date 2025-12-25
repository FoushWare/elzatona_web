/**
 * Unit Tests for LearningTypeCard Component
 *
 * Tests for the LearningTypeCard atom component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Map, Compass } from "lucide-react";
import { LearningTypeCard } from "./LearningTypeCard";

describe("LearningTypeCard", () => {
  it("should render title and description", () => {
    render(
      <LearningTypeCard
        title="Guided Learning"
        description="Follow structured paths"
        icon={Map}
        onClick={vi.fn()}
        colorVariant="indigo"
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Guided Learning")).toBeInTheDocument();
    expect(screen.getByText("Follow structured paths")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Map}
        onClick={handleClick}
        colorVariant="indigo"
        showAnimation={false}
      />,
    );
    const card = screen.getByText("Test Card").closest("div");
    if (card) {
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it("should apply selected styles when isSelected is true", () => {
    const { container } = render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Map}
        onClick={vi.fn()}
        isSelected={true}
        colorVariant="indigo"
        showAnimation={false}
      />,
    );
    const card = container.querySelector("div");
    expect(card).toHaveClass("ring-2");
  });

  it("should apply indigo color variant", () => {
    const { container } = render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Map}
        onClick={vi.fn()}
        colorVariant="indigo"
        showAnimation={false}
      />,
    );
    const card = container.querySelector("div");
    expect(card).toHaveClass("from-indigo-50");
  });

  it("should apply green color variant", () => {
    const { container } = render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Compass}
        onClick={vi.fn()}
        colorVariant="green"
        showAnimation={false}
      />,
    );
    const card = container.querySelector("div");
    expect(card).toHaveClass("from-green-50");
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Map}
        onClick={vi.fn()}
        colorVariant="indigo"
        showAnimation={true}
      />,
    );
    const card = container.querySelector("div");
    expect(card).toHaveClass("opacity-100", "translate-y-0");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <LearningTypeCard
        title="Test Card"
        description="Test Description"
        icon={Map}
        onClick={vi.fn()}
        colorVariant="indigo"
        className="custom-class"
        showAnimation={false}
      />,
    );
    const card = container.querySelector("div");
    expect(card).toHaveClass("custom-class");
  });
});
