/**
 * Unit Tests for AdminLoginPageTemplate Component
 * Tests layout rendering, loading state, and children rendering
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AdminLoginPageTemplate } from "./AdminLoginPageTemplate";

// Mock AdminLoginNavbar
vi.mock("@elzatona/components", () => ({
  AdminLoginNavbar: () => (
    <nav data-testid="admin-login-navbar">Admin Navbar</nav>
  ),
}));

// Mock Next.js Link
vi.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

describe("AdminLoginPageTemplate", () => {
  describe("Rendering", () => {
    it("should render AdminLoginNavbar", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );
      expect(screen.getByTestId("admin-login-navbar")).toBeInTheDocument();
    });

    it("should render page title", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );
      expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    });

    it("should render page description", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );
      expect(
        screen.getByText(/Access the admin dashboard/i),
      ).toBeInTheDocument();
    });

    it("should render children content", () => {
      render(
        <AdminLoginPageTemplate>
          <div data-testid="test-children">Test Content</div>
        </AdminLoginPageTemplate>,
      );
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
      expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
    });

    it("should render Back to Home link", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );
      const homeLink = screen.getByRole("link", { name: /Back to Home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Loading State", () => {
    it("should show loading spinner when isLoading is true", () => {
      render(
        <AdminLoginPageTemplate isLoading={true}>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      expect(screen.queryByText(/Test Content/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument();
    });

    it("should show loading spinner with red border", () => {
      render(
        <AdminLoginPageTemplate isLoading={true}>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      const spinner = screen
        .getByText(/Loading/i)
        .closest("div")
        ?.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("should render AdminLoginNavbar in loading state", () => {
      render(
        <AdminLoginPageTemplate isLoading={true}>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      expect(screen.getByTestId("admin-login-navbar")).toBeInTheDocument();
    });
  });

  describe("Default State", () => {
    it("should not show loading state when isLoading is false", () => {
      render(
        <AdminLoginPageTemplate isLoading={false}>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
    });

    it("should not show loading state when isLoading is undefined", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have red gradient background class", () => {
      const { container } = render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass(
        "bg-gradient-to-br",
        "from-red-50",
        "to-red-100",
      );
    });

    it("should have dark mode gradient background class", () => {
      const { container } = render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass("dark:from-gray-900", "dark:to-gray-800");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      const heading = screen.getByRole("heading", { name: /Admin Login/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
    });

    it("should have accessible link text", () => {
      render(
        <AdminLoginPageTemplate>
          <div>Test Content</div>
        </AdminLoginPageTemplate>,
      );

      const homeLink = screen.getByRole("link", { name: /Back to Home/i });
      expect(homeLink).toBeInTheDocument();
    });
  });
});
