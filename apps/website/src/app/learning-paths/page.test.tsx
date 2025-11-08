/**
 * Unit Tests for Learning Paths Practice
 * Task: 11
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LearningPathsPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/learning-paths',
}));

describe('11: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<LearningPathsPage />);
    expect(container).toBeInTheDocument();
  });
});
