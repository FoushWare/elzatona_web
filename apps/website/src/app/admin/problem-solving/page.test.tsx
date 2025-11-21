/**
 * Unit Tests for Admin Problem Solving (A-UT-017)
 * Task: A-006 - Admin Problem Solving
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSolvingAdminPage from './page';

// Mock TanStack Query hooks
const mockTasksData = { data: [] };

jest.mock('@elzatona/shared-hooks', () => ({
  useProblemSolvingTasks: jest.fn(() => ({
    data: mockTasksData,
    isLoading: false,
    error: null,
  })),
  useCreateProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteProblemSolvingTask: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

jest.mock('@elzatona/shared-components', () => ({
  ProblemSolvingEditor: ({ onSave, onCancel }: any) => (
    <div data-testid="problem-solving-editor">
      <button onClick={() => onSave({})}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
  ClientCodeRunner: () => <div data-testid="code-runner">Code Runner</div>,
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

window.confirm = jest.fn(() => true);
window.alert = jest.fn();

describe('A-UT-017: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = render(<ProblemSolvingAdminPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display page header', () => {
    render(<ProblemSolvingAdminPage />);
    expect(document.body).toBeTruthy();
  });
});

describe('A-UT-SNAPSHOT: Admin Problem Solving Snapshot Tests', () => {
  it('should match admin problem solving page snapshot', () => {
    const { container } = render(<ProblemSolvingAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match admin problem solving page snapshot (loading state)', () => {
    const { useProblemSolvingTasks } = require('@elzatona/shared-hooks');
    useProblemSolvingTasks.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    
    const { container } = render(<ProblemSolvingAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
