/**
 * Integration Tests for My Plans Page (F-IT-004, F-IT-005)
 * Task: F-002 - My Plans Page
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyPlansPage from './page';
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

Storage.prototype.getItem = jest.fn(() => JSON.stringify([
  {
    id: '1',
    name: 'Test Plan',
    description: 'Test',
    duration: 30,
    totalQuestions: 100,
    dailyQuestions: 5,
    created_at: new Date().toISOString(),
    isActive: true,
  },
]));

jest.mock('lucide-react', () => ({
  BookOpen: () => <span>📖</span>,
  Plus: () => <span>+</span>,
  Play: () => <span>▶️</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  CheckCircle: () => <span>✅</span>,
  Clock: () => <span>⏰</span>,
  Target: () => <span>🎯</span>,
  Loader2: () => <span>⏳</span>,
}));

describe('F-IT-004: Plan Loading Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should load plans from localStorage', async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(Storage.prototype.getItem).toHaveBeenCalledWith('userPlans');
    });
  });
});

describe('F-IT-005: Plan Actions Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should integrate plan navigation', async () => {
    render(<MyPlansPage />);
    await waitFor(() => {
      expect(screen.getByText(/Test Plan/i)).toBeInTheDocument();
    });
  });
});
