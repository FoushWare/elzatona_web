import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatisticsCard } from './StatisticsCard';

const meta: Meta<typeof StatisticsCard> = {
  title: 'Components/StatisticsCard',
  component: StatisticsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A statistics card component displaying a value and label with customizable colors.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'The numeric value to display',
    },
    label: {
      control: 'text',
      description: 'The label text for the statistic',
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'purple', 'orange'],
      description: 'The color theme for the value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 20,
    label: 'Learning Paths',
    color: 'blue',
  },
};

export const Green: Story = {
  args: {
    value: 286,
    label: 'Total Hours',
    color: 'green',
  },
};

export const Purple: Story = {
  args: {
    value: 66,
    label: 'Total Resources',
    color: 'purple',
  },
};

export const Orange: Story = {
  args: {
    value: 12,
    label: 'Categories',
    color: 'orange',
  },
};

export const LargeNumber: Story = {
  args: {
    value: 1000,
    label: 'Total Students',
    color: 'blue',
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
    label: 'Completed Paths',
    color: 'green',
  },
};

export const LongLabel: Story = {
  args: {
    value: 42,
    label: 'Advanced Learning Paths Available',
    color: 'purple',
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatisticsCard value={20} label="Learning Paths" color="blue" />
      <StatisticsCard value={286} label="Total Hours" color="green" />
      <StatisticsCard value={66} label="Total Resources" color="purple" />
      <StatisticsCard value={12} label="Categories" color="orange" />
    </div>
  ),
};
