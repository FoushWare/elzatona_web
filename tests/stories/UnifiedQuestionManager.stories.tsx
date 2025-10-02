import type { Meta, StoryObj } from '@storybook/react';
import UnifiedQuestionManager from '@/components/UnifiedQuestionManager';

const meta: Meta<typeof UnifiedQuestionManager> = {
  title: 'Components/UnifiedQuestionManager',
  component: UnifiedQuestionManager,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Admin component for managing questions with CRUD operations, filtering, and bulk import.',
      },
    },
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnifiedQuestionManager>;

const mockQuestions = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.',
    type: 'multiple-choice',
    options: ['A library', 'A framework', 'A language', 'A database'],
    correctAnswers: ['A library'],
    explanation: 'React is a JavaScript library for building user interfaces.',
    category: 'Frontend',
    difficulty: 'beginner',
    learningPath: 'React Basics',
    topic: 'Introduction',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'What is TypeScript?',
    content: 'TypeScript is a typed superset of JavaScript.',
    type: 'multiple-choice',
    options: [
      'A superset of JavaScript',
      'A separate language',
      'A build tool',
      'A testing framework',
    ],
    correctAnswers: ['A superset of JavaScript'],
    explanation:
      'TypeScript is a typed superset of JavaScript that adds static type definitions.',
    category: 'Frontend',
    difficulty: 'intermediate',
    learningPath: 'TypeScript Basics',
    topic: 'Introduction',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default question manager with sample questions.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/hooks/useUnifiedQuestions');
      jest.doMock('@/hooks/useUnifiedQuestions', () => ({
        ...originalModule,
        useUnifiedQuestions: () => ({
          questions: mockQuestions,
          currentQuestion: null,
          learningPaths: [
            {
              id: '1',
              title: 'React Basics',
              description: 'Learn React fundamentals',
            },
            {
              id: '2',
              title: 'TypeScript Basics',
              description: 'Learn TypeScript fundamentals',
            },
          ],
          stats: {
            totalQuestions: 2,
            questionsByDifficulty: {
              beginner: 1,
              intermediate: 1,
              advanced: 0,
            },
            questionsByCategory: { Frontend: 2, Backend: 0, Database: 0 },
            questionsByLearningPath: {
              'React Basics': 1,
              'TypeScript Basics': 1,
            },
            recentActivity: [],
          },
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
          loadQuestion: jest.fn(),
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
        }),
      }));
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Question manager in loading state.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/hooks/useUnifiedQuestions');
      jest.doMock('@/hooks/useUnifiedQuestions', () => ({
        ...originalModule,
        useUnifiedQuestions: () => ({
          questions: [],
          currentQuestion: null,
          learningPaths: [],
          stats: null,
          isLoading: true,
          isCreating: false,
          isUpdating: false,
          isDeleting: false,
          error: null,
          currentPage: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
          loadQuestions: jest.fn(),
          loadQuestion: jest.fn(),
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
        }),
      }));
      return <Story />;
    },
  ],
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Question manager with no questions.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/hooks/useUnifiedQuestions');
      jest.doMock('@/hooks/useUnifiedQuestions', () => ({
        ...originalModule,
        useUnifiedQuestions: () => ({
          questions: [],
          currentQuestion: null,
          learningPaths: [],
          stats: {
            totalQuestions: 0,
            questionsByDifficulty: {
              beginner: 0,
              intermediate: 0,
              advanced: 0,
            },
            questionsByCategory: {},
            questionsByLearningPath: {},
            recentActivity: [],
          },
          isLoading: false,
          isCreating: false,
          isUpdating: false,
          isDeleting: false,
          error: null,
          currentPage: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
          loadQuestions: jest.fn(),
          loadQuestion: jest.fn(),
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
        }),
      }));
      return <Story />;
    },
  ],
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Question manager with error state.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/hooks/useUnifiedQuestions');
      jest.doMock('@/hooks/useUnifiedQuestions', () => ({
        ...originalModule,
        useUnifiedQuestions: () => ({
          questions: [],
          currentQuestion: null,
          learningPaths: [],
          stats: null,
          isLoading: false,
          isCreating: false,
          isUpdating: false,
          isDeleting: false,
          error: 'Failed to load questions',
          currentPage: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
          loadQuestions: jest.fn(),
          loadQuestion: jest.fn(),
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
        }),
      }));
      return <Story />;
    },
  ],
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Question manager with pagination controls.',
      },
    },
  },
  decorators: [
    Story => {
      const originalModule = jest.requireActual('@/hooks/useUnifiedQuestions');
      jest.doMock('@/hooks/useUnifiedQuestions', () => ({
        ...originalModule,
        useUnifiedQuestions: () => ({
          questions: mockQuestions,
          currentQuestion: null,
          learningPaths: [
            {
              id: '1',
              title: 'React Basics',
              description: 'Learn React fundamentals',
            },
            {
              id: '2',
              title: 'TypeScript Basics',
              description: 'Learn TypeScript fundamentals',
            },
          ],
          stats: {
            totalQuestions: 25,
            questionsByDifficulty: {
              beginner: 10,
              intermediate: 10,
              advanced: 5,
            },
            questionsByCategory: { Frontend: 15, Backend: 10, Database: 0 },
            questionsByLearningPath: {
              'React Basics': 10,
              'TypeScript Basics': 15,
            },
            recentActivity: [],
          },
          isLoading: false,
          isCreating: false,
          isUpdating: false,
          isDeleting: false,
          error: null,
          currentPage: 2,
          pageSize: 10,
          totalCount: 25,
          totalPages: 3,
          hasNext: true,
          hasPrev: true,
          loadQuestions: jest.fn(),
          loadQuestion: jest.fn(),
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
        }),
      }));
      return <Story />;
    },
  ],
};
