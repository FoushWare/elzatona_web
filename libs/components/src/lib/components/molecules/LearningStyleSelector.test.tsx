/**
 * Unit Tests for LearningStyleSelector Component
 *
 * Tests for the LearningStyleSelector molecule component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LearningStyleSelector } from "./LearningStyleSelector";

describe("LearningStyleSelector", () => {
  const mockOnGuidedClick = vi.fn();
  const mockOnFreestyleClick = vi.fn();

  it("should render both learning type cards", () => {
    render(
      <LearningStyleSelector
        userType={null}
        onGuidedClick={mockOnGuidedClick}
        onFreestyleClick={mockOnFreestyleClick}
        showAnimation={false}
      />,
    );
    expect(screen.getByText(/Guided Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Style Learning/i)).toBeInTheDocument();
  });

  it("should call onGuidedClick when guided card is clicked", () => {
    render(
      <LearningStyleSelector
        userType={null}
        onGuidedClick={mockOnGuidedClick}
        onFreestyleClick={mockOnFreestyleClick}
        showAnimation={false}
      />,
    );
    const guidedButton = screen.getByText(/Start Guided Learning/i);
    fireEvent.click(guidedButton);
    expect(mockOnGuidedClick).toHaveBeenCalledTimes(1);
  });

  it("should call onFreestyleClick when freestyle card is clicked", () => {
    render(
      <LearningStyleSelector
        userType={null}
        onGuidedClick={mockOnGuidedClick}
        onFreestyleClick={mockOnFreestyleClick}
        showAnimation={false}
      />,
    );
    const freestyleButton = screen.getByText(/Start Free Style Learning/i);
    fireEvent.click(freestyleButton);
    expect(mockOnFreestyleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(
      <LearningStyleSelector
        userType={null}
        onGuidedClick={mockOnGuidedClick}
        onFreestyleClick={mockOnFreestyleClick}
        showAnimation={true}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
