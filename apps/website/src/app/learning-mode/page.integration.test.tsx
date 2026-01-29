/**
 * Integration tests for Learning Mode page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LearningModePage from "./page";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Test setup
beforeEach(() => {
  vi.clearAllMocks();
});

describe("Learning Mode Page - Integration", () => {
  it("renders the learning mode page correctly", () => {
    render(<LearningModePage />);

    expect(screen.getByText("learning-mode")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("displays the page with proper layout", () => {
    render(<LearningModePage />);

    const container = screen.getByText("learning-mode").parentElement;
    expect(container).toHaveClass("min-h-screen", "p-8");
  });

  it("shows the main heading", () => {
    render(<LearningModePage />);

    const heading = screen.getByRole("heading", { name: "learning-mode" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
