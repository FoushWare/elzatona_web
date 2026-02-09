/**
 * Unit tests for Questions page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import QuestionsPage from "./page";

// Mock Next.js router if needed
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Questions Page - Unit", () => {
  it("renders the questions page with correct content", () => {
    render(<QuestionsPage />);

    expect(screen.getByText("questions")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(<QuestionsPage />);

    const mainDiv = screen.getByText("questions").closest("div");
    expect(mainDiv).toHaveClass("min-h-screen", "p-8");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });
});
