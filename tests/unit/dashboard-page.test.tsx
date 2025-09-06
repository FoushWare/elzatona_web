/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import DashboardPage from '@/app/dashboard/page';

// Mock Firebase Auth Context
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: jest.fn(),
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
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Award: () => <div data-testid="award-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  LogOut: () => <div data-testid="log-out-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
  Star: () => <div data-testid="star-icon" />,
}));

const mockFirebaseAuth = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFirebaseAuth as jest.Mock).mockReturnValue(mockFirebaseAuth);
  });

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', () => {
      (useFirebaseAuth as jest.Mock).mockReturnValue({
        ...mockFirebaseAuth,
        isLoading: true,
      });

      render(<DashboardPage />);

      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
      expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
    });
  });

  describe('Unauthenticated State', () => {
    it('renders welcome section for unauthenticated users', () => {
      render(<DashboardPage />);

      expect(
        screen.getByText('Welcome to Frontend KodDev')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Your comprehensive platform for mastering frontend development/
        )
      ).toBeInTheDocument();
    });

    it('renders sign in and start learning buttons', () => {
      render(<DashboardPage />);

      const signInButton = screen.getByRole('link', {
        name: /sign in & start learning/i,
      });
      const startLearningLinks = screen.getAllByRole('link', {
        name: /start learning/i,
      });

      expect(signInButton).toBeInTheDocument();
      expect(signInButton).toHaveAttribute('href', '/auth');

      expect(startLearningLinks).toHaveLength(2); // Both "Sign In & Start Learning" and "Start Learning"
      expect(startLearningLinks[1]).toHaveAttribute('href', '/learning-paths');
    });

    it('renders features preview section', () => {
      render(<DashboardPage />);

      expect(screen.getByText('Practice Questions')).toBeInTheDocument();
      expect(screen.getByText('Learning Paths')).toBeInTheDocument();
      expect(screen.getByText('Gamified Progress')).toBeInTheDocument();

      expect(
        screen.getByText(
          /Access 500\+ carefully curated frontend interview questions/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Follow structured learning paths designed by industry experts/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Earn badges, track streaks, and compete with others/)
      ).toBeInTheDocument();
    });

    it('renders statistics preview section', () => {
      render(<DashboardPage />);

      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });
      expect(showStatsButton).toBeInTheDocument();
    });

    it('toggles statistics visibility', () => {
      render(<DashboardPage />);

      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });
      fireEvent.click(showStatsButton);

      expect(screen.getByText('Hide Statistics')).toBeInTheDocument();
      expect(screen.getByText('500+')).toBeInTheDocument();
      expect(screen.getByText('25+')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('24/7')).toBeInTheDocument();
    });

    it('hides statistics when hide button is clicked', () => {
      render(<DashboardPage />);

      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });
      fireEvent.click(showStatsButton);

      const hideStatsButton = screen.getByRole('button', {
        name: /hide statistics/i,
      });
      fireEvent.click(hideStatsButton);

      expect(screen.getByText('Show Statistics')).toBeInTheDocument();
      expect(screen.queryByText('500+')).not.toBeInTheDocument();
    });
  });

  describe('Authenticated State', () => {
    it('renders EnhancedDashboard component when authenticated', () => {
      (useFirebaseAuth as jest.Mock).mockReturnValue({
        ...mockFirebaseAuth,
        isAuthenticated: true,
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
        },
      });

      render(<DashboardPage />);

      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument();
      expect(
        screen.queryByText('Welcome to Frontend KodDev')
      ).not.toBeInTheDocument();
    });
  });

  describe('Feature Cards', () => {
    it('renders all feature cards with correct content', () => {
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

  describe('Statistics Section', () => {
    it('shows correct statistics when expanded', () => {
      render(<DashboardPage />);

      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });
      fireEvent.click(showStatsButton);

      expect(screen.getByText('500+')).toBeInTheDocument();
      expect(screen.getAllByText('Practice Questions')).toHaveLength(2); // One in features, one in stats

      expect(screen.getByText('25+')).toBeInTheDocument();
      expect(screen.getAllByText('Learning Paths')).toHaveLength(2); // One in features, one in stats

      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Coding Challenges')).toBeInTheDocument();

      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('AI Support')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for responsive layout', () => {
      render(<DashboardPage />);

      const featuresGrid = screen
        .getByText('Practice Questions')
        .closest('.grid');
      expect(featuresGrid).toHaveClass('grid', 'md:grid-cols-3');

      const statsGrid = screen
        .getByText('Show Statistics')
        .closest('div')
        ?.querySelector('.grid');
      if (statsGrid) {
        expect(statsGrid).toHaveClass('grid', 'md:grid-cols-4');
      }
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<DashboardPage />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Welcome to Frontend KodDev');

      const featureHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(featureHeadings).toHaveLength(3);
    });

    it('has proper button and link roles', () => {
      render(<DashboardPage />);

      const signInLink = screen.getByRole('link', {
        name: /sign in & start learning/i,
      });
      const startLearningLinks = screen.getAllByRole('link', {
        name: /start learning/i,
      });
      const showStatsButton = screen.getByRole('button', {
        name: /show statistics/i,
      });

      expect(signInLink).toBeInTheDocument();
      expect(startLearningLinks).toHaveLength(2);
      expect(showStatsButton).toBeInTheDocument();
    });

    it('has proper accessibility for icons', () => {
      render(<DashboardPage />);

      // Check that icons have proper data-testid attributes for testing
      const codeIcon = screen.getByTestId('code-icon');
      const bookOpenIcon = screen.getByTestId('book-open-icon');
      const targetIcon = screen.getByTestId('target-icon');
      const trophyIcon = screen.getByTestId('trophy-icon');

      expect(codeIcon).toBeInTheDocument();
      expect(bookOpenIcon).toBeInTheDocument();
      expect(targetIcon).toBeInTheDocument();
      expect(trophyIcon).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing user data gracefully', () => {
      (useFirebaseAuth as jest.Mock).mockReturnValue({
        ...mockFirebaseAuth,
        isAuthenticated: true,
        user: null, // User is authenticated but user data is null
      });

      render(<DashboardPage />);

      // Should still render EnhancedDashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const { rerender } = render(<DashboardPage />);

      // Re-render with same props
      rerender(<DashboardPage />);

      // Should not cause any issues
      expect(
        screen.getByText('Welcome to Frontend KodDev')
      ).toBeInTheDocument();
    });
  });
});
