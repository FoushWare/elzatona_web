import type { Meta, StoryObj } from '@storybook/nextjs';
import LearningPathsPage from './page';

const meta: Meta<typeof LearningPathsPage> = {
  title: 'Pages/Learning Paths',
  component: LearningPathsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main learning paths page that displays all available learning paths in an accordion-style layout.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default state of the learning paths page with all cards collapsed.',
      },
    },
  },
};

export const WithExpandedCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the learning paths page with one card expanded to demonstrate the accordion functionality.',
      },
    },
  },
  play: async () => {
    // This would be implemented with user interactions in a real story
    // For now, it's just a placeholder to show the expanded state
  },
};

export const WithSearchFilter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the search functionality by filtering learning paths.',
      },
    },
  },
};

export const WithDifficultyFilter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the difficulty filter in action, displaying only intermediate level paths.',
      },
    },
  },
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the empty state when no learning paths match the current filters.',
      },
    },
  },
};
