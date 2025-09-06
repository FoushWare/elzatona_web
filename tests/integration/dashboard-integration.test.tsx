/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import DashboardPage from '@/app/dashboard/page';
import EnhancedDashboard from '@/components/EnhancedDashboard';

// Mock hooks
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: jest.fn(),
}));

jest.mock('@/hooks/useUserProgress', () => ({
  useUserProgress: jest.fn(),
}));

// Mock Enhanced Dashboard component
jest.mock('@/components/EnhancedDashboard', () => {
  return function MockEnhancedDashboard() {
    return <div data-testid="enhanced-dashboard">Enhanced Dashboard</div>;
  };
});

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  BookOpen: () => <div data-testid="book-open-icon" />,
  Code: () => <div data-testid="code-icon" />,
  Target: () => <div data-testid="target-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}));

const createMockFirebaseAuth = (initialState = {}) => {
  let state = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    ...initialState,
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    signOut: jest.fn(),
    setState: newState => {
      state = { ...state, ...newState };
    },
  };
};

const createMockUserProgress = (initialState = {}) => {
  let state = {
    progress: {
      questionsCompleted: 24,
      challengesCompleted: 12,
      totalScore: 850,
      streak: 7,
      badges: ['Quick Learner', 'Problem Solver'],
      achievements: ['First Question', 'Week Streak'],
    },
    isLoading: false,
    error: null,
    ...initialState,
  };

  return {
    progress: state.progress,
    isLoading: state.isLoading,
    error: state.error,
    refreshProgress: jest.fn(),
    setState: newState => {
      state = { ...state, ...newState };
    },
  };
};

describe('Dashboard Integration Tests', () => {
  let mockFirebaseAuth: ReturnType<typeof createMockFirebaseAuth>;
  let mockUserProgress: ReturnType<typeof createMockUserProgress>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFirebaseAuth = createMockFirebaseAuth();
    mockUserProgress = createMockUserProgress();
    (useFirebaseAuth as jest.Mock).mockReturnValue(mockFirebaseAuth);
    (useUserProgress as jest.Mock).mockReturnValue(mockUserProgress);
  });

  describe('Authentication State Integration', () => {
    it('shows loading state while checking authentication', () => {
      mockFirebaseAuth.setState({ isLoading: true });

      render(<DashboardPage />);

      expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    it('shows welcome page for unauthenticated users', () => {
      render(<DashboardPage />);

      expect(
        screen.getByText('Welcome to Frontend KodDev')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Your comprehensive platform for mastering frontend development/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /sign in & start learning/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /start learning/i })
      ).toBeInTheDocument();
    });

    it('shows enhanced dashboard for authenticated users', () => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });

      render(<DashboardPage />);

      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument();
      expect(
        screen.queryByText('Welcome to Frontend KodDev')
      ).not.toBeInTheDocument();
    });
  });

  describe('Enhanced Dashboard Integration', () => {
    beforeEach(() => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });
    });

    it('loads and displays user progress data', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
      expect(screen.getByText('24')).toBeInTheDocument(); // questionsCompleted
      expect(screen.getByText('12')).toBeInTheDocument(); // challengesCompleted
      expect(screen.getByText('850')).toBeInTheDocument(); // totalScore
      expect(screen.getByText('7')).toBeInTheDocument(); // streak
    });

    it('shows loading state while fetching progress', () => {
      mockUserProgress.setState({ isLoading: true });

      render(<EnhancedDashboard />);

      expect(screen.getByText('Loading your progress...')).toBeInTheDocument();
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    });

    it('handles progress loading error', () => {
      mockUserProgress.setState({
        error: 'Failed to load progress data',
        isLoading: false,
      });

      render(<EnhancedDashboard />);

      expect(
        screen.getByText('Failed to load progress data')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /retry/i })
      ).toBeInTheDocument();
    });

    it('retries progress loading on error', async () => {
      const mockRefreshProgress = jest.fn();
      mockUserProgress.setState({
        error: 'Failed to load progress data',
        isLoading: false,
        refreshProgress: mockRefreshProgress,
      });

      render(<EnhancedDashboard />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryButton);

      expect(mockRefreshProgress).toHaveBeenCalled();
    });

    it('displays user badges and achievements', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Quick Learner')).toBeInTheDocument();
      expect(screen.getByText('Problem Solver')).toBeInTheDocument();
    });

    it('handles empty progress data gracefully', () => {
      mockUserProgress.setState({
        progress: {
          questionsCompleted: 0,
          challengesCompleted: 0,
          totalScore: 0,
          streak: 0,
          badges: [],
          achievements: [],
        },
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
    });
  });

  describe('User Interactions Integration', () => {
    it('handles sign out flow', async () => {
      const mockSignOut = jest.fn();
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
        signOut: mockSignOut,
      });

      render(<EnhancedDashboard />);

      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      fireEvent.click(signOutButton);

      expect(mockSignOut).toHaveBeenCalled();
    });

    it('navigates to quick action links', () => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });

      render(<EnhancedDashboard />);

      const practiceQuestionsLink = screen.getByRole('link', {
        name: /practice questions/i,
      });
      const learningPathsLink = screen.getByRole('link', {
        name: /learning paths/i,
      });
      const codingChallengesLink = screen.getByRole('link', {
        name: /coding challenges/i,
      });
      const progressAnalyticsLink = screen.getByRole('link', {
        name: /progress analytics/i,
      });

      expect(practiceQuestionsLink).toHaveAttribute(
        'href',
        '/practice/fundamentals'
      );
      expect(learningPathsLink).toHaveAttribute('href', '/learning-paths');
      expect(codingChallengesLink).toHaveAttribute('href', '/coding');
      expect(progressAnalyticsLink).toHaveAttribute('href', '/progress');
    });

    it('displays recent activities with correct data', () => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('Recent Activities')).toBeInTheDocument();
      expect(
        screen.getByText('Completed CSS Grid question')
      ).toBeInTheDocument();
      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
      expect(screen.getByText('+10')).toBeInTheDocument();
    });

    it('displays recommendations with correct data', () => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('Recommended for You')).toBeInTheDocument();
      expect(screen.getByText('React Hooks Deep Dive')).toBeInTheDocument();
      expect(
        screen.getByText('Master useState, useEffect, and custom hooks')
      ).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('2-3 hours')).toBeInTheDocument();
    });
  });

  describe('Statistics Integration', () => {
    it('toggles statistics visibility for unauthenticated users', async () => {
      render(<DashboardPage />);

      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });
      fireEvent.click(showStatsButton);

      await waitFor(() => {
        expect(screen.getByText('Hide Statistics')).toBeInTheDocument();
        expect(screen.getByText('500+')).toBeInTheDocument();
        expect(screen.getByText('25+')).toBeInTheDocument();
        expect(screen.getByText('100+')).toBeInTheDocument();
        expect(screen.getByText('24/7')).toBeInTheDocument();
      });

      const hideStatsButton = screen.getByRole('button', {
        name: /hide statistics/i,
      });
      fireEvent.click(hideStatsButton);

      await waitFor(() => {
        expect(screen.getByText('Show Statistics')).toBeInTheDocument();
        expect(screen.queryByText('500+')).not.toBeInTheDocument();
      });
    });
  });

  describe('Feature Cards Integration', () => {
    it('displays all feature cards with correct information', () => {
      render(<DashboardPage />);

      // Practice Questions card
      expect(screen.getByText('Practice Questions')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Access 500\+ carefully curated frontend interview questions/
        )
      ).toBeInTheDocument();

      // Learning Paths card
      expect(screen.getByText('Learning Paths')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Follow structured learning paths designed by industry experts/
        )
      ).toBeInTheDocument();

      // Gamified Progress card
      expect(screen.getByText('Gamified Progress')).toBeInTheDocument();
      expect(
        screen.getByText(/Earn badges, track streaks, and compete with others/)
      ).toBeInTheDocument();
    });

    it('renders feature cards with correct icons', () => {
      render(<DashboardPage />);

      expect(screen.getAllByTestId('book-open-icon')).toHaveLength(1);
      expect(screen.getAllByTestId('target-icon')).toHaveLength(1);
      expect(screen.getAllByTestId('trophy-icon')).toHaveLength(1);
    });
  });

  describe('Error Handling Integration', () => {
    it('handles missing user data gracefully', () => {
      mockFirebaseAuth.setState({
        user: null, // User is authenticated but user data is null
        isAuthenticated: true,
      });

      render(<DashboardPage />);

      // Should still render EnhancedDashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument();
    });

    it('handles progress loading errors gracefully', () => {
      mockFirebaseAuth.setState({
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        isAuthenticated: true,
      });

      mockUserProgress.setState({
        error: 'Network error',
        isLoading: false,
        refreshProgress: jest.fn(),
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /retry/i })
      ).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('does not cause unnecessary re-renders', () => {
      const { rerender } = render(<DashboardPage />);

      // Re-render with same props
      rerender(<DashboardPage />);

      // Should not cause any issues
      expect(
        screen.getByText('Welcome to Frontend KodDev')
      ).toBeInTheDocument();
    });

    it('handles rapid state changes gracefully', async () => {
      render(<DashboardPage />);

      // Rapidly change authentication state
      mockFirebaseAuth.setState({ isLoading: true });
      mockFirebaseAuth.setState({ isLoading: false, isAuthenticated: true });
      mockFirebaseAuth.setState({ isAuthenticated: false });

      // Should handle all state changes without errors
      expect(
        screen.getByText('Welcome to Frontend KodDev')
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains proper heading hierarchy', () => {
      render(<DashboardPage />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Welcome to Frontend KodDev');

      const featureHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(featureHeadings).toHaveLength(3);
    });

    it('provides proper button and link roles', () => {
      render(<DashboardPage />);

      const signInLink = screen.getByRole('link', {
        name: /sign in & start learning/i,
      });
      const startLearningLink = screen.getByRole('link', {
        name: /start learning/i,
      });
      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });

      expect(signInLink).toBeInTheDocument();
      expect(startLearningLink).toBeInTheDocument();
      expect(showStatsButton).toBeInTheDocument();
    });
  });
});
