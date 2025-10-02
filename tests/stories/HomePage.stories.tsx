import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '@/app/page';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main homepage of the Elzatona Web platform featuring hero section, features, and navigation.',
      },
    },
  },
  argTypes: {
    userType: {
      control: { type: 'select' },
      options: ['guided', 'self-directed', null],
      description: 'Type of user viewing the page',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default homepage view for new users.',
      },
    },
  },
};

export const GuidedUser: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Homepage view for guided learning users.',
      },
    },
  },
  decorators: [
    Story => {
      // Mock the user type context
      const originalModule = jest.requireActual('@/contexts/UserTypeContext');
      jest.doMock('@/contexts/UserTypeContext', () => ({
        ...originalModule,
        useUserType: () => ({ userType: 'guided' }),
      }));
      return <Story />;
    },
  ],
};

export const SelfDirectedUser: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Homepage view for self-directed learning users.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/contexts/UserTypeContext');
      jest.doMock('@/contexts/UserTypeContext', () => ({
        ...originalModule,
        useUserType: () => ({ userType: 'self-directed' }),
      }));
      return <Story />;
    },
  ],
};

export const WithActivePlan: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Homepage view when user has an active learning plan.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/contexts/UserTypeContext');
      jest.doMock('@/contexts/UserTypeContext', () => ({
        ...originalModule,
        useUserType: () => ({ userType: 'guided' }),
      }));
      return <Story />;
    },
  ],
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Homepage view on mobile devices.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Homepage view on tablet devices.',
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
        story: 'Homepage view in dark mode.',
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
