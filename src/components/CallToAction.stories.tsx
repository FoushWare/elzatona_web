import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CallToAction } from './CallToAction';

const meta: Meta<typeof CallToAction> = {
  title: 'Components/CallToAction',
  component: CallToAction,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A call-to-action section with gradient background encouraging users to start learning. Includes links to study plans and preparation guides.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomStyling: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The call-to-action component with gradient background and interactive buttons.',
      },
    },
  },
};
