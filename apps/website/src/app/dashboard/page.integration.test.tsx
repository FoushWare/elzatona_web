/**
 * Integration tests for Dashboard page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import DashboardPage from "./page";

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

describe("Dashboard Page - Integration", () => {
  it("renders the dashboard page correctly", () => {
    render(<DashboardPage />);

    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("displays the page with proper layout", () => {
    render(<DashboardPage />);

    const container = screen.getByText("dashboard").parentElement;
    expect(container).toHaveClass("min-h-screen", "p-8");
  });

  it("shows the main heading", () => {
    render(<DashboardPage />);

    const heading = screen.getByRole("heading", { name: "dashboard" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
