/**
 * Integration Tests for Problem Solving Practice (F-IT-009)
 * Task: F-006 - Problem Solving Practice
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSolvingPage from './page';
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
  useProblemSolvingTasks: jest.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
}));

jest.mock('lucide-react', () => ({
  Calculator: () => <span>🔢</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
}));

describe('F-IT-009: Problem Solving Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should integrate with problem solving hooks', async () => {
    render(<ProblemSolvingPage />);
    await waitFor(() => {
      const { useProblemSolvingTasks } = require('@elzatona/shared-hooks');
      expect(useProblemSolvingTasks).toHaveBeenCalled();
    });
  });
});
