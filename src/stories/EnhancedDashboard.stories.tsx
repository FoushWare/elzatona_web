import type { Meta, StoryObj } from '@storybook/nextjs';
import EnhancedDashboard from '@/components/EnhancedDashboard';

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
