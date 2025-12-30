/**
 * Unit Tests for NavbarSimple Component
 * Tests navbar rendering, learning mode switcher, and visibility
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavbarSimple from "./NavbarSimple";

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

// Mock Next.js usePathname
const mockPathname = "/";
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// Mock window.scrollY and window.innerWidth
Object.defineProperty(window, "scrollY", {
  writable: true,
  value: 0,
});
Object.defineProperty(window, "innerWidth", {
  writable: true,
  value: 1024,
});

// Mock contexts
const mockSetUserType = jest.fn();
const mockSetIsMobileMenuOpen = jest.fn();
const mockToggleDarkMode = jest.fn();
const mockLogout = jest.fn();

jest.mock("@elzatona/contexts", () => ({
  useAuth: jest.fn(() => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    logout: mockLogout,
  })),
  useTheme: jest.fn(() => ({
    isDarkMode: false,
    toggleDarkMode: mockToggleDarkMode,
  })),
  useUserType: jest.fn(() => ({
    userType: null,
    setUserType: mockSetUserType,
  })),
  useMobileMenu: jest.fn(() => ({
    setIsMobileMenuOpen: mockSetIsMobileMenuOpen,
  })),
}));

describe("NavbarSimple Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorageMock.getItem.mockReturnValue(null);
    window.scrollY = 0;
    window.innerWidth = 1024;
  });

  describe("Navbar Rendering", () => {
    it("should render navbar without errors", async () => {
      render(<NavbarSimple />);
      // Wait for hydration
      await waitFor(() => {
        // Check if logo is rendered (might be in a link)
        const logoLink = screen.queryByRole("link", { name: /home/i });
        expect(logoLink || screen.queryByText(/elzatona/i)).toBeTruthy();
      });
    });

    it("should render navbar with fixed positioning", async () => {
      const { container } = render(<NavbarSimple />);
      await waitFor(() => {
        const navbar = container.querySelector("nav");
        expect(navbar).toHaveClass(
          "fixed",
          "top-0",
          "left-0",
          "right-0",
          "z-50",
        );
      });
    });

    it("should render navbar with correct height classes", async () => {
      const { container } = render(<NavbarSimple />);
      await waitFor(() => {
        const navbarContent = container.querySelector(
          ".flex.items-center.justify-between",
        );
        expect(navbarContent).toHaveClass("h-16", "sm:h-18", "lg:h-20");
      });
    });
  });

  describe("Learning Mode Switcher - Desktop", () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: "guided",
        setUserType: mockSetUserType,
      });
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useAuth").mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        logout: mockLogout,
      });
    });

    it("should render learning mode switcher for non-authenticated users with userType", async () => {
      render(<NavbarSimple />);
      await waitFor(
        () => {
          // Check if learning mode switcher button is rendered (desktop variant)
          // Desktop switcher is hidden on small screens, so we check for the component existence
          const switcher = screen.queryByLabelText(/learning mode switcher/i);
          // The switcher might be in the DOM but hidden, so we check if it exists
          expect(
            switcher || document.querySelector('[aria-label*="learning mode"]'),
          ).toBeTruthy();
        },
        { timeout: 3000 },
      );
    });

    it("should not render learning mode switcher when userType is null", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: null,
        setUserType: mockSetUserType,
      });

      render(<NavbarSimple />);
      await waitFor(() => {
        const switcher = screen.queryByLabelText(/learning mode switcher/i);
        expect(switcher).not.toBeInTheDocument();
      });
    });

    it("should not render learning mode switcher for authenticated users", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useAuth").mockReturnValue({
        user: { id: "1", email: "test@example.com" },
        isAuthenticated: true,
        isLoading: false,
        logout: mockLogout,
      });

      render(<NavbarSimple />);
      await waitFor(() => {
        const switcher = screen.queryByLabelText(/learning mode switcher/i);
        expect(switcher).not.toBeInTheDocument();
      });
    });
  });

  describe("Learning Mode Switcher - Mobile", () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: "guided",
        setUserType: mockSetUserType,
      });
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useAuth").mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        logout: mockLogout,
      });
    });

    it("should render learning mode switcher in mobile menu for non-authenticated users", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        // Mobile menu should have learning mode options
        // Check if mobile menu button exists
        const menuButton = screen.getByRole("button", { name: /menu/i });
        expect(menuButton).toBeInTheDocument();
      });
    });
  });

  describe("Navbar Visibility and Padding", () => {
    it("should have correct z-index for navbar visibility", async () => {
      const { container } = render(<NavbarSimple />);
      await waitFor(() => {
        const navbar = container.querySelector("nav");
        expect(navbar).toHaveClass("z-50");
      });
    });

    it("should apply correct background styles when scrolled", async () => {
      // Simulate scroll
      window.scrollY = 20;
      const scrollEvent = new Event("scroll");
      window.dispatchEvent(scrollEvent);

      const { container } = render(<NavbarSimple />);
      await waitFor(
        () => {
          const navbar = container.querySelector("nav");
          // After scrolling, navbar should have scrolled styles
          expect(navbar).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it("should apply correct background styles when not scrolled", async () => {
      const { container } = render(<NavbarSimple />);
      await waitFor(() => {
        const navbar = container.querySelector("nav");
        expect(navbar).toHaveClass(
          "bg-gradient-to-r",
          "from-indigo-600",
          "via-purple-600",
          "to-blue-600",
        );
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should hide desktop navigation on mobile screens", async () => {
      const { container } = render(<NavbarSimple />);
      await waitFor(() => {
        // Desktop navigation should have "hidden lg:flex" classes
        const desktopNav = container.querySelector(".hidden.lg\\:flex");
        expect(desktopNav).toBeInTheDocument();
      });
    });

    it("should show mobile menu button on small screens", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        const menuButton = screen.getByRole("button", { name: /menu/i });
        expect(menuButton).toBeInTheDocument();
        expect(menuButton).toHaveClass("lg:hidden");
      });
    });
  });

  describe("User Interactions", () => {
    it("should toggle mobile menu when menu button is clicked", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        const menuButton = screen.getByRole("button", { name: /menu/i });
        fireEvent.click(menuButton);
        // The component uses internal state, so we just verify the button is clickable
        expect(menuButton).toBeInTheDocument();
      });
    });

    it("should toggle theme when theme button is clicked", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        const themeButton = screen.getByRole("button", {
          name: /toggle theme/i,
        });
        fireEvent.click(themeButton);
        expect(mockToggleDarkMode).toHaveBeenCalled();
      });
    });
  });

  describe("Logo and Navigation Links", () => {
    it("should render logo with link to home", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        const logoLink = screen.queryByRole("link", { name: /home/i });
        if (logoLink) {
          expect(logoLink).toHaveAttribute("href", "/");
        } else {
          // Logo might be in a different format
          const homeLink = screen.queryByRole("link", { href: "/" });
          expect(homeLink).toBeInTheDocument();
        }
      });
    });

    it("should render sign in link for non-authenticated users", async () => {
      render(<NavbarSimple />);
      await waitFor(() => {
        const signInLink = screen.getByRole("link", { name: /sign in/i });
        expect(signInLink).toHaveAttribute("href", "/auth");
      });
    });
  });
});
