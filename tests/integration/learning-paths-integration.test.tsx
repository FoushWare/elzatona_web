import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the main page component
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

// Mock the resources module with realistic data
jest.mock('@/lib/resources', () => ({
  learningPaths: [
    {
      id: 'frontend-basics',
      title: 'Frontend Fundamentals',
      description:
        'Master the essential building blocks of web development: HTML semantics, CSS layouts, and JavaScript fundamentals.',
      difficulty: 'beginner',
      estimatedTime: 15,
      questionCount: 100,
      resources: ['css-layouts', 'object-properties', 'font-pairing'],
      targetSkills: ['HTML Semantics', 'CSS Layouts', 'JavaScript Basics'],
      prerequisites: [],
    },
    {
      id: 'advanced-css',
      title: 'Advanced CSS Mastery',
      description:
        'Master advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns.',
      difficulty: 'intermediate',
      estimatedTime: 12,
      questionCount: 20,
      resources: ['css-stacking-context', 'css-layouts', 'masonry-layout'],
      targetSkills: [
        'CSS Grid & Flexbox',
        'Advanced Layouts',
        'CSS Animations',
      ],
      prerequisites: ['frontend-basics'],
    },
    {
      id: 'react-mastery',
      title: 'React Mastery',
      description:
        'Master React development with hooks, context, performance optimization, and advanced patterns.',
      difficulty: 'intermediate',
      estimatedTime: 25,
      questionCount: 50,
      resources: ['react-hooks', 'react-context', 'react-performance'],
      targetSkills: ['React Hooks', 'Context API', 'State Management'],
      prerequisites: ['frontend-basics'],
    },
    {
      id: 'javascript-deep-dive',
      title: 'JavaScript Deep Dive',
      description:
        'Advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
      difficulty: 'advanced',
      estimatedTime: 30,
      questionCount: 75,
      resources: [
        'javascript-closures',
        'javascript-prototypes',
        'javascript-async',
      ],
      targetSkills: ['Closures', 'Prototypes', 'Async Programming'],
      prerequisites: ['frontend-basics'],
    },
  ],
  getResourceById: jest.fn((id: string) => ({
    id,
    title: `Resource ${id}`,
    url: `https://example.com/${id}`,
    type: 'documentation',
  })),
}));

describe('Learning Paths Page Integration Tests', () => {
  beforeEach(() => {
    // Clear any previous state
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders the complete learning paths page', () => {
      render(<LearningPathsPage />);

      // Check page title and description
      expect(
        screen.getByRole('heading', { name: 'Learning Paths' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/curated educational journeys/i)
      ).toBeInTheDocument();

      // Check statistics
      expect(screen.getByText('4')).toBeInTheDocument(); // learningPathsCount
      expect(screen.getAllByText('Learning Paths')).toHaveLength(2); // Page title and stats
      expect(screen.getByText('Total Hours')).toBeInTheDocument();
      expect(screen.getByText('Total Resources')).toBeInTheDocument();
      expect(screen.getByText('Categories')).toBeInTheDocument();

      // Check filter buttons
      expect(screen.getByText('All Levels')).toBeInTheDocument();
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();

      // Check category filters
      expect(screen.getByText('All Categories')).toBeInTheDocument();
      expect(screen.getByText('Javascript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Css')).toBeInTheDocument();
    });

    it('renders all learning path cards', () => {
      render(<LearningPathsPage />);

      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
      expect(screen.getByText('React Mastery')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
    });

    it('displays correct question counts for each learning path', () => {
      render(<LearningPathsPage />);

      expect(screen.getAllByText('100 questions')).toHaveLength(2); // Header and stats
      expect(screen.getAllByText('20 questions')).toHaveLength(2); // Header and stats
      expect(screen.getAllByText('50 questions')).toHaveLength(2); // Header and stats
      expect(screen.getAllByText('75 questions')).toHaveLength(2); // Header and stats
    });
  });

  describe('Filtering Functionality', () => {
    it('filters by beginner difficulty level', async () => {
      render(<LearningPathsPage />);

      // Click beginner filter
      fireEvent.click(screen.getByText('Beginner'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
        expect(
          screen.queryByText('Advanced CSS Mastery')
        ).not.toBeInTheDocument();
        expect(screen.queryByText('React Mastery')).not.toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Deep Dive')
        ).not.toBeInTheDocument();
      });
    });

    it('filters by intermediate difficulty level', async () => {
      render(<LearningPathsPage />);

      // Click intermediate filter
      fireEvent.click(screen.getByText('Intermediate'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
        expect(screen.getByText('React Mastery')).toBeInTheDocument();
        expect(
          screen.queryByText('Frontend Fundamentals')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Deep Dive')
        ).not.toBeInTheDocument();
      });
    });

    it('filters by advanced difficulty level', async () => {
      render(<LearningPathsPage />);

      // Click advanced filter
      fireEvent.click(screen.getByText('Advanced'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
        expect(
          screen.queryByText('Frontend Fundamentals')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('Advanced CSS Mastery')
        ).not.toBeInTheDocument();
        expect(screen.queryByText('React Mastery')).not.toBeInTheDocument();
      });
    });

    it('filters by React category', async () => {
      render(<LearningPathsPage />);

      // Click React category filter
      fireEvent.click(screen.getByText('React'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('React Mastery')).toBeInTheDocument();
        expect(
          screen.queryByText('Frontend Fundamentals')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('Advanced CSS Mastery')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Deep Dive')
        ).not.toBeInTheDocument();
      });
    });

    it('filters by CSS category', async () => {
      render(<LearningPathsPage />);

      // Click CSS category filter
      fireEvent.click(screen.getByText('Css'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
        expect(
          screen.queryByText('Frontend Fundamentals')
        ).not.toBeInTheDocument();
        expect(screen.queryByText('React Mastery')).not.toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Deep Dive')
        ).not.toBeInTheDocument();
      });
    });

    it('combines difficulty and category filters', async () => {
      render(<LearningPathsPage />);

      // Click intermediate difficulty
      fireEvent.click(screen.getByText('Intermediate'));

      // Click CSS category
      fireEvent.click(screen.getByText('Css'));

      // Wait for filtering to complete
      await waitFor(() => {
        expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
        expect(screen.queryByText('React Mastery')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Frontend Fundamentals')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('JavaScript Deep Dive')
        ).not.toBeInTheDocument();
      });
    });

    it('shows empty state when no paths match filters', async () => {
      render(<LearningPathsPage />);

      // Apply filters that should result in no matches
      fireEvent.click(screen.getByText('Advanced'));
      fireEvent.click(screen.getByText('React'));

      // Wait for empty state
      await waitFor(() => {
        expect(
          screen.getByText(/no learning paths found/i)
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: /clear filters/i })
        ).toBeInTheDocument();
      });
    });

    it('clears filters when clear filters button is clicked', async () => {
      render(<LearningPathsPage />);

      // Apply filters
      fireEvent.click(screen.getByText('Advanced'));
      fireEvent.click(screen.getByText('React'));

      // Wait for empty state
      await waitFor(() => {
        expect(
          screen.getByText(/no learning paths found/i)
        ).toBeInTheDocument();
      });

      // Clear filters
      fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

      // Wait for paths to reappear
      await waitFor(() => {
        expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
        expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();
        expect(screen.getByText('React Mastery')).toBeInTheDocument();
        expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
      });
    });
  });

  describe('Card Interaction', () => {
    it('expands and collapses learning path cards', async () => {
      render(<LearningPathsPage />);

      // Initially collapsed, content should not be visible
      expect(
        screen.queryByText(/master the essential building blocks/i)
      ).toBeInTheDocument(); // Element exists but is hidden by CSS

      // Click to expand first card
      const firstCardHeader = screen.getAllByTestId('card-header')[0];
      fireEvent.click(firstCardHeader);

      // Content should now be visible
      await waitFor(() => {
        expect(
          screen.getByText(/master the essential building blocks/i)
        ).toBeVisible();
      });

      // Check for action buttons
      expect(
        screen.getAllByRole('link', { name: /practice questions/i })
      ).toHaveLength(4); // All cards expanded
      expect(
        screen.getAllByRole('link', { name: /view resources/i })
      ).toHaveLength(4); // All cards expanded
    });

    it('maintains filter state when cards are expanded/collapsed', async () => {
      render(<LearningPathsPage />);

      // Apply a filter
      fireEvent.click(screen.getByText('Beginner'));

      // Wait for filtering
      await waitFor(() => {
        expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
        expect(
          screen.queryByText('Advanced CSS Mastery')
        ).not.toBeInTheDocument();
      });

      // Expand a card
      const cardHeader = screen.getByTestId('card-header');
      fireEvent.click(cardHeader);

      // Filter should still be applied
      await waitFor(() => {
        expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
        expect(
          screen.queryByText('Advanced CSS Mastery')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('shows mobile toggle buttons on mobile viewport', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<LearningPathsPage />);

      expect(
        screen.getByRole('button', { name: /show stats/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /filters/i })
      ).toBeInTheDocument();
    });

    it('toggles statistics visibility on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<LearningPathsPage />);

      // Statistics should be hidden by default on mobile
      const statisticsContainer = screen
        .getAllByText('Learning Paths')[1]
        .closest('div')?.parentElement?.parentElement;
      expect(statisticsContainer).toHaveClass('hidden', 'md:grid');

      // Click show statistics button
      fireEvent.click(screen.getByRole('button', { name: /show stats/i }));

      // Statistics should now be visible
      await waitFor(() => {
        expect(statisticsContainer).toHaveClass('block');
      });
    });

    it('toggles filters visibility on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<LearningPathsPage />);

      // Filters should be hidden by default on mobile
      const filtersContainer = screen
        .getByText('Difficulty Level')
        .closest('div')?.parentElement?.parentElement;
      expect(filtersContainer).toHaveClass('hidden', 'md:block');

      // Click show filters button
      fireEvent.click(screen.getByRole('button', { name: /filters/i }));

      // Filters should now be visible
      await waitFor(() => {
        expect(filtersContainer).toHaveClass('block');
      });
    });
  });

  describe('Navigation Links', () => {
    it('renders navigation links with correct hrefs', () => {
      render(<LearningPathsPage />);

      const studyPlansLink = screen.getAllByRole('link', {
        name: /view study plans/i,
      })[0];
      const prepGuidesLink = screen.getAllByRole('link', {
        name: /preparation guides/i,
      })[0];
      const enhancedLink = screen.getAllByRole('link', {
        name: /enhanced learning path/i,
      })[0];

      expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
      expect(prepGuidesLink).toHaveAttribute('href', '/preparation-guides');
      expect(enhancedLink).toHaveAttribute('href', '/learning-paths/enhanced');
    });

    it('renders call to action links', () => {
      render(<LearningPathsPage />);

      // Scroll to bottom to see call to action (simulate)
      const callToAction = screen.getByText(/ready to start learning/i);
      expect(callToAction).toBeInTheDocument();

      const ctaStudyPlans = screen.getAllByRole('link', {
        name: /study plans/i,
      })[1]; // Second occurrence (CTA)
      const ctaPrepGuides = screen.getAllByRole('link', {
        name: /preparation guides/i,
      })[1]; // Second occurrence (CTA)

      expect(ctaStudyPlans).toHaveAttribute('href', '/study-plans');
      expect(ctaPrepGuides).toHaveAttribute('href', '/preparation-guides');
    });
  });

  describe('Statistics Display', () => {
    it('displays correct statistics values', () => {
      render(<LearningPathsPage />);

      // Check that statistics are calculated correctly
      expect(screen.getByText('4')).toBeInTheDocument(); // learningPathsCount
      expect(screen.getByText('82')).toBeInTheDocument(); // totalHours (15+12+25+30)
      expect(screen.getAllByText('12')).toHaveLength(2); // totalResources (3+3+3+3) and categoriesCount
    });

    it('updates statistics when filters are applied', async () => {
      render(<LearningPathsPage />);

      // Apply beginner filter
      fireEvent.click(screen.getByText('Beginner'));

      // Statistics should still show total values (not filtered)
      await waitFor(() => {
        expect(screen.getByText('4')).toBeInTheDocument(); // learningPathsCount
        expect(screen.getByText('82')).toBeInTheDocument(); // totalHours
        expect(screen.getAllByText('12')).toHaveLength(2); // totalResources and categoriesCount
      });
    });
  });
});
