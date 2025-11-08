/**
 * Unit Tests for Homepage (G-UT-001, G-UT-002, G-UT-003)
 * Task: G-001 - Homepage Rendering
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

// Mock shared contexts - use the test utils mock
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useUserType: jest.fn(),
    useAuth: jest.fn(),
    UserStatistics: jest.fn(() => <div data-testid="user-statistics">User Statistics</div>),
    ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock LearningTypeContext
jest.mock('../context/LearningTypeContext', () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: jest.fn(),
  })),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

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

const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
}));

describe('G-UT-001: Homepage Renders Correctly', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mocks
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
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
    
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  it('should render homepage without errors', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });

  it('should not have console errors', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<HomePage />);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('should render all required elements', () => {
    render(<HomePage />);
    
    // Check for main title
    expect(screen.getByText(/Master Frontend Development|Start Your Learning Path|Build Your Custom Roadmap/i)).toBeInTheDocument();
    
    // Check for CTA button
    const ctaButton = screen.getByRole('link', { name: /Get Started|Choose Learning Plan|View My Roadmap|Continue Practice/i });
    expect(ctaButton).toBeInTheDocument();
  });
});

describe('G-UT-002: Get Started Button Exists and is Clickable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
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
    
    Storage.prototype.getItem = jest.fn(() => null);
  });

  it('should have Get Started button element', () => {
    render(<HomePage />);
    const button = screen.getByRole('link', { name: /Get Started/i });
    expect(button).toBeInTheDocument();
  });

  it('should have Get Started button visible', () => {
    render(<HomePage />);
    const button = screen.getByRole('link', { name: /Get Started/i });
    expect(button).toBeVisible();
  });

  it('should have onClick handler attached (via Link href)', () => {
    render(<HomePage />);
    const button = screen.getByRole('link', { name: /Get Started/i });
    expect(button).toHaveAttribute('href', '/get-started');
  });
});

describe('G-UT-003: Navigation Links Render Correctly', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
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
    
    Storage.prototype.getItem = jest.fn(() => null);
  });

  it('should render all navigation links', () => {
    render(<HomePage />);
    
    // Check for main CTA links
    expect(screen.getByRole('link', { name: /Get Started|Start Learning Now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Learning Paths/i })).toBeInTheDocument();
  });

  it('should have correct hrefs for navigation links', () => {
    render(<HomePage />);
    
    const getStartedLink = screen.getByRole('link', { name: /Get Started|Start Learning Now/i });
    expect(getStartedLink).toHaveAttribute('href', '/get-started');
    
    const learnLink = screen.getByRole('link', { name: /Explore Learning Paths/i });
    expect(learnLink).toHaveAttribute('href', '/learn');
  });

  it('should have clickable navigation links', () => {
    render(<HomePage />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link).toBeVisible();
    });
  });
});

