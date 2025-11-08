/**
 * Unit Tests for My Plans Page
 * Task: 9
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyPlansPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/my-plans',
}));

describe('9: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<MyPlansPage />);
    expect(container).toBeInTheDocument();
  });
});
