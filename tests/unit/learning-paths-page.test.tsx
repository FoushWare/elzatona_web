import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearningPathsPage from '@/app/learning-paths/page';

// Mock the resources
jest.mock('@/lib/resources', () => ({
  learningPaths: [
    {
      id: 'frontend-basics',
      title: 'Frontend Basics',
      description: 'Learn HTML, CSS, and JavaScript fundamentals',
      difficulty: 'beginner' as const,
      estimatedTime: 40,
      questionCount: 25,
      resources: ['resource1', 'resource2'],
      targetSkills: ['HTML', 'CSS', 'JavaScript'],
      prerequisites: ['Basic computer skills'],
    },
    {
      id: 'react-mastery',
      title: 'React Mastery',
      description: 'Master React development with hooks and patterns',
      difficulty: 'intermediate' as const,
      estimatedTime: 60,
      questionCount: 30,
      resources: ['resource3', 'resource4'],
      targetSkills: ['React', 'Hooks', 'State Management'],
      prerequisites: ['JavaScript ES6+'],
    },
    {
      id: 'advanced-css',
      title: 'Advanced CSS Mastery',
      description: 'Advanced CSS techniques and modern layouts',
      difficulty: 'advanced' as const,
      estimatedTime: 30,
      questionCount: 20,
      resources: ['resource5'],
      targetSkills: ['CSS Grid', 'Flexbox', 'Animations'],
    },
  ],
  getResourceById: jest.fn(id => ({
    id,
    title: `Resource ${id}`,
    url: `https://example.com/${id}`,
    type: 'documentation',
  })),
}));

describe('LearningPathsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and description', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('heading', { name: 'Learning Paths' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/curated educational journeys/i)
    ).toBeInTheDocument();
  });

  it('displays statistics correctly', () => {
    render(<LearningPathsPage />);

    // Check for statistics numbers
    expect(screen.getByText('3')).toBeInTheDocument(); // Learning Paths count
    expect(screen.getByText('130')).toBeInTheDocument(); // Total Hours (40 + 60 + 30)
    expect(screen.getByText('5')).toBeInTheDocument(); // Total Resources (2 + 2 + 1)
    expect(screen.getByText('12')).toBeInTheDocument(); // Categories count
  });

  it('renders difficulty level filter buttons', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('button', { name: /all levels/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /beginner/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /intermediate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /advanced/i })
    ).toBeInTheDocument();
  });

  it('renders category filter buttons with correct labels', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('button', { name: /all categories/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /javascript/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /react/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /css/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /typescript/i })
    ).toBeInTheDocument();
  });

  it('renders learning path cards with correct information', () => {
    render(<LearningPathsPage />);

    // Check for learning path titles
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();

    // Check for question counts (use getAllByText since there are multiple instances)
    expect(screen.getAllByText('25 questions')).toHaveLength(2); // Header and stats
    expect(screen.getAllByText('30 questions')).toHaveLength(2);
    expect(screen.getAllByText('20 questions')).toHaveLength(2);
  });

  it('allows clicking difficulty filter buttons', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    const beginnerButton = screen.getByRole('button', { name: /beginner/i });
    await user.click(beginnerButton);

    // Should show only beginner level paths
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.queryByText('React Mastery')).not.toBeInTheDocument();
    expect(screen.queryByText('Advanced CSS Mastery')).not.toBeInTheDocument();
  });

  it('allows clicking category filter buttons', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    const reactButton = screen.getByRole('button', { name: /react/i });
    await user.click(reactButton);

    // Should show only React-related paths
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.queryByText('Frontend Basics')).not.toBeInTheDocument();
    expect(screen.queryByText('Advanced CSS Mastery')).not.toBeInTheDocument();
  });

  it('shows all paths when "All Levels" is selected', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // First filter to beginner
    const beginnerButton = screen.getByRole('button', { name: /beginner/i });
    await user.click(beginnerButton);

    // Then select all levels
    const allLevelsButton = screen.getByRole('button', { name: /all levels/i });
    await user.click(allLevelsButton);

    // Should show all paths again
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
  });

  it('shows all paths when "All Categories" is selected', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // First filter to react
    const reactButton = screen.getByRole('button', { name: /react/i });
    await user.click(reactButton);

    // Then select all categories
    const allCategoriesButton = screen.getByRole('button', {
      name: /all categories/i,
    });
    await user.click(allCategoriesButton);

    // Should show all paths again
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
  });

  it('shows empty state when no paths match filters', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Filter to advanced difficulty
    const advancedButton = screen.getByRole('button', { name: /advanced/i });
    await user.click(advancedButton);

    // Filter to javascript category (no advanced javascript paths in mock)
    const javascriptButton = screen.getByRole('button', {
      name: /javascript/i,
    });
    await user.click(javascriptButton);

    // Should show empty state
    expect(screen.getByText(/no learning paths found/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clear filters/i })
    ).toBeInTheDocument();
  });

  it('clears filters when clear filters button is clicked', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Apply filters
    const advancedButton = screen.getByRole('button', { name: /advanced/i });
    await user.click(advancedButton);

    const javascriptButton = screen.getByRole('button', {
      name: /javascript/i,
    });
    await user.click(javascriptButton);

    // Clear filters
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    // Should show all paths again
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
  });

  it('toggles card expansion when header is clicked', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    const frontendCard = screen
      .getByText('Frontend Basics')
      .closest('[data-testid="learning-path-card"]');
    const header = frontendCard?.querySelector('[data-testid="card-header"]');

    expect(header).toBeInTheDocument();

    // Content should be in DOM
    const description = screen.getByText(
      'Learn HTML, CSS, and JavaScript fundamentals'
    );
    expect(description).toBeInTheDocument();

    // Click to toggle (should work without errors)
    await user.click(header!);

    // Click again to toggle back
    await user.click(header!);

    // Content should still be in DOM
    expect(description).toBeInTheDocument();
  });

  it('shows navigation links', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('link', { name: /view study plans/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /preparation guides/i })
    ).toHaveLength(2); // Header and CTA
    expect(
      screen.getByRole('link', { name: /enhanced learning path/i })
    ).toBeInTheDocument();
  });

  it('shows mobile toggle buttons', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('button', { name: /show stats/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /filters/i })
    ).toBeInTheDocument();
  });

  it('toggles statistics visibility on mobile', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    const toggleButton = screen.getByRole('button', {
      name: /show stats/i,
    });
    await user.click(toggleButton);

    expect(
      screen.getByRole('button', { name: /hide stats/i })
    ).toBeInTheDocument();
  });

  it('toggles filters visibility on mobile', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    const toggleButton = screen.getByRole('button', { name: /filters/i });
    await user.click(toggleButton);

    expect(
      screen.getByRole('button', { name: /hide filters/i })
    ).toBeInTheDocument();
  });
});
