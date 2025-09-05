import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatisticsSection } from './StatisticsSection';

const meta: Meta<typeof StatisticsSection> = {
  title: 'Components/StatisticsSection',
  component: StatisticsSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A statistics section displaying key metrics about learning paths including count, total hours, resources, and categories.',
      },
    },
  },
  argTypes: {
    learningPathsCount: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of learning paths available',
    },
    totalHours: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Total estimated hours across all paths',
    },
    totalResources: {
      control: { type: 'number', min: 0, max: 500 },
      description: 'Total number of resources',
    },
    categoriesCount: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Number of categories',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the statistics section is visible',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    learningPathsCount: 20,
    totalHours: 150,
    totalResources: 85,
    categoriesCount: 12,
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    learningPathsCount: 20,
    totalHours: 150,
    totalResources: 85,
    categoriesCount: 12,
    isVisible: false,
  },
};

export const HighNumbers: Story = {
  args: {
    learningPathsCount: 50,
    totalHours: 500,
    totalResources: 250,
    categoriesCount: 15,
    isVisible: true,
  },
};

export const LowNumbers: Story = {
  args: {
    learningPathsCount: 5,
    totalHours: 25,
    totalResources: 12,
    categoriesCount: 3,
    isVisible: true,
  },
};

export const ZeroValues: Story = {
  args: {
    learningPathsCount: 0,
    totalHours: 0,
    totalResources: 0,
    categoriesCount: 0,
    isVisible: true,
  },
};

export const LargeNumbers: Story = {
  args: {
    learningPathsCount: 100,
    totalHours: 1000,
    totalResources: 500,
    categoriesCount: 25,
    isVisible: true,
  },
};
