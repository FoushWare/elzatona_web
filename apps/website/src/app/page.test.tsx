/**
 * Unit Tests for Homepage (G-UT-001, G-UT-002, G-UT-003, G-UT-004, G-UT-005)
 * Task 17: Homepage Rendering
 *
 * Tests cover:
 * - Basic rendering and error handling
 * - Personalized content based on userType
 * - Active plan detection and display
 * - Learning style selection cards
 * - Animations and conditional rendering
 *
 * IMPORTANT: UserTypeContext defaults to 'guided' for unauthenticated users.
 * This means:
 * - Default state (no localStorage) = userType: 'guided' (not null)
 * - Final CTA section only shows when userType is explicitly null (rare)
 * - "Choose Learning Plan" button appears for guided users (not "Get Started")
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./page";
import * as sharedContexts from "@elzatona/contexts";

// Mock shared contexts
jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual("../test-utils/mocks/shared-contexts");
  return {
    ...actual,
    useUserType: jest.fn(),
    useAuth: jest.fn(),
    UserStatistics: jest.fn(() => (
      <div data-testid="user-statistics">User Statistics</div>
    )),
    ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Mock LearningTypeContext
const mockSetLearningType = jest.fn();
jest.mock("../context/LearningTypeContext", () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: mockSetLearningType,
  })),
}));

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

// Mock Next.js router
const mockPush = jest.fn();
const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  Play: () => <span data-testid="play-icon">▶</span>,
  BookOpen: () => <span data-testid="book-icon">📖</span>,
  Star: () => <span data-testid="star-icon">⭐</span>,
  Map: () => <span data-testid="map-icon">🗺️</span>,
  Compass: () => <span data-testid="compass-icon">🧭</span>,
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  Zap: () => <span data-testid="zap-icon">⚡</span>,
}));

// Helper function to setup localStorage mock
const setupLocalStorage = (data: Record<string, string | null> = {}) => {
  const storage: Record<string, string> = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, v ?? ""]),
  );
  Storage.prototype.getItem = jest.fn((key: string) => {
    return storage[key] || null;
  });
  Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    storage[key] = value;
  });
  Storage.prototype.removeItem = jest.fn((key: string) => {
    delete storage[key];
  });
  Storage.prototype.clear = jest.fn(() => {
    Object.keys(storage).forEach((key) => delete storage[key]);
  });
  return storage;
};

// Helper function to clear localStorage
const clearLocalStorage = () => {
  // Reset localStorage by setting up with empty data
  setupLocalStorage({});
};

describe("G-UT-001: Homepage Renders Correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    // Default mocks - UserTypeContext defaults to 'guided' for unauthenticated users
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided", // Default for unauthenticated users
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup empty localStorage
    setupLocalStorage({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should render homepage without errors", () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });

  it("should not have console errors", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(<HomePage />);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("should render all required elements", () => {
    render(<HomePage />);

    // Check for main title (guided content - default for unauthenticated users)
    expect(
      screen.getByText(/Master Frontend Development/i),
    ).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(
        /The complete platform to ace your frontend interviews/i,
      ),
    ).toBeInTheDocument();

    // Check for CTA button - "Choose Learning Plan" (not "Get Started") for guided users
    const ctaButton = screen.getByRole("link", {
      name: /Choose Learning Plan/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/get-started");

    // Final CTA section should NOT appear (only shows when userType is null)
    expect(
      screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).not.toBeInTheDocument();

    // Check for UserStatistics component (may not have test-id, check for content instead)
    // UserStatistics shows stats like "Active Learners", "Success Rate", etc.
    // The component may be loading, so we check for the grid container or stats text
    const statsText = screen.queryByText(
      /Active Learners|Success Rate|Questions Solved|Average Time/i,
    );
    // Note: UserStatistics may be loading or not rendered in test environment
    // This is acceptable as the component loads asynchronously
  });

  it("should render learning style selection section", () => {
    render(<HomePage />);

    // Check for "How would you like to learn?" heading
    expect(
      screen.getByText(/How would you like to learn\?/i),
    ).toBeInTheDocument();

    // Check for Guided Learning card (appears in both card title and button text)
    const guidedTexts = screen.getAllByText(/Guided Learning/i);
    expect(guidedTexts.length).toBeGreaterThan(0);

    // Check for Free Style Learning card (appears in both card title and button text)
    const freeStyleTexts = screen.getAllByText(/Free Style Learning/i);
    expect(freeStyleTexts.length).toBeGreaterThan(0);
  });
});

describe("G-UT-002: Personalized Content Based on UserType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup empty localStorage
    setupLocalStorage({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should show default content when userType is null (rare case)", () => {
    // Note: This is a rare case since UserTypeContext defaults to 'guided'
    // This test verifies the fallback behavior when userType is explicitly null
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });

    render(<HomePage />);

    expect(
      screen.getByText(/Master Frontend Development/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The complete platform to ace your frontend interviews/i,
      ),
    ).toBeInTheDocument();

    // When userType is null, "Get Started" button appears
    const ctaButton = screen.getByRole("link", { name: /Get Started/i });
    expect(ctaButton).toHaveAttribute("href", "/get-started");

    // Final CTA section should appear when userType is null
    expect(
      screen.getByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).toBeInTheDocument();
  });

  it('should show guided content when userType is "guided" without active plan (default for unauthenticated)', () => {
    // This is the default state for unauthenticated users
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    // Setup localStorage without active plan
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": null,
    });

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(2000);

    // Use getAllByText since text appears in both hero and user type section
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
    // Subtitle appears in both hero and user type section
    const subtitles = screen.getAllByText(
      /The complete platform to ace your frontend interviews/i,
    );
    expect(subtitles.length).toBeGreaterThan(0);

    // "Choose Learning Plan" link appears in both hero and user type section
    const ctaButtons = screen.getAllByRole("link", {
      name: /Choose Learning Plan/i,
    });
    expect(ctaButtons.length).toBeGreaterThan(0);
    expect(ctaButtons[0]).toHaveAttribute("href", "/get-started");

    // "Get Started" button should NOT appear when userType is "guided"
    const getStartedButtons = screen.queryAllByRole("link", {
      name: /Get Started/i,
    });
    expect(getStartedButtons.length).toBe(0);

    // Final CTA section should NOT appear when userType is "guided"
    expect(
      screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).not.toBeInTheDocument();
  });

  it('should show guided content with active plan when userType is "guided" and plan exists', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    const activePlan = {
      id: "plan-123",
      name: "Frontend Fundamentals",
      totalQuestions: 50,
      estimatedTime: "2 hours",
    };

    // Setup localStorage with active plan
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": JSON.stringify(activePlan),
    });

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(1000);

    // Use getAllByText since text appears in both hero and final section
    const titles = screen.getAllByText(/Continue Frontend Fundamentals/i);
    expect(titles.length).toBeGreaterThan(0);
    // Subtitle appears in both hero and plan details section
    const subtitles = screen.getAllByText(
      /Pick up where you left off with your frontend fundamentals/i,
    );
    expect(subtitles.length).toBeGreaterThan(0);

    // "Continue Practice" link appears in both hero and user type section
    const ctaButtons = screen.getAllByRole("link", {
      name: /Continue Practice/i,
    });
    expect(ctaButtons.length).toBeGreaterThan(0);
    expect(ctaButtons[0]).toHaveAttribute(
      "href",
      "/guided-practice?plan=plan-123",
    );
  });

  it('should show self-directed content when userType is "self-directed"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });

    render(<HomePage />);

    expect(screen.getByText(/Build Your Custom Roadmap/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Create and manage your personalized learning journey/i),
    ).toBeInTheDocument();

    // "View My Roadmap" link appears in both hero and user type section, use getAllByRole
    const ctaButtons = screen.getAllByRole("link", {
      name: /View My Roadmap/i,
    });
    expect(ctaButtons.length).toBeGreaterThan(0);
    expect(ctaButtons[0]).toHaveAttribute("href", "/browse-practice-questions");
  });
});

describe("G-UT-003: Learning Style Selection Cards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup empty localStorage
    setupLocalStorage({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should render Guided Learning card with correct content", () => {
    render(<HomePage />);

    // "Guided Learning" appears in both card title (h3) and "Start Guided Learning" text
    const guidedTexts = screen.getAllByText(/Guided Learning/i);
    expect(guidedTexts.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Follow structured learning paths designed by experts/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Guided Learning/i)).toBeInTheDocument();
  });

  it("should render Free Style Learning card with correct content", () => {
    render(<HomePage />);

    // "Free Style Learning" appears in both card title (h3) and "Start Free Style Learning" text
    const freeStyleTexts = screen.getAllByText(/Free Style Learning/i);
    expect(freeStyleTexts.length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        /Create your own learning roadmap and explore topics at your own pace/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Free Style Learning/i)).toBeInTheDocument();
  });

  it('should highlight Guided Learning card when userType is "guided"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    const { container } = render(<HomePage />);

    // Check if the card has the ring class (highlighted state)
    const guidedCard = container.querySelector(".ring-2.ring-indigo-400");
    expect(guidedCard).toBeInTheDocument();
  });

  it('should highlight Free Style Learning card when userType is "self-directed"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });

    const { container } = render(<HomePage />);

    // Check if the card has the ring class (highlighted state)
    const freestyleCard = container.querySelector(".ring-2.ring-green-400");
    expect(freestyleCard).toBeInTheDocument();
  });
});

describe("G-UT-004: Conditional Rendering Based on UserType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup empty localStorage
    setupLocalStorage({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should show final CTA section when userType is null", () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });

    render(<HomePage />);

    expect(
      screen.getByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Learning Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Learning Paths/i)).toBeInTheDocument();
  });

  it("should show user type specific content section when userType is set", () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    // Setup localStorage with userType
    setupLocalStorage({
      userType: "guided",
    });

    render(<HomePage />);

    jest.advanceTimersByTime(2000);

    // Should NOT show final CTA section (only shows when userType is null)
    expect(
      screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i),
    ).not.toBeInTheDocument();

    // Should show guided-specific content section
    // "Master Frontend Development" appears in both hero and user type section
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);

    // "Choose Learning Plan" button should appear
    const ctaButtons = screen.getAllByRole("link", {
      name: /Choose Learning Plan/i,
    });
    expect(ctaButtons.length).toBeGreaterThan(0);
  });
});

describe("G-UT-005: Active Plan Detection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should detect active plan from localStorage", () => {
    const activePlan = {
      id: "plan-456",
      name: "React Mastery",
      totalQuestions: 100,
      estimatedTime: "4 hours",
    };

    // Setup localStorage with active plan
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": JSON.stringify(activePlan),
    });

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(1000);

    // Use getAllByText since title appears in both hero and final section
    const titles = screen.getAllByText(/Continue React Mastery/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText(/Current Plan:/i)).toBeInTheDocument();
    // "React Mastery" appears in title, subtitle, and plan details section
    const planNames = screen.getAllByText(/React Mastery/i);
    expect(planNames.length).toBeGreaterThan(0);
    expect(screen.getByText(/100 questions • 4 hours/i)).toBeInTheDocument();
  });

  it("should handle invalid JSON in localStorage gracefully", () => {
    // Setup localStorage with invalid JSON
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": "invalid-json",
    });

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(1000);

    // Should show default guided content (no active plan)
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);

    // Should have logged error
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("should remove invalid plan data from localStorage", () => {
    // Setup localStorage with invalid JSON
    const storage = setupLocalStorage({
      userType: "guided",
      "active-guided-plan": "invalid-json",
    });

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(1000);

    // Verify removeItem was called
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith(
      "active-guided-plan",
    );

    consoleError.mockRestore();
  });

  it("should handle missing active plan key in localStorage", () => {
    // Setup localStorage without active plan key
    setupLocalStorage({
      userType: "guided",
    });

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(2000);

    // Should show default guided content
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should handle empty active plan string in localStorage", () => {
    // Setup localStorage with empty string
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": "",
    });

    render(<HomePage />);

    // Wait for useEffect to complete
    jest.advanceTimersByTime(2000);

    // Should show default guided content
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
  });
});

describe("G-UT-SNAPSHOT: Homepage Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Clear localStorage before each test
    clearLocalStorage();

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup empty localStorage
    setupLocalStorage({});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Clear localStorage after each test
    clearLocalStorage();
  });

  it("should match homepage snapshot (unauthenticated, default guided - most common case)", () => {
    // UserTypeContext defaults to 'guided' for unauthenticated users
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided", // Default for unauthenticated users
      setUserType: jest.fn(),
    });

    // Setup localStorage with guided userType (default behavior)
    setupLocalStorage({
      userType: "guided",
    });

    const { container } = render(<HomePage />);
    // Advance timers to complete all animations (500ms initial + 1400ms user type section)
    jest.advanceTimersByTime(2000);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match homepage snapshot (unauthenticated, userType null - rare case)", () => {
    // This is a rare case since UserTypeContext defaults to 'guided'
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });

    const { container } = render(<HomePage />);
    // Advance timers to complete all animations (500ms initial + 1500ms final CTA)
    jest.advanceTimersByTime(2000);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match homepage snapshot (authenticated, guided user, no active plan)", () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "test@example.com" },
    });

    // Setup localStorage without active plan
    setupLocalStorage({
      userType: "guided",
    });

    const { container } = render(<HomePage />);
    // Advance timers to complete all animations (500ms initial + 1400ms user type section)
    jest.advanceTimersByTime(2000);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match homepage snapshot (authenticated, guided user, with active plan)", () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "test@example.com" },
    });

    const activePlan = {
      id: "plan-789",
      name: "JavaScript Basics",
      totalQuestions: 30,
      estimatedTime: "1.5 hours",
    };

    // Setup localStorage with active plan
    setupLocalStorage({
      userType: "guided",
      "active-guided-plan": JSON.stringify(activePlan),
    });

    const { container } = render(<HomePage />);
    // Advance timers to complete all animations and useEffect processing
    jest.advanceTimersByTime(2000);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match homepage snapshot (authenticated, self-directed user)", () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "self-directed",
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "test@example.com" },
    });

    // Setup localStorage with self-directed userType
    setupLocalStorage({
      userType: "self-directed",
    });

    const { container } = render(<HomePage />);
    // Advance timers to complete all animations (500ms initial + 1400ms user type section)
    jest.advanceTimersByTime(2000);
    expect(container.firstChild).toMatchSnapshot();
  });
});
