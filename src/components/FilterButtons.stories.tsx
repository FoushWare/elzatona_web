import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FilterButtons } from './FilterButtons';

const meta: Meta<typeof FilterButtons> = {
  title: 'Components/FilterButtons',
  component: FilterButtons,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Filter buttons for difficulty levels and categories. Allows users to filter learning paths by difficulty and category.',
      },
    },
  },
  argTypes: {
    selectedDifficulty: {
      control: 'select',
      options: ['all', 'beginner', 'intermediate', 'advanced'],
      description: 'Currently selected difficulty level',
    },
    selectedCategory: {
      control: 'select',
      options: [
        'all',
        'javascript',
        'react',
        'css',
        'typescript',
        'testing',
        'performance',
        'security',
        'system-design',
        'tools',
        'ai-tools',
        'interview',
        'english',
      ],
      description: 'Currently selected category',
    },
    categories: {
      control: 'object',
      description: 'Array of available categories',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the filter section is visible',
    },
    onDifficultyChange: {
      action: 'difficultyChanged',
      description: 'Callback when difficulty filter changes',
    },
    onCategoryChange: {
      action: 'categoryChanged',
      description: 'Callback when category filter changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCategories = [
  'all',
  'javascript',
  'react',
  'css',
  'typescript',
  'testing',
  'performance',
  'security',
  'system-design',
  'tools',
  'ai-tools',
  'interview',
  'english',
];

export const Default: Story = {
  args: {
    selectedDifficulty: 'all',
    selectedCategory: 'all',
    categories: defaultCategories,
    isVisible: true,
  },
};

export const BeginnerSelected: Story = {
  args: {
    selectedDifficulty: 'beginner',
    selectedCategory: 'all',
    categories: defaultCategories,
    isVisible: true,
  },
};

export const JavaScriptSelected: Story = {
  args: {
    selectedDifficulty: 'all',
    selectedCategory: 'javascript',
    categories: defaultCategories,
    isVisible: true,
  },
};

export const BothFiltersSelected: Story = {
  args: {
    selectedDifficulty: 'intermediate',
    selectedCategory: 'react',
    categories: defaultCategories,
    isVisible: true,
  },
};

export const AdvancedSelected: Story = {
  args: {
    selectedDifficulty: 'advanced',
    selectedCategory: 'system-design',
    categories: defaultCategories,
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    selectedDifficulty: 'all',
    selectedCategory: 'all',
    categories: defaultCategories,
    isVisible: false,
  },
};

export const LimitedCategories: Story = {
  args: {
    selectedDifficulty: 'beginner',
    selectedCategory: 'javascript',
    categories: ['all', 'javascript', 'react', 'css'],
    isVisible: true,
  },
};

export const ManyCategories: Story = {
  args: {
    selectedDifficulty: 'all',
    selectedCategory: 'all',
    categories: [
      'all',
      'javascript',
      'react',
      'css',
      'typescript',
      'testing',
      'performance',
      'security',
      'system-design',
      'tools',
      'ai-tools',
      'interview',
      'english',
      'vue',
      'angular',
      'nodejs',
      'mongodb',
      'postgresql',
      'docker',
      'kubernetes',
    ],
    isVisible: true,
  },
};
