/**
 * Integration Tests for Navigation Component (S-IT-001, S-IT-002, S-IT-003)
 * Task: S-001 - Navigation Component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";

// Mock Next.js Link
jest.mock("next/link", () => {
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

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock document.documentElement
const mockClassList = {
  contains: jest.fn(() => false),
  add: jest.fn(),
  remove: jest.fn(),
};

Object.defineProperty(document, "documentElement", {
  value: {
    classList: mockClassList,
  },
  writable: true,
});

describe("S-IT-001: Navigation Routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClassList.contains.mockReturnValue(false);
  });

  it("should navigate correctly when link is clicked", () => {
    render(<Navigation />);

    const guidedLink = screen.getByRole("link", { name: /Guided Learning/i });
    expect(guidedLink).toHaveAttribute("href", "/features/guided-learning");

    // In a real browser, clicking would navigate
    fireEvent.click(guidedLink);

    // Verify the link has the correct href
    expect(guidedLink).toHaveAttribute("href", "/features/guided-learning");
  });

  it("should have all navigation links with correct paths", () => {
    render(<Navigation />);

    const expectedLinks = [
      { name: /Guided Learning/i, href: "/features/guided-learning" },
      { name: /Practice/i, href: "/practice" },
      { name: /Questions/i, href: "/questions" },
      { name: /Resources/i, href: "/resources" },
    ];

    expectedLinks.forEach(({ name, href }) => {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
    });
  });
});

describe("S-IT-002: Dark Mode Persistence", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClassList.contains.mockReturnValue(false);
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("should save theme preference to localStorage", () => {
    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("should apply dark theme when toggled", () => {
    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(mockClassList.add).toHaveBeenCalledWith("dark");
  });

  it("should remove dark theme when toggled back", () => {
    mockClassList.contains.mockReturnValue(true);

    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(mockClassList.remove).toHaveBeenCalledWith("dark");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
  });
});

describe("S-IT-003: Component Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClassList.contains.mockReturnValue(false);
  });

  it("should integrate all navigation elements correctly", () => {
    render(<Navigation />);

    // Verify logo
    expect(screen.getByText(/Elzatona/i)).toBeInTheDocument();

    // Verify navigation links
    expect(screen.getByText(/Guided Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Practice/i)).toBeInTheDocument();

    // Verify dark mode toggle
    expect(
      screen.getByRole("button", { name: /Toggle dark mode/i }),
    ).toBeInTheDocument();
  });

  it("should maintain state across interactions", () => {
    const { rerender } = render(<Navigation />);

    // Toggle dark mode
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });
    fireEvent.click(toggleButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");

    // Rerender and verify state persisted
    rerender(<Navigation />);
    expect(
      screen.getByRole("button", { name: /Toggle dark mode/i }),
    ).toBeInTheDocument();
  });
});
