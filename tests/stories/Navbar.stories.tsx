import type { Meta, StoryObj } from '@storybook/react';
import Navbar from '@/components/Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main navigation component with dropdown menus, user authentication, and responsive design.',
      },
    },
  },
  argTypes: {
    isAuthenticated: {
      control: { type: 'boolean' },
      description: 'Whether the user is authenticated',
    },
    user: {
      control: { type: 'object' },
      description: 'User object with profile information',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default navbar for unauthenticated users.',
      },
    },
  },
};

export const Authenticated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar for authenticated users with user menu.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual(
        '@/contexts/FirebaseAuthContext'
      );
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        ...originalModule,
        useFirebaseAuth: () => ({
          isAuthenticated: true,
          user: {
            uid: 'test-user-id',
            email: 'test@example.com',
            displayName: 'Test User',
            photoURL: 'https://via.placeholder.com/40',
          },
          signOut: jest.fn(),
          isLoading: false,
        }),
      }));
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar in loading state.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual(
        '@/contexts/FirebaseAuthContext'
      );
      jest.doMock('@/contexts/FirebaseAuthContext', () => ({
        ...originalModule,
        useFirebaseAuth: () => ({
          isAuthenticated: false,
          user: null,
          signOut: jest.fn(),
          isLoading: true,
        }),
      }));
      return <Story />;
    },
  ],
};

export const MobileOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Navbar on mobile with menu open.',
      },
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Navbar in dark mode.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/contexts/ThemeContext');
      jest.doMock('@/contexts/ThemeContext', () => ({
        ...originalModule,
        useTheme: () => ({ isDarkMode: true, toggleDarkMode: jest.fn() }),
      }));
      return <Story />;
    },
  ],
};

export const WithDropdownOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with learning dropdown menu open.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const learningButton = canvas.getByText('Learning');
    await userEvent.click(learningButton);
  },
};

export const Scrolled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar in scrolled state with background.',
      },
    },
  },
  decorators: [
    Story => {
      useEffect(() => {
        // Simulate scroll
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
      }, []);
      return <Story />;
    },
  ],
};
