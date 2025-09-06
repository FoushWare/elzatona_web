import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, expect } from '@storybook/test';
import DashboardPage from '@/app/dashboard/page';

// Mock Firebase Auth Context
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

// Mock Enhanced Dashboard component
jest.mock('@/components/EnhancedDashboard', () => {
  return function MockEnhancedDashboard() {
    return (
      <div data-testid="enhanced-dashboard" className="p-8">
        <h1>Enhanced Dashboard</h1>
        <p>Mock enhanced dashboard component for Storybook</p>
      </div>
    );
  };
});

// Mock the hooks
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => mockFirebaseAuth,
}));

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard page that shows different views based on authentication status.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AuthenticatedUser: Story = {
  name: 'Authenticated User',
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard view for authenticated users showing the enhanced dashboard component.',
      },
    },
  },
};

export const UnauthenticatedUser: Story = {
  name: 'Unauthenticated User',
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard view for unauthenticated users showing welcome section and features preview.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock unauthenticated state
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          signOut: () => {},
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
        story: 'Dashboard loading state while checking authentication status.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock loading state
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: true,
          signOut: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const WithStatisticsExpanded: Story = {
  name: 'With Statistics Expanded',
  parameters: {
    docs: {
      description: {
        story: 'Unauthenticated dashboard with statistics section expanded.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock unauthenticated state
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          signOut: () => {},
        }),
      }));
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to show statistics
    const showStatsButton = canvas.getByRole('button', {
      name: /show statistics/i,
    });
    await userEvent.click(showStatsButton);

    // Verify statistics are displayed
    await expect(canvas.getByText('500+')).toBeInTheDocument();
    await expect(canvas.getByText('25+')).toBeInTheDocument();
    await expect(canvas.getByText('100+')).toBeInTheDocument();
    await expect(canvas.getByText('24/7')).toBeInTheDocument();
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard page in dark mode theme.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    Story => {
      // Mock unauthenticated state for better visibility
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          signOut: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const MobileView: Story = {
  name: 'Mobile View',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard page optimized for mobile devices.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    Story => {
      // Mock unauthenticated state for better mobile testing
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          signOut: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};

export const TabletView: Story = {
  name: 'Tablet View',
  parameters: {
    docs: {
      description: {
        story: 'Dashboard page optimized for tablet devices.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    Story => {
      // Mock unauthenticated state for better tablet testing
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        useFirebaseAuth: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          signOut: () => {},
        }),
      }));
      return <Story />;
    },
  ],
};
