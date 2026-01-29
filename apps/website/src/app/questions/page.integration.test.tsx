/**
 * Integration tests for Questions page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import QuestionsPage from "./page";

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

describe("Questions Page - Integration", () => {
  it("renders the questions page correctly", () => {
    render(<QuestionsPage />);

    expect(screen.getByText("questions")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("displays the page with proper layout", () => {
    render(<QuestionsPage />);

    const container = screen.getByText("questions").parentElement;
    expect(container).toHaveClass("min-h-screen", "p-8");
  });

  it("shows the main heading", () => {
    render(<QuestionsPage />);

    const heading = screen.getByRole("heading", { name: "questions" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
