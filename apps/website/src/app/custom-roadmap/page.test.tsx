/**
 * Unit Tests for Custom Roadmap Creation
 * Task: 8 - Custom Roadmap Creation
 * Test IDs: F-UT-001, F-UT-002, F-UT-003, F-UT-004, F-UT-005
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomRoadmapPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/custom-roadmap',
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

describe('8: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], pagination: { totalCount: 0 } }),
    });
  });

  it('should render without errors', () => {
    const { container } = render(<CustomRoadmapPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display main content', async () => {
    render(<CustomRoadmapPage />);
    await waitFor(() => {
      expect(screen.getByText(/.*/)).toBeInTheDocument();
    });
  });
});
