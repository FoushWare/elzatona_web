/**
 * Unit Tests for Admin Problem Solving
 * Task: 6
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminProblemSolvingPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/problem-solving',
}));

describe('6: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminProblemSolvingPage />);
    expect(container).toBeInTheDocument();
  });
});
