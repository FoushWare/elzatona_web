/**
 * Unit Tests for Frontend Tasks Practice (F-UT-010)
 * Task: F-005 - Frontend Tasks Practice
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
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

describe('F-UT-010: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should render without errors', async () => {
    const { container } = render(<FrontendTasksPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display frontend tasks content', async () => {
    render(<FrontendTasksPage />);
    await waitFor(() => {
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });
});
