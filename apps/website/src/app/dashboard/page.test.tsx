/**
 * Unit tests for Dashboard page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import DashboardPage from "./page";

// Mock Next.js router if needed
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Dashboard Page - Unit", () => {
  it("renders the dashboard page with correct content", () => {
    render(<DashboardPage />);

    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(<DashboardPage />);

    const mainDiv = screen.getByText("dashboard").closest("div");
    expect(mainDiv).toHaveClass("min-h-screen", "p-8");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });
});
