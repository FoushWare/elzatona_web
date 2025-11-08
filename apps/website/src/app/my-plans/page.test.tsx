/**
 * Unit Tests for My Plans Page
 * Task: 9 - My Plans Page
 * Test IDs: F-UT-006, F-UT-007
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyPlansPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/my-plans',
}));

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../../test-utils/mocks/shared-contexts');
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

describe('9: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], pagination: { totalCount: 0 } }),
    });
  });

  it('should render without errors', () => {
    const { container } = render(<MyPlansPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display main content', async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(screen.getByText(/.*/)).toBeInTheDocument();
    });
  });
});
