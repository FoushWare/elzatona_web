/**
 * Unit Tests for Admin Content Management
 * Task: 4
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminContentPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/content',
}));

describe('4: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminContentPage />);
    expect(container).toBeInTheDocument();
  });
});
