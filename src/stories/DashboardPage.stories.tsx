import type { Meta, StoryObj } from '@storybook/nextjs';
import DashboardPage from '@/app/pages/dashboard/page';

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
};
