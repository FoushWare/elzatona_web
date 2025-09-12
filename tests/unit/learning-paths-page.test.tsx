import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearningPathsPage from '@/app/learning-paths/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

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

  it('renders the page title and new subtitle', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('heading', { name: 'Learning Paths' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your path to success in interviews')
    ).toBeInTheDocument();
  });

  it('renders the Schedule AI Mock Interview button', () => {
    render(<LearningPathsPage />);

    const scheduleButton = screen.getByRole('link', {
      name: /schedule ai mock interview/i,
    });
    expect(scheduleButton).toBeInTheDocument();
    expect(scheduleButton).toHaveAttribute('href', '/schedule-interview');
  });

  it('renders all learning path cards without filtering', () => {
    render(<LearningPathsPage />);

    // Check for learning path titles
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    expect(screen.getByText('React Mastery')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();

    // Check for descriptions
    expect(
      screen.getByText('Learn HTML, CSS, and JavaScript fundamentals')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Master React development with hooks and patterns')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Advanced CSS techniques and modern layouts')
    ).toBeInTheDocument();
  });

  it('renders question count badges with simplified format', () => {
    render(<LearningPathsPage />);

    // Check for simplified question count badges (#number Q)
    expect(screen.getByText('#25 Q')).toBeInTheDocument();
    expect(screen.getByText('#30 Q')).toBeInTheDocument();
    expect(screen.getByText('#20 Q')).toBeInTheDocument();
  });

  it('toggles card expansion when header is clicked', async () => {
    const user = userEvent.setup();
    render(<LearningPathsPage />);

    // Find the first card header (it's a div with cursor-pointer, not a button)
    const frontendCard = screen
      .getByText('Frontend Basics')
      .closest('[data-testid="learning-path-card"]');
    const header = frontendCard?.querySelector('[data-testid="card-header"]');

    expect(header).toBeInTheDocument();

    // Click to toggle
    await user.click(header!);

    // Content should be visible (cards start collapsed)
    const description = screen.getByText(
      'Learn HTML, CSS, and JavaScript fundamentals'
    );
    expect(description).toBeInTheDocument();
  });

  it('shows navigation links in header', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('link', { name: /view study plans/i })
    ).toBeInTheDocument();
    // There are multiple preparation guides links (header and CTA), so use getAllByRole
    expect(
      screen.getAllByRole('link', { name: /preparation guides/i })
    ).toHaveLength(2);
  });

  it('does not show filter buttons or statistics', () => {
    render(<LearningPathsPage />);

    // Should not show filter buttons (check for specific filter button text patterns)
    expect(
      screen.queryByRole('button', { name: /^all levels$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^beginner$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^intermediate$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^advanced$/i })
    ).not.toBeInTheDocument();

    // Should not show category filter buttons (check for specific filter button text patterns)
    expect(
      screen.queryByRole('button', { name: /^javascript$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^react$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^css$/i })
    ).not.toBeInTheDocument();

    // Should not show statistics
    expect(screen.queryByText(/total hours/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/total resources/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/categories/i)).not.toBeInTheDocument();
  });

  it('does not show mobile toggle buttons', () => {
    render(<LearningPathsPage />);

    expect(
      screen.queryByRole('button', { name: /show stats/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /filters/i })
    ).not.toBeInTheDocument();
  });

  it('renders call to action section', () => {
    render(<LearningPathsPage />);

    // Check for CTA section (should be present)
    expect(screen.getByText(/ready to start learning/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LearningPathsPage />);

    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { name: 'Learning Paths' });
    expect(mainHeading).toBeInTheDocument();

    // Check for proper link attributes
    const scheduleLink = screen.getByRole('link', {
      name: /schedule ai mock interview/i,
    });
    expect(scheduleLink).toHaveAttribute('href', '/schedule-interview');
  });

  it('renders flashcard icons for each learning path', () => {
    render(<LearningPathsPage />);

    // Check for flashcard icons (should have aria-label for accessibility)
    const flashcardIcons = screen.getAllByLabelText(
      /add learning path to flashcards/i
    );
    expect(flashcardIcons).toHaveLength(3); // One for each learning path
  });

  it('has proper responsive design classes', () => {
    const { container } = render(<LearningPathsPage />);

    // Check for responsive classes on the main container
    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('min-h-screen');
  });
});
