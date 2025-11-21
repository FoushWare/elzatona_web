# Shared Components Library

This library contains reusable UI components used across the Elzatona platform.

## Testing

Run tests using Vitest:

```bash
# Run all tests
nx test shared-components

# Run tests in watch mode
nx test shared-components --watch

# Run tests with coverage
nx test shared-components --coverage
```

## Storybook

Start Storybook to view and interact with components:

```bash
# Start Storybook
nx storybook shared-components

# Build Storybook
nx build-storybook shared-components
```

## Components

### UI Components
- Button
- Input
- Select
- Dialog
- Checkbox
- Label
- Textarea
- Card
- Badge
- And more...

## Writing Tests

Tests should be placed next to the component file with the `.test.tsx` extension.

Example:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Writing Stories

Stories should be placed next to the component file with the `.stories.tsx` extension.

Example:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```






