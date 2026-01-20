/**
 * Unit Tests for Get Started Page (G-UT-004, G-UT-005, G-UT-006, G-UT-007)
 * Task: G-002 - Get Started Page
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// DOM matchers are now set up globally via Vitest setup file
import GetStartedPage from "./page";
import * as sharedContexts from "@elzatona/contexts";

// Mock shared contexts
vi.mock("@elzatona/contexts", async () => {
  const actual = await vi.importActual<any>(
    "../../test-utils/mocks/shared-contexts",
  );
  return {
    ...actual,
    useUserType: vi.fn(),
  };
});

// Mock LearningTypeContext
jest.mock("../../context/LearningTypeContext", () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: jest.fn(),
  })),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  Play: () => <span data-testid="play-icon">▶</span>,
  Code: () => <span data-testid="code-icon">💻</span>,
  Target: () => <span data-testid="target-icon">🎯</span>,
  BookOpen: () => <span data-testid="book-icon">📖</span>,
  CheckCircle: () => <span data-testid="check-icon">✓</span>,
  Star: () => <span data-testid="star-icon">⭐</span>,
  Users: () => <span data-testid="users-icon">👥</span>,
  Award: () => <span data-testid="award-icon">🏆</span>,
  Map: () => <span data-testid="map-icon">🗺️</span>,
  Compass: () => <span data-testid="compass-icon">🧭</span>,
  ExternalLink: () => <span data-testid="external-icon">🔗</span>,
}));

const mockPush = vi.fn();
const mockUseRouter = vi.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

describe('G-UT-004: "I need guidance" Option Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should have "I need guidance" option visible', () => {
    render(<GetStartedPage />);
    const guidedOption = screen.getByText(/I need guidance/i);
    expect(guidedOption).toBeVisible();
  });

  it('should have correct text content for "I need guidance"', () => {
    render(<GetStartedPage />);
    expect(screen.getByText(/I need guidance/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Show me structured learning paths/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pre-defined learning paths/i)).toBeInTheDocument();
  });
});

describe('G-UT-005: "I\'m self-directed" Option Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
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
  });

  it('should have "I\'m self-directed" option visible', () => {
    render(<GetStartedPage />);
    const selfDirectedOption = screen.getByText(/I'm self-directed/i);
    expect(selfDirectedOption).toBeVisible();
  });

  it('should have correct text content for "I\'m self-directed"', () => {
    render(<GetStartedPage />);
    expect(screen.getByText(/I'm self-directed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Let me create my own roadmap/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Custom roadmap builder/i)).toBeInTheDocument();
  });
});

describe("G-UT-006: Selection Feedback Works", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
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
  });

  it('should show selection feedback when "I need guidance" is clicked', async () => {
    render(<GetStartedPage />);

    const guidedOption = screen
      .getByText(/I need guidance/i)
      .closest('div[class*="cursor-pointer"]');
    expect(guidedOption).toBeInTheDocument();

    if (guidedOption) {
      fireEvent.click(guidedOption);

      // Wait for the selection to process
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Great choice!/i)).toBeInTheDocument();
      });
    }
  });

  it("should show loading transition when option is selected", async () => {
    render(<GetStartedPage />);

    const guidedOption = screen
      .getByText(/I need guidance/i)
      .closest('div[class*="cursor-pointer"]');
    if (guidedOption) {
      fireEvent.click(guidedOption);

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(
          screen.getByText(/Loading your learning experience/i),
        ).toBeInTheDocument();
      });
    }
  });
});

describe("G-UT-007: Page Structure Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
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
  });

  it("should render page title", () => {
    render(<GetStartedPage />);
    expect(screen.getByText(/Choose Your Learning Style/i)).toBeInTheDocument();
  });

  it("should render page description", () => {
    render(<GetStartedPage />);
    expect(
      screen.getByText(/Select how you'd like to learn/i),
    ).toBeInTheDocument();
  });

  it("should render both learning options", () => {
    render(<GetStartedPage />);
    expect(screen.getByText(/I need guidance/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm self-directed/i)).toBeInTheDocument();
  });
});

describe("G-UT-SNAPSHOT: Get Started Page Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
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
  });

  it("should match get started page snapshot", () => {
    const { container } = render(<GetStartedPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot with loading transition", () => {
    const { container, rerender } = render(<GetStartedPage />);

    const guidedOption = screen
      .getByText(/I need guidance/i)
      .closest('div[class*="cursor-pointer"]');
    if (guidedOption) {
      fireEvent.click(guidedOption);
      jest.advanceTimersByTime(300);
    }

    rerender(<GetStartedPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
