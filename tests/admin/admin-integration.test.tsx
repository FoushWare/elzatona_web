/**
 * Admin Integration Tests
 *
 * End-to-end integration tests for complete admin workflows:
 * - Complete CRUD workflows for all content types
 * - Cross-component interactions
 * - Data consistency across admin pages
 * - User journey testing
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

// Set up environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock nuqs
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
  useQueryStates: jest.fn(() => [{}, jest.fn()]),
  parseAsString: jest.fn(),
  parseAsInteger: jest.fn(),
  createSearchParamsCache: jest.fn(),
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    })),
  })),
}));

// Mock admin auth context - use correct import path
jest.mock('@elzatona/shared-contexts', () => {
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

describe('Admin Integration Tests', () => {
  const mockUseQuery = require('@tanstack/react-query').useQuery;
  const mockUseMutation = require('@tanstack/react-query').useMutation;
  const mockQueryClient = require('@tanstack/react-query').useQueryClient();

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

  describe('Complete Card Management Workflow', () => {
    it('should create, read, update, and delete a learning card', async () => {
      const mockCards = [];
      const mockMutation = jest.fn();
      const mockInvalidateQueries = jest.fn();

      mockQueryClient.invalidateQueries = mockInvalidateQueries;

      mockUseQuery.mockReturnValue({
        data: { data: mockCards },
        isLoading: false,
        error: null,
      });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      // Step 1: Create a new card
      const addCardButton = screen.getByText(/add card/i);
      await userEvent.click(addCardButton);

      await waitFor(() => {
        expect(screen.getByText(/create new card/i)).toBeInTheDocument();
      });

      const cardNameInput = screen.getByLabelText(/card name/i);
      await userEvent.type(cardNameInput, 'Test Card');

      const cardDescriptionInput = screen.getByLabelText(/description/i);
      await userEvent.type(cardDescriptionInput, 'Test card description');

      const createButton = screen.getByText(/create card/i);
      await userEvent.click(createButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Card',
          description: 'Test card description',
        })
      );

      // Step 2: Verify card appears in list (simulate successful creation)
      mockUseQuery.mockReturnValue({
        data: {
          data: [
            {
              id: 'test-card-id',
              name: 'Test Card',
              description: 'Test card description',
              type: 'core-technologies',
              color: 'blue',
            },
          ],
        },
        isLoading: false,
        error: null,
      });

      // Re-render to show updated data
      render(<ContentManagementPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Card')).toBeInTheDocument();
      });

      // Step 3: Edit the card
      const editButton = screen.getByLabelText(/edit card/i);
      await userEvent.click(editButton);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Test Card')).toBeInTheDocument();
      });

      const editNameInput = screen.getByDisplayValue('Test Card');
      await userEvent.clear(editNameInput);
      await userEvent.type(editNameInput, 'Updated Test Card');

      const saveButton = screen.getByText(/save changes/i);
      await userEvent.click(saveButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Updated Test Card',
        })
      );

      // Step 4: Delete the card
      const deleteButton = screen.getByLabelText(/delete card/i);
      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
      });

      const confirmDeleteButton = screen.getByText(/delete/i);
      await userEvent.click(confirmDeleteButton);

      expect(mockMutation).toHaveBeenCalledWith('test-card-id');
    });
  });

  describe('Complete Question Management Workflow', () => {
    it('should create, read, update, and delete a question', async () => {
      const mockQuestions = [];
      const mockCards = [
        { id: 'card-1', name: 'Core Technologies', type: 'core-technologies' },
      ];
      const mockPlans = [{ id: 'plan-1', name: '1 Day Plan', duration: 1 }];
      const mockMutation = jest.fn();

      mockUseQuery
        .mockReturnValueOnce({
          data: { data: mockQuestions },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockCards },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockPlans },
          isLoading: false,
          error: null,
        });

      mockUseMutation.mockReturnValue({
        mutate: mockMutation,
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      // Step 1: Create a new question
      const addQuestionButton = screen.getByText(/add question/i);
      await userEvent.click(addQuestionButton);

      await waitFor(() => {
        expect(screen.getByText(/create new question/i)).toBeInTheDocument();
      });

      const questionInput = screen.getByLabelText(/question/i);
      await userEvent.type(questionInput, 'What is JavaScript?');

      const typeSelect = screen.getByLabelText(/type/i);
      await userEvent.selectOptions(typeSelect, 'multiple-choice');

      const difficultySelect = screen.getByLabelText(/difficulty/i);
      await userEvent.selectOptions(difficultySelect, 'beginner');

      const createButton = screen.getByText(/create question/i);
      await userEvent.click(createButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          question: 'What is JavaScript?',
          type: 'multiple-choice',
          difficulty: 'beginner',
        })
      );

      // Step 2: Verify question appears in list
      mockUseQuery.mockReturnValue({
        data: {
          data: [
            {
              id: 'question-1',
              question: 'What is JavaScript?',
              type: 'multiple-choice',
              difficulty: 'beginner',
              category: 'javascript',
            },
          ],
        },
        isLoading: false,
        error: null,
      });

      render(<QuestionsPage />);

      await waitFor(() => {
        expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
      });

      // Step 3: Edit the question
      const editButton = screen.getByLabelText(/edit question/i);
      await userEvent.click(editButton);

      await waitFor(() => {
        expect(
          screen.getByDisplayValue('What is JavaScript?')
        ).toBeInTheDocument();
      });

      const editQuestionInput = screen.getByDisplayValue('What is JavaScript?');
      await userEvent.clear(editQuestionInput);
      await userEvent.type(
        editQuestionInput,
        'What is JavaScript programming language?'
      );

      const saveButton = screen.getByText(/save changes/i);
      await userEvent.click(saveButton);

      expect(mockMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          question: 'What is JavaScript programming language?',
        })
      );

      // Step 4: Delete the question
      const deleteButton = screen.getByLabelText(/delete question/i);
      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
      });

      const confirmDeleteButton = screen.getByText(/delete/i);
      await userEvent.click(confirmDeleteButton);

      expect(mockMutation).toHaveBeenCalledWith('question-1');
    });
  });

  describe('Cross-Component Data Consistency', () => {
    it('should maintain data consistency between content management and questions pages', async () => {
      const mockCards = [
        { id: 'card-1', name: 'Core Technologies', type: 'core-technologies' },
      ];
      const mockQuestions = [
        {
          id: 'question-1',
          question: 'What is JavaScript?',
          category: 'javascript',
          cardType: 'core-technologies',
        },
      ];

      // Mock for content management page
      mockUseQuery
        .mockReturnValueOnce({
          data: { data: mockCards },
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
        })
        .mockReturnValueOnce({
          data: { data: [] },
          isLoading: false,
          error: null,
        });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      await waitFor(() => {
        expect(screen.getByText('Core Technologies')).toBeInTheDocument();
      });

      // Mock for questions page
      mockUseQuery
        .mockReturnValueOnce({
          data: { data: mockQuestions },
          isLoading: false,
          error: null,
        })
        .mockReturnValueOnce({
          data: { data: mockCards },
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
        expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
        expect(screen.getByText('core-technologies')).toBeInTheDocument();
      });
    });
  });

  describe('Search and Filter Integration', () => {
    it('should maintain search state across different admin pages', async () => {
      const mockQuestions = [
        { id: 'q1', question: 'What is React?', category: 'react' },
        { id: 'q2', question: 'What is JavaScript?', category: 'javascript' },
      ];

      mockUseQuery.mockReturnValue({
        data: { data: mockQuestions },
        isLoading: false,
        error: null,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      // Search for React questions
      const searchInput = screen.getByPlaceholderText(/search questions/i);
      await userEvent.type(searchInput, 'React');

      await waitFor(() => {
        expect(screen.getByText('What is React?')).toBeInTheDocument();
        expect(
          screen.queryByText('What is JavaScript?')
        ).not.toBeInTheDocument();
      });

      // Filter by category
      const categoryFilter = screen.getByLabelText(/filter by category/i);
      await userEvent.selectOptions(categoryFilter, 'react');

      await waitFor(() => {
        expect(screen.getByText('What is React?')).toBeInTheDocument();
        expect(
          screen.queryByText('What is JavaScript?')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Bulk Operations Integration', () => {
    it('should handle bulk operations across multiple content types', async () => {
      const mockQuestions = [
        { id: 'q1', question: 'Question 1', category: 'react' },
        { id: 'q2', question: 'Question 2', category: 'react' },
        { id: 'q3', question: 'Question 3', category: 'javascript' },
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
        isSuccess: true,
      });

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      // Select multiple questions
      const checkboxes = screen.getAllByRole('checkbox');
      await userEvent.click(checkboxes[1]); // Select second question
      await userEvent.click(checkboxes[2]); // Select third question

      // Perform bulk operation (e.g., bulk delete)
      const bulkDeleteButton = screen.getByText(/bulk delete/i);
      await userEvent.click(bulkDeleteButton);

      await waitFor(() => {
        expect(screen.getByText(/confirm bulk deletion/i)).toBeInTheDocument();
      });

      const confirmBulkDeleteButton = screen.getByText(/delete selected/i);
      await userEvent.click(confirmBulkDeleteButton);

      expect(mockMutation).toHaveBeenCalledWith(['q2', 'q3']);
    });
  });

  describe('Error Recovery Integration', () => {
    it('should handle and recover from errors gracefully across components', async () => {
      // Simulate initial error
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Network error'),
      });

      const ContentManagementPage = (
        await import('@/app/admin/content-management/page')
      ).default;
      render(<ContentManagementPage />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });

      // Simulate retry
      const retryButton = screen.getByText(/retry/i);
      await userEvent.click(retryButton);

      // Mock successful retry
      mockUseQuery.mockReturnValue({
        data: { data: [] },
        isLoading: false,
        error: null,
      });

      await waitFor(() => {
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Performance Integration', () => {
    it('should handle large datasets efficiently', async () => {
      // Create large dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `item-${i}`,
        name: `Item ${i}`,
        category: `category-${i % 10}`,
      }));

      mockUseQuery.mockReturnValue({
        data: { data: largeDataset },
        isLoading: false,
        error: null,
      });

      const startTime = performance.now();

      const QuestionsPage = (await import('@/app/admin/content/questions/page'))
        .default;
      render(<QuestionsPage />);

      await waitFor(() => {
        expect(screen.getByText('Item 0')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 1 second)
      expect(renderTime).toBeLessThan(1000);
    });
  });
});
