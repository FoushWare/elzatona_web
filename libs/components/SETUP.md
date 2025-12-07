# Shared Components - Testing & Storybook Setup

## Installation

To set up testing and Storybook for the shared-components library, you need to install the required dependencies:

```bash
npm install --save-dev @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-a11y @storybook/addon-viewport @storybook/test @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

Or if using yarn:

```bash
yarn add -D @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-a11y @storybook/addon-viewport @storybook/test @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

## Running Tests

```bash
# Run all tests
nx test shared-components

# Run tests in watch mode
nx test shared-components --watch

# Run tests with coverage
nx test shared-components --coverage
```

## Running Storybook

```bash
# Start Storybook development server
nx storybook shared-components

# Build Storybook for production
nx build-storybook shared-components
```

## Adding Tests

1. Create a test file next to your component: `ComponentName.test.tsx`
2. Import testing utilities and your component
3. Write test cases using Vitest and React Testing Library

Example:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Adding Stories

1. Create a story file next to your component: `ComponentName.stories.tsx`
2. Define the meta configuration
3. Export story variants

Example:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
```

## Test Coverage

Current test coverage includes:

- ✅ Button component
- ✅ Input component
- ✅ Select component
- ⏳ Dialog component (to be added)
- ⏳ Checkbox component (to be added)
- ⏳ And more...

## Story Coverage

Current stories include:

- ✅ Button stories
- ✅ Input stories
- ✅ Select stories
- ⏳ Dialog stories (to be added)
- ⏳ Checkbox stories (to be added)
- ⏳ And more...
