/**
 * Unit Tests for Admin Login
 * Task: 2
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLoginPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/login',
}));

describe('2: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminLoginPage />);
    expect(container).toBeInTheDocument();
  });
});
