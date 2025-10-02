import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';

// Mock the contexts
jest.mock('@/contexts/UserTypeContext', () => ({
  useUserType: () => ({
    userType: 'guided',
    setUserType: jest.fn(),
  }),
}));

jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => ({
    isAuthenticated: true,
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Test User',
    },
    signIn: jest.fn(),
    signOut: jest.fn(),
    isLoading: false,
  }),
}));

// Mock the components
jest.mock('@/components/UserStatistics', () => {
  return function MockUserStatistics() {
    return <div data-testid="user-statistics">User Statistics</div>;
  };
});

jest.mock('@/components/GuidedTour', () => {
  return function MockGuidedTour({ isOpen, onComplete, onSkip }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="guided-tour">
        <button onClick={onComplete}>Complete Tour</button>
        <button onClick={onSkip}>Skip Tour</button>
      </div>
    );
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders the homepage with all sections', () => {
    render(<HomePage />);

    expect(screen.getByText('Master Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Practice Challenges')).toBeInTheDocument();
    expect(screen.getByText('Learning Paths')).toBeInTheDocument();
    expect(screen.getByText('Track Progress')).toBeInTheDocument();
  });

  it('shows guided tour for first-time visitors', async () => {
    render(<HomePage />);

    // Wait for the tour to appear
    await waitFor(
      () => {
        expect(screen.getByTestId('guided-tour')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('does not show tour for returning visitors', () => {
    localStorage.setItem('hasSeenHomepageTour', 'true');
    render(<HomePage />);

    expect(screen.queryByTestId('guided-tour')).not.toBeInTheDocument();
  });

  it('handles tour completion', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId('guided-tour')).toBeInTheDocument();
    });

    const completeButton = screen.getByText('Complete Tour');
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('guided-tour')).not.toBeInTheDocument();
    });

    expect(localStorage.getItem('hasSeenHomepageTour')).toBe('true');
  });

  it('handles tour skip', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId('guided-tour')).toBeInTheDocument();
    });

    const skipButton = screen.getByText('Skip Tour');
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(screen.queryByTestId('guided-tour')).not.toBeInTheDocument();
    });

    expect(localStorage.getItem('hasSeenHomepageTour')).toBe('true');
  });

  it('displays user statistics for authenticated users', () => {
    render(<HomePage />);

    expect(screen.getByTestId('user-statistics')).toBeInTheDocument();
  });

  it('shows animation after mount', async () => {
    render(<HomePage />);

    // Wait for animation to trigger
    await waitFor(
      () => {
        const heroSection = screen
          .getByText('Master Frontend Development')
          .closest('div');
        expect(heroSection).toHaveClass('animate-fade-in-up');
      },
      { timeout: 1000 }
    );
  });

  it('renders all navigation links', () => {
    render(<HomePage />);

    expect(screen.getByText('Practice Challenges')).toBeInTheDocument();
    expect(screen.getByText('Learning Paths')).toBeInTheDocument();
    expect(screen.getByText('Track Progress')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('handles responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<HomePage />);

    // Check that the page renders without errors on mobile
    expect(screen.getByText('Master Frontend Development')).toBeInTheDocument();
  });

  it('displays features section', () => {
    render(<HomePage />);

    expect(
      screen.getByText('Comprehensive Learning Paths')
    ).toBeInTheDocument();
    expect(screen.getByText('Interactive Practice')).toBeInTheDocument();
    expect(screen.getByText('Real Interview Questions')).toBeInTheDocument();
    expect(screen.getByText('Progress Tracking')).toBeInTheDocument();
  });

  it('shows call-to-action buttons', () => {
    render(<HomePage />);

    const startButton = screen.getByText('Start Learning Now');
    const exploreButton = screen.getByText('Explore Features');

    expect(startButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  it('handles dark mode', () => {
    // Mock dark mode
    document.documentElement.classList.add('dark');

    render(<HomePage />);

    // Check that the page renders without errors in dark mode
    expect(screen.getByText('Master Frontend Development')).toBeInTheDocument();

    // Clean up
    document.documentElement.classList.remove('dark');
  });
});
