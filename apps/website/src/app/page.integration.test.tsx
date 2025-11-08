/**
 * Integration Tests for Homepage (G-IT-001, G-IT-002)
 * Task: G-001 - Homepage Rendering
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

const mockPush = jest.fn();
const mockUseRouter = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
}));

describe('G-IT-001: Get Started Button Navigates to /get-started', () => {
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
    
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    
    Storage.prototype.getItem = jest.fn(() => null);
  });

  it('should navigate to /get-started when Get Started link is clicked', () => {
    render(<HomePage />);
    
    const getStartedLink = screen.getByRole('link', { name: /Get Started|Start Learning Now/i });
    expect(getStartedLink).toHaveAttribute('href', '/get-started');
    
    // Since we're using Next.js Link, the href is set correctly
    // In a real browser, clicking would navigate
    fireEvent.click(getStartedLink);
    
    // Verify the link has the correct href
    expect(getStartedLink).toHaveAttribute('href', '/get-started');
  });

  it('should have correct navigation path', () => {
    render(<HomePage />);
    
    const getStartedLink = screen.getByRole('link', { name: /Get Started|Start Learning Now/i });
    const href = getStartedLink.getAttribute('href');
    expect(href).toBe('/get-started');
  });
});

describe('G-IT-002: Authentication State Affects Homepage Display', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => null);
  });

  it('should show default content for unauthenticated users', () => {
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
    
    render(<HomePage />);
    
    // Should show default "Master Frontend Development" title
    expect(screen.getByText(/Master Frontend Development/i)).toBeInTheDocument();
    expect(screen.getByText(/The complete platform to ace your frontend interviews/i)).toBeInTheDocument();
  });

  it('should show personalized content for authenticated guided users', () => {
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '123', email: 'test@example.com' },
    });
    
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    
    render(<HomePage />);
    
    // Should show guided learning content
    expect(screen.getByText(/Start Your Learning Path|Continue/i)).toBeInTheDocument();
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
    
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    
    render(<HomePage />);
    
    // Should show self-directed learning content
    expect(screen.getByText(/Build Your Custom Roadmap|Self-Directed Learning/i)).toBeInTheDocument();
  });

  it('should conditionally render based on user type', async () => {
    const { rerender } = render(<HomePage />);
    
    // Initial state - no user type
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: jest.fn(),
    });
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    
    expect(screen.getByText(/Master Frontend Development/i)).toBeInTheDocument();
    
    // Change to guided user
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: 'guided',
      setUserType: jest.fn(),
    });
    
    rerender(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Start Your Learning Path|Choose Learning Plan/i)).toBeInTheDocument();
    });
  });
});

