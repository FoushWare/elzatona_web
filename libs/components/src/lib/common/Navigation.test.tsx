/**
 * Unit Tests for Navigation Component (S-UT-001, S-UT-002, S-UT-003, S-UT-004)
 * Task: S-001 - Navigation Component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
Object.defineProperty(document, "documentElement", {
  value: {
    classList: {
      contains: jest.fn(() => false),
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  writable: true,
});

describe("S-UT-001: Component Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (document.documentElement.classList.contains as jest.Mock).mockReturnValue(
      false,
    );
  });

  it("should render navigation component", () => {
    const { container } = render(<Navigation />);
    expect(container).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Navigation />);
    expect(screen.getByText(/Guided Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Practice/i)).toBeInTheDocument();
    expect(screen.getByText(/Questions/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
  });

  it("should render logo", () => {
    render(<Navigation />);
    expect(screen.getByText(/Elzatona/i)).toBeInTheDocument();
  });
});

describe("S-UT-002: Navigation Links", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all navigation links", () => {
    render(<Navigation />);

    const links = [
      screen.getByRole("link", { name: /Guided Learning/i }),
      screen.getByRole("link", { name: /Practice/i }),
      screen.getByRole("link", { name: /Questions/i }),
      screen.getByRole("link", { name: /Resources/i }),
    ];

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  it("should have correct hrefs for navigation links", () => {
    render(<Navigation />);

    expect(
      screen.getByRole("link", { name: /Guided Learning/i }),
    ).toHaveAttribute("href", "/features/guided-learning");
    expect(screen.getByRole("link", { name: /Practice/i })).toHaveAttribute(
      "href",
      "/practice",
    );
    expect(screen.getByRole("link", { name: /Questions/i })).toHaveAttribute(
      "href",
      "/questions",
    );
    expect(screen.getByRole("link", { name: /Resources/i })).toHaveAttribute(
      "href",
      "/resources",
    );
  });

  it("should have clickable navigation links", () => {
    render(<Navigation />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toBeVisible();
    });
  });
});

describe("S-UT-003: Dark Mode Toggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (document.documentElement.classList.contains as jest.Mock).mockReturnValue(
      false,
    );
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("should have dark mode toggle button", () => {
    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("should toggle dark mode when clicked", () => {
    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("should remove dark mode when toggled from dark to light", () => {
    (document.documentElement.classList.contains as jest.Mock).mockReturnValue(
      true,
    );

    render(<Navigation />);
    const toggleButton = screen.getByRole("button", {
      name: /Toggle dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      "dark",
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
  });
});

describe("S-UT-004: Logo and Branding", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render logo with correct text", () => {
    render(<Navigation />);
    expect(screen.getByText(/Elzatona/i)).toBeInTheDocument();
  });

  it("should have logo link to homepage", () => {
    render(<Navigation />);
    const logoLink = screen.getByText(/Elzatona/i).closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });
});

describe("S-UT-SNAPSHOT: Navigation Component Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (document.documentElement.classList.contains as jest.Mock).mockReturnValue(
      false,
    );
  });

  it("should match navigation snapshot (light mode)", () => {
    const { container } = render(<Navigation />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match navigation snapshot (dark mode)", () => {
    (document.documentElement.classList.contains as jest.Mock).mockReturnValue(
      true,
    );
    localStorageMock.getItem.mockReturnValue("dark");

    const { container } = render(<Navigation />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
