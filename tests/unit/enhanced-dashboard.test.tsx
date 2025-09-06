/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import EnhancedDashboard from '@/components/EnhancedDashboard';

// Mock hooks
jest.mock('@/hooks/useUserProgress', () => ({
  useUserProgress: jest.fn(),
}));

jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: jest.fn(),
}));

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
  Play: () => <div data-testid="play-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Timer: () => <div data-testid="timer-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  Flame: () => <div data-testid="flame-icon" />,
  Medal: () => <div data-testid="medal-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
  Bookmark: () => <div data-testid="bookmark-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
}));

const mockUserProgress = {
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
  refreshProgress: jest.fn(),
};

const mockFirebaseAuth = {
  user: {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
  },
  isAuthenticated: true,
  isLoading: false,
  signOut: jest.fn(),
};

describe('EnhancedDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUserProgress as jest.Mock).mockReturnValue(mockUserProgress);
    (useFirebaseAuth as jest.Mock).mockReturnValue(mockFirebaseAuth);
  });

  describe('Rendering', () => {
    it('renders dashboard header with user information', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
      expect(
        screen.getByText('Ready to continue your learning journey?')
      ).toBeInTheDocument();
    });

    it('renders progress overview section', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Progress Overview')).toBeInTheDocument();
      expect(screen.getByText('24')).toBeInTheDocument(); // questionsCompleted
      expect(screen.getByText('12')).toBeInTheDocument(); // challengesCompleted
      expect(screen.getByText('850')).toBeInTheDocument(); // totalScore
      expect(screen.getByText('7')).toBeInTheDocument(); // streak
    });

    it('renders dashboard cards section', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Practice Questions')).toBeInTheDocument();
      expect(screen.getByText('Learning Paths')).toBeInTheDocument();
      expect(screen.getByText('Coding Challenges')).toBeInTheDocument();
      expect(screen.getByText('Progress Analytics')).toBeInTheDocument();
    });

    it('renders recent activities section', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Recent Activities')).toBeInTheDocument();
    });

    it('renders recommendations section', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Recommended for You')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading state when progress is loading', () => {
      (useUserProgress as jest.Mock).mockReturnValue({
        ...mockUserProgress,
        isLoading: true,
      });

      render(<EnhancedDashboard />);

      expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
      expect(screen.getByText('Loading your progress...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('shows error state when progress fails to load', () => {
      (useUserProgress as jest.Mock).mockReturnValue({
        ...mockUserProgress,
        error: 'Failed to load progress',
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('Failed to load progress')).toBeInTheDocument();
    });

    it('shows retry button when there is an error', () => {
      (useUserProgress as jest.Mock).mockReturnValue({
        ...mockUserProgress,
        error: 'Failed to load progress',
      });

      render(<EnhancedDashboard />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('calls refreshProgress when retry button is clicked', () => {
      const mockRefreshProgress = jest.fn();
      (useUserProgress as jest.Mock).mockReturnValue({
        ...mockUserProgress,
        error: 'Failed to load progress',
        refreshProgress: mockRefreshProgress,
      });

      render(<EnhancedDashboard />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryButton);

      expect(mockRefreshProgress).toHaveBeenCalled();
    });
  });

  describe('Dashboard Cards', () => {
    it('renders all dashboard cards with correct links', () => {
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

    it('displays correct progress statistics on cards', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('24/100 completed')).toBeInTheDocument();
      expect(screen.getByText('3 paths in progress')).toBeInTheDocument();
      expect(screen.getByText('12 challenges solved')).toBeInTheDocument();
      expect(screen.getByText('85% completion rate')).toBeInTheDocument();
    });
  });

  describe('Recent Activities', () => {
    it('renders recent activities with correct information', () => {
      render(<EnhancedDashboard />);

      expect(
        screen.getByText('Completed CSS Grid question')
      ).toBeInTheDocument();
      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
      expect(screen.getByText('+10')).toBeInTheDocument();

      expect(
        screen.getByText('Solved React Hooks challenge')
      ).toBeInTheDocument();
      expect(screen.getByText('1 day ago')).toBeInTheDocument();
      expect(screen.getByText('+25')).toBeInTheDocument();
    });

    it('renders activity icons correctly', () => {
      render(<EnhancedDashboard />);

      expect(screen.getAllByTestId('check-circle-icon')).toHaveLength(1);
      expect(screen.getAllByTestId('trophy-icon')).toHaveLength(1);
      expect(screen.getAllByTestId('target-icon')).toHaveLength(1);
      expect(screen.getAllByTestId('award-icon')).toHaveLength(1);
    });
  });

  describe('Recommendations', () => {
    it('renders recommendations with correct information', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('React Hooks Deep Dive')).toBeInTheDocument();
      expect(
        screen.getByText('Master useState, useEffect, and custom hooks')
      ).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('2-3 hours')).toBeInTheDocument();

      expect(screen.getByText('CSS Grid Mastery')).toBeInTheDocument();
      expect(
        screen.getByText('Learn advanced CSS Grid layouts and techniques')
      ).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
      expect(screen.getByText('3-4 hours')).toBeInTheDocument();
    });

    it('renders recommendation links correctly', () => {
      render(<EnhancedDashboard />);

      const reactHooksLink = screen.getByRole('link', {
        name: /react hooks deep dive/i,
      });
      const cssGridLink = screen.getByRole('link', {
        name: /css grid mastery/i,
      });
      const jsFeaturesLink = screen.getByRole('link', {
        name: /javascript es6\+ features/i,
      });

      expect(reactHooksLink).toHaveAttribute(
        'href',
        '/learning-paths/react-hooks'
      );
      expect(cssGridLink).toHaveAttribute('href', '/learning-paths/css-grid');
      expect(jsFeaturesLink).toHaveAttribute(
        'href',
        '/learning-paths/javascript-es6'
      );
    });
  });

  describe('User Actions', () => {
    it('renders user profile section', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('renders sign out button', () => {
      render(<EnhancedDashboard />);

      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      expect(signOutButton).toBeInTheDocument();
    });

    it('calls signOut when sign out button is clicked', () => {
      const mockSignOut = jest.fn();
      (useFirebaseAuth as jest.Mock).mockReturnValue({
        ...mockFirebaseAuth,
        signOut: mockSignOut,
      });

      render(<EnhancedDashboard />);

      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      fireEvent.click(signOutButton);

      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes', () => {
      render(<EnhancedDashboard />);

      const cardsGrid = screen.getByText('Practice Questions').closest('.grid');
      expect(cardsGrid).toHaveClass('grid', 'md:grid-cols-2', 'lg:grid-cols-4');

      const activitiesGrid = screen
        .getByText('Recent Activities')
        .closest('div')
        ?.querySelector('.grid');
      if (activitiesGrid) {
        expect(activitiesGrid).toHaveClass('grid', 'md:grid-cols-2');
      }
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<EnhancedDashboard />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Welcome back, Test User!');

      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('has proper button and link roles', () => {
      render(<EnhancedDashboard />);

      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      const practiceQuestionsLink = screen.getByRole('link', {
        name: /practice questions/i,
      });

      expect(signOutButton).toBeInTheDocument();
      expect(practiceQuestionsLink).toBeInTheDocument();
    });

    it('has proper alt text for user avatar', () => {
      render(<EnhancedDashboard />);

      const avatar = screen.getByAltText('Test User');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('displays user progress data correctly', () => {
      render(<EnhancedDashboard />);

      // Check progress numbers
      expect(screen.getByText('24')).toBeInTheDocument(); // questionsCompleted
      expect(screen.getByText('12')).toBeInTheDocument(); // challengesCompleted
      expect(screen.getByText('850')).toBeInTheDocument(); // totalScore
      expect(screen.getByText('7')).toBeInTheDocument(); // streak
    });

    it('displays badges and achievements', () => {
      render(<EnhancedDashboard />);

      expect(screen.getByText('Quick Learner')).toBeInTheDocument();
      expect(screen.getByText('Problem Solver')).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('handles empty progress data gracefully', () => {
      (useUserProgress as jest.Mock).mockReturnValue({
        progress: {
          questionsCompleted: 0,
          challengesCompleted: 0,
          totalScore: 0,
          streak: 0,
          badges: [],
          achievements: [],
        },
        isLoading: false,
        error: null,
        refreshProgress: jest.fn(),
      });

      render(<EnhancedDashboard />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
    });
  });
});
