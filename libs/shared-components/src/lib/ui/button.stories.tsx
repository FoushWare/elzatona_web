import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Plus, Trash2, Download } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button>
        <Plus className="mr-2" />
        Add Item
      </Button>
      <Button variant="destructive">
        <Trash2 className="mr-2" />
        Delete
      </Button>
      <Button variant="outline">
        <Download className="mr-2" />
        Download
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>Disabled Default</Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>
        <span className="mr-2">Loading...</span>
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <div className="flex flex-col gap-4 items-center">
        <p>Clicked {count} times</p>
        <Button onClick={() => setCount(count + 1)}>Click me</Button>
      </div>
    );
  },
};

