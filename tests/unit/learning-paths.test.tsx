import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearningPathsPage from '@/app/learning-paths/page';

// Mock the learning paths data (commented out as it's not used in current tests)
// const mockLearningPaths = [
//   {
//     id: 'frontend-basics',
//     title: 'Frontend Basics',
//     description: 'Learn HTML, CSS, and JavaScript fundamentals',
//     difficulty: 'beginner' as const,
//     estimatedHours: 20,
//     questionCount: 116,
//     category: 'frontend',
//     skills: ['HTML', 'CSS', 'JavaScript'],
//     prerequisites: [],
//     resources: [],
//   },
//   {
//     id: 'react-mastery',
//     title: 'React Mastery',
//     description: 'Master React development with hooks and patterns',
//     difficulty: 'intermediate' as const,
//     estimatedHours: 30,
//     questionCount: 85,
//     category: 'frontend',
//     skills: ['React', 'Hooks', 'State Management'],
//     prerequisites: ['frontend-basics'],
//     resources: [],
//   },
// ]

// Mock the API response
jest.mock('@/app/api/questions/[pathId]/route', () => ({
  GET: jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        questions: Array.from({ length: 116 }, (_, i) => ({
          id: i + 1,
          question: `Question ${i + 1}`,
          answer: `Answer ${i + 1}`,
        })),
        totalQuestions: 116,
        groups: 6,
      }),
  }),
}));

describe('Learning Paths Page', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it('renders learning paths page with all cards collapsed by default', () => {
    render(<LearningPathsPage />);

    // Check if the page title is rendered
    expect(screen.getByText('Learning Paths')).toBeInTheDocument();

    // Check if learning path cards are rendered
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();

    // Check if cards show question counts
    expect(screen.getByText('116 questions')).toBeInTheDocument();
    expect(screen.getByText('85 questions')).toBeInTheDocument();

    // Check if cards are collapsed by default (content should not be visible)
    expect(
      screen.queryByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Master React development with hooks and patterns')
    ).not.toBeInTheDocument();
  });

  it('expands card when header is clicked', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find the Frontend Basics card header
    const frontendCard = screen
      .getByText('Frontend Basics')
      .closest('[data-testid="learning-path-card"]');
    const header = frontendCard?.querySelector('[data-testid="card-header"]');

    expect(header).toBeInTheDocument();

    // Click the header to expand
    await user.click(header!);

    // Wait for content to appear
    await waitFor(() => {
      expect(
        screen.getByText('Learn HTML, CSS, and JavaScript fundamentals')
      ).toBeInTheDocument();
    });

    // Check if action buttons are visible
    expect(screen.getByText('Practice Questions')).toBeInTheDocument();
    expect(screen.getByText('View Resources')).toBeInTheDocument();
  });

  it('collapses card when header is clicked again', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find the Frontend Basics card header
    const frontendCard = screen
      .getByText('Frontend Basics')
      .closest('[data-testid="learning-path-card"]');
    const header = frontendCard?.querySelector('[data-testid="card-header"]');

    // First click to expand
    await user.click(header!);

    // Wait for content to appear
    await waitFor(() => {
      expect(
        screen.getByText('Learn HTML, CSS, and JavaScript fundamentals')
      ).toBeInTheDocument();
    });

    // Second click to collapse
    await user.click(header!);

    // Wait for content to disappear
    await waitFor(() => {
      expect(
        screen.queryByText('Learn HTML, CSS, and JavaScript fundamentals')
      ).not.toBeInTheDocument();
    });
  });

  it('filters cards based on search input', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find search input
    const searchInput = screen.getByPlaceholderText(/search learning paths/i);
    expect(searchInput).toBeInTheDocument();

    // Type in search input
    await user.type(searchInput, 'React');

    // Wait for filtering
    await waitFor(() => {
      expect(screen.getByText('React Mastery')).toBeInTheDocument();
      expect(screen.queryByText('Frontend Basics')).not.toBeInTheDocument();
    });
  });

  it('filters cards based on difficulty', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find difficulty filter
    const difficultyFilter = screen.getByRole('button', {
      name: /difficulty/i,
    });
    expect(difficultyFilter).toBeInTheDocument();

    // Click difficulty filter
    await user.click(difficultyFilter);

    // Select intermediate difficulty
    const intermediateOption = screen.getByText('Intermediate');
    await user.click(intermediateOption);

    // Wait for filtering
    await waitFor(() => {
      expect(screen.getByText('React Mastery')).toBeInTheDocument();
      expect(screen.queryByText('Frontend Basics')).not.toBeInTheDocument();
    });
  });

  it('shows correct difficulty badges', () => {
    render(<LearningPathsPage />);

    // Check for difficulty badges
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('shows correct category icons', () => {
    render(<LearningPathsPage />);

    // Check for category icons (these would be emoji or icon components)
    const frontendIcon = screen.getByText('🎨'); // Frontend icon
    const reactIcon = screen.getByText('⚛️'); // React icon

    expect(frontendIcon).toBeInTheDocument();
    expect(reactIcon).toBeInTheDocument();
  });

  it('handles empty search results', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find search input
    const searchInput = screen.getByPlaceholderText(/search learning paths/i);

    // Type something that won't match any cards
    await user.type(searchInput, 'NonExistentPath');

    // Wait for filtering
    await waitFor(() => {
      expect(screen.getByText(/no learning paths found/i)).toBeInTheDocument();
    });
  });
});
