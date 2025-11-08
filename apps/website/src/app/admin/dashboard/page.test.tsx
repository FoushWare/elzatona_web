/**
 * Unit Tests for Admin Dashboard
 * Task: 3
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboardPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/dashboard',
}));

describe('3: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminDashboardPage />);
    expect(container).toBeInTheDocument();
  });
});
