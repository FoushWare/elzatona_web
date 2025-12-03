/**
 * Integration Tests for Homepage (G-IT-001, G-IT-002, G-IT-003, G-IT-004, G-IT-005)
 * Task 17: Homepage Rendering
 * 
 * Tests cover:
 * - Navigation flows
 * - User type changes and persistence
 * - Learning style selection interactions
 * - localStorage interactions
 * - Active plan management
 * 
 * IMPORTANT: UserTypeContext defaults to 'guided' for unauthenticated users.
 * This means:
 * - Default state (no localStorage) = userType: 'guided' (not null)
 * - Final CTA section only shows when userType is explicitly null (rare)
 * - "Choose Learning Plan" button appears for guided users (not "Get Started")
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useUserType: jest.fn(),
    useAuth: jest.fn(),
    UserStatistics: jest.fn(() => <div data-testid="user-statistics">User Statistics</div>),
    ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock LearningTypeContext
const mockSetLearningType = jest.fn();
jest.mock('../context/LearningTypeContext', () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: mockSetLearningType,
  })),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock Next.js router
const mockPush = jest.fn();
const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
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
    Object.entries(data).map(([k, v]) => [k, v ?? ''])
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
    Object.keys(storage).forEach(key => delete storage[key]);
  });
  return storage;
};

// Helper function to clear localStorage
const clearLocalStorage = () => {
  // Reset localStorage by setting up with empty data
  setupLocalStorage({});
};

describe('G-IT-001: Navigation Flows', () => {
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
    
    mockPush.mockClear();
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

  it('should navigate to /get-started when "Choose Learning Plan" button is clicked (default guided state)', () => {
    // Default state for unauthenticated users is 'guided'
    render(<HomePage />);
    jest.advanceTimersByTime(2000);
    
    // "Choose Learning Plan" button appears for guided users (default)
    const choosePlanLink = screen.getByRole('link', { name: /Choose Learning Plan/i });
    expect(choosePlanLink).toHaveAttribute('href', '/get-started');
    
    // "Get Started" button should NOT appear when userType is "guided"
    const getStartedButtons = screen.queryAllByRole('link', { name: /Get Started/i });
    expect(getStartedButtons.length).toBe(0);
    
    // Final CTA section should NOT appear (only shows when userType is null)
    expect(screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeInTheDocument();
  });

  it('should navigate to /get-started when "Get Started" button is clicked (userType null - rare case)', () => {
    // This is a rare case since UserTypeContext defaults to 'guided'
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });
    
    render(<HomePage />);
    
    const getStartedLink = screen.getByRole('link', { name: /Get Started/i });
    expect(getStartedLink).toHaveAttribute('href', '/get-started');
    
    // Final CTA section should appear when userType is null
    expect(screen.getByText(/Ready to Ace Your Interviews\? 🚀/i)).toBeInTheDocument();
  });

  it('should navigate to /get-started when "Start Learning Now" is clicked (userType null - rare case)', () => {
    // This is a rare case since UserTypeContext defaults to 'guided'
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });
    
    render(<HomePage />);
    
    const startLearningLink = screen.getByRole('link', { name: /Start Learning Now/i });
    expect(startLearningLink).toHaveAttribute('href', '/get-started');
  });

  it('should navigate to /learn when "Explore Learning Paths" is clicked (userType null - rare case)', () => {
    // This is a rare case since UserTypeContext defaults to 'guided'
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });
    
    render(<HomePage />);
    
    const learnLink = screen.getByRole('link', { name: /Explore Learning Paths/i });
    expect(learnLink).toHaveAttribute('href', '/learn');
  });

  it('should navigate to /get-started when guided user clicks "Choose Learning Plan"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    render(<HomePage />);
    jest.advanceTimersByTime(1000);
    
    // "Choose Learning Plan" link appears in both hero and user type section
    const choosePlanLinks = screen.getAllByRole('link', { name: /Choose Learning Plan/i });
    expect(choosePlanLinks.length).toBeGreaterThan(0);
    expect(choosePlanLinks[0]).toHaveAttribute('href', '/get-started');
    
    // "Get Started" button should NOT appear when userType is "guided"
    const getStartedButtons = screen.queryAllByRole('link', { name: /Get Started/i });
    expect(getStartedButtons.length).toBe(0);
  });

  it('should navigate to /browse-practice-questions when self-directed user clicks "View My Roadmap"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'self-directed',
      setUserType: jest.fn(),
    });
    
    render(<HomePage />);
    
    // "View My Roadmap" link appears in both hero and user type section
    const roadmapLinks = screen.getAllByRole('link', { name: /View My Roadmap/i });
    expect(roadmapLinks.length).toBeGreaterThan(0);
    expect(roadmapLinks[0]).toHaveAttribute('href', '/browse-practice-questions');
  });

  it('should navigate to guided practice when user with active plan clicks "Continue Practice"', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    const activePlan = {
      id: 'plan-123',
      name: 'Test Plan',
      totalQuestions: 50,
      estimatedTime: '2 hours',
    };
    
    // Setup localStorage with active plan
    setupLocalStorage({
      'userType': 'guided',
      'active-guided-plan': JSON.stringify(activePlan),
    });
    
    render(<HomePage />);
    jest.advanceTimersByTime(1000);
    
    // "Continue Practice" link appears in both hero and user type section
    const continueLinks = screen.getAllByRole('link', { name: /Continue Practice/i });
    expect(continueLinks.length).toBeGreaterThan(0);
    expect(continueLinks[0]).toHaveAttribute('href', '/guided-practice?plan=plan-123');
  });
});

describe('G-IT-002: Learning Style Selection Interactions', () => {
  let mockSetUserType: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Clear localStorage before each test
    clearLocalStorage();
    
    mockSetUserType = jest.fn();
    // UserTypeContext defaults to 'guided' for unauthenticated users
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided', // Default for unauthenticated users
      setUserType: mockSetUserType,
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    
    mockPush.mockClear();
    mockSetLearningType.mockClear();
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

  it('should set userType to "guided" and navigate when Guided Learning card is clicked', () => {
    // Setup empty localStorage
    setupLocalStorage({});
    
    render(<HomePage />);
    
    // "Guided Learning" appears in both card title and button text
    const guidedTexts = screen.getAllByText(/Guided Learning/i);
    expect(guidedTexts.length).toBeGreaterThan(0);
    // Find the card by looking for the h3 element (card title)
    const guidedCard = guidedTexts.find(el => el.tagName === 'H3')?.closest('div[class*="cursor-pointer"]');
    expect(guidedCard).toBeInTheDocument();
    
    fireEvent.click(guidedCard!);
    
    expect(mockSetUserType).toHaveBeenCalledWith('guided');
    expect(mockSetLearningType).toHaveBeenCalledWith('guided');
    expect(mockPush).toHaveBeenCalledWith('/features/guided-learning');
    
    // Note: localStorage.setItem is called internally by setUserType and setLearningType
    // Since these are mocked, we verify they were called instead
    // The actual localStorage persistence is tested in unit tests
  });

  it('should set userType to "self-directed" and navigate when Free Style Learning card is clicked', () => {
    // Setup empty localStorage
    setupLocalStorage({});
    
    render(<HomePage />);
    
    // "Free Style Learning" appears in both card title and button text
    const freestyleTexts = screen.getAllByText(/Free Style Learning/i);
    expect(freestyleTexts.length).toBeGreaterThan(0);
    // Find the card by looking for the h3 element (card title)
    const freestyleCard = freestyleTexts.find(el => el.tagName === 'H3')?.closest('div[class*="cursor-pointer"]');
    expect(freestyleCard).toBeInTheDocument();
    
    fireEvent.click(freestyleCard!);
    
    expect(mockSetUserType).toHaveBeenCalledWith('self-directed');
    expect(mockSetLearningType).toHaveBeenCalledWith('free-style');
    expect(mockPush).toHaveBeenCalledWith('/browse-practice-questions');
    
    // Note: localStorage.setItem is called internally by setUserType and setLearningType
    // Since these are mocked, we verify they were called instead
    // The actual localStorage persistence is tested in unit tests
  });
});

describe('G-IT-003: User Type Changes and Content Updates', () => {
  let mockSetUserType: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Clear localStorage before each test
    clearLocalStorage();
    
    mockSetUserType = jest.fn();
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

  it('should update content when userType changes from null to "guided"', async () => {
    // Setup localStorage without userType
    setupLocalStorage({});
    
    // Initial state - userType is null (rare case)
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: mockSetUserType,
    });
    
    const { rerender } = render(<HomePage />);
    
    expect(screen.getByText(/Master Frontend Development/i)).toBeInTheDocument();
    // Final CTA section should appear when userType is null
    expect(screen.getByText(/Ready to Ace Your Interviews\? 🚀/i)).toBeInTheDocument();
    
    // Change to guided user and update localStorage
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: mockSetUserType,
    });
    
    setupLocalStorage({
      'userType': 'guided',
    });
    
    rerender(<HomePage />);
    jest.advanceTimersByTime(2000);
    
    await waitFor(() => {
      const titles = screen.getAllByText(/Master Frontend Development/i);
      expect(titles.length).toBeGreaterThan(0);
      // Final CTA section should NOT appear when userType is "guided"
      expect(screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeInTheDocument();
    });
  });

  it('should update content when userType changes from "guided" to "self-directed"', async () => {
    // Setup localStorage with guided userType
    setupLocalStorage({
      'userType': 'guided',
    });
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: mockSetUserType,
    });
    
    const { rerender } = render(<HomePage />);
    jest.advanceTimersByTime(1000);
    
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
    
    // Change to self-directed and update localStorage
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'self-directed',
      setUserType: mockSetUserType,
    });
    
    setupLocalStorage({
      'userType': 'self-directed',
    });
    
    rerender(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Build Your Custom Roadmap/i)).toBeInTheDocument();
    });
  });

  it('should show/hide final CTA section based on userType', () => {
    // No userType - should show final CTA
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: mockSetUserType,
    });
    
    const { rerender } = render(<HomePage />);
    
    expect(screen.getByText(/Ready to Ace Your Interviews\? 🚀/i)).toBeInTheDocument();
    
    // Set userType - should hide final CTA
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: mockSetUserType,
    });
    
    rerender(<HomePage />);
    jest.advanceTimersByTime(1000);
    
    expect(screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeInTheDocument();
  });
});

describe('G-IT-004: Active Plan Detection and Display', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Clear localStorage before each test
    clearLocalStorage();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
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

  it('should detect and display active plan from localStorage', async () => {
    const activePlan = {
      id: 'plan-999',
      name: 'Advanced React',
      totalQuestions: 75,
      estimatedTime: '3 hours',
    };
    
    // Setup localStorage with active plan
    setupLocalStorage({
      'userType': 'guided',
      'active-guided-plan': JSON.stringify(activePlan),
    });
    
    render(<HomePage />);
    
    // Wait for useEffect to process localStorage
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      const titles = screen.getAllByText(/Continue Advanced React/i);
      expect(titles.length).toBeGreaterThan(0);
      expect(screen.getByText(/Current Plan:/i)).toBeInTheDocument();
      // "Advanced React" appears in title, subtitle, and plan details section
      const planNames = screen.getAllByText(/Advanced React/i);
      expect(planNames.length).toBeGreaterThan(0);
      expect(screen.getByText(/75 questions • 3 hours/i)).toBeInTheDocument();
    });
  });

  it('should show default guided content when no active plan exists', async () => {
    // Setup localStorage without active plan
    setupLocalStorage({
      'userType': 'guided',
    });
    
    render(<HomePage />);
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      const titles = screen.getAllByText(/Master Frontend Development/i);
      expect(titles.length).toBeGreaterThan(0);
      expect(screen.queryByText(/Current Plan:/i)).not.toBeInTheDocument();
    });
  });

  it('should update content when active plan is added to localStorage', async () => {
    // Setup localStorage without active plan initially
    setupLocalStorage({
      'userType': 'guided',
    });
    
    const { unmount } = render(<HomePage />);
    jest.advanceTimersByTime(2000);
    
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
    
    // Simulate adding active plan to localStorage
    const activePlan = {
      id: 'plan-new',
      name: 'New Plan',
      totalQuestions: 20,
      estimatedTime: '1 hour',
    };
    
    setupLocalStorage({
      'userType': 'guided',
      'active-guided-plan': JSON.stringify(activePlan),
    });
    
    // Unmount and remount to trigger useEffect to re-read localStorage
    unmount();
    
    // Ensure localStorage is set before remounting
    // The setupLocalStorage call above should have already set it, but let's be explicit
    const storage = setupLocalStorage({
      'userType': 'guided',
      'active-guided-plan': JSON.stringify(activePlan),
    });
    
    // Verify localStorage is set correctly
    expect(Storage.prototype.getItem).toBeDefined();
    const storedPlan = Storage.prototype.getItem('active-guided-plan');
    expect(storedPlan).toBe(JSON.stringify(activePlan));
    
    render(<HomePage />);
    jest.advanceTimersByTime(2000); // Wait longer for useEffect to process
    
    await waitFor(() => {
      // The title should be "Continue New Plan" (plan name is "New Plan")
      const continueTitles = screen.getAllByText(/Continue New Plan/i);
      expect(continueTitles.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });
});

describe('G-IT-005: Authentication State Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Clear localStorage before each test
    clearLocalStorage();
    
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

  it('should show guided content for unauthenticated users (default behavior)', () => {
    // UserTypeContext defaults to 'guided' for unauthenticated users
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided', // Default for unauthenticated users
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    
    // Setup localStorage with guided userType (default behavior)
    setupLocalStorage({
      'userType': 'guided',
    });
    
    render(<HomePage />);
    jest.advanceTimersByTime(2000);
    
    // Should show guided content
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
    const subtitles = screen.getAllByText(/The complete platform to ace your frontend interviews/i);
    expect(subtitles.length).toBeGreaterThan(0);
    
    // Should show "Choose Learning Plan" button (not "Get Started")
    const ctaButtons = screen.getAllByRole('link', { name: /Choose Learning Plan/i });
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    // Final CTA section should NOT appear (only shows when userType is null)
    expect(screen.queryByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeInTheDocument();
  });

  it('should show personalized content for authenticated guided users', () => {
    // Setup localStorage for authenticated guided user
    setupLocalStorage({
      'userType': 'guided',
    });
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '123', email: 'test@example.com' },
    });
    
    render(<HomePage />);
    jest.advanceTimersByTime(2000);
    
    const titles = screen.getAllByText(/Master Frontend Development/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should show personalized content for authenticated self-directed users', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'self-directed',
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '123', email: 'test@example.com' },
    });
    
    render(<HomePage />);
    
    expect(screen.getByText(/Build Your Custom Roadmap/i)).toBeInTheDocument();
  });
});
