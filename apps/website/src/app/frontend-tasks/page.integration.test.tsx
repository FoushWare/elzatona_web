/**
 * Integration Tests for Frontend Tasks Practice (F-IT-008)
 * Task: F-005 - Frontend Tasks Practice
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FrontendTasksPage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useAuth: jest.fn(),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@elzatona/shared-hooks', () => ({
  useFrontendTasks: jest.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
}));

jest.mock('lucide-react', () => ({
  Code: () => <span>💻</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
}));

describe('F-IT-008: Frontend Tasks Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should integrate with frontend tasks hooks', async () => {
    render(<FrontendTasksPage />);
    await waitFor(() => {
      const { useFrontendTasks } = require('@elzatona/shared-hooks');
      expect(useFrontendTasks).toHaveBeenCalled();
    });
  });
});
