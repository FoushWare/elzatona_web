/**
 * Unit Tests for Frontend Tasks Practice
 * Task: 12
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FrontendTasksPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/frontend-tasks',
}));

describe('12: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<FrontendTasksPage />);
    expect(container).toBeInTheDocument();
  });
});
