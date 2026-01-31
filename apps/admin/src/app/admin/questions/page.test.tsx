/**
 * Unit Tests for Admin Questions Redirect Page
 * Tests the redirect functionality to /admin/content/questions
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuestionsRedirectPage from "./page";

// Mock next/navigation
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("QuestionsRedirectPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    render(<QuestionsRedirectPage />);
    expect(
      screen.getByText(/Redirecting to Questions Management/i),
    ).toBeInTheDocument();
  });

  it("should display redirect message", () => {
    render(<QuestionsRedirectPage />);
    expect(
      screen.getByText(/Taking you to \/admin\/content\/questions/i),
    ).toBeInTheDocument();
  });

  it("should redirect to /admin/content/questions on mount", async () => {
    render(<QuestionsRedirectPage />);
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/admin/content/questions");
    });
  });

  it("should have proper container styling", () => {
    const { container } = render(<QuestionsRedirectPage />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("min-h-screen");
  });

  it("should display centered content", () => {
    const { container } = render(<QuestionsRedirectPage />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("justify-center");
  });

  it("should display heading with correct level", () => {
    render(<QuestionsRedirectPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-lg");
    expect(heading).toHaveClass("font-medium");
  });
});
