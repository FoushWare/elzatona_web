/**
 * Unit tests for Learning Mode page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import LearningModePage from "./page";

// Mock Next.js router if needed
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Learning Mode Page - Unit", () => {
  it("renders the learning mode page with correct content", () => {
    render(<LearningModePage />);

    expect(screen.getByText("learning-mode")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(<LearningModePage />);

    const mainDiv = screen.getByText("learning-mode").closest("div");
    expect(mainDiv).toHaveClass("min-h-screen", "p-8");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });
});
