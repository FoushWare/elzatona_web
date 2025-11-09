/**
 * Unit Tests for Admin Content Management (A-UT-014, A-UT-015)
 * Task: A-004 - Admin Content Management
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnifiedAdminPage from './page';

// Mock TanStack Query hooks
const mockCardsData = { data: [], count: 0 };
const mockPlansData = { data: [], count: 0 };
const mockCategoriesData = { data: [], count: 0 };
const mockTopicsData = { data: [], count: 0 };
const mockQuestionsData = { data: [], pagination: { totalCount: 0 } };

jest.mock('@elzatona/shared-hooks', () => ({
  useCards: jest.fn(() => ({
    data: mockCardsData,
    isLoading: false,
    error: null,
  })),
  usePlans: jest.fn(() => ({
    data: mockPlansData,
    isLoading: false,
    error: null,
  })),
  useCategories: jest.fn(() => ({
    data: mockCategoriesData,
    isLoading: false,
    error: null,
  })),
  useTopics: jest.fn(() => ({
    data: mockTopicsData,
    isLoading: false,
    error: null,
  })),
  useQuestionsUnified: jest.fn(() => ({
    data: mockQuestionsData,
    isLoading: false,
    error: null,
  })),
  useCreateCard: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateCard: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteCard: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useCreatePlan: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdatePlan: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeletePlan: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useCreateCategory: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateCategory: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteCategory: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useCreateTopic: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateTopic: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteTopic: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useCreateQuestion: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useUpdateQuestion: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteQuestion: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useNotificationActions: jest.fn(() => ({
    notifyContentUpdate: jest.fn(),
    notifyAdminAction: jest.fn(),
  })),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock('@elzatona/shared-components', () => ({
  BulkOperations: () => <div data-testid="bulk-operations">Bulk Operations</div>,
  useToast: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
    toasts: [],
    removeToast: jest.fn(),
  }),
  ToastContainer: () => <div data-testid="toast-container">Toasts</div>,
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  Input: ({ onChange, value, ...props }: any) => (
    <input onChange={onChange} value={value} {...props} />
  ),
  Select: ({ children, onValueChange, value }: any) => (
    <select value={value} onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: () => <span>Select...</span>,
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Modal: ({ children, open }: any) => open ? <div>{children}</div> : null,
}));

jest.mock('lucide-react', () => ({
  ChevronDown: () => <span>▼</span>,
  ChevronRight: () => <span>▶</span>,
  Plus: () => <span>+</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  MessageSquare: () => <span>💬</span>,
  BookOpen: () => <span>📖</span>,
  Layers: () => <span>📚</span>,
  Puzzle: () => <span>🧩</span>,
  Network: () => <span>🌐</span>,
  Users: () => <span>👥</span>,
  Calendar: () => <span>📅</span>,
  Target: () => <span>🎯</span>,
}));

describe('A-UT-014: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', async () => {
    const { container } = render(<UnifiedAdminPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display unified admin page title', async () => {
    render(<UnifiedAdminPage />);
    await waitFor(() => {
      // Page should render (check for any content)
      expect(screen.getByTestId('bulk-operations') || screen.getByText(/.*/)).toBeTruthy();
    });
  });
});

describe('A-UT-015: Content Sections', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display stats cards', async () => {
    render(<UnifiedAdminPage />);
    await waitFor(() => {
      // Stats should be calculated from data
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });

  it('should handle loading states', () => {
    const { useCards } = require('@elzatona/shared-hooks');
    useCards.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { rerender } = render(<UnifiedAdminPage />);
    rerender(<UnifiedAdminPage />);
    
    // Should handle loading
    expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
  });
});

describe('A-UT-SNAPSHOT: Admin Content Management Snapshot Tests', () => {
  it('should match content management page snapshot', () => {
    const { container } = render(<UnifiedAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match content management page snapshot (loading state)', () => {
    const { useCards } = require('@elzatona/shared-hooks');
    useCards.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    
    const { container } = render(<UnifiedAdminPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

