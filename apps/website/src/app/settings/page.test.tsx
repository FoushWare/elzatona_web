/**
 * Unit tests for Settings page
 */
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import SettingsPage from "./page";

// Mock Next.js router if needed
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Settings Page - Unit", () => {
  it("renders the settings page with correct content", () => {
    render(<SettingsPage />);

    expect(screen.getByText("settings")).toBeInTheDocument();
    expect(
      screen.getByText("Page component - needs implementation"),
    ).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    render(<SettingsPage />);

    const mainDiv = screen.getByText("settings").closest("div");
    expect(mainDiv).toHaveClass("min-h-screen", "p-8");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });
});
