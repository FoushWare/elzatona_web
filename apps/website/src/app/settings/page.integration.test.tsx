/**
 * Integration tests for Settings page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import SettingsPage from "./page";

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

describe("Settings Page - Integration", () => {
  it("renders the settings page correctly", () => {
    render(<SettingsPage />);

    expect(screen.getByText("settings")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("displays the page with proper layout", () => {
    render(<SettingsPage />);

    const container = screen.getByText("settings").parentElement;
    expect(container).toHaveClass("min-h-screen", "p-8");
  });

  it("shows the main heading", () => {
    render(<SettingsPage />);

    const heading = screen.getByRole("heading", { name: "settings" });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });
});
