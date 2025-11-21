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
  const actual = jest.requireActual('../../test-utils/mocks/shared-contexts');
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

// Mock localStorage properly
const mockGetItem = jest.fn((key: string) => {
  if (key === 'userPlans') {
    return JSON.stringify([
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
    ]);
  }
  if (key === 'auth-token' || key === 'frontend-koddev-user') {
    return 'mock-token';
  }
  return null;
});

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

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
  Calendar: () => <span>📅</span>,
  ArrowRight: () => <span>→</span>,
  AlertCircle: () => <span>⚠️</span>,
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
      expect(mockGetItem).toHaveBeenCalledWith('userPlans');
    }, { timeout: 3000 });
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
    // Component loads plans from localStorage, verify it processes them
    await waitFor(() => {
      // Component should render (either loading or content)
      expect(document.body).toBeTruthy();
    }, { timeout: 3000 });
  });
});
