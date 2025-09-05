import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Empty state component displayed when no learning paths match the current filters. Includes options to clear filters or navigate to study plans.',
      },
    },
  },
  argTypes: {
    onClearFilters: {
      action: 'clearFilters',
      description: 'Callback when clear filters button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLongText: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The empty state component with default styling and interactions.',
      },
    },
  },
};
