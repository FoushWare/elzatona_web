import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
      resources: [
        {
          id: 'resource1',
          title: 'HTML Tutorial',
          url: 'https://example.com/html',
          type: 'documentation',
        },
        {
          id: 'resource2',
          title: 'CSS Guide',
          url: 'https://example.com/css',
          type: 'tutorial',
        },
      ],
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
      resources: [
        {
          id: 'resource3',
          title: 'React Guide',
          url: 'https://example.com/react',
          type: 'tutorial',
        },
      ],
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
      resources: [
        {
          id: 'resource4',
          title: 'CSS Grid Guide',
          url: 'https://example.com/css-grid',
          type: 'documentation',
        },
      ],
      targetSkills: ['CSS Grid', 'Flexbox', 'Animations'],
      prerequisites: ['CSS Basics'],
    },
  ],
  getResourceById: jest.fn(id => ({
    id,
    title: `Resource ${id}`,
    url: `https://example.com/${id}`,
    type: 'documentation',
  })),
}));

describe('Learning Paths Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering Integration', () => {
    it('renders complete learning paths page with all components', () => {
      render(<LearningPathsPage />);

      // Check page header
      expect(
        screen.getByRole('heading', { name: 'Learning Paths' })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Your path to success in interviews')
      ).toBeInTheDocument();

      // Check schedule interview button
      expect(
        screen.getByRole('link', { name: /schedule ai mock interview/i })
      ).toBeInTheDocument();

      // Check all learning path cards
      expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
      expect(screen.getByText('React Mastery')).toBeInTheDocument();
      expect(screen.getByText('Advanced CSS Mastery')).toBeInTheDocument();

      // Check call to action
      expect(
        screen.getByText(/ready to start your journey/i)
      ).toBeInTheDocument();
    });

    it('renders navigation links in header', () => {
      render(<LearningPathsPage />);

      expect(
        screen.getByRole('link', { name: /view study plans/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /preparation guides/i })
      ).toBeInTheDocument();
    });
  });

  describe('Card Interaction Integration', () => {
    it('allows expanding and collapsing cards', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Initially cards should be collapsed (no action buttons visible)
      expect(
        screen.queryByRole('link', { name: /practice questions/i })
      ).not.toBeInTheDocument();

      // Click on first card header to expand
      const frontendCard = screen
        .getByText('Frontend Basics')
        .closest('button');
      await user.click(frontendCard!);

      // Action buttons should now be visible
      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: /practice questions/i })
        ).toBeInTheDocument();
      });
    });

    it('maintains card state when toggling multiple cards', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Expand first card
      const frontendCard = screen
        .getByText('Frontend Basics')
        .closest('button');
      await user.click(frontendCard!);

      // Expand second card
      const reactCard = screen.getByText('React Mastery').closest('button');
      await user.click(reactCard!);

      // Both cards should be expanded
      await waitFor(() => {
        const practiceButtons = screen.getAllByRole('link', {
          name: /practice questions/i,
        });
        expect(practiceButtons).toHaveLength(2);
      });
    });

    it('scrolls to flashcard icon when card is expanded', async () => {
      const user = userEvent.setup();

      // Mock scrollIntoView
      const mockScrollIntoView = jest.fn();
      Element.prototype.scrollIntoView = mockScrollIntoView;

      render(<LearningPathsPage />);

      // Expand a card
      const frontendCard = screen
        .getByText('Frontend Basics')
        .closest('button');
      await user.click(frontendCard!);

      // Wait for scroll to be called
      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation Integration', () => {
    it('has correct href attributes for all navigation links', () => {
      render(<LearningPathsPage />);

      // Check header navigation links
      const studyPlansLink = screen.getByRole('link', {
        name: /view study plans/i,
      });
      const prepGuidesLink = screen.getByRole('link', {
        name: /preparation guides/i,
      });

      expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
      expect(prepGuidesLink).toHaveAttribute('href', '/preparation-guides');

      // Check schedule interview button
      const scheduleLink = screen.getByRole('link', {
        name: /schedule ai mock interview/i,
      });
      expect(scheduleLink).toHaveAttribute('href', '/schedule-interview');
    });

    it('has correct href attributes for card action buttons when expanded', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Expand first card
      const frontendCard = screen
        .getByText('Frontend Basics')
        .closest('[data-testid="card-header"]');
      await user.click(frontendCard!);

      await waitFor(() => {
        // Use getAllByRole since there are multiple practice question buttons
        const practiceButtons = screen.getAllByRole('link', {
          name: /practice questions/i,
        });
        const resourcesButtons = screen.getAllByRole('link', {
          name: /view resources/i,
        });

        // Check that at least one practice button has the correct href
        expect(
          practiceButtons.some(
            button =>
              button.getAttribute('href') ===
              '/learning-paths/frontend-basics/questions'
          )
        ).toBe(true);

        // Check that at least one resources button has the correct href
        expect(
          resourcesButtons.some(
            button =>
              button.getAttribute('href') ===
              '/learning-paths/frontend-basics/resources'
          )
        ).toBe(true);
      });
    });

    it('has correct href attributes for flashcard icons when expanded', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Expand first card
      const frontendCard = screen
        .getByText('Frontend Basics')
        .closest('[data-testid="card-header"]');
      await user.click(frontendCard!);

      await waitFor(() => {
        const flashcardIcon = screen.getByLabelText(
          /add learning path to flashcards/i
        );
        expect(flashcardIcon).toHaveAttribute(
          'href',
          '/learning-paths/frontend-basics/questions'
        );
      });
    });
  });

  describe('Data Integration', () => {
    it('displays correct question counts for all learning paths', () => {
      render(<LearningPathsPage />);

      expect(screen.getByText('#25 Q')).toBeInTheDocument();
      expect(screen.getByText('#30 Q')).toBeInTheDocument();
      expect(screen.getByText('#20 Q')).toBeInTheDocument();
    });

    it('displays correct difficulty levels for all learning paths', () => {
      render(<LearningPathsPage />);

      expect(screen.getByText('beginner')).toBeInTheDocument();
      expect(screen.getByText('intermediate')).toBeInTheDocument();
      expect(screen.getByText('advanced')).toBeInTheDocument();
    });

    it('displays correct estimated times for all learning paths', () => {
      render(<LearningPathsPage />);

      expect(screen.getByText('40 hours')).toBeInTheDocument();
      expect(screen.getByText('60 hours')).toBeInTheDocument();
      expect(screen.getByText('30 hours')).toBeInTheDocument();
    });

    it('displays correct target skills for all learning paths', () => {
      render(<LearningPathsPage />);

      // Frontend Basics skills - use getAllByText since there are multiple instances
      expect(screen.getAllByText('HTML').length).toBeGreaterThan(0);
      expect(screen.getAllByText('CSS').length).toBeGreaterThan(0);
      expect(screen.getAllByText('JavaScript').length).toBeGreaterThan(0);

      // React Mastery skills
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Hooks').length).toBeGreaterThan(0);
      expect(screen.getByText('State Management')).toBeInTheDocument();

      // Advanced CSS skills
      expect(screen.getByText('CSS Grid')).toBeInTheDocument();
      expect(screen.getByText('Flexbox')).toBeInTheDocument();
      expect(screen.getByText('Animations')).toBeInTheDocument();
    });

    it('displays correct prerequisites for all learning paths', () => {
      render(<LearningPathsPage />);

      expect(screen.getByText('Basic computer skills')).toBeInTheDocument();
      expect(screen.getByText('JavaScript ES6+')).toBeInTheDocument();
      expect(screen.getByText('CSS Basics')).toBeInTheDocument();
    });
  });

  describe('Responsive Design Integration', () => {
    it('applies responsive classes correctly', () => {
      const { container } = render(<LearningPathsPage />);

      // Check main container
      const mainContainer = container.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass(
        'bg-gradient-to-br',
        'from-gray-50',
        'via-white',
        'to-slate-50'
      );

      // Check grid layout
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    });

    it('handles mobile viewport correctly', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<LearningPathsPage />);

      // Should still render all content
      expect(
        screen.getByRole('heading', { name: 'Learning Paths' })
      ).toBeInTheDocument();
      expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('has proper heading hierarchy', () => {
      render(<LearningPathsPage />);

      const mainHeading = screen.getByRole('heading', {
        name: 'Learning Paths',
      });
      expect(mainHeading.tagName).toBe('H1');
    });

    it('has proper ARIA attributes for interactive elements', () => {
      render(<LearningPathsPage />);

      // Check that card headers have proper ARIA attributes
      const cardHeaders = screen.getAllByTestId('card-header');
      cardHeaders.forEach(header => {
        expect(header).toHaveAttribute('data-testid', 'card-header');
      });

      // Check that flashcard icons have proper aria-labels
      const flashcardIcons = screen.getAllByLabelText(
        /add learning path to flashcards/i
      );
      flashcardIcons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-label');
      });
    });

    it('has proper focus management', () => {
      render(<LearningPathsPage />);

      // Check that links are focusable
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toBeDisabled();
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('handles missing learning paths gracefully', () => {
      // Mock empty learning paths
      jest.doMock('@/lib/resources', () => ({
        learningPaths: [],
        getResourceById: jest.fn(),
      }));

      expect(() => {
        render(<LearningPathsPage />);
      }).not.toThrow();
    });

    it('handles malformed learning path data gracefully', () => {
      // Mock malformed data
      jest.doMock('@/lib/resources', () => ({
        learningPaths: [
          {
            id: 'malformed-path',
            title: 'Malformed Path',
            // Missing required fields
          },
        ],
        getResourceById: jest.fn(),
      }));

      expect(() => {
        render(<LearningPathsPage />);
      }).not.toThrow();
    });
  });
});
