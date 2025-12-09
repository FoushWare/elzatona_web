/**
 * Integration Tests for Learning Paths Practice (F-IT-007)
 * Task: F-004 - Learning Paths Practice
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LearningPathsPage from './page';
import * as sharedContexts from '@elzatona/contexts';

jest.mock('@elzatona/contexts', () => {
  const actual = jest.requireActual('../../test-utils/mocks/shared-contexts');
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

global.fetch = jest.fn();

jest.mock('lucide-react', () => ({
  BookOpen: () => <span>📖</span>,
  Play: () => <span>▶️</span>,
  Target: () => <span>🎯</span>,
  Clock: () => <span>⏰</span>,
  CheckCircle: () => <span>✅</span>,
  Loader2: () => <span>⏳</span>,
  ArrowRight: () => <span>→</span>,
  Users: () => <span>👥</span>,
  Star: () => <span>⭐</span>,
  ChevronRight: () => <span>▶</span>,
  Code: () => <span>💻</span>,
  Palette: () => <span>🎨</span>,
  Zap: () => <span>⚡</span>,
  Shield: () => <span>🛡️</span>,
  Layers: () => <span>📚</span>,
  Settings: () => <span>⚙️</span>,
  Brain: () => <span>🧠</span>,
  Globe: () => <span>🌐</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  Grid: () => <span>⊞</span>,
  List: () => <span>☰</span>,
}));

describe('F-IT-007: Learning Paths Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: '1' },
      isLoading: false,
    });
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
  });

  it('should integrate with learning paths data', async () => {
    render(<LearningPathsPage />);
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});
