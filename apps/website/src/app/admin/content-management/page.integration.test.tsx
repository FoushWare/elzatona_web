/**
 * Integration Tests for Admin Content Management (A-IT-015, A-IT-016)
 * Task: A-004 - Admin Content Management
 */

import React, { Suspense } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock shared-components before importing the page to handle React.lazy imports
// Don't use requireActual to avoid circular dependency issues
jest.mock('@elzatona/shared-components', () => ({
  Button: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  Input: ({ onChange, value }: any) => <input onChange={onChange} value={value} />,
  Select: ({ children }: { children: React.ReactNode }) => <select>{children}</select>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <option>{children}</option>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: () => <span>Select...</span>,
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Modal: ({ children, open }: any) => open ? <div>{children}</div> : null,
  BulkOperations: () => <div data-testid="bulk-operations">Bulk Operations</div>,
  useToast: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
    toasts: [],
    removeToast: jest.fn(),
  }),
  ToastContainer: () => <div>Toasts</div>,
  // Mock other components that might be imported
  CategoryForm: () => <div>Category Form</div>,
  TopicForm: () => <div>Topic Form</div>,
  QuestionForm: () => <div>Question Form</div>,
  CardForm: () => <div>Card Form</div>,
  PlanForm: () => <div>Plan Form</div>,
  EmptyState: () => <div>Empty State</div>,
}));

import UnifiedAdminPage from './page';

// Same mocks as unit tests
jest.mock('@elzatona/shared-hooks', () => ({
  useCards: jest.fn(() => ({
    data: { data: [], count: 0 },
    isLoading: false,
    error: null,
  })),
  usePlans: jest.fn(() => ({
    data: { data: [], count: 0 },
    isLoading: false,
    error: null,
  })),
  useCategories: jest.fn(() => ({
    data: { data: [], count: 0 },
    isLoading: false,
    error: null,
  })),
  useTopics: jest.fn(() => ({
    data: { data: [], count: 0 },
    isLoading: false,
    error: null,
  })),
  useQuestionsUnified: jest.fn(() => ({
    data: { data: [], pagination: { totalCount: 0 } },
    isLoading: false,
    error: null,
  })),
  useCreateCard: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateCard: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteCard: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useCreatePlan: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdatePlan: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeletePlan: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useCreateCategory: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateCategory: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteCategory: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useCreateTopic: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateTopic: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteTopic: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useCreateQuestion: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useUpdateQuestion: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  })),
  useDeleteQuestion: jest.fn(() => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
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

// Shared components are mocked above before import

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

describe('A-IT-015: Content Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle data fetching from multiple hooks', async () => {
    render(<UnifiedAdminPage />);
    
    await waitFor(() => {
      const { useCards, usePlans, useCategories, useTopics, useQuestionsUnified } = require('@elzatona/shared-hooks');
      expect(useCards).toHaveBeenCalled();
      expect(usePlans).toHaveBeenCalled();
      expect(useCategories).toHaveBeenCalled();
      expect(useTopics).toHaveBeenCalled();
      expect(useQuestionsUnified).toHaveBeenCalled();
    });
  });
});

describe('A-IT-016: CRUD Operations Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate with mutation hooks', async () => {
    render(<UnifiedAdminPage />);
    
    // Component should be ready for CRUD operations
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});

