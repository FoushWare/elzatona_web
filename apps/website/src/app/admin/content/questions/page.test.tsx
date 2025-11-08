/**
 * Unit Tests for Admin Bulk Question Addition
 * Task: 1
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminBulkQuestionPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/content/questions',
}));

describe('1: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<AdminBulkQuestionPage />);
    expect(container).toBeInTheDocument();
  });
});
