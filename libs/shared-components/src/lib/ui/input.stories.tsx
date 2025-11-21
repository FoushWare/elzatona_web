import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Enter text" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="name@example.com" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="Enter number" />
      </div>
      <div className="space-y-2">
        <Label>Search</Label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input disabled placeholder="Disabled input" />
      <Input disabled value="Disabled with value" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="required">Required Field *</Label>
      <Input id="required" required placeholder="This field is required" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="error">Email</Label>
      <Input
        id="error"
        type="email"
        className="border-red-500 focus-visible:ring-red-500"
        placeholder="Invalid email"
      />
      <p className="text-sm text-red-500">Please enter a valid email address</p>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input placeholder="Default size" />
      <Input className="h-8 text-sm" placeholder="Small size" />
      <Input className="h-12 text-lg" placeholder="Large size" />
    </div>
  ),
};






