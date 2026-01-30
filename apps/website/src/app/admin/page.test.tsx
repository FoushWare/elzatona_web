/**
 * Unit Tests for Admin Redirect Page
 * Tests the redirect functionality from website to admin app
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminRedirectPage from "./page";

// Mock globalThis.location
const mockLocation = {
  href: "",
};

Object.defineProperty(globalThis, "location", {
  value: mockLocation,
  writable: true,
});

describe("AdminRedirectPage", () => {
  beforeEach(() => {
    mockLocation.href = "";
  });

  it("should render without errors", () => {
    render(<AdminRedirectPage />);
    expect(
      screen.getByText(/Redirecting to Admin Dashboard/i),
    ).toBeInTheDocument();
  });

  it("should display loading spinner", () => {
    render(<AdminRedirectPage />);
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("should display fallback link", () => {
    render(<AdminRedirectPage />);
    const link = screen.getByRole("link", { name: /click here/i });
    expect(link).toHaveAttribute("href", "http://localhost:3001/admin");
  });

  it("should redirect to admin app on mount", async () => {
    render(<AdminRedirectPage />);
    await waitFor(() => {
      expect(mockLocation.href).toBe("http://localhost:3001/admin");
    });
  });

  it("should display helpful message about redirect", () => {
    render(<AdminRedirectPage />);
    expect(
      screen.getByText(/Taking you to the admin application/i),
    ).toBeInTheDocument();
  });
});
