/**
 * Unit Tests for CTAButton Component
 *
 * Tests for the CTAButton atom component
 * Co-located with component for easy discovery
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CTAButton } from "./CTAButton";

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
  return MockLink;
});

describe("CTAButton", () => {
  it("should render button text", () => {
    render(
      <CTAButton
        href="/test"
        text="Click Me"
        color="indigo"
        showAnimation={false}
      />,
    );
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should render link with correct href", () => {
    render(
      <CTAButton
        href="/test-path"
        text="Test Button"
        color="indigo"
        showAnimation={false}
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-path");
  });

  it("should apply gradient variant by default", () => {
    const { container } = render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        showAnimation={false}
      />,
    );
    const link = container.querySelector("a");
    expect(link).toHaveClass("bg-gradient-to-r");
  });

  it("should apply solid variant when specified", () => {
    const { container } = render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        variant="solid"
        showAnimation={false}
      />,
    );
    const link = container.querySelector("a");
    expect(link).toHaveClass("bg-indigo-600");
  });

  it("should apply animation classes when showAnimation is true", () => {
    const { container } = render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        showAnimation={true}
      />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("opacity-100", "translate-y-0");
  });

  it("should apply no-animation classes when showAnimation is false", () => {
    const { container } = render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        showAnimation={false}
      />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("opacity-0", "translate-y-8");
  });

  it("should render icon when provided", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        icon={<TestIcon />}
        showAnimation={false}
      />,
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CTAButton
        href="/test"
        text="Test"
        color="indigo"
        className="custom-class"
        showAnimation={false}
      />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });
});
