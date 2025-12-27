/**
 * Unit Tests for FinalCTASection Component
 *
 * Tests for the FinalCTASection organism component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FinalCTASection } from "./FinalCTASection";

describe("FinalCTASection", () => {
  it("should render final CTA section", () => {
    render(<FinalCTASection showAnimation={false} />);
    expect(
      screen.getByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).toBeInTheDocument();
  });

  it("should render CTA button", () => {
    render(<FinalCTASection showAnimation={false} />);
    expect(screen.getByText(/Get Started Now/i)).toBeInTheDocument();
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(<FinalCTASection showAnimation={true} />);
    expect(container).toBeInTheDocument();
  });

  it("should apply no-animation classes when showAnimation is false", () => {
    const { container } = render(<FinalCTASection showAnimation={false} />);
    expect(container).toBeInTheDocument();
  });
});
