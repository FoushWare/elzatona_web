/**
 * Admin UI Component Tests
 *
 * Comprehensive tests for admin page components:
 * - Content Management Page
 * - Questions Page
 * - Frontend Tasks Page
 * - Problem Solving Page
 * - Dashboard Page
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock TanStack Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/admin/content-management',
}));

// Set up environment variables before any imports
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock Supabase before any imports
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    })),
  })),
}));

// Mock nuqs before any imports
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
  useQueryStates: jest.fn(() => [{}, jest.fn()]),
  parseAsString: jest.fn(),
  parseAsInteger: jest.fn(),
  createSearchParamsCache: jest.fn(),
}));

// Mock admin auth context - use correct import path
jest.mock('@elzatona/shared-contexts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useAdminAuth: jest.fn(() => ({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      login: jest.fn(),
      logout: jest.fn(),
    })),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: jest.fn(() => ({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    })),
  };
});

describe('Admin UI Component Tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockUseQuery = require('@tanstack/react-query').useQuery;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockUseMutation = require('@tanstack/react-query').useMutation;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for useQuery
    mockUseQuery.mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    // Default mock for useMutation
    mockUseMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  });

  describe('Content Management Page', () => {
    it('should render content management page with loading state', async () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      expect(
        screen.getByText('Loading unified admin data...')
      ).toBeInTheDocument();
    });

    it('should render content management page with data', async () => {
      const mockCards = [
        {
          id: 'core-technologies',
          name: 'Core Technologies',
          type: 'core-technologies',
          color: 'blue',
        },
      ];

      const mockPlans = [
        {
          id: 'plan-1-day',
          name: '1 Day Plan',
          duration: 1,
        },
      ];

      const mockCategories = [
        {
          id: 'react',
          name: 'React',
          cardType: 'framework-questions',
        },
      ];

      const mockTopics = [
        {
          id: 'react-hooks',
          name: 'React Hooks',
          categoryId: 'react',
          difficulty: 'intermediate',
        },
      ];

      mockUseQuery
        .mockReturnValueOnce({
          data: { data: mockCards },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockPlans },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockCategories },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockTopics },
          isLoading: false,
          error: null,
        });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      await waitFor(() => {
        expect(screen.getByText('Core Technologies')).toBeInTheDocument();
        expect(screen.getByText('1 Day Plan')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
      });
    });

    it('should handle search functionality', async () => {
      const mockCards = [
        { id: 'card-1', name: 'React Basics', type: 'framework-questions' },
        {
          id: 'card-2',
          name: 'JavaScript Fundamentals',
          type: 'core-technologies',
        },
      ];

      mockUseQuery.mockReturnValue({
        data: { data: mockCards },
        isLoading: false,
        error: null,
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      const searchInput = screen.getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'React');

      await waitFor(() => {
        expect(screen.getByText('React Basics')).toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Fundamentals')
        ).not.toBeInTheDocument();
      });
    });

    it('should handle filter by card type', async () => {
      const mockCards = [
        { id: 'card-1', name: 'React Basics', type: 'framework-questions' },
        {
          id: 'card-2',
          name: 'JavaScript Fundamentals',
          type: 'core-technologies',
        },
      ];

      mockUseQuery.mockReturnValue({
        data: { data: mockCards },
        isLoading: false,
        error: null,
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      const filterSelect = screen.getByRole('combobox');
      await userEvent.selectOptions(filterSelect, 'framework-questions');

      await waitFor(() => {
        expect(screen.getByText('React Basics')).toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Fundamentals')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Questions Page', () => {
    it('should render questions page with data', async () => {
      const mockQuestions = [
        {
          id: 'question-1',
          question: 'What is React?',
          type: 'multiple-choice',
          difficulty: 'beginner',
          category: 'react',
          options: ['Library', 'Framework', 'Language'],
          correctAnswer: 0,
        },
      ];

      mockUseQuery
        .mockReturnValueOnce({
          data: { data: mockQuestions },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: [] },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: [] },
          isLoading: false,
          error: null,
        });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      await waitFor(() => {
        expect(screen.getByText('What is React?')).toBeInTheDocument();
        expect(screen.getByText('beginner')).toBeInTheDocument();
        expect(screen.getByText('react')).toBeInTheDocument();
      });
    });

    it('should handle question creation', async () => {
      const mockQuestions = [];
      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockQuestions },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: false,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      const addButton = screen.getByText(/add question/i);
      await userEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText(/create new question/i)).toBeInTheDocument();
      });

      const questionInput = screen.getByLabelText(/question/i);
      await userEvent.type(questionInput, 'What is JavaScript?');

      const submitButton = screen.getByText(/create question/i);
      await userEvent.click(submitButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          question: 'What is JavaScript?',
        })
      );
    });

    it('should handle question editing', async () => {
      const mockQuestions = [
        {
          id: 'question-1',
          question: 'What is React?',
          type: 'multiple-choice',
          difficulty: 'beginner',
          category: 'react',
        },
      ];

      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockQuestions },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: false,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      const editButton = screen.getByLabelText(/edit question/i);
      await userEvent.click(editButton);

      await waitFor(() => {
        expect(screen.getByDisplayValue('What is React?')).toBeInTheDocument();
      });

      const questionInput = screen.getByDisplayValue('What is React?');
      await userEvent.clear(questionInput);
      await userEvent.type(questionInput, 'What is React library?');

      const saveButton = screen.getByText(/save changes/i);
      await userEvent.click(saveButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          question: 'What is React library?',
        })
      );
    });

    it('should handle question deletion', async () => {
      const mockQuestions = [
        {
          id: 'question-1',
          question: 'What is React?',
          type: 'multiple-choice',
          difficulty: 'beginner',
          category: 'react',
        },
      ];

      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockQuestions },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: false,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      const deleteButton = screen.getByLabelText(/delete question/i);
      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
      });

      const confirmButton = screen.getByText(/delete/i);
      await userEvent.click(confirmButton);

      expect(mockMutation).toHaveBeenCalledWith('question-1');
    });
  });

  describe('Frontend Tasks Page', () => {
    it('should render frontend tasks page with data', async () => {
      const mockTasks = [
        {
          id: 'task-1',
          title: 'Build a Todo App',
          difficulty: 'easy',
          category: 'react',
          estimatedTime: 120,
        },
      ];

      mockUseQuery.mockReturnValue({
        data: { data: mockTasks },
        isLoading: false,
        error: null,
      });

      const FrontendTasksPage = (
        await import('@/app/admin/frontend-tasks/page')
      ).default;
      render(<FrontendTasksPage />);

      await waitFor(() => {
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('easy')).toBeInTheDocument();
        expect(screen.getByText('120 min')).toBeInTheDocument();
      });
    });

    it('should handle task creation', async () => {
      const mockTasks = [];
      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockTasks },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: false,
      });

      const FrontendTasksPage = (
        await import('@/app/admin/frontend-tasks/page')
      ).default;
      render(<FrontendTasksPage />);

      const addButton = screen.getByText(/add task/i);
      await userEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText(/create new task/i)).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'Build a Calculator');

      const submitButton = screen.getByText(/create task/i);
      await userEvent.click(submitButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Build a Calculator',
        })
      );
    });
  });

  describe('Problem Solving Page', () => {
    it('should render problem solving page with data', async () => {
      const mockProblems = [
        {
          id: 'problem-1',
          title: 'Two Sum',
          difficulty: 'easy',
          category: 'arrays',
        },
      ];

      mockUseQuery.mockReturnValue({
        data: { data: mockProblems },
        isLoading: false,
        error: null,
      });

      const ProblemSolvingPage = (
        await import('@/app/admin/problem-solving/page')
      ).default;
      render(<ProblemSolvingPage />);

      await waitFor(() => {
        expect(screen.getByText('Two Sum')).toBeInTheDocument();
        expect(screen.getByText('easy')).toBeInTheDocument();
        expect(screen.getByText('arrays')).toBeInTheDocument();
      });
    });

    it('should handle problem creation', async () => {
      const mockProblems = [];
      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockProblems },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: false,
      });

      const ProblemSolvingPage = (
        await import('@/app/admin/problem-solving/page')
      ).default;
      render(<ProblemSolvingPage />);

      const addButton = screen.getByText(/add problem/i);
      await userEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText(/create new problem/i)).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/title/i);
      await userEvent.type(titleInput, 'Reverse String');

      const submitButton = screen.getByText(/create problem/i);
      await userEvent.click(submitButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Reverse String',
        })
      );
    });
  });

  describe('Dashboard Page', () => {
    it('should render dashboard with stats', async () => {
      const mockStats = {
        totalQuestions: 100,
        totalCards: 4,
        totalPlans: 7,
        totalTasks: 18,
      };

      mockUseQuery.mockReturnValue({
        data: { data: mockStats },
        isLoading: false,
        error: null,
      });

      const DashboardPage = (await import('@/app/admin/dashboard/page'))
        .default;
      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('18')).toBeInTheDocument();
      });
    });

    it('should handle refresh functionality', async () => {
      const mockRefetch = jest.fn();
      const mockStats = {
        totalQuestions: 100,
        totalCards: 4,
        totalPlans: 7,
        totalTasks: 18,
      };

      mockUseQuery.mockReturnValue({
        data: { data: mockStats },
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      });

      const DashboardPage = (await import('@/app/admin/dashboard/page'))
        .default;
      render(<DashboardPage />);

      const refreshButton = screen.getByText(/refresh/i);
      await userEvent.click(refreshButton);

      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should display error messages when API calls fail', async () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('API Error'),
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    it('should handle mutation errors', async () => {
      const mockQuestions = [];
      const mockMutation = jest.fn();

      mockUseQuery.mockReturnValue({
        data: { data: mockQuestions },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: new Error('Mutation failed'),
        isSuccess: false,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      await waitFor(() => {
        expect(screen.getByText(/mutation failed/i)).toBeInTheDocument();
      });
    });
  });
});
