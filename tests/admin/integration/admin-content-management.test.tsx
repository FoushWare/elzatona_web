import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, usePathname } from 'next/navigation';
import AdminLayout from '@/app/admin/layout';
import AdminQuestionsPage from '@/app/admin/content/questions/page';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useUnifiedQuestions } from '@/hooks/useUnifiedQuestions';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React from 'react';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock useAdminAuth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock useUnifiedQuestions hook
jest.mock('@/hooks/useUnifiedQuestions', () => ({
  useUnifiedQuestions: jest.fn(),
}));

// Mock AdminNavbar
jest.mock('@/components/AdminNavbar', () => {
  return function MockAdminNavbar() {
    return <div data-testid="admin-navbar">Mock Admin Navbar</div>;
  };
});

// Mock TopicManager
jest.mock('@/components/TopicManager', () => {
  return function MockTopicManager() {
    return <div data-testid="topic-manager">Mock Topic Manager</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;
const mockUseUnifiedQuestions = useUnifiedQuestions as jest.MockedFunction<
  typeof useUnifiedQuestions
>;
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const mockQuestions = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    content: 'What is JavaScript?',
    difficulty: 'beginner',
    category: 'JavaScript',
    topics: ['JavaScript Core'],
    learningPaths: ['frontend-basics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'React Hooks',
    content: 'Explain React hooks',
    difficulty: 'intermediate',
    category: 'React',
    topics: ['React & Libraries'],
    learningPaths: ['react-fundamentals'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const renderWithProviders = (
  ui: React.ReactNode,
  pathname: string = '/admin/content/questions'
) => {
  mockUseRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  });
  mockUsePathname.mockReturnValue(pathname);

  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Admin Content Management Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    mockUseUnifiedQuestions.mockReturnValue({
      questions: mockQuestions,
      isLoading: false,
      error: null,
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  });

  test('renders questions management page with all components', async () => {
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Questions Management')).toBeInTheDocument();
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
      expect(screen.getByTestId('topic-manager')).toBeInTheDocument();
    });
  });

  test('displays questions list with correct information', async () => {
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('React Hooks')).toBeInTheDocument();
      expect(screen.getByText('beginner')).toBeInTheDocument();
      expect(screen.getByText('intermediate')).toBeInTheDocument();
    });
  });

  test('shows question statistics', async () => {
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Questions: 2')).toBeInTheDocument();
      expect(screen.getByText('Active Questions: 2')).toBeInTheDocument();
    });
  });

  test('handles question search functionality', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Search for a specific question
    const searchInput = screen.getByPlaceholderText(/search questions/i);
    await user.type(searchInput, 'JavaScript');

    // Should filter results
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  test('handles difficulty filter', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Filter by difficulty
    const difficultyFilter = screen.getByDisplayValue('All Difficulties');
    await user.selectOptions(difficultyFilter, 'beginner');

    // Should only show beginner questions
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  test('handles category filter', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Filter by category
    const categoryFilter = screen.getByDisplayValue('All Categories');
    await user.selectOptions(categoryFilter, 'JavaScript');

    // Should only show JavaScript questions
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  test('displays topic tags for questions', async () => {
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Core')).toBeInTheDocument();
      expect(screen.getByText('React & Libraries')).toBeInTheDocument();
    });
  });

  test('handles question editing', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Click edit button for first question
    const editButtons = screen.getAllByText('Edit');
    await user.click(editButtons[0]);

    // Should open edit modal or navigate to edit page
    // This depends on the implementation
  });

  test('handles question deletion', async () => {
    const user = userEvent.setup();
    const mockDeleteQuestion = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      questions: mockQuestions,
      isLoading: false,
      error: null,
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: mockDeleteQuestion,
    });

    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Click delete button for first question
    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    // Should show confirmation dialog
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByText('Delete');
    await user.click(confirmButton);

    expect(mockDeleteQuestion).toHaveBeenCalledWith('1');
  });

  test('handles bulk operations', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Select multiple questions
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // Select first question
    await user.click(checkboxes[2]); // Select second question

    // Should show bulk actions
    expect(screen.getByText('Bulk Actions')).toBeInTheDocument();
  });

  test('handles loading state', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      questions: [],
      isLoading: true,
      error: null,
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    });

    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
  });

  test('handles error state', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      questions: [],
      isLoading: false,
      error: 'Failed to load questions',
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    });

    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    expect(screen.getByText('Failed to load questions')).toBeInTheDocument();
  });

  test('handles empty questions list', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      questions: [],
      isLoading: false,
      error: null,
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    });

    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    expect(screen.getByText('No questions found')).toBeInTheDocument();
  });

  test('integrates with topic management', async () => {
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByTestId('topic-manager')).toBeInTheDocument();
    });

    // Topic manager should be rendered within the questions page
    expect(screen.getByText('Questions Management')).toBeInTheDocument();
  });

  test('handles pagination', async () => {
    // Mock large dataset
    const largeQuestionSet = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Question ${i + 1}`,
      content: `Content for question ${i + 1}`,
      difficulty: 'beginner',
      category: 'JavaScript',
      topics: ['JavaScript Core'],
      learningPaths: ['frontend-basics'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    }));

    mockUseUnifiedQuestions.mockReturnValue({
      questions: largeQuestionSet,
      isLoading: false,
      error: null,
      fetchQuestions: jest.fn(),
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
    });

    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      // Should show pagination controls
      expect(screen.getByText(/page 1 of/i)).toBeInTheDocument();
    });
  });

  test('maintains authentication state', async () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: mockReplace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    // Start authenticated
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(screen.getByText('Questions Management')).toBeInTheDocument();
    });

    // Simulate authentication loss
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    // Re-render with new auth state
    renderWithProviders(
      <AdminLayout>
        <AdminQuestionsPage />
      </AdminLayout>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/admin/login');
    });
  });
});






