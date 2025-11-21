/**
 * Unit Tests for Browse Practice Questions (F-UT-008)
 * Task: F-003 - Browse Practice Questions
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrowsePracticeQuestionsPage from './page';
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

describe('F-UT-008: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', email: 'user@example.com' },
      isLoading: false,
    });
  });

  it('should render without errors', async () => {
    const { container } = render(<BrowsePracticeQuestionsPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display practice options', async () => {
    render(<BrowsePracticeQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Interview Questions/i)).toBeInTheDocument();
    });
  });
});

describe('F-UT-SNAPSHOT: Browse Practice Questions Snapshot Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', email: 'user@example.com' },
      isLoading: false,
    });
  });

  it('should match browse practice questions page snapshot', async () => {
    const { container } = render(<BrowsePracticeQuestionsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should match browse practice questions page snapshot (unauthenticated)', () => {
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    
    const { container } = render(<BrowsePracticeQuestionsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
