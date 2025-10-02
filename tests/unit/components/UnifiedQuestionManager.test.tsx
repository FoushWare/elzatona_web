import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnifiedQuestionManager from '@/components/UnifiedQuestionManager';

// Mock the useUnifiedQuestions hook
jest.mock('@/hooks/useUnifiedQuestions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the BulkQuestionUploader component
jest.mock('@/components/BulkQuestionUploader', () => {
  return function MockBulkQuestionUploader({
    onQuestionsAdded,
  }: {
    onQuestionsAdded: (questions: unknown[]) => void;
  }) {
    return (
      <div data-testid="bulk-uploader">
        <button
          onClick={() =>
            onQuestionsAdded([{ id: '1', title: 'Test Question' }])
          }
        >
          Add Questions
        </button>
      </div>
    );
  };
});

const mockUseUnifiedQuestions = jest.fn();

describe('UnifiedQuestionManager', () => {
  const mockQuestions = [
    {
      id: '1',
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces.',
      type: 'single',
      options: ['A library', 'A framework', 'A language', 'A database'],
      correctAnswers: ['A library'],
      explanation: 'React is a library, not a framework.',
      category: 'React',
      topic: 'Fundamentals',
      learningPath: 'react-basics',
      difficulty: 'easy',
      points: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'What is TypeScript?',
      content: 'TypeScript is a typed superset of JavaScript.',
      type: 'multiple',
      options: ['Typed', 'Superset', 'JavaScript', 'Framework'],
      correctAnswers: ['Typed', 'Superset', 'JavaScript'],
      explanation: 'TypeScript adds static typing to JavaScript.',
      category: 'TypeScript',
      topic: 'Fundamentals',
      learningPath: 'typescript-basics',
      difficulty: 'medium',
      points: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockLearningPaths = [
    { id: 'react-basics', title: 'React Basics', isActive: true },
    { id: 'typescript-basics', title: 'TypeScript Basics', isActive: true },
  ];

  const mockCategories = [
    { id: 'react', name: 'React' },
    { id: 'typescript', name: 'TypeScript' },
  ];

  const mockTopics = [
    { id: 'fundamentals', name: 'Fundamentals' },
    { id: 'advanced', name: 'Advanced' },
  ];

  const mockStats = {
    totalQuestions: 2,
    questionsByCategory: { React: 1, TypeScript: 1 },
    questionsByDifficulty: { easy: 1, medium: 1 },
    recentActivity: [],
  };

  const defaultMockReturn = {
    questions: mockQuestions,
    learningPaths: mockLearningPaths,
    categories: mockCategories,
    topics: mockTopics,
    stats: mockStats,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    totalCount: 2,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    loadQuestions: jest.fn(),
    loadLearningPaths: jest.fn(),
    loadStats: jest.fn(),
    createQuestion: jest.fn(),
    updateQuestion: jest.fn(),
    deleteQuestion: jest.fn(),
    bulkImportQuestions: jest.fn(),
    searchQuestions: jest.fn(),
    getRandomQuestions: jest.fn(),
    goToPage: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    changePageSize: jest.fn(),
    clearError: jest.fn(),
    clearQuestions: jest.fn(),
  };

  beforeEach(() => {
    mockUseUnifiedQuestions.mockReturnValue(defaultMockReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with questions', () => {
    render(<UnifiedQuestionManager />);

    expect(screen.getByText('Question Management')).toBeInTheDocument();
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('What is TypeScript?')).toBeInTheDocument();
  });

  it('should display loading state', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });

    render(<UnifiedQuestionManager />);

    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
  });

  it('should display error state', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      error: 'Failed to load questions',
    });

    render(<UnifiedQuestionManager />);

    expect(
      screen.getByText('Error: Failed to load questions')
    ).toBeInTheDocument();
  });

  it('should display empty state when no questions', () => {
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      questions: [],
    });

    render(<UnifiedQuestionManager />);

    expect(screen.getByText('No questions found')).toBeInTheDocument();
  });

  it('should open add question form when Add Question button is clicked', () => {
    render(<UnifiedQuestionManager />);

    const addButton = screen.getByText('Add Question');
    fireEvent.click(addButton);

    expect(screen.getByText('Add New Question')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
  });

  it('should open edit form when Edit button is clicked', () => {
    render(<UnifiedQuestionManager />);

    const editButton = screen.getByTestId('edit-question-1');
    fireEvent.click(editButton);

    expect(screen.getByText('Edit Question')).toBeInTheDocument();
    expect(screen.getByDisplayValue('What is React?')).toBeInTheDocument();
  });

  it('should delete question when Delete button is clicked', async () => {
    const mockDeleteQuestion = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      deleteQuestion: mockDeleteQuestion,
    });

    render(<UnifiedQuestionManager />);

    const deleteButton = screen.getByTestId('delete-question-1');
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByText('Delete');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteQuestion).toHaveBeenCalledWith('1');
    });
  });

  it('should filter questions by category', async () => {
    const mockLoadQuestions = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      loadQuestions: mockLoadQuestions,
    });

    render(<UnifiedQuestionManager />);

    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'React' } });

    await waitFor(() => {
      expect(mockLoadQuestions).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'React' })
      );
    });
  });

  it('should filter questions by learning path', async () => {
    const mockLoadQuestions = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      loadQuestions: mockLoadQuestions,
    });

    render(<UnifiedQuestionManager />);

    const learningPathSelect = screen.getByLabelText('Learning Path');
    fireEvent.change(learningPathSelect, { target: { value: 'react-basics' } });

    await waitFor(() => {
      expect(mockLoadQuestions).toHaveBeenCalledWith(
        expect.objectContaining({ learningPath: 'react-basics' })
      );
    });
  });

  it('should search questions', async () => {
    const mockSearchQuestions = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      searchQuestions: mockSearchQuestions,
    });

    render(<UnifiedQuestionManager />);

    const searchInput = screen.getByPlaceholderText('Search questions...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSearchQuestions).toHaveBeenCalledWith('React', {});
    });
  });

  it('should handle pagination', () => {
    const mockGoToPage = jest.fn();
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      totalPages: 3,
      currentPage: 2,
      hasNext: true,
      hasPrev: true,
      goToPage: mockGoToPage,
    });

    render(<UnifiedQuestionManager />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockGoToPage).toHaveBeenCalledWith(3);
  });

  it('should handle bulk import', async () => {
    const mockBulkImportQuestions = jest.fn().mockResolvedValue({
      success: 1,
      failed: 0,
      errors: [],
    });
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      bulkImportQuestions: mockBulkImportQuestions,
    });

    render(<UnifiedQuestionManager />);

    const bulkUploader = screen.getByTestId('bulk-uploader');
    const addButton = bulkUploader.querySelector('button');
    fireEvent.click(addButton!);

    await waitFor(() => {
      expect(mockBulkImportQuestions).toHaveBeenCalled();
    });
  });

  it('should display question statistics', () => {
    render(<UnifiedQuestionManager />);

    expect(screen.getByText('Total Questions: 2')).toBeInTheDocument();
    expect(screen.getByText('React: 1')).toBeInTheDocument();
    expect(screen.getByText('TypeScript: 1')).toBeInTheDocument();
  });

  it('should handle form submission for new question', async () => {
    const mockCreateQuestion = jest.fn().mockResolvedValue('new-id');
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      createQuestion: mockCreateQuestion,
    });

    render(<UnifiedQuestionManager />);

    // Open add form
    const addButton = screen.getByText('Add Question');
    fireEvent.click(addButton);

    // Fill form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Question' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'What is Vue?' },
    });
    fireEvent.change(screen.getByLabelText('Type'), {
      target: { value: 'single' },
    });

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateQuestion).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Question',
          content: 'What is Vue?',
          type: 'single',
        })
      );
    });
  });

  it('should handle form submission for editing question', async () => {
    const mockUpdateQuestion = jest.fn().mockResolvedValue(undefined);
    mockUseUnifiedQuestions.mockReturnValue({
      ...defaultMockReturn,
      updateQuestion: mockUpdateQuestion,
    });

    render(<UnifiedQuestionManager />);

    // Open edit form
    const editButton = screen.getByTestId('edit-question-1');
    fireEvent.click(editButton);

    // Update form
    fireEvent.change(screen.getByDisplayValue('What is React?'), {
      target: { value: 'Updated Question' },
    });

    // Submit form
    const submitButton = screen.getByText('Update Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateQuestion).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          title: 'Updated Question',
        })
      );
    });
  });
});
