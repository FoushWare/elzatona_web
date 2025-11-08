/**
 * Unit Tests for Admin Frontend Tasks
 * Task: 5
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminFrontendTasksPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/frontend-tasks',
}));

describe('5: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminFrontendTasksPage />);
    expect(container).toBeInTheDocument();
  });
});
