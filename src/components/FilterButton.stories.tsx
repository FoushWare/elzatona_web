import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FilterButton } from './FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Components/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A filter button component for difficulty levels and categories with different visual states.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The button label text',
    },
    value: {
      control: 'text',
      description: 'The button value',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the button is selected',
    },
    variant: {
      control: 'select',
      options: ['difficulty', 'category'],
      description: 'The button variant (affects colors)',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DifficultyUnselected: Story = {
  args: {
    label: 'Beginner',
    value: 'beginner',
    isSelected: false,
    variant: 'difficulty',
  },
};

export const DifficultySelected: Story = {
  args: {
    label: 'Beginner',
    value: 'beginner',
    isSelected: true,
    variant: 'difficulty',
  },
};

export const CategoryUnselected: Story = {
  args: {
    label: 'React',
    value: 'react',
    isSelected: false,
    variant: 'category',
  },
};

export const CategorySelected: Story = {
  args: {
    label: 'React',
    value: 'react',
    isSelected: true,
    variant: 'category',
  },
};

export const AllLevels: Story = {
  args: {
    label: 'All Levels',
    value: 'all',
    isSelected: true,
    variant: 'difficulty',
  },
};

export const AllCategories: Story = {
  args: {
    label: 'All Categories',
    value: 'all',
    isSelected: true,
    variant: 'category',
  },
};

export const DifficultyGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <FilterButton
        label="All Levels"
        value="all"
        isSelected={true}
        variant="difficulty"
        onClick={() => {}}
      />
      <FilterButton
        label="Beginner"
        value="beginner"
        isSelected={false}
        variant="difficulty"
        onClick={() => {}}
      />
      <FilterButton
        label="Intermediate"
        value="intermediate"
        isSelected={false}
        variant="difficulty"
        onClick={() => {}}
      />
      <FilterButton
        label="Advanced"
        value="advanced"
        isSelected={false}
        variant="difficulty"
        onClick={() => {}}
      />
    </div>
  ),
};

export const CategoryGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <FilterButton
        label="All Categories"
        value="all"
        isSelected={true}
        variant="category"
        onClick={() => {}}
      />
      <FilterButton
        label="JavaScript"
        value="javascript"
        isSelected={false}
        variant="category"
        onClick={() => {}}
      />
      <FilterButton
        label="React"
        value="react"
        isSelected={false}
        variant="category"
        onClick={() => {}}
      />
      <FilterButton
        label="CSS"
        value="css"
        isSelected={false}
        variant="category"
        onClick={() => {}}
      />
      <FilterButton
        label="TypeScript"
        value="typescript"
        isSelected={false}
        variant="category"
        onClick={() => {}}
      />
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    label: 'System Design',
    value: 'system-design',
    isSelected: false,
    variant: 'category',
  },
};
