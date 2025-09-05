import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A header component with title, description, and navigation links. Includes mobile toggle buttons for statistics and filters.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main page title',
    },
    description: {
      control: 'text',
      description: 'Page description text',
    },
    showMobileButtons: {
      control: 'boolean',
      description: 'Show mobile toggle buttons',
    },
    showStatistics: {
      control: 'boolean',
      description: 'Statistics panel visibility state',
    },
    showFilters: {
      control: 'boolean',
      description: 'Filters panel visibility state',
    },
    onToggleStatistics: {
      action: 'toggleStatistics',
      description: 'Callback when statistics toggle is clicked',
    },
    onToggleFilters: {
      action: 'toggleFilters',
      description: 'Callback when filters toggle is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Learning Paths',
    description:
      'Curated educational journeys to master frontend development skills through carefully selected resources',
    showMobileButtons: false,
    showStatistics: false,
    showFilters: false,
  },
};

export const WithMobileButtons: Story = {
  args: {
    title: 'Learning Paths',
    description:
      'Curated educational journeys to master frontend development skills through carefully selected resources',
    showMobileButtons: true,
    showStatistics: false,
    showFilters: false,
  },
};

export const WithMobileButtonsActive: Story = {
  args: {
    title: 'Learning Paths',
    description:
      'Curated educational journeys to master frontend development skills through carefully selected resources',
    showMobileButtons: true,
    showStatistics: true,
    showFilters: true,
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Frontend Development Mastery',
    description:
      'Master the art of frontend development with our comprehensive learning paths',
    showMobileButtons: false,
    showStatistics: false,
    showFilters: false,
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Learning Paths',
    description:
      'This is a much longer description that demonstrates how the component handles extended text content. It should wrap properly and maintain good readability across different screen sizes while providing comprehensive information about the learning paths available.',
    showMobileButtons: true,
    showStatistics: false,
    showFilters: false,
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Paths',
    description: 'Learn frontend development',
    showMobileButtons: false,
    showStatistics: false,
    showFilters: false,
  },
};
