/**
 * Integration Tests for Browse Practice Questions (F-IT-006)
 * Task: F-003 - Browse Practice Questions
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrowsePracticeQuestionsPage from './page';
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

Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

jest.mock('lucide-react', () => ({
  Code: () => <span>💻</span>,
  Target: () => <span>🎯</span>,
  Brain: () => <span>🧠</span>,
  ArrowRight: () => <span>→</span>,
  BookOpen: () => <span>📖</span>,
  Zap: () => <span>⚡</span>,
  Users: () => <span>👥</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Eye: () => <span>👁️</span>,
  Play: () => <span>▶️</span>,
  Star: () => <span>⭐</span>,
  Award: () => <span>🏆</span>,
  TrendingUp: () => <span>📈</span>,
  Calendar: () => <span>📅</span>,
  Loader2: () => <span>⏳</span>,
}));

describe('F-IT-006: Practice Navigation Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
  });

  it('should integrate with practice routes', async () => {
    render(<BrowsePracticeQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Interview Questions/i)).toBeInTheDocument();
    });
  });
});
