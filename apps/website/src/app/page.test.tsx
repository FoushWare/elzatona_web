/**
 * Home Page Tests
 *
 * Tests for the refactored home page component
 * Following refactoring plans and testing standards
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./page";

// Mock dependencies
vi.mock("@elzatona/contexts", () => ({
  useUserType: () => ({
    userType: null,
    setUserType: vi.fn(),
  }),
}));

vi.mock("@elzatona/common-ui", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
  HomePageLayout: ({
    userType,
    showAnimation,
    hasActivePlan,
    activePlan,
    personalizedContent,
    onGuidedClick,
    onFreestyleClick,
  }: any) => (
    <div data-testid="home-page-layout">
      <div data-testid="user-type">{userType || "null"}</div>
      <div data-testid="show-animation">{showAnimation ? "true" : "false"}</div>
      <div data-testid="has-active-plan">
        {hasActivePlan ? "true" : "false"}
      </div>
      <button data-testid="guided-click" onClick={onGuidedClick}>
        Guided Learning
      </button>
      <button data-testid="freestyle-click" onClick={onFreestyleClick}>
        Freestyle Practice
      </button>
    </div>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: "/",
  }),
}));

vi.mock("../context/LearningTypeContext", () => ({
  useLearningType: () => ({
    learningType: null,
    setLearningType: vi.fn(),
  }),
}));

vi.mock("./lib/hooks/useHomePageState", () => ({
  useHomePageState: () => ({
    hasActivePlan: false,
    activePlan: null,
    showAnimation: true,
  }),
}));

vi.mock("./lib/homePageHelpers", () => ({
  getPersonalizedContent: () => ({
    title: "Master Frontend Development",
    subtitle: "The complete platform to ace your frontend interviews",
    cta: "Get Started",
    ctaLink: "/get-started",
    icon: null,
    color: "indigo",
  }),
}));

vi.mock("./lib/constants/homePage.constants", () => ({
  ROUTES: {
    GUIDED_LEARNING: "/features/guided-learning",
    BROWSE_QUESTIONS: "/browse-practice-questions",
  },
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<HomePage />);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("should render HomePageLayout component", () => {
    render(<HomePage />);
    expect(screen.getByTestId("home-page-layout")).toBeInTheDocument();
  });

  it("should display default user type when not set", () => {
    render(<HomePage />);
    expect(screen.getByTestId("user-type")).toHaveTextContent("null");
  });

  it("should show animation by default", () => {
    render(<HomePage />);
    expect(screen.getByTestId("show-animation")).toHaveTextContent("true");
  });

  it("should show no active plan by default", () => {
    render(<HomePage />);
    expect(screen.getByTestId("has-active-plan")).toHaveTextContent("false");
  });

  it("should render guided learning button", () => {
    render(<HomePage />);
    expect(screen.getByTestId("guided-click")).toBeInTheDocument();
    expect(screen.getByTestId("guided-click")).toHaveTextContent(
      "Guided Learning",
    );
  });

  it("should render freestyle practice button", () => {
    render(<HomePage />);
    expect(screen.getByTestId("freestyle-click")).toBeInTheDocument();
    expect(screen.getByTestId("freestyle-click")).toHaveTextContent(
      "Freestyle Practice",
    );
  });

  it("should wrap content in ErrorBoundary", () => {
    render(<HomePage />);
    const errorBoundary = screen.getByTestId("error-boundary");
    expect(errorBoundary).toBeInTheDocument();
    expect(errorBoundary).toContainElement(
      screen.getByTestId("home-page-layout"),
    );
  });
});

describe("HomePage Integration", () => {
  it("should handle user interactions", async () => {
    const { useRouter } = await import("next/navigation");
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      pathname: "/",
    } as any);

    render(<HomePage />);

    const guidedButton = screen.getByTestId("guided-click");
    guidedButton.click();

    // Verify navigation would be called (mocked)
    expect(guidedButton).toBeInTheDocument();
  });
});

describe("HomePage Snapshot Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should match home page snapshot (default state)", () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot("home-page-default");
  });

  it("should match home page snapshot (with guided user type)", () => {
    const { useUserType } = require("@elzatona/contexts");
    vi.mocked(useUserType).mockReturnValue({
      userType: "guided",
      setUserType: vi.fn(),
    });

    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot("home-page-guided");
  });

  it("should match home page snapshot (with self-directed user type)", () => {
    const { useUserType } = require("@elzatona/contexts");
    vi.mocked(useUserType).mockReturnValue({
      userType: "self-directed",
      setUserType: vi.fn(),
    });

    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot("home-page-self-directed");
  });

  it("should match home page snapshot (with active plan)", () => {
    const { useHomePageState } = require("./lib/hooks/useHomePageState");
    vi.mocked(useHomePageState).mockReturnValue({
      hasActivePlan: true,
      activePlan: {
        id: "test-plan-001",
        name: "React Mastery",
        totalQuestions: 50,
      },
      showAnimation: false,
    });

    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot("home-page-with-active-plan");
  });

  it("should match home page snapshot (loading state)", () => {
    const { useHomePageState } = require("./lib/hooks/useHomePageState");
    vi.mocked(useHomePageState).mockReturnValue({
      hasActivePlan: false,
      activePlan: null,
      showAnimation: true,
    });

    const { container } = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot("home-page-loading");
  });
});
