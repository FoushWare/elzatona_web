/**
 * Integration Tests for Admin Problem Solving (A-IT-018)
 * Task: A-006 - Admin Problem Solving
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSolvingAdminPage from './page';

jest.mock('@elzatona/hooks', () => ({
  useProblemSolvingTasks: jest.fn(() => ({
    data: { data: [] },
    isLoading: false,
    error: null,
  })),
  useCreateProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
}));

jest.mock('@elzatona/components', () => ({
  ProblemSolvingEditor: () => <div>Editor</div>,
  ClientCodeRunner: () => <div>Code Runner</div>,
}));

jest.mock('lucide-react', () => ({
  Plus: () => <span>+</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  Eye: () => <span>👁️</span>,
  Search: () => <span>🔍</span>,
  Play: () => <span>▶️</span>,
  Code: () => <span>💻</span>,
}));

describe('A-IT-018: Problem Solving CRUD Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate with problem solving hooks', async () => {
    render(<ProblemSolvingAdminPage />);
    
    await waitFor(() => {
      const sharedHooks = jest.requireMock('@elzatona/hooks');
      const { useProblemSolvingTasks } = sharedHooks;
      expect(useProblemSolvingTasks).toHaveBeenCalled();
    });
  });
});
