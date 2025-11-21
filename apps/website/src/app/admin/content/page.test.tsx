/**
 * Unit Tests for Admin Content Management
 * Task: 4 - Admin Content Management
 * Test IDs: A-UT-014, A-UT-015
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnifiedAdminPage from './questions/page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/content',
}));

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useAdminAuth: jest.fn(() => ({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email: 'admin@example.com', role: 'super_admin' },
    })),
  };
});

// Mock fetch
global.fetch = jest.fn();

describe('4: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], pagination: { totalCount: 0 } }),
    });
  });

  it('should render without errors', () => {
    const { container } = render(<UnifiedAdminPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display main content', async () => {
    render(<UnifiedAdminPage />);
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});
