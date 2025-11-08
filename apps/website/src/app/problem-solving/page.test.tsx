/**
 * Unit Tests for Problem Solving Practice
 * Task: 13
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSolvingPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/problem-solving',
}));

describe('13: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<ProblemSolvingPage />);
    expect(container).toBeInTheDocument();
  });
});
