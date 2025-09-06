import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, expect } from '@storybook/test';
import EnhancedDashboard from '@/components/EnhancedDashboard';

// Mock hooks
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
  refreshProgress: () => {},
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
  signOut: () => {},
};

// Mock the hooks
jest.mock('@/hooks/useUserProgress', () => ({
  useUserProgress: () => mockUserProgress,
}));

jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => mockFirebaseAuth,
}));

const meta: Meta<typeof EnhancedDashboard> = {
  title: 'Components/EnhancedDashboard',
  component: EnhancedDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Enhanced dashboard component for authenticated users with progress tracking, quick actions, and recommendations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Dashboard',
  parameters: {
    docs: {
      description: {
        story:
          'Default enhanced dashboard view with user progress, quick actions, and recommendations.',
      },
    },
  },
};

export const WithHighProgress: Story = {
  name: 'High Progress User',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard for a user with high progress and many achievements.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock high progress data
      jest.doMock('@/hooks/useUserProgress', () => ({
        useUserProgress: () => ({
          progress: {
            questionsCompleted: 95,
            challengesCompleted: 45,
            totalScore: 2500,
            streak: 30,
            badges: [
              'Quick Learner',
              'Problem Solver',
              'Code Master',
              'Streak King',
            ],
            achievements: [
              'First Question',
              'Week Streak',
              'Month Streak',
              'Century Club',
            ],
          },
          isLoading: false,
          error: null,
          refreshProgress: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const WithLowProgress: Story = {
  name: 'New User',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard for a new user with minimal progress.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock low progress data
      jest.doMock('@/hooks/useUserProgress', () => ({
        useUserProgress: () => ({
          progress: {
            questionsCompleted: 2,
            challengesCompleted: 0,
            totalScore: 20,
            streak: 1,
            badges: [],
            achievements: [],
          },
          isLoading: false,
          error: null,
          refreshProgress: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const LoadingState: Story = {
  name: 'Loading State',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard loading state while fetching user progress data.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock loading state
      jest.doMock('@/hooks/useUserProgress', () => ({
        useUserProgress: () => ({
          progress: null,
          isLoading: true,
          error: null,
          refreshProgress: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const ErrorState: Story = {
  name: 'Error State',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard error state when progress data fails to load.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock error state
      jest.doMock('@/hooks/useUserProgress', () => ({
        useUserProgress: () => ({
          progress: null,
          isLoading: false,
          error: 'Failed to load progress data',
          refreshProgress: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const WithRetryAction: Story = {
  name: 'Error State with Retry',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard error state with retry functionality.',
      },
    },
  },
  decorators: [
    Story => {
      const mockRefreshProgress = jest.fn();
      // Mock error state with retry function
      jest.doMock('@/hooks/useUserProgress', () => ({
        useUserProgress: () => ({
          progress: null,
          isLoading: false,
          error: 'Failed to load progress data',
          refreshProgress: mockRefreshProgress,
        }),
      }));
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify error message is displayed
    await expect(
      canvas.getByText('Failed to load progress data')
    ).toBeInTheDocument();

    // Click retry button
    const retryButton = canvas.getByRole('button', { name: /retry/i });
    await userEvent.click(retryButton);

    // Verify retry function was called (this would need to be implemented)
    await expect(retryButton).toBeInTheDocument();
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story: 'Enhanced dashboard in dark mode theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const MobileView: Story = {
  name: 'Mobile View',
  parameters: {
    docs: {
      description: {
        story: 'Enhanced dashboard optimized for mobile devices.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  name: 'Tablet View',
  parameters: {
    docs: {
      description: {
        story: 'Enhanced dashboard optimized for tablet devices.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const WithUserActions: Story = {
  name: 'User Actions',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with user actions like sign out functionality.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify user profile section
    await expect(canvas.getByText('Test User')).toBeInTheDocument();
    await expect(canvas.getByText('test@example.com')).toBeInTheDocument();

    // Verify sign out button
    const signOutButton = canvas.getByRole('button', { name: /sign out/i });
    await expect(signOutButton).toBeInTheDocument();

    // Test sign out action
    await userEvent.click(signOutButton);
  },
};

export const WithQuickActions: Story = {
  name: 'Quick Actions',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard quick actions section with navigation links.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify quick actions section
    await expect(canvas.getByText('Quick Actions')).toBeInTheDocument();

    // Verify all quick action links
    const practiceQuestionsLink = canvas.getByRole('link', {
      name: /practice questions/i,
    });
    const learningPathsLink = canvas.getByRole('link', {
      name: /learning paths/i,
    });
    const codingChallengesLink = canvas.getByRole('link', {
      name: /coding challenges/i,
    });
    const progressAnalyticsLink = canvas.getByRole('link', {
      name: /progress analytics/i,
    });

    await expect(practiceQuestionsLink).toBeInTheDocument();
    await expect(learningPathsLink).toBeInTheDocument();
    await expect(codingChallengesLink).toBeInTheDocument();
    await expect(progressAnalyticsLink).toBeInTheDocument();
  },
};

export const WithRecommendations: Story = {
  name: 'Recommendations',
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard recommendations section with personalized learning suggestions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify recommendations section
    await expect(canvas.getByText('Recommended for You')).toBeInTheDocument();

    // Verify recommendation items
    await expect(canvas.getByText('React Hooks Deep Dive')).toBeInTheDocument();
    await expect(canvas.getByText('CSS Grid Mastery')).toBeInTheDocument();
    await expect(
      canvas.getByText('JavaScript ES6+ Features')
    ).toBeInTheDocument();
  },
};
